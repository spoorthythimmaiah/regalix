from sqlalchemy import event, UniqueConstraint
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.postgresql import JSON
from sharedemos.models import db, SlugRevision, Tenant
from sharedemos.libs.model import slugify


def create_path_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.path.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.title, target.path_id, Path,
                           target.path.tenant_id)
        path_table = Path.__table__
        connection.execute(
            path_table.update().
            where(path_table.c.id == target.path_id).
            values(slug=new_slug)
        )

        return new_slug


def update_path_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.path.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_path_slug(mapper, connection, target)

        # Don't create/update path revision data if slug is unchanged
        if not new_slug or new_slug == target.path.slug:
            return

        # Log path revision details
        tenant_id = target.path.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("path")) &
            (SlugRevision.entity_id == target.path.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.path.slug,
            new_slug=new_slug,
            entity_type=unicode("path"),
            entity_id=target.path.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.path.slug) &
                  (revision_table.c.entity_type == u"path") &
                  (revision_table.c.entity_id == target.path.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_draft_path_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.path.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.title, target.path_id, DraftPath,
                           target.path.tenant_id)
        path_table = DraftPath.__table__
        connection.execute(
            path_table.update().
            where(path_table.c.id == target.path_id).
            values(slug=new_slug)
        )

        return new_slug


def update_draft_path_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.path.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_draft_path_slug(mapper, connection, target)

        # Don't create/update path revision data if slug is unchanged
        if not new_slug or new_slug == target.path.slug:
            return

        # Log path revision details
        tenant_id = target.path.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("draft_path")) &
            (SlugRevision.entity_id == target.path.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.path.slug,
            new_slug=new_slug,
            entity_type=unicode("draft_path"),
            entity_id=target.path.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.path.slug) &
                  (revision_table.c.entity_type == u"draft_path") &
                  (revision_table.c.entity_id == target.path.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


class PathMixin(object):

    slug = db.Column(db.Unicode)
    order = db.Column(db.Integer, nullable=False, default=1)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
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
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class DraftPath(PathMixin, db.Model):

    __tablename__ = 'draft_paths'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    question_id = db.Column(db.Integer, db.ForeignKey('draft_questions.id'))
    question = db.relationship("DraftQuestion", foreign_keys=question_id)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_draft_path_tenant_id_slug'),
    )


class Path(PathMixin, db.Model):

    __tablename__ = 'paths'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                         nullable=False)
    draft = db.relationship("DraftPath",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    question = db.relationship("Question", foreign_keys=question_id)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug', name='uq_path_tenant_id_slug'),
    )


class PathTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode, nullable=False)
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
    def languages(cls):
        return db.relationship("Languages")

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'),
                         default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class DraftPathTranslations(PathTranslationMixin, db.Model):

    __tablename__ = 'draft_path_translations'

    path_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                        nullable=False)
    path = db.relationship("DraftPath", backref="translations")


class PathTranslations(PathTranslationMixin, db.Model):

    __tablename__ = 'path_translations'

    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)
    path = db.relationship("Path", backref="translations")


class QuestionMixin(object):

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
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
                return translation.text
        return ''

    def __repr__(self):
        return self.__unicode__()


class DraftQuestion(QuestionMixin, db.Model):

    __tablename__ = 'draft_questions'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    path_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                        nullable=False)
    path = db.relationship("DraftPath",
                           backref=db.backref("draft_questions"),
                           foreign_keys=[path_id])


class Question(QuestionMixin, db.Model):

    __tablename__ = 'questions'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('draft_questions.id'),
                         nullable=False)
    draft = db.relationship("DraftQuestion",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)
    path = db.relationship("Path",
                           backref=db.backref("questions"),
                           foreign_keys=[path_id])


class QuestionTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Unicode, nullable=False)
    subtext = db.Column(db.Unicode, nullable=False)
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
    def languages(cls):
        return db.relationship("Languages")

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'),
                         default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary")

    def __unicode__(self):
        return self.text

    def __repr__(self):
        return self.__unicode__()


class DraftQuestionTranslations(QuestionTranslationMixin, db.Model):

    __tablename__ = 'draft_question_translations'

    question_id = db.Column(db.Integer, db.ForeignKey('draft_questions.id'),
                            nullable=False)
    question = db.relationship("DraftQuestion", backref="translations")


class QuestionTranslations(QuestionTranslationMixin, db.Model):

    __tablename__ = 'question_translations'

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'),
                            nullable=False)
    question = db.relationship("Question", backref='translations')


class OptionMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    option_type = db.Column(db.Unicode, nullable=False, default=u'answer')

    created_at = db.Column(db.DateTime, default=current_timestamp(),
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
                return translation.text
        return ''

    def __repr__(self):
        return self.__unicode__()


class DraftOption(OptionMixin, db.Model):

    __tablename__ = 'draft_options'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    question_id = db.Column(db.Integer, db.ForeignKey('draft_questions.id'),
                            nullable=False)
    next_question_id = db.Column(db.Integer,
                                 db.ForeignKey('draft_questions.id'))
    path_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                        nullable=False)

    path = db.relationship("DraftPath", backref="options",
                           foreign_keys=path_id)
    question = db.relationship(
        "DraftQuestion", backref=db.backref('options', cascade_backrefs=False,
                                            order_by='DraftOption.order'),
        foreign_keys=question_id)
    next_question = db.relationship(
        "DraftQuestion",
        backref=db.backref('from_option', cascade_backrefs=False),
        uselist=False,
        foreign_keys=next_question_id)


class Option(OptionMixin, db.Model):

    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('draft_options.id'),
                         nullable=False)
    draft = db.relationship("DraftOption",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    question_id = db.Column(db.Integer, db.ForeignKey('questions.id'),
                            nullable=False)
    next_question_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)

    path = db.relationship("Path", backref="options", foreign_keys=path_id)
    question = db.relationship(
        "Question", backref=db.backref('options', cascade_backrefs=False,
                                       order_by='Option.order'),
        foreign_keys=question_id)
    next_question = db.relationship(
        "Question", backref=db.backref('from_option', cascade_backrefs=False),
        uselist=False,
        foreign_keys=next_question_id)


class OptionTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Unicode, nullable=False)

    # customizable path result messages
    suggestion_message = db.Column(MutableDict.as_mutable(JSON))

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
    def languages(cls):
        return db.relationship("Languages")

    @declared_attr
    def icon_id(cls):
        return db.Column(db.Integer, db.ForeignKey('icon_library.id'),
                         default=None)

    @declared_attr
    def icon(cls):
        return db.relationship("IconLibrary")

    def __unicode__(self):
        return self.text

    def __repr__(self):
        return self.__unicode__()


class DraftOptionTranslations(OptionTranslationMixin, db.Model):

    __tablename__ = 'draft_option_translations'

    option_id = db.Column(db.Integer, db.ForeignKey('draft_options.id'),
                          nullable=False)
    option = db.relationship("DraftOption", backref="translations")


class OptionTranslations(OptionTranslationMixin, db.Model):

    __tablename__ = 'option_translations'

    option_id = db.Column(db.Integer, db.ForeignKey('options.id'),
                          nullable=False)
    option = db.relationship("Option", backref="translations")


class SuggestionGroupMixin(object):

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    order = db.Column(db.Integer, nullable=False, default=1)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
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
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class DraftSuggestionGroup(SuggestionGroupMixin, db.Model):

    __tablename__ = 'draft_suggestion_groups'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    option_id = db.Column(db.Integer, db.ForeignKey('draft_options.id'),
                          nullable=False)
    option = db.relationship("DraftOption", backref=db.backref(
                             'suggestion_groups',
                             order_by='DraftSuggestionGroup.order'))

    path_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                        nullable=False)
    path = db.relationship("DraftPath", backref="suggestion_groups",
                           foreign_keys=path_id)


class SuggestionGroup(SuggestionGroupMixin, db.Model):

    __tablename__ = 'suggestion_groups'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer,
                         db.ForeignKey('draft_suggestion_groups.id'),
                         nullable=False)
    draft = db.relationship("DraftSuggestionGroup", backref=db.backref(
                            "published", uselist=False),
                            foreign_keys=[draft_id])

    option_id = db.Column(db.Integer, db.ForeignKey('options.id'),
                          nullable=False)
    option = db.relationship("Option", backref=db.backref(
                             'suggestion_groups',
                             order_by='SuggestionGroup.order'))

    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)
    path = db.relationship("Path", backref="suggestion_groups",
                           foreign_keys=path_id)


class SuggestionGroupTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode, nullable=False)

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
    def languages(cls):
        return db.relationship("Languages")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class DraftSuggestionGroupTranslations(SuggestionGroupTranslationMixin,
                                       db.Model):

    __tablename__ = 'draft_suggestion_group_translations'

    suggestion_group_id = db.Column(db.Integer, db.ForeignKey(
        'draft_suggestion_groups.id'), nullable=False)
    suggestion_group = db.relationship("DraftSuggestionGroup",
                                       backref="translations")


class SuggestionGroupTranslations(SuggestionGroupTranslationMixin, db.Model):

    __tablename__ = 'suggestion_group_translations'

    suggestion_group_id = db.Column(db.Integer,
                                    db.ForeignKey('suggestion_groups.id'),
                                    nullable=False)
    suggestion_group = db.relationship(
        "SuggestionGroup", backref="translations")


class SuggestionMixin(object):

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    order = db.Column(db.Integer, nullable=False, default=1)
    external_link = db.Column(MutableDict.as_mutable(JSON))

    created_at = db.Column(db.DateTime, default=current_timestamp(),
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
    def walkthrough_id(cls):
        return db.Column(db.Integer, db.ForeignKey('walkthrough.id'))

    @declared_attr
    def walkthrough(cls):
        return db.relationship("Walkthrough",
                               backref=db.backref(cls.__tablename__))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__)


class DraftSuggestion(SuggestionMixin, db.Model):

    __tablename__ = 'draft_suggestions'

    id = db.Column(db.Integer, primary_key=True)

    is_published = db.Column(db.Boolean, default=False, nullable=False)
    option_id = db.Column(db.Integer, db.ForeignKey('draft_options.id'),
                          nullable=False)
    group_id = db.Column(db.Integer,
                         db.ForeignKey('draft_suggestion_groups.id'))
    path_id = db.Column(db.Integer, db.ForeignKey('draft_paths.id'),
                        nullable=False)

    option = db.relationship("DraftOption", backref=db.backref(
                             'suggestions', order_by='DraftSuggestion.order'))
    group = db.relationship("DraftSuggestionGroup", backref=db.backref(
                            'suggestions', order_by='DraftSuggestion.order'))
    path = db.relationship("DraftPath", backref="suggestions",
                           foreign_keys=path_id)


class Suggestion(SuggestionMixin, db.Model):

    __tablename__ = 'suggestions'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('draft_suggestions.id'),
                         nullable=False)
    draft = db.relationship("DraftSuggestion",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    option_id = db.Column(db.Integer, db.ForeignKey('options.id'),
                          nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('suggestion_groups.id'))
    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)

    option = db.relationship("Option",
                             backref=db.backref('suggestions',
                                                order_by='Suggestion.order'))
    group = db.relationship("SuggestionGroup",
                            backref=db.backref('suggestions',
                                               order_by='Suggestion.order'))
    path = db.relationship("Path", backref="suggestions", foreign_keys=path_id)


event.listen(PathTranslations, 'after_insert', create_path_slug)
event.listen(PathTranslations, 'after_update', update_path_slug)
event.listen(DraftPathTranslations, 'after_insert', create_draft_path_slug)
event.listen(DraftPathTranslations, 'after_update', update_draft_path_slug)
