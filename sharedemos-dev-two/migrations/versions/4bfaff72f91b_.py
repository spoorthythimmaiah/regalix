"""empty message

Revision ID: 4bfaff72f91b
Revises: fb6b31d374a
Create Date: 2015-07-03 05:03:43.458219

"""

# revision identifiers, used by Alembic.
revision = '4bfaff72f91b'
down_revision = 'fb6b31d374a'

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


class Walkthrough(Base):

    __tablename__ = 'walkthrough'

    id = sa.Column(sa.Integer, primary_key=True)
    draft_id = sa.Column(sa.Integer, sa.ForeignKey('draft_walkthrough.id'), nullable=False)
    link_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), nullable=False)
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


class WalkthroughTranslations(Base):

    __tablename__ = 'walkthrough_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    title = sa.Column(sa.Unicode, nullable=False)
    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    walkthrough_id = sa.Column(sa.Unicode, sa.ForeignKey('walkthrough.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


class Slide(Base):

    __tablename__ = 'slide'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'), nullable=False)
    image_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    av_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class SlideTranslations(Base):

    __tablename__ = 'slide_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    text = sa.Column(sa.Unicode, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    slide_id = sa.Column(sa.Integer, sa.ForeignKey('slide.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


class Hotspot(Base):

    __tablename__ = 'hotspot'

    id = sa.Column(sa.Integer, primary_key=True)
    display = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    action = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    hotspot_type = sa.Column(sa.Unicode, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    slide_id = sa.Column(sa.Integer, sa.ForeignKey('slide.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class HotspotTranslations(Base):

    __tablename__ = 'hotspot_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    callout = sa.Column(MutableDict.as_mutable(postgresql.JSON()))
    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    hotspot_id = sa.Column(sa.Integer, sa.ForeignKey('hotspot.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    bind = op.get_bind()
    session = Session(bind=bind)

    op.create_table(
        'draft_walkthrough',
        sa.Column('slug', sa.Unicode(), nullable=True),
        sa.Column('resource_hostname', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('slide_transition_effect', sa.Unicode(), nullable=True),
        sa.Column('is_enabled', sa.Boolean(), server_default='true', nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('slug')
    )
    op.create_table(
        'draft_walkthrough_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=False),
        sa.Column('title', sa.Unicode(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('walkthrough_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['walkthrough_id'], ['draft_walkthrough.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_slide',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('walkthrough_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('image_resource_id', sa.Integer(), nullable=True),
        sa.Column('av_resource_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['av_resource_id'], ['resource.id'], ),
        sa.ForeignKeyConstraint(['image_resource_id'], ['resource.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.ForeignKeyConstraint(['walkthrough_id'], ['draft_walkthrough.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_slide_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=False),
        sa.Column('text', sa.Unicode(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('slide_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['slide_id'], ['draft_slide.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_hotspot',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('display', postgresql.JSON(), nullable=False),
        sa.Column('action', postgresql.JSON(), nullable=False),
        sa.Column('hotspot_type', sa.Unicode(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('slide_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['slide_id'], ['draft_slide.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_hotspot_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('callout', postgresql.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('hotspot_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['hotspot_id'], ['draft_hotspot.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'walkthrough', sa.Column('draft_id', sa.Integer(), nullable=True))

    # Copy all walkthroughs to draft table pointing each records in walkthrough table with draft table records
    walkthroughs = session.query(Walkthrough).all()

    for wt in walkthroughs:
        wt_query = bind.execute(
            """insert into draft_walkthrough(slug, resource_hostname, "order", slide_transition_effect, is_enabled, is_deleted, tenant_id, section_id, created_at, modified_at) values (%(slug)s, %(resource_hostname)s, %(order)s, %(slide_transition_effect)s, %(is_enabled)s, %(is_deleted)s, %(tenant_id)s, %(section_id)s, %(created_at)s, %(modified_at)s) returning draft_walkthrough.id""", dict(slug=wt.slug, resource_hostname=wt.resource_hostname, order=wt.order, slide_transition_effect=wt.slide_transition_effect, is_enabled=wt.is_enabled, is_deleted=wt.is_deleted, tenant_id=wt.tenant_id, section_id=wt.section_id, created_at=wt.created_at, modified_at=wt.modified_at)
        )
        draft_wt_id = wt_query.fetchone()[0]
        bind.execute("""update walkthrough set draft_id=%d where id=%d""" % (draft_wt_id, wt.id))

        wt_translations = session.query(WalkthroughTranslations).filter_by(walkthrough_id=wt.id).all()
        for trans in wt_translations:
            bind.execute(
                """insert into draft_walkthrough_translations(name, title, created_at, modified_at, walkthrough_id, language_id) values (%(name)s, %(title)s, %(created_at)s, %(modified_at)s, %(walkthrough_id)s, %(language_id)s)""", dict(name=trans.name, title=trans.title, created_at=trans.created_at, modified_at=trans.modified_at, walkthrough_id=draft_wt_id, language_id=trans.language_id)
            )

        slides = session.query(Slide).filter_by(walkthrough_id=wt.id).all()

        for slide in slides:
            slide_query = bind.execute(
                """insert into draft_slide("order", created_at, modified_at, walkthrough_id, tenant_id, image_resource_id, av_resource_id) values (%(order)s, %(created_at)s, %(modified_at)s, %(walkthrough_id)s, %(tenant_id)s, %(image_resource_id)s, %(av_resource_id)s) returning draft_slide.id""", dict(order=slide.order, created_at=slide.created_at, modified_at=slide.modified_at, walkthrough_id=draft_wt_id, tenant_id=slide.tenant_id, image_resource_id=slide.image_resource_id, av_resource_id=slide.av_resource_id)
            )
            draft_slide_id = slide_query.fetchone()[0]

            slide_translations = session.query(SlideTranslations).filter_by(slide_id=slide.id).all()
            for trans in slide_translations:
                bind.execute(
                    """insert into draft_slide_translations(name, text, created_at, modified_at, slide_id, language_id) values (%(name)s, %(text)s, %(created_at)s, %(modified_at)s, %(slide_id)s, %(language_id)s)""", dict(name=trans.name, text=trans.text, created_at=trans.created_at, modified_at=trans.modified_at, slide_id=draft_slide_id, language_id=trans.language_id)
                )

            hotspots = session.query(Hotspot).filter_by(slide_id=slide.id).all()

            for hotspot in hotspots:
                hotspot_query = bind.execute(
                    """insert into draft_hotspot(display, action, hotspot_type, created_at, modified_at, slide_id, tenant_id) values (%(display)s, %(action)s, %(hotspot_type)s, %(created_at)s, %(modified_at)s, %(slide_id)s, %(tenant_id)s) returning draft_hotspot.id""", dict(display=json.dumps(hotspot.display), action=json.dumps(hotspot.action), hotspot_type=hotspot.hotspot_type, created_at=hotspot.created_at, modified_at=hotspot.modified_at, slide_id=draft_slide_id, tenant_id=hotspot.tenant_id))
                draft_hotspot_id = hotspot_query.fetchone()[0]

                hotspot_translations = session.query(HotspotTranslations).filter_by(hotspot_id=hotspot.id).all()
                for trans in hotspot_translations:
                    bind.execute(
                        """insert into draft_hotspot_translations(callout, created_at, modified_at, hotspot_id, language_id) values (%(callout)s, %(created_at)s, %(modified_at)s, %(hotspot_id)s, %(language_id)s)""", dict(callout=json.dumps(trans.callout), created_at=trans.created_at, modified_at=trans.modified_at, hotspot_id=draft_hotspot_id, language_id=trans.language_id)
                    )

    op.alter_column(
        'walkthrough', 'draft_id',
        existing_type=sa.INTEGER(),
        nullable=False
    )
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column(u'walkthrough', 'draft_id')
    op.drop_table('draft_hotspot_translations')
    op.drop_table('draft_hotspot')
    op.drop_table('draft_slide_translations')
    op.drop_table('draft_slide')
    op.drop_table('draft_walkthrough_translations')
    op.drop_table('draft_walkthrough')
    # end Alembic commands #


def downgrade_reports():
    pass
