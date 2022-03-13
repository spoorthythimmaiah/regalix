import os
import pytz
import tempfile
import uuid
from datetime import datetime, time, timedelta
from flask import current_app

from PIL import Image
from selenium import webdriver
from cStringIO import StringIO
from bs4 import BeautifulSoup
from urlparse import urlparse

from sharedemos.libs.api import get_product_path
from sharedemos.models import (
    db, LeadsGenerated,
    SiteVisitors,
    Tenant,
    TopicActivity,
    VisitorsGeography,
    VisitorsReferral,
    Walkthrough
)
from sharedemos.libs.helpers import get_default_translation


def format_datetime(utc_date):
    if type(utc_date) in [str, unicode]:
        utc_date = datetime.strptime(utc_date, "%Y-%m-%d %H:%M:%S.%f")
    return utc_date


def get_start_datetime(utc_date):
    utc_date = format_datetime(utc_date)
    utc_date = datetime.combine(utc_date.date(), time())

    return utc_date


def is_dst(timezone):
    tz = pytz.timezone(timezone)
    now = pytz.utc.localize(datetime.utcnow())
    return now.astimezone(tz).dst() != timedelta(0)


def get_local_start_date(utc_date, timezone=None):
    utc_date = format_datetime(utc_date)
    if not timezone:
        timezone = current_app.config['DEFAULT_TIMEZONE']

    local_tz = pytz.timezone(timezone)
    local_date = utc_date.replace(tzinfo=pytz.utc)\
        .astimezone(local_tz).replace(tzinfo=None)

    offset = local_tz.utcoffset(local_date, is_dst=is_dst(timezone))
    local_start_date = get_start_datetime(local_date) - offset

    return local_start_date


def get_or_create_site_visitor(date_time, tenant_id, product=None):
    if product:
        def_prod_trans = get_default_translation(product)
        visitor_activity = SiteVisitors.query.filter(
            (SiteVisitors.tenant_id == tenant_id) &
            (SiteVisitors.from_date == date_time) &
            (SiteVisitors.product == def_prod_trans.name)
        ).first()
    else:
        visitor_activity = SiteVisitors.query.filter(
            (SiteVisitors.tenant_id == tenant_id) &
            (SiteVisitors.from_date == date_time) &
            (SiteVisitors.product.is_(None))
        ).first()

    if not visitor_activity:
        visitor_activity = SiteVisitors()
        visitor_activity.from_date = date_time
        if product:
            visitor_activity.product = def_prod_trans.name
        visitor_activity.tenant_id = tenant_id
        visitor_activity.site_visitors_count = 0
        visitor_activity.overall_site_visitors_count = 0
        visitor_activity.demo_visitors_count = 0
        visitor_activity.overall_demo_visitors_count = 0

    return visitor_activity


def get_or_create_topic_activity(date_time, tenant_id, product=None,
                                 section=None, walkthrough=None):
    topic_activity = TopicActivity.query.filter(
        (TopicActivity.tenant_id == tenant_id) &
        (TopicActivity.from_date == date_time)
    )
    if product:
        def_prod_trans = get_default_translation(product)
        topic_activity = topic_activity.filter(
            TopicActivity.product == def_prod_trans.name
        )
    else:
        topic_activity = topic_activity.filter(
            TopicActivity.product.is_(None)
        )
    if section:
        def_sec_trans = get_default_translation(section)
        topic_activity = topic_activity.filter(
            TopicActivity.section == def_sec_trans.name
        )
    else:
        topic_activity = topic_activity.filter(
            TopicActivity.section.is_(None)
        )
    if walkthrough:
        def_wt_trans = get_default_translation(walkthrough)
        topic_activity = topic_activity.filter(
            TopicActivity.walkthrough == def_wt_trans.name
        )
    else:
        topic_activity = topic_activity.filter(
            TopicActivity.walkthrough.is_(None)
        )

    topic_activity = topic_activity.first()

    if not topic_activity:
        topic_activity = TopicActivity()
        topic_activity.tenant_id = tenant_id
        topic_activity.from_date = date_time
        if product:
            topic_activity.product = def_prod_trans.name
        if section:
            topic_activity.section = def_sec_trans.name
        if walkthrough:
            topic_activity.walkthrough = def_wt_trans.name
            total_slides = [sl for sl in walkthrough.slides
                            if not sl.is_deleted]
            topic_activity.total_slides_count = len(total_slides)

        topic_activity.hierarchy = list()
        topic_activity.percent_completions_25 = 0
        topic_activity.percent_completions_50 = 0
        topic_activity.percent_completions_75 = 0
        topic_activity.percent_completions_100 = 0
        topic_activity.average_frames_completed = 0
        topic_activity.visit_count = 0
        topic_activity.overall_visit_count = 0
        topic_activity.completion_count = 0
        topic_activity.overall_completion_count = 0
        topic_activity.completion_rate = 0.0
        topic_activity.overall_completion_rate = 0.0

        if product and section:
            try:
                product_tree = get_product_path(product=product,
                                                section_id=section.slug,
                                                tenant_id=tenant_id)
                product_tree = [get_default_translation(prod).name
                                for prod in product_tree]
            except Exception:
                product_tree = []
            topic_activity.hierarchy = product_tree
        db.session.add(topic_activity)
        db.session.commit()

    elif walkthrough:
        total_slides = [sl for sl in walkthrough.slides if not sl.is_deleted]
        topic_activity.total_slides_count = len(total_slides)

        db.session.add(topic_activity)
        db.session.commit()
    return topic_activity


def get_or_create_user_source(user, tenant, date_time, source, product=None):
    visitor_src = VisitorsReferral.query.filter(
        (VisitorsReferral.from_date == date_time) &
        (VisitorsReferral.tenant_id == tenant.id) &
        (VisitorsReferral.source == source)
    )

    if product:
        def_prod_trans = get_default_translation(product)
        visitor_src = visitor_src.filter(
            VisitorsReferral.product == def_prod_trans.name
        ).first()
    else:
        visitor_src = visitor_src.filter(
            VisitorsReferral.product.is_(None)
        ).first()

    if not visitor_src:
        visitor_src = VisitorsReferral()
        visitor_src.from_date = date_time
        visitor_src.tenant_id = tenant.id
        visitor_src.source = source
        visitor_src.product = def_prod_trans.name if product else None
        visitor_src.visitors_count = 0
        visitor_src.overall_visitors_count = 0

    return visitor_src


def log_visitor_geography(user, tenant, local_time, product=None):
    if not user.country or not user.country_iso_code:
        return

    visitor_geography = get_or_create_user_geography(user, tenant, local_time,
                                                     product)
    visitor_geography.overall_visitors_count += 1

    if user.created_at > local_time:
        visitor_geography.visitors_count += 1

    db.session.add(visitor_geography)


def log_visitor_referral(user, tenant, local_time, product=None):
    if not user.referral_source:
        return

    activity = user.referral_source[-1]

    source = activity.source
    if source and 'http' in source:
        domain = activity.source.split('//')[1]
        source = domain.split('/')[0]

    visitor_source = get_or_create_user_source(user, tenant, local_time,
                                               source, product)
    visitor_source.overall_visitors_count += 1

    if user.created_at > local_time:
        visitor_source.visitors_count += 1

    db.session.add(visitor_source)


def get_or_create_user_geography(user, tenant, date_time, product=None):
    visitor_geography = VisitorsGeography.query.filter(
        (VisitorsGeography.from_date == date_time) &
        (VisitorsGeography.tenant_id == tenant.id) &
        (VisitorsGeography.country == user.country) &
        (VisitorsGeography.country_iso_code == user.country_iso_code)
    )

    if product:
        def_prod_trans = get_default_translation(product)
        visitor_geography = visitor_geography.filter(
            VisitorsGeography.product == def_prod_trans.name
        ).first()
    else:
        visitor_geography = visitor_geography.filter(
            VisitorsGeography.product.is_(None)
        ).first()

    if not visitor_geography:
        visitor_geography = VisitorsGeography()
        visitor_geography.from_date = date_time
        visitor_geography.tenant_id = tenant.id
        visitor_geography.country = user.country
        visitor_geography.country_iso_code = user.country_iso_code
        visitor_geography.product = def_prod_trans.name if product else None
        visitor_geography.visitors_count = 0
        visitor_geography.overall_visitors_count = 0

    return visitor_geography


def get_or_create_lead_data(tenant_id, date_time, product=None, section=None):
    lead_data = LeadsGenerated.query.filter(
        (LeadsGenerated.from_date == date_time) &
        (LeadsGenerated.tenant_id == tenant_id)
    )

    def_prod_trans = get_default_translation(product)
    def_sec_trans = get_default_translation(section)

    lead_data = lead_data.filter(
        (LeadsGenerated.product == def_prod_trans.name) &
        (LeadsGenerated.section == def_sec_trans.name)
    ).first()

    if not lead_data:
        lead_data = LeadsGenerated()
        lead_data.from_date = date_time
        lead_data.tenant_id = tenant_id
        lead_data.product = def_prod_trans.name
        lead_data.section = def_sec_trans.name
        lead_data.leads_count = 0

    return lead_data


def generate_new_image_tag(soup, frame, source):
    new_img_tag = soup.new_tag('img')
    new_img_tag['src'] = source
    if frame.get('style'):
        new_img_tag['style'] = frame.get('style')
    if frame.get('width'):
        new_img_tag['width'] = frame.get('width')
    if frame.get('height'):
        new_img_tag['height'] = frame.get('height')
    frame.replace_with(new_img_tag)


def convert_html_to_image(content, host, locale):
    domains = Tenant.query.with_entities(Tenant.domain).all()
    tenant_domains = [domain[0] for domain in domains]
    soup = BeautifulSoup(content, 'lxml')
    frames = soup.findAll('iframe')
    checks = ['youtube.com', 'youtu.be', 'yt.be']
    for frame in frames:
        source = frame.attrs['src']
        if 'vimeo.com' in source and 'http' not in source:
            frame['src'] = 'https:' + source
        elif any([check in source for check in checks]):
            vi_id = frame['src'].split('?')[0].split('/')[-1]
            img_src = 'https://img.youtube.com/vi/' + vi_id + '/0.jpg'
            generate_new_image_tag(soup, frame, img_src)
        elif 'embed' in source:
            parse_result = urlparse(source)
            if parse_result.netloc == host or\
                    parse_result.netloc in tenant_domains:
                tenant_id = Tenant.query.filter_by(
                    domain=unicode(parse_result.netloc)
                ).first().id
                demo = Walkthrough.query.filter_by(
                    tenant_id=tenant_id,
                    slug=unicode(source.split('/')[-1])
                ).first()
                if demo:
                    thumbnail = demo.get_thumbnail_resource(locale)
                    img_src = thumbnail.path if thumbnail else None
                    if thumbnail and thumbnail.resource_type != 'sandbox':
                        img_src = "%s/%s" % (
                            current_app.config.get('MEDIA_FOLDER'),
                            thumbnail.path)
                    generate_new_image_tag(soup, frame, img_src)
                    break

    images = soup.findAll('img')
    for img in images:
        source = img.attrs['src']
        parse_result = urlparse(source)
        if source.startswith('/static/media'):
            img['src'] = "%s/%s" % (current_app.config.get('MEDIA_FOLDER'),
                                    source.split('/static/media/')[-1])
        elif parse_result.netloc == host or\
                parse_result.netloc in tenant_domains and\
                '/static/media' in parse_result.path:
            img['src'] = "%s/%s" % (current_app.config.get('MEDIA_FOLDER'),
                                    parse_result.path.split('/static/media/')[-1])

    content = soup.encode('ascii', 'xmlcharrefreplace')
    decoded_html = content.replace('<html>', '').replace('<body>', '')\
        .replace('</body>', '').replace('</html>', '')
    final_html = """
    <html>
        <head>
            <link rel="stylesheet" type="text/css"
            href="/static/libs/bootstrap/css/bootstrap.css"/>
            <link rel="stylesheet" type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/froala-editor/2.5.0/css/froala_style.min.css"/>
        </head>
        <body>
            <div class="fr-view"
            style="margin:25px 50px 50px;height:718px;overflow:hidden;"
            >%s</div>
        </body>
    </html>
    """ % (decoded_html)

    tempdir = os.path.join(os.path.abspath('sharedemos'), 'static', 'tmp')
    if not os.path.exists(tempdir):
            os.makedirs(tempdir)
    temp = tempfile.NamedTemporaryFile(suffix='.html', dir=tempdir)
    image_file_name = uuid.uuid4().hex
    image_file_path = "%s/%s" % (current_app.config.get('MEDIA_FOLDER'),
                                 image_file_name)
    try:
        driver = webdriver.PhantomJS(
            service_args=['--ignore-ssl-errors=true',
                          '--ssl-protocol=any',
                          '--web-security=false'])
        temp.write(final_html)
        temp.flush()
        driver.set_window_size(1024, 768)
        driver.get(temp.name)
        screenshot = StringIO(driver.get_screenshot_as_png())
        png_image = Image.open(screenshot).convert('RGBA')
        background = Image.new('RGBA', png_image.size, (255, 255, 255))
        alpha_composite = Image.alpha_composite(background, png_image)
        alpha_composite.crop((0, 0, 1024, 768)).save(image_file_path + '.jpg',
                                                     'JPEG', quality=80)
    except Exception as e:
        print e
    finally:
        driver.quit()
        temp.close()
    return image_file_name + '.jpg'
