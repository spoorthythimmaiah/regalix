from flask import current_app
from sharedemos.libs.core import create_celery_app

celery = create_celery_app(current_app)
