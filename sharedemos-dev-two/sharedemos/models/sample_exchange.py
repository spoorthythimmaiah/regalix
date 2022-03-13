from datetime import datetime
from sqlalchemy.dialects.postgresql import ARRAY

from sharedemos.models import db


class SampleExchange(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode)
    description = db.Column(db.Unicode)
    result_title = db.Column(db.Unicode)
    platform = db.Column(ARRAY(db.Unicode))
    tags = db.Column(ARRAY(db.Unicode))
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False, unique=True)
    tenant = db.relationship(
        "Tenant", backref=db.backref("sample_exchange", uselist=False))
