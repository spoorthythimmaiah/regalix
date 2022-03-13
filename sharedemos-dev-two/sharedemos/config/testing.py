# Application debugging status
DEBUG = True

# Application testing status
TESTING = True

# Mailer Configuration
EMAIL_HOST = '127.0.0.1'
EMAIL_PORT = 1025

EMAIL_USE_TLS = False
EMAIL_USE_SSL = False

# Application secret key
SECRET_KEY = "\xef4\x88\xa5<\x81\x89n\xe1\x1d'|\xff\xa0\xea\x95\xacd\xb5k\xac$g\xc9"

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_testing'
SQLALCHEMY_BINDS = {
    'reports': 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_test_reports'
}

# Project Environment
PROJECT_ENV = 'testing'

# Enable Maxmind-GeoIP2 query
MAXMIND_ENABLED = False

# Disable CSRF Protection
WTF_CSRF_ENABLED = False

DEFAULT_LOCALE = 'en_US'

WEASYPRINT_LOG = "weasyprint.log"
