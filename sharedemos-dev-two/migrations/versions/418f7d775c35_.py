"""empty message

Revision ID: 418f7d775c35
Revises: c3e27c3e3e6
Create Date: 2017-11-14 09:53:28.982844

"""

# revision identifiers, used by Alembic.
revision = '418f7d775c35'
down_revision = '206b4f17b918'
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


class Checklist(Base):

    __tablename__ = 'checklist'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    slug = sa.Column(sa.Unicode)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey(
        'tenant.id'), nullable=False)
    is_featured = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class ChecklistTranslation(Base):

    __tablename__ = 'checklist_translation'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode, nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    language_id = sa.Column(sa.Unicode, sa.ForeignKey(
        'languages.id'), nullable=False)
    icon_id = sa.Column(sa.Integer, sa.ForeignKey(
        'icon_library.id'), nullable=True, default=None)
    checklist_id = sa.Column(sa.Integer, sa.ForeignKey(
        'checklist.id'), nullable=False)


class ChecklistSection(Base):

    __tablename__ = 'checklist_section'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey(
        'tenant.id'), nullable=False)
    checklist_id = sa.Column(sa.Integer, sa.ForeignKey('checklist.id'))


class ChecklistSectionTranslation(Base):

    __tablename__ = 'checklist_section_translation'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey(
        'languages.id'), nullable=False)
    checklist_section_id = sa.Column(sa.Integer, sa.ForeignKey(
        'checklist_section.id'), nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class ChecklistItem(Base):

    __tablename__ = 'checklist_item'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey(
        'tenant.id'), nullable=False)
    checklist_section_id = sa.Column(sa.Integer, sa.ForeignKey(
        'checklist_section.id'), nullable=False)


class ChecklistItemTranslation(Base):

    __tablename__ = 'checklist_item_translation'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode, nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey(
        'languages.id'), nullable=False)
    checklist_item_id = sa.Column(sa.Integer, sa.ForeignKey(
        'checklist_item.id'), nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class ChecklistSuggestion(Base):

    __tablename__ = 'checklist_suggestion'

    id = sa.Column(sa.Integer, primary_key=True)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    external_link = sa.Column(MutableDict.as_mutable(postgresql.JSON()))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey(
        'tenant.id'), nullable=False)
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    checklist_item_id = sa.Column(sa.Integer, sa.ForeignKey(
        'checklist_item.id'), nullable=False)
    created_at = sa.Column(
        sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():

    bind = op.get_bind()
    session = Session(bind=bind)

    # commands auto generated by Alembic - please adjust!
    op.create_table('checklist_draft',
                    sa.Column('order', sa.Integer(), nullable=False),
                    sa.Column('slug', sa.Unicode(), nullable=True),
                    sa.Column('is_featured', sa.Boolean(), nullable=False),
                    sa.Column('is_enabled', sa.Boolean(), nullable=False),
                    sa.Column('is_deleted', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('is_published', sa.Boolean(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint(
                        'tenant_id', 'slug',
                        name='uq_checklist_draft_tenant_id_slug')
                    )
    op.create_table('checklist_draft_section',
                    sa.Column('order', sa.Integer(), nullable=False),
                    sa.Column('is_enabled', sa.Boolean(), nullable=False),
                    sa.Column('is_deleted', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('is_published', sa.Boolean(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_id',
                              sa.Integer(), nullable=True),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['checklist_draft_id'], [
                        'checklist_draft.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('checklist_draft_translation',
                    sa.Column('title', sa.Unicode(), nullable=False),
                    sa.Column('description', sa.Unicode(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_id',
                              sa.Integer(), nullable=False),
                    sa.Column('language_id', sa.Unicode(), nullable=False),
                    sa.Column('icon_id', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['checklist_draft_id'], [
                        'checklist_draft.id'], ),
                    sa.ForeignKeyConstraint(
                        ['icon_id'], ['icon_library.id'], ),
                    sa.ForeignKeyConstraint(
                        ['language_id'], ['languages.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('checklist_draft_item',
                    sa.Column('order', sa.Integer(), nullable=False),
                    sa.Column('is_enabled', sa.Boolean(), nullable=False),
                    sa.Column('is_deleted', sa.Boolean(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_section_id',
                              sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.Column('is_published', sa.Boolean(), nullable=False),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['checklist_draft_section_id'], [
                        'checklist_draft_section.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('checklist_draft_section_translation',
                    sa.Column('title', sa.Unicode(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_section_id',
                              sa.Integer(), nullable=False),
                    sa.Column('language_id', sa.Unicode(), nullable=False),
                    sa.ForeignKeyConstraint(['checklist_draft_section_id'], [
                        'checklist_draft_section.id'], ),
                    sa.ForeignKeyConstraint(
                        ['language_id'], ['languages.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('checklist_draft_item_translation',
                    sa.Column('title', sa.Unicode(), nullable=False),
                    sa.Column('description', sa.Unicode(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_item_id',
                              sa.Integer(), nullable=False),
                    sa.Column('language_id', sa.Unicode(), nullable=False),
                    sa.ForeignKeyConstraint(['checklist_draft_item_id'], [
                        'checklist_draft_item.id'], ),
                    sa.ForeignKeyConstraint(
                        ['language_id'], ['languages.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('checklist_draft_suggestion',
                    sa.Column('is_deleted', sa.Boolean(), nullable=False),
                    sa.Column('order', sa.Integer(), nullable=False),
                    sa.Column('external_link',
                              postgresql.JSON(), nullable=True),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('checklist_draft_item_id',
                              sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.Column('is_published', sa.Boolean(), nullable=False),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['checklist_draft_item_id'], [
                        'checklist_draft_item.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.ForeignKeyConstraint(['walkthrough_id'], [
                                            'walkthrough.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.add_column(
        u'checklist',
        sa.Column(
            'created_by',
            sa.Integer(),
            nullable=True
        )
    )
    op.add_column(
        u'checklist',
        sa.Column(
            'draft_id',
            sa.Integer(),
            nullable=True
        )
    )
    op.add_column(u'checklist', sa.Column(
        'modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('checklist_draft_id_fkey',
                          'checklist', 'checklist_draft', ['draft_id'], ['id'])
    op.create_foreign_key('checklist_modified_by_fkey',
                          'checklist', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('checklist_created_by_fkey',
                          'checklist', 'users', ['created_by'], ['id'])
    op.add_column(u'checklist_item', sa.Column(
        'created_by', sa.Integer(), nullable=True))
    op.add_column(u'checklist_item', sa.Column(
        'draft_id', sa.Integer(), nullable=True))
    op.add_column(u'checklist_item', sa.Column(
        'modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('checklist_item_draft_id_fkey',
                          'checklist_item', 'checklist_draft_item',
                          ['draft_id'],
                          ['id'])
    op.create_foreign_key('checklist_item_modified_by_fkey',
                          'checklist_item', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('checklist_item_created_by_fkey',
                          'checklist_item', 'users', ['created_by'], ['id'])
    op.add_column(u'checklist_section', sa.Column(
        'created_by', sa.Integer(), nullable=True))
    op.add_column(u'checklist_section', sa.Column(
        'draft_id', sa.Integer(), nullable=True))
    op.add_column(u'checklist_section', sa.Column(
        'modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('checklist_section_created_by_fkey',
                          'checklist_section', 'users', ['created_by'], ['id'])
    op.create_foreign_key('checklist_section_draft_id_fkey',
                          'checklist_section', 'checklist_draft_section',
                          ['draft_id'],
                          ['id'])
    op.create_foreign_key('checklist_section_modified_by_fkey',
                          'checklist_section', 'users', ['modified_by'],
                          ['id'])
    op.add_column(u'checklist_suggestion', sa.Column(
        'created_by', sa.Integer(), nullable=True))
    op.add_column(u'checklist_suggestion', sa.Column(
        'draft_id', sa.Integer(), nullable=True))
    op.add_column(u'checklist_suggestion', sa.Column(
        'modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('checklist_suggestion_draft_id_fkey',
                          'checklist_suggestion', 'checklist_draft_suggestion',
                          ['draft_id'],
                          ['id'])
    op.create_foreign_key('checklist_suggestion_created_by_fkey',
                          'checklist_suggestion', 'users', ['created_by'],
                          ['id'])
    op.create_foreign_key('checklist_suggestion_modified_by_fkey',
                          'checklist_suggestion', 'users', ['modified_by'],
                          ['id'])
    # end Alembic commands

    checklists = session.query(Checklist).order_by(Checklist.id).all()

    for cl in checklists:

        cl_query = bind.execute(
            """insert into checklist_draft("order",
                slug,
                is_featured,
                is_enabled,
                is_deleted,
                created_at,
                modified_at,
                is_published,
                tenant_id
            ) values (
                %(order)s,
                %(slug)s,
                %(is_featured)s,
                %(is_enabled)s,
                %(is_deleted)s,
                %(created_at)s,
                %(modified_at)s,
                %(is_published)s,
                %(tenant_id)s
            ) returning checklist_draft.id""", dict(
                order=cl.order,
                slug=cl.slug,
                is_featured=cl.is_featured,
                is_enabled=cl.is_enabled,
                is_deleted=cl.is_deleted,
                created_at=cl.created_at,
                modified_at=cl.modified_at,
                is_published=True,
                tenant_id=cl.tenant_id
            )
        )

        draft_cl_id = cl_query.fetchone()[0]
        bind.execute("""update checklist set draft_id=%d where id=%d""" % (
            draft_cl_id,
            cl.id)
        )

        cl_translations = session.query(ChecklistTranslation) \
            .filter_by(checklist_id=cl.id) \
            .order_by(ChecklistTranslation.id).all()
        for trans in cl_translations:
            bind.execute(
                """insert into checklist_draft_translation(
                    title,
                    description,
                    created_at,
                    modified_at,
                    checklist_draft_id,
                    language_id,
                    icon_id
                ) values (
                    %(title)s,
                    %(description)s,
                    %(created_at)s,
                    %(modified_at)s,
                    %(checklist_draft_id)s,
                    %(language_id)s,
                    %(icon_id)s
                )""", dict(
                    title=trans.title,
                    description=trans.description,
                    created_at=trans.created_at,
                    modified_at=trans.modified_at,
                    checklist_draft_id=draft_cl_id,
                    language_id=trans.language_id,
                    icon_id=trans.icon_id
                )
            )

        cl_sections = session.query(ChecklistSection).filter_by(
            checklist_id=cl.id).order_by(ChecklistSection.id).all()

        for cl_section in cl_sections:
            cl_section_query = bind.execute(
                """insert into checklist_draft_section(
                        "order",
                        is_enabled,
                        is_deleted,
                        created_at,
                        modified_at,
                        is_published,
                        checklist_draft_id,
                        tenant_id
                    ) values (%(order)s,
                        %(is_enabled)s,
                        %(is_deleted)s,
                        %(created_at)s,
                        %(modified_at)s,
                        %(is_published)s,
                        %(checklist_draft_id)s,
                        %(tenant_id)s
                    ) returning checklist_draft_section.id""", dict(
                    order=cl_section.order,
                    is_enabled=cl_section.is_enabled,
                    is_deleted=cl_section.is_deleted,
                    created_at=cl_section.created_at,
                    modified_at=cl_section.modified_at,
                    checklist_draft_id=draft_cl_id,
                    is_published=True,
                    tenant_id=cl_section.tenant_id
                )
            )

            draft_cl_section_id = cl_section_query.fetchone()[0]
            bind.execute(
                """update checklist_section set draft_id=%d where id=%d""" %
                (draft_cl_section_id, cl_section.id)
            )

            cl_section_translations = session.query(
                ChecklistSectionTranslation
            ).filter_by(
                checklist_section_id=cl_section.id
            ).order_by(ChecklistSectionTranslation.id).all()
            for trans in cl_section_translations:
                bind.execute(
                    """insert into checklist_draft_section_translation(
                            title,
                            created_at,
                            modified_at,
                            checklist_draft_section_id,
                            language_id
                        ) values (
                            %(title)s,
                            %(created_at)s,
                            %(modified_at)s,
                            %(checklist_draft_section_id)s,
                            %(language_id)s
                        )""", dict(
                        title=trans.title,
                        created_at=trans.created_at,
                        modified_at=trans.modified_at,
                        checklist_draft_section_id=draft_cl_section_id,
                        language_id=trans.language_id
                    )
                )

            cl_items = session.query(
                ChecklistItem
            ).filter_by(
                checklist_section_id=cl_section.id
            ).order_by(ChecklistItem.id).all()

            for cl_item in cl_items:
                cl_item_query = bind.execute(
                    """insert into checklist_draft_item(
                            "order",
                            is_enabled,
                            is_deleted,
                            created_at,
                            modified_at,
                            is_published,
                            checklist_draft_section_id,
                            tenant_id
                        ) values (
                            %(order)s,
                            %(is_enabled)s,
                            %(is_deleted)s,
                            %(created_at)s,
                            %(modified_at)s,
                            %(is_published)s,
                            %(checklist_draft_section_id)s,
                            %(tenant_id)s
                        ) returning checklist_draft_item.id""", dict(
                        order=cl_item.order,
                        is_enabled=cl_item.is_enabled,
                        is_deleted=cl_item.is_deleted,
                        created_at=cl_item.created_at,
                        modified_at=cl_item.modified_at,
                        checklist_draft_section_id=draft_cl_section_id,
                        is_published=True, tenant_id=cl_section.tenant_id
                    )
                )

                draft_cl_item_id = cl_item_query.fetchone()[0]
                bind.execute(
                    """update checklist_item set draft_id=%d where id=%d""" %
                    (draft_cl_item_id, cl_item.id)
                )

                cl_item_translations = session.query(
                    ChecklistItemTranslation
                ).filter_by(
                    checklist_item_id=cl_item.id
                ).order_by(ChecklistItemTranslation.id).all()

                for trans in cl_item_translations:
                    bind.execute(
                        """insert into checklist_draft_item_translation(
                                title,
                                description,
                                created_at,
                                modified_at,
                                checklist_draft_item_id,
                                language_id
                            ) values (
                                %(title)s,
                                %(description)s,
                                %(created_at)s,
                                %(modified_at)s,
                                %(checklist_draft_item_id)s,
                                %(language_id)s
                            )""", dict(
                            title=trans.title,
                            description=trans.description,
                            created_at=trans.created_at,
                            modified_at=trans.modified_at,
                            checklist_draft_item_id=draft_cl_item_id,
                            language_id=trans.language_id
                        )
                    )

                cl_suggestions = session.query(
                    ChecklistSuggestion
                ).filter_by(
                    checklist_item_id=cl_item.id
                ).order_by(ChecklistSuggestion.id).all()

                for cl_suggestion in cl_suggestions:
                    cl_suggestion_query = bind.execute(
                        """insert into checklist_draft_suggestion(
                            "order",
                            is_deleted,
                            external_link,
                            created_at,
                            modified_at,
                            is_published,
                            checklist_draft_item_id,
                            tenant_id, walkthrough_id
                        ) values (
                            %(order)s,
                            %(is_deleted)s,
                            %(external_link)s,
                            %(created_at)s,
                            %(modified_at)s,
                            %(is_published)s,
                            %(checklist_draft_section_id)s,
                            %(tenant_id)s, %(walkthrough_id)s
                        ) returning checklist_draft_suggestion.id""", dict(
                            order=cl_suggestion.order,
                            is_deleted=cl_suggestion.is_deleted,
                            external_link=json.dumps(
                                cl_suggestion.external_link
                            ),
                            created_at=cl_suggestion.created_at,
                            modified_at=cl_suggestion.modified_at,
                            checklist_draft_section_id=draft_cl_item_id,
                            is_published=True,
                            tenant_id=cl_suggestion.tenant_id,
                            walkthrough_id=cl_suggestion.walkthrough_id)
                    )

                    draft_cl_suggestion_id = cl_suggestion_query.fetchone()[0]
                    bind.execute(
                        """
                            update checklist_suggestion
                            set draft_id=%d where id=%d
                        """ %
                        (draft_cl_suggestion_id, cl_suggestion.id)
                    )

    op.alter_column(
        'checklist', 'draft_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )
    op.alter_column(
        'checklist_section', 'draft_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )
    op.alter_column(
        'checklist_item', 'draft_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )
    op.alter_column(
        'checklist_suggestion', 'draft_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )


def downgrade_():
    # commands auto generated by Alembic - please adjust!
    op.drop_constraint('checklist_suggestion_modified_by_fkey',
                       'checklist_suggestion', type_='foreignkey')
    op.drop_constraint('checklist_suggestion_created_by_fkey',
                       'checklist_suggestion', type_='foreignkey')
    op.drop_constraint('checklist_suggestion_draft_id_fkey',
                       'checklist_suggestion', type_='foreignkey')
    op.drop_column(u'checklist_suggestion', 'modified_by')
    op.drop_column(u'checklist_suggestion', 'draft_id')
    op.drop_column(u'checklist_suggestion', 'created_by')
    op.drop_constraint('checklist_section_modified_by_fkey',
                       'checklist_section', type_='foreignkey')
    op.drop_constraint('checklist_section_draft_id_fkey',
                       'checklist_section', type_='foreignkey')
    op.drop_constraint('checklist_section_created_by_fkey',
                       'checklist_section', type_='foreignkey')
    op.drop_column(u'checklist_section', 'modified_by')
    op.drop_column(u'checklist_section', 'draft_id')
    op.drop_column(u'checklist_section', 'created_by')
    op.drop_constraint('checklist_item_created_by_fkey',
                       'checklist_item', type_='foreignkey')
    op.drop_constraint('checklist_item_modified_by_fkey',
                       'checklist_item', type_='foreignkey')
    op.drop_constraint('checklist_item_draft_id_fkey',
                       'checklist_item', type_='foreignkey')
    op.drop_column(u'checklist_item', 'modified_by')
    op.drop_column(u'checklist_item', 'draft_id')
    op.drop_column(u'checklist_item', 'created_by')
    op.drop_constraint('checklist_created_by_fkey',
                       'checklist', type_='foreignkey')
    op.drop_constraint('checklist_modified_by_fkey',
                       'checklist', type_='foreignkey')
    op.drop_constraint('checklist_draft_id_fkey',
                       'checklist', type_='foreignkey')
    op.drop_column(u'checklist', 'modified_by')
    op.drop_column(u'checklist', 'draft_id')
    op.drop_column(u'checklist', 'created_by')
    op.drop_table('checklist_draft_suggestion')
    op.drop_table('checklist_draft_item_translation')
    op.drop_table('checklist_draft_section_translation')
    op.drop_table('checklist_draft_item')
    op.drop_table('checklist_draft_translation')
    op.drop_table('checklist_draft_section')
    op.drop_table('checklist_draft')
    # end Alembic commands


def upgrade_reports():
    pass


def downgrade_reports():
    pass
