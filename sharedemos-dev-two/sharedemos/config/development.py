# Application debugging status
DEBUG = True

# Application secret key
SECRET_KEY = '\x91\xf7\x15G\x15\xe6^X\xf5\xa90>\xd5!<&xk\x85\x0b\x05\xd9\xbb\xc4'

# Database configuration
SQLALCHEMY_DATABASE_URI = 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_dev'
SQLALCHEMY_BINDS = {
    'reports': 'postgresql+psycopg2://sdemos:sdemos@127.0.0.1:5432/sdemos_reports'
}
# SQLALCHEMY_ECHO = True

# End of life (Expiry) Scheduler Configuration
ASSET_EXPIRY_CMD = 'PROJ_ENV={} /opt/python/venv/sdemos/bin/python /docker/manage.py disable-entity -job_id '
CRON_USER = 'root'
EXPIRY_SCHEDULER_LOG = "expiry_scheduler.log"

# Project Environment
PROJECT_ENV = 'development'

# Enable Maxmind-GeoIP2 query
MAXMIND_ENABLED = False

# Celery mailer configuration
CELERY_SEND_TASK_ERROR_EMAILS = False

# Algolia api key
ALGOLIA_API_KEY = 'e077a1171c6d34a5c8cf45939914a968'

# Spreadsheet Key
USAGE_REPORT_SPREADSHEET_KEY = '11rUbC571dLBeiwBQOcAgAWNq5HDSbscrHE3vMqj1I54'

PDFKIT_LOG = "pdfkit.log"
WEASYPRINT_LOG = "weasyprint.log"

# CDN Settings
ASSET_CDN_ENABLED = False

# Document parser
DOCUMENT_PARSER_URL = 'http://104.130.31.61/parse_doc.php'
DOCUMENT_PARSER_STATUS_QUERY = 'http://104.130.31.61/status_query.php'
