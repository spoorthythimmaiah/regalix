
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.models import db, I18nBase


class PinMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    display = db.Column(MutableDict.as_mutable(JSON), nullable=False)
    order = db.Column(db.Integer, nullable=False)

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


class Pin(PinMixin, I18nBase):

    __tablename__ = 'pin'

    slide_id = db.Column(db.Integer, db.ForeignKey('slide.id'), nullable=False)
    slide = db.relationship(
        "Slide",
        backref=db.backref(
            "pins",
            cascade="all, delete-orphan",
            order_by="Pin.order",
            viewonly=True
        )
    )


class DraftPin(PinMixin, I18nBase):

    __tablename__ = 'draft_pin'

    slide_id = db.Column(db.Integer,
                         db.ForeignKey('draft_slide.id'),
                         nullable=False)
    slide = db.relationship(
        "DraftSlide",
        backref=db.backref(
            "pins",
            cascade="all, delete-orphan",
            order_by="DraftPin.order",
            viewonly=True
        )
    )


class PinTranslationsMixin(object):

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


class PinTranslations(PinTranslationsMixin, db.Model):

    __tablename__ = 'pin_translations'

    pin_id = db.Column(db.Integer, db.ForeignKey('pin.id'), nullable=False)
    pin = db.relationship(
        "Pin",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


class DraftPinTranslations(PinTranslationsMixin, db.Model):

    __tablename__ = 'draft_pin_translations'

    pin_id = db.Column(db.Integer,
                       db.ForeignKey('draft_pin.id'),
                       nullable=False)
    pin = db.relationship(
        "DraftPin",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )
