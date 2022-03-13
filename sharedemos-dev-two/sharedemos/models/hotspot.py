
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.models import db, I18nBase


class HotspotMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    display = db.Column(MutableDict.as_mutable(JSON), nullable=False)
    action = db.Column(MutableDict.as_mutable(JSON), nullable=False)
    hotspot_type = db.Column(db.Unicode, nullable=False)

    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer,
                         db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + "s")

    @hybrid_method
    def languages_available(self):
        return [t.language_id for t in self.translations]


class Hotspot(HotspotMixin, I18nBase):

    __tablename__ = 'hotspot'

    slide_id = db.Column(db.Integer, db.ForeignKey('slide.id'), nullable=False)
    slide = db.relationship(
        "Slide",
        backref=db.backref(
            "hotspots",
            cascade="all, delete-orphan",
            order_by="Hotspot.id",
            viewonly=True
        )
    )


class DraftHotspot(HotspotMixin, I18nBase):

    __tablename__ = 'draft_hotspot'

    slide_id = db.Column(db.Integer,
                         db.ForeignKey('draft_slide.id'),
                         nullable=False)
    slide = db.relationship(
        "DraftSlide",
        backref=db.backref(
            "hotspots",
            cascade="all, delete-orphan",
            order_by="DraftHotspot.id",
            viewonly=True
        )
    )


class HotspotTranslationsMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    callout = db.Column(MutableDict.as_mutable(JSON))
    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode,
                         db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")


class HotspotTranslations(HotspotTranslationsMixin, db.Model):

    __tablename__ = 'hotspot_translations'

    hotspot_id = db.Column(db.Integer,
                           db.ForeignKey('hotspot.id'),
                           nullable=False)
    hotspot = db.relationship(
        "Hotspot",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


class DraftHotspotTranslations(HotspotTranslationsMixin, db.Model):

    __tablename__ = 'draft_hotspot_translations'

    hotspot_id = db.Column(db.Integer,
                           db.ForeignKey('draft_hotspot.id'),
                           nullable=False)
    hotspot = db.relationship(
        "DraftHotspot",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )
