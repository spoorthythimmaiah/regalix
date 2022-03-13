# Application debugging status
DEBUG = False

DB_HOST = "10.223.240.58"
BROKER_HOST = "10.208.224.190"
REDIS_HOST = "10.223.208.168"

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://sdemos:sdemos@{}:5432/sdemos_production'.format(
    DB_HOST)
SQLALCHEMY_BINDS = {
    'reports': 'postgresql+psycopg2://sdemos:sdemos@{}:5432/sdemos_reports'.format(DB_HOST)
}
# Celery configuration
CELERY_BROKER_URL = 'amqp://sdemos:sdemos@{}:5672/'.format(BROKER_HOST)

# End of life (Expiry) Scheduler Configuration
ASSET_EXPIRY_CMD = 'PROJ_ENV=bmc-production /opt/python/venv/sharedemos/bin/python /srv/sharedemos/manage.py disable-entity -job_id '

# Media Folder Path
MEDIA_FOLDER = '/srv/media'

# Client Folder Path
CLIENT_FOLDER = '/srv/media/client'

# Tenant config folder
TENANT_CONFIG = '/srv/media/tenant_config'

# Sitemap file location
SITEMAP_FOLDER = '/srv/seo'

# Html zip files location
HTML_ZIP_FOLDER = MEDIA_FOLDER + '/html5'

# Project Environment
PROJECT_ENV = 'production'

ADMINS = [
    ('Ravish Kamath', 'rkamath@regalix-inc.com'),
    ('Avinash S D', 'avinash@regalix-inc.com'),
    ('Manoj M', 'mmanoj@regalix-inc.com'),
    ('Pooja Mishra', 'pooja.mishra@regalix-inc.com')
]

# Sdemos Website
SDEMOS_WEBSITE_URL = 'https://www.sharedemos.com'

# Chargify shared key
CHARGIFY_SHARED_KEY = 'FBCrC1Q7w6Sx9r8hmrk5XTa2YeJNtHsY1v47kn5EI'
CHARGIFY_PRODUCT_WHITELIST = ['Basic Membership', '$1 Basic Membership Trial']


# Box app settings
BOX_AUTH_REDIRECT_URL = 'https://www.sharedemos.com/reroute-box-response/'
BOX_CLIENT_ID = 'yn0ayvkapxrs1jw2ll9h0c8nes0w0awd'
BOX_CLIENT_SECRET = 'fKRUzNpiGDzNL6DgfdtQnokccZBae5UN'


# session configuration
SESSION_COOKIE_SECURE = True

# CDN Settings
ASSET_CDN_ENABLED = False
ASSET_CDN_URL = "https://cdn-prod-bmc.scdn7.secure.raxcdn.com"

# Wistia configuration.
WISTIA_PROJECT_ID = 'zrnbvbgees'

# Document Parser.
RACKSPACE_DOC_CDN_CONTAINER = 'DocX-production'
RACKSPACE_DOC_CDN_URL = 'https://6364f9dfdc439472e880-738b3d8f931cb65a20ae1f4a4d8d7956.ssl.cf5.rackcdn.com'

# RTE Document style guide
STYLE_GUIDE_CLASS = {
    'helix.bmc.com': 'jiubdc-style',
    'bmc-prod.sharedemos.com': 'jiubdc-style'
}

# Repository manager
REPOSITORY_SERVICE_REGISTER_URL = 'http://10.223.208.112/sp/register_tenant.php'
REPOSITORY_SERVICE_LISTING_URL = 'http://10.223.208.112/sp/list_structure_v1.php'
REPOSITORY_SERVICE_SYNC_URL = 'http://10.223.208.112/sp/sync_on_demand.php'
