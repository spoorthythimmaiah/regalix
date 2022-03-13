"""Sharedemos main routes view."""
from babel.dates import format_date
from bs4 import BeautifulSoup
from email.MIMEText import MIMEText
import hashlib
import hmac
import json
import locale
import logging
import os
import pdfkit
import re
import requests
import sys
import urllib
import urlparse

from sqlalchemy.sql.expression import func
from flask import (
    abort,
    Blueprint,
    current_app,
    g,
    jsonify,
    redirect,
    render_template,
    request,
    session,
    send_file,
    url_for
)
from flask.ext.restful import marshal

from sharedemos.api.download import log_download_activity
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.views import get_all_playlists, get_all_journeys
from sharedemos.models import (
    db,
    AnnouncementWidget,
    BulletinBoard,
    Checklist,
    ChecklistDraft,
    DraftPath,
    DraftWalkthrough,
    FAQDraftGroup,
    FAQGroup,
    FAQDraftSection,
    FAQSection,
    FAQDraft,
    FAQ,
    Journey,
    Leads,
    Option,
    Path,
    Playlist,
    Question,
    Quiz,
    QuizDraft,
    RedirectUrl,
    Resource,
    Section,
    SectionTranslations,
    SlugRevision,
    Tag,
    Tenant,
    User,
    UserActivity,
    UserGroup,
    Walkthrough,
    WalkthroughTranslations,
)
from sharedemos.api.launchpad import LaunchpadFeeder
from sharedemos.libs.bulletin_board import (
    bulletin_board_link_details,
    get_bulletin_board_link_details,
)
from sharedemos.libs.utils import (
    add_walkthrough_translation_details,
    check_access_and_get_redirect,
    check_parent_available,
    create_temporary_file,
    get_available_languages,
    get_chapter_api,
    get_complete_section_details,
    get_complete_walkthrough_details,
    get_formatted_rte_content_and_slide_notes,
    get_products_api,
    get_recently_viewed_chapters,
    get_section_api,
    get_tenant_api,
    get_tenant_header_footer,
    is_restricted_to_groups
)
from sharedemos.libs.model import (
    author_permission,
    get_pathfinder_suggestions
)
from sharedemos.libs.api import is_author, is_chapter_available
from sharedemos.libs.decorators import (
    app_subscription_required,
    check_template,
    check_user_access,
    check_user_group_access,
    login_required,
    template_required
)
from sharedemos.libs.helpers import (
    Mailer,
    create_folder,
    format_texteditor_content,
    get_homepage_banner_details,
    get_random_string,
    get_texteditor_css_files_path,
    get_translation,
    get_website_metadata,
    get_tenant_uuid,
    get_default_translation,
    get_locale_translation,
    log_pathfinder_suggestion_mail_activity,
    mail_pathfinder_suggestions
)
from sharedemos.libs.url import static_url


main = Blueprint('main', __name__)


def get_template_args(tenant_id, author=False):
    """
    Function to return template args.

    params:
        tenant_id- Integer tenant's ID
        author- Boolean value
    """
    tenant = Tenant.query.get(tenant_id)
    languages = [{
        'id': tenant.default_locale_id,
        'name': tenant.default_locale.name
    }]
    for language in tenant.supported_locales:
        if language.id != tenant.default_locale_id:
            languages.append({'id': language.id, 'name': language.name})

    user = session.get('author') if author else session.get('user')
    selected_language = user['locale'] if user else tenant.default_locale_id

    for language in languages:
        if language['id'] == selected_language:
            user['id'] = language.get('name')
            language['selected'] = True
            break

    airbrake_project_id = current_app.config.get('AIRBRAKE_PROJECT_ID')
    airbrake_api_key = current_app.config.get('AIRBRAKE_API_KEY')
    project_env = current_app.config.get('PROJECT_ENV')

    algolia_app_id = current_app.config.get('ALGOLIA_APPLICATION_ID')
    algolia_search_key = current_app.config.get('ALGOLIA_SEARCH_KEY')
    apps = [{'name': 'library', 'unique_id': 'library'}]
    tenant_apps = []
    for app in tenant.applications:
        if app.is_enabled and app.unique_id.lower() in current_app.config.get(
                'ALLOWED_APPS_FOR_ALGOLIA', []):
            tenant_apps.append({'unique_id': app.unique_id.lower(),
                                'name': app.name})
    tenant_apps = sorted(tenant_apps, key=lambda k: k.get('unique_id'))
    apps.extend(tenant_apps)
    pathfinder_app_enabled = 'pathfinder' in [app['unique_id'] for app in apps]
    tenant_flags = tenant.flags

    return {
        "tenant": tenant,
        "is_private": tenant_flags.is_private,
        "pathfinder_app_enabled": pathfinder_app_enabled,
        "bulletin_board_app_enabled": "bulletin_board" in [
            app.unique_id for app in tenant.applications],
        "languages": languages,
        "apps": apps,
        "airbrake_project_id": airbrake_project_id,
        "airbrake_api_key": airbrake_api_key,
        "project_env": project_env,
        "algolia_api": {
            "tenant_index": get_tenant_uuid(request.host),
            "app_id": algolia_app_id,
            "search_key": algolia_search_key
        },
        "document_styles": current_app.config[
            'STYLE_GUIDE_CLASS'].get(tenant.domain, '')
    }


def can_access_journey():
    # checking for user journey details
    tenant_id = getattr(current_app, "tenant_id", None)
    journeys = Journey.query.filter(
        Journey.tenant_id == tenant_id,
        Journey.is_enabled.__eq__(True),
        Journey.is_deleted.__eq__(False)
    )
    user_groups = getattr(g.user, 'groups', None)
    if g.user.is_active() and user_groups and not g.user.is_admin():
        group_ids = [grp.id for grp in user_groups]
        journeys = journeys.filter(
            Journey.restricted_to_groups.any(
                UserGroup.id.in_(group_ids)
            )
        )
    if journeys.all():
        return True
    return False


@main.route('/')
@check_user_access
def home(**kwargs):
    """Tenant home page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant = template_args['tenant']
    if tenant.template.lower() == u'avaya':
        return redirect(
            url_for('apps.feed')
        )

    is_widget_enabled = tenant.flags.is_announcement_widget_enabled
    announcement_widget = tenant.announcement_widget
    if is_widget_enabled and announcement_widget:
        trans = get_translation(announcement_widget)
        template_args['widget_title'] = trans.title
        template_args['widget_description'] = trans.description
        template_args['widget_result_title'] = trans.result_title
    template_args['is_announcement_widget_enabled'] = is_widget_enabled
    enable_homepage_banner = tenant.flags.enable_homepage_banner
    if enable_homepage_banner and tenant.homepage_banner:
        template_args.update({
            'banner_details': get_homepage_banner_details(),
            'enable_homepage_banner': enable_homepage_banner
        })
    linkedin_app = None
    for app in tenant.tenant_applications:
        if app.application.unique_id.upper() in ['MESSAGING', 'RATING']:
            linkedin_app = app
            break

    template_args.update(dict(
        view_type='home',
        linkedin_app=linkedin_app
    ))

    if tenant.template:
        tenant_template = tenant.template.lower()
        if tenant_template in [
                'bmc', 'vmware', 'purestorage',
                'helpsite', 'dell', 'silverpeak', 'regalix', 'designeverest']:
            api_data = {}
            if tenant_template == u'silverpeak':
                api_data = get_all_playlists()

            elif tenant_template == u'regalix':
                api_data = get_all_journeys()

            else:
                api_data = get_products_api()

            if (not (api_data.get('all_products')or
                     api_data.get('all_playlists') or
                     api_data.get('all_journeys'))) and kwargs.get('ret_url'):
                query_args = {
                    'next': '/'
                }
                query_args.update(kwargs.get('args', {}))
                url = kwargs.get('ret_url') + '?{}'.format(
                    urllib.urlencode(query_args))
                return redirect(url)

            template_args.update({'api': api_data})
            if getattr(g.user, 'groups', None):
                user_groups = g.user.groups
                template_args.update({
                    'user_groups': [grp.id for grp in user_groups]
                })

                # Required only for 'purestorage' to display custom msg.
                template_args.update({
                    'is_partner': u'partner' in [
                        grp.slug for grp in user_groups]
                })
            sample_exchange = tenant.sample_exchange
            if sample_exchange:
                sample_details = {
                    "title": sample_exchange.title or "",
                    "description": sample_exchange.description or ""
                }
                template_args.update({'sample_details': sample_details})

            # adding has_journey field for current user
            template_args.update({"can_access_journey": can_access_journey()})

            return render_template(
                'tenants/seo/' + tenant_template + '/products_list.html',
                **template_args
            )

    return render_template('walkthrough.html', **template_args)


@main.route('/announcement-widget/latest')
@check_user_access
@template_required(['vmware'])
def announcement_widget(**kwargs):
    """Walkthrough filter by tags."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant_settings = get_tenant_api()
    chapter_list = list()
    if not template_args['tenant'].flags.is_announcement_widget_enabled:
        abort(404)
    widget = AnnouncementWidget.query.filter(
        AnnouncementWidget.tenant_id == tenant_id).first_or_404()
    widget_trans = get_translation(widget)
    tag_ids = widget_trans.chapter_tags
    template_args['widget_result_title'] = widget_trans.result_title
    if tag_ids:
        chapters = Walkthrough.query.join(
            WalkthroughTranslations
        ).join(
            Tag, Tag.id == func.any(WalkthroughTranslations.tag_ids)
        ).join(
            Playlist, Walkthrough.playlist_id == Playlist.id
        ).filter(
            Playlist.is_enabled.__eq__(True),
            Playlist.is_deleted.__eq__(False),
            Walkthrough.tenant_id == tenant_id,
            Walkthrough.is_enabled.__eq__(True),
            Walkthrough.is_deleted.__eq__(False),
            Tag.id.in_(tag_ids)
        ).order_by(
            Walkthrough.modified_at.desc()
        ).all()

        for ch in chapters:
            available = check_parent_available(ch.playlist.section)
            if not available:
                continue
            chapter = get_complete_walkthrough_details(
                ch, include_slides=False)
            chapter_list.append(chapter)

    if not chapter_list and kwargs.get('ret_url'):
        return redirect(kwargs.get('ret_url'))

    template_args.update({
        'api': {
            'tenant': tenant_settings,
            'chapters': chapter_list
        },
    })
    return render_template('tenants/common/list_chapters.html',
                           **template_args)


@main.route('/t/<section>/<chapter>/<slide_index>/')
@main.route('/t/<section>/<chapter>/', defaults={'slide_index': None})
@main.route('/t/<section>/', defaults={'chapter': None, 'slide_index': None})
@check_user_access
@check_template()
def route_handler(section, chapter, slide_index, **kwargs):
    """Route handler page."""
    response = get_section_api(section)

    if response["status"] != "FOUND" and kwargs.get('ret_url'):
        query_args = {
            'next': '/'
        }
        query_args.update(kwargs.get('args', {}))
        url = kwargs.get('ret_url') + '?{}'.format(
            urllib.urlencode(query_args))
        return redirect(url)

    if response['status'] == 'NOT_FOUND':
        abort(404)

    if response['status'] == 'FORBIDDEN':
        abort(403)

    if response['status'] == 'REDIRECT':
        return redirect(
            url_for(
                '.route_handler',
                section=response['slug'],
                chapter=chapter,
                slide_index=slide_index
            )
        )

    if response['section']['is_private']\
            and response['section']['product']['is_private']\
            and kwargs.get('ret_url'):
        query_args = {
            'next': '/'
        }
        query_args.update(kwargs.get('args', {}))
        url = kwargs.get('ret_url') + '?{}'.format(
            urllib.urlencode(query_args))
        return redirect(url)

    if response['section']['linked_asset']:
        return redirect(
            url_for(
                '.serve_section_assets',
                asset_name=response['section']['linked_asset']['name']
            )
        )

    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant_template = template_args['tenant'].template.lower()
    template_name = 'tenants/seo/' + tenant_template + '/section.html'

    if not (
        response['section']['playlists'] or response['section']['children']
    ):
        if chapter:
            abort(404)

    elif response['section']['playlists']:
        if chapter:
            return load_chapter(section, chapter, slide_index)

        template_name = 'tenants/seo/' + tenant_template + '/playlist.html'

    elif response['section']['children']:
        if chapter:
            return redirect(
                url_for(".route_handler",
                        section=chapter,
                        chapter=slide_index)
            )

    linkedin_app = None
    for app in template_args['tenant'].tenant_applications:
        if app.application.unique_id.upper() in ['MESSAGING', 'RATING']:
            linkedin_app = app
            break

    template_args.update({
        'view_type': 'home',
        'api': response['section'],
        'linkedin_app': linkedin_app,
        "can_access_journey": can_access_journey()
    })

    if getattr(g.user, 'groups', None):
        template_args.update({
            'user_groups': [grp.id for grp in g.user.groups]
        })

    if tenant_template in (u'helpsite', u'regalix', u'silverpeak'):
        abort(404)
    return render_template(template_name, **template_args)


def load_chapter(section, chapter, slide_index):
    """Load_chapter."""
    response = get_chapter_api(chapter)
    if response['status'] == 'NOT_FOUND':
        abort(404)
    elif response['status'] == 'FORBIDDEN':
        abort(403)
    elif response['status'] == 'REDIRECT':
        return redirect(
            url_for(
                '.route_handler',
                section=section,
                chapter=response['slug'],
                slide_index=slide_index
            )
        )
    # Abort if user try to access chapter which is under another section.
    if section != response['chapter']['section']['slug']:
        abort(404)

    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    linkedin_app = None
    for app in template_args['tenant'].tenant_applications:
        if app.application.unique_id.upper() in ['MESSAGING', 'RATING']:
            linkedin_app = app
            break
    template_args.update({
        "api": response["chapter"],
        "linkedin_app": linkedin_app,
        "slide_index": slide_index or 1,
        "view_type": "home",
    })
    return render_template("tenants/common/player.html", **template_args)


@main.route('/edit/')
@login_required
@author_permission.require()
def edit():
    """Author home page."""
    if 'next_url' in session and session['next_url']:
        redirect_url = session['next_url']
        del session['next_url']
        return redirect(redirect_url)
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id, author=True)
    linkedin_app = None
    for app in template_args['tenant'].tenant_applications:
        if app.application.unique_id.upper() in ['MESSAGING', 'RATING']:
            linkedin_app = app
        repository_manager = True if app.application.is_enabled and app.application.unique_id.upper() in [
            'REPOSITORY_MANAGER'] else False

    template_args.update({
        'document_parser_fail_status': current_app.config[
            'DOCUMENT_PARSER_FAIL_STATUS'],
        'view_type': 'edit',
        'linkedin_app': linkedin_app,
        'repository_manager': repository_manager
    })
    return render_template('edit.html', **template_args)


@main.route('/preview/')
@login_required
@author_permission.require()
def preview():
    """Author preview Page."""
    if 'next_url' in session and session['next_url']:
        redirect_url = session['next_url']
        del session['next_url']
        return redirect(redirect_url)
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    template_args['view_type'] = 'preview'
    return render_template('preview.html', **template_args)


@main.route('/post-user-details', methods=['POST'])
def submit_user_details():
    """Track user details submitted at the end of demo."""
    try:
        tenant_id = getattr(current_app, 'tenant_id', None)
        user_data = json.loads(request.data)
        product = section = walkthrough = None
        product = Section.query.filter_by(
            tenant_id=tenant_id,
            slug=user_data.get('product')
        ).first_or_404()
        if user_data.get('product') == user_data.get('section'):
            section = product
        else:
            section = Section.query.filter_by(
                tenant_id=tenant_id,
                slug=user_data.get('section')
            ).first_or_404()
        walkthrough_id = user_data.get('walkthrough')
        if walkthrough_id:
            walkthrough = Walkthrough.query.filter_by(
                tenant_id=tenant_id,
                slug=user_data.get('walkthrough')
            ).first_or_404()

        user_id = session.get('user').get('user_id')
        user = UserActivity.query.filter_by(unique_user_id=user_id).first()

        # save data to leads table
        leads = Leads()
        leads.report_user_id = user.id
        leads.tenant_id = tenant_id

        leads.product_id = product.id
        leads.section_id = section.id
        leads.walkthrough_id = walkthrough.id if walkthrough else None
        leads.user_data = user_data
        db.session.add(leads)
        db.session.commit()

        tenant = Tenant.query.get(tenant_id)
        # Check marketo settings configured in tenant
        if tenant.crm_settings and tenant.crm_settings.get('id') and\
                tenant.crm_settings.get('id') == 'marketo':
            crm_fields = tenant.crm_settings.get('fields', [])
            cta_fields = user_data.keys()

            # check if all fields confihured in tenant is part of cta data
            if set(crm_fields) <= set(cta_fields):
                get_token = requests.get(
                    tenant.crm_settings.get('identity_endpoint_url') + '?' +
                    'grant_type=client_credentials&client_id=' +
                    tenant.crm_settings.get('client_id') +
                    '&client_secret=' +
                    tenant.crm_settings.get('client_secret')
                )

                if get_token.status_code == 200:
                    token_data = json.loads(get_token.text)
                    crm_data = dict()
                    for crm_field in crm_fields:
                        crm_data[crm_field] = user_data.get(crm_field, "")
                    payload = {
                        "action": "createOnly",
                        "input": [crm_data]
                    }

                    requests.post(
                        tenant.crm_settings.get('lead_endpoint_url') +
                        '?access_token=' + token_data.get('access_token'),
                        json=payload
                    )

        from sharedemos.tasks import add_leads
        add_leads.delay({
            'tenant_id': user.tenant_id,
            'lead_date': str(leads.created_at),
            'product_id': product.id if product else None,
            'section_id': section.id if section else None
        })

        return jsonify({"status": "SUCCESS"})
    except Exception, e:
        print Exception, e
        return jsonify({"status": "FAILED"})


@main.route('/ping')
def ping():
    """"For health check."""
    return 'status=PING'


@main.route('/bulletin-board-links/<id>')
@app_subscription_required("BULLETIN_BOARD")
@check_user_access
def bulletin_board_links(id, **kwargs):
    """Function to return all the links for requested BulletinBoard id."""
    redirect_url = check_access_and_get_redirect(kwargs)
    if redirect_url:
        return redirect(redirect_url)

    bulletin_board_details = {}
    bulletin_board = BulletinBoard.query.filter(
        (BulletinBoard.id == id),
        (BulletinBoard.is_deleted.__eq__(False)),
        (BulletinBoard.is_enabled.__eq__(True))).first_or_404()

    user = g.user
    user_groups = getattr(user, 'groups', None)
    bboard_user_groups = bulletin_board.restricted_to_groups
    if user_groups and bboard_user_groups:
        # check whether logged in user has access to this bulletin board.
        if not any(
            group in bboard_user_groups
                for group in user_groups
        ):
            abort(403)
    all_links = get_bulletin_board_link_details(
        bulletin_board.bulletin_board_links,
        bulletin_board.tenant
    )
    bulletin_board_details['link_details'] = marshal(
        all_links,
        bulletin_board_link_details
    )
    bulletin_board_details['section'] = None
    bulletin_board_details['product'] = None
    if bulletin_board.section_id:
        bulletin_board_details['section'] = bulletin_board.section.slug
        bulletin_board_details['product'] = \
            bulletin_board.section.get_category().slug

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = get_tenant_api()
    template_args = get_template_args(tenant_id)
    template_args.update({
        'api': {
            'tenant': tenant
        },
        'bulletin_board_details': bulletin_board_details,
        'can_access_journey': can_access_journey(),
    })
    tenant_template = tenant.get('template')
    if tenant_template in (u'bmc', u'vmware', u'purestorage', u'dell'):
        _tpl = 'tenants/seo/{}/bulletin_board_links.html'.format(
            tenant_template)
        return render_template(_tpl, **template_args)
    return render_template('bulletin_board_links.html', **template_args)


@main.route('/check-redirect/<product_url>',
            defaults={'section_url': None, 'walkthrough_url': None})
@main.route('/check-redirect/<product_url>/<section_url>',
            defaults={'walkthrough_url': None})
@main.route('/check-redirect/<product_url>/<section_url>/<walkthrough_url>')
def check_redirect(product_url, section_url, walkthrough_url):
    """Function to return redirect url."""
    if walkthrough_url:
        complete_url = product_url + '/' + section_url + '/' + walkthrough_url
    elif section_url:
        complete_url = product_url + '/' + section_url
    else:
        complete_url = product_url

    redirect_url = RedirectUrl.query.filter_by(
        old_url=complete_url).first()   # Get the new url from RedirectUrl

    if redirect_url:
        # return new_url in place of old_url
        return jsonify({'new_url': redirect_url.new_url})
    raise SharedemosException(404)


@main.route('/check-user/<user_email>', methods=['GET'])
def check_user(user_email):
    """check_user."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    if not tenant_id:
        abort(404)

    user_model = User.query.filter(
        (User.is_deleted.__eq__(False)) &
        (User.tenant_id == tenant_id) &
        (func.lower(User.email) == func.lower(user_email))
    ).first()

    if user_model:
        return jsonify({'message': 'FOUND'}), 200

    return jsonify({'message': 'NOT FOUND'}), 200


@main.route('/check-list-export', methods=['POST'])
def export_checklist():
    """Export Checklist data through pdf, e-mail."""
    post_data = request.json
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    template_args = {
        'show_suggested': post_data['show_suggested'],
        'checklist_data': post_data['checklist_results'],
        'tenant': tenant,
    }
    tenant_footer = get_tenant_header_footer()
    footer_text = tenant_footer.get('footer', {})
    if footer_text:
        template_args['footer_text'] = footer_text.text

    if post_data.get('send_email'):
        email_id = post_data['email']
        mail_from = "Sharedemos <support@sharedemos.com>"
        mail_subject = post_data['checklist_results']['title']
        mailer_object = Mailer()

        mail_body = MIMEText(
            (render_template(
                'mail/checklist_results.html',
                **template_args
            )).encode('utf-8'),
            'html'
        )
        mailer_object.send_mail(email_id, mail_from, mail_subject, mail_body)
        mailer_object.close_mail()

    locale_id = session['user']['locale'] if session.get('user') else\
        tenant.default_locale_id
    export_pdf_dir = create_folder('export_pdf')
    pdf_file = "{}/tenant_{}_{}_{}.pdf".format(
        export_pdf_dir,
        tenant_id,
        post_data['checklist_results']['title'],
        locale_id)

    logger = logging.getLogger('weasyprint')
    logger.handlers = []
    logger.addHandler(
        logging.FileHandler(current_app.config['WEASYPRINT_LOG']))

    pdf_content = render_template(
        'checklist_results_pdf.html', **template_args)
    from weasyprint import HTML
    pdf_as_html = HTML(string=pdf_content, base_url='')
    pdf_as_html.write_pdf(target=pdf_file)
    return send_file(pdf_file,
                     as_attachment=True,
                     cache_timeout=-1)


@main.route('/export-to-pdf/<section_slug>')
@main.route('/export-to-pdf/<section_slug>/<playlist_id>')
def export_to_pdf(section_slug, playlist_id=None):
    """
    Export the Section's content to PDF document.

    params:
        section_slug - unicode slug of a particular section.
        playlist_id - Integer.

    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    section = Section.query.filter_by(
        slug=unicode(section_slug),
        tenant_id=tenant_id,
        is_enabled=True,
        is_deleted=False
    ).first()

    if not section:
        old_section = SlugRevision.query.filter(
            (SlugRevision.tenant_id == tenant_id) &
            (SlugRevision.entity_type == unicode("section")) &
            (SlugRevision.old_slug == unicode(section_slug))
        ).first_or_404()

        # Check if new version of old section exists
        section = Section.query.filter_by(
            tenant_id=tenant_id,
            slug=old_section.new_slug,
            is_deleted=False
        ).first_or_404()

    section.has_children = False
    for child in section.children:
        if not child.is_deleted:
            section.has_children = True
            break

    # Check for download flag, with children,
    # anon-user trying to access a private content.
    if not tenant.flags.can_download\
            or not section.is_available()\
            or section.has_children or \
            (getattr(g, 'user', None) and g.user.is_anonymous() and
             section.get_category().is_private):
        abort(404)

    user_groups = getattr(g.user, 'groups', None)

    author = is_author()
    # check section restriction to user group.
    if is_restricted_to_groups(user_groups, section, author):
        abort(403)

    trans = get_translation(section)
    title = trans.title
    section_title = trans.title
    description = None
    user = session['author'] if author else session['user']
    locale_id = user['locale'] if user else tenant.default_locale_id

    if playlist_id:
        if playlist_id:
            playlist = Playlist.query.filter(
                Playlist.tenant_id == tenant_id,
                Playlist.is_enabled.__eq__(True),
                Playlist.is_deleted.__eq__(False),
                Playlist.id == int(playlist_id)
            ).first_or_404()

        # check playlist restriction to user group.
        if is_restricted_to_groups(user_groups, playlist, author):
            abort(403)

        trans = get_translation(playlist)
        title = trans.name
        description = trans.description

    date_format = "MM-dd-yyyy"
    pdf_bookmarks_count = 0

    """
    File naming Logic.
    if export section content
        filename: tenant_{tenant-id}_{section-slug}_{groups}_locale.pdf
        attachement file: {section-titile}.pdf
        If Author append "Draft" to the filename and
            prepend "Draft" to attachment file.

    if export Playlist content
        filename:
            tenant_{tenant-id}_{section-slug}_{groups}_{playlist-id}_locale.pdf
        attachement file: {section-titile}.pdf
        If Author append "Draft" to the filename and
            prepend "Draft" to attachment file.
    """
    export_pdf_dir = create_folder('export_pdf')
    attachment_filename = "{}_{}.{}".format(
        'Draft', title.encode('utf-8'), 'pdf'
    ) if author else "{}.{}".format(title.encode('utf-8'), 'pdf')

    group_slug = "_"
    if user_groups:
        user_groups = sorted(user_groups, key=lambda i: i.slug)
        for group in user_groups:
            group_slug += group.slug + '_'

    if not playlist_id:
        if author:
            pdf_file = "{}/tenant_{}_{}{}draft_{}.pdf".format(
                export_pdf_dir, tenant_id,
                section_slug, group_slug, locale_id
            )
        else:
            pdf_file = "{}/tenant_{}_{}{}draft_{}.pdf".format(
                export_pdf_dir, tenant_id,
                section_slug, group_slug, locale_id
            )

    else:
        if author:
            pdf_file = "{}/tenant_{}_{}{}playlist_{}_draft_{}.pdf".format(
                export_pdf_dir, tenant_id, section_slug,
                group_slug, playlist_id, locale_id
            )
        else:
            pdf_file = "{}/tenant_{}_{}{}playlist_{}_{}.pdf".format(
                export_pdf_dir, tenant_id, section_slug,
                group_slug, playlist_id, locale_id
            )

    # Check to see if the files exists or not.
    if not os.path.isfile(pdf_file) or author:
        playlists = []
        if not playlist_id:
            section = get_complete_section_details(section)
            published_date = format_date(
                section.created_at,
                date_format,
                locale=locale_id
            )
            # Set pdf language
            if section.show_default:
                locale_id = section.tenant.default_locale_id

            for playlist in section.playlists_:

                if not playlist.is_enabled:
                    continue

                playlist.enabled_walkthroughs = []
                # Add playlist to PDF book mark count.
                pdf_bookmarks_count += 1
                for walkthrough in playlist.walkthroughs_:
                    if not walkthrough.is_enabled:
                        continue
                    # Add chapter to PDF book mark count.
                    pdf_bookmarks_count += 1
                    walkthrough = get_formatted_rte_content_and_slide_notes(
                        walkthrough,
                        tenant.default_locale_id,
                        locale_id
                    )
                    playlist.enabled_walkthroughs.append(walkthrough)

                if not playlist.enabled_walkthroughs:
                    continue

                playlists.append(playlist)
        else:
            playlist.enabled_walkthroughs = []
            published_date = format_date(
                playlist.created_at,
                date_format,
                locale=locale_id
            )
            # Add playlist to PDF book mark count.
            pdf_bookmarks_count = 1
            walkthroughs = playlist.draft_walkthroughs if author\
                else playlist.walkthroughs

            for walkthrough in walkthroughs:
                draft = getattr(walkthrough, 'draft', walkthrough)
                published_chapter = draft.published
                if (
                    walkthrough.is_deleted or
                    (not author and not walkthrough.is_enabled) or
                    is_restricted_to_groups(
                        user_groups,
                        published_chapter,
                        author
                    )
                ):
                    continue

                if author:
                    wt_trans = get_translation(walkthrough)

                else:
                    wt_trans = get_default_translation(walkthrough)

                walkthrough = add_walkthrough_translation_details(
                    wt_trans, walkthrough
                )

                chapter_available = is_chapter_available(walkthrough)
                if not chapter_available:
                    continue

                wt_trans = get_locale_translation(walkthrough)
                if wt_trans:
                    walkthrough = add_walkthrough_translation_details(
                        wt_trans, walkthrough)
                walkthrough = get_formatted_rte_content_and_slide_notes(
                    walkthrough,
                    tenant.default_locale_id,
                    locale_id
                )
                playlist.enabled_walkthroughs.append(walkthrough)
                # Add chapter to PDF book mark.
                pdf_bookmarks_count += 1

            playlists.append(playlist)

        user_locale_utf = str(locale_id) + '.utf8'
        locale.setlocale(locale.LC_ALL, user_locale_utf)
        default_encoding = sys.getdefaultencoding()
        reload(sys)
        sys.setdefaultencoding('utf-8')
        sys.setdefaultencoding(default_encoding)

        tenant_bg_color = current_app.config.get('DEFAULT_BACKGROUND_COLOR')
        if tenant.theme:
            tenant_bg_color = tenant.theme.background_color

        """
            If export Section content as PDF:
                First published date: section's created date.
            If export Playlist content as PDF:
                First published date: Playlist's created date.

            Latest published date: chapter's latest edited/published
                date under this section.
            If Playlist then filter query w.r.p.t playlist.
        """

        chapter = DraftWalkthrough if author else Walkthrough
        base_query = chapter.query.join(Playlist)\
            .join(Section).filter(
                chapter.is_deleted.__eq__(False),
                chapter.is_enabled.__eq__(True),
                Playlist.is_deleted.__eq__(False),
                Playlist.is_enabled.__eq__(True),
                Section.id == section.id
        ).with_entities(
            func.greatest(
                func.max(chapter.modified_at),
                func.max(Playlist.modified_at),
                func.max(Section.modified_at)
            ).label('modified_at')
        )

        base_query = base_query.filter(
            Playlist.id == int(playlist_id)
        ).first() if playlist_id else base_query.first()

        modified_date = format_date(base_query.modified_at,
                                    date_format, locale=locale_id)
        template_args = {
            'tenant': tenant,
            'locale': locale_id,
            'tenant_bg_color': tenant_bg_color,
            'title': title,
            'description': description if description else None,
            'published_date': published_date.decode("utf-8"),
            'modified_date': modified_date.decode("utf-8"),
            'playlists': playlists,
            'is_section': False if playlist_id else True,
            'section_title': section_title
        }

        tenant_footer = get_tenant_header_footer()
        footer_text = tenant_footer.get('footer', {})

        logger = logging.getLogger('pdfkit')
        logger.handlers = []
        logger.addHandler(
            logging.FileHandler(current_app.config['PDFKIT_LOG']))

        pdf_content = render_template(
            'export_to_pdf/library/body.html',
            **template_args
        )

        pdf_styles = get_texteditor_css_files_path()

        if tenant.logo:
            tenant_logo = static_url(filename="media/" + tenant.logo)
        else:
            tenant_logo = static_url(filename="images/login-logo.png")

        """
            Custom header and footer template for PDF page.
            Named Temporary files are used to generate custom template,
            Once PDF generated temporary files will be removed.
        """
        header_template = render_template(
            'export_to_pdf/header.html',
            **{
                'header_title': title,
                'tenant_bg_color': tenant_bg_color
            }
        )
        footer_template = render_template(
            'export_to_pdf/footer.html',
            **{
                'tenant_logo': tenant_logo,
                'footer_text': footer_text.text if footer_text else None
            }
        )

        header_tmp = create_temporary_file(header_template)
        footer_tmp = create_temporary_file(footer_template)

        options = current_app.config['EXPORT_TO_PDF_OPTIONS']
        options.update({
            'header-html': header_tmp.name,
            'footer-html': footer_tmp.name,
            'outline-depth': pdf_bookmarks_count
        })

        try:
            pdfkit.from_string(
                pdf_content, pdf_file,
                options=options, css=pdf_styles
            )

        except Exception as e:
            print e

        finally:
            header_tmp.close()
            footer_tmp.close()

    # Log download activity
    log_download_activity({
        'tenant_id': tenant_id,
        'entity_type': u'PLAYLIST' if playlist_id else u'SECTION',
        'name': unicode(title),
        'entity_id': int(playlist_id) if playlist_id else section.id,
        'url': request.url
    })

    return send_file(pdf_file,
                     attachment_filename=attachment_filename,
                     as_attachment=True,
                     cache_timeout=-1)


@main.route('/service-worker-js')
def service_worker():
    """Service_worker."""
    return current_app.send_static_file('js/service_worker.js')


@main.route('/register-for-playbook/', methods=['GET', 'POST'])
def solidfire_registration():
    """Solidfire registration page."""
    tenant_id = getattr(current_app, 'tenant_id')
    tenant = Tenant.query.get(tenant_id)

    # Hack to avoid other users to use this feature
    if current_app.config['PROJECT_ENV'] == 'production':
        email_host = '@netapp.com'
        tenant_name = 'netapp'
    else:
        email_host = '@regalix-inc.com'
        tenant_name = 'regalix'

    if current_app.config['PROJECT_ENV'] == 'production' and\
            tenant.domain != 'solidfire.sharedemos.com':
        abort(404)

    template_args = {
        'registered': False,
        'email_host': email_host,
        'tenant_name': tenant_name
    }
    if request.method == 'POST':
        email = request.form.get('email', '')
        if not email:
            abort(412)

        email += email_host

        user = User.query.filter(
            (User.tenant_id == tenant_id) &
            (User.email == email)
        ).first()

        if not user:
            user = User()
            user.first_name = request.form.get('firstName')
            user.last_name = request.form.get('lastName')
            user.email = email
            user.unique_user_id = unicode(get_random_string(length=6))
            user.role_id = 4
            user.tenant_id = tenant_id

        try:
            mailer_args = {
                'user_first_name': user.first_name,
                'unique_user_id': user.unique_user_id
            }
            mailer = Mailer()
            mail_from = "SolidFire Team <support@sharedemos.com>"
            mail_subject = "SolidFire Playbook - Verify Account"
            mail_body = MIMEText((render_template(
                'mail/solidfire_registration.html', **mailer_args)
            ).encode('ascii', 'ignore'),
                'html'
            )
            mailer.send_mail(email, mail_from, mail_subject, mail_body)
            mailer.close_mail()
        except Exception, e:
            print Exception, e
            user.email_sent = False

        db.session.add(user)
        db.session.commit()

        template_args.update({
            'registered': True,
            'email': email
        })

    return render_template('tenants/default/solidfire/register.html',
                           **template_args)


@main.route('/chargify-webhook/', methods=['POST'])
def chargify_webhook():
    """
    Chargify_webhook.

    validate request from chargify
    """
    request_body = request.stream.read()
    calculated_signature = hmac.new(current_app.config.get(
        'CHARGIFY_SHARED_KEY'), request_body, hashlib.sha256).hexdigest()
    webhook_header = request.headers.get(
        "X-Chargify-Webhook-Signature-Hmac-Sha-256")

    if webhook_header != calculated_signature:
        raise SharedemosException(404)

    parsed_data = dict(urlparse.parse_qsl(request_body))

    # Check for signup_success event
    if parsed_data.get('event') != 'signup_success':
        return jsonify(dict(status='SUCCESS'))

    # Check for valid product
    product_name = parsed_data.get('payload[subscription][product][name]')
    allowed_products = current_app.config.get('CHARGIFY_PRODUCT_WHITELIST', [])
    if allowed_products and product_name not in allowed_products:
        return jsonify(dict(status='SUCCESS'))

    email = parsed_data.get('payload[subscription][customer][email]')
    first_name = parsed_data.get('payload[subscription][customer][first_name]')
    last_name = parsed_data.get('payload[subscription][customer][last_name]')
    tenant_id = getattr(current_app, 'tenant_id', None)

    try:
        user = User.query.filter(
            (User.tenant_id == tenant_id) &
            (User.email == email)
        ).first()

        if not user:
            user = User()
            user.email = unicode(email)
            user.unique_user_id = unicode(get_random_string(length=6))
            user.role_id = 4
            user.tenant_id = tenant_id

        user.first_name = unicode(first_name)
        user.last_name = unicode(last_name)

        try:
            mailer_args = {
                'user_first_name': user.first_name,
                'unique_user_id': user.unique_user_id
            }
            mailer = Mailer()
            mail_from = "HelpGrowCT Team <support@sharedemos.com>"
            mail_subject = "Helpgrow CT - Verify Account"
            mail_body = MIMEText((render_template(
                'mail/helpgrowct_registration.html', **mailer_args)
            ).encode('ascii', 'ignore'),
                'html'
            )
            mailer.send_mail(email, mail_from, mail_subject, mail_body)
            mailer.close_mail()
        except Exception, e:
            print Exception, e
            user.email_sent = False

        db.session.add(user)
        db.session.commit()

    except Exception, e:
        print Exception, e

    return jsonify(dict(status='SUCCESS'))


@main.route('/embed/<product_id>/<section_id>/<demo_id>')
@main.route('/embed/<product_id>/<demo_id>', defaults={"section_id": None})
def embed_playlist(product_id, section_id, demo_id):
    """
    Embed playlist page.

    params:
        product_id- unicode slug value of Product.
        section_id- unicode slug value of Section.
        demo_id- unicode slug value of Walkthrough.
    """
    tenant_id = getattr(current_app, 'tenant_id')
    tenant = Tenant.query.get(tenant_id)
    if not tenant.flags.can_embed:
        abort(404)

    product_exist = Section.query.filter_by(
        tenant_id=tenant_id, slug=product_id, is_deleted=False).first()
    if not product_exist:
        old_section = SlugRevision.query.filter(
            (SlugRevision.tenant_id == tenant_id) &
            (SlugRevision.entity_type == unicode("section")) &
            (SlugRevision.old_slug == product_id)
        ).first_or_404()

        product_id = old_section.new_slug
        return redirect(url_for(
            'main.embed_playlist',
            product_id=product_id,
            section_id=section_id,
            demo_id=demo_id
        ))

    if not section_id:
        section_id = product_id
    else:
        section_exist = Section.query.filter_by(
            tenant_id=tenant_id, slug=section_id, is_deleted=False).first()
        if not section_exist:
            old_section = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode("section")) &
                (SlugRevision.old_slug == section_id)
            ).first_or_404()

            section_id = old_section.new_slug
            return redirect(url_for(
                'main.embed_playlist',
                product_id=product_id,
                section_id=section_id,
                demo_id=demo_id
            ))

    demo = Walkthrough.query.filter_by(
        tenant_id=tenant_id, slug=demo_id, is_deleted=False).first()
    if not demo:
        old_demo = SlugRevision.query.filter(
            (SlugRevision.tenant_id == tenant_id) &
            (SlugRevision.entity_type == unicode("walkthrough")) &
            (SlugRevision.old_slug == demo_id)
        ).first_or_404()
        demo_id = old_demo.new_slug
        return redirect(url_for(
            'main.embed_playlist',
            product_id=product_id,
            section_id=section_id,
            demo_id=demo_id
        ))

    args = get_template_args(tenant_id)

    template_args = {
        "demo": demo_id,
        "product": product_id,
        "section": section_id,
        "tenant": args["tenant"],
        "view_type": "embed"
    }
    if tenant.logo:
        tenant_logo = tenant.logo
        template_args['tenant_footer_image'] = tenant_logo
    return render_template('embed_playlist.html', **template_args)


@main.route('/<any("edit"):authoring_mode>/path-finder/<slug>')
@main.route('/<any("edit"):authoring_mode>/path-finder/',
            defaults={'slug': None})
@main.route('/path-finder/<slug>')
@main.route('/path-finder/', defaults={'slug': None})
@app_subscription_required("PATHFINDER")
@check_user_access
def pathfinder(slug, authoring_mode=None, **kwargs):
    """
    Pathfinder page.

    params:
        slug- unicode value of DraftPath or Path depending upon the
              authoring_mode.
    """
    # If tenant is private, check for anonymous user.
    # If user is anonymous redirect to login page.
    redirect_url = check_access_and_get_redirect(kwargs, authoring_mode)
    if redirect_url:
        return redirect(redirect_url)

    if authoring_mode and not author_permission.can():
        abort(403)
    is_author = True if authoring_mode else False
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    template_args['view_type'] = 'path_finder'
    template_args['app_name'] = 'Pathfinder'
    template_args['all_languages'] = get_available_languages(is_author)

    if slug:
        if authoring_mode:
            session['user']['edit_path_finder'] = dict(
                previous=list(), next=list())
            pf_session = session['user']['edit_path_finder']
            path = DraftPath.query.filter(
                (DraftPath.tenant_id == tenant_id) &
                (DraftPath.slug == unicode(slug)) &
                (DraftPath.is_enabled.__eq__(True)) &
                (DraftPath.is_deleted.__eq__(False))
            ).first()
            if path.published:
                template_args['can_publish'] = True
            if not path:
                old_path = SlugRevision.query.filter(
                    (SlugRevision.tenant_id == tenant_id) &
                    (SlugRevision.entity_type == u'draft_path') &
                    (SlugRevision.old_slug == unicode(slug))
                ).first()
                if not old_path:
                    abort(404)
                return redirect(url_for(
                    'main.pathfinder',
                    slug=old_path.new_slug
                ))
        else:
            session['user']['path_finder'] = dict(previous=list(), next=list())
            pf_session = session['user']['path_finder']
            path = Path.query.join(
                Path.questions
            ).join(
                Question.options
            ).filter(
                Path.tenant_id == tenant_id,
                Path.is_deleted.__eq__(False),
                Path.slug.__eq__(slug) &
                Path.is_enabled.__eq__(True),
                Question.path_id == Path.id,
                Question.is_deleted.__eq__(False),
                Question.is_enabled.__eq__(True),
                Option.question_id == Question.id,
                Option.is_deleted.__eq__(False),
                Option.is_enabled.__eq__(True)
            ).first()
            if not path:
                old_path = SlugRevision.query.filter(
                    (SlugRevision.tenant_id == tenant_id) &
                    (SlugRevision.entity_type == u'path') &
                    (SlugRevision.old_slug == unicode(slug))
                ).first()
                if not old_path:
                    abort(404)

                return redirect(url_for(
                    'main.pathfinder',
                    slug=old_path.new_slug
                ))

        pf_session['path'] = slug

    template_args['slug'] = slug
    template_name = 'pathfinder/path_finder.html'
    if authoring_mode:
        template_args['view_type'] = 'edit_path_finder'
        template_name = 'pathfinder/edit_path_finder.html'

    return render_template(template_name, **template_args)


@main.route('/mail-pathfinder-suggestions/')
def mail_suggestions():
    """Send email of pathfinder suggestions."""
    if request.args.get('email'):
        email = request.args.get('email')
        option = get_pathfinder_suggestions(
            request.args.get('option_id', 0),
            is_author=is_author(),
            get_thumbnail=True)

        if not len(option.suggestions):
            return jsonify({'message': 'Data not available'}), 404

        try:
            tenant_id = getattr(current_app, 'tenant_id', None)
            if is_author():
                path_id = session['user']['edit_path_finder']['path']
                path = DraftPath.query.filter(
                    (DraftPath.tenant_id == tenant_id) &
                    (DraftPath.slug == unicode(path_id)) &
                    (DraftPath.is_enabled.__eq__(True)) &
                    (DraftPath.is_deleted.__eq__(False))
                ).first_or_404()
            else:
                path_id = session['user']['path_finder']['path']
                path = Path.query.filter(
                    (Path.tenant_id == tenant_id) &
                    (Path.slug == unicode(path_id)) &
                    (Path.is_enabled.__eq__(True)) &
                    (Path.is_deleted.__eq__(False))
                ).first_or_404()
            mail_pathfinder_suggestions(
                email,
                get_translation(path),
                option
            )

        except Exception, e:
            print Exception, e
            return jsonify({'message': e.message}), 500

        finally:
            # Log activity only for End User.
            if not is_author():
                log_pathfinder_suggestion_mail_activity(
                    path.id,
                    option,
                    email
                )

        return jsonify({'message': "SUCCESS"}), 200
    else:
        raise SharedemosException(412, message='Email ID required')


@main.route('/sample-exchange/<id>')
@main.route('/sample-exchange/', defaults={'id': None})
@app_subscription_required("SAMPLE_EXCHANGE")
@template_required(['vmware'])
@check_user_access
def sample_exchange(id, **kwargs):
    """View the VMWare Samples."""
    # If tenant is private , check for anonymous user and
    # Return to login page.
    redirect_url = check_access_and_get_redirect(kwargs)
    if redirect_url:
        return redirect(redirect_url)

    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant = get_tenant_api()
    sample_app = template_args["tenant"].sample_exchange
    template_args.update({
        'api': {
            'tenant': tenant
        },
        'view_type': 'sample_exchange',
        'sample_details': {
            'title': sample_app.title if sample_app else "",
            'description': sample_app.description if sample_app else ""
        }
    })
    return render_template('sample_exchange/main.html', **template_args)


@main.route('/j/<journey_slug>/<chapter_slug>')
@main.route('/j/<journey_slug>/', defaults={'chapter_slug': None})
@check_user_access
def journey(journey_slug, chapter_slug, **kwargs):
    """Journey app player."""
    feeder = LaunchpadFeeder('journey', journey_slug)
    data = feeder.fetch(chapter_slug)

    if data['status'] == 'NOT_FOUND':
        abort(404)

    if data['status'] == 'FORBIDDEN':
        abort(403)

    # Get response as api
    if request.args.get('api'):
        return jsonify(data)

    result = data['result']
    result['view_type'] = 'journey'
    result['document_styles'] = current_app.config['STYLE_GUIDE_CLASS'].get(
        request.host, ''
    )
    return render_template("/launchpad/player.html", **result)


@main.route('/<any("edit" , "preview"):authoring_mode>/check-list/<slug>')
@main.route('/<any("edit" , "preview"):authoring_mode>/check-list/',
            defaults={'slug': None})
@main.route('/check-list/<slug>')
@main.route('/check-list/', defaults={'slug': None})
@app_subscription_required("CHECKLIST")
@check_user_access
def check_list(slug, authoring_mode=None, **kwargs):
    """
    End site for checklist app.

    params:
        slug- unicode value of a checklist.
    """
    # If tenant is private, check for anonymous user.
    # If user is anonymous redirect to login page.
    redirect_url = check_access_and_get_redirect(kwargs, authoring_mode)
    if redirect_url:
        return redirect(redirect_url)

    if authoring_mode and not author_permission.can():
        abort(403)

    is_author = True if authoring_mode in ('edit', 'preview') else False
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    template_args.update({
        "view_type": "main_checklist",
        "app_name": "checklist",
        "all_languages": get_available_languages(is_author)
    })

    if slug:
        if authoring_mode:
            checklist_query_table = ChecklistDraft
            entity_type = u'checklist_draft'
        else:
            checklist_query_table = Checklist
            entity_type = u'checklist'

        checklist = checklist_query_table.query.filter(
            (checklist_query_table.tenant_id == tenant_id) &
            (checklist_query_table.slug == unicode(slug)) &
            (checklist_query_table.is_deleted.__eq__(False))
        )

        if not authoring_mode:
            checklist = checklist.filter(
                (checklist_query_table.is_featured.__eq__(True))
            )

        checklist = checklist.first()

        if not checklist:
            old_checklist = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode(entity_type)) &
                (SlugRevision.old_slug == unicode(slug))
            ).first()
            if not old_checklist:
                abort(404)

            return redirect(url_for('main.check_list',
                                    slug=old_checklist.new_slug))

    template_name = 'check_list/main.html'
    if authoring_mode == 'edit':
        template_args['view_type'] = 'edit_checklist'
        template_name = 'check_list/edit.html'
    elif authoring_mode == 'preview':
        template_args['view_type'] = 'preview_checklist'
        template_name = 'check_list/preview.html'

    return render_template(template_name, **template_args)


@main.route('/url-unfurl')
@author_permission.require()
def unfurl_url():
    """For given URL fetching icon, title, site_name and description."""
    external_url = urllib.unquote(request.args.get('external_url'))
    url_regex = re.compile(current_app.config.get('URL_REGEX'))
    url_groups = url_regex.match(external_url).groups()
    if not url_groups:
        raise SharedemosException(406, message='Not a valid Url')

    try:
        metadata = get_website_metadata(external_url)
        return jsonify(metadata)

    except Exception, e:
        code = 404
        message = 'Not a valid URL'
        if hasattr(e, 'get_response'):
            resp = e.get_response()
            code = resp.status_code
            message = resp.status
        raise SharedemosException(code, message=message)


@main.route('/url-validate')
def url_validate():
    """Validate URL against secure as well iframe supporting headers."""
    external_url = urllib.unquote(request.args.get('external_url'))
    url_regex = re.compile(current_app.config.get('URL_REGEX'))
    url_groups = url_regex.match(external_url).groups()
    message = 'Not a valid HTTP secure URL'
    if not url_groups:
        raise SharedemosException(406, message='Not a valid Url')
    try:
        get_response = requests.get(external_url)
        if 'X-Frame-Options' in get_response.headers:
            message = 'URL not allowed in iframe'
            raise SharedemosException(message=message)
        if get_response.status_code / 100 != 2:
            message = 'Not a valid URL'
            raise SharedemosException(message=message)
        return jsonify({'message': 'valid URL'}), 200
    except Exception as e:
        if isinstance(e, SharedemosException):
            raise
        print repr(e)
        raise SharedemosException(409, message=message)


@main.route('/quiz/<slug>')
@main.route('/quiz/', defaults={'slug': None})
@app_subscription_required("QUIZ")
@login_required
def quiz(slug, **kwargs):
    """
    End site of the quiz app.

    params:
        slug- unicode slug of a quiz.
    """
    # If tenant is private, check for anonymous user.
    # If user is anonymous redirect to login page.
    redirect_url = check_access_and_get_redirect(kwargs)
    if redirect_url:
        return redirect(redirect_url)

    tenant_id = getattr(current_app, 'tenant_id', None)

    if slug:
        quiz = Quiz.query.filter(
            (Quiz.tenant_id == tenant_id) &
            (Quiz.slug == unicode(slug)) &
            (Quiz.is_enabled.__eq__(True)) &
            (Quiz.is_deleted.__eq__(False))
        ).first()
        if not quiz:
            old_quiz = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == u'quiz') &
                (SlugRevision.old_slug == unicode(slug))
            ).first()
            if not old_quiz:
                abort(404)

            return redirect(url_for('main.quiz', slug=old_quiz.new_slug))

    template_args = get_template_args(tenant_id)
    template_args['view_type'] = 'quiz'
    template_args['app_name'] = 'Quiz'

    template_name = 'quiz/quiz.html'
    return render_template(template_name, **template_args)


@main.route('/edit/quiz/<slug>')
@main.route('/edit/quiz/', defaults={'slug': None})
@app_subscription_required("QUIZ")
@login_required
@author_permission.require()
def edit_quiz(slug, **kwargs):
    """
    Author mode for quiz app.

    params:
        slug- unicode slug of a draft quiz.
    """
    private_user_login = False
    private_user_login_url = None
    if kwargs.get('ret_url'):
        # Set to True, when an anon-user tries to access a private content.
        private_user_login = True
        private_user_login_url = kwargs.get('ret_url')

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    if private_user_login and tenant.flags.is_private:
        redirect_url = private_user_login_url
        if kwargs.get('next'):
            redirect_url += '?next=' + kwargs.get('next')
        if kwargs.get('relay_state'):
            redirect_url += '&RelayState=' + kwargs.get('relay_state')
        return redirect(redirect_url)

    if slug:
        quiz = QuizDraft.query.filter(
            (QuizDraft.tenant_id == tenant_id) &
            (QuizDraft.slug == unicode(slug)) &
            (QuizDraft.is_enabled.__eq__(True)) &
            (QuizDraft.is_deleted.__eq__(False))
        ).first()
        if not quiz:
            old_quiz = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == u'draft_quiz') &
                (SlugRevision.old_slug == unicode(slug))
            ).first()
            if not old_quiz:
                abort(404)

            return redirect(url_for('main.edit_quiz', slug=old_quiz.new_slug))

    template_args = get_template_args(tenant_id)
    template_args['view_type'] = 'edit_quiz'
    template_args['all_languages'] = get_available_languages(is_author=True)

    template_name = 'quiz/edit_quiz.html'
    return render_template(template_name, **template_args)


@main.route('/embed-data')
def embed_data():
    """Embed Data."""
    try:
        api_request_url = request.args.get('api_request_url')
        api_url_data = requests.get(api_request_url)
        oembed_data = api_url_data.json()
        title = oembed_data['title']
        thumbnail_url = oembed_data['thumbnail_url']
        html_tag_data = oembed_data['html']
        soup = BeautifulSoup(html_tag_data, 'html.parser')
        for html in soup.find_all('iframe'):
            src = html.get('src')
        return jsonify({
            "title": title,
            "thumbnail_url": thumbnail_url,
            "src": src
        })
    except Exception as e:
        print repr(e)
        raise SharedemosException(404, message="Failed to process")


@main.route('/<any("edit"):authoring_mode>/faq/<slug>')
@main.route('/<any("edit"):authoring_mode>/faq/', defaults={'slug': None})
@main.route('/faq/<slug>')
@main.route('/faq/', defaults={'slug': None})
@app_subscription_required("FAQ")
@check_user_access
def faq(slug, authoring_mode=None, **kwargs):
    """
    FAQ apps page.

    params:
        slug- unicode slug data of a FAQ.
        authorng_mode- default None.

    """
    # If tenant is private, check for anonymous user.
    # If user is anonymous redirect to login page.
    redirect_url = check_access_and_get_redirect(kwargs, authoring_mode)
    if redirect_url:
        return redirect(redirect_url)

    if authoring_mode and not author_permission.can():
        abort(403)

    tenant_id = getattr(current_app, 'tenant_id', None)
    is_author = True if authoring_mode else False
    group = None
    if slug:
        if authoring_mode:
            group = FAQDraftGroup.query.filter(
                FAQDraftGroup.tenant_id == tenant_id,
                FAQDraftGroup.is_deleted.__eq__(False),
                FAQDraftGroup.slug == unicode(slug),
            ).first_or_404()
        else:
            group = FAQGroup.query.filter(
                FAQGroup.tenant_id == tenant_id,
                FAQGroup.is_enabled.__eq__(True),
                FAQGroup.is_deleted.__eq__(False),
                FAQGroup.slug == unicode(slug),
            ).first_or_404()

    template_args = get_template_args(tenant_id)
    template_args['view_type'] = 'main_faq'
    template_args['app_name'] = 'Faq'
    template_args['group'] = group
    template_args['all_languages'] = get_available_languages(is_author)

    template_name = 'faq/main.html'
    if authoring_mode:
        template_args['view_type'] = 'edit_faq'
        template_name = 'faq/edit.html'

    return render_template(template_name, **template_args)


@main.route('/<any("edit"):authoring_mode>/export-faq/<slug>')
@main.route('/export-faq/<slug>')
def export_faq(slug, authoring_mode=None, **kwargs):
    """Export FAQ to PDF."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)

    if slug:

        faq_sections = []
        if authoring_mode:

            group = FAQDraftGroup.query.filter(
                FAQDraftGroup.tenant_id == tenant_id,
                FAQDraftGroup.is_deleted.__eq__(False),
                FAQDraftGroup.slug == unicode(slug),
            ).first_or_404()

            sections = FAQDraftSection.query.filter(
                FAQDraftSection.tenant_id == tenant_id,
                FAQDraftSection.group_id == group.id,
                FAQDraftSection.is_deleted.__eq__(False),
            ).order_by(FAQDraftSection.order).all()

            for section in sections:
                faqs = FAQDraft.query.filter(
                    FAQDraft.section_id == section.id,
                    FAQDraft.is_deleted.__eq__(False),
                ).order_by(FAQDraft.order).all()

                section_faqs = []
                for faq in faqs:
                    translated_faq = get_translation(faq)
                    section_faqs.append({
                        'question': translated_faq.question,
                        'answer': format_texteditor_content(
                            translated_faq.answer)
                    })

                faq_sections.append({
                    'name': get_translation(section),
                    'questions': section_faqs
                })

        else:
            group = FAQGroup.query.filter(
                FAQGroup.tenant_id == tenant_id,
                FAQGroup.is_enabled.__eq__(True),
                FAQGroup.is_deleted.__eq__(False),
                FAQGroup.slug == unicode(slug),
            ).first_or_404()

            sections = FAQSection.query.filter(
                FAQSection.tenant_id == tenant_id,
                FAQSection.group_id == group.id,
                FAQSection.is_deleted.__eq__(False),
            ).order_by(FAQSection.order).all()

            for section in sections:
                faqs = FAQ.query.filter(
                    FAQ.section_id == section.id,
                    FAQ.is_deleted.__eq__(False),
                ).order_by(FAQ.order).all()

                section_faqs = []
                for faq in faqs:
                    translated_faq = get_translation(faq)
                    section_faqs.append({
                        'question': translated_faq.question,
                        'answer': format_texteditor_content(
                            translated_faq.answer)
                    })

                faq_sections.append({
                    'name': get_translation(section),
                    'questions': section_faqs
                })

        template_args = get_template_args(tenant_id)
        template_args['group'] = get_translation(group)
        template_args['sections'] = faq_sections

        locale_id = session['user']['locale'] if session.get('user')\
            else tenant.default_locale_id
        export_pdf_dir = create_folder('export_pdf')

        if authoring_mode:
            pdf_file = "%s/tenant_%s_%s_draft_%s.pdf"
            attachment_filename = "DRAFT_%s.pdf"
        else:
            pdf_file = "%s/tenant_%s_%s_%s.pdf"
            attachment_filename = "%s.pdf"

        pdf_file = pdf_file % (export_pdf_dir, tenant_id, group, locale_id)
        attachment_filename = attachment_filename % (
            get_translation(group).name.encode('utf-8'))

        logger = logging.getLogger('weasyprint')
        logger.handlers = []
        logger.addHandler(
            logging.FileHandler(current_app.config['WEASYPRINT_LOG']))

        pdf_content = render_template('faq_to_pdf.html', **template_args)
        from weasyprint import HTML
        pdf_as_html = HTML(string=pdf_content, base_url='')
        pdf_as_html.write_pdf(target=pdf_file)
        return send_file(pdf_file,
                         attachment_filename=attachment_filename,
                         as_attachment=True,
                         cache_timeout=-1)


@main.route('/pitch/', defaults={'slug': None})
@main.route('/pitch/<slug>')
@main.route('/<any("edit"):authoring_mode>/pitch/<slug>')
@app_subscription_required("PITCH")
@login_required
def pitch(slug, authoring_mode=None, **kwargs):
    tenant_id = getattr(current_app, 'tenant_id', None)
    template_args = get_template_args(tenant_id)
    tenant = get_tenant_api()
    tenant_template = tenant['template'].lower()
    template_args.update({
        'api': {
            'view_type': 'pitch',
            'tenant': tenant
        }
    })

    if authoring_mode:
        template_args['can_edit'] = True
    if tenant_template == 'avaya' and not authoring_mode:
        template_name = 'tenants/seo/' + tenant_template + '/pitch.html'
    else:
        template_name = '/apps/pitch/index.html'
    return render_template(template_name, **template_args)


@main.route('/section-assets/<asset_name>')
@check_user_access
def serve_section_assets(asset_name, **kwargs):
    """
    Route to serve the section asset linked resource.

    Raise an exception if,
        the resource not found/
        the section associated with the resource is unavailable.
    Return the resource file as response specific to,
    'author/enduser' and specific to a translation if available,
    else return a default translation resource.
    params:
        asset_name- Name/Slug of the resource/asset.
    """
    redirect_url = check_access_and_get_redirect(kwargs)
    if redirect_url:
        return redirect(redirect_url)

    tenant = Tenant.query.get(current_app.tenant_id)

    user = session['author'] if is_author() else session['user']
    locale_id = user['locale'] if user else tenant.default_locale_id

    base_query = Resource.query.join(
        SectionTranslations).join(
        Section).filter(
        Resource.name == asset_name,
        Resource.tenant_id == tenant.id,
        Section.is_enabled.__eq__(True),
        Section.is_deleted.__eq__(False)
    )

    resource = base_query.filter(Resource.language_id == locale_id).first()

    if not resource and locale_id != tenant.default_locale_id:
        resource = base_query.filter(
            Resource.language_id == tenant.default_locale_id
        ).first_or_404()

    if not resource:
        abort(404)

    api_data = get_section_api(resource.section_translations.section.slug)

    if api_data['status'] == 'NOT_FOUND':
        abort(404)

    if api_data['status'] == 'FORBIDDEN':
        abort(403)

    if api_data.get('status') == 'REDIRECT':
        api_data = get_section_api(api_data.get('slug'))

    section_data = api_data.get('section')
    product_data = section_data.get('product')
    if section_data.get('slug') != product_data.get('slug'):
        breadcrumb = u'{} > {} > {}'.format(
            'home',
            product_data.get('name'),
            section_data.get('name')
        )
    else:
        breadcrumb = u'{} > {}'.format(
            'home',
            section_data.get('name')
        )

    # constructing pdf data
    file_extension = os.path.splitext(resource.path)[-1]
    title = resource.meta_data.get("file_name", resource.name)
    url = static_url(filename="media/" + resource.path)
    template_args = {
        "asset_data": {
            "breadcrumb": breadcrumb,
            "is_asset": True,
            "pdf": {
                "name": u'{}{}'.format(title, file_extension),
                "title": title,
                "source_url": url,
                "download_url": url,
                "resource_id": resource.id
            },
            "product_slug": product_data.get("slug"),
            "section_slug": section_data.get("slug"),
            "tenant": {
                "logo": static_url(filename="media/" + tenant.logo)
                if tenant.logo else None,
                "favicon": static_url(filename="media/" + tenant.favicon)
                if tenant.favicon else None
            }
        },
        "tenant_analytics": tenant.analytics
    }

    return render_template('pdf_viewer.html', **template_args)


@main.route('/l/<section>/<chapter>')
@template_required(['dell', 'avaya'])
def launchpad(section, chapter):
    """Route to handle launchpad urls."""
    feeder = LaunchpadFeeder('library')
    data = feeder.fetch(chapter)

    if data['status'] == 'NOT_FOUND':
        abort(404)

    if data['status'] == 'FORBIDDEN':
        abort(403)

    # Get response as api
    if request.args.get('api'):
        return jsonify(data)

    if data['status'] == 'REDIRECT':
        return redirect(
            url_for(
                '.launchpad',
                section=section,
                chapter=data['slug']
            )
        )

    result = data['result']
    if section != result["section"]["slug"]:
        return redirect(
            url_for(
                '.launchpad',
                section=result["section"]["slug"],
                chapter=result["slug"]
            )
        )

    result['view_type'] = 'home'
    result['document_styles'] = current_app.config[
        'STYLE_GUIDE_CLASS'].get(request.host, '')
    return render_template("/launchpad/player.html", **result)


@main.route('/content-for-you')
@template_required(['bmc'])
@login_required
@check_user_group_access(['employee'])
def content_for_you():
    """Bookmarks, recently views and recommendations."""
    tenant_id = current_app.tenant_id
    recent_chapters = get_recently_viewed_chapters()

    template_args = get_template_args(tenant_id)
    template_args.update({
        'api': {'tenant': get_tenant_api()},
        'recent_chapters': recent_chapters
    })
    return render_template('tenants/seo/bmc/content_for_you.html', **template_args)
