import codecs
import cStringIO
import csv
import glob
import hashlib
import logging
import metadata_parser
import mimetypes
import os
import pytz
import pyrax
import random
import requests
import shutil
import smtplib
import sys
import zipfile
from io import BytesIO
from uuid import uuid4, uuid5, NAMESPACE_DNS
import subprocess


from bs4 import BeautifulSoup
from collections import OrderedDict
from dateutil.relativedelta import relativedelta
from datetime import datetime, time
from email import encoders
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.mime.audio import MIMEAudio
from email.mime.base import MIMEBase
from email.mime.image import MIMEImage


from geoip2 import webservice as geoip2_webservice
from PIL import Image
from pdf2image import convert_from_path
from werkzeug.datastructures import FileStorage
from wtforms.validators import ValidationError


from flask import (
    g, current_app,
    render_template,
    request,
    session,
    url_for,
)
from flask.ext.admin.form import thumbgen_filename
from flask.ext.login import logout_user
from flask.ext.principal import identity_changed, AnonymousIdentity
from crontab import CronTab
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import joinedload

from sharedemos.cache import CacheManager
from sharedemos.models import (
    db,
    CTATranslations,
    HomepageBanner,
    HomepageBannerTranslations,
    LastActivity,
    LeadCTAForm,
    UserActivity,
    PathFinderSuggestionMailActivity
)
from sharedemos.libs.exceptions import SharedemosException

from .url import static_url


class ContextualFilter(logging.Filter):
    """Add app context for exception logger."""

    def filter(self, log_record):
        user_id = country = city = None
        if 'user' in session and 'user_id' in session['user']:
            from sharedemos.models import UserActivity
            user_id = session['user']['user_id']
            user = UserActivity.query.filter_by(unique_user_id=user_id).first()
            if user:
                country = user.country
                city = user.city
        log_record.user_id = user_id
        log_record.country = country
        log_record.city = city
        log_record.url = request.url
        log_record.method = request.method
        log_record.ip = request.environ.get("REMOTE_ADDR")
        log_record.headers = dict(request.headers)
        log_record.error_message = getattr(g, 'error_message', None)
        log_record.data = request.json or request.data or request.form
        log_record.args = request.args

        return True


class CSVWriter:
    """Document(CSV) writer."""

    """
        A CSV writer which will write rows to CSV file "f",
        which is encoded in the given encoding.
    """

    def __init__(self, file_object, dialect=csv.excel, encoding="utf-8",
                 **kwargs):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwargs)
        self.stream = file_object
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)


class ExpireEntity(object):
    """Add an entry into crontab by setting expiry date for an entity.

    Section/Playlist/Walkthrough/Journey.
    Schedule the manage.py cmd w.r.t to the expiry record id using
    new/update/delete methods.
    """

    def __init__(self, entity):
        """
        Initialize cron object, ExpiryJob with entity.

        params:
            entity - SqlAlchemy model (Section/Playlist/Walkthrough).
        """
        self.cron = CronTab(user=current_app.config['CRON_USER'])
        self.cmd = current_app.config['ASSET_EXPIRY_CMD'].format(
            current_app.config['PROJECT_ENV']
        )
        self.comment = current_app.config['COMMENT_FORMAT']
        self.entity = entity
        self.job = self.entity.get_expiry_job()
        self.job.modified_by = session.get('user_id')
        self.job.author_locale = session['author']['locale']

    def new(self, expiry_date):
        """
        Add a new ExpiryJob enity and crontab record.

        params:
            expiry_date - Python datetime object.
        """
        self.job.expire_at = expiry_date
        self.job.created_by = session.get('user_id')
        db.session.add(self.job)
        db.session.flush()

        self.cmd += str(self.job.id)
        comment = self.comment.format(self.job.id)
        cron_job = self.cron.new(command=self.cmd, comment=comment)
        cron_job.setall(expiry_date)
        self.cron.write()

    def update(self, expiry_date):
        """
        Modify the existing ExpiryJob/crontab record.

        The existing ExpiryJob's attributes are modified,
        hence re-using it instead of creating a new record
        for the same entity_type and entity_id in ExpiryJob table.
        params:
            expiry_date - Python datetime object.
        """
        self.job.expire_at = expiry_date
        self.job.is_deleted = False
        self.job.is_executed = False

        updated = False
        comment = self.comment.format(self.job.id)
        results = self.cron.find_comment(comment)
        # 'results' is a crontab generator object.
        for _res in results:
            updated = True
            _res.setall(expiry_date)

        if not updated:
            self.cmd += str(self.job.id)
            cron_job = self.cron.new(command=self.cmd, comment=comment)
            cron_job.setall(expiry_date)
        db.session.add(self.job)
        self.cron.write()

    def delete(self):
        """Mark ExpiryJob record as deleted and remove the crontab record."""
        self.job.is_deleted = True
        comment = self.comment.format(self.job.id)
        results = self.cron.find_comment(comment)
        # 'results' is a crontab generator object.
        for _res in results:
            self.cron.remove(_res)
        self.cron.write()


class Mailer():
    """Generic Class to send Mail."""

    def __init__(self):
        self.sender = current_app.config.get('EMAIL_HOST_USER')
        self.mailer = smtplib.SMTP(current_app.config.get('EMAIL_HOST'),
                                   current_app.config.get('EMAIL_PORT'))

        if current_app.config.get('EMAIL_USE_TLS'):
            self.mailer.starttls()
            self.mailer.login(self.sender,
                              current_app.config.get('EMAIL_HOST_PASSWORD'))

    def send_mail(self, mail_to, mail_from, mail_subject, mail_body,
                  attachment=dict(), campaign_tracking_code=None):
        """Generic Function to send mail."""
        try:
            mail = MIMEMultipart()
            campaign_track_id = campaign_tracking_code or\
                current_app.config.get('DEFAULT_CAMPAIGN_TRACKING_CODE')
            mail.add_header('X-Mailgun-Campaign-Id', campaign_track_id)
            mail['Subject'] = mail_subject
            mail['From'] = mail_from

            # Add attachments if any
            if attachment and os.path.isfile(attachment['path']):
                # Guess the content type based on the file's extension.
                # Encoding will be ignored, although we should check for
                # simple things like gzip'd or compressed files.
                ctype, encoding = mimetypes.guess_type(attachment['path'])
                if ctype is None or encoding is not None:
                    # No guess could be made or the file is encoded(compressed)
                    # so use a generic bag-of-bits type.
                    ctype = 'application/octet-stream'
                maintype, subtype = ctype.split('/', 1)
                if maintype == 'text':
                    fp = open(attachment['path'])
                    # Note: we should handle calculating the charset
                    msg = MIMEText(fp.read(), _subtype=subtype)
                    fp.close()
                elif maintype == 'image':
                    fp = open(attachment['path'], 'rb')
                    msg = MIMEImage(fp.read(), _subtype=subtype)
                    fp.close()
                elif maintype == 'audio':
                    fp = open(attachment['path'], 'rb')
                    msg = MIMEAudio(fp.read(), _subtype=subtype)
                    fp.close()
                else:
                    fp = open(attachment['path'], 'rb')
                    msg = MIMEBase(maintype, subtype)
                    msg.set_payload(fp.read())
                    fp.close()
                    # Encode the payload using Base64
                    encoders.encode_base64(msg)

                # Set the filename parameter
                if attachment.get('filename'):
                    filename = attachment['filename']
                else:
                    filename = os.path.splitext(
                        os.path.basename(attachment['path'])
                    )[0] or 'Attachment'

                msg.add_header('Content-Disposition', 'attachment',
                               filename=filename)
                mail.attach(msg)
            mail.attach(mail_body)

            recipient = mail['To'] = mail_to

            self.mailer.sendmail(self.sender, recipient, mail.as_string())

        except Exception as e:
            print 'Mail Error:', e
            self.mailer.close()
            return False
        return True

    def close_mail(self):
        self.mailer.close()


class ZipTools:
    """Zip tools."""

    def __init__(self, path=None, name=None):
        self.path = path
        self.name = name
        self.parent_folder = os.path.dirname(self.path)
        self.archive = os.path.join(self.parent_folder, self.name + '.zip')

    def zip(self):
        # Change path and retrieve the paths of the folder contents.
        os.chdir(self.path)
        contents = os.walk(os.curdir)
        try:
            zip_file = zipfile.ZipFile(self.archive, 'w', zipfile.ZIP_DEFLATED)
            for root, folders, files in contents:
                # Include all subfolders, including empty ones.
                for folder_name in folders:
                    ab_path = os.path.join(root, folder_name)
                    rel_path = ab_path.replace(
                        self.parent_folder + '\\' + self.name, '')
                    zip_file.write(ab_path, rel_path)
                for file_name in files:
                    ab_path = os.path.join(root, file_name)
                    rel_path = ab_path.replace(
                        self.parent_folder + '\\' + self.name, '')
                    zip_file.write(ab_path, rel_path)
            return self.archive
        except Exception, message:
            print message
            sys.exit(1)
        finally:
            zip_file.close()


def add_date_time(sourcedate, years=0, months=0, weeks=0, days=0,
                  hours=0, minutes=0, seconds=0, microseconds=0):
    """Add date time to given date."""
    """
        Function to add variable dates
        Timedelta supports only adding days, seconds and microseconds
    """

    sourcedate += relativedelta(
        years=years, months=months,
        weeks=weeks, days=days,
        hours=hours, minutes=minutes,
        seconds=seconds, microseconds=microseconds
    )

    return sourcedate


def copy_file_from_src(source_file):
    """Copy source_file to new file."""
    try:
        destination_file_name = str(uuid4()) + '.' + source_file.split('.')[1]
        abs_source_file = os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                       source_file)
        abs_destination_file = os.path.join(
            current_app.config.get('MEDIA_FOLDER'), destination_file_name)
        shutil.copy2(abs_source_file, abs_destination_file)
    except Exception:
        return {'msg': 'COPY_ERROR'}

    return {'path': destination_file_name, 'msg': 'SUCCESS'}


def check_category_tree(section_model, is_author=False):
    """Check valid category in reverse order."""
    """
        Function to verify any level of parent to a section is deleted/disabled
        is_author = True or False
    """
    if section_model.parent_id:
        if section_model.parent.is_deleted or\
                not section_model.parent.is_enabled and not is_author:
            return False
        return check_category_tree(section_model.parent, is_author)

    return True


def check_extensions(allowed_extensions):
    """Check if file extension is allowed."""
    def _check_extension(form, field):
        if field.data and type(field.data) is FileStorage and\
                field.data.content_type not in allowed_extensions:
            raise ValidationError('File not allowed')
        return True
    return _check_extension


def check_parent_restriction(section):
    if section.is_deleted:
        return False
    elif g.user.is_anonymous() and \
            (not section.is_enabled or section.is_private):
        return False
    elif g.user.is_active() and not section.is_enabled:
        return False
    elif not section.parent:
        return True
    else:
        return check_parent_restriction(section.parent)


def create_cta(cta_data, default_locale_id):
    """
    Create a new CTA record.

    cta_data -
    {
        'options': {
            'type': 'CTA_TYPE',
            'text': 'BUTTON_TEXT',
            'href': 'LINK',
            'path': 'MEDIA_PATH',
        },
        'name': 'ENTITY_NAME',
    }
    """
    cta = LeadCTAForm()
    cta.tenant_id = current_app.tenant_id
    cta.cta_type = cta_data['options']['type']
    db.session.add(cta)

    cta_data['options'].pop('type')

    translation = CTATranslations()
    translation.name = unicode(cta_data['name'])
    translation.cta_button = cta_data['options']
    translation.language_id = default_locale_id
    translation.cta = cta
    db.session.add(translation)
    return cta


def delete_file(name):
    # Delete file
    try:
        os.remove(os.path.join(current_app.config['MEDIA_FOLDER'], name))
    except OSError:
        pass

    # Delete file thumbnail
    try:
        os.remove(os.path.join(current_app.config['MEDIA_FOLDER'],
                               thumbgen_filename(name)))
    except OSError:
        pass


def encrypt_password(password):
    """Take a password and encrypt it."""
    return unicode(hashlib.sha256(password.encode("utf-8")).hexdigest())


def filter_fields(data, fields_list=[]):
    """Filter api data with given list of keys."""
    if not fields_list:
        return data

    if isinstance(data, (list, tuple)):
        for v in data:
            if isinstance(v, (list, tuple, dict)):
                v = filter_fields(v, fields_list)
        return data
    elif isinstance(data, (dict, OrderedDict)):
        for k, v in data.iteritems():
            if k in fields_list:
                del(data[k])
            elif isinstance(v, (list, tuple, dict, OrderedDict)):
                data[k] = filter_fields(v, fields_list)
        return data


def get_chapter_details(chapter, locale=None, get_tags=False):
    """
    Return chapters list with generic details.

    created_at, name, slug, product_name, product_slug,
    section_name, section_slug, image_src, tags, url,
    along with 'chapter' object.
    'names' are returned based on author/user locale.
    """
    section = chapter.playlist.section
    product = section.get_category()
    tenant_template = product.tenant.template.lower()
    if tenant_template in (u'dell', u'avaya'):
        url = url_for(
            'main.launchpad',
            section=section.slug,
            chapter=chapter.slug
        )
    else:
        url = url_for(
            'main.route_handler',
            section=section.slug,
            chapter=chapter.slug,
        )
    slide = chapter.get_first_slide()
    slide_type = None
    if slide and slide.primary_resource:
        slide_type = slide.primary_resource.resource_type

    from sharedemos.libs.model import get_model_tags

    return {
        'created_at': chapter.created_at,
        'name': chapter.get_name(locale=locale),
        'slug': chapter.slug,
        'product_name': product.get_name(locale=locale),
        'product_slug': product.slug,
        'section_name': section.get_name(locale=locale),
        'section_slug': section.slug,
        'image_src': chapter.get_thumbnail(),
        'tags': get_model_tags(chapter) if get_tags else [],
        'url': url,
        'chapter': chapter,
        'slide_type': slide_type
    }


def get_default_translation(model):
    for translation in model.translations:
        if translation.language_id == model.tenant.default_locale_id:
            return translation


def get_geoip_info(remote_ip):
    """Get geographical information using maxmind for given IP address."""
    try:
        client = geoip2_webservice.Client(
            current_app.config.get('USER_ID'),
            current_app.config.get('LICENSE_KEY'))
        response = client.city(remote_ip)
        return {
            'city': response.city.name,
            'state': response.subdivisions.most_specific.name,
            'country': response.country.name,
            'country_iso_code': response.country.iso_code,
            'timezone': response.location.time_zone
        }

    except Exception, e:
        print "Maxmind Exception" + str(e)
        return False


def get_locale_translation(model, locale=None):
    from .api import is_author
    if not locale:
        user = session['author'] if is_author() else session['user']
        locale = user['locale']

    for translation in model.translations:
        if translation.language_id == locale:
            if is_author() or locale == model.tenant.default_locale_id or\
                    locale in [l.language_id
                               for l in model.tenant.tenant_languages
                               if l.is_public]:
                return translation


def get_homepage_banner_details():
    """Get home page banner data."""
    tenant_id = current_app.tenant_id
    homepage_banner = HomepageBanner.query.options(
        joinedload(HomepageBanner.translations),
        joinedload(HomepageBanner.translations).joinedload(
            HomepageBannerTranslations.resource),
        joinedload(HomepageBanner.translations).joinedload(
            HomepageBannerTranslations.background_image),
        joinedload(HomepageBanner.cta_list),
        joinedload(HomepageBanner.cta_list).joinedload(
            LeadCTAForm.translations)
    ).filter(HomepageBanner.tenant_id == tenant_id).first_or_404()

    homepage_banner_trans = get_translation(homepage_banner)
    homepage_banner._title = homepage_banner_trans.title
    homepage_banner._description = homepage_banner_trans.description
    homepage_banner._background_image = homepage_banner_trans.background_image
    homepage_banner._resource = homepage_banner_trans.resource

    homepage_banner._cta_details = []
    for cta in homepage_banner.cta_list:
        trans = get_translation(cta)
        cta._cta_id = cta.id
        cta._name = trans.cta_button.get('text', trans.name)
        cta._link = trans.cta_button['href']
        homepage_banner._cta_details.append(cta)

    return homepage_banner


def is_suggestion_available(suggestion):
    """
    Validate suggestion and suggestion's content.

    Check for deleted, enabled, parent objects availabilty,
    for suggestion and/or suggestion.walkthrough.
    If the suggestion has group_id and if group is deleted,
    then return False.
    """
    if suggestion.is_deleted:
        return False

    if getattr(suggestion, 'group_id', None) and\
            suggestion.group.is_deleted:
        return False

    if getattr(suggestion, 'walkthrough_id', None) and\
        (suggestion.walkthrough.is_deleted or
         not suggestion.walkthrough.is_enabled or
         suggestion.walkthrough.playlist.is_deleted or
         not suggestion.walkthrough.playlist.is_enabled or
         not suggestion.walkthrough.playlist.section.is_available()):
        return False

    return True


def get_translation(model, author=False, locale=None):
    from .api import is_author
    if not locale:
        user = session.get('author') if is_author() else session.get('user')
        locale = user['locale'] if user and\
            user.get('locale') else model.tenant.default_locale_id

    translation = get_locale_translation(model, locale)
    if translation:
        return translation

    if author:
        return False

    return get_default_translation(model)


def get_tenant_uuid(tenant_domain):
    return unicode(uuid5(NAMESPACE_DNS, str(tenant_domain)))


def get_website_metadata(url):
    """Get metadata of external URL.

    params:
        url: URL as a String.
    Returns:
        Dictionary having details of title, description, site_name, icon.

    """
    headers = {"User-Agent": ""}
    response = metadata_parser.requests.get(url, headers=headers)

    metadata = {
        'url': url,
    }
    site_name = icon_url = description = title = None

    parsed_url = metadata_parser.urlparse(url)
    if parsed_url.path.find('/oembed') != -1:
        try:
            oembed_metadata = response.json()
            title = oembed_metadata.get('title')
            description = oembed_metadata.get('description') or title
            site_name = oembed_metadata.get('site_name')
            icon_url = oembed_metadata.get('thumbnail_url')
        except Exception:
            pass

    elif response.headers.get(
        'Content-Type', 'Content'
    ).startswith('text/html'):
        try:
            site_metadata = metadata_parser.MetadataParser(
                url, search_head_only=False
            )
            title = site_metadata.get_metadata('title')
            description = site_metadata.get_metadata('description')
            site_name = site_metadata.get_metadata('site_name')
            icon_url = site_metadata.get_metadata('image')

            if not title:
                title_tag = site_metadata.soup.find('title')
                title = title_tag.text if title_tag else None

            if not icon_url:
                rel_attrs_value = [
                    'apple-touch-icon-precomposed', 'shortcut',
                    'icon', 'favicon', 'apple-touch-icon'
                ]
                link_tags = site_metadata.soup.findAll(
                    'link', attrs={'rel': lambda n: n and n in rel_attrs_value}
                )

                for link_tag in link_tags:
                    icon_url = link_tag.attrs.get('href')
                    if icon_url:

                        if icon_url.startswith('//'):
                            icon_url = u'{}:{}'.format(
                                parsed_url.scheme, icon_url)

                        elif not icon_url.startswith('http'):
                            host_url = u'{url.scheme}://{url.netloc}'.format(
                                url=parsed_url
                            )
                            icon_url = os.path.join(
                                host_url,
                                icon_url
                            )
                    """
                    Since link tag with rel="apple-touch-icon" has better image
                        quality will try to get that icon as priority.
                    """
                    if any(
                        'apple-touch-icon' in attr
                        for attr in link_tag.attrs.get(
                            'rel', []
                        )
                    ):
                        break
        except Exception:
            pass

    if icon_url:
        try:
            unique_name = unicode(uuid4())
            image_data = metadata_parser.requests.get(icon_url)
            content_type = image_data.headers.get('Content-type')
            if image_data.status_code == 200 and content_type and\
                    content_type.startswith('image'):

                external_icons_dir = create_folder('external_icons')
                file_name = u'{}.{}'.format(unique_name, 'png')
                destination = os.path.join(
                    external_icons_dir,
                    file_name
                )
                """
                Python library PIL is used to convert between formates.
                i.e jpeg to png, ico to png, jpg to png etc.
                By default all images will be saved in png format.
                https://stackoverflow.com/questions/10759117/converting-jpg-images-to-png/10759145
                """
                icon = Image.open(BytesIO(image_data.content))
                icon.save(destination, 'PNG')

                metadata.update(
                    icon_name=file_name,
                    icon=static_url(
                        filename='media/external_icons/' + file_name)
                )
        except Exception:
            pass

    metadata.update(
        title=title,
        description=description,
        site_name=site_name
    )

    return metadata


def get_local_time(timezone, utc_date=None):
    """Get local datetime from utc datetime, given timezone."""
    if not utc_date:
        utc_date = datetime.today()

    local_tz = pytz.timezone(timezone)

    local_date_from_utc = utc_date.replace(
        tzinfo=pytz.utc).astimezone(local_tz).replace(tzinfo=None)

    return local_date_from_utc


def get_random_string(length, include_uppercase=False):
    alnumeric = '0123456789abcdefghijklmnopqrstuvwxyz'
    if include_uppercase:
        alnumeric += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    random_str = ''.join(random.choice(alnumeric) for i in range(length))
    return unicode(random_str)


def get_unique_id(length=10):
    """
    Return unique id by slicing the 32 char hex from uuid4.

    For optimum usage the minimum length should be 6 and max length is 32.
    If the given 'length' is lesser or greater than 6 or 32 respectively,
    the output will 6 chars long for lesser lengths, and 32 chars long for
    greater lengths.
    """
    if length < 2:
        length = 2

    # 2 chars are added at last as salt value.
    uuid_len = length - 2
    if uuid_len < 4:
        uuid_len = 4
    elif uuid_len > 32:
        uuid_len = 32

    _range_limit = 32 - uuid_len
    if uuid_len == 32:
        _range_limit = 1
        # range_limit is 1 for uuid_len 32,
        # cause 32 - 32 = 0, and range(0, 0) is empty list.

    """
    Generate 32 char hex from uuid4.
    Slice it with min_value and max_value.
    If uuid_len is say 8 then we can have 32 - 8 = 24 combinations of slices
        0 to 8 chars or 1 to 9 chars or 2 to 10 chars and so on ...
    The output would be 8 chars in uuid_len but slicing 32 hex chars will be
    randomly chosen.
        uuid4().hex[ min_val : max_val ]
    """

    min_slice_value = random.choice(range(0, _range_limit))
    max_slice_value = min_slice_value + uuid_len

    salt = get_random_string(2, include_uppercase=True)

    return uuid4().hex[min_slice_value: max_slice_value] + salt


def get_utc_end_date(timezone, local_date=None):
    local_start_date_in_utc = get_utc_start_date(timezone, local_date)
    local_end_date = local_start_date_in_utc + relativedelta(days=1,
                                                             seconds=-1)

    return local_end_date


def get_utc_start_date(timezone, local_date=None):
    if not local_date:
        local_date = datetime.today()

    local_tz = pytz.timezone(timezone)
    local_time = local_date.replace(tzinfo=pytz.utc).astimezone(
        local_tz).replace(tzinfo=None)
    local_start_date = datetime.combine(local_time.date(), time())
    local_start_date_in_utc = local_tz.localize(local_start_date).astimezone(
        pytz.utc).replace(tzinfo=None)

    return local_start_date_in_utc


def get_utc_specific_datetime(given_date):
    """Get UTC specific date for given date."""
    """
        Convert the given_date, to the utc datetime.
        'given_date' should be timezone aware.
    """
    return given_date.astimezone(pytz.utc)


def get_timezone_specific_datetime(timezone, given_date=None):
    """Get timezone specific date."""
    """
        Always returns a timezone aware dateime object.
        For a 'given_date', add the timezone specific time to it
        else take current UTC datetime
    """
    if not given_date:
        given_date = datetime.utcnow()
    tenant_timezone = pytz.timezone(timezone)
    timezone_datetime = tenant_timezone.localize(given_date)
    return timezone_datetime


def get_utc_time(timezone, local_date=None):
    """Get GMT/UTC time for given timezone."""
    if not local_date:
        local_date = datetime.today()

    local_tz = pytz.timezone(timezone)

    local_start_date_in_utc = local_tz.localize(local_date).astimezone(
        pytz.utc).replace(tzinfo=None)

    return local_start_date_in_utc


def namegen_filename(obj, file_data):

    name, ext = os.path.splitext(file_data.filename)
    # If the file object doesn't have any filename extension.
    if not ext:
        ext = '.' + file_data.mimetype.split('/')[1]

    return str(uuid4()) + ext


def notify_user_about_content_access(user_model):
    """Mailer to notify user about content access."""
    user_first_name = user_model.first_name
    unique_user_id = user_model.unique_user_id
    user_email = user_model.email
    tenant = user_model.tenant
    tenant_title = tenant.title or 'Product Walkthroughs'
    admin_name = g.user.first_name
    if g.user.last_name:
        admin_name += ' ' + g.user.last_name
    template_args = {'user_first_name': user_first_name,
                     'admin_name': admin_name,
                     'tenant_title': tenant_title,
                     'unique_user_id': unique_user_id,
                     'sdemos_website_url': current_app.config.get(
                         'SDEMOS_WEBSITE_URL')}

    mailer_object = Mailer()

    mail_from = "Sharedemos <support@sharedemos.com>"
    mail_subject = admin_name + " has added you to " + tenant_title
    mail_body = MIMEText((render_template('mail/user_role_notification.html',
                                          **template_args)).encode('utf-8'),
                         'html')

    mail_status = mailer_object.send_mail(user_email, mail_from, mail_subject,
                                          mail_body)
    mailer_object.close_mail()
    return mail_status


def mail_pathfinder_suggestions(user_email, path, option):
    """Pathfinder suggestion list mailer."""
    template_args = {'option': option, 'path': path.path}

    mailer_object = Mailer()

    mail_from = "Sharedemos <info@sharedemos.com>"
    mail_subject = "Suggested content for " + unicode(path.title)
    mail_body = MIMEText((render_template('mail/pathfinder_suggestions.html',
                                          **template_args)).encode('utf-8'),
                         'html')

    mail_status = mailer_object.send_mail(user_email, mail_from, mail_subject,
                                          mail_body)
    mailer_object.close_mail()
    return mail_status


def user_session_logout():
    """Logout user."""
    logout_user()

    # Remove session keys set by Flask-Principal and application
    for key in ('author', 'user', 'identity.name', 'identity.auth_type'):
        session.pop(key, None)

    # Tell Flask-Principal the user is anonymous
    identity_changed.send(current_app._get_current_object(),
                          identity=AnonymousIdentity())

    from sharedemos.models import Tenant
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    user_groups = tenant.user_groups
    if tenant.flags.is_private and user_groups and\
            tenant.sp_public_certificate and tenant.sp_private_key:
        idp_set_at_tenant = (
            tenant.idp_entity_id and tenant.idp_url and tenant.idp_x509cert
        )
        user_groups_with_idp = [grp for grp in user_groups
                                if grp.idp_entity_id and
                                grp.idp_url and
                                grp.idp_x509cert]
        if user_groups_with_idp or idp_set_at_tenant:
            return url_for('auth.choose_login')
    return url_for('auth.login')


def clear_bulletin_board_cache(model):
    """Clear bulletin board cache."""
    if model.section_id:
        from sharedemos.tasks import delete_api_cache_data
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': model.section_id,
            'delete_pattern': True,
            'delete_parent': bool(model.section.parent_id),
            'delete_children': bool(model.section.children),
            'clear_all_products': not bool(model.section.parent_id),
            'tenant_id': model.tenant_id
        })
    else:
        from sharedemos.libs.api import delete_cache_with_pattern
        delete_cache_with_pattern(
            delete_entity_type='bulletin_boards',
            tenant=model.tenant
        )


def clear_samples_cache():
    cache_manager = CacheManager()
    cache_manager.remove('sample_exchange')


def create_file(resource_file):
    """
    Create a file on the local storage using the resource file object.

    params-
        resource_file- FileStorage object of a resource file.
    """
    try:
        hex_file_name = namegen_filename(None, resource_file)

        # Create media folder if not exist
        if not os.path.exists(current_app.config.get('MEDIA_FOLDER')):
            os.makedirs(current_app.config.get('MEDIA_FOLDER'))
        resource_file.save(os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                        hex_file_name))

        return unicode(hex_file_name)
    except Exception:
        raise SharedemosException(500, message='Resouce file save error')


def create_folder(folder_type=None,
                  tenant_unique_id=None,
                  parent_path=None):
    """
    Create a folder and return its path.

    Based the 'folder_type' and 'tenant_unique_id',
    create different types of folders at different levels.
    If the folder already exists, then return its 'path'.
    If 'parent_path' is given, then create a subfolder inside it,
    else if its None, then by default create a folder inside
    MEDIA_FOLDER.
    params(optional):
        folder_type      - String value consisting the type of folder.
        tenant_unique_id - Unicode value of the tenant.
        parent_path      - String value consisting the parent folder path.
    Returns abosolute path if the 'folder_type' is specified,
    else returns the folder name.
    """
    abs_folder_path = ''

    # Create the specified type of folder if it didn't exists.
    if folder_type in ['export_pdf', 'external_icons']:
        abs_folder_path = os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                       folder_type)
        if not os.path.exists(abs_folder_path):
            os.makedirs(abs_folder_path)
        return abs_folder_path

    elif folder_type == 'html_zip' and tenant_unique_id:
        abs_folder_path = os.path.join(
            current_app.config.get('HTML_ZIP_FOLDER'), tenant_unique_id)
        if not os.path.exists(abs_folder_path):
            os.makedirs(abs_folder_path)
        return abs_folder_path

    # Create a media folder with random name.
    folder_name = str(uuid4())
    os.mkdir(os.path.join(
        parent_path or current_app.config.get('MEDIA_FOLDER'),
        folder_name
    ))
    return unicode(folder_name)


def get_walkthrough_and_slide_count(section, is_author=True):
    live_wt = draft_wt = 0
    live_sl = draft_sl = 0
    try:
        if is_author:
            children = [child for child in section.children
                        if not child.is_deleted and child.is_enabled]
        else:
            children = [child for child in section.children
                        if not child.is_deleted]
        playlists = [pl for pl in section.playlists
                     if not pl.is_deleted and pl.is_enabled]
        if children:
            for child in children:
                count = get_walkthrough_and_slide_count(child)
                live_wt += count['live_demos']
                live_sl += count['live_slides']
                draft_wt += count['draft_demos']
                draft_sl += count['draft_slides']

            return {
                'live_demos': live_wt,
                'live_slides': live_sl,
                'draft_demos': draft_wt,
                'draft_slides': draft_sl
            }
        elif playlists:
            for playlist in playlists:
                live_demos = [wt for wt in playlist.walkthroughs
                              if not wt.is_deleted and wt.is_enabled]
                live_wt += len(live_demos)
                for wt in live_demos:
                    live_sl += len([sl for sl in wt.slides
                                    if not sl.is_deleted])

                draft_demos = [wt for wt in playlist.draft_walkthroughs
                               if not wt.is_deleted]
                draft_wt += len(draft_demos)
                for wt in draft_demos:
                    draft_sl += len([sl for sl in wt.slides
                                     if not sl.is_deleted])

            return {
                'live_demos': live_wt,
                'live_slides': live_sl,
                'draft_demos': draft_wt,
                'draft_slides': draft_sl
            }
        else:
            return {
                'live_demos': live_wt,
                'live_slides': live_sl,
                'draft_demos': draft_wt,
                'draft_slides': draft_sl
            }

    except TypeError, e:
        print e
        raise TypeError


def get_tenant_walkthrough_slides_counts(tenant_id):
    from sharedemos.models import Section
    products = Section.query.filter_by(
        parent_id=None,
        tenant_id=tenant_id,
        is_deleted=False,
        is_enabled=True
    )
    walkthrough_details = dict()
    walkthrough_details['total_live_demos'] = 0
    walkthrough_details['total_live_slides'] = 0
    walkthrough_details['total_draft_slides'] = 0
    walkthrough_details['total_draft_demos'] = 0
    for product in products:
        data = get_walkthrough_and_slide_count(product)
        walkthrough_details[product.slug] = data
        walkthrough_details['total_live_demos'] += data.get('live_demos', 0)
        walkthrough_details['total_live_slides'] += data.get('live_slides', 0)
        walkthrough_details['total_draft_slides'] += data.get('draft_slides',
                                                              0)
        walkthrough_details['total_draft_demos'] += data.get('draft_demos', 0)

    return walkthrough_details


def get_texteditor_css_files_path():
    """
    Get absolute Path of the froala editor css files.

    Return:
        List of file path.
    """
    froala_css_list = ['froala_editor.css', 'froala_style.css']
    froala_plugins_list = ['char_counter.min.css', 'code_view.min.css',
                           'colors.min.css', 'emoticons.min.css',
                           'file.min.css', 'fullscreen.min.css',
                           'image.min.css', 'image_manager.min.css',
                           'line_breaker.min.css', 'quick_insert.min.css',
                           'table.min.css', 'video.min.css']

    texteditor_css_files = []

    texteditor_css_files.extend(["{}/{}/{}".format(
        current_app.config.get('STATIC_FOLDER'),
        "libs/froala/css",
        css_file
    ) for css_file in froala_css_list])

    texteditor_css_files.extend(["{}/{}/{}".format(
        current_app.config.get('STATIC_FOLDER'),
        "libs/froala/css/plugins",
        plugin_file
    ) for plugin_file in froala_plugins_list])

    return texteditor_css_files


def format_texteditor_content(content):
    """
    Formatting the TextEditor's HTML content for PDF.

    params:
        content- string data of texteditor's html content.
    """
    html_content = BeautifulSoup(content, 'lxml')
    for img_tag in html_content.findAll('img'):
        img_src_url = img_tag.attrs.get('src')

        # Convert all src url to local url except for direct image URLs.
        if img_src_url.find('://') == -1 and\
                not img_src_url.startswith('data:image') and\
                not img_src_url.startswith('blob'):
            new_src_url = current_app.config.get('MEDIA_FOLDER') +\
                img_src_url.replace('/static/media/', '/')
            img_tag.attrs['src'] = new_src_url

        img_tag.attrs['src'] = unicode(
            img_tag.attrs['src'].decode('utf-8'))

    for iframe_tag in html_content.findAll('iframe'):
        # Convert all iframe embed to a tag.
        link_url = iframe_tag.attrs.get('src')
        if link_url and 'http' not in link_url:
            link_url = 'https:' + link_url
        a_tag = html_content.new_tag("a")
        a_tag.attrs['href'] = unicode(link_url).decode('utf-8')
        a_tag['class'] = 'inline-tag'
        p_tag = html_content.new_tag("p")
        new_img_tag = html_content.new_tag("img")
        new_img_tag.attrs['src'] = current_app.config.get('STATIC_FOLDER') +\
            '/images/author/thumb-video.jpg'
        new_img_tag.attrs['class'] = 'sdemos-slide-image'
        inner_p_tag = html_content.new_tag("p")
        inner_p_tag.string = 'Click to see topic media'
        inner_p_tag['class'] = 'bottom-text'
        a_tag.append(new_img_tag)
        a_tag.append(inner_p_tag)
        p_tag.append(a_tag)
        iframe_tag.replace_with(p_tag)

    for anchor_tag in html_content.findAll('a'):
        tag_attrs = anchor_tag.attrs
        source = tag_attrs.get('href')
        if source and source.startswith('/static/media'):
            """
            Since Source is an absolute path(/static/media
            i.e with leading slash),
            all previous components are thrown away and
            joining continues from the absolute path component.
            So need to eliminate leading slash in Source path.
            """
            tenant_domain = request.url_root if request.trusted_hosts\
                else request.host_url

            absolute_path = os.path.join(tenant_domain, source.lstrip('/'))
            tag_attrs.update(href=absolute_path)

    text_editor_html = BeautifulSoup(unicode(html_content.body), 'lxml')

    return unicode(text_editor_html)


def log_last_activity(action, entity, model=None, updated_at=None,
                      entity_id=None, tenant_id=None, user_id=None):
    """
    Log last action on given model.

    updating the latest operations performed on the entities
    entity - action on section/playlist/chapter/secondary_user_role
    action - changes made on the entity
    """
    if model and getattr(model, 'tenant_id', None):
        tenant_id = model.tenant_id
    elif getattr(current_app, 'tenant_id', None):
        tenant_id = current_app.tenant_id

    latest_activity = LastActivity.query.filter(
        LastActivity.tenant_id == tenant_id).first()
    if not latest_activity:
        latest_activity = LastActivity()
        latest_activity.tenant_id = tenant_id

    if action == 'created':
        db.session.commit()

    latest_activity.action = unicode(action)
    latest_activity.entity = unicode(entity)
    latest_activity.entity_id = model.id if model else entity_id
    latest_activity.user_id = user_id or session.get('user_id')

    db.session.add(latest_activity)


def log_pathfinder_suggestion_mail_activity(path_id, option, email):
    """Log Path Finder suggestion Mail activity."""
    user_session_id = session['user']['user_id']
    user = UserActivity.query.filter(
        UserActivity.unique_user_id == user_session_id
    ).first_or_404()
    group_suggestion_ids = []
    suggestion_ids = []
    for suggestion in option._suggestions:
        if suggestion.get('suggestions_list'):
            group_suggestion_ids.append(suggestion.get('id', 0))
        elif suggestion.get('suggestion'):
            suggestion_ids.append(suggestion.get('id', 0))

    pf_sm_activity = PathFinderSuggestionMailActivity()
    pf_sm_activity.tenant_id = current_app.tenant_id
    pf_sm_activity.report_user_id = user.id
    pf_sm_activity.path_id = path_id
    pf_sm_activity.option_id = option.id
    pf_sm_activity.suggestion_ids = MutableDict({
        'suggestion_ids': suggestion_ids,
        'group_suggestion_ids': group_suggestion_ids
    })
    pf_sm_activity.email = email
    db.session.add(pf_sm_activity)
    db.session.commit()


def remove_pdf(section_slug=None, tenant_id=None):
    """
    Remove PDF files.

    section_slug: is None in case of removing
    multiple files under the same tenant.
    """
    tenant_id = tenant_id or current_app.tenant_id
    try:
        pdf_file = "%s/%s/tenant_%s_*.pdf" % (
            current_app.config.get('MEDIA_FOLDER'),
            'export_pdf',
            tenant_id
        )
        if section_slug:
            pdf_file = "%s/%s/tenant_%s_%s_*.pdf"
            pdf_file = pdf_file % (
                current_app.config.get('MEDIA_FOLDER'),
                'export_pdf',
                tenant_id,
                section_slug
            )

        for p_file in glob.glob(pdf_file):
            if os.path.isfile(p_file):
                os.remove(p_file)
    except Exception:
        pass


def reset_user_groups(model):
    """Function to clear user_groups recursively through lower level models."""
    if getattr(model, 'children', None):
        for child in model.children:
            if child.restricted_to_groups:
                child.restricted_to_groups = []
            for bulletin_board in child.bulletin_boards:
                bulletin_board.restricted_to_groups = []
                db.session.add(bulletin_board)
            db.session.add(child)
            reset_user_groups(child)

    if getattr(model, 'playlists', None):
        for playlist in model.playlists:
            if playlist.restricted_to_groups:
                playlist.restricted_to_groups = []
                db.session.add(playlist)
            reset_user_groups(playlist)

    if getattr(model, 'walkthroughs', None):
        for walkthrough in model.walkthroughs:
            if walkthrough.restricted_to_groups:
                walkthrough.restricted_to_groups = []
                db.session.add(walkthrough)


def save_independent_resources(resource_file, resource_type):
    """Save intermediate resources.

    TextEditor -image, Section -asset resource.
    Homepage Banner -image.

    params:
        resource_file - FileStorage object.
        resource_type - unicode. Type of the resource being created.
    """
    from sharedemos.models import Resource
    resource = Resource()
    resource.tenant_id = getattr(current_app, 'tenant_id', None)
    resource.language_id = session['author']['locale']
    resource.resource_type = resource_type
    resource.meta_data = MutableDict()
    resource.name = resource_file.filename or u'RESOURCE_DEFAULT_FILENAME'
    resource.path = create_file(resource_file)
    db.session.add(resource)
    return resource


def upload_to_wistia(resource, resource_file):
    """
    Upload video files to wistia.

    Send an api request to 'Wistia', upload the file,
    and store the api_response 'embed_code' to path field
    and id, hash_id, thumbnail_url details into meta_data field
    and save 'wistia' as resource_type.
    params:
        resource      - SqlAlchemy Resource model object.
        resource_file - FileStorage Object.
    """
    try:
        resource_file.name = resource_file.filename
        wistia_response = requests.post(
            current_app.config.get('WISTIA_UPLOAD_URL'),
            files={
                'file': resource_file
            },
            data={
                'api_password': current_app.config.get(
                    'WISTIA_PRIVATE_UPLOAD_TOKEN'
                ),
                'project_id': current_app.config.get('WISTIA_PROJECT_ID')
            }
        )
        if not wistia_response.ok:
            raise Exception(wistia_response.text)

        json_data = wistia_response.json()
        resource.meta_data['wistia_id'] = unicode(json_data['id'])
        resource.meta_data['wistia_hashed_id'] = unicode(
            json_data['hashed_id']
        )
        _get_response = requests.get(
            current_app.config.get('WISTIA_GET_IFRAME_URL') +
            json_data['hashed_id']
        )
        if not _get_response.ok:
            raise Exception(wistia_response.text)

        _data = _get_response.json()
        resource.resource_type = u'wistia'
        html_resp = BeautifulSoup(_data['html'], 'lxml')
        iframe = html_resp.find('iframe')
        resource.path = unicode(iframe.attrs['src'])
        resource.meta_data['title'] = iframe.attrs['title']
        resource.meta_data['thumbnail_url'] = unicode(_data['thumbnail_url'])

    except Exception as e:
        import logging
        logger = logging.getLogger(__name__)
        wistia_error_handler = logging.FileHandler(
            current_app.config.get('WISTIA_ERROR_LOG')
        )
        wistia_error_formatter = logging.Formatter(
            '%(levelname)s - %(message)s'
        )
        wistia_error_handler.setFormatter(wistia_error_formatter)
        wistia_error_handler.setLevel(logging.ERROR)
        logger.addHandler(wistia_error_handler)
        logger.error(e)
        raise SharedemosException(400, 'WISTIA_ERROR')


def build_url(section_slug, chapter_slug=None):
    """Build url for a given section."""
    url = url_for(
        'main.route_handler',
        section=section_slug
    )

    if chapter_slug:
        url = url_for(
            'main.route_handler',
            section=section_slug,
            chapter=chapter_slug
        )

    return url


def build_breadcrumb(section, breadcrumb_list=None):
    """
    Recursive function to Build breadcrumb_list for a given section.

    params:
    section: section model object
    breadcrumb_list: list of dictionary, having name and url
    for all the ancestors of the given section
    [
        {
            "name": name of the parent section,
            "url": url for the parent section
        }
    ]
    """
    if not breadcrumb_list:
        breadcrumb_list = []

    breadcrumb_list.insert(0, {
        "name": section.get_name(),
        "url": build_url(section.slug)
    })

    if section.parent_id:
        return build_breadcrumb(section.parent, breadcrumb_list)

    breadcrumb_list.insert(0, {
        "name": "Home",
        "url": url_for("main.home")
    })

    return breadcrumb_list


def get_rackspace_container():
    """Set the credentials of rackspace user for uploading documents."""
    pyrax.set_setting("identity_type", "rackspace")
    pyrax.set_credentials(current_app.config['PYRAX_DOC_USERNAME'],
                          current_app.config['PYRAX_DOC_APIKEY'])

    cf = pyrax.cloudfiles
    return cf.get_container(
        current_app.config['RACKSPACE_DOC_CDN_CONTAINER']
    )


def generate_pdf_thumbnail(resource_path):
    """Generate pdf thumbnail."""
    """
        Generate thumbnail for the PDF file from its first page.
        Params:
            resource_path = Path of the PDF in media folder(String).

        Returns:
            Name of the generated thumbnail.
    """
    file_path = os.path.join(
        current_app.config.get('MEDIA_FOLDER'),
        resource_path
    )
    """
    Method used to generate image is pdf2image.convert_from_path.

    params:
        pdf_path: Path to the PDF that you want to convert
        dpi: Image quality in DPI (default 200)
        output_folder: Write the resulting images to a folder
        first_page: First page to process
        last_page: Last page to process before stopping
        fmt: Output image format
        output_file: output filename.
    Return:
        List of image instance.
    """
    try:
        if os.path.exists(file_path):
            thumbnail = convert_from_path(
                pdf_path=file_path,
                dpi=200,
                output_folder=current_app.config.get('MEDIA_FOLDER'),
                first_page=1,
                last_page=1,
                fmt='JPEG',
                output_file=unicode(uuid4()).decode('utf-8').encode('utf-8')
            )
            # Since we are generating thumbnial for first page only,
            # List contains only one image instance.
            return (thumbnail[0].filename.rsplit('/')[-1]
                    if len(thumbnail) > 0 else None)

    except Exception, e:
        print str(e)
        return


def convert_file_to_pdf(filename, export_format="pdf"):
    """Function to convert any file(doc, docx or ppt) to pdf."""
    conn_str = "socket,host={},port={},tcpNoDelay=1;urp;StarOffice.ComponentContext"
    cmd = [
        "unoconv",
        "-c",
        conn_str.format(
            current_app.config.get("OPENOFFICE_HOST"),
            current_app.config.get("OPENOFFICE_PORT")
        ),
        "-f", export_format,
        "-o", "%s" % current_app.config.get('MEDIA_FOLDER'),
        filename
    ]
    office_process = subprocess.Popen(cmd, env=os.environ)

    try:
        ret = office_process.wait()
        if ret:
            office_process = subprocess.Popen(cmd, env=os.environ)
            office_process.wait()
    except Exception:
        office_process.terminate()
        raise Exception
