"""Sharedemos Apps -PitchRecording models."""

from datetime import datetime

from sharedemos.models import db


class PitchRecording(db.Model):
    """Pitch Recording table."""

    __tablename__ = 'pitch_recording'

    id = db.Column(db.Integer, primary_key=True)

    section_trans_id = db.Column(
        db.Integer, db.ForeignKey('pitch_section_translations.id'),
        nullable=False
    )

    resource_id = db.Column(db.Integer,
                            db.ForeignKey('pitch_resource.id'),
                            nullable=False)
    submitted_by = db.Column(db.Integer,
                             db.ForeignKey('users.id'),
                             nullable=False)
    tenant_id = db.Column(db.Integer,
                          db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    section_translation = db.relationship(
        "PitchSectionTranslations",
        backref=db.backref("recordings"),
        order_by="PitchRecording.created_at"
    )
    resource = db.relationship("PitchResource")
