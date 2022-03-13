from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import db, I18nBase


def change_slide_order(target, after, walkthrough):
    if not walkthrough:
        raise SharedemosException(404)

    children = [ch for ch in walkthrough.slides if not ch.is_deleted]

    changed_items = list()
    items_after_swap = dict()
    selection_started = False
    target_slide = after_slide = None

    target = int(target)
    # If item is moved to top
    if not after:
        selection_started = True
    else:
        after = int(after)

    # Select list of items changed from original order
    for child in children:
        if child.order in [target, after]:
            if child.order == target:
                target_slide = child
            elif child.order == after:
                after_slide = child

            changed_items.append(child)
            if selection_started:
                break
            selection_started = True
        elif len(changed_items) or selection_started:
            # If list already has items selected
            changed_items.append(child)

    if after_slide:
        if target_slide.order > after_slide.order:
            # "pull up"
            changed_items = changed_items[1:]
            changed_items.insert(0, changed_items.pop())
        else:
            # "push down"
            changed_items.insert(len(changed_items), changed_items.pop(0))
            changed_items.reverse()

    # change/swap the orders
    # changed items slug and new order pairs
    for index, item in enumerate(changed_items):
        next_index = index + 1
        if next_index >= len(changed_items):
            next_index = 0
        items_after_swap[item.order] = changed_items[next_index].order

    for child in children:
        child.order = items_after_swap.get(child.order, child.order)


class SlideMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def primary_resource_id(cls):
        return db.Column(db.Integer, db.ForeignKey('resource.id'))

    @declared_attr
    def primary_resource(cls):
        return db.relationship(
            "Resource",
            backref=db.backref(
                cls.__tablename__ + "_primary_resource",
                uselist=False,
                cascade="all, delete-orphan"
            ),
            primaryjoin="%s.primary_resource_id==Resource.id" % (cls.__name__)
        )

    @declared_attr
    def secondary_resource_id(cls):
        return db.Column(db.Integer, db.ForeignKey('resource.id'))

    @declared_attr
    def secondary_resource(cls):
        return db.relationship(
            "Resource",
            backref=db.backref(
                cls.__tablename__ + "_secondary_resource",
                uselist=False,
                cascade="all, delete-orphan"
            ),
            primaryjoin="%s.secondary_resource_id==Resource.id" % (
                cls.__name__)
        )

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

    def __unicode__(self):
        for sl in self.translations:
            if sl.language_id == self.tenant.default_locale_id:
                return unicode(sl.name).encode('utf-8')
        return ''

    def __repr__(self):
        return self.__unicode__()


class Slide(SlideMixin, I18nBase):

    __tablename__ = 'slide'

    walkthrough_id = db.Column(db.Integer,
                               db.ForeignKey('walkthrough.id'),
                               nullable=False)
    walkthrough = db.relationship(
        "Walkthrough",
        backref=db.backref(
            "slides",
            cascade="all, delete-orphan",
            order_by=lambda: Slide.order)
    )
    messages = db.relationship(
        "Message", backref=db.backref(
            "slide",
            cascade="all, delete-orphan",
            single_parent=True
        ),
        primaryjoin="and_(Message.slide_id==Slide.id, Message.is_deleted=='false')",
        order_by="Message.modified_at")

    @hybrid_method
    def is_locale_available(self, locale):

        for translation in self.translations:
            if translation.language_id == locale:
                return True

        return False


class DraftSlide(SlideMixin, I18nBase):

    __tablename__ = 'draft_slide'

    walkthrough_id = db.Column(db.Integer,
                               db.ForeignKey('draft_walkthrough.id'),
                               nullable=False)
    walkthrough = db.relationship(
        "DraftWalkthrough",
        backref=db.backref(
            "slides",
            cascade="all, delete-orphan",
            order_by=lambda: DraftSlide.order
        )
    )


class SlideTranslationsMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    notes = db.Column(JSON(none_as_null=True))

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


class SlideTranslations(SlideTranslationsMixin, db.Model):

    __tablename__ = 'slide_translations'

    slide_id = db.Column(db.Integer, db.ForeignKey('slide.id'), nullable=False)
    slide = db.relationship(
        "Slide",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan"
        )
    )


class DraftSlideTranslations(SlideTranslationsMixin, db.Model):

    __tablename__ = 'draft_slide_translations'

    slide_id = db.Column(db.Integer,
                         db.ForeignKey('draft_slide.id'),
                         nullable=False)
    slide = db.relationship(
        "DraftSlide",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan"
        )
    )
