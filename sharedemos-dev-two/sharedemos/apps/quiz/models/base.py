from sqlalchemy import event, UniqueConstraint
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.sql.functions import current_timestamp
from sharedemos.models import db, Base, Tenant, SlugRevision, I18nBase
from sharedemos.libs.model import slugify


def create_quiz_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.quiz.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.name, target.quiz_id, Quiz,
                           target.quiz.tenant_id)
        quiz_table = Quiz.__table__
        connection.execute(
            quiz_table.update().
            where(quiz_table.c.id == target.quiz_id).
            values(slug=new_slug)
        )

        return new_slug


def update_quiz_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.quiz.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_quiz_slug(mapper, connection, target)

        # Don't create/update quiz revision data if slug is unchanged
        if not new_slug or new_slug == target.quiz.slug:
            return

        # Log quiz revision details
        tenant_id = target.quiz.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("quiz")) &
            (SlugRevision.entity_id == target.quiz.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.quiz.slug,
            new_slug=new_slug,
            entity_type=unicode("quiz"),
            entity_id=target.quiz.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.quiz.slug) &
                  (revision_table.c.entity_type == u"quiz") &
                  (revision_table.c.entity_id == target.quiz.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_quiz_draft_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.quiz.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.name, target.quiz_id,
                           QuizDraft, target.quiz.tenant_id)
        quiz_table = QuizDraft.__table__
        connection.execute(
            quiz_table.update().
            where(quiz_table.c.id == target.quiz_id).
            values(slug=new_slug)
        )
        return new_slug


def update_quiz_draft_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.quiz.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_quiz_draft_slug(mapper, connection, target)

        # Don't create/update draft quiz revision data if slug is unchanged
        if not new_slug or new_slug == target.quiz.slug:
            return

        # Log draft quiz revision details
        tenant_id = target.quiz.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("quiz_draft")) &
            (SlugRevision.entity_id == target.quiz.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()
        connection.execute(
            revision_table.insert(),
            old_slug=target.quiz.slug,
            new_slug=new_slug,
            entity_type=unicode("quiz_draft"),
            entity_id=target.quiz.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.quiz.slug) &
                  (revision_table.c.entity_type == u"quiz_draft") &
                  (revision_table.c.entity_id == target.quiz.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


class QuizMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    slug = db.Column(db.Unicode)

    is_sequential_questions = db.Column(db.Boolean, nullable=False,
                                        default=True)
    can_skip = db.Column(db.Boolean, nullable=False, default=False)
    time_limit = db.Column(db.Integer, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)
    re_attempts_count = db.Column(db.Integer, nullable=True)
    grading_style = db.Column(db.Unicode, nullable=False)
    grading_points = db.Column(db.Integer, nullable=True, default=0)

    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

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
                return translation.name
        return ''

    def __repr__(self):
        return self.__unicode__()


class QuizDraft(QuizMixin, I18nBase):

    __tablename__ = 'quiz_draft'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)


class Quiz(QuizMixin, I18nBase):

    __tablename__ = 'quiz'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                         nullable=False)
    draft = db.relationship("QuizDraft",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug', name='uq_quiz_tenant_id_slug'),
    )

    @hybrid_method
    def is_locale_available(self, locale):

        for translation in self.translations:
            if translation.language_id == locale:
                return True

        return False


class QuizTranslationMixin(object):

    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    certification = db.Column(db.Unicode, nullable=False)
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
        return db.relationship("IconLibrary", single_parent=True)

    def __unicode__(self):
        return self.name

    def __repr__(self):
        return self.__unicode__()


class QuizDraftTranslation(QuizTranslationMixin, Base):

    __tablename__ = 'quiz_draft_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                        nullable=False)
    quiz = db.relationship("QuizDraft",
                           backref=db.backref('translations', order_by=id))


class QuizTranslation(QuizTranslationMixin, Base):

    __tablename__ = 'quiz_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    quiz = db.relationship("Quiz",
                           backref=db.backref('translations', order_by=id))


class QuizQuestionMixin(object):

    order = db.Column(db.Integer, nullable=False, default=1)
    points = db.Column(db.Integer, nullable=True, default=0)
    option_type = db.Column(db.Unicode, nullable=True)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @hybrid_method
    def is_locale_available(self, locale):
        for translation in self.translations:
            if translation.language_id == locale:
                return True
        return False

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


class QuizDraftQuestion(QuizQuestionMixin, I18nBase):

    __tablename__ = 'quiz_draft_question'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                        nullable=False)
    quiz = db.relationship("QuizDraft",
                           backref=db.backref('quiz_questions', order_by=id))


class QuizQuestion(QuizQuestionMixin, I18nBase):

    __tablename__ = 'quiz_question'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer, db.ForeignKey('quiz_draft_question.id'),
                         nullable=False)
    draft = db.relationship("QuizDraftQuestion",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)
    quiz = db.relationship("Quiz",
                           backref=db.backref('quiz_questions', order_by=id))


class QuizQuestionTranslationMixin(object):

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

    @declared_attr
    def resource_id(cls):
        return db.Column(db.Integer, db.ForeignKey('resource.id'),
                         default=None)

    @declared_attr
    def resource(cls):
        return db.relationship("Resource")

    def __unicode__(self):
        return self.title

    def __repr__(self):
        return self.__unicode__()


class QuizDraftQuestionTranslation(QuizQuestionTranslationMixin, Base):

    __tablename__ = 'quiz_draft_question_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_question_id = db.Column(db.Integer,
                                 db.ForeignKey('quiz_draft_question.id'),
                                 nullable=False)
    quiz_question = db.relationship("QuizDraftQuestion",
                                    backref=db.backref('translations',
                                                       order_by=id))


class QuizQuestionTranslation(QuizQuestionTranslationMixin, Base):

    __tablename__ = 'quiz_question_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'),
                                 nullable=False)
    quiz_question = db.relationship("QuizQuestion",
                                    backref=db.backref('translations',
                                                       order_by=id))


class QuizOptionMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False, default=1)

    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant")


class QuizOptionTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode, nullable=True)
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
        return db.relationship("IconLibrary", single_parent=True)

    def __unicode__(self):
        return self.text

    def __repr__(self):
        return self.__unicode__()


class QuizDraftMultiSelectOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_draft_multiselect_option'

    id = db.Column(db.Integer, primary_key=True)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    is_correct_option = db.Column(db.Boolean, nullable=False, default=False)
    is_single_select = db.Column(db.Boolean, nullable=False, default=True)

    quiz_question_id = db.Column(db.Integer,
                                 db.ForeignKey('quiz_draft_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                        nullable=False)

    quiz_question = db.relationship("QuizDraftQuestion",
                                    backref=db.backref(
                                        'quiz_multiselect_options',
                                        order_by=id))
    quiz = db.relationship("QuizDraft")

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.text

        return ''

    def __repr__(self):
        return self.__unicode__()


class QuizMultiSelectOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_multiselect_option'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer,
                         db.ForeignKey('quiz_draft_multiselect_option.id'),
                         nullable=False)
    draft = db.relationship("QuizDraftMultiSelectOption",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    is_correct_option = db.Column(db.Boolean, nullable=False, default=False)
    is_single_select = db.Column(db.Boolean, nullable=False, default=True)

    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    quiz_question = db.relationship("QuizQuestion",
                                    backref=db.backref(
                                        'quiz_multiselect_options',
                                        order_by=id))
    quiz = db.relationship("Quiz")

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.text

        return ''

    def __repr__(self):
        return self.__unicode__()


class QuizDraftMultiSelectOptionTranslation(QuizOptionTranslationMixin,
                                            Base):

    __tablename__ = 'quiz_draft_multiselect_option_translation'

    id = db.Column(db.Integer, primary_key=True)
    quiz_multiselect_option_id = db.Column(
        db.Integer,
        db.ForeignKey('quiz_draft_multiselect_option.id'),
        nullable=False)
    quiz_multiselect_option = db.relationship("QuizDraftMultiSelectOption",
                                              backref=db.backref(
                                                  'translations',
                                                  order_by=id))


class QuizMultiSelectOptionTranslation(QuizOptionTranslationMixin, Base):

    __tablename__ = 'quiz_multiselect_option_translation'

    id = db.Column(db.Integer, primary_key=True)
    quiz_multiselect_option_id = db.Column(db.Integer,
                                           db.ForeignKey(
                                               'quiz_multiselect_option.id'),
                                           nullable=False)
    quiz_multiselect_option = db.relationship("QuizMultiSelectOption",
                                              backref=db.backref(
                                                  'translations',
                                                  order_by=id))


class QuizDraftSortableOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_draft_sortable_option'

    id = db.Column(db.Integer, primary_key=True)
    correct_order = db.Column(db.Integer, nullable=False, default=1)
    is_published = db.Column(db.Boolean, default=False, nullable=False)

    quiz_question_id = db.Column(db.Integer,
                                 db.ForeignKey('quiz_draft_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                        nullable=False)

    quiz_question = db.relationship("QuizDraftQuestion",
                                    backref=db.backref('quiz_sortable_options',
                                                       order_by=id))
    quiz = db.relationship("QuizDraft")

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.text

        return ''

    def __repr__(self):
        return self.__unicode__()


class QuizSortableOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_sortable_option'

    id = db.Column(db.Integer, primary_key=True)
    correct_order = db.Column(db.Integer, nullable=False, default=1)

    draft_id = db.Column(db.Integer,
                         db.ForeignKey('quiz_draft_sortable_option.id'),
                         nullable=False)
    draft = db.relationship("QuizDraftSortableOption",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    quiz_question = db.relationship("QuizQuestion",
                                    backref=db.backref('quiz_sortable_options',
                                                       order_by=id))
    quiz = db.relationship("Quiz")

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == self.tenant.default_locale_id:
                return translation.text

        return ''

    def __repr__(self):
        return self.__unicode__()


class QuizDraftSortableOptionTranslation(QuizOptionTranslationMixin, Base):

    __tablename__ = 'quiz_draft_sortable_option_translation'

    id = db.Column(db.Integer, primary_key=True)
    quiz_sortable_option_id = db.Column(db.Integer,
                                        db.ForeignKey(
                                            'quiz_draft_sortable_option.id'),
                                        nullable=False)
    quiz_sortable_option = db.relationship("QuizDraftSortableOption",
                                           backref=db.backref('translations',
                                                              order_by=id))


class QuizSortableOptionTranslation(QuizOptionTranslationMixin, Base):

    __tablename__ = 'quiz_sortable_option_translation'

    id = db.Column(db.Integer, primary_key=True)
    quiz_sortable_option_id = db.Column(db.Integer,
                                        db.ForeignKey(
                                            'quiz_sortable_option.id'),
                                        nullable=False)
    quiz_sortable_option = db.relationship("QuizSortableOption",
                                           backref=db.backref('translations',
                                                              order_by=id))


class QuizDraftMatchingOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_draft_matching_option'

    id = db.Column(db.Integer, primary_key=True)

    is_published = db.Column(db.Boolean, default=False, nullable=False)

    quiz_question_id = db.Column(db.Integer,
                                 db.ForeignKey('quiz_draft_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_draft.id'),
                        nullable=False)

    quiz_question = db.relationship("QuizDraftQuestion",
                                    backref=db.backref('quiz_matching_options',
                                                       order_by=id))
    quiz = db.relationship("QuizDraft")


class QuizMatchingOption(QuizOptionMixin, I18nBase):

    __tablename__ = 'quiz_matching_option'

    id = db.Column(db.Integer, primary_key=True)

    draft_id = db.Column(db.Integer,
                         db.ForeignKey('quiz_draft_matching_option.id'),
                         nullable=False)
    draft = db.relationship("QuizDraftMatchingOption",
                            backref=db.backref("published", uselist=False),
                            foreign_keys=[draft_id])

    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'),
                                 nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    quiz_question = db.relationship("QuizQuestion",
                                    backref=db.backref('quiz_matching_options',
                                                       order_by=id))
    quiz = db.relationship("Quiz")


class QuizMatchingOptionTranslationMixin(object):

    # text, text and image, image only support
    item_left = db.Column(MutableDict.as_mutable(JSON))
    # text, text and image, image only support
    item_right = db.Column(MutableDict.as_mutable(JSON))
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


class QuizDraftMatchingOptionTranslation(QuizMatchingOptionTranslationMixin,
                                         Base):

    __tablename__ = 'quiz_draft_matching_option_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_matching_option_id = db.Column(db.Integer,
                                        db.ForeignKey(
                                            'quiz_draft_matching_option.id'),
                                        nullable=False)
    quiz_matching_option = db.relationship("QuizDraftMatchingOption",
                                           backref=db.backref('translations',
                                                              order_by=id))


class QuizMatchingOptionTranslation(QuizMatchingOptionTranslationMixin,
                                    Base):

    __tablename__ = 'quiz_matching_option_translation'

    id = db.Column(db.Integer, primary_key=True)

    quiz_matching_option_id = db.Column(db.Integer,
                                        db.ForeignKey(
                                            'quiz_matching_option.id'),
                                        nullable=False)
    quiz_matching_option = db.relationship("QuizMatchingOption",
                                           backref=db.backref('translations',
                                                              order_by=id))


event.listen(QuizTranslation, 'after_insert', create_quiz_slug)
event.listen(QuizTranslation, 'after_update', update_quiz_slug)
event.listen(QuizDraftTranslation, 'after_insert', create_quiz_draft_slug)
event.listen(QuizDraftTranslation, 'after_update', update_quiz_draft_slug)
