from datetime import datetime

from flask import current_app
from sqlalchemy import event
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.dialects.postgresql import JSON
from sharedemos.libs.model import model_slugify, slugify
from sharedemos.models import (
    db,
    I18nBase,
    ExpiryBase,
    SlugRevision,
    Tenant
)

draft_journey_association_table = db.Table(
    'draft_journey_user_group_association',
    db.metadata,
    db.Column('journey_id', db.Integer, db.ForeignKey('draft_journeys.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('journey_id', 'user_groups_id'),
)
journey_association_table = db.Table(
    'journey_user_group_association',
    db.metadata,
    db.Column('journey_id', db.Integer, db.ForeignKey('journeys.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('journey_id', 'user_groups_id'),
)


def update_journey_slug(mapper, connection, target):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_journey_slug(mapper, connection, target)

        # Don't create/update journey revision data if slug is unchanged
        if not new_slug or new_slug == target.journey.slug:
            return

        # Log journey revision details
        tenant_id = target.journey.tenant_id
        entity_type = u'draft_journeys'
        if target.__tablename__ == 'journey_translations':
            entity_type = u'journeys'
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == entity_type) &
            (SlugRevision.entity_id == target.journey.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.journey.slug,
            new_slug=new_slug,
            entity_type=entity_type,
            entity_id=target.journey.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.journey.slug) &
                  (revision_table.c.entity_type == entity_type) &
                  (revision_table.c.entity_id == target.journey.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_journey_slug(mapper, connection, target):
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    if target.language_id == tenant.default_locale_id:
        if target.__tablename__ == 'draft_journey_translations':
            new_slug = slugify(
                target.name,
                target.journey_id,
                DraftJourney,
                tenant_id
            )
            journey_table = DraftJourney.__table__
        else:
            new_slug = model_slugify(
                target.name,
                target.journey_id,
                tenant_id,
                Journey,
                DraftJourney
            )
            journey_table = Journey.__table__
        connection.execute(
            journey_table.update().
            where(journey_table.c.id == target.journey_id).
            values(slug=new_slug)
        )

        return new_slug


class JourneyMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.Unicode)
    order = db.Column(db.Integer, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    tags = db.Column(JSON(none_as_null=True))
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow,
                            onupdate=datetime.utcnow, nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def cta_id(cls):
        return db.Column(db.Integer, db.ForeignKey('lead_cta_form.id'))

    @declared_attr
    def cta(cls):
        return db.relationship("LeadCTAForm", uselist=False)

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')


class DraftJourney(JourneyMixin, I18nBase, ExpiryBase):

    __tablename__ = 'draft_journeys'

    assets = db.relationship(
        "DraftJourneyAsset",
        backref="draft_journeys",
        order_by="DraftJourneyAsset.order",
        cascade="all,delete"
    )
    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=draft_journey_association_table,
        backref="draft_journeys",
        order_by="UserGroup.id"
    )


class Journey(JourneyMixin, I18nBase):

    __tablename__ = 'journeys'

    draft_id = db.Column(db.Integer, db.ForeignKey('draft_journeys.id'),
                         nullable=False)
    assets = db.relationship(
        "JourneyAsset",
        backref="journey",
        order_by="JourneyAsset.order",
        cascade="all,delete"
    )
    draft = db.relationship(
        "DraftJourney",
        backref=db.backref("published", uselist=False),
        foreign_keys=[draft_id]
    )
    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=journey_association_table,
        backref="journeys",
        order_by="UserGroup.name"
    )


class JourneyTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow,
                            onupdate=datetime.utcnow, nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'))

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary")


class DraftJourneyTranslations(JourneyTranslationMixin, db.Model):

    __tablename__ = 'draft_journey_translations'

    journey_id = db.Column(
        db.Integer,
        db.ForeignKey('draft_journeys.id'),
        nullable=False
    )
    journey = db.relationship(
        "DraftJourney",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


class JourneyTranslations(JourneyTranslationMixin, db.Model):

    __tablename__ = 'journey_translations'

    journey_id = db.Column(
        db.Integer,
        db.ForeignKey('journeys.id'),
        nullable=False
    )
    journey = db.relationship(
        "Journey",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


class JourneyAssetMixin(object):
    id = db.Column(db.Integer, primary_key=True)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    asset_type = db.Column(db.Unicode, nullable=False)
    asset_id = db.Column(db.Integer, nullable=False)
    order = db.Column(db.Integer, nullable=False)

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)


class DraftJourneyAsset(JourneyAssetMixin, db.Model):

    __tablename__ = 'draft_journey_assets'

    journey_id = db.Column(db.Integer, db.ForeignKey('draft_journeys.id'),
                           nullable=False)


class JourneyAsset(JourneyAssetMixin, db.Model):

    __tablename__ = 'journey_assets'

    journey_id = db.Column(db.Integer, db.ForeignKey('journeys.id'),
                           nullable=False)


event.listen(DraftJourneyTranslations, 'after_insert', create_journey_slug)
event.listen(DraftJourneyTranslations, 'after_update', update_journey_slug)
event.listen(JourneyTranslations, 'after_insert', create_journey_slug)
event.listen(JourneyTranslations, 'after_update', update_journey_slug)
