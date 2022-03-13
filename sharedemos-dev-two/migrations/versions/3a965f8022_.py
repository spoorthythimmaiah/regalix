"""empty message

Revision ID: 3a965f8022
Revises: 35fd0921efa9
Create Date: 2015-12-21 20:29:25.841500

"""

# revision identifiers, used by Alembic.
revision = '3a965f8022'
down_revision = '35fd0921efa9'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.sql.functions import current_timestamp

Session = sessionmaker()
Base = declarative_base()


class Section(Base):

    __tablename__ = 'section'

    id = sa.Column(sa.Integer, primary_key=True)
    slug = sa.Column(sa.Unicode, nullable=True)
    order = sa.Column(sa.Integer, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, server_default="true", nullable=False)
    is_hidden = sa.Column(sa.Boolean, default=False, server_default="false", nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_private = sa.Column(sa.Boolean, default=False, nullable=False)

    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    parent_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), default=None)
    link_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'))
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    cta_id = sa.Column(sa.Integer, sa.ForeignKey('lead_cta_form.id'))

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    translations = relationship("SectionTranslations", backref="section", cascade="all, delete-orphan")


class SectionTranslations(Base):

    __tablename__ = 'section_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    title = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode)

    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Playlist(Base):

    __tablename__ = 'playlist'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), default=None)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    section = relationship("Section",
                           backref=backref('playlists', cascade_backrefs=False, order_by='Playlist.order'),
                           foreign_keys=section_id)
    translations = relationship("PlaylistTranslations", backref="playlist", cascade="all, delete-orphan")


class PlaylistTranslations(Base):

    __tablename__ = 'playlist_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode)

    playlist_id = sa.Column(sa.Integer, sa.ForeignKey('playlist.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Walkthrough(Base):

    __tablename__ = 'walkthrough'

    id = sa.Column(sa.Integer, primary_key=True)
    draft_id = sa.Column(sa.Integer, sa.ForeignKey('draft_walkthrough.id'), nullable=False)
    link_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), nullable=False)
    playlist_id = sa.Column(sa.Integer, sa.ForeignKey('playlist.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    slug = sa.Column(sa.Unicode, unique=True, nullable=True)
    resource_hostname = sa.Column(sa.Unicode, nullable=False, default=u"localhost")
    order = sa.Column(sa.Integer, nullable=False)
    slide_transition_effect = sa.Column(sa.Unicode, default=unicode("slide"))
    is_enabled = sa.Column(sa.Boolean, default=True, server_default="true", nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    section = relationship("Section", backref=backref('walkthroughs', cascade="all, delete-orphan", order_by=order))
    playlist = relationship("Playlist", backref=backref('walkthroughs', cascade="all, delete-orphan", order_by=order))


class DraftWalkthrough(Base):

    __tablename__ = 'draft_walkthrough'

    id = sa.Column(sa.Integer, primary_key=True)
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), nullable=False)
    playlist_id = sa.Column(sa.Integer, sa.ForeignKey('playlist.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    slug = sa.Column(sa.Unicode, unique=True, nullable=True)
    resource_hostname = sa.Column(sa.Unicode, nullable=False, default=u"localhost")
    order = sa.Column(sa.Integer, nullable=False)
    slide_transition_effect = sa.Column(sa.Unicode, default=unicode("slide"))
    is_enabled = sa.Column(sa.Boolean, default=True, server_default="true", nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    section = relationship("Section", backref=backref('draft_walkthroughs', cascade="all, delete-orphan", order_by=order))
    playlist = relationship("Playlist", backref=backref('draft_walkthroughs', cascade="all, delete-orphan", order_by=order))


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def update_walkthroughs(walkthroughs, table):
    bind = op.get_bind()

    for wt in walkthroughs:
        query = bind.execute("select * from playlist where section_id = " + str(wt.section.id))
        playlist = query.fetchone()
        if playlist:
            plist_id = playlist.id
        else:
            plist = bind.execute(
                """
                insert into playlist("order", is_enabled, is_deleted, section_id, tenant_id, created_at, modified_at)
                values (%(order)s, %(is_enabled)s, %(is_deleted)s, %(section_id)s, %(tenant_id)s, %(created_at)s, %(modified_at)s)
                returning playlist.id
                """,
                dict(order=1, is_enabled=wt.section.is_enabled, is_deleted=wt.section.is_deleted, section_id=wt.section.id,
                     tenant_id=wt.tenant_id, created_at=str(wt.section.created_at), modified_at=str(wt.section.modified_at))
            )
            plist_id = plist.fetchone()[0]

            for trans in wt.section.translations:
                bind.execute(
                    """
                    insert into playlist_translations(name, description, playlist_id, language_id, created_at, modified_at)
                    values (%(name)s, %(description)s, %(playlist_id)s, %(language_id)s, %(created_at)s, %(modified_at)s)
                    """,
                    dict(name=trans.name, description=trans.description, playlist_id=plist_id, language_id=trans.language_id,
                         created_at=str(trans.created_at), modified_at=str(trans.modified_at))
                )
        bind.execute("update " + table + " set playlist_id = " + str(plist_id) + " where section_id = " + str(wt.section.id))


def upgrade_():
    bind = op.get_bind()
    session = Session(bind=bind)

    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'playlist',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('is_enabled', sa.Boolean(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'playlist_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('playlist_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['playlist_id'], ['playlist.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'draft_walkthrough', sa.Column('playlist_id', sa.Integer()))
    op.create_foreign_key('fk_draft_walkthrough_playlist_id_playlist', 'draft_walkthrough', 'playlist', ['playlist_id'], ['id'])

    # map draft walkthroughs with associated playlist
    draft_walkthroughs = session.query(DraftWalkthrough).filter(DraftWalkthrough.section_id.isnot(None)).all()
    update_walkthroughs(draft_walkthroughs, "draft_walkthrough")

    op.alter_column(
        'draft_walkthrough', 'playlist_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )

    op.drop_constraint(u'draft_walkthrough_section_id_fkey', 'draft_walkthrough', type_='foreignkey')
    op.drop_column(u'draft_walkthrough', 'section_id')

    op.add_column(u'walkthrough', sa.Column('playlist_id', sa.Integer()))
    op.create_foreign_key('fk_walkthrough_playlist_id_playlist', 'walkthrough', 'playlist', ['playlist_id'], ['id'])

    # map walkthroughs with associated playlist
    walkthroughs = session.query(Walkthrough).filter(Walkthrough.section_id.isnot(None)).all()
    update_walkthroughs(walkthroughs, "walkthrough")

    op.alter_column(
        'walkthrough', 'playlist_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )

    op.drop_constraint(u'walkthrough_section_id_fkey', 'walkthrough', type_='foreignkey')
    op.drop_column(u'walkthrough', 'section_id')
    # end Alembic commands #


def downgrade_():
    bind = op.get_bind()
    session = Session(bind=bind)

    # commands auto generated by Alembic - please adjust! #
    op.add_column(u'walkthrough', sa.Column('section_id', sa.INTEGER(), autoincrement=False))
    op.create_foreign_key(u'walkthrough_section_id_fkey', 'walkthrough', 'section', ['section_id'], ['id'])

    # map walkthroughs with associated playlist
    walkthroughs = session.query(Walkthrough).all()
    for wt in walkthroughs:
        bind.execute("update walkthrough set section_id = " + str(wt.playlist.section_id) + " where playlist_id = " + str(wt.playlist_id))

    op.alter_column('walkthrough', 'section_id', existing_type=sa.INTEGER(), nullable=False)

    op.drop_constraint('fk_walkthrough_playlist_id_playlist', 'walkthrough', type_='foreignkey')
    op.drop_column(u'walkthrough', 'playlist_id')

    op.add_column(u'draft_walkthrough', sa.Column('section_id', sa.INTEGER(), autoincrement=False))
    op.create_foreign_key(u'draft_walkthrough_section_id_fkey', 'draft_walkthrough', 'section', ['section_id'], ['id'])

    # map draft walkthroughs with associated playlist
    draft_walkthroughs = session.query(DraftWalkthrough).all()
    for wt in draft_walkthroughs:
        bind.execute("update draft_walkthrough set section_id = " + str(wt.playlist.section_id) + " where playlist_id = " + str(wt.playlist_id))

    op.alter_column('draft_walkthrough', 'section_id', existing_type=sa.INTEGER(), nullable=False)

    op.drop_constraint('fk_draft_walkthrough_playlist_id_playlist', 'draft_walkthrough', type_='foreignkey')
    op.drop_column(u'draft_walkthrough', 'playlist_id')

    op.drop_table('playlist_translations')
    op.drop_table('playlist')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
