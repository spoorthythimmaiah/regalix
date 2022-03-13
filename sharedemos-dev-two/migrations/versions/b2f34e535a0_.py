"""empty message

Revision ID: b2f34e535a0
Revises: 249c3ea96873
Create Date: 2017-07-13 12:41:23.212873

"""

# revision identifiers, used by Alembic.
revision = 'b2f34e535a0'
down_revision = '249c3ea96873'
branch_labels = None
depends_on = None
import json
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.mutable import MutableDict

Session = sessionmaker()
Base = declarative_base()

class Path(Base):

    __tablename__ = 'paths'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    slug = sa.Column(sa.Unicode)

    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class PathTranslations(Base):

    __tablename__ = 'path_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)           # Path title(ex: EUC, SDDC)
    description = sa.Column(sa.Unicode, nullable=False)     # path description

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)
    path_id = sa.Column(sa.Integer, sa.ForeignKey('paths.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class Question(Base):

    __tablename__ = 'questions'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class QuestionTranslations(Base):

    __tablename__ = 'question_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    text = sa.Column(sa.Unicode, nullable=False)        # Question text
    subtext = sa.Column(sa.Unicode, nullable=False)     # subtext that further support user  action

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)
    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Option(Base):

    __tablename__ = 'options'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    option_type = sa.Column(sa.Unicode, nullable=False, default=u'answer')

    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'), nullable=False)
    next_question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    suggestion_message = sa.Column(MutableDict.as_mutable(postgresql.JSON()))  # customizable path result messages

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class OptionTranslations(Base):

    __tablename__ = 'option_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    text = sa.Column(sa.Unicode, nullable=False)

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)
    option_id = sa.Column(sa.Integer, sa.ForeignKey('options.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class SuggestionGroup(Base):

    __tablename__ = 'suggestion_groups'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('options.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class SuggestionGroupTranslations(Base):

    __tablename__ = 'suggestion_group_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode, nullable=False)

    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)
    suggestion_group_id = sa.Column(sa.Integer, sa.ForeignKey('suggestion_groups.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

class Suggestion(Base):

    __tablename__ = 'suggestions'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('options.id'), nullable=False)
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    group_id = sa.Column(sa.Integer, sa.ForeignKey('suggestion_groups.id'))

    external_link = sa.Column(MutableDict.as_mutable(postgresql.JSON()))

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###

    bind = op.get_bind()
    session = Session(bind=bind)

    op.create_table('draft_questions',
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('is_enabled', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_published', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_options',
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('is_enabled', sa.Boolean(), nullable=False),
    sa.Column('option_type', sa.Unicode(), nullable=False),
    sa.Column('suggestion_message', postgresql.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_published', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('next_question_id', sa.Integer(), nullable=True),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['next_question_id'], ['draft_questions.id'], ),
    sa.ForeignKeyConstraint(['question_id'], ['draft_questions.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_paths',
    sa.Column('slug', sa.Unicode(), nullable=True),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('is_enabled', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_published', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=True),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['question_id'], ['draft_questions.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('tenant_id', 'slug', name='uq_draft_path_tenant_id_slug')
    )
    op.create_table('draft_question_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.Unicode(), nullable=False),
    sa.Column('subtext', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('question_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=True),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['question_id'], ['draft_questions.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_option_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('option_id', sa.Integer(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=True),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['option_id'], ['draft_options.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_path_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.Unicode(), nullable=False),
    sa.Column('description', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('path_id', sa.Integer(), nullable=False),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.Column('icon_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['path_id'], ['draft_paths.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_suggestion_groups',
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_published', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('option_id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['option_id'], ['draft_options.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_suggestion_group_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.Unicode(), nullable=False),
    sa.Column('description', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('suggestion_group_id', sa.Integer(), nullable=False),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['suggestion_group_id'], ['draft_suggestion_groups.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('draft_suggestions',
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('external_link', postgresql.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('is_published', sa.Boolean(), server_default='true', nullable=False),
    sa.Column('option_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=True),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['group_id'], ['draft_suggestion_groups.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['option_id'], ['draft_options.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'options', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'options', sa.Column('draft_id', sa.Integer(), nullable=True))
    op.add_column(u'options', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('options_modified_by_fkey', 'options', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('options_created_by_fkey', 'options', 'users', ['created_by'], ['id'])
    op.create_foreign_key('options_draft_id_fkey', 'options', 'draft_options', ['draft_id'], ['id'])
    op.add_column(u'paths', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'paths', sa.Column('draft_id', sa.Integer(), nullable=True))
    op.add_column(u'paths', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_unique_constraint('uq_path_tenant_id_slug', 'paths', ['tenant_id', 'slug'])
    op.create_foreign_key('paths_created_by_fkey', 'paths', 'users', ['created_by'], ['id'])
    op.create_foreign_key('paths_draft_id_fkey', 'paths', 'draft_paths', ['draft_id'], ['id'])
    op.create_foreign_key('paths_modified_by_fkey', 'paths', 'users', ['modified_by'], ['id'])
    op.add_column(u'questions', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'questions', sa.Column('draft_id', sa.Integer(), nullable=True))
    op.add_column(u'questions', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('questions_draft_id_fkey', 'questions', 'draft_questions', ['draft_id'], ['id'])
    op.create_foreign_key('questions_modified_by_fkey', 'questions', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('questions_created_by_fkey', 'questions', 'users', ['created_by'], ['id'])
    op.add_column(u'suggestion_groups', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'suggestion_groups', sa.Column('draft_id', sa.Integer(), nullable=True))
    op.add_column(u'suggestion_groups', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('suggestion_groups_modified_by_fkey', 'suggestion_groups', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('suggestion_groups_created_by_fkey', 'suggestion_groups', 'users', ['created_by'], ['id'])
    op.create_foreign_key('suggestion_groups_draft_id_fkey', 'suggestion_groups', 'draft_suggestion_groups', ['draft_id'], ['id'])
    op.add_column(u'suggestions', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'suggestions', sa.Column('draft_id', sa.Integer(), nullable=True))
    op.add_column(u'suggestions', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('suggestions_draft_id_fkey', 'suggestions', 'draft_suggestions', ['draft_id'], ['id'])
    op.create_foreign_key('suggestions_created_by_fkey', 'suggestions', 'users', ['created_by'], ['id'])
    op.create_foreign_key('suggestions_modified_by_fkey', 'suggestions', 'users', ['modified_by'], ['id'])

    questions = session.query(Question).all()

    question_info_dict = dict()
    for question in questions:
        question_query = bind.execute(
            """insert into draft_questions(is_enabled, is_deleted, tenant_id, created_at, modified_at) values (%(is_enabled)s, %(is_deleted)s, %(tenant_id)s, %(created_at)s, %(modified_at)s) returning draft_questions.id""", dict(is_enabled=question.is_enabled, is_deleted=question.is_deleted, tenant_id=question.tenant_id, created_at=question.created_at, modified_at=question.modified_at)
        )
        draft_question_id = question_query.fetchone()[0]

        question_info_dict[question.id] = draft_question_id
        bind.execute("""update questions set draft_id=%d where id=%d""" % (draft_question_id, question.id))

        question_translations = session.query(QuestionTranslations).filter_by(question_id=question.id).all()
        for trans in question_translations:
            bind.execute(
                """insert into draft_question_translations(text, subtext, question_id, language_id, icon_id, created_at, modified_at) values (%(text)s, %(subtext)s, %(question_id)s, %(language_id)s, %(icon_id)s, %(created_at)s, %(modified_at)s)""", dict(text=trans.text, subtext=trans.subtext, question_id=draft_question_id, language_id=trans.language_id, icon_id=trans.icon_id, created_at=trans.created_at, modified_at=trans.modified_at)
            )

    paths = session.query(Path).all()
    for path in paths:
        path_query = bind.execute(
            """insert into draft_paths(slug, "order", is_enabled, is_deleted, question_id, tenant_id, created_at, modified_at) values (%(slug)s, %(order)s, %(is_enabled)s, %(is_deleted)s, %(question_id)s, %(tenant_id)s, %(created_at)s, %(modified_at)s) returning draft_paths.id""", dict(slug=path.slug, order=path.order, is_enabled=path.is_enabled, is_deleted=path.is_deleted, question_id=question_info_dict.get(path.question_id), tenant_id=path.tenant_id, created_at=path.created_at, modified_at=path.modified_at)
        )
        draft_path_id = path_query.fetchone()[0]
        bind.execute("""update paths set draft_id=%d where id=%d""" % (draft_path_id, path.id))

        path_translations = session.query(PathTranslations).filter_by(path_id=path.id).all()
        for trans in path_translations:
            bind.execute(
                """insert into draft_path_translations(title, description, path_id, language_id, icon_id, created_at, modified_at) values (%(title)s, %(description)s, %(path_id)s, %(language_id)s, %(icon_id)s, %(created_at)s, %(modified_at)s)""", dict(title=trans.title, description=trans.description, path_id=draft_path_id, language_id=trans.language_id, icon_id=trans.icon_id, created_at=trans.created_at, modified_at=trans.modified_at)
            )

    options = session.query(Option).all()
    option_ids_info = dict()
    for option in options:
        option_query = bind.execute(
            """insert into draft_options("order", is_enabled, is_deleted, option_type, question_id, next_question_id, tenant_id, created_at, modified_at, suggestion_message) values (%(order)s, %(is_enabled)s, %(is_deleted)s, %(option_type)s, %(question_id)s, %(next_question_id)s, %(tenant_id)s, %(created_at)s, %(modified_at)s, %(suggestion_message)s) returning draft_options.id""", dict(order=option.order, is_enabled=option.is_enabled, is_deleted=option.is_deleted, option_type=option.option_type ,question_id=question_info_dict.get(option.question_id), next_question_id=question_info_dict.get(option.next_question_id), tenant_id=option.tenant_id, created_at=option.created_at, modified_at=option.modified_at, suggestion_message=json.dumps(option.suggestion_message))
        )
        draft_option_id = option_query.fetchone()[0]
        bind.execute("""update options set draft_id=%d where id=%d""" % (draft_option_id, option.id))
        option_ids_info[option.id] = draft_option_id
        option_translations = session.query(OptionTranslations).filter_by(option_id=option.id).all()

        for trans in option_translations:
            bind.execute(
                """insert into draft_option_translations(text, option_id, language_id, icon_id, created_at, modified_at) values (%(text)s, %(option_id)s, %(language_id)s, %(icon_id)s, %(created_at)s, %(modified_at)s)""", dict(text=trans.text, option_id=draft_option_id, language_id=trans.language_id, icon_id=trans.icon_id, created_at=trans.created_at, modified_at=trans.modified_at)
            )

    suggestion_groups = session.query(SuggestionGroup).all()
    suggestion_groups_ids_info = dict()
    for group in suggestion_groups:
        group_query = bind.execute(
            """insert into draft_suggestion_groups("order", is_deleted, option_id, tenant_id, created_at, modified_at) values (%(order)s, %(is_deleted)s, %(option_id)s, %(tenant_id)s, %(created_at)s, %(modified_at)s) returning draft_suggestion_groups.id""", dict(order=group.order, is_deleted=group.is_deleted, option_id=option_ids_info.get(group.option_id), tenant_id=group.tenant_id, created_at=group.created_at, modified_at=group.modified_at)
        )
        draft_group_id = group_query.fetchone()[0]
        bind.execute("""update suggestion_groups set draft_id=%d where id=%d""" % (draft_group_id, group.id))

        suggestion_groups_ids_info[group.id] = draft_group_id
        group_translations = session.query(SuggestionGroupTranslations).filter_by(suggestion_group_id=group.id).all()

        for trans in group_translations:
            bind.execute(
                """insert into draft_suggestion_group_translations(title, description, suggestion_group_id, language_id, created_at, modified_at) values (%(title)s, %(description)s, %(suggestion_group_id)s, %(language_id)s, %(created_at)s, %(modified_at)s)""", dict(title=trans.title, description=trans.description, suggestion_group_id=draft_group_id, language_id=trans.language_id, created_at=trans.created_at, modified_at=trans.modified_at)
            )

    suggestions = session.query(Suggestion).all()
    for suggestion in suggestions:
        suggestion_query = bind.execute(
            """insert into draft_suggestions("order", is_deleted, option_id, external_link, walkthrough_id, tenant_id, created_at, modified_at, group_id) values (%(order)s, %(is_deleted)s, %(option_id)s, %(external_link)s, %(walkthrough_id)s, %(tenant_id)s, %(created_at)s, %(modified_at)s, %(group_id)s) returning draft_suggestions.id""", dict(order=suggestion.order, is_deleted=suggestion.is_deleted, option_id=option_ids_info.get(suggestion.option_id), external_link=json.dumps(suggestion.external_link), walkthrough_id=suggestion.walkthrough_id ,tenant_id=suggestion.tenant_id, created_at=suggestion.created_at, modified_at=suggestion.modified_at, group_id=suggestion_groups_ids_info.get(suggestion.group_id))
        )

        draft_suggextion_id = suggestion_query.fetchone()[0]
        bind.execute("""update suggestions set draft_id=%d where id=%d""" % (draft_suggextion_id, suggestion.id))

    op.alter_column('paths', 'draft_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('questions', 'draft_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('options', 'draft_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('suggestion_groups', 'draft_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('suggestions', 'draft_id', existing_type=sa.INTEGER(), nullable=False)
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('suggestions_draft_id_fkey', 'suggestions', type_='foreignkey')
    op.drop_constraint('suggestions_created_by_fkey', 'suggestions', type_='foreignkey')
    op.drop_constraint('suggestions_modified_by_fkey', 'suggestions', type_='foreignkey')
    op.drop_column(u'suggestions', 'modified_by')
    op.drop_column(u'suggestions', 'draft_id')
    op.drop_column(u'suggestions', 'created_by')
    op.drop_constraint('suggestion_groups_modified_by_fkey', 'suggestion_groups', type_='foreignkey')
    op.drop_constraint('suggestion_groups_created_by_fkey', 'suggestion_groups', type_='foreignkey')
    op.drop_constraint('suggestion_groups_draft_id_fkey', 'suggestion_groups', type_='foreignkey')
    op.drop_column(u'suggestion_groups', 'modified_by')
    op.drop_column(u'suggestion_groups', 'draft_id')
    op.drop_column(u'suggestion_groups', 'created_by')
    op.drop_constraint('questions_draft_id_fkey', 'questions', type_='foreignkey')
    op.drop_constraint('questions_modified_by_fkey', 'questions', type_='foreignkey')
    op.drop_constraint('questions_created_by_fkey', 'questions', type_='foreignkey')
    op.drop_column(u'questions', 'modified_by')
    op.drop_column(u'questions', 'draft_id')
    op.drop_column(u'questions', 'created_by')
    op.drop_constraint('paths_created_by_fkey', 'paths', type_='foreignkey')
    op.drop_constraint('paths_modified_by_fkey', 'paths', type_='foreignkey')
    op.drop_constraint('paths_draft_id_fkey', 'paths', type_='foreignkey')
    op.drop_constraint('uq_path_tenant_id_slug', 'paths', type_='unique')
    op.drop_column(u'paths', 'modified_by')
    op.drop_column(u'paths', 'draft_id')
    op.drop_column(u'paths', 'created_by')
    op.drop_constraint('options_modified_by_fkey', 'options', type_='foreignkey')
    op.drop_constraint('options_created_by_fkey', 'options', type_='foreignkey')
    op.drop_constraint('options_draft_id_fkey', 'options', type_='foreignkey')
    op.drop_column(u'options', 'modified_by')
    op.drop_column(u'options', 'draft_id')
    op.drop_column(u'options', 'created_by')
    op.drop_table('draft_suggestions')
    op.drop_table('draft_suggestion_group_translations')
    op.drop_table('draft_suggestion_groups')
    op.drop_table('draft_path_translations')
    op.drop_table('draft_option_translations')
    op.drop_table('draft_question_translations')
    op.drop_table('draft_paths')
    op.drop_table('draft_options')
    op.drop_table('draft_questions')
    ### end Alembic commands ###

def upgrade_reports():
    pass


def downgrade_reports():
    pass