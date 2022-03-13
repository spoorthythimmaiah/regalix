"""empty message

Revision ID: 384807cc7dd5
Revises: bc481cdebdc
Create Date: 2016-01-15 20:21:38.907480

"""

# revision identifiers, used by Alembic.
revision = '384807cc7dd5'
down_revision = 'bc481cdebdc'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship, backref
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.sql.functions import current_timestamp


Session = sessionmaker()
Base = declarative_base()


class Languages(Base):

    __tablename__ = 'languages'

    id = sa.Column(sa.Unicode, primary_key=True, nullable=False)
    name = sa.Column(sa.Unicode, nullable=False)


class Tenant(Base):

    __tablename__ = 'tenant'

    id = sa.Column(sa.Integer, primary_key=True, nullable=False)
    name = sa.Column(sa.Unicode, nullable=False)
    title = sa.Column(sa.Unicode)
    domain = sa.Column(sa.Unicode, nullable=False)
    analytics = sa.Column(sa.Unicode)
    logo = sa.Column(sa.Unicode)
    favicon = sa.Column(sa.Unicode)
    campaign_tracking_code = sa.Column(sa.Unicode)
    privacy_link = sa.Column(sa.Unicode)
    timezone = sa.Column(sa.Unicode, nullable=False)
    is_private = sa.Column(sa.Boolean, default=False, nullable=False)
    description = sa.Column(sa.Unicode, default=None)

    # SAML specific details
    sp_public_certificate = sa.Column(sa.Text)
    sp_private_key = sa.Column(sa.Text)
    idp_entity_id = sa.Column(sa.Unicode)
    idp_url = sa.Column(sa.Unicode)
    idp_x509cert = sa.Column(sa.Text)


class Slide(Base):

    __tablename__ = 'slide'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    av_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    image_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    primary_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    secondary_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))


class DraftSlide(Base):

    __tablename__ = 'draft_slide'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('draft_walkthrough.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    image_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    av_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    primary_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))
    secondary_resource_id = sa.Column(sa.Integer, sa.ForeignKey('resource.id'))


class Hotspot(Base):

    __tablename__ = 'hotspot'

    id = sa.Column(sa.Integer, primary_key=True)
    display = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    action = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    hotspot_type = sa.Column(sa.Unicode, nullable=False)

    slide_id = sa.Column(sa.Integer, sa.ForeignKey('slide.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class HotspotTranslations(Base):

    __tablename__ = 'hotspot_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    callout = sa.Column(MutableDict.as_mutable(postgresql.JSON()))

    hotspot_id = sa.Column(sa.Integer, sa.ForeignKey('hotspot.id'), nullable=False)
    hotspot = relationship("Hotspot", backref=backref("translations", cascade="all, delete-orphan"))
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


class DraftHotspot(Base):

    __tablename__ = 'draft_hotspot'

    id = sa.Column(sa.Integer, primary_key=True)
    display = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    action = sa.Column(MutableDict.as_mutable(postgresql.JSON()), nullable=False)
    hotspot_type = sa.Column(sa.Unicode, nullable=False)

    slide_id = sa.Column(sa.Integer, sa.ForeignKey('draft_slide.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class DraftHotspotTranslations(Base):

    __tablename__ = 'draft_hotspot_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    callout = sa.Column(MutableDict.as_mutable(postgresql.JSON()))

    hotspot_id = sa.Column(sa.Integer, sa.ForeignKey('draft_hotspot.id'), nullable=False)
    hotspot = relationship("DraftHotspot", backref=backref("translations", cascade="all, delete-orphan"))
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


class Pin(Base):

    __tablename__ = 'pin'

    id = sa.Column(sa.Integer, primary_key=True)
    display = sa.Column(MutableDict.as_mutable(postgresql.JSON), nullable=False)
    order = sa.Column(sa.Integer, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    slide_id = sa.Column(sa.Integer, sa.ForeignKey('slide.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class PinTranslations(Base):

    __tablename__ = 'pin_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    callout = sa.Column(MutableDict.as_mutable(postgresql.JSON()))
    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    pin_id = sa.Column(sa.Integer, sa.ForeignKey('pin.id'), nullable=False)
    pin = relationship("Pin", backref=backref("translations", cascade="all, delete-orphan"))
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


class DraftPin(Base):

    __tablename__ = 'draft_pin'

    id = sa.Column(sa.Integer, primary_key=True)
    display = sa.Column(MutableDict.as_mutable(postgresql.JSON), nullable=False)
    order = sa.Column(sa.Integer, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    slide_id = sa.Column(sa.Integer, sa.ForeignKey('draft_slide.id'), nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class DraftPinTranslations(Base):

    __tablename__ = 'draft_pin_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    callout = sa.Column(MutableDict.as_mutable(postgresql.JSON()))
    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    pin_id = sa.Column(sa.Integer, sa.ForeignKey('draft_pin.id'), nullable=False)
    pin = relationship("DraftPin", backref=backref("translations", cascade="all, delete-orphan"))
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    bind = op.get_bind()
    session = Session(bind=bind)

    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'draft_pin',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('display', postgresql.JSON(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('slide_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['slide_id'], ['draft_slide.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_pin_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('callout', postgresql.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('pin_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['pin_id'], ['draft_pin.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pin',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('display', postgresql.JSON(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('slide_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['slide_id'], ['slide.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pin_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('callout', postgresql.JSON(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('pin_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['pin_id'], ['pin.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    draft_slides = dict()
    draft_hotspots = session.query(DraftHotspot).all()
    for hotspot in draft_hotspots:
        for trans in hotspot.translations:
            if trans.callout:
                """
                Change tooltip position referring attribute
                """
                if trans.callout.get('at'):
                    pos = trans.callout['at'].lower().split(' ')
                    trans.callout['tooltip_position'] = pos[0]
                    trans.callout.pop('at')
                trans.callout.pop('my', None)
                session.add(trans)

        if hotspot.hotspot_type == 'callout' and hotspot.display and hotspot.display.get('color') == 'transparent':
            """
            Migrate blank tooltip to new pin type hotspots
            """
            pin = DraftPin()
            if 'top' in hotspot.display:
                pin.display = MutableDict()
                pin.display['top'] = hotspot.display.get('top')

            if 'left' in hotspot.display:
                if pin.display is None:
                    pin.display = MutableDict()
                pin.display['left'] = hotspot.display.get('left')

            if hotspot.slide_id in draft_slides:
                pin.order = draft_slides[hotspot.slide_id] + 1
                draft_slides[hotspot.slide_id] += 1
            else:
                pin.order = 1
                draft_slides[hotspot.slide_id] = 1

            pin.tenant_id = hotspot.tenant_id
            pin.slide_id = hotspot.slide_id
            for translation in hotspot.translations:
                if translation.callout and translation.callout.get('text'):
                    pin_trans = DraftPinTranslations()
                    pin_trans.callout = MutableDict()
                    pin_trans.callout['body'] = translation.callout['text']
                    pin_trans.language_id = translation.language_id
                    pin_trans.pin = pin
                    session.add(pin_trans)
                    bind.execute("delete from draft_hotspot_translations where id = " + str(translation.id))

            session.add(pin)
            bind.execute("delete from draft_hotspot where id = " + str(hotspot.id))

    slides = dict()
    hotspots = session.query(Hotspot).all()
    for hotspot in hotspots:
        for trans in hotspot.translations:
            if trans.callout:
                """
                Change tooltip position referring attribute
                """
                if trans.callout.get('at'):
                    pos = trans.callout['at'].lower().split(' ')
                    trans.callout['tooltip_position'] = pos[0]
                    trans.callout.pop('at')
                trans.callout.pop('my', None)
                session.add(trans)

        if hotspot.hotspot_type == 'callout' and hotspot.display and hotspot.display.get('color') == 'transparent':
            """
            Migrate blank tooltip to new pin type hotspots
            """
            pin = Pin()
            if 'top' in hotspot.display:
                pin.display = MutableDict()
                pin.display['top'] = hotspot.display.get('top')

            if 'left' in hotspot.display:
                if pin.display is None:
                    pin.display = MutableDict()
                pin.display['left'] = hotspot.display.get('left')

            if hotspot.slide_id in slides:
                pin.order = slides[hotspot.slide_id] + 1
                slides[hotspot.slide_id] += 1
            else:
                pin.order = 1
                slides[hotspot.slide_id] = 1

            pin.tenant_id = hotspot.tenant_id
            pin.slide_id = hotspot.slide_id
            for translation in hotspot.translations:
                if translation.callout and translation.callout.get('text'):
                    pin_trans = PinTranslations()
                    pin_trans.callout = MutableDict()
                    pin_trans.callout['body'] = translation.callout['text']
                    pin_trans.language_id = translation.language_id
                    pin_trans.pin = pin
                    session.add(pin_trans)
                    bind.execute("delete from hotspot_translations where id = " + str(translation.id))

            session.add(pin)
            bind.execute("delete from hotspot where id = " + str(hotspot.id))

    session.commit()
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_table('pin_translations')
    op.drop_table('pin')
    op.drop_table('draft_pin_translations')
    op.drop_table('draft_pin')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
