# Application debugging status
DEBUG = False

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://sdemos:sdemos@10.208.161.155:5432/sdemos_stage'
SQLALCHEMY_BINDS = {
    'reports': 'postgresql+psycopg2://sdemos:sdemos@10.208.161.155:5432/sdemos_reports'
}
# Media Folder Path
MEDIA_FOLDER = '/srv/media'

# Client Folder Path
CLIENT_FOLDER = '/srv/media/client'

# Tenant config folder
TENANT_CONFIG = '/srv/media/tenant_config'

# Project Environment
PROJECT_ENV = 'stage'

# Sitemap file location
SITEMAP_FOLDER = '/srv/seo'

# Html zip files location
HTML_ZIP_FOLDER = MEDIA_FOLDER + '/html5'

ADMINS = [('Avinash S D', 'avinash@regalix-inc.com'), ('Manoj M', 'mmanoj@regalix-inc.com')]

# Celery configuration
CELERY_BROKER_URL = 'amqp://sdemos:sdemos@10.208.161.155:5672/',

# Algolia api key
ALGOLIA_API_KEY = 'ef9d86bf35df3b6a5eb4e4c747228d97'

# Box app settings
BOX_AUTH_REDIRECT_URL = 'https://web-qa.sharedemos.com/reroute-box-response/'
BOX_CLIENT_ID = '0minjt0e0h66y72tiyzdv0trt55ceo1m'
BOX_CLIENT_SECRET = 'whrQAAFMQkogVWO7U8oZQ60GXBzVEy5A'

# CDN Settings
ASSET_CDN_URL = "https://cdn-stg.scdn8.secure.raxcdn.com"

# Wistia configuration.
WISTIA_PROJECT_ID = 'm8edavya6b'

# Document Parser.
RACKSPACE_DOC_CDN_CONTAINER = 'DocX-stage'
RACKSPACE_DOC_CDN_URL = 'https://e2dd6b527881becb506f-cf30a2d9c58d70fc2c495980a5d4b881.ssl.cf5.rackcdn.com'

STYLE_GUIDE_CLASS = {
    'testing.stg.sharedemos.com': 'aphukh-style',
    'dell.stg.sharedemos.com': 'aphukh-style',
    'test-bmc.stg.sharedemos.com': 'jiubdc-style',
    'designeverestuniversity.stg.sharedemos.com': 'spenden-style'
}

# Repository manager
REPOSITORY_SERVICE_REGISTER_URL = 'http://10.223.208.112/sp/register_tenant.php'
REPOSITORY_SERVICE_LISTING_URL = 'http://10.223.208.112/sp/list_structure_v1.php'
REPOSITORY_SERVICE_SYNC_URL = 'http://10.223.208.112/sp/sync_on_demand.php'
