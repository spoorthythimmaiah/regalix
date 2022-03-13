"""empty message

Revision ID: 51f17087ca56
Revises: 5442ecbd34df
Create Date: 2017-03-15 05:14:51.295210

"""

# revision identifiers, used by Alembic.
revision = '51f17087ca56'
down_revision = '5442ecbd34df'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.orm import sessionmaker, relationship, backref


Session = sessionmaker()
Base = declarative_base()


class IconLibrary(Base):

    __tablename__ = 'icon_library'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    path = sa.Column(sa.Unicode, nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

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
    subtext = sa.Column(sa.Unicode, nullable=False)     # subtext that further support user action

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)
    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'), nullable=False)
    question = relationship("Question", backref='translations')

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
    type = sa.Column(sa.Unicode, nullable=False, default=u'answer')

    next_question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    next_question = relationship(
        "Question", backref=backref('from_option', cascade_backrefs=False), uselist=False,
        foreign_keys=next_question_id)
    question = relationship(
        "Question", backref=backref('options', cascade_backrefs=False, order_by='Option.order'),
        foreign_keys=question_id)

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

    option = relationship("Option", backref='translations')

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Information(Base):
    __tablename__ = 'information'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)

    option_id = sa.Column(sa.Integer, sa.ForeignKey('options.id'), nullable=False)
    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    from_option = relationship("Option", backref=backref('to_information', uselist=False), foreign_keys=option_id)
    to_question = relationship("Question", backref=backref('from_information'), foreign_keys=question_id)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False,)


class InformationTranslations(Base):
    __tablename__ = 'information_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    text = sa.Column(sa.Unicode, nullable=False)
    subtext = sa.Column(sa.Unicode)

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    information_id = sa.Column(sa.Integer, sa.ForeignKey('information.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)

    icon = relationship("IconLibrary", cascade="all, delete-orphan", single_parent=True)
    information = relationship("Information", backref=backref('translations'))

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False,)


def copy_from_information_table():
    bind = op.get_bind()
    session = Session(bind=bind)
    informations = session.query(Information).all()

    for info in informations:
        question = bind.execute(
            """
            insert into questions(is_enabled, is_deleted, tenant_id, created_at, modified_at)
            values (%(is_enabled)s, %(is_deleted)s, %(tenant_id)s, %(created_at)s, %(modified_at)s)
            returning questions.id
            """,
            dict(is_enabled=info.is_enabled, is_deleted=info.is_deleted, tenant_id=info.tenant_id,
                 created_at=str(info.created_at), modified_at=str(info.modified_at))
        )

        question_id = question.fetchone()[0]
        for trans in info.translations:
            bind.execute(
                """
                insert into question_translations(text, subtext, question_id, icon_id, language_id, created_at, modified_at)
                values (%(text)s, %(subtext)s, %(question_id)s, %(icon_id)s, %(language_id)s, %(created_at)s, %(modified_at)s)
                """,
                dict(text=trans.text, subtext=(trans.subtext or ''), question_id=question_id, icon_id=trans.icon_id,
                     language_id=trans.language_id, created_at=str(trans.created_at), modified_at=str(trans.modified_at))
            )
        bind.execute("update options set next_question_id = " + str(question_id) + " where id = " + str(info.option_id))

        option = bind.execute(
            """
            insert into options("order", is_enabled, is_deleted, type, tenant_id, next_question_id, question_id, created_at,
                                 modified_at)
            values (%(order)s, %(is_enabled)s, %(is_deleted)s, %(type)s, %(tenant_id)s, %(next_question_id)s, %(question_id)s,
                    %(created_at)s, %(modified_at)s)
            returning options.id
            """,
            dict(order=1, is_enabled=True, is_deleted=False, type=u'information', tenant_id=info.tenant_id,
                 next_question_id=info.question_id,
                 question_id=question_id, created_at=str(info.created_at), modified_at=str(info.modified_at))
        )

        option_id = option.fetchone()[0]

        bind.execute(
            """
            insert into option_translations(text, option_id, language_id, created_at, modified_at)
            values (%(text)s, %(option_id)s, %(language_id)s, %(created_at)s, %(modified_at)s)
            """,
            dict(text=u'continue', option_id=option_id, language_id=trans.language_id,
                 created_at=str(info.created_at), modified_at=str(info.modified_at))
        )


def dump_to_information_table():
    bind = op.get_bind()
    session = Session(bind=bind)
    info_type_options = session.query(Option).filter(Option.type == 'information').all()

    for opt in info_type_options:
        for from_opt in opt.question.from_option:
            information = bind.execute(
                """
                insert into information(is_enabled, is_deleted, tenant_id, option_id, question_id, created_at, modified_at)
                values (%(is_enabled)s, %(is_deleted)s, %(tenant_id)s, %(option_id)s, %(question_id)s, %(created_at)s, %(modified_at)s)
                returning information.id
                """,
                dict(is_enabled=opt.question.is_enabled, is_deleted=opt.question.is_deleted, tenant_id=opt.question.tenant_id,
                     question_id=opt.next_question_id, option_id=from_opt.id,
                     created_at=str(opt.created_at), modified_at=str(opt.modified_at))
            )

            info_id = information.fetchone()[0]
            for trans in opt.question.translations:
                bind.execute(
                    """
                    insert into information_translations(text, subtext, information_id, icon_id, language_id, created_at, modified_at)
                    values (%(text)s, %(subtext)s, %(information_id)s, %(icon_id)s, %(language_id)s, %(created_at)s, %(modified_at)s)
                    """,
                    dict(text=trans.text, subtext=trans.subtext, information_id=info_id, icon_id=trans.icon_id,
                         language_id=trans.language_id,
                         created_at=str(trans.created_at), modified_at=str(trans.modified_at))
                )
                op.execute('delete from question_translations where id = ' + str(trans.id))

        op.execute('delete from option_translations where option_id = ' + str(opt.id))
        op.execute('delete from options where id = ' + str(opt.id))
        op.execute('update options set next_question_id=NULL where next_question_id = ' + str(opt.question.id))
        op.execute('delete from questions where id = ' + str(opt.question.id))


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.add_column('options', sa.Column('type', sa.Unicode(), server_default='answer', nullable=False))

    copy_from_information_table()

    op.drop_table('information_tags')
    op.drop_table('information_translations')
    op.drop_table('information')
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'information',
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('is_enabled', sa.BOOLEAN(), server_default=sa.text(u'true'), autoincrement=False, nullable=False),
        sa.Column('is_deleted', sa.BOOLEAN(), server_default=sa.text(u'false'), autoincrement=False, nullable=False),
        sa.Column('tenant_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('option_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('question_id', sa.INTEGER(), autoincrement=False, nullable=True),
        sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('modified_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.ForeignKeyConstraint(['option_id'], [u'options.id'], name=u'information_option_id_fkey'),
        sa.ForeignKeyConstraint(['question_id'], [u'questions.id'], name=u'information_question_id_fkey'),
        sa.ForeignKeyConstraint(['tenant_id'], [u'tenant.id'], name=u'information_tenant_id_fkey'),
        sa.PrimaryKeyConstraint('id', name=u'information_pkey'),
        postgresql_ignore_search_path=False
    )
    op.create_table(
        'information_translations',
        sa.Column('id', sa.INTEGER(), nullable=False),
        sa.Column('text', sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column('subtext', sa.VARCHAR(), autoincrement=False, nullable=True),
        sa.Column('information_id', sa.INTEGER(), autoincrement=False, nullable=False),
        sa.Column('language_id', sa.VARCHAR(), autoincrement=False, nullable=False),
        sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('modified_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
        sa.Column('icon_id', sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(['icon_id'], [u'icon_library.id'], name=u'information_translations_icon_id_fkey'),
        sa.ForeignKeyConstraint(['information_id'], [u'information.id'], name=u'information_translations_information_id_fkey'),
        sa.ForeignKeyConstraint(['language_id'], [u'languages.id'], name=u'information_translations_language_id_fkey'),
        sa.PrimaryKeyConstraint('id', name=u'information_translations_pkey')
    )
    op.create_table(
        'information_tags',
        sa.Column('information_id', sa.INTEGER(), autoincrement=False, nullable=True),
        sa.Column('tag_id', sa.INTEGER(), autoincrement=False, nullable=True),
        sa.ForeignKeyConstraint(['information_id'], [u'information.id'], name=u'information_tags_information_id_fkey'),
        sa.ForeignKeyConstraint(['tag_id'], [u'tag.id'], name=u'information_tags_tag_id_fkey')
    )

    dump_to_information_table()

    op.drop_column('options', 'type')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
