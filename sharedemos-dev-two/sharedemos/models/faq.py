from sqlalchemy import event, UniqueConstraint

from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.sql.functions import current_timestamp

from sharedemos.models import db, SlugRevision, Tenant
from sharedemos.libs.model import slugify


def create_group_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.group.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.name, target.group_id, FAQGroup,
                           target.group.tenant_id)
        faq_group_table = FAQGroup.__table__
        connection.execute(
            faq_group_table.update().
            where(faq_group_table.c.id == target.group_id).
            values(slug=new_slug)
        )

        return new_slug


def update_group_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.group.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_group_slug(mapper, connection, target)

        # Don't create/update group revision data if slug is unchanged
        if not new_slug or new_slug == target.group.slug:
            return

        # Log group revision details
        tenant_id = target.group.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("faq_group")) &
            (SlugRevision.entity_id == target.group.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.group.slug,
            new_slug=new_slug,
            entity_type=unicode("faq_group"),
            entity_id=target.group.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.group.slug) &
                  (revision_table.c.entity_type == u"faq_group") &
                  (revision_table.c.entity_id == target.group.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_draft_group_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.group.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.name, target.group_id,
                           FAQDraftGroup, target.group.tenant_id)
        draft_group_table = FAQDraftGroup.__table__
        connection.execute(
            draft_group_table.update().
            where(draft_group_table.c.id == target.group_id).
            values(slug=new_slug)
        )
        return new_slug


def update_draft_group_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.group.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_draft_group_slug(mapper, connection, target)

        # Don't create/update draft group revision data if slug is unchanged
        if not new_slug or new_slug == target.group.slug:
            return

        # Log draft group revision details
        tenant_id = target.group.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("faq_group_draft")) &
            (SlugRevision.entity_id == target.group.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()
        connection.execute(
            revision_table.insert(),
            old_slug=target.group.slug,
            new_slug=new_slug,
            entity_type=unicode("faq_group_draft"),
            entity_id=target.group.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.group.slug) &
                  (revision_table.c.entity_type == u"faq_group_draft") &
                  (revision_table.c.entity_id == target.group.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


class FAQGroupMixin(object):

    slug = db.Column(db.Unicode)
    order = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
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
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__)

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return unicode(translation.name)
        return u''

    def __repr__(self):
        return self.__unicode__()


class FAQDraftGroup(FAQGroupMixin, db.Model):

    __tablename__ = 'faq_draft_group'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_faq_draft_group_tenant_id_slug'),
    )

    @hybrid_property
    def questions_count(self):
        q_count = FAQDraft.query.join(
            FAQDraftSection
        ).join(FAQDraftGroup).filter(
            FAQDraft.tenant_id == self.tenant_id,
            FAQDraftGroup.id == self.id,
            FAQDraftGroup.is_deleted.__eq__(False),
            FAQDraftGroup.is_enabled.__eq__(True),
            FAQDraftSection.is_deleted.__eq__(False),
            FAQDraftSection.is_enabled.__eq__(True),
            FAQDraft.is_deleted.__eq__(False),
            FAQDraft.is_enabled.__eq__(True)
        ).count()

        return q_count


class FAQGroup(FAQGroupMixin, db.Model):

    __tablename__ = 'faq_group'

    id = db.Column(db.Integer, primary_key=True)
    draft_id = db.Column(db.Integer, db.ForeignKey('faq_draft_group.id'),
                         nullable=False)
    draft = db.relationship("FAQDraftGroup",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_faq_group_tenant_id_slug'),
    )

    @hybrid_property
    def questions_count(self):
        q_count = FAQ.query.join(
            FAQSection
        ).join(FAQGroup).filter(
            FAQ.tenant_id == self.tenant_id,
            FAQGroup.id == self.id,
            FAQGroup.is_deleted.__eq__(False),
            FAQGroup.is_enabled.__eq__(True),
            FAQSection.is_deleted.__eq__(False),
            FAQSection.is_enabled.__eq__(True),
            FAQ.is_deleted.__eq__(False),
            FAQ.is_enabled.__eq__(True)
        ).count()

        return q_count


class FAQGroupTranslationMixin(object):

    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'),
                         default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary", single_parent=True)

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()


class FAQDraftGroupTranslation(FAQGroupTranslationMixin, db.Model):

    __tablename__ = 'faq_draft_group_translation'

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('faq_draft_group.id'),
                         nullable=False)
    group = db.relationship("FAQDraftGroup", backref=db.backref('translations',
                                                                order_by=id))


class FAQGroupTranslation(FAQGroupTranslationMixin, db.Model):

    __tablename__ = 'faq_group_translation'

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('faq_group.id'),
                         nullable=False)
    group = db.relationship("FAQGroup", backref=db.backref('translations',
                                                           order_by=id))


class FAQSectionMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
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
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__)

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return unicode(translation.name)
        return u''

    def __repr__(self):
        return self.__unicode__()


class FAQDraftSection(FAQSectionMixin, db.Model):

    __tablename__ = 'faq_draft_section'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('faq_draft_group.id'),
                         nullable=False)

    group = db.relationship(
        "FAQDraftGroup",
        backref=db.backref('faq_sections', order_by="FAQDraftSection.order")
    )


class FAQSection(FAQSectionMixin, db.Model):

    __tablename__ = 'faq_section'

    id = db.Column(db.Integer, primary_key=True)
    draft_id = db.Column(db.Integer, db.ForeignKey('faq_draft_section.id'),
                         nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('faq_group.id'),
                         nullable=False)

    draft = db.relationship("FAQDraftSection",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])
    group = db.relationship(
        "FAQGroup",
        backref=db.backref('faq_sections', order_by="FAQSection.order")
    )


class FAQSectionTranslationMixin(object):

    name = db.Column(db.Unicode, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()


class FAQDraftSectionTranslation(FAQSectionTranslationMixin, db.Model):

    __tablename__ = 'faq_draft_section_translation'

    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('faq_draft_section.id'),
                           nullable=False)
    section = db.relationship("FAQDraftSection",
                              backref=db.backref('translations', order_by=id))


class FAQSectionTranslation(FAQSectionTranslationMixin, db.Model):

    __tablename__ = 'faq_section_translation'

    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('faq_section.id'),
                           nullable=False)
    section = db.relationship("FAQSection",
                              backref=db.backref('translations', order_by=id))


class FAQMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime,
                           default=current_timestamp(),
                           nullable=False)
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
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__)

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return unicode(translation.question)
        return u''

    def __repr__(self):
        return self.__unicode__()


class FAQDraft(FAQMixin, db.Model):

    __tablename__ = 'faq_draft'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('faq_draft_section.id'),
                           nullable=False)
    section = db.relationship(
        "FAQDraftSection",
        backref=db.backref('questions', order_by="FAQDraft.order")
    )

    group_id = db.Column(db.Integer, db.ForeignKey('faq_draft_group.id'),
                         nullable=False)
    group = db.relationship("FAQDraftGroup")


class FAQ(FAQMixin, db.Model):

    __tablename__ = 'faq'

    id = db.Column(db.Integer, primary_key=True)
    draft_id = db.Column(db.Integer, db.ForeignKey('faq_draft.id'),
                         nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('faq_section.id'),
                           nullable=False)
    draft = db.relationship("FAQDraft",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])
    section = db.relationship(
        "FAQSection",
        backref=db.backref('questions', order_by="FAQ.order")
    )

    group_id = db.Column(db.Integer, db.ForeignKey('faq_group.id'),
                         nullable=False)
    group = db.relationship("FAQGroup")


class FAQTranslationMixin(object):

    question = db.Column(db.Unicode, nullable=False)
    answer = db.Column(db.Unicode, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    def __unicode__(self):
        return unicode(self.question)

    def __repr__(self):
        return self.__unicode__()


class FAQDraftTranslation(FAQTranslationMixin, db.Model):

    __tablename__ = 'faq_draft_translation'

    id = db.Column(db.Integer, primary_key=True)
    faq_id = db.Column(db.Integer, db.ForeignKey('faq_draft.id'),
                       nullable=False)
    faq = db.relationship("FAQDraft",
                          backref=db.backref('translations', order_by=id))


class FAQTranslation(FAQTranslationMixin, db.Model):

    __tablename__ = 'faq_translation'

    id = db.Column(db.Integer, primary_key=True)
    faq_id = db.Column(db.Integer, db.ForeignKey('faq.id'),
                       nullable=False)
    faq = db.relationship("FAQ",
                          backref=db.backref('translations', order_by=id))


event.listen(FAQGroupTranslation, 'after_insert', create_group_slug)
event.listen(FAQGroupTranslation, 'after_update', update_group_slug)
event.listen(FAQDraftGroupTranslation, 'after_insert', create_draft_group_slug)
event.listen(FAQDraftGroupTranslation, 'after_update', update_draft_group_slug)
