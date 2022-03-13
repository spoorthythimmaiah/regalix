from datetime import datetime
from sharedemos.models import db


class Downloads(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(
        db.Integer,
        db.ForeignKey('tenant.id'),
        nullable=False
    )

    # user id(session specific user)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey('user_activity.id'),
        nullable=False
    )

    # language if (session specific locale).
    language_id = db.Column(
        db.Unicode,
        db.ForeignKey('languages.id'),
        nullable=False
    )

    # Type of download(SAMPLE, PATHFINDER, QUIZ, etc.,)
    entity_type = db.Column(db.Unicode, nullable=False)

    # sample id, pathfinder group id, quiz group id, etc.,)
    entity_id = db.Column(db.Integer, nullable=False)

    # sample name, pathfinder group name, quiz group name, etc.,)
    entity_name = db.Column(db.Unicode, nullable=False)

    # Downloaded url(optional)
    url = db.Column(db.Unicode)

    # Time of download
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )
