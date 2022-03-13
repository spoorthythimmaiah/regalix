"""ExpiryJob table."""
from datetime import datetime

from sqlalchemy import UniqueConstraint

from sharedemos.models import db


class ExpiryJob(db.Model):
    """This table contains job records scheduled for expiry."""

    id = db.Column(db.Integer, primary_key=True)
    entity_type = db.Column(db.Unicode, nullable=False)
    entity_id = db.Column(db.Integer, nullable=False)
    expire_at = db.Column(db.DateTime, nullable=False)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    is_executed = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'),
                           nullable=False)
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'),
                            nullable=False)
    author_locale = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                              nullable=False)

    __table_args__ = (UniqueConstraint(
        'entity_type', 'entity_id', name='uq_entity_type_id'
    ),)

    def __unicode__(self):
        """Return Entity with expiry date."""
        return '{}_{}_{}'.format(
            self.entity_type,
            self.entity_id,
            self.expire_at
        )
