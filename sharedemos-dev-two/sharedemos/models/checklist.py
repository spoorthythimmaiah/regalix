from sqlalchemy import event, UniqueConstraint
from sqlalchemy.orm import backref
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.models import db, SlugRevision, Tenant
from sharedemos.libs.model import slugify


def create_checklist_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.checklist.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.title, target.checklist_id, Checklist, target.checklist.tenant_id)
        checklist_table = Checklist.__table__
        connection.execute(
            checklist_table.update().
            where(checklist_table.c.id == target.checklist_id).
            values(slug=new_slug)
        )

        return new_slug


def update_checklist_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.checklist.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_checklist_slug(mapper, connection, target)

        # Don't create/update checklist revision data if slug is unchanged
        if not new_slug or new_slug == target.checklist.slug:
            return

        # Log checklist revision details
        tenant_id = target.checklist.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("checklist")) &
            (SlugRevision.entity_id == target.checklist.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.checklist.slug,
            new_slug=new_slug,
            entity_type=unicode("checklist"),
            entity_id=target.checklist.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.checklist.slug) &
                  (revision_table.c.entity_type == u"checklist") &
                  (revision_table.c.entity_id == target.checklist.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_checklist_draft_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.checklist_draft.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.title, target.checklist_draft_id, ChecklistDraft, target.checklist_draft.tenant_id)
        checklist_table = ChecklistDraft.__table__
        connection.execute(
            checklist_table.update().
            where(checklist_table.c.id == target.checklist_draft_id).
            values(slug=new_slug)
        )
        return new_slug


def update_checklist_draft_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.checklist_draft.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_checklist_draft_slug(mapper, connection, target)

        # Don't create/update draft checklist revision data if slug is unchanged
        if not new_slug or new_slug == target.checklist_draft.slug:
            return

        # Log draft checklist revision details
        tenant_id = target.checklist_draft.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("checklist_draft")) &
            (SlugRevision.entity_id == target.checklist_draft.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()
        connection.execute(
            revision_table.insert(),
            old_slug=target.checklist_draft.slug,
            new_slug=new_slug,
            entity_type=unicode("checklist_draft"),
            entity_id=target.checklist_draft.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.checklist_draft.slug) &
                  (revision_table.c.entity_type == u"checklist_draft") &
                  (revision_table.c.entity_id == target.checklist_draft.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


class ChecklistMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    slug = db.Column(db.Unicode)

    is_featured = db.Column(db.Boolean, default=False, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class Checklist(ChecklistMixin, db.Model):

    __tablename__ = 'checklist'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft.id'), nullable=False, default=None)
    draft = db.relationship("ChecklistDraft", backref=db.backref("published", uselist=False), foreign_keys=[draft_id])

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug', name='uq_checklist_tenant_id_slug'),
    )

    @hybrid_method
    def is_locale_available(self, locale):
        for translation in self.translations:
            if translation.language_id == locale:
                return True
        return False


class ChecklistDraft(ChecklistMixin, db.Model):

    __tablename__ = 'checklist_draft'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug', name='uq_checklist_draft_tenant_id_slug'),
    )


class ChecklistTranslationMixin(object):

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'), nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'), nullable=True, default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class ChecklistTranslation(ChecklistTranslationMixin, db.Model):

    __tablename__ = 'checklist_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_id = db.Column(db.Integer, db.ForeignKey('checklist.id'), nullable=False)
    checklist = db.relationship("Checklist", backref='translations')


class ChecklistDraftTranslation(ChecklistTranslationMixin, db.Model):

    __tablename__ = 'checklist_draft_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft.id'), nullable=False)
    checklist_draft = db.relationship("ChecklistDraft", backref='translations')


class ChecklistSectionMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class ChecklistSection(ChecklistSectionMixin, db.Model):

    __tablename__ = 'checklist_section'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_section.id'), nullable=False, default=None)
    draft = db.relationship("ChecklistDraftSection", backref=db.backref("published", uselist=False), foreign_keys=[draft_id])

    checklist_id = db.Column(db.Integer, db.ForeignKey('checklist.id'))
    checklist = db.relationship("Checklist", backref=backref('checklist_sections', order_by='ChecklistSection.order'))


class ChecklistDraftSection(ChecklistSectionMixin, db.Model):

    __tablename__ = 'checklist_draft_section'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    checklist_draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft.id'))
    checklist_draft = db.relationship("ChecklistDraft", backref=backref('checklist_sections', order_by='ChecklistDraftSection.order'))


class ChecklistSectionTranslationMixin(object):

    title = db.Column(db.Unicode, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'), nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class ChecklistSectionTranslation(ChecklistSectionTranslationMixin, db.Model):

    __tablename__ = 'checklist_section_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_section_id = db.Column(db.Integer, db.ForeignKey('checklist_section.id'), nullable=False)
    checklist_section = db.relationship("ChecklistSection", backref='translations')


class ChecklistDraftSectionTranslation(ChecklistSectionTranslationMixin, db.Model):

    __tablename__ = 'checklist_draft_section_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_draft_section_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_section.id'), nullable=False)
    checklist_draft_section = db.relationship("ChecklistDraftSection", backref='translations')


class ChecklistItemMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class ChecklistItem(ChecklistItemMixin, db.Model):

    __tablename__ = 'checklist_item'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_item.id'), nullable=False, default=None)
    draft = db.relationship("ChecklistDraftItem", backref=db.backref("published", uselist=False), foreign_keys=[draft_id])

    checklist_section_id = db.Column(db.Integer, db.ForeignKey('checklist_section.id'), nullable=False)
    checklist_section = db.relationship("ChecklistSection", backref=backref('checklist_items', order_by='ChecklistItem.order'))


class ChecklistDraftItem(ChecklistItemMixin, db.Model):

    __tablename__ = 'checklist_draft_item'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    checklist_draft_section_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_section.id'), nullable=False)
    checklist_draft_section = db.relationship("ChecklistDraftSection", backref=backref('checklist_items', order_by='ChecklistDraftItem.order'))


class ChecklistItemTranslationsMixin(object):

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'), nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class ChecklistItemTranslation(ChecklistItemTranslationsMixin, db.Model):

    __tablename__ = 'checklist_item_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_item_id = db.Column(db.Integer, db.ForeignKey('checklist_item.id'), nullable=False)
    checklist_item = db.relationship("ChecklistItem", backref='translations')


class ChecklistDraftItemTranslation(ChecklistItemTranslationsMixin, db.Model):

    __tablename__ = 'checklist_draft_item_translation'

    id = db.Column(db.Integer, primary_key=True)

    checklist_draft_item_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_item.id'), nullable=False)
    checklist_draft_item = db.relationship("ChecklistDraftItem", backref='translations')


class ChecklistSuggestionMixin(object):

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    order = db.Column(db.Integer, nullable=False, default=1)

    external_link = db.Column(MutableDict.as_mutable(JSON))

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')

    @declared_attr
    def walkthrough_id(cls):
        return db.Column(db.Integer, db.ForeignKey('walkthrough.id'))

    @declared_attr
    def walkthrough(cls):
        return db.relationship("Walkthrough", backref=db.backref(cls.__tablename__ + 's'))

    def __unicode__(self):
        if self.walkthrough:
            return "Walkthrough"
        else:
            return "External Link"

    def __repr__(self):
        return self.__unicode__()


class ChecklistSuggestion(ChecklistSuggestionMixin, db.Model):

    __tablename__ = 'checklist_suggestion'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_suggestion.id'), nullable=False, default=None)
    draft = db.relationship("ChecklistDraftSuggestion", backref=db.backref("published", uselist=False), foreign_keys=[draft_id])

    checklist_item_id = db.Column(db.Integer, db.ForeignKey('checklist_item.id'), nullable=False)
    checklist_item = db.relationship("ChecklistItem", backref='checklist_suggestions')


class ChecklistDraftSuggestion(ChecklistSuggestionMixin, db.Model):

    __tablename__ = 'checklist_draft_suggestion'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    checklist_draft_item_id = db.Column(db.Integer, db.ForeignKey('checklist_draft_item.id'), nullable=False)
    checklist_draft_item = db.relationship("ChecklistDraftItem", backref='checklist_suggestions')


event.listen(ChecklistTranslation, 'after_insert', create_checklist_slug)
event.listen(ChecklistTranslation, 'after_update', update_checklist_slug)
event.listen(ChecklistDraftTranslation, 'after_insert', create_checklist_draft_slug)
event.listen(ChecklistDraftTranslation, 'after_update', update_checklist_draft_slug)
