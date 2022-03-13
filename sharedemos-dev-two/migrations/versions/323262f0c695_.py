"""empty message

Revision ID: 323262f0c695
Revises: 18933d866046
Create Date: 2019-07-01 09:55:29.460117

"""

# revision identifiers, used by Alembic.
revision = '323262f0c695'
down_revision = '240ae39b19c1'
branch_labels = None
depends_on = None

import urlparse

from alembic import op
import sqlalchemy as sa
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import sessionmaker, relationship, backref

from datetime import datetime

Session = sessionmaker()
Base = declarative_base()
bind = None
session = None


class Tenant(Base):

    __tablename__ = 'tenant'

    id = sa.Column(sa.Integer, primary_key=True, nullable=False)
    default_locale_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'),
                                  default=u'en_US', nullable=False)


class Languages(Base):

    __tablename__ = 'languages'

    id = sa.Column(sa.Unicode, primary_key=True, nullable=False)
    name = sa.Column(sa.Unicode, nullable=False)


class SlugRevision(Base):

    __tablename__ = 'slug_revisions'

    id = sa.Column(sa.Integer, primary_key=True)
    old_slug = sa.Column(sa.Unicode, nullable=False)
    new_slug = sa.Column(sa.Unicode, nullable=False)
    entity_type = sa.Column(sa.Unicode, nullable=False, default=unicode("section"))
    entity_id = sa.Column(sa.Integer, nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)


class Section(Base):

    __tablename__ = 'section'

    id = sa.Column(sa.Integer, primary_key=True)
    slug = sa.Column(sa.Unicode)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    order = sa.Column(sa.Integer, nullable=False)
    parent_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'),
                          default=None)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'),
                          nullable=False)
    created_at = sa.Column(sa.DateTime, default=datetime.utcnow,
                           nullable=False)
    parent = relationship("Section",
                          backref=backref('children',
                                          cascade_backrefs=False,
                                          order_by='Section.order, Section.created_at'
                                          ),
                          remote_side=[id],
                          foreign_keys=parent_id)
    translations = relationship("SectionTranslations",
                                backref="section",
                                cascade="all, delete-orphan")

class SectionTranslations(Base):

    __tablename__ = 'section_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'),
                           nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'),
                            nullable=False)

def get_category(section):
    if section.parent_id:
        return get_category(section.parent)
    return section

class Playlist(Base):

    __tablename__ = 'playlist'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'), default=None)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    section = relationship("Section",
                           backref=backref('playlists', cascade_backrefs=False,
                                           order_by='Playlist.order'),
                           foreign_keys=section_id)

class Walkthrough(Base):

    __tablename__ = 'walkthrough'

    id = sa.Column(sa.Integer, primary_key=True)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'),
                          nullable=False)
    slug = sa.Column(sa.Unicode, unique=True, nullable=True)
    order = sa.Column(sa.Integer, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    translations = relationship("WalkthroughTranslations",
                                backref="walkthrough",
                                cascade="all, delete-orphan")

class WalkthroughTranslations(Base):

    __tablename__ = 'walkthrough_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'),
                            nullable=False)
    walkthrough_id = sa.Column(sa.Unicode, sa.ForeignKey('walkthrough.id'),
                               nullable=False)

class BulletinBoard(Base):

    __tablename__ = 'bulletin_board'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'),
                          nullable=False)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)
    translations = relationship("BulletinBoardTranslations",
                                backref=backref('bulletin_board'))

class BulletinBoardTranslations(Base):

    __tablename__ = 'bulletin_board_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    bulletin_board_id = sa.Column(sa.Integer,
                                  sa.ForeignKey('bulletin_board.id'), nullable=False)
    name = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode)
    links = sa.Column(postgresql.JSON(), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'),
                            nullable=False)


class BulletinBoardLinks(Base):

    __tablename__ = 'bulletin_board_links'

    id = sa.Column(sa.Integer, primary_key=True)
    bulletin_board_id = sa.Column(sa.Integer,
                                  sa.ForeignKey('bulletin_board.id'),
                                  nullable=False)
    link_type = sa.Column(sa.Unicode, nullable=False)
    order = sa.Column(sa.Integer, nullable=False)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    product_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'))
    section_id = sa.Column(sa.Integer, sa.ForeignKey('section.id'))
    walkthrough_id = sa.Column(sa.Integer, sa.ForeignKey('walkthrough.id'))
    is_deleted = sa.Column(sa.Boolean, default=False,
                           nullable=False)
    bulletin_board = relationship(
        "BulletinBoard",
        backref=backref('bulletin_board_links',
                        cascade="all, delete-orphan"))

class BulletinBoardLinksTranslations(Base):

    __tablename__ = 'bulletin_board_links_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    bulletin_board_link_id = sa.Column(sa.Integer,
                                       sa.ForeignKey('bulletin_board_links.id'))
    title = sa.Column(sa.Unicode, nullable=True)
    link = sa.Column(sa.Unicode, nullable=True)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'),
                            nullable=False)
    bulletin_board_link = relationship(
        "BulletinBoardLinks",
        backref=backref('bulletin_board_links_translations',
                        cascade="all, delete-orphan"))


def get_latest_entity(session, tenant_id, slug, entity_type):
    old_entity = session.query(SlugRevision).filter(
        (SlugRevision.tenant_id == tenant_id) &
        (SlugRevision.entity_type == entity_type) &
        (SlugRevision.old_slug == slug)).first()
    entity = None
    if old_entity:
        if entity_type == unicode('section'):
            entity = session.query(Section).filter_by(
                tenant_id=tenant_id,
                slug=old_entity.new_slug,
                is_deleted=False).first()
        elif entity_type == unicode('walkthrough'):
            entity = session.query(Walkthrough).filter_by(
                tenant_id=tenant_id,
                slug=old_entity.new_slug,
                is_deleted=False
            ).first()
    return entity


def get_section(slug, tenant_id, session):
    section = session.query(Section).filter(
        Section.tenant_id == tenant_id,
        Section.slug == slug).first()
    if not section:
        section = get_latest_entity(
            session,
            tenant_id=tenant_id,
            slug=slug,
            entity_type=unicode("section")
        )
    section_id = section.id if section else None
    return section_id


def get_chapter(slug, tenant_id, session):
    chapter = session.query(Walkthrough).filter(
        Walkthrough.tenant_id == tenant_id,
        Walkthrough.slug == slug
    ).first()
    if not chapter:
        chapter = get_latest_entity(
            session,
            tenant_id=tenant_id,
            slug=slug,
            entity_type=unicode("walkthrough")
        )
    chapter_id = chapter.id if chapter else None
    return chapter_id


def get_translation(entity, locale_id):
    for trans in entity.translations:
        if trans.language_id == locale_id:
            return trans.name


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    op.create_table(
        'bulletin_board_links',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('bulletin_board_id', sa.Integer(), nullable=False),
        sa.Column('link_type', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer()),
        sa.Column('section_id', sa.Integer()),
        sa.Column('walkthrough_id', sa.Integer()),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(['bulletin_board_id'], ['bulletin_board.id'], ),
        sa.ForeignKeyConstraint(['product_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'bulletin_board_links_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('bulletin_board_link_id', sa.Integer(), nullable=False),
        sa.Column('title', sa.Unicode()),
        sa.Column('link', sa.Unicode()),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['bulletin_board_link_id'], ['bulletin_board_links.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    bind = op.get_bind()
    session = Session(bind=bind)
    bulletin_boards = session.query(BulletinBoard).all()
    tenant_locales = {}
    for bboard in bulletin_boards:
        tenant_id = bboard.tenant_id
        if not tenant_locales.get(tenant_id):
            tenant = session.query(Tenant).filter(Tenant.id == tenant_id).first()
            tenant_locales[tenant_id] = tenant.default_locale_id
        for translation in bboard.translations:
            if translation.language_id != tenant_locales.get(tenant_id) or\
                    not translation.links:
                continue
            for link in translation.links:
                bblink = BulletinBoardLinks()
                bblink.link_type = link['type']
                bblink.bulletin_board_id = bboard.id
                bblink.tenant_id = tenant_id
                bblink.order = link['order']
                if link['type'] == u'internal':
                    product_id = section_id = chapter_id = None
                    url = link.get('url')
                    # if link_type is internal we will not store link.
                    # we will build url when we render the link.
                    # we store walkthrough_id/section_id based on the slug info.
                    if not url:
                        continue
                    parse_url = urlparse.urlparse(url)
                    slug_list = parse_url.path.split('/')[2:]

                    if len(slug_list) == 3:
                        chapter_id = get_chapter(slug_list[2], tenant_id, session)
                        section_id = get_section(slug_list[1], tenant_id, session)
                        product_id = get_section(slug_list[0], tenant_id, session)

                    elif len(slug_list) == 2:
                        # if length of slug_list is two.there are two possibility.
                        # case-one:Category/section
                        # case-two: Category/chapter
                        section_id = get_section(slug_list[1], tenant_id, session)
                        if not section_id:
                            chapter_id = get_chapter(slug_list[1], tenant_id, session)
                        product_id = get_section(slug_list[0], tenant_id, session)
                    else:
                        product_id = get_section(slug_list[0], tenant_id, session)
                    bblink.section_id = section_id
                    bblink.walkthrough_id = chapter_id
                    bblink.product_id = product_id
                else:
                    bblink_trans = BulletinBoardLinksTranslations()
                    bblink_trans.title = link.get('title')
                    bblink_trans.link = link.get('url')
                    bblink_trans.language_id = translation.language_id
                    bblink_trans.bulletin_board_link = bblink
                    session.add(bblink_trans)
                session.add(bblink)
            translation.links = []
            session.add(translation)
        session.commit()
    op.drop_column(u'bulletin_board_translations', 'links')


def downgrade_():
    op.add_column(u'bulletin_board_translations',
                  sa.Column('links', postgresql.JSON(),
                            autoincrement=False, nullable=True))
    bind = op.get_bind()
    session = Session(bind=bind)
    bulletin_boards = session.query(BulletinBoard).all()
    for b_board in bulletin_boards:
        tenant = session.query(Tenant).filter(
            Tenant.id == b_board.tenant_id
        ).first()
        locale_id = tenant.default_locale_id
        for bb_trans in b_board.translations:
            all_links = []
            links = b_board.bulletin_board_links
            for link in links:
                if link.is_deleted:
                    continue
                tenant_id = link.bulletin_board.tenant_id
                link_detail = {}
                url = bread_crumb = ''
                link_detail['order'] = link.order
                link_detail['type'] = link.link_type
                link_detail['section_id'] = link.section_id
                link_detail['walkthrough_id'] = link.walkthrough_id
                if link.link_type == u'external':
                    bblink_trans = session.query(BulletinBoardLinksTranslations).filter(
                        BulletinBoardLinksTranslations.bulletin_board_link_id == link.id,
                        BulletinBoardLinksTranslations.language_id == locale_id,
                    ).all()
                    for trans in bblink_trans:
                        link_detail['title'] = trans.title
                        link_detail['url'] = trans.link
                        link_detail['language_id'] = trans.language_id

                elif link.link_type == u'internal':
                    if link.walkthrough_id:
                        chapter = session.query(Walkthrough).filter(
                            Walkthrough.tenant_id == tenant_id,
                            Walkthrough.is_deleted.__eq__(False),
                            Walkthrough.id == link.walkthrough_id
                        ).first()
                        product = session.query(Section).filter(
                            Section.tenant_id == tenant_id,
                            Section.is_deleted.__eq__(False),
                            Section.id == link.product_id
                        ).first()
                        url = '/t/{}/{}'.format(
                            product.slug,
                            chapter.slug
                        )
                        product_name = get_translation(product, locale_id)
                        chapter_name = get_translation(chapter, locale_id)
                        bread_crumb = '{} > {} > {}'.format(
                            'Home',
                            product_name,
                            chapter_name
                        )
                        if link.section_id:
                            section = session.query(Section).filter(
                                Section.tenant_id == tenant_id,
                                Section.is_deleted.__eq__(False),
                                Section.id == link.section_id
                            ).first()
                            if section:
                                url = '/t/{}/{}/{}'.format(
                                    product.slug,
                                    section.slug,
                                    chapter.slug
                                )
                                section_name = get_translation(section, locale_id)
                                bread_crumb = '{} > {} > {} > {}'.format(
                                    'Home',
                                    product_name,
                                    section_name,
                                    chapter_name
                                )
                        link_detail['url'] = url
                        link_detail['bread_crumb'] = bread_crumb
                    elif link.section_id and not link.walkthrough_id:
                        section = session.query(Section).filter(
                            Section.tenant_id == tenant_id,
                            Section.is_deleted.__eq__(False),
                            Section.id == link.section_id
                        ).first()
                        product = session.query(Section).filter(
                            Section.tenant_id == tenant_id,
                            Section.is_deleted.__eq__(False),
                            Section.id == link.product_id
                        ).first()
                        url = '/t/{}/{}'.format(
                            product.slug,
                            section.slug
                        )
                        product_name = get_translation(product, locale_id)
                        section_name = get_translation(section, locale_id)
                        bread_crumb = '{} > {} > {}'.format(
                            'Home',
                            product_name,
                            section_name
                        )
                        link_detail['url'] = url
                        link_detail['bread_crumb'] = bread_crumb
                    elif link.product_id and not(link.section_id and link.walkthrough_id):
                        product = session.query(Section).filter(
                            Section.tenant_id == tenant_id,
                            Section.is_deleted.__eq__(False),
                            Section.id == link.product_id
                        ).first()
                        url = '/t/{}'.format(
                            product.slug
                        )
                        product_name = get_translation(product, locale_id)
                        bread_crumb = '{} > {}'.format(
                            'Home',
                            product_name
                        )
                        link_detail['url'] = url
                        link_detail['bread_crumb'] = bread_crumb
                all_links.append(link_detail)
            bb_trans.links = all_links
            session.add(bb_trans)
        session.commit()
    op.drop_table('bulletin_board_links_translations')
    op.drop_table('bulletin_board_links')


def upgrade_reports():
    ### commands auto generated by Alembic - please adjust! ###
    pass
    ### end Alembic commands ###


def downgrade_reports():
    ### commands auto generated by Alembic - please adjust! ###
    pass
    ### end Alembic commands ###
