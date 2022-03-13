import os
import datetime
from redis import (
    ConnectionPool,
    Redis,
    StrictRedis
)
from uuid import uuid4
from threading import Lock

from flask import (
    Flask,
    current_app,
    flash, g,
    jsonify,
    redirect,
    render_template,
    request,
    session,
    url_for
)

from celery import Celery, Task
from flask.ext.babel import Babel
from flask_wtf.csrf import CsrfProtect
from flask.ext.login import (
    LoginManager,
    _get_user,
    current_user,
    logout_user
)
from flask.ext.principal import (
    identity_loaded,
    Principal,
    RoleNeed,
    UserNeed,
    identity_changed,
    AnonymousIdentity
)
from flask.ext.restful import Api
from flask.ext.session import RedisSessionInterface
from social.apps.flask_app.routes import social_auth
from werkzeug.contrib.cache import RedisCache

from sharedemos.models import (
    db,
    Tenant,
    ReferralTracking,
    User,
    UserActivity
)

from .url import url_builder


class CustomRedisCache(RedisCache):
    """Extending Werkzeug's redis cache."""

    """
        as current werkzeug version 0.9.6 donot support kwargs
        pool object is passed to RedisCache for pooling connections
    """

    def __init__(self, host='localhost', port=6379, password=None,
                 db=0, default_timeout=300, key_prefix=None, **kwargs):
        super(CustomRedisCache, self).__init__(
            host=host,
            port=port,
            password=password,
            db=db,
            default_timeout=default_timeout,
            key_prefix=key_prefix
        )
        self._client = Redis(
            host=host,
            port=port,
            password=password,
            db=db,
            **kwargs
        )


def get_env_value(app, env_key):
    """
    Get the environment key's value.

    Evaluate it to True by checking its value.
    """
    return_value = False
    if app.config[env_key]:
        # If the value is from environment, then evaluate it as a string.
        if isinstance(app.config[env_key], str):
            return_value = app.config[env_key] == "True"
        else:
            return_value = app.config[env_key]
    return return_value


def get_locale_details():
    """Return language_id, language_name to store in session."""
    cookie_name = 'user_locale'
    user = 'user'

    from sharedemos.libs.api import is_author
    # Flag to identify author
    if request.endpoint in ('main.edit', 'main.preview', 'main.edit_quiz') or\
            (request.endpoint in (
                'main.pathfinder', 'main.check_list', 'main.faq') and
                request.view_args.get('authoring_mode') in (
                    'edit', 'preview')) or\
            (request.endpoint == 'main.export_to_pdf' and is_author()):
        cookie_name = 'author_locale'
        user = 'author'

    if user not in session:
        session[user] = dict()

    tenant_id = getattr(current_app, 'tenant_id', None)
    if not tenant_id:
        return current_app.config['BABEL_DEFAULT_LOCALE'], None

    tenant = Tenant.query.get(tenant_id)
    available_languages = {tenant.default_locale.id: tenant.default_locale}
    for language in tenant.supported_locales:
        if language.id != tenant.default_locale_id:
            available_languages[language.id] = language

    ck_locale = request.cookies.get(cookie_name)
    if ck_locale:
        if 'locale' in session[user] and\
            'language' in session[user] and\
            session[user]['locale'] == ck_locale and\
                session[user]['language'] !=\
                available_languages[ck_locale].name:
            return unicode(ck_locale), available_languages[ck_locale].name

        if tenant.default_locale_id == ck_locale:
            return tenant.default_locale_id, tenant.default_locale.name

        for lang in tenant.supported_locales:
            if lang.id == ck_locale:
                return lang.id, lang.name

    # Select browser locale if application supports the locale
    header = request.headers.get('Accept-Language', '')
    locales = [locale.split(';')[0].replace('-', '_')
               for locale in header.split(',')]

    for locale in locales:
        if locale in available_languages.keys():
            return unicode(locale), available_languages[locale].name

    return tenant.default_locale_id, tenant.default_locale.name


def load_locale(key):
    # cookie_name could be 'user_locale' or 'author_locale'
    cookie_name = key + '_locale'
    if key not in session:
        session[key] = dict()

    # check cookies or session and add locale
    if 'locale' not in session[key] or\
            'language' not in session[key] or\
            (cookie_name in request.cookies and
             request.cookies.get(cookie_name) != session[key]['locale']):
        session[key]['locale'], session[key]['language'] = get_locale_details()

    session.modified = True


def log_activity():
    user_id = None
    tenant_id = getattr(current_app, 'tenant_id', None)
    user_activity = None

    # log an activity if user has no session associated
    if 'user_id' not in session['user']:
        user_id = unicode(uuid4())
        user_activity = UserActivity()
        user_activity.unique_user_id = unicode(user_id)
        user_activity.tenant_id = tenant_id
        user_activity.browser = unicode(request.user_agent.browser or 'BOT')
        user_activity.version = unicode(request.user_agent.version or 'BOT')
        user_activity.platform = unicode(request.user_agent.platform or 'BOT')
        user_activity.language = unicode(
            request.headers.get('Accept-Language', 'BOT'))

        ip_address = request.headers.get("X-Real-Ip") or request.remote_addr
        user_activity.ip_address = unicode(ip_address)
        if ip_address and ip_address != "127.0.0.1" and\
                current_app.config['MAXMIND_ENABLED']:
            from sharedemos.libs.helpers import get_geoip_info
            geoip_info = get_geoip_info(ip_address)
            if geoip_info:
                user_activity.city = unicode(geoip_info['city'])
                user_activity.state = unicode(geoip_info['state'])
                user_activity.country = unicode(geoip_info['country'])
                user_activity.country_iso_code = unicode(
                    geoip_info['country_iso_code']
                )
        user_activity.user_id = session.get('user_id')
        db.session.add(user_activity)
        if 'user_id' not in session['user'] or\
                session['user']['user_id'] != user_id:
            session['user']['user_id'] = user_id
            session.modified = True

        # Filter self referrals
        source = request.args.get('utm_source') or\
            request.headers.get('Referer') or u'direct'

        if request.host in source:
            source = u'direct'

        referral = ReferralTracking()
        referral.source = source
        referral.medium = request.args.get('utm_medium', u'referral')
        referral.campaign = request.args.get('utm_campaign')
        referral.term = request.args.get('utm_term')
        referral.content = request.args.get('utm_content')
        referral.entrance_path = request.url
        referral.user_activity = user_activity
        db.session.add(referral)
        db.session.commit()
    elif g.user.is_active():
        user_activity = UserActivity.query.filter(
            UserActivity.unique_user_id == unicode(session['user']['user_id'])
        ).first()
        if user_activity and not user_activity.user_id:
            user_activity.user_id = int(session.get('user_id'))
            db.session.add(user_activity)
            db.session.commit()


def validate_user():
    """Validate user against session."""
    user_id = session.get('user_id')
    if user_id:
        user = User.query.get(user_id)
        if user.is_deleted:
            logout_user()

            # Remove session keys set by Flask-Principal and application
            for key in ('user', 'author', 'identity.name',
                        'identity.auth_type'):
                session.pop(key, None)

            # Tell Flask-Principal the user is anonymous
            identity_changed.send(current_app._get_current_object(),
                                  identity=AnonymousIdentity())
            load_locale('user')

        # Set a session key based on consent status of NDA.
        tenant = user.tenant
        if tenant.template and tenant.template.lower() == u'purestorage':
            user_groups = [grp.slug for grp in user.groups]
            if 'partner' in user_groups and\
                ('is_nda_approved' not in session or
                 ('is_nda_approved' in session and
                  not session['is_nda_approved'])):

                social_auth = user.social_auth.first()
                session['is_nda_approved'] = bool(
                    social_auth and
                    social_auth.extra_data and
                    social_auth.extra_data.get('consent_status')
                )


def app_after_request(response):
    response.headers.extend({
        "Last-Modified": datetime.datetime.utcnow(),
        "Cache-Control": "no-store, no-cache, must-revalidate," +
        " post-check=0, pre-check=0, max-age=0",
        "Pragma": "no-cache",
        "Expires": "-1"
    })
    return response


def app_before_request():

    g.user = _get_user()
    load_locale('user')

    # Skip processing admin and static endpoint requests
    if (
        (request.endpoint and request.endpoint.startswith('admin')) or
        request.endpoint in ["main.ping", "static"] or
        request.blueprint in [
            'user', 'tenant', 'tenanttheme', 'languages',
            'iconlibrary', 'section', 'resource', 'tag',
            'redirecturl', 'maildigest', 'admin'
        ]
    ):
        return

    session.permanent = current_app.config.get("SESSION_PERMANENT", True)

    # Filter BOTS
    if not request.user_agent.browser or\
        not request.user_agent.version or\
        not request.user_agent.platform or\
        request.user_agent.browser in current_app.config.get('BOT_LIST', [])\
        or not request.user_agent.string or\
            request.headers['User-Agent'].lower() == 'prerender':
        return

    if g.user.is_active() and g.user.is_author():
        load_locale('author')

    log_activity()
    validate_user()
    if not current_app.config.get('SOCIAL_AUTH_SAML_ENABLED_IDPS'):
        set_saml_config()


# App Creation
def create_app(package_name, proj_env='development'):

    app = Flask(package_name)

    load_config(app, proj_env)

    initialize_extensions(app)
    register_blueprints(app)

    redis_pool = ConnectionPool(
        host=app.config.get('REDIS_HOST'),
        port=app.config.get('REDIS_PORT'),
        db=0
    )

    # App cache with timeout default to 24 hours
    app.cache, app.strict_redis = get_redis_cache(
        app,
        pool=redis_pool,
        timeout=app.config.get('REDIS_CACHE_TIMEOUT'),
        strict_redis=True
    )

    # Box app cache with defult timeout to 1 hour
    app.box_cache = get_redis_cache(
        app,
        pool=redis_pool,
        timeout=app.config.get('BOX_API_CACHE_TIMEOUT')
    )

    app.session_interface = RedisSessionInterface(
        app.cache._client,
        key_prefix='session:',
        use_signer=True,
        permanent=app.config.get("SESSION_PERMANENT", True)
    )

    app.before_request(app_before_request)
    app.context_processor(inject_template_args)
    app.after_request(app_after_request)

    setup_error_handlers(app)
    return app


def get_redis_cache(app, pool, timeout, strict_redis=False):
    """Register redis server."""
    redis_cache = CustomRedisCache(
        host=app.config.get('REDIS_HOST'),
        port=app.config.get('REDIS_PORT'),
        default_timeout=timeout,
        connection_pool=pool
    )

    if strict_redis:
        strict_redis = StrictRedis(
            host=app.config.get('REDIS_HOST'),
            port=app.config.get('REDIS_PORT'),
            socket_timeout=timeout,
            connection_pool=pool
        )
        return redis_cache, strict_redis

    return redis_cache


def create_celery_app(app=None):
    if not app:
        app = create_app('sharedemos')

    celery = Celery(app.import_name, broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)

    class ContextTask(Task):
        abstract = True

        def __call__(self, *args, **kwargs):
            with app.app_context() and app.test_request_context():
                return Task.__call__(self, *args, **kwargs)

    celery.Task = ContextTask
    return celery


# App Configuration settings
def load_config(app, proj_env='development'):
    app.config.from_object('sharedemos.config.default')

    config_files = {
        'development': 'config/development.py',
        'testing': 'config/testing.py',
        'stage': 'config/stage.py',
        'qa': 'config/qa.py',
        'production': 'config/production.py',
        'bmc-production': 'config/bmc-production.py'
    }

    proj_env = os.environ.get('PROJ_ENV', proj_env)

    if proj_env in config_files:
        app.config.from_pyfile(config_files[proj_env])
        # If algolia api key is available in environment
        # then assign it to the app-config.
        for _key in ["ALGOLIA_API_KEY",
                     "AUTH_USER",
                     "AUTH_PASSWORD",
                     "PYRAX_DOC_USERNAME",
                     "PYRAX_DOC_APIKEY",
                     "SECRET_KEY"]:
            if os.environ.get(_key):
                app.config[_key] = os.environ[_key]


def initialize_extensions(app):
    db.app = app
    db.init_app(app)

    configure_babel(app)

    csrf_protect = CsrfProtect(app)
    csrf_protect.exempt('sharedemos.views.auth.mobile_login')
    csrf_protect.exempt('sharedemos.views.auth.saml_auth')
    csrf_protect.exempt('sharedemos.views.main.chargify_webhook')
    csrf_protect.exempt('sharedemos.views.document_parser.callback')
    csrf_protect.exempt('sharedemos.apps.repository_manager.views.callback')
    csrf_protect.exempt('sharedemos.api.usher.usherapi')
    csrf_protect.exempt(
        'sharedemos.apps.pitch.views.compare_callback'
    )

    Principal(app, skip_static=True)    # Skip check for static endpoint

    from sharedemos.api import configure_api
    api_manager = Api(app)
    configure_api(api_manager)

    from sharedemos.admin import configure as configure_admin
    configure_admin(app)

    configure_loginmanager(app)

    identity_loaded.connect_via(app)(on_identity_loaded)


def configure_babel(app):
    babel = Babel(app)
    babel.localeselector(lambda: get_locale_details()[0])


def configure_loginmanager(app):

    login_manager = LoginManager(app)

    login_manager.login_view = "auth.login"
    login_manager.user_loader(load_user)


def load_user(id):

    return User.query.get(id)


def handle_oauth_exception(e):
    flash(e.message)
    return redirect(url_for('auth.login'))


def handle_http_exceptions(error_code):
    """Custom method to handle api exceptions."""
    from sharedemos.libs.utils import get_tenant_api
    redirect_url = request.referrer or url_for('main.home')
    tenant = get_tenant_api()
    return render_template(
        'error_page/{}.html'.format(error_code),
        redirect_url=redirect_url,
        tenant=tenant
    ), error_code


def handle_api_exceptions(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


# Make current user available on templates
def inject_template_args():
    return {
        'now': datetime.datetime.utcnow(),
        'url_for': url_builder,
        'user': getattr(g, 'user', None)
    }


def register_blueprints(app):
    from sharedemos.views import (
        activity_log,
        apps,
        audience,
        auth,
        dashboard,
        document_parser,
        main,
        redirect_bp
    )
    from sharedemos.apps.repository_manager.views import repository_manager
    from sharedemos.errors import errors
    from sharedemos.apps.pitch.views import pitch

    app.register_blueprint(activity_log)
    app.register_blueprint(audience, url_prefix='/audience')
    app.register_blueprint(apps, url_prefix='/apps')
    app.register_blueprint(auth)
    app.register_blueprint(dashboard, url_prefix='/dashboard')
    app.register_blueprint(document_parser, url_prefix='/document_parser')
    app.register_blueprint(errors)
    app.register_blueprint(
        repository_manager, url_prefix='/repository_manager')
    app.register_blueprint(main)
    app.register_blueprint(social_auth)
    app.register_blueprint(redirect_bp)
    app.register_blueprint(pitch, url_prefix='/pitch_app')


def setup_error_handlers(app):
    admins = app.config.get('ADMINS')
    if not app.debug and admins:
        import logging
        from logging.handlers import SMTPHandler
        from sharedemos.libs.helpers import ContextualFilter
        app.logger.addFilter(ContextualFilter())

        admin_emails = [email for _, email in admins]

        error_mail_format = """
            Message type:       %(levelname)s
            Location:           %(pathname)s:%(lineno)d
            Module:             %(module)s
            Function:           %(funcName)s
            Time:               %(asctime)s
            Method:             %(method)s
            URL:                %(url)s
            IP:                 %(ip)s
            country:            %(country)s
            city:               %(city)s
            Headers:            %(headers)s
            Data:               %(data)s
            Args:               %(args)s
            Error Message:      %(error_message)s

            Message:
            %(message)s
        """

        proj_env = app.config.get('PROJECT_ENV', 'development')

        email_host = app.config.get('EMAIL_HOST')
        email_host_user = app.config.get('EMAIL_HOST_USER')
        email_host_password = app.config.get('EMAIL_HOST_PASSWORD')

        mail_handler = SMTPHandler(
            email_host,
            'info@regalix-inc.com',
            admin_emails, proj_env + ' - YourApplication Failed',
            credentials=(
                email_host_user,
                email_host_password
            )
        )
        mail_handler.setLevel(logging.ERROR)
        mail_handler.setFormatter(logging.Formatter(error_mail_format))
        app.logger.addHandler(mail_handler)

        import airbrake

        airbrake_api_key = app.config.get('AIRBRAKE_API_KEY')
        airbrake_project_id = app.config.get('AIRBRAKE_PROJECT_ID')
        airbrake_environment = app.config.get('PROJECT_ENV')

        app.logger.addHandler(airbrake.AirbrakeHandler(
            project_id=airbrake_project_id,
            api_key=airbrake_api_key,
            environment=airbrake_environment))


def get_saml_attributes(model):
    attribute_dict = {
        'entity_id': model.idp_entity_id,
        'url': model.idp_url,
        'x509cert': model.idp_x509cert
    }
    for field in current_app.config['SOCIAL_AUTH_USER_FIELDS']:
        key = 'attr_' + field
        value = getattr(model, 'idp_' + field, None)
        attribute_dict.update({key: value})

    return attribute_dict


def set_saml_config():
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    current_app.config['SOCIAL_AUTH_SAML_SP_ENTITY_ID'] = tenant.domain
    if tenant.sp_public_certificate and tenant.sp_private_key:
        current_app.config.update({
            'SOCIAL_AUTH_SAML_SP_PUBLIC_CERT': tenant.sp_public_certificate,
            'SOCIAL_AUTH_SAML_SP_PRIVATE_KEY': tenant.sp_private_key
        })

        idp_dict = dict()
        user_groups = [
            grp for grp in tenant.user_groups
            if grp.idp_entity_id and grp.idp_url and grp.idp_x509cert]
        if user_groups:
            for _grp in user_groups:
                idp_dict[_grp.slug] = get_saml_attributes(_grp)
        else:
            idp_dict['default'] = get_saml_attributes(tenant)

        current_app.config.update({
            'SOCIAL_AUTH_SAML_ENABLED_IDPS': idp_dict
        })
    elif 'SOCIAL_AUTH_SAML_ENABLED_IDPS' in current_app.config:
        del current_app.config['SOCIAL_AUTH_SAML_ENABLED_IDPS']


def on_identity_loaded(sender, identity):
    # Set the identity user object
    identity.user = current_user

    # Add the UserNeed to the identity
    if hasattr(current_user, 'id'):
        identity.provides.add(UserNeed(current_user.id))

    # Assuming the User model has a list of roles, update the
    # identity with the roles that the user provides
    if hasattr(current_user, 'role'):
        if current_user.role_id == 1:
            for role in [1, 2, 3, 4, 5]:
                identity.provides.add(RoleNeed(role))
        elif current_user.role_id == 2:
            for role in [2, 3, 4, 5]:
                identity.provides.add(RoleNeed(role))
        elif current_user.role_id == 3:
            for role in [3, 4, 5]:
                identity.provides.add(RoleNeed(role))
        elif current_user.role_id == 4:
            for role in [4, 5]:
                identity.provides.add(RoleNeed(role))
        elif current_user.role_id == 5:
            identity.provides.add(RoleNeed(5))


class DomainDispatcher(object):

    def __init__(self, create_app):
        self.create_app = create_app
        self.lock = Lock()
        self.instances = {}

    def get_application(self, host):
        splits = host.split(':')
        if len(splits) > 1 and splits[1] == '80':
            host = splits[0]

        with self.lock:
            app = self.instances.get(host)
            if app is None:
                app = self.create_app(host)
                self.instances[host] = app
            return app

    def __call__(self, environ, start_response):
        app = self.get_application(environ['HTTP_HOST'])
        return app(environ, start_response)
