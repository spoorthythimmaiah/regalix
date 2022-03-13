from datetime import timedelta
import os
from kombu import Exchange, Queue

APP_ROOT_DIR = os.path.dirname(os.path.dirname(__file__))

# Applications default constants
CSRF_ENABLED = True

STATIC_FOLDER = os.path.abspath(os.path.join(APP_ROOT_DIR, "static"))

MEDIA_FOLDER = os.path.join(STATIC_FOLDER, "media")

CLIENT_FOLDER = os.path.join(MEDIA_FOLDER, "client")

EXPORT_FOLDER = os.path.join(MEDIA_FOLDER, "export_files")

TENANT_CONFIG = os.path.join(MEDIA_FOLDER, "tenant_config")

SITEMAP_FOLDER = os.path.join(os.path.dirname(APP_ROOT_DIR), 'seo')

HTML_ZIP_FOLDER = os.path.join(MEDIA_FOLDER, "html5")

# Pagination limit
PAGE_LIMIT = 10

DEFAULT_TIMEZONE = 'US/Pacific'

BOT_LIST = [None, 'BOT', 'None', 'altavista', 'aol', 'ask', 'bing', 'excite',
            'google', 'live', 'mail', 'msn', 'yahoo']

SQLALCHEMY_TRACK_MODIFICATIONS = True

# Python Social Auth
SOCIAL_AUTH_USER_MODEL = 'sharedemos.models.User'
SOCIAL_AUTH_STORAGE = 'sharedemos.models.user.FlaskStorage'
LOGIN_REDIRECT_URL = '/dashboard/reports/'

SOCIAL_AUTH_STRATEGY = 'sharedemos.libs.psa.strategy.SDStrategy'

SOCIAL_AUTH_AUTHENTICATION_BACKENDS = (
    'social.backends.email.EmailAuth',
    'sharedemos.libs.psa.backend.SharedemosSAMLAuth'
)

SOCIAL_AUTH_PIPELINE = (
    'social.pipeline.social_auth.social_details',
    'social.pipeline.social_auth.social_uid',
    'social.pipeline.social_auth.auth_allowed',
    'social.pipeline.social_auth.social_user',
    'social.pipeline.user.get_username',
    'social.pipeline.social_auth.associate_by_email',
    'sharedemos.libs.psa.pipeline.validate_user',
    'sharedemos.libs.psa.pipeline.create_user',
    'social.pipeline.social_auth.associate_user',
    'social.pipeline.social_auth.load_extra_data',
    'social.pipeline.user.user_details',
)

SOCIAL_AUTH_USER_FIELDS = (
    'username', 'email', 'first_name', 'last_name', 'usertype',)

SOCIAL_AUTH_SAML_TECHNICAL_CONTACT = {
    "givenName": "Ravish Kamath",
    "emailAddress": "rkamath@regalix-inc.com"
}

SOCIAL_AUTH_SAML_SUPPORT_CONTACT = {
    "givenName": "Ravish Kamath",
    "emailAddress": "rkamath@regalix-inc.com",
}

SOCIAL_AUTH_SAML_ORG_INFO = {
    "en-US": {
        "name": "sharedemos",
        "displayname": "ShareDemos",
        "url": "https://www.sharedemos.com",
    }
}

SOCIAL_AUTH_SAML_SECURITY_CONFIG = {
    'authnRequestsSigned': True,
}

# Airbrake Environment variables
AIRBRAKE_API_KEY = 'ed6134671f89083d4551aa1f572b0e06'
AIRBRAKE_PROJECT_ID = '111801'

# Flask admin theme
FLASK_ADMIN_SWATCH = 'simplex'

# End of life (Expiry) Scheduler Configuration
ASSET_EXPIRY_CMD = 'PROJ_ENV={} /opt/python/venv/sharedemos/bin/python /srv/sharedemos/manage.py disable-entity -job_id '
COMMENT_FORMAT = 'ExpiryJobID-{}'
CRON_USER = 'ubuntu'
EXPIRY_SCHEDULER_LOG = "/var/log/uwsgi/sharedemos/expiry_scheduler.log"

# Mailer Configuration
EMAIL_HOST = 'smtp.mailgun.org'
EMAIL_PORT = 587

EMAIL_HOST_USER = 'postmaster@mg.sharedemos.com'
EMAIL_HOST_PASSWORD = 'd899e62293bf5c70dc9a78d3e465ae37'

EMAIL_USE_TLS = True
EMAIL_USE_SSL = False

# Campaign Tracking Code
DEFAULT_CAMPAIGN_TRACKING_CODE = "fqq06"

DEFAULT_BACKGROUND_COLOR = "#29a9d8"
DEFAULT_FILL_COLOR = "#fa575c"
DEFAULT_TITLE_COLOR = "#ffffff"
DEFAULT_PARAGRAPH_COLOR = "#ffffff"

DEFAULT_LOGIN_REDIRECT = 'dashboard.library'

# GeoIP2 parameters
USER_ID = 103727
LICENSE_KEY = 'rpWLI8PLhbg5'

# Enable Maxmind-GeoIP2 query
MAXMIND_ENABLED = True

# Celery configuration
CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_BROKER_URL = 'amqp://sdemos:sdemos@127.0.0.1:5672/',
CELERY_RESULT_BACKEND = 'amqp'
CELERY_IMPORTS = ('sharedemos.tasks', )
CELERY_SEND_TASK_ERROR_EMAILS = True
CELERY_IGNORE_RESULT = True
CELERY_SEND_TASK_SENT_EVENT = True
CELERY_QUEUES = (
    Queue('default', Exchange('default'), routing_key='default'),
    Queue('activity_tasks', Exchange('activity_tasks'),
          routing_key='activity_tasks'),
    Queue('algolia_tasks', Exchange('algolia_tasks'),
          routing_key='algolia_tasks'),
    Queue('cache_tasks', Exchange('cache_tasks'),
          routing_key='cache_tasks'),
    Queue('document_parser', Exchange('document_parser'),
          routing_key='document_parser'),
)
CELERY_ROUTES = {
    'sharedemos.tasks.run.activity': {
        'queue': 'activity_tasks',
        'routing_key': 'activity_tasks'
    },
    'sharedemos.tasks.run.aloglia': {
        'queue': 'algolia_tasks',
        'routing_key': 'algolia_tasks'
    },
    'sharedemos.tasks.run.cache': {
        'queue': 'cache_tasks',
        'routing_key': 'cache_tasks'
    },
    'sharedemos.tasks.run.default': {
        'queue': 'default',
        'routing_key': 'default'
    },
    'sharedemos.tasks.run.document_parser': {
        'queue': 'document_parser',
        'routing_key': 'document_parser'
    }
}

# Algolia Credentials
ALGOLIA_APPLICATION_ID = '8TCC169YPD'
ALGOLIA_SEARCH_KEY = '15ae55f73e1248a23abd641b17dff4a0'

# Algolia Analytics API URL
ALGOLIA_ANALYTICS_URL = 'https://analytics.algolia.com/2/searches?index={}&startDate={}&endDate={}'
ALLOWED_APPS_FOR_ALGOLIA = [
    'checklist', 'faq', 'journeys', 'pathfinder', 'sample_exchange'
]

# Export to PDF options
"""
outline-depth: is a parameter which decides number of bookmarks
    to be created in exported PDF.
By default it's value will be 4.
quite: is a parameter to silence the wkhtmltopdf output messages,
    like warning, pages downloaded etc.
"""
EXPORT_TO_PDF_OPTIONS = {
    'margin-top': '1.5in',
    'margin-right': '0.0in',
    'margin-bottom': '1.5in',
    'margin-left': '0.0in',
    'encoding': "utf-8",
    'header-html': '',
    'header-spacing': '15.0',
    'footer-spacing': '15.0',
    'footer-html': '',
    'footer-center': '[page]',
    'custom-header': [
        ('Accept-Encoding', 'gzip')
    ],
    'enable-smart-shrinking': False,
    'load-error-handling': 'ignore',
    'outline-depth': 0,
    'quiet': ''
}

# Redis Configuration
REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_CACHE_TIMEOUT = 60 * 60 * 24

# Session timeout in seconds
PERMANENT_SESSION_LIFETIME = timedelta(hours=12)
SESSION_PERMANENT = False

# Sdemos Website
SDEMOS_WEBSITE_URL = 'http://localhost:5500'
# SINGLE PAGE APPLICATION TEMPLATES
SPA_TEMPLATES = ['default', 'box', 'grid']

# Chargify shared key
CHARGIFY_SHARED_KEY = 'gQghGMxlOIAy55dUimxie17JqkBocNZ64LK0d135RA'
CHARGIFY_PRODUCT_WHITELIST = []

# Box app settings
BOX_AUTH_REDIRECT_URL = 'http://localhost:8000/reroute-box-response/'
BOX_AUTH_URL = 'https://account.box.com/api/oauth2/authorize'
BOX_CLIENT_ID = 'vuc5iy0royl0rizg23m55dtc1r7zrf2q'
BOX_CLIENT_SECRET = 'tn9EqQoEgoxz1iKJVqePZpHrgBPKGjrG'
BOX_FILE_DOWNLOAD_API_URL = 'https://api.box.com/2.0/files/%s/content'
BOX_FOLDER_API_URL = 'https://api.box.com/2.0/folders/%s?fields=id,name,description,shared_link,item_collection'
BOX_TOKEN_API_URL = 'https://api.box.com/oauth2/token'
BOX_API_CACHE_TIMEOUT = 60 * 60

RECENT_TREND_BLACKLIST_TENANTS = (u'vmware', u'bmc')

WEASYPRINT_LOG = "/var/log/uwsgi/sharedemos/weasyprint.log"
PDFKIT_LOG = "/var/log/uwsgi/sharedemos/pdfkit.log"

# to revoke the access and refresh token
JWT_BLACKLIST_ENABLED = True
# Check all tokens (access and refresh) to see if they have been revoked.
# You can alternately check only the refresh tokens here, by setting this
# to 'refresh' instead of 'all'
JWT_BLACKLIST_TOKEN_CHECKS = 'all'
# JWT Digital Signature Algorithm
JWT_ALGORITHM = 'HS512'

JWT_TOKEN_LOCATION = ['headers']

# session configuration
SESSION_TYPE = 'redis'
SESSION_USE_SIGNER = True

# Validate URL REGEX
URL_REGEX = r'^(http[s]?)://([^/:]+\.[a-z]{2,10}|([0-9]{1,3}\.){3}[0-9]{1,3})(:[0-9]+)?(\/.*)?$'

BABEL_DEFAULT_LOCALE = 'en'

# Document Parser.
DOCUMENT_PARSER_USERNAME = 'sharedemos'
DOCUMENT_PARSER_PASSWORD = 'sT_Dt!&9sxF78aSX#Q'
DOCUMENT_PARSER_URL = 'http://10.223.208.112/parse_doc.php'
DOCUMENT_PARSER_STATUS_QUERY = 'http://10.223.208.112/status_query.php'

DOCUMENT_PARSER_SUCCESS_STATUS = ('PARSING_COMPLETE', 'IMPORT_COMPLETE')
DOCUMENT_PARSER_FAIL_STATUS = (
    'FAILED', 'IMPORT_FAILED', 'INITIATE_PARSER_FAILED',
    'PARSING_FAILED', 'UPLOADING_FAILED', 'IMAGES_SAVING_FAILED'
)

DOCUMENT_MIMETYPES = (
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip',
    'application/x-zip-compressed',
)

# PitchApp.
# 'SIMILARTY' has highest weightage compared to all the other parameters.
PITCH_WEIGHTAGES = {
    'SIMILARTY': 35, 'DURATION': 15, 'COVERAGE': 35, 'CLARITY': 15

}
# Proficiency scores.
PROFICIENCY = {
    "beginner": 35,
    "mid-level": 50,
    "professional": 75
}
PITCH_PASS_THRESHOLD = 35
PITCH_BASELINE_API_URL = ''
PITCH_COMPARISON_API_URL = ''
# These credentials are only for QA, STAGE envs.
# they are provided for nginx auth thru env variables.
AUTH_USER = ''
AUTH_PASSWORD = ''


# Recommendations.
RECOMMENDATIONS_ENGINE_VERSION = 'v2'
RECOMMENDATIONS_TESTING_FLAG = True
RECOMMENDATIONS_URL = 'http://162.242.218.37/api/bmc/emp/recommend'
RECOMMENDATIONS_USERNAME = 'regalix'
RECOMMENDATIONS_PASSWORD = 'rEG@L!X@047'

PYRAX_DOC_USERNAME = 'doc_parser_dev'
PYRAX_DOC_APIKEY = '1fd9e77fd8d94663b9e45698e26692c5'
RACKSPACE_DOC_CDN_CONTAINER = 'DocX-dev'
RACKSPACE_DOC_CDN_URL = 'http://691b7b09f8631379e306-4a38b03acdaa02fac868132afee84970.r12.cf5.rackcdn.com'

# Document Parser Style guide.
# The key in this style guide is dependent on the environment,
# but the value remains same across all the envs.
# New item to this dict can be added, but it should have
# a constant value across all diff envs.
# Styles related to this class are specified in 'document_styles.css'.
# [Dell: aphukh-style, BMC: jiubdc-style]
STYLE_GUIDE_CLASS = {
    'local-sdemos.dev.sharedemos.com:5000': 'aphukh-style',
    'bmc-local.dev.sharedemos.com:5000': 'jiubdc-style',
    'designeverest-local.sdemos.two.com:5050': 'spenden-style'
}

# TODO: Clean up multiple cdn flags
# CDN Settings
ASSET_CDN_ENABLED = True

OPENOFFICE_PORT = 8101
OPENOFFICE_HOST = 'localhost'

# Wistia configuration.
WISTIA_PROJECT_ID = 'fl8pd60pvl'

WISTIA_PRIVATE_UPLOAD_TOKEN = 'd2a7d10c1a3c81a4a36c1c0ef2918a0d4ff510235ae6163190d8a1c60389066f'
WISTIA_PRIVATE_READ_TOKEN = 'd965e351cfb7886048c01eb3669ca383d2a71194891b750172367496c6d7be67'

WISTIA_UPLOAD_URL = 'https://upload.wistia.com/'
WISTIA_GET_IFRAME_URL = 'http://fast.wistia.net/oembed?url=https://support.wistia.com/medias/'
WISTIA_ERROR_LOG = "/var/log/uwsgi/sharedemos/wistia-error.log"

# sharepoint integration
REPOSITORY_SERVICE_SECRET_KEY = '5i0w30DGNraA31OOu3gUo_OYsDWC9vRcFSWLxa8hy6I='
REPOSITORY_SERVICE_USERNAME = 'sharedemos'
REPOSITORY_SERVICE_PASSWORD = 'sT_Dt!&9sxF78aSX#Q'
REPOSITORY_SERVICE_REGISTER_URL = 'http://104.130.31.61/sp/register_tenant.php'
REPOSITORY_SERVICE_LISTING_URL = 'http://104.130.31.61/sp/list_structure_v1.php'
REPOSITORY_SERVICE_SYNC_URL = 'http://104.130.31.61/sp/sync_on_demand.php'

# allowed media type
ALLOWED_AUDIO_TYPES = (
    'audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/mp3')
ALLOWED_VIDEO_TYPES = ('video/mp4', 'video/webm', 'video/ogg')
ALLOWED_IMAGE_TYPES = (
    'image/jpeg', 'image/gif', 'image/jpg', 'image/tiff', 'image/png')
ALLOWED_DOCUMENT_TYPES = (
    "application/pdf", "application/zip", "application/msword",
    "application/x-zip-compressed", "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
)
