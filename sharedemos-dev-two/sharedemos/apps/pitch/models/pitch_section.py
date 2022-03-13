"""Sharedemos Apps -PitchSection models."""

from datetime import datetime

from sqlalchemy import UniqueConstraint
from sqlalchemy.ext.declarative import declared_attr

from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db, I18nBase


class PitchSectionMixin(object):
    """Base class for Pitch Section."""

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.Unicode, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    base_score = db.Column(db.Integer, nullable=False)
    max_attempts = db.Column(db.Integer)
    time_limit = db.Column(db.Integer)      # in seconds.
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer,
                         db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant")


class DraftPitchSection(PitchSectionMixin, I18nBase):
    """Draft Pitch Section table."""

    __tablename__ = 'draft_pitch_section'

    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    pitch_id = db.Column(db.Integer, db.ForeignKey('draft_pitch.id'),
                         nullable=False)
    pitch = db.relationship('DraftPitch')

    __table_args__ = (
        UniqueConstraint(
            'tenant_id', 'uuid', name='uq_draft_pitch_section_tenant_id'
        ),
    )


class PitchSection(PitchSectionMixin, I18nBase):
    """Pitch Section table."""

    __tablename__ = 'pitch_section'

    draft_id = db.Column(db.Integer,
                         db.ForeignKey('draft_pitch_section.id'),
                         nullable=False)
    draft = db.relationship("DraftPitchSection",
                            backref=db.backref("published"),
                            foreign_keys=[draft_id])

    pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'),
                         nullable=False)
    pitch = db.relationship('Pitch')


class PitchSectionTranslationsMixin(object):
    """Base class for Pitch Section translations."""

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    keywords = db.Column(JSON(none_as_null=True))
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def base_pitch_resource_id(cls):
        return db.Column(db.Integer, db.ForeignKey('pitch_resource.id'))

    @declared_attr
    def base_pitch_resource(cls):
        return db.relationship("PitchResource")

    def __unicode__(self):
        """Pitch Section unicode."""
        return unicode(self.title).encode('utf-8')

    def __repr__(self):
        """Pitch Section representaion."""
        return self.__unicode__()


class DraftPitchSectionTranslations(PitchSectionTranslationsMixin, db.Model):
    """Draft Pitch Section translations table."""

    __tablename__ = 'draft_pitch_section_translations'

    section_id = db.Column(db.Integer,
                           db.ForeignKey('draft_pitch_section.id'),
                           nullable=False)
    section = db.relationship("DraftPitchSection",
                              backref=db.backref("translations",
                                                 cascade="all, delete-orphan",
                                                 viewonly=True)
                              )
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)


class PitchSectionTranslations(PitchSectionTranslationsMixin, db.Model):
    """Pitch Section translations table."""

    __tablename__ = 'pitch_section_translations'

    section_id = db.Column(db.Integer,
                           db.ForeignKey("pitch_section.id"),
                           nullable=False)
    section = db.relationship("PitchSection",
                              backref=db.backref("translations",
                                                 cascade="all, delete-orphan",
                                                 viewonly=True)
                              )
