"""Sharedemos Apps -Pitch models."""

from datetime import datetime

from sqlalchemy import UniqueConstraint
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db, I18nBase

from sharedemos.apps.pitch.models.pitch_section import (
    DraftPitchSection,
    DraftPitchSectionTranslations,
    PitchSection,
    PitchSectionTranslations
)


draft_association_table = db.Table(
    'draft_pitch_user_groups_association',
    db.metadata,
    db.Column('draft_pitch_id', db.Integer, db.ForeignKey('draft_pitch.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('draft_pitch_id', 'user_groups_id'),
)

association_table = db.Table(
    'pitch_user_groups_association',
    db.metadata,
    db.Column('pitch_id', db.Integer, db.ForeignKey('pitch.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('pitch_id', 'user_groups_id'),
)


class DraftPitchRelatedAssetAssociation(db.Model):
    """Association table to store Draft Pitch id + chapter id."""

    __tablename__ = 'draft_pitch_related_asset_association'

    draft_pitch_id = db.Column(db.Integer, db.ForeignKey('draft_pitch.id'), primary_key=True)
    chapter_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'), primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    chapter = db.relationship("Walkthrough")
    draft_pitch = db.relationship("DraftPitch")


class PitchRelatedAssetAssociation(db.Model):
    """Association table to store Pitch id + chapter id."""

    __tablename__ = 'pitch_related_asset_association'

    pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'), primary_key=True)
    chapter_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'), primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    chapter = db.relationship("Walkthrough")
    pitch = db.relationship("Pitch")


class PitchMixin(object):
    """
    Base class for DraftPitch and Pitch.

    Contains common columns, fkeys.
    """

    id = db.Column(db.Integer, primary_key=True)
    uuid = db.Column(db.Unicode, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
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


class DraftPitch(PitchMixin, I18nBase):
    """Draft Pitch table."""

    __tablename__ = 'draft_pitch'

    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    latest_pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'))  # Stores the latest published pitch id.
    latest_pitch = db.relationship("Pitch", foreign_keys=[latest_pitch_id])

    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=draft_association_table,
        backref="draft_pitches",
        order_by="UserGroup.name"
    )
    related_assets = db.relationship(
        "DraftPitchRelatedAssetAssociation", back_populates="draft_pitch"
    )

    @hybrid_method
    def sections_query(self, is_deleted=False):
        """
        Return section_query object.

        Prepare pitch_section query by joining translations
        and fetching sections associated with the DraftPitch.
        """
        return DraftPitchSection.query.join(
            DraftPitchSectionTranslations
        ).filter(
            DraftPitchSection.pitch_id == self.id,
            DraftPitchSection.is_deleted.__eq__(is_deleted)
        )

    __table_args__ = (
        UniqueConstraint(
            'tenant_id', 'uuid', name='uq_draft_pitch_tenant_id'
        ),
    )


class Pitch(PitchMixin, I18nBase):
    """Pitch table."""

    __tablename__ = 'pitch'

    version = db.Column(db.Integer, nullable=False, default=0)
    draft_id = db.Column(db.Integer,
                         db.ForeignKey('draft_pitch.id'),
                         nullable=False)

    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=association_table,
        backref="pitches",
        order_by="UserGroup.name"
    )
    related_assets = db.relationship(
        "PitchRelatedAssetAssociation", back_populates="pitch"
    )

    draft = db.relationship("DraftPitch",
                            backref=db.backref("published"),
                            foreign_keys=[draft_id])

    @hybrid_method
    def has_groups(self):
        """Return True is the model has group info, else False."""
        return bool(self.restricted_to_groups)

    @hybrid_method
    def is_restricted_to_groups(self, user_groups):
        """
        Check whether the pitch is restricted to the 'user_groups'.

        param:
            user_groups - List containing SqlAlchmey UserGroup objects.
        Return True, if the model is restricted to the given 'user_groups'.
        Return False,
            if the model has no groups info,
            or if the model is not restricted to given 'user_groups'.
        """
        self_groups = self.restricted_to_groups
        if any(grp in user_groups for grp in self_groups):
            return True

        return False

    @hybrid_method
    def sections_query(self, is_deleted=False):
        """
        Return section_query object.

        Prepare pitch_section query by joining translations
        and fetching sections associated with the Pitch.
        """
        return PitchSection.query.join(
            PitchSectionTranslations
        ).filter(
            PitchSection.pitch_id == self.id,
            PitchSection.is_deleted.__eq__(is_deleted)
        )


class PitchTranslationMixin(object):
    """Base class for Pitch translations."""

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    tags = db.Column(JSON(none_as_null=True))
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer,
                         db.ForeignKey('icon_library.id'),
                         default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary", single_parent=True, uselist=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode,
                         db.ForeignKey('languages.id'),
                         nullable=False)

    def __unicode__(self):
        """Pitch unicode."""
        return unicode(self.title).encode('utf-8')

    def __repr__(self):
        """Pitch representaion."""
        return self.__unicode__()


class DraftPitchTranslations(PitchTranslationMixin, db.Model):
    """Draft Pitch translations table."""

    __tablename__ = 'draft_pitch_translations'

    pitch_id = db.Column(db.Integer,
                         db.ForeignKey('draft_pitch.id'),
                         nullable=False)
    pitch = db.relationship("DraftPitch",
                            backref=db.backref("translations",
                                               cascade="all, delete-orphan",
                                               viewonly=True)
                            )
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)


class PitchTranslations(PitchTranslationMixin, db.Model):
    """Pitch translations table."""

    __tablename__ = 'pitch_translations'

    pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'), nullable=False)
    pitch = db.relationship("Pitch",
                            backref=db.backref("translations",
                                               cascade="all, delete-orphan",
                                               viewonly=True)
                            )
