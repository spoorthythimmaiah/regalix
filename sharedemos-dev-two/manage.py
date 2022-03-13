from collections import OrderedDict
import csv
from datetime import datetime
from dateutil.relativedelta import relativedelta
from email.MIMEText import MIMEText
from email.utils import formataddr
from email.header import Header
import os
import requests
import sys
from urllib import unquote


from flask import abort, current_app, render_template, url_for
from flask.ext.script import Manager, Shell, Command, Option
from flask.ext.migrate import Migrate, MigrateCommand
from crontab import CronTab
from sqlalchemy import desc, func
from werkzeug.serving import run_simple
from xlwt import Workbook, easyxf

from sharedemos.models import (
    db,
    ActivityFeed,
    Checklist,
    CompletionActivity,
    DraftWalkthrough,
    ExpiryJob,
    FAQGroup,
    Journey,
    LastActivity,
    MailDigest,
    Path,
    ReportTenant,
    Section,
    SiteVisitors,
    SearchIndex,
    SearchActivity,
    Tenant,
    TenantFlags,
    TenantIndex,
    User,
    UserActivity,
    UserGroup,
    UserGroupMappings,
    VisitActivity,
    Walkthrough
)
from sharedemos.libs.algolia import (
    init_algolia,
    upload_checklist_to_search,
    upload_faq_to_search,
    upload_journey_to_search,
    upload_pathfinder_to_search,
    upload_samples_to_search,
    upload_section_to_search,
    upload_walkthrough_to_search,
)
from sharedemos.libs.api import (
    get_all_chapters,
    get_all_children,
    get_all_playlists
)
from sharedemos.libs.core import create_app, DomainDispatcher
from sharedemos.libs.helpers import (
    CSVWriter,
    Mailer,
    add_date_time,
    get_default_translation,
    get_timezone_specific_datetime,
    get_local_time,
    get_random_string,
    get_tenant_uuid,
    get_tenant_walkthrough_slides_counts,
    log_last_activity
)
from sharedemos.libs.model import (
    get_progress_difference,
    get_time_bounds
)

from sharedemos.libs.reports import (
    get_best_demoviews,
    get_completion_rate,
    get_demo_views,
    get_popular_demos,
    get_popular_demos_details,
    get_site_visitors,
    get_guides_details,
    get_trending_demos,
    get_views_and_completion_rate,
    get_visitors_data,
    get_visitors_referral_data
)
from sharedemos.api.reports import get_trending_categories
from sharedemos.libs.utils import disable_entity


app = create_app('sharedemos')

manager = Manager(app)
Migrate(app, db)


manager.add_command('shell', Shell(make_context=lambda: {
    'app': app,
    'db': db
}))


class AddCacheBuster(Command):

    def run(self):
        """Function to add cache buster."""
        try:
            config_file = open("sharedemos/config/default.py", 'r+')
            for line in config_file:
                if 'CACHE_BUSTER' in line:
                    config_file.seek(-len(line), 1)
                    cache_bust_line = "CACHE_BUSTER = '" + \
                        datetime.strftime(datetime.now(), '%Y%m%d%H%M') + "'"
                    config_file.write(cache_bust_line.ljust(len(line)))
                    break
            else:
                text = "\nCACHE_BUSTER = '%s'" % (
                    datetime.strftime(datetime.now(), '%Y%m%d%H%M'))
                config_file.write(text)

            config_file.flush()
            config_file.close()

        except Exception as e:
            print e
        return


class AlgoliaSearch(Command):
    """
    Upload content to Algolia.

    GET, INDEX, CLEAN , ADD args value is always tenant-domain.
    APP arg value will be unique Id of Apps.
    If you want to delete all records of the tenant, then use CLEAN command.

    params:
        tenant-domain - String.
        app_unique_id - String.
    """

    option_list = (
        Option('-GET', dest='get_tenant', help="Get Data"),
        Option('-INDEX', dest='print_index', help="Get algolia index"),
        Option('-CLEAN', dest='clean_tenant',
               help="Clean Data - Deletes orphan records"),
        Option('-ADD', dest='add_tenant',
               help="Insert Data - Adds new records"),
        Option('-APP', dest='app_id', help='provide App Unique ID')
    )

    all_walkthrough_data = []
    tenant_index = None

    def get_all_records(self, tenant_domain, print_data=False):
        """Print all the Algolia results if print_data = True."""
        try:
            if not self.tenant_index:
                self.tenant_index = init_algolia(tenant_domain)

            all_records = self.tenant_index.browse_all()
            if print_data:
                for data in all_records:
                    print data, '\n'
            return all_records

        except Exception as e:
            print 'Algolia GET Error - ', e

    def add_records(self, tenant_domain, app_id):
        """
        Add records to Algolia.

        app_id is optional, If app_id is None then
        Will upload the all contents of the tenant.

        params:
            tenant_domain - String.
            app_id - String(unique Id of app).

        """
        tenant = Tenant.query.filter(
            Tenant.domain == unicode(tenant_domain)).first_or_404()

        app_id = unicode(app_id.lower()) if app_id else None
        allowed_apps = (current_app.config.get(
            'ALLOWED_APPS_FOR_ALGOLIA', []) + ['library'])

        # Return if app content is not allowed for algolia.
        if app_id and app_id not in allowed_apps:
            print "APP content is not allowed to add to algolia"
            return

        default_app = [u'library'] if not app_id or app_id == u'library' else []

        apps_to_add = [app.unique_id.lower() for app in tenant.applications
                       if (not app_id or app.unique_id.lower() == app_id) and
                       app.is_enabled] + default_app

        try:
            # Add the contents of subscribed applications to algolia search.
            # If not subscribed raise exception.
            if not apps_to_add:
                raise Exception(
                    'APP is not subscribed to the tenant')

            if u'library' in apps_to_add:

                current_app.config['SERVER_NAME'] = tenant.domain
                with current_app.app_context() and\
                        current_app.test_request_context():

                    products = Section.query.filter_by(
                        tenant=tenant,
                        parent_id=None,
                        is_enabled=True,
                        is_deleted=False,
                        is_hidden=False
                    ).order_by(Section.order).all()

                    children = get_all_children(products)
                    for child in children:
                        if child.is_leafnode:
                            upload_section_to_search(child)

                    _playlists = get_all_playlists(children)
                    chapters = get_all_chapters(_playlists)
                    for chapter in chapters:
                        upload_walkthrough_to_search(chapter)

            if u'faq' in apps_to_add:

                faq_list = FAQGroup.query.filter_by(
                    tenant_id=tenant.id,
                    is_enabled=True,
                    is_deleted=False
                ).all()
                for faq in faq_list:
                    upload_faq_to_search(faq)

            if u'checklist' in apps_to_add:

                check_list = Checklist.query.filter_by(
                    tenant_id=tenant.id,
                    is_enabled=True,
                    is_deleted=False
                ).all()
                for ch in check_list:
                    upload_checklist_to_search(ch)

            if u'pathfinder' in apps_to_add:

                path_list = Path.query.filter_by(
                    tenant_id=tenant.id,
                    is_enabled=True,
                    is_deleted=False
                ).all()
                for path in path_list:
                    upload_pathfinder_to_search(path)

            if u'sample_exchange' in apps_to_add:
                current_app.config['SERVER_NAME'] = tenant.domain
                with current_app.app_context() and\
                        current_app.test_request_context():
                    upload_samples_to_search(tenant.domain)

            if u'journeys' in apps_to_add:
                journeys = Journey.query.filter_by(
                    tenant_id=tenant.id,
                    is_enabled=True,
                    is_deleted=False).all()
                for journey in journeys:
                    upload_journey_to_search(journey)

            print "{}-{}".format(app_id if app_id else 'ALL',
                                 'Contents uploaded algolia ')

        except Exception as e:
            print 'Sync Failed: ', e

    def clean_records(self, tenant_domain, app_id):
        """
        Clean/Delete the records from algolia.

        app_id is optional.
        If app_id then cleans only the contents of mentioned app else
        delete/clean the contents of all apps.

        Method used to clean all contents - clear_index().

        Method used to clean individual app content - delete_by_query().
        Remove all objects matching a filter params.

        params:
            tenant_domain - string.
            app_id - string(app unique id).
        """
        try:
            tenant = Tenant.query.filter(
                Tenant.domain == unicode(tenant_domain)).first()
            if not tenant:
                    raise Exception('Tenant Not Found.')

            if not self.tenant_index:
                self.tenant_index = init_algolia(tenant_domain)

            if app_id:
                app_id = unicode(app_id.lower())
                if (app_id not in current_app.config.get(
                        'ALLOWED_APPS_FOR_ALGOLIA', []) + [u'library']):
                    return "Provide Proper APP ID"

                delete_parameters = {
                    'filters': u'category:' + app_id
                }
                """
                delete_by_query takes string(to be queried) and
                filters_params as arguments.

                If querystring is empty,Then
                will delete the entire records of mentioned App.

                params:
                    querystring = String(Empty String).
                    delete_parameters = Dictionary.
                """
                self.tenant_index.delete_by_query("", delete_parameters)

            else:
                self.tenant_index.clear_index()
                self.tenant_index.set_settings({
                    "searchableAttributes": [],
                    "attributesToRetrieve": [],
                    'attributesForFaceting': ['category']
                })

            print "{}-{}".format(app_id if app_id else 'ALL',
                                 'Contents cleaned Successfully')

        except Exception as e:
            print 'Algolia CLEAN Error - ', e

    def print_index(self, tenant_domain):
        """Print all the Algolia index for given tenant."""
        try:
            if not self.tenant_index:
                self.tenant_index = init_algolia(tenant_domain)

            print self.tenant_index.index_name

        except Exception as e:
            print 'Algolia INDEX Error - ', e

    def run(self, get_tenant, add_tenant,
            clean_tenant, print_index,
            app_id):

        if get_tenant:
            self.get_all_records(get_tenant, True)

        if add_tenant:
            self.add_records(add_tenant, app_id)

        if clean_tenant:
            self.clean_records(clean_tenant, app_id)

        if print_index:
            self.print_index(print_index)


class AlgoliaAnalytics(Command):
    """
    Command to fetch Algolia Analytics.

    Since algolia analytics which we get from Algolia site is limited to
    only 30 days, this command will actually store all the search
    analytics into the Sharedemos DB by querying from algolia analytics API.
    Data points collected are- (Analytics v2)
    1. total searchcount.
    2. search word and search count for each word.
    3. average hit count.
    Note:
    * Since we don't get 'avg_hit_count_without_typo' and
    'last_searched_at' data points, they are being stored with default values.
    * This class/methods should be updated as when Algolia updates their API.
    """

    option_list = (Option('-start_date', dest='start_date', default=None,
                          help="Enter valid start date in format YYYY-MM-DD"),
                   Option('-end_date', dest='end_date', default=None,
                          help="Enter a valid end date in format YYYY-MM-DD"),
                   Option('-domain', dest='domain', default=None,
                          help="Enter a valid Tenant ID"),)

    def run(self, start_date, end_date, domain):
        """
        Fetching data from Algolia Analytics API v2.

        The fetched data will be in the below format
        for a given start and end dates -
        {
            u'searches':
            [
                {u'count': 35, u'nbHits': 1716, u'search': u'vsan'},
                {u'count': 22, u'nbHits': 9, u'search': u'faq'},
                {u'count': 19, u'nbHits': 188, u'search': u'cluster'},
                ...
            ]
        }
        """
        try:
            # Get start, end dates in seconds.(default range is 1 day)
            current_date = datetime.fromordinal(datetime.today().toordinal())
            start_at_date = datetime.strptime(
                start_date, '%Y-%m-%d') if start_date else current_date
            if end_date:
                end_at_date = datetime.strptime(end_date, '%Y-%m-%d')
            else:
                end_at_date = (current_date + relativedelta(days=1))

            if start_at_date > end_at_date:
                raise Exception(
                    'End date must be greater than start date.'
                )

            from_date = start_at_date
            config = current_app.config
            headers = {
                'X-Algolia-API-Key': config['ALGOLIA_API_KEY'],
                'X-Algolia-Application-Id': config['ALGOLIA_APPLICATION_ID']
            }

            # Adding 1 day to the date range to include both start & end days.
            for single_date in range((end_at_date - start_at_date).days + 1):
                to_date = (
                    start_at_date + relativedelta(
                        days=(single_date + 1), seconds=-1
                    )
                )

                if domain:
                    tenant = Tenant.query.join(TenantFlags).filter(
                        Tenant.domain == unicode(domain),
                        TenantFlags.is_algolia_analytics_enabled.__eq__(True)
                    ).first()
                    if not tenant:
                        raise Exception('Tenant Not Found.')

                    tenants_list = [tenant]
                else:
                    tenants_list = Tenant.query.join(TenantFlags).filter(
                        TenantFlags.is_algolia_analytics_enabled.__eq__(True)
                    ).all()

                if not tenants_list:
                    raise Exception('No Tenant/s found.')

                for tenant in tenants_list:
                    if not tenant.tenant_index:
                        new_tenant_index = TenantIndex()
                        tenant_idx = get_tenant_uuid(tenant.domain)
                        new_tenant_index.algolia_index = tenant_idx
                        new_tenant_index.tenant = tenant
                        db.session.add(new_tenant_index)
                    tenant_index = tenant.tenant_index

                    # Get the analytics data from Algolia Analytics API.
                    url = config['ALGOLIA_ANALYTICS_URL'].format(
                        tenant_index.algolia_index,
                        from_date.strftime('%Y-%m-%d'),
                        to_date.strftime('%Y-%m-%d')
                    )
                    response = requests.get(
                        url,
                        headers=headers
                    )

                    if response.status_code != 200:
                        print 'Error ! ', tenant.id, tenant_index.algolia_index
                        print response.text
                        continue

                    analytics = response.json()

                    # Update analytics data to corresponding tables.
                    # Update overall count.
                    if analytics.get('searches'):
                        search_count = 0
                        search_index = None

                        for index in tenant_index.search_index:
                            # Update the old record.
                            if index.from_date.date() == from_date.date():
                                search_index = index
                                break
                        if not search_index:
                            search_index = SearchIndex()

                        for s_data in analytics['searches']:
                            search_count += s_data['count']

                            search_activity = None
                            for _activity in search_index.search_activity:
                                if (
                                    _activity.from_date.date() == from_date.date() and
                                    _activity.word == s_data['search']
                                ):
                                    search_activity = _activity
                                    break
                            if not search_activity:
                                search_activity = SearchActivity()

                            search_activity.word = s_data['search']
                            search_activity.count = s_data['count']
                            search_activity.avg_hit_count = s_data['nbHits']
                            search_activity.from_date = from_date
                            search_activity.search_index = search_index
                            db.session.add(search_activity)

                        search_index.count = search_count
                        search_index.from_date = from_date
                        search_index.tenant_index = tenant_index
                        db.session.add(search_index)

                db.session.commit()
                print from_date, ' - Success.'
                from_date = to_date + relativedelta(seconds=1)

        except Exception as e:
            print 'Failed !', e.args


class DevServer(Command):

    help = description = 'Runs the Flask development server'

    def make_app(self, domain):

        tenant_app = create_app('sharedemos')
        tenant_id = Tenant.get_tenant_for_domain(unicode(domain))
        if not tenant_id:
            abort(404)
        tenant_app.tenant_id = tenant_id

        return tenant_app

    def __call__(self, app, **kwargs):
        self.app = app
        application = DomainDispatcher(self.make_app)
        run_simple('0.0.0.0',
                   5000,
                   application,
                   use_debugger=True,
                   use_reloader=True)


class DisableEntity(Command):
    """
    Command to disable an entity.

    This is run by the crontab scheduler which will disable an
    entity(Section/Playlist/Walkthrough) at specific time.
    Only required parameter is the id of the expiry job table.
    """

    option_list = (
        Option('-job_id', dest='job_id', help="ExpiryJob table id."),
    )

    def run(self, job_id):
        """
        Get the ExpiryJob table record from 'job_id'.

        Get the actual entity from Section/Playlist/DraftWalkthrough and disable it.
        """
        import logging

        logger = logging.getLogger(__name__)
        expiry_logger = logging.FileHandler(
            current_app.config['EXPIRY_SCHEDULER_LOG']
        )
        expiry_logger.setFormatter(logging.Formatter('%(levelname)s - %(message)s'))
        expiry_logger.setLevel(logging.INFO)
        logger.addHandler(expiry_logger)

        job = ExpiryJob.query.get(job_id)
        if not job:
            logger.info('JOB not found - {}'.format(job_id))
            return

        try:
            disable_entity(
                job.entity_type, job.entity_id,
                job.modified_by, job.author_locale
            )
        except Exception as e:
            logger.info(e)

        else:
            # Remove the job from crontab
            cron = CronTab(user=current_app.config['CRON_USER'])
            comment = current_app.config['COMMENT_FORMAT'].format(job_id)
            cron_iterator = cron.find_comment(comment)
            for cron_job in cron_iterator:
                cron.remove(cron_job)

            job.is_executed = True
            db.session.add(job)
            db.session.commit()
            cron.write()

            logger.info('JOB {} ran successfully at {}'.format(
                job_id, datetime.now())
            )


class GenerateTheme(Command):
    """Generate theme for given tenant/all tenants."""

    option_list = (
        Option('-domain', dest='domain', required=True,
               help="Generate theme for a tenant"),
    )

    def create_theme(self):

        theme_folder = os.path.join(
            current_app.config['MEDIA_FOLDER'], 'theme')

        # check and create leaf node
        if not os.path.exists(theme_folder):
            os.makedirs(theme_folder)

        theme_file = os.path.join(
            theme_folder,
            str(self.tenant.theme.id) + '.css'
        )
        with open(theme_file, 'w') as theme_writer:
            theme_writer.write(
                render_template('theme.html', theme=self.tenant.theme)
            )

    def run(self, domain):
        """Function to re-generate theme for tenants if already exists."""
        tenant = Tenant.query.filter(
            Tenant.domain == unicode(domain)
        ).first()
        if not tenant:
            print 'Tenant with given ID does not exist'
            sys.exit(0)
        if not tenant.theme:
            print 'Tenant theme does not exist'
            sys.exit(0)

        self.tenant = tenant

        self.create_theme()


class SitemapGenerator(Command):

    option_list = (
        Option('-domain', dest='domain', required=True,
               help="Generate sitemap for a tenant"),
        Option('-format', dest='export_format', default='xml'),
        Option('-embed_link', dest='embed_link', default=False),
    )

    def write_to_file(self):
        file_location = os.path.join(
            current_app.config['SITEMAP_FOLDER'],
            self.tenant.domain)

        # site map file directory
        if not os.path.exists(file_location):
            os.makedirs(file_location)

        file_name = file_location + '/sitemap.' + self.export_format

        if self.export_format == 'xml':
            self.xml_links = list()
            for eid, data in self.SITEMAP['sections'].items():
                if data.get('parent'):
                    continue
                self.write_to_xml(data)
            xml_data = """<?xml version="1.0" encoding="utf-8"?>
               \n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
               xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
               xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
               http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">%s\n</urlset>
            """ % ("".join(self.xml_links))

            with open(file_name, 'w') as xml_writer:
                xml_writer.write(xml_data)
                xml_writer.close()

        elif self.export_format == 'csv':
            self.csv_links = list()
            with open(file_name, 'w') as csvfile:
                writer = CSVWriter(file_object=csvfile)
                writer.writerow([
                    "Links"
                ])

                for eid, data in self.SITEMAP['sections'].items():
                    if data.get('parent'):
                        continue
                    self.get_all_links(data)

                for link in self.csv_links:
                    writer.writerow([link])

        elif self.export_format == 'xls':
            workbook = Workbook()
            self.worksheet = workbook.add_sheet('Sitemap')
            self.rowX = 0
            self.rowY = 0
            self.colX = 0
            self.colY = 0
            for eid, data in self.SITEMAP['sections'].items():
                if data.get('parent'):
                    continue
                self.write_column(data, col_type='section')
                if data.get('children'):
                    self.write_section(data)
                elif data.get('playlists'):
                    self.write_playlist(data)

                self.colX = 0
                self.colY = 0
            workbook.save(file_name)

    def write_column(self, data, col_type='chapter'):
        style = easyxf(
            'align: vertical center, horizontal center;'
        )
        depth = self.find_depth(data)
        if depth:
            self.rowY = (self.rowX + depth - 1)

        self.worksheet.write_merge(
            self.rowX, self.rowY,
            self.colX, self.colY,
            unicode(data['entity']),
            style
        )
        if col_type == 'chapter':
            self.worksheet.write_merge(
                self.rowX, self.rowY,
                self.colX + 1, self.colY + 1,
                data['link'],
                style
            )

    def find_depth(self, data):
        if data.get('children'):
            _length = 0
            for sid in data['children']:
                sec_data = self.SITEMAP['sections'][sid]
                _length += self.find_depth(sec_data)
            return max(_length, len(data['children']))
        elif data.get('playlists'):
            _length = 0
            for plid in data['playlists']:
                pl_data = self.SITEMAP['playlists'][plid]
                _length += self.find_depth(pl_data)
            return max(_length, len(data['playlists']))
        elif data.get('chapters'):
            return len(data['chapters'])

        return 1

    def write_section(self, data):
        self.colX += 1
        self.colY += 1
        for sid in data['children']:
            colx = self.colX
            coly = self.colY
            rowx = self.rowX
            rowy = self.rowY
            sec_data = self.SITEMAP['sections'][sid]
            self.write_column(sec_data, col_type='section')
            if sec_data.get('children'):
                self.write_section(sec_data)
            elif sec_data.get('playlists'):
                self.write_playlist(sec_data)
            self.colX = colx
            self.colY = coly
            if rowx == self.rowX:
                self.rowX += 1
            if rowy == self.rowY:
                self.rowY += 1

    def write_playlist(self, data):
        self.colX += 1
        self.colY += 1
        for plid in data['playlists']:
            pl_data = self.SITEMAP['playlists'][plid]
            self.write_column(pl_data, col_type='playlist')
            self.write_chapter(pl_data)
            self.colX -= 1
            self.colY -= 1

    def write_chapter(self, data):
        self.colX += 1
        self.colY += 1
        for cid in data['chapters']:
            ch_data = self.SITEMAP['chapters'][cid]
            self.write_column(ch_data)
            self.rowX += 1
            self.rowY += 1

    def write_to_xml(self, metadata):
        url = """
            <url>
                <loc>%s</loc>
                <lastmod>%s</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.8</priority>
            </url>""" % (
            metadata['link'],
            metadata['entity'].modified_at.strftime("%Y-%m-%d")
        )

        if url not in self.xml_links:
            self.xml_links.append(url)

        if 'children' in metadata:
            for sid in metadata['children']:
                sec_data = self.SITEMAP['sections'][sid]
                self.write_to_xml(sec_data)
        elif 'playlists' in metadata:
            for plid in metadata['playlists']:
                pl_data = self.SITEMAP['playlists'][plid]
                for ch in pl_data['chapters']:
                    ch_data = self.SITEMAP['chapters'][ch]
                    self.write_to_xml(ch_data)

    def get_all_links(self, metadata):
        if metadata['link'] not in self.csv_links:
            self.csv_links.append(metadata['link'])

        if 'children' in metadata:
            for sid in metadata['children']:
                sec_data = self.SITEMAP['sections'][sid]
                self.get_all_links(sec_data)
        elif 'playlists' in metadata:
            for plid in metadata['playlists']:
                pl_data = self.SITEMAP['playlists'][plid]
                for ch in pl_data['chapters']:
                    ch_data = self.SITEMAP['chapters'][ch]
                    self.get_all_links(ch_data)

    def build_url(self, product, section=None, chapter=None):
        tenant_template = product.tenant.template.lower()
        if tenant_template in ['vmware', 'dell']:
            link = url_for('main.route_handler',
                           section=product.slug,
                           _external=True,
                           _scheme='https')
            if section:
                link = url_for('main.route_handler',
                               section=section.slug,
                               _external=True,
                               _scheme='https')
            if chapter:
                if section:
                    if self.is_embed_link and self.export_format == 'xls':
                        link = url_for(
                            'main.embed_playlist',
                            product_id=product.slug,
                            section_id=section.slug,
                            demo_id=chapter.slug,
                            _external=True,
                            _scheme='https')
                    else:
                        if tenant_template == u'dell':
                            link = url_for(
                                'main.launchpad',
                                section=section.slug,
                                chapter=chapter.slug,
                                _external=True,
                                _scheme='https'
                            )
                        else:
                            link = url_for(
                                'main.route_handler',
                                section=section.slug,
                                chapter=chapter.slug,
                                _external=True,
                                _scheme='https'
                            )
                else:
                    if self.is_embed_link and self.export_format == 'xls':
                        link = url_for(
                            'main.embed_playlist',
                            product_id=product.slug,
                            demo_id=chapter.slug,
                            _external=True,
                            _scheme='https')
                    else:
                        if tenant_template == u'dell':
                            link = url_for(
                                'main.launchpad',
                                section=product.slug,
                                chapter=chapter.slug,
                                _external=True,
                                _scheme='https'
                            )
                        else:
                            link = url_for(
                                'main.route_handler',
                                section=product.slug,
                                chapter=chapter.slug,
                                _external=True,
                                _scheme='https'
                            )
        else:
            if chapter and self.is_embed_link and self.export_format == 'xls':
                if section:
                    link = url_for(
                        'main.embed_playlist',
                        product_id=product.slug,
                        section_id=section.slug,
                        demo_id=chapter.slug,
                        _external=True,
                        _scheme='https')
                else:
                    link = url_for(
                        'main.embed_playlist',
                        product_id=product.slug,
                        demo_id=chapter.slug,
                        _external=True,
                        _scheme='https')
            else:
                url = product.slug
                if section:
                    url += '/' + section.slug

                if chapter:
                    url += '/' + chapter.slug

                link = unquote(url_for(
                    'main.home',
                    _external=True,
                    _scheme='https',
                    _anchor='!/' + url
                ))

        return link

    def build_sitemap(self, product, section=None):
        """
        Create 'section' sitemap and assign it to self.SITEMAP variable.

        params:
            product - SQLAlchemy 'Section' model object.
            section - SQLAlchemy 'Section' model object, defaults to None.
        """
        if product.id not in self.SITEMAP['sections']:
            link = self.build_url(product)
            self.SITEMAP['sections'][product.id] = {
                'parent': None,
                'entity': product,
                'link': link
            }

        if section and section.id not in self.SITEMAP['sections']:
            link = self.build_url(product, section=section)
            self.SITEMAP['sections'][section.id] = {
                'parent': section.parent_id,
                'entity': section,
                'link': link
            }

        chapters = list()
        children = list()
        if not section:
            children = product.children
            for playlist in product.playlists:
                if playlist.is_deleted or not playlist.is_enabled:
                    continue

                for wt in playlist.walkthroughs:
                    if wt.is_deleted or not wt.is_enabled:
                        continue
                    chapters.append(wt)

        else:
            children = section.children
            for playlist in section.playlists:
                if playlist.is_deleted or not playlist.is_enabled:
                    continue

                for wt in playlist.walkthroughs:
                    if wt.is_deleted or not wt.is_enabled:
                        continue
                    chapters.append(wt)

        children = [
            ch for ch in children
            if ch.is_enabled and
            not ch.is_deleted and
            not ch.is_hidden
        ]

        for child in children:
            self.build_sitemap(product, child)

            entity = section or product
            if 'children' not in self.SITEMAP['sections'][entity.id]:
                self.SITEMAP['sections'][entity.id]['children'] = list()

            self.SITEMAP['sections'][entity.id]['children'].append(
                child.id
            )

        for chapter in chapters:
            if chapter.playlist_id not in self.SITEMAP['playlists']:
                self.SITEMAP['playlists'][chapter.playlist_id] = {
                    'parent': chapter.playlist.section_id,
                    'entity': chapter.playlist,
                    'chapters': list(),
                }

            entity = section or product
            if 'playlists' not in self.SITEMAP['sections'][entity.id]:
                self.SITEMAP['sections'][entity.id]['playlists'] = list()

            if chapter.playlist_id not in self.SITEMAP[
                    'sections'][entity.id]['playlists']:
                self.SITEMAP['sections'][entity.id]['playlists'].append(
                    chapter.playlist_id)

            if chapter.id not in self.SITEMAP['chapters']:
                self.SITEMAP['chapters'][chapter.id] = {
                    'entity': chapter,
                    'parent': chapter.playlist_id
                }

            self.SITEMAP['playlists'][chapter.playlist_id][
                'chapters'].append(chapter.id)
            if section:
                link = self.build_url(product, section=section,
                                      chapter=chapter)
            else:
                link = self.build_url(product, chapter=chapter)

            self.SITEMAP['chapters'][chapter.id]['link'] = link

    def generate_sitemap(self):
        """Generate sitemap for tenant."""
        self.SITEMAP = {
            'sections': OrderedDict(),
            'playlists': dict(),
            'chapters': dict()
        }
        products = Section.query.filter_by(
            tenant_id=self.tenant.id,
            parent_id=None,
            is_hidden=False,
            is_enabled=True,
            is_private=False,
            is_deleted=False
        ).order_by(Section.order).all()

        for product in products:
            self.build_sitemap(product)

        # write data to file
        self.write_to_file()

    def run(self, domain, export_format, embed_link):
        """Function to generate sitemap for tenants."""
        supported_formats = ['csv', 'xls', 'xml']

        if export_format not in supported_formats:
            print('Export format not supported!')
            sys.exit(0)

        self.export_format = export_format
        self.is_embed_link = embed_link

        tenant = Tenant.query.filter(
            Tenant.domain == unicode(domain)
        ).first()
        if not tenant:
            print("Tenant doesn't exist!")
            sys.exit(0)

        self.tenant = tenant

        current_app.config['SERVER_NAME'] = tenant.domain
        with current_app.app_context() and\
                current_app.test_request_context():
            self.generate_sitemap()


class DigestMail(Command):

    option_list = (
        Option('-date', dest='to_date', required=False, default=None,
               help="Enter in 'DD-MM-YYYY' format."),
        Option('-domain', dest='domain', required=False,
               type=unicode, default=None, help="Enter a tenant Id."),
        Option('-show_guide_report', dest='show_guide_report', required=False,
               type=bool, default=False),
        Option('-exclude_domain', dest='exclude_domain', required=False,
               type=unicode, nargs="*", default=None)
    )

    """
    -date       - DateTime.
                  Format - DD-MM-YYYY.
    -domain     - Unicode.
    -show_guide_report - Boolean.

    -show_guide_report is optional.
        True/False to calculate guide level reports.
    example command:
        python manage.py send-digest-mail \
            -date 14-10-2019 -show_guide_report=True\
            -exclude_domain xyz.com abc.com

    """
    def get_category_user_data_details(self, category, date_range):
        tenant = category.tenant
        num_of_visitors = 0
        visitors_progress = 0

        unique_vistors = SiteVisitors.query.filter(
            (SiteVisitors.from_date.between(
                date_range['cur_start'], date_range['cur_end'])) &
            (SiteVisitors.product == unicode(category)) &
            (SiteVisitors.tenant_id == tenant.id))\
            .with_entities(
                func.sum(SiteVisitors.site_visitors_count)
                .label('site_visitors_count')).first()

        num_of_visitors = 0
        if unique_vistors and unique_vistors.site_visitors_count:
            num_of_visitors = unique_vistors.site_visitors_count

        prev_uq_vistors = SiteVisitors.query.filter(
            (SiteVisitors.from_date.between(
                date_range['prev_start'], date_range['prev_end'])) &
            (SiteVisitors.product == unicode(category)) &
            (SiteVisitors.tenant_id == tenant.id))\
            .with_entities(
                func.sum(SiteVisitors.site_visitors_count)
                .label('site_visitors_count')).first()

        previous_num_of_visitors = 0
        if prev_uq_vistors and prev_uq_vistors.site_visitors_count:
            previous_num_of_visitors = prev_uq_vistors.site_visitors_count

        visitors_progress = get_progress_difference(
            num_of_visitors, previous_num_of_visitors)

        section_trans = get_default_translation(category)
        category.name = section_trans.name

        return {
            'visitors_progress': visitors_progress,
            'mail_template': 'reports/analyst.html',
            'mail_subject_suffix': str(category)
        }

    def get_category_common_details(self, category, date_range):

        tenant = category.tenant
        cur_visit_data = get_visitors_data(
            date_range['cur_start'],
            date_range['cur_end'],
            tenant.id,
            category=unicode(category)
        )
        prev_visit_data = get_visitors_data(
            date_range['prev_start'],
            date_range['prev_end'],
            tenant.id,
            category=unicode(category)
        )
        visitors_progress = get_progress_difference(
            cur_visit_data['visitors'], prev_visit_data['visitors'])
        current_views_data = get_views_and_completion_rate(
            date_range['cur_start'],
            date_range['cur_end'],
            tenant.id,
            category=unicode(category)
        )
        prev_views_data = get_views_and_completion_rate(
            date_range['prev_start'],
            date_range['prev_end'],
            tenant.id,
            category=unicode(category)
        )
        demo_views_progress = get_progress_difference(
            current_views_data['views'],
            prev_views_data['views']
        )
        completion_rate_progress = get_progress_difference(
            current_views_data['completion_rate'],
            prev_views_data['completion_rate']
        )

        section_trans = get_default_translation(category)
        category.name = section_trans.name

        if tenant.flags.is_private:
            top_viewers = VisitActivity.query.join(
                UserActivity
            ).join(User).filter(
                User.role_id == 4,
                UserActivity.tenant_id == tenant.id,
                VisitActivity.walkthrough_id.isnot(None),
                VisitActivity.created_at.between(
                    date_range['cur_start'], date_range['cur_end']),
                UserActivity.user_id.isnot(None),
                VisitActivity.product.__eq__(category)
            ).with_entities(
                User.first_name, User.last_name,
                func.count(VisitActivity.walkthrough_id).label('demo_views')
            ).group_by(
                User.first_name, User.last_name
            ).order_by(desc('demo_views'), User.first_name).limit(5).all()

        visitor_refs = get_visitors_referral_data(
            date_range['cur_start'], date_range['cur_end'],
            tenant.id, unicode(category))

        local_start_date = get_local_time(
            tenant.timezone, date_range['cur_start'])
        local_end_date = get_local_time(tenant.timezone, date_range['cur_end'])

        return {
            'tenant': tenant,
            'new_visitors': cur_visit_data['visitors'],
            'category': category,
            'date_range': {
                'start_date': datetime.strftime(local_start_date, '%B %d, %Y'),
                'end_date': datetime.strftime(local_end_date, '%B %d, %Y')
            },
            'demo_views': current_views_data['views'],
            'completion_rate': current_views_data['completion_rate'],
            'demo_views_progress': demo_views_progress,
            'completion_rate_progress': completion_rate_progress,
            'visitors_progress': visitors_progress,
            'from_date': local_start_date,
            'to_date': local_end_date,
            'top_viewers': top_viewers if tenant.flags.is_private else None,
            'visitor_referals': visitor_refs[:5]
        }

    def get_tenant_details(self, tenant, date_range, show_viewers=False):
        cur_visit_data = get_visitors_data(
            date_range['cur_start'],
            date_range['cur_end'],
            tenant.id,
            category='all'
        )
        prev_visit_data = get_visitors_data(
            date_range['prev_start'],
            date_range['prev_end'],
            tenant.id,
            category='all'
        )

        visitors_progress = get_progress_difference(
            cur_visit_data['visitors'], prev_visit_data['visitors'])

        cur_views_data = get_views_and_completion_rate(
            date_range['cur_start'],
            date_range['cur_end'],
            tenant.id,
            category='all'
        )
        prev_views_data = get_views_and_completion_rate(
            date_range['prev_start'],
            date_range['prev_end'],
            tenant.id,
            category='all'
        )

        demo_views_progress = get_progress_difference(
            cur_views_data['views'], prev_views_data['views'])
        completion_rate_progress = get_progress_difference(
            cur_views_data['completion_rate'],
            prev_views_data['completion_rate']
        )

        visitor_refs = get_visitors_referral_data(
            date_range['cur_start'], date_range['cur_end'],
            tenant.id, category='all')

        local_start_date = get_local_time(
            tenant.timezone, date_range['cur_start'])
        local_end_date = get_local_time(tenant.timezone, date_range['cur_end'])

        return {
            'tenant': tenant,
            'category': 'all',
            'date_range': {
                'start_date': datetime.strftime(local_start_date, '%B %d, %Y'),
                'end_date': datetime.strftime(local_end_date, '%B %d, %Y')
            },
            'new_visitors': cur_visit_data['visitors'],
            'demo_views': cur_views_data['views'],
            'completion_rate': cur_views_data['completion_rate'],
            'visitors_progress': visitors_progress,
            'demo_views_progress': demo_views_progress,
            'completion_rate_progress': completion_rate_progress,
            'from_date': local_start_date,
            'to_date': local_end_date,
            'visitor_referals': visitor_refs[:5],
            'mail_template': 'reports/analyst.html',
            'mail_subject_suffix': "All Sections"
        }

    def get_new_content_categories(self, tenant, start_date, end_date):
        """Get the category list having the newly published demos during given daterange."""
        walkthrough_dict = dict()
        walkthrough_list = []
        draft_demos_count = 0
        walkthroughs = Walkthrough.query.filter(
            Walkthrough.tenant_id == tenant.id,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True),
            Walkthrough.created_at.between(start_date, end_date))\
            .order_by(desc(Walkthrough.created_at)).all()

        total_draft_demos_timerange = DraftWalkthrough.query.filter(
            DraftWalkthrough.tenant_id == tenant.id,
            DraftWalkthrough.is_deleted.__eq__(False),
            DraftWalkthrough.created_at.between(start_date, end_date),
            ~Walkthrough.query.filter(
                DraftWalkthrough.id == Walkthrough.draft_id
            ).exists()
        ).all()

        for draft_walkthrough in total_draft_demos_timerange:
            playlist = draft_walkthrough.playlist
            if playlist.is_deleted or not playlist.is_enabled or\
                    not playlist.section.is_available():
                continue
            draft_demos_count += 1

        for walkthrough in walkthroughs:
            playlist = walkthrough.playlist
            if playlist.is_deleted or not playlist.is_enabled or\
                    not playlist.section.is_available():
                continue
            parent_section = playlist.section.get_category()
            local_created_time = get_local_time(tenant.timezone, walkthrough.created_at)
            wt_params = {'walkthrough': walkthrough,
                         'created_at': local_created_time}
            walkthrough_list.append(wt_params)
            if not walkthrough_dict.get(parent_section.id):
                walkthrough_dict[parent_section.id] = {'chapter_count': 1,
                                                       'section_name': parent_section}
            else:
                walkthrough_dict[parent_section.id]['chapter_count'] += 1
        category_list = sorted([{k: v} for k, v in walkthrough_dict.items()],
                               key=lambda x: x.values()[0]['chapter_count'],
                               reverse=True)
        walkthrough_details = get_tenant_walkthrough_slides_counts(tenant.id)
        total_published_demos = walkthrough_details.get('total_live_demos')
        total_draft_demos = walkthrough_details.get('total_draft_demos') - total_published_demos
        return {
            'category_list': category_list[:5],
            'walkthrough_list': walkthrough_list[:5],
            'draft_demos_timerange': draft_demos_count,
            'published_demo_timerange': len(walkthrough_list),
            'total_published_demos': total_published_demos,
            'total_draft_demos': total_draft_demos
        }

    def get_top_authors(self, tenant, start_date, end_date):
        """Get Top Authors."""
        """Get the top authors(Actions includes 'created', 'edited', 'published')
        during the given datetime range"""

        action_list = [u'created', u'edited', u'published']
        top_authors_query = User.query.join(
            ActivityFeed, ActivityFeed.primary_user_id == User.id
        ).filter(
            User.tenant_id == tenant.id,
            User.is_deleted.__eq__(False),
            ActivityFeed.primary_user_id == User.id,
            ActivityFeed.action.in_(action_list),
            ActivityFeed.entity == u'walkthrough',
            ActivityFeed.created_at.between(start_date, end_date)
        ).with_entities(
            (User.first_name + u' ' + User.last_name).label('fullname'),
            func.count(
                func.distinct(ActivityFeed.draft_walkthrough_id)
            ).label('count')
        ).group_by(
            User.id
        ).order_by(
            desc('count')
        ).limit(5)
        top_author_list = [{
            'author_name': author.fullname,
            'chapter_count': author.count
        } for author in top_authors_query]

        return top_author_list

    def get_latest_content(self, tenant, date_range, frequency):
        chapters = Walkthrough.query.filter(
            Walkthrough.tenant_id == tenant.id,
            Walkthrough.is_deleted.__eq__(False),
            Walkthrough.is_enabled.__eq__(True),
            Walkthrough.created_at.between(
                date_range['cur_start'], date_range['cur_end'])
        ).order_by(
            desc(Walkthrough.created_at)
        ).all()
        chapter_list = []
        for chapter in chapters:
            playlist = chapter.playlist
            section = playlist.section
            if playlist.is_deleted or not playlist.is_enabled or\
                    not section.is_available():
                continue
            chapter_list.append({
                'name': unicode(chapter),
                'created_at': get_local_time(tenant.timezone, chapter.created_at),
                'product_slug': section.get_category().slug,
                'section_slug': section.slug,
                'slug': chapter.slug,
                "thumbnail": chapter.get_thumbnail(tenant.default_locale_id)
            })

        template_args = dict()
        template_args['chapter_list'] = chapter_list
        template_args['frequency'] = frequency
        template_args['mail_template'] = '/reports/notification_mail.html'
        template_args['from_date'] = get_local_time(
            tenant.timezone, date_range['cur_start'])
        template_args['to_date'] = get_local_time(
            tenant.timezone, date_range['cur_end'])
        template_args['mail_subject_suffix'] = "Latest Updates"
        template_args['tenant'] = tenant
        return template_args

    def get_content_update_details(self, tenant, mail_digest, date_range):
        """Function to fetch details required for the Content Update Mail."""
        local_start_date = get_local_time(
            tenant.timezone, date_range['cur_start'])
        local_end_date = get_local_time(
            tenant.timezone, date_range['cur_end'])
        template_args = dict()
        content_data = self.get_new_content_categories(
            tenant, date_range['cur_start'], date_range['cur_end'])
        top_authors = self.get_top_authors(tenant, date_range['cur_start'],
                                           date_range['cur_end'])
        template_args['top_authors'] = top_authors[:5]
        template_args['content_data'] = content_data
        template_args['tenant'] = tenant
        website_url = current_app.config.get(
            'SDEMOS_WEBSITE_URL')
        template_args['sdemos_website_url'] = website_url
        template_args[
            'frequency'] = mail_digest.frequency.lower().strip('ly')
        template_args['from_date'] = local_start_date
        template_args['to_date'] = local_end_date
        template_args[
            'mail_template'] = "reports/content_update_mail.html"
        template_args[
            'mail_subject_suffix'] = "Content Updates"
        return template_args

    def get_viewer_report_details(self, tenant, mail_digest,
                                  date_range, show_guide_report):
        """Function to fetch the details required for the Analyst Report Mail."""
        category = mail_digest.section
        tenant_id = tenant.id
        trending_demos = []
        trending_categories = []
        trending_guides = []
        least_viewed_guides = []
        most_viewed_chapter = {}
        most_viewed_guide = {}
        if show_guide_report:
            guides_reports = self.get_guides_reports(
                tenant_id,
                date_range,
                section_name=unicode(category) if category else None
            )
            trending_guides = guides_reports.get('trending_guides')

            least_viewed_guides = guides_reports.get('least_viewed_guides')

            for guide in guides_reports.get('most_viewed_guide'):
                most_viewed_guide.update(
                    guide=guide['section'],
                    views=guide['views']
                )
        else:
            current_trending_demos = get_trending_demos(
                date_range['cur_start'],
                date_range['cur_end'],
                tenant_id,
                category=unicode(category) if category else None
            )

            previous_trending_demos = get_trending_demos(
                date_range['prev_start'],
                date_range['prev_end'],
                tenant_id,
                current_trending_demos,
                category=unicode(category) if category else None
            )

            prev_tren_demos = {
                demo.walkthrough: demo.count
                for demo in previous_trending_demos
            }

            for demo in current_trending_demos:
                progress = get_progress_difference(
                    demo.count, prev_tren_demos.get(
                        demo.walkthrough, 0))
                trending_demos.append({
                    'walkthrough': demo.walkthrough,
                    'count': demo.count,
                    'progress': progress
                })

            for chapter in trending_demos[:1]:
                most_viewed_chapter.update(
                    walkthrough=chapter['walkthrough'],
                    count=chapter['count']
                )
            current_trending_categories = get_trending_categories(
                date_range['cur_start'],
                date_range['cur_end'],
                tenant_id,
                category=unicode(category) if category else None
            )

            previous_trending_categories = get_trending_categories(
                date_range['prev_start'],
                date_range['prev_end'],
                tenant_id,
                current_trending_categories.keys(),
                category=unicode(category) if category else None
            )

            for section_id, data in current_trending_categories.items():
                prev_visits_count = 0
                if previous_trending_categories.get(section_id):
                    prev_visits_count = previous_trending_categories[
                        section_id]['count']
                trending_categories.append({
                    'views': data['count'],
                    'section': data['section'],
                    'progress': get_progress_difference(
                        data['count'], prev_visits_count)
                })

            trending_categories = sorted(trending_categories,
                                         key=lambda k: k['views'],
                                         reverse=True)

        best_views = get_best_demoviews(
            date_range['cur_start'], date_range['cur_end'],
            tenant_id, category=unicode(category) if category else 'all')
        template_args = dict()
        template_args['frequency'] = mail_digest.frequency.title()
        template_args['trending_demos'] = trending_demos[:5]
        template_args['most_viewed_chapter'] = most_viewed_chapter
        template_args['most_viewed_guide'] = most_viewed_guide
        template_args['trending_categories'] = trending_categories[:5]
        template_args['trending_guides'] = trending_guides
        template_args['least_viewed_guides'] = least_viewed_guides
        template_args['header_content'] = {
            'max_views': best_views.get('max_views'),
            'max_views_date': best_views.get('max_views_date')
        }
        if category:
            common_details = self.get_category_common_details(
                category, date_range)
            visitors = self.get_category_user_data_details(
                category, date_range)
            visitors.update(common_details)
            visitors.update(template_args)
            visitors_template_args = visitors
        else:
            all_viewers_data = self.get_tenant_details(
                tenant, date_range)
            all_viewers_data.update(template_args)
            visitors_template_args = all_viewers_data
        return visitors_template_args

    def get_usergroups_reports(self, tenant, product, date_range):

        product_id = product.id if product else None

        popular_chapters = dict()
        visitors = dict()
        demo_views = dict()
        completion_rate = dict()

        visitors_data = get_site_visitors(
            date_range['cur_start'],
            date_range['cur_end'],
            product_id,
            tenant.id
        )

        demo_views_data = get_demo_views(
            date_range['cur_start'],
            date_range['cur_end'],
            product_id,
            tenant.id
        )

        completion_rate_data = get_completion_rate(
            date_range['cur_start'],
            date_range['cur_end'],
            product_id,
            tenant.id
        )
        common_group_user_ids = UserGroupMappings.query.join(
            User).join(UserGroup).filter(
            User.tenant_id == tenant.id,
            User.role_id != 1
        ).having(func.count(UserGroup.name) > 1).group_by(
            UserGroupMappings.user_id
        ).with_entities(UserGroupMappings.user_id).all()

        for user_group in tenant.user_groups:
            if user_group.role_id == 1:
                continue
            current_popular_demos = get_popular_demos(
                start_date=date_range['cur_start'],
                end_date=date_range['cur_end'],
                tenant_id=tenant.id,
                product_id=product_id,
                user_group=user_group.slug
            )

            previous_popular_demos = get_popular_demos(
                start_date=date_range['prev_start'],
                end_date=date_range['prev_end'],
                tenant_id=tenant.id,
                product_id=product_id,
                user_group=user_group.slug
            )

            popular_chapters[user_group.slug] = get_popular_demos_details(
                current_popular_demos,
                previous_popular_demos,
                tenant.id
            )

            visitors[user_group.slug] = visitors_data.filter(
                UserGroup.slug == user_group.slug,
                UserActivity.user_id.notin_(common_group_user_ids)
            ).distinct(UserActivity.user_id).count()

            _demo_views = demo_views_data.filter(
                UserGroup.slug == user_group.slug,
                UserActivity.user_id.notin_(common_group_user_ids)
            ).with_entities(
                func.count(func.distinct(VisitActivity.id)).label("views_count")
            ).first()
            demo_views[user_group.slug] = _demo_views.views_count

            usergroup_completion_rate = completion_rate_data.filter(
                UserGroup.slug == user_group.slug,
                UserActivity.user_id.notin_(common_group_user_ids)
            )
            started = usergroup_completion_rate.count()
            completed = usergroup_completion_rate.filter(
                CompletionActivity.entity_total <= CompletionActivity.entity_complete
            ).count()
            completion_rate[user_group.slug] = int(round(
                (completed / float(started or 1)) * 100))

        local_start_date = get_local_time(
            tenant.timezone, date_range['cur_start'])

        local_end_date = get_local_time(tenant.timezone, date_range['cur_end'])

        if tenant.template.lower() == u'bmc':
            if visitors:
                visitors['maximum'] = visitors[max(visitors, key=visitors.get)] or 1
            if demo_views and common_group_user_ids:
                demo_views['partner_customer'] = demo_views_data.filter(
                    UserActivity.user_id.in_(common_group_user_ids)
                ).distinct(VisitActivity.id).count()
                demo_views['maximum'] = demo_views[
                    max(demo_views, key=demo_views.get)] or 1
            if completion_rate:
                partner_customer_completion_data = completion_rate_data.filter(
                    UserActivity.user_id.in_(common_group_user_ids)
                )
                started = partner_customer_completion_data.count()
                completed = partner_customer_completion_data.filter(
                    CompletionActivity.entity_total <= CompletionActivity.entity_complete
                ).count()
                completion_rate['partner_customer'] = int(round(
                    (completed / float(started or 1)) * 100))

                completion_rate['maximum'] = completion_rate[
                    max(completion_rate, key=completion_rate.get)] or 1

            # popular views for partner and customer
            current_popular_demos = get_popular_demos(
                start_date=date_range['cur_start'],
                end_date=date_range['cur_end'],
                tenant_id=tenant.id,
                product_id=product_id,
                common_group=True
            )

            previous_popular_demos = get_popular_demos(
                start_date=date_range['prev_start'],
                end_date=date_range['prev_end'],
                tenant_id=tenant.id,
                product_id=product_id,
                common_group=True
            )

            popular_chapters['partner_customer'] = get_popular_demos_details(
                current_popular_demos,
                previous_popular_demos,
                tenant.id
            )

        total_demo_views = demo_views_data.with_entities(
            func.count(func.distinct(VisitActivity.id)).label("views_count")
        ).first()
        demo_views['total_views'] = total_demo_views.views_count

        visitors['total_visitors'] = visitors_data.distinct(
            UserActivity.user_id).count()

        started = len(completion_rate_data.all())
        completed = len(completion_rate_data.filter(
            CompletionActivity.entity_total <= CompletionActivity.entity_complete
        ).all())

        completion_rate['total_completion_rate'] = int(round(
            (completed / float(started or 1)) * 100))
        return {
            'tenant': tenant,
            'from_date': local_start_date,
            'to_date': local_end_date,
            'popular_chapters': popular_chapters,
            'demo_views': demo_views,
            'site_visitors': visitors,
            'completion_rate': completion_rate,
            'mail_template': 'reports/' + tenant.template.lower() + '_analyst_mail.html',
            'mail_subject_suffix': unicode(product) if product else "All Sections",
            'category': unicode(product) if product else 'all'
        }

    def get_guides_reports(self, tenant_id, date_range, section_name=None):
        """
        Get storagehub tenant reports.

        Will get reports specific to storagehub.vwware.com tenant.

        params:
            tenant_id   - Integer.
            date_range  - Dictionary.
                          Having current and previous time slots
                          for given date range.
            section_name- Unicode.

        """
        guides_reports = {}

        # For storagehub will consider its leaf section as parent category not the product.
        current_trending_chapters = get_trending_demos(
            date_range['cur_start'],
            date_range['cur_end'],
            tenant_id,
            section=section_name,
            limit=None
        )

        previous_trending_chapters = get_trending_demos(
            date_range['prev_start'],
            date_range['prev_end'],
            tenant_id,
            section=section_name,
            limit=None
        )

        guides = get_guides_details(
            current_trending_chapters,
            previous_trending_chapters,
            tenant_id,
            date_range['cur_end']
        )

        # Get most viewed guide from the top_guides List.
        guides_reports['most_viewed_guide'] = guides.get('trending_guides')[0:1]
        guides_reports['trending_guides'] = guides.get('trending_guides')
        guides_reports['least_viewed_guides'] = guides.get('least_viewed_guides')

        return guides_reports

    def run(self, to_date, domain, show_guide_report, exclude_domain):
        """Function to send Weekly/Monthly/Quarterly Digest Mail."""
        mailer_object = Mailer()
        mail_digest_query = MailDigest.query.filter(
            MailDigest.is_disabled.__eq__(False)
        )
        if domain:
            mail_digest_query = mail_digest_query.join(
                Tenant
            ).filter(
                Tenant.domain == domain
            )
        elif exclude_domain:
            mail_digest_query = mail_digest_query.join(
                Tenant
            ).filter(
                Tenant.domain.notin_(exclude_domain)
            )

        mail_digests_list = mail_digest_query.all()
        for mail_digest in mail_digests_list:
            category = mail_digest.section
            if category and (category.is_deleted or not category.is_enabled):
                continue

            mail_users = {user for user in mail_digest.mail_digest_users
                          if not user.unsubscribe}
            if not mail_users:
                continue

            tenant = mail_digest.tenant
            formatted_to_date = datetime.strptime(
                to_date, '%d-%m-%Y') if to_date else datetime.utcnow()
            formatted_to_date = formatted_to_date.replace(
                hour=0, minute=0, second=0, microsecond=0
            )
            timezone_datetime = get_timezone_specific_datetime(
                tenant.timezone,
                formatted_to_date
            )

            """
                send mail only if its first day of the week or
                first day of the month or
                first day of the quarter year
            """
            if mail_digest.frequency == 'weekly' and\
                    timezone_datetime.weekday() != 0:
                continue
            elif mail_digest.frequency == 'monthly' and\
                    timezone_datetime.day != 1:
                continue
            elif mail_digest.frequency == 'quarterly' and\
                    (timezone_datetime.month not in [1, 4, 7, 10] or
                     timezone_datetime.day != 1):
                continue
            mail_frequency = mail_digest.frequency.lower().strip('ly')

            if mail_frequency == 'week':
                from_date = add_date_time(formatted_to_date, days=-7)
            elif mail_frequency == 'month':
                from_date = add_date_time(formatted_to_date, months=-1)
            elif mail_frequency == 'quarter':
                from_date = add_date_time(formatted_to_date, months=-3)

            formatted_to_date = add_date_time(formatted_to_date, seconds=-1)
            csd, ced, psd, ped = get_time_bounds(
                'custom',
                from_date,
                to_date=formatted_to_date,
                timezone=tenant.timezone
            )

            date_range = {
                'cur_start': csd,
                'cur_end': ced,
                'prev_start': psd,
                'prev_end': ped
            }

            templates = list()

            if mail_digest.show_content_updates:
                update_template = self.get_content_update_details(
                    tenant, mail_digest, date_range)
                templates.append(update_template)
            if tenant.template.lower() == u'bmc'\
                    and mail_digest.show_new_content:
                templates.append(
                    self.get_latest_content(
                        tenant, date_range,
                        mail_digest.frequency.lower().strip('ly')
                    )
                )
            if mail_digest.show_visitors or mail_digest.show_viewers\
                    or mail_digest.show_leads:
                if tenant.template.lower() in [u'purestorage', u'bmc']\
                        and tenant.flags.is_private:
                    viewer_data = self.get_usergroups_reports(
                        tenant, mail_digest.section, date_range)
                    templates.append(viewer_data)
                else:
                    viewer_template = self.get_viewer_report_details(
                        tenant, mail_digest, date_range, show_guide_report)
                    templates.append(viewer_template)

            for template in templates:
                mail_from = formataddr(
                    (str(Header('ShareDemos Admin', 'utf-8')),
                     'sharedemos@regalix-inc.com'))
                mail_subject = "{} - {} Report - {}".format(
                    tenant.domain,
                    mail_digest.frequency.title(),
                    template.get('mail_subject_suffix')
                )
                mail_body = MIMEText(
                    (render_template('mail/' + template.get('mail_template'),
                                     **template))
                    .encode('utf-8'), 'html')
                tracking_code = tenant.campaign_tracking_code
                for user in mail_users:
                    mailer_object.send_mail(
                        str(user.email.strip()), mail_from,
                        mail_subject, mail_body,
                        campaign_tracking_code=tracking_code)

        mailer_object.close_mail()
        return 'Success !'


class AddUserFromCSV(Command):
    option_list = (
        Option('-file', dest='file'),
        Option('-domain', dest='domain')
    )

    def adduser(self, row):
        first_name = unicode(row[0])
        last_name = unicode(row[1])
        email = unicode(row[2])
        user = User.query.filter(
            (User.tenant_id == self.tenant.id) &
            (func.lower(User.email) == func.lower(unicode(row[2]))) &
            (User.is_deleted.__eq__(False))
        ).first()
        if user:
            print 'User with the given email {} already exists'.format(email)
            return
        user = User()
        user.first_name = first_name
        user.last_name = last_name
        user.email = email
        user.unique_user_id = unicode(get_random_string(length=6))
        user.role_id = 4
        user.tenant_id = self.tenant.id
        tenant_title = self.tenant.title or 'Product Walkthroughs'

        current_app.config['SERVER_NAME'] = self.tenant.domain
        with current_app.test_request_context():
            register_url = url_for(
                'auth.register_user',
                unique_user_id=user.unique_user_id,
                _external=True)

        template_args = {
            'user_first_name': first_name,
            'admin_name': 'Admin',
            'tenant_title': tenant_title,
            'register_url': register_url,
            'sdemos_website_url': current_app.config.get('SDEMOS_WEBSITE_URL')
        }

        mailer_object = Mailer()

        mail_from = "Sharedemos <support@sharedemos.com>"
        mail_subject = "Admin has added you to " + tenant_title
        mail_body = MIMEText(
            (render_template('mail/user_role_notification.html',
             **template_args)).encode('utf-8'), 'html')

        mail_status = mailer_object.send_mail(
            user.email.strip(), mail_from, mail_subject, mail_body)
        mailer_object.close_mail()

        if not mail_status:
            user.email_sent = False
        db.session.add(user)
        db.session.commit()
        log_last_activity('created', 'user', user)

    def run(self, file, domain):
        tenant = Tenant.query.filter(Tenant.domain == unicode(domain)).first()
        if not tenant:
            print("Tenant does not exist!")
            sys.exit(0)

        if not file:
            print("Please ensure to input csv file!")
            sys.exit(0)

        self.tenant = tenant

        with open(file) as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                self.adduser(row)


class GenerateRTEThumbnail(Command):
    option_list = (
        Option('-slug', dest='slug', required=True),
        Option('-domain', dest='domain', required=True)
    )

    def run(self, slug, domain):
        tenant = Tenant.query.filter(
            Tenant.domain == unicode(domain)
        ).first()
        if not tenant:
            print("Tenant doesn't exist!")
            sys.exit(0)

        demo = Walkthrough.query.filter_by(
            tenant_id=tenant.id, slug=unicode(slug)).first_or_404()
        if demo:
            first_slide = demo.get_first_slide()
        if first_slide and first_slide.primary_resource and\
                first_slide.primary_resource.resource_type == 'content':
            from sharedemos.tasks import server_side_image_generation
            server_side_image_generation({
                'slide_id': first_slide.id,
                'host': tenant.domain
            })


class CreateTenant(Command):

    option_list = (
        Option('-domain', dest='domain'),
        Option('-tenant_name', dest='tenant_name'),
        Option('-timezone', dest='timezone'),
        Option('-user_email', dest='email'),
        Option('-user_first_name', dest='first_name'),
        Option('-user_last_name', dest='last_name'),
    )

    def run(self, domain=None, tenant_name=None, timezone=None,
            email=None, first_name=None, last_name=None):
        domain_name = unicode(domain) if domain else u'localhost:5000'

        tenant = Tenant.query.filter(
            Tenant.domain == domain_name
        ).first()

        if tenant:
            print "Tenant with name: %s already exist." % domain
            if domain:
                print "Please choose different domain name."
            else:
                print "Use -domain <name> to provide name of your own."
            return

        last_tenant = Tenant.query.with_entities(
            func.max(Tenant.id).label('id')
        ).first()

        tenant = Tenant()
        tenant.id = ((last_tenant.id + 1) or 1) if last_tenant else 1
        tenant.name = unicode(tenant_name) if tenant_name else u'Local'
        tenant.domain = domain_name
        tenant.timezone = unicode(timezone) if timezone else u'US/Pacific'
        db.session.add(tenant)

        r_tenant = ReportTenant()
        r_tenant.id = tenant.id
        r_tenant.name = tenant.name
        r_tenant.domain = tenant.domain
        r_tenant.timezone = tenant.timezone
        db.session.add(r_tenant)

        tenant_flags = TenantFlags()
        tenant_flags.id = tenant.id
        tenant_flags.tenant_id = tenant.id
        db.session.add(tenant_flags)

        user = User()
        user.tenant_id = tenant.id
        user.first_name = unicode(first_name) if first_name else u'John'
        user.last_name = unicode(last_name) if last_name else u'Doe'
        user.email = unicode(email) if email else u'johndoe@example.com'
        user.password = u'sdemos123'
        user.role_id = 1
        db.session.add(user)

        last_activity = LastActivity()
        last_activity.tenant_id = tenant.id
        last_activity.action = u'created'
        last_activity.entity = u'tenant'
        last_activity.entity_id = tenant.id
        db.session.add(last_activity)

        db.session.commit()

        print 'Successful!!'


manager.add_command('adduser-from-csv', AddUserFromCSV)
manager.add_command('algolia-search', AlgoliaSearch)
manager.add_command('create-tenant', CreateTenant)
manager.add_command('cache-buster', AddCacheBuster)
manager.add_command('db', MigrateCommand)
manager.add_command('disable-entity', DisableEntity)
manager.add_command('generate-rte-thumbnail', GenerateRTEThumbnail)
manager.add_command('generate-sitemap', SitemapGenerator)
manager.add_command('generate-theme', GenerateTheme)
manager.add_command('runserver', DevServer)
manager.add_command('send-digest-mail', DigestMail)
manager.add_command('sync-algolia-analytics', AlgoliaAnalytics)


if __name__ == '__main__':
    manager.run()
