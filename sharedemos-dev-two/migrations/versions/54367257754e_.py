"""empty message

Revision ID: 54367257754e
Revises: 537abbef6c73
Create Date: 2018-05-17 06:26:40.525531

"""

# revision identifiers, used by Alembic.
revision = '54367257754e'
down_revision = '537abbef6c73'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.sql.functions import current_timestamp

from werkzeug.datastructures import FileStorage
from flask import current_app
from sharedemos.libs.helpers import create_file, delete_file


Session = sessionmaker()
Base = declarative_base()
bind = None
session = None


def delete_media(mapper, connection, target):
    if target.path:
        delete_file(target.path)


class Tenant(Base):

    __tablename__ = 'tenant'

    id = sa.Column(sa.Integer, primary_key=True, nullable=False)


class Languages(Base):

    __tablename__ = 'languages'

    id = sa.Column(sa.Unicode, primary_key=True, nullable=False)


class IconLibrary(Base):

    __tablename__ = 'icon_library'

    id = sa.Column(sa.Unicode, primary_key=True, nullable=False)
    name = sa.Column(sa.Unicode, nullable=False)
    path = sa.Column(sa.Unicode, nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'),
                          nullable=False)
    is_cdn_ready = sa.Column(sa.Boolean, nullable=False, default=False)
    created_at = sa.Column(sa.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Resource(Base):

    __tablename__ = 'resource'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    resource_type = sa.Column(sa.Unicode, nullable=False)
    path = sa.Column(sa.Unicode)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'),
                          nullable=False)
    created_at = sa.Column(sa.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    is_cdn_ready = sa.Column(sa.Boolean, nullable=False, default=False)


sa.event.listen(IconLibrary, 'after_delete', delete_media)
sa.event.listen(Resource, 'after_delete', delete_media)


class QuizQuestionMixin(object):

    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)


class QuizDraftQuestion(QuizQuestionMixin, Base):

    __tablename__ = 'quiz_draft_question'

    id = sa.Column(sa.Integer, primary_key=True)
    is_published = sa.Column(sa.Boolean, default=False, nullable=False)


class QuizDraftQuestionTranslation(Base):

    __tablename__ = 'quiz_draft_question_translation'

    id = sa.Column(sa.Integer, primary_key=True)

    icon = relationship("IconLibrary", single_parent=True)
    icon_id = sa.Column(
        sa.Unicode,
        sa.ForeignKey('icon_library.id'),
        nullable=False
    )
    language_id = sa.Column(
        sa.Unicode,
        sa.ForeignKey('languages.id'),
        nullable=False
    )
    languages = relationship("Languages")
    resource = relationship("Resource", single_parent=True)
    resource_id = sa.Column(
        sa.Integer,
        sa.ForeignKey('resource.id'),
        default=None
    )
    quiz_question_id = sa.Column(
        sa.Integer,
        sa.ForeignKey('quiz_draft_question.id'),
        nullable=False
    )
    quiz_question = relationship("QuizDraftQuestion",
                                 backref=backref('translations', order_by=id))


class QuizQuestion(QuizQuestionMixin, Base):

    __tablename__ = 'quiz_question'

    id = sa.Column(sa.Integer, primary_key=True)
    draft_id = sa.Column(sa.Integer, sa.ForeignKey('quiz_draft_question.id'),
                         nullable=False)
    draft = relationship("QuizDraftQuestion",
                         backref=backref("published", uselist=False),
                         foreign_keys=[draft_id])


class QuizQuestionTranslation(Base):

    __tablename__ = 'quiz_question_translation'

    id = sa.Column(sa.Integer, primary_key=True)

    icon = relationship("IconLibrary", single_parent=True)
    icon_id = sa.Column(
        sa.Unicode,
        sa.ForeignKey('icon_library.id'),
        nullable=False
    )
    language_id = sa.Column(
        sa.Unicode,
        sa.ForeignKey('languages.id'),
        nullable=False
    )
    resource = relationship("Resource", single_parent=True)
    resource_id = sa.Column(
        sa.Integer,
        sa.ForeignKey('resource.id'),
        default=None
    )
    quiz_question_id = sa.Column(sa.Integer, sa.ForeignKey('quiz_question.id'),
                                 nullable=False)
    quiz_question = relationship("QuizQuestion",
                                 backref=backref('translations', order_by=id))


def get_file_object(file_path):
    abs_file_path = current_app.config.get('MEDIA_FOLDER') + '/' + file_path
    fp = open(abs_file_path)
    return FileStorage(fp)


def create_resource_from_icon(icon, language_id):
    """
    Create a Resource model object from Icon object.

    Returns Resource model object
    params:
        icon- IconLibrary sqlalchemy object.
        language_id- string/unicode language id.
    """
    resource = Resource()
    resource.name = icon.name
    image_file = get_file_object(icon.path)
    resource.path = create_file(image_file)
    resource.resource_type = u'image'
    resource.tenant_id = icon.tenant_id
    resource.language_id = language_id
    resource.is_cdn_ready = False
    session.add(resource)
    return resource


def create_icon_from_resource(resource, language_id):
    """
    Create a IconLibrary model object from Resource object.

    Returns IconLibrary model object
    params:
        resource- IconLibrary sqlalchemy object.
        language_id- string/unicode language id.
    """
    icon = IconLibrary()
    icon.name = resource.name
    image_file = get_file_object(resource.path)
    icon.path = create_file(image_file)
    icon.tenant_id = resource.tenant_id
    icon.language_id = language_id
    icon.is_cdn_ready = False
    session.add(icon)
    return icon


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():

    bind = op.get_bind()
    session = Session(bind=bind)

    op.add_column(
        'quiz_draft_question_translation',
        sa.Column('resource_id', sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        'quiz_draft_question_translation_resource_id_fkey',
        'quiz_draft_question_translation',
        'resource',
        ['resource_id'],
        ['id']
    )
    op.add_column(
        'quiz_question_translation',
        sa.Column('resource_id', sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        'quiz_question_translation_resource_id_fkey',
        'quiz_question_translation',
        'resource',
        ['resource_id'],
        ['id']
    )

    draft_quiz_questions = session.query(QuizDraftQuestion).all()

    icon_ids_list = []
    for draft_question in draft_quiz_questions:

        combined_translations = draft_question.translations
        if draft_question.published:
            combined_translations = draft_question.translations +\
                draft_question.published.translations

        for translation in combined_translations:
            if translation.icon_id:
                translation.resource = create_resource_from_icon(
                    translation.icon,
                    translation.language_id
                )
                session.add(translation)
                if translation.icon_id not in icon_ids_list:
                    icon_ids_list.append(translation.icon_id)
            translation.icon_id = None

    if icon_ids_list:
        icons = session.query(
            IconLibrary
        ).filter(
            IconLibrary.id.in_(icon_ids_list)
        ).all()
        for i in icons:
            session.delete(i)
    session.commit()

    """
        After moving the contents from Icon library to
        Resource delete column that refers to IconLibrary
    """
    op.drop_constraint(
        'quiz_question_translation_icon_id_fkey',
        'quiz_question_translation',
        type_='foreignkey'
    )
    op.drop_column('quiz_question_translation', 'icon_id')
    op.drop_constraint(
        'quiz_draft_question_translation_icon_id_fkey',
        'quiz_draft_question_translation',
        type_='foreignkey'
    )
    op.drop_column('quiz_draft_question_translation', 'icon_id')


def downgrade_():

    bind = op.get_bind()
    session = Session(bind=bind)

    op.add_column(
        'quiz_draft_question_translation',
        sa.Column('icon_id', sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        'quiz_draft_question_translation_icon_id_fkey',
        'quiz_draft_question_translation',
        'icon_library',
        ['icon_id'],
        ['id']
    )
    op.add_column(
        'quiz_question_translation',
        sa.Column('icon_id', sa.Integer(), nullable=True)
    )
    op.create_foreign_key(
        'quiz_question_translation_icon_id_fkey',
        'quiz_question_translation',
        'icon_library',
        ['icon_id'],
        ['id']
    )

    draft_quiz_questions = session.query(QuizDraftQuestion).all()

    resource_id_list = []
    for draft_question in draft_quiz_questions:

        combined_translations = draft_question.translations
        if draft_question.published:
            combined_translations = draft_question.translations +\
                draft_question.published.translations

        for translation in combined_translations:
            if translation.resource_id:
                if translation.resource.resource_type == u'image':
                    translation.icon = create_icon_from_resource(
                        translation.resource,
                        translation.language_id
                    )
                    session.add(translation)
                if translation.resource_id not in resource_id_list:
                    resource_id_list.append(translation.resource_id)
            translation.resource_id = None

    if resource_id_list:
        resources = session.query(Resource).filter(
            Resource.id.in_(resource_id_list)
        ).all()
        for r in resources:
            session.delete(r)
    session.commit()

    op.drop_constraint(
        'quiz_question_translation_resource_id_fkey',
        'quiz_question_translation',
        type_='foreignkey'
    )
    op.drop_column(
        'quiz_question_translation',
        'resource_id'
    )
    op.drop_constraint(
        'quiz_draft_question_translation_resource_id_fkey',
        'quiz_draft_question_translation',
        type_='foreignkey'
    )
    op.drop_column('quiz_draft_question_translation', 'resource_id')


def upgrade_reports():
    pass


def downgrade_reports():
    pass
