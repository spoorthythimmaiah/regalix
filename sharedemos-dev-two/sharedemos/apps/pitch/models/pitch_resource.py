"""Sharedemos Apps -PitchResource models."""

from datetime import datetime

from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db


class PitchResource(db.Model):
    """
    Pitch Resource table.

    'meta_data' stores info relevant to specific resource like
    'duration', 'size', etc, which are not common for all types
    """

    __tablename__ = 'pitch_resource'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode)
    resource_type = db.Column(db.Unicode, nullable=False)
    path = db.Column(db.Unicode, nullable=False)
    meta_data = db.Column(MutableDict.as_mutable(JSON), nullable=False)

    language_id = db.Column(db.Unicode,
                            db.ForeignKey('languages.id'),
                            nullable=False)
    tenant_id = db.Column(db.Integer,
                          db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
