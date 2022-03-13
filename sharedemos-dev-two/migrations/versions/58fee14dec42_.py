"""empty message

Revision ID: 58fee14dec42
Revises: 525004ee3f42
Create Date: 2017-07-19 03:34:40.636350

"""

# revision identifiers, used by Alembic.
revision = '58fee14dec42'
down_revision = '525004ee3f42'
branch_labels = ''
depends_on = ''


from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.mutable import MutableDict


Session = sessionmaker()
Base = declarative_base()


path_dict = dict()
draft_path_dict = dict()


class Path(Base):

    __tablename__ = 'paths'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    slug = sa.Column(sa.Unicode)

    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    question = relationship("Question", backref='paths', uselist=False)


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

    question = relationship(
        "Question", backref=backref('options', cascade_backrefs=False, order_by='Option.order'),
        foreign_keys=question_id)
    next_question = relationship(
        "Question", backref=backref('from_option', cascade_backrefs=False), uselist=False,
        foreign_keys=next_question_id)


class SuggestionGroup(Base):

    __tablename__ = 'suggestion_groups'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('options.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    option = relationship("Option", backref=backref('suggestion_groups'))


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

    group = relationship("SuggestionGroup", backref='suggestions')
    option = relationship("Option", backref=backref('suggestions'), order_by='Suggestion.order')


class DraftPath(Base):

    __tablename__ = 'draft_paths'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    slug = sa.Column(sa.Unicode)

    question_id = sa.Column(sa.Integer, sa.ForeignKey('draft_questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    question = relationship("DraftQuestion", backref='paths', uselist=False)


class DraftQuestion(Base):

    __tablename__ = 'draft_questions'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class DraftOption(Base):

    __tablename__ = 'draft_options'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    option_type = sa.Column(sa.Unicode, nullable=False, default=u'answer')

    question_id = sa.Column(sa.Integer, sa.ForeignKey('draft_questions.id'), nullable=False)
    next_question_id = sa.Column(sa.Integer, sa.ForeignKey('draft_questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    question = relationship(
        "DraftQuestion", backref=backref('options', cascade_backrefs=False, order_by='DraftOption.order'),
        foreign_keys=question_id)
    next_question = relationship(
        "DraftQuestion", backref=backref('from_option', cascade_backrefs=False), uselist=False,
        foreign_keys=next_question_id)


class DraftSuggestionGroup(Base):

    __tablename__ = 'draft_suggestion_groups'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('draft_options.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    option = relationship("DraftOption", backref=backref('suggestion_groups'))


class DraftSuggestion(Base):

    __tablename__ = 'draft_suggestions'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('draft_options.id'), nullable=False)
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    group_id = sa.Column(sa.Integer, sa.ForeignKey('draft_suggestion_groups.id'))

    external_link = sa.Column(MutableDict.as_mutable(postgresql.JSON()))

    group = relationship("DraftSuggestionGroup", backref='suggestions')
    option = relationship("DraftOption", backref=backref('suggestions'), order_by='DraftSuggestion.order')


def check_draft_options(path_id, question):
    bind = op.get_bind()
    if question.id not in draft_path_dict[path_id]:
        bind.execute(""" update draft_questions set path_id={0} where id={1}""".format(path_id, question.id))
        draft_path_dict[path_id].append(question.id)
        bind.execute(""" update draft_options set path_id={0} where question_id={1}""".format(path_id, question.id))
        for option in question.options:
            if option.next_question:
                check_draft_options(path_id, option.next_question)
            else:
                if option.suggestion_groups:
                    bind.execute(""" update draft_suggestion_groups set path_id={0} where option_id={1}""".format(path_id, option.id))
                if option.suggestions:
                    bind.execute(""" update draft_suggestions set path_id={0} where option_id={1}""".format(path_id, option.id))


def check_options(path_id, question):
    bind = op.get_bind()
    if question.id not in path_dict[path_id]:
        bind.execute(""" update questions set path_id={0} where id={1}""".format(path_id, question.id))
        path_dict[path_id].append(question.id)
        bind.execute(""" update options set path_id={0} where question_id={1}""".format(path_id, question.id))
        for option in question.options:
            if option.next_question:
                check_options(path_id, option.next_question)
            else:
                if option.suggestion_groups:
                    bind.execute(""" update suggestion_groups set path_id={0} where option_id={1}""".format(path_id, option.id))
                if option.suggestions:
                    bind.execute(""" update suggestions set path_id={0} where option_id={1}""".format(path_id, option.id))


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.add_column('draft_options', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('draft_options_path_id_fkey', 'draft_options', 'draft_paths', ['path_id'], ['id'])
    op.add_column('draft_questions', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('draft_questions_path_id_fkey', 'draft_questions', 'draft_paths', ['path_id'], ['id'])
    op.add_column('draft_suggestion_groups', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('draft_suggestion_groups_path_id_fkey', 'draft_suggestion_groups', 'draft_paths', ['path_id'], ['id'])
    op.add_column('draft_suggestions', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('draft_suggestions_path_id_fkey', 'draft_suggestions', 'draft_paths', ['path_id'], ['id'])
    op.add_column('options', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('options_path_id_fkey', 'options', 'paths', ['path_id'], ['id'])
    op.add_column('questions', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('questions_path_id_fkey', 'questions', 'paths', ['path_id'], ['id'])
    op.add_column('suggestion_groups', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('suggestion_groups_path_id_fkey', 'suggestion_groups', 'paths', ['path_id'], ['id'])
    op.add_column('suggestions', sa.Column('path_id', sa.Integer(), nullable=True))
    op.create_foreign_key('suggestions_path_id_fkey', 'suggestions', 'paths', ['path_id'], ['id'])

    bind = op.get_bind()
    session = Session(bind=bind)
    draft_paths = session.query(DraftPath).all()

    for draft_path in draft_paths:
        if draft_path.question:
            draft_path_dict[draft_path.id] = list()
            check_draft_options(draft_path.id, draft_path.question)

    orphan_draft_questions_query = bind.execute("select id, tenant_id from draft_questions where path_id is null")
    orphan_draft_questions = orphan_draft_questions_query.fetchall()
    orphan_draft_path_tenants = dict()
    for draft_question in orphan_draft_questions:
        if draft_question.tenant_id not in orphan_draft_path_tenants:
            draft_path_query = bind.execute(
                """insert into draft_paths(slug, "order", is_enabled, is_deleted, tenant_id, created_at, modified_at)
                   values ('dummy-path', 0, False, True, {0}, '2017-07-20', '2017-07-20')
                   returning draft_paths.id""".format(draft_question.tenant_id)
            )
            draft_path_id = draft_path_query.fetchone()[0]
            orphan_draft_path_tenants[draft_question.tenant_id] = draft_path_id
            bind.execute("""insert into draft_path_translations(title, description, path_id, language_id, created_at, modified_at)
                            values ('dummy', 'dummy path to created to to eliminate orphans while migration', {0},
                            'en_US', '2017-07-20', '2017-07-20')""".format(draft_path_id))

    for _tenant_id, draft_path_id in orphan_draft_path_tenants.items():
        bind.execute("""update draft_questions set path_id={0} where tenant_id={1} and path_id is null""".format(draft_path_id, _tenant_id))
        bind.execute("""update draft_options set path_id={0} where tenant_id={1} and path_id is null""".format(draft_path_id, _tenant_id))
        bind.execute("""
            update draft_suggestion_groups set path_id={0} where tenant_id={1} and path_id is null
            """.format(draft_path_id, _tenant_id))
        bind.execute("""
            update draft_suggestions set path_id={0} where tenant_id={1} and path_id is null
            """.format(draft_path_id, _tenant_id))

    paths = session.query(Path).all()

    for path in paths:
        if path.question:
            path_dict[path.id] = list()
            check_options(path.id, path.question)

    orphan_questions_query = bind.execute("select id, tenant_id from questions where path_id is null")
    orphan_questions = orphan_questions_query.fetchall()
    orphan_path_tenants = dict()
    for orphan_question in orphan_questions:
        if orphan_question.tenant_id not in orphan_path_tenants:
            path_query = bind.execute(
                """insert into paths(slug, "order", is_enabled, is_deleted, tenant_id, created_at, modified_at, draft_id)
                values ('dummy-path', 0, False, True, {0}, '2017-07-20', '2017-07-20', {1})
                returning paths.id
                """.format(orphan_question.tenant_id, orphan_draft_path_tenants[orphan_question.tenant_id])
            )
            path_id = path_query.fetchone()[0]
            orphan_path_tenants[orphan_question.tenant_id] = path_id
            bind.execute("""insert into path_translations(title, description, path_id, language_id, created_at, modified_at)
                         values ('dummy', 'dummy path to created to to eliminate orphans while migration', {0},
                         'en_US', '2017-07-20', '2017-07-20')""".format(path_id))

    for _tenant_id, path_id in orphan_path_tenants.items():
        bind.execute("""update questions set path_id={0} where tenant_id={1} and path_id is null""".format(path_id, _tenant_id))
        bind.execute("""update options set path_id={0} where tenant_id={1} and path_id is null""".format(path_id, _tenant_id))
        bind.execute("""update suggestion_groups set path_id={0} where tenant_id={1} and path_id is null""".format(path_id, _tenant_id))
        bind.execute("""update suggestions set path_id={0} where tenant_id={1} and path_id is null""".format(path_id, _tenant_id))

    op.alter_column('draft_options', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('draft_questions', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('draft_suggestion_groups', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('draft_suggestions', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('options', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('questions', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('suggestion_groups', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('suggestions', 'path_id', existing_type=sa.INTEGER(), nullable=False)
    op.alter_column('draft_paths', 'is_published',
                    existing_type=sa.Boolean(),
                    server_default='false',
                    nullable=False,
                    existing_server_default='true')
    op.alter_column('draft_questions', 'is_published',
                    existing_type=sa.Boolean(),
                    server_default='false',
                    nullable=False,
                    existing_server_default='true')
    op.alter_column('draft_options', 'is_published',
                    existing_type=sa.Boolean(),
                    server_default='false',
                    nullable=False,
                    existing_server_default='true')
    op.alter_column('draft_suggestion_groups', 'is_published',
                    existing_type=sa.Boolean(),
                    server_default='false',
                    nullable=False,
                    existing_server_default='true')
    op.alter_column('draft_suggestions', 'is_published',
                    existing_type=sa.Boolean(),
                    server_default='false',
                    nullable=False,
                    existing_server_default='true')

    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #

    op.drop_constraint('suggestions_path_id_fkey', 'suggestions', type_='foreignkey')
    op.drop_column('suggestions', 'path_id')
    op.drop_constraint('suggestion_groups_path_id_fkey', 'suggestion_groups', type_='foreignkey')
    op.drop_column('suggestion_groups', 'path_id')
    op.drop_constraint('questions_path_id_fkey', 'questions', type_='foreignkey')
    op.drop_column('questions', 'path_id')
    op.drop_constraint('options_path_id_fkey', 'options', type_='foreignkey')
    op.drop_column('options', 'path_id')
    op.drop_constraint('draft_suggestions_path_id_fkey', 'draft_suggestions', type_='foreignkey')
    op.drop_column('draft_suggestions', 'path_id')
    op.drop_constraint('draft_suggestion_groups_path_id_fkey', 'draft_suggestion_groups', type_='foreignkey')
    op.drop_column('draft_suggestion_groups', 'path_id')
    op.drop_constraint('draft_questions_path_id_fkey', 'draft_questions', type_='foreignkey')
    op.drop_column('draft_questions', 'path_id')
    op.drop_constraint('draft_options_path_id_fkey', 'draft_options', type_='foreignkey')
    op.drop_column('draft_options', 'path_id')

    bind = op.get_bind()
    orphan_paths_query = bind.execute("select id from paths where slug='dummy-path'")
    orphan_paths = orphan_paths_query.fetchall()
    for path in orphan_paths:
        bind.execute('delete from path_translations where path_id={0}'.format(path.id))
        bind.execute('delete from paths where id={0}'.format(path.id))

    orphan_draft_paths_query = bind.execute("select id from draft_paths where slug='dummy-path'")
    orphan_draft_paths = orphan_draft_paths_query.fetchall()
    for draft_path in orphan_draft_paths:
        bind.execute('delete from draft_path_translations where path_id={0}'.format(draft_path.id))
        bind.execute('delete from draft_paths where id={0}'.format(draft_path.id))
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
