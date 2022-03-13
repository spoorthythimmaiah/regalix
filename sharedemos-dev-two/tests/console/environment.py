import os

from flask.ext.migrate import Migrate, upgrade, downgrade

from sharedemos.libs.core import create_app
from sharedemos.models import db, Tenant
from sharedemos.models.activity_feed import ActivityFeed
from datetime import datetime, timedelta

from ..libs.utils import get_tenant_app, login


def before_all(context):
    app = create_app('sharedemos', 'testing')
    Migrate(app, db)
    with app.app_context():
        downgrade(directory='migrations', revision='base')
        upgrade(directory='migrations')

    app.cache.clear()
    context.app = app
    context.app.audience_url = None
    context.app.domain = None
    tenant = Tenant.query.get(-1)
    context.client = get_tenant_app(tenant.domain)
    context.base_path = os.path.abspath(os.path.dirname(__file__))
    context.domain = None
    context.register_link = None
    context.re_add_register_link = None


def before_feature(context, feature):
    if 'get_the_app' in feature.tags:
        context.tenant_client = get_tenant_app(context.app.domain)
    if 'login_required' in feature.tags:
        login(context)


def before_scenario(context, scenario):
    if 'changing_language_to_chinese' in scenario.tags:
        context.execute_steps(u'Given User logs in to "testing.sharedemos.com:5000" domain for language "zh_CN" with "email as nagarjun.nas21@gmail.com and password as 123456"')
    if 'default_language_as_chinese' in scenario.tags:
        context.execute_steps(u'Given User logs in to "testing.sharedemos.com:5000" domain for language "Default zh_CN" with "email as nagarjun.nas21@gmail.com and password as 123456"')
    if 'browser_language_priorities_with_german_first_and_chinese_as_second' in scenario.tags:
        context.execute_steps(u'Given User logs in to "testing.sharedemos.com:5000" domain with languages priority "de_AT,zh_CN" with "email as nagarjun.nas21@gmail.com and password as 123456"')


def after_scenario(context, scenario):
    if 'freeze_timing' in scenario.tags:
        with context.app.app_context():
            first_three = ActivityFeed.query.limit(3).all()
            last_three = ActivityFeed.query.all()[-3:]
            for activity in first_three:
                activity.created_at = datetime.now() - timedelta(days=1)
            for activity in last_three:
                activity.created_at = datetime.now() + timedelta(days=1)
            db.session.commit()

    if 'tenant_private' in scenario.tags:
        with context.app.app_context():
            tenant = Tenant.query.filter(Tenant.name == 'testing').first()
            tenant.flags.is_private = False
            db.session.commit()


def after_all(context):
    with context.app.app_context():
        downgrade(directory='migrations', revision='base')
