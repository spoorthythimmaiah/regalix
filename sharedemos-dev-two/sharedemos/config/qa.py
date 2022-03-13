# Application debugging status
DEBUG = False

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_qa'
SQLALCHEMY_BINDS = {
    'reports': 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_reports'
}
# Media Folder Path
MEDIA_FOLDER = '/srv/media-qa'

# Client Folder Path
CLIENT_FOLDER = '/srv/media-qa/client'

# Tenant config folder
TENANT_CONFIG = '/srv/media-qa/tenant_config'

# Sitemap file location
SITEMAP_FOLDER = '/srv/seo'

# Html zip files location
HTML_ZIP_FOLDER = MEDIA_FOLDER + '/html5'

# Project Environment
PROJECT_ENV = 'qa'

ADMINS = [
    ('Avinash S D', 'avinash@regalix-inc.com'),
    ('Manoj M', 'mmanoj@regalix-inc.com'),
    ('Spoorthy T', 'spoorthy.thimmaiah@regalix-inc.com'),
    ('Devegowda Mallesh', 'devegowda.mallesh@regalix-inc.com'),
    ('Vishwanath G', 'vishwanath.gadiyappagoudra@regalix-inc.com')
]

# Sdemos Website
SDEMOS_WEBSITE_URL = 'http://web-qa.sharedemos.com'

# Algolia api key
ALGOLIA_API_KEY = '15cff0bc2345568c54a2b204878289e9'

# Box app settings
BOX_AUTH_REDIRECT_URL = 'https://web-qa.sharedemos.com/reroute-box-response/'
BOX_CLIENT_ID = 'z35ht9cbgiexxqmwcgpas8o1mudyiouz'
BOX_CLIENT_SECRET = 'UFvfXxTSXdqq2ZqehQeN3ljW5HLZuCJL'

# CDN Settings
ASSET_CDN_URL = "https://cdn-qa.scdn2.secure.raxcdn.com"

# Wistia configuration.
WISTIA_PROJECT_ID = 'kt44aic1j4'

# Document Parser.
RACKSPACE_DOC_CDN_CONTAINER = 'DocX-qa'
RACKSPACE_DOC_CDN_URL = 'https://4488509c28331e5c8000-9601b68ea891028ce61c6cb96675c1a1.ssl.cf5.rackcdn.com'

STYLE_GUIDE_CLASS = {
    'regalix.qa.sharedemos.com': 'aphukh-style',
    'dell.qa.sharedemos.com': 'aphukh-style',
    'helixbmc.qa.sharedemos.com': 'jiubdc-style',
    'designeverestuniversity.qa.sharedemos.com': 'spenden-style'
}

# PitchApp.
PITCH_BASELINE_API_URL = 'http://162.242.237.128:5000/api/v1/baseline'
PITCH_COMPARISON_API_URL = 'http://162.242.237.128:5000/api/v1/compare'

# Repository manager
REPOSITORY_SERVICE_REGISTER_URL = 'http://10.223.208.112/sp/register_tenant.php'
REPOSITORY_SERVICE_LISTING_URL = 'http://10.223.208.112/sp/list_structure_v1.php'
REPOSITORY_SERVICE_SYNC_URL = 'http://10.223.208.112/sp/sync_on_demand.php'
