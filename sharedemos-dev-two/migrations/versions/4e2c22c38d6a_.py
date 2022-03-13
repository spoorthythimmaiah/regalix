"""empty message

Revision ID: 4e2c22c38d6a
Revises: 417ef4087e76
Create Date: 2016-12-12 09:31:51.673822

"""

# revision identifiers, used by Alembic.
revision = '4e2c22c38d6a'
down_revision = '417ef4087e76'
branch_labels = None
depends_on = None

from alembic import op
from flask import current_app
import itertools
import re
import sqlalchemy as sa
from unidecode import unidecode
from sqlalchemy.sql import text

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import sessionmaker, relationship
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
    template = sa.Column(sa.Unicode, default=u'default')
    crm_settings = sa.Column(MutableDict.as_mutable(postgresql.JSON()))
    unique_tenant_id = sa.Column(sa.Unicode, unique=True)

    # SAML specific details
    sp_public_certificate = sa.Column(sa.Text)
    sp_private_key = sa.Column(sa.Text)
    idp_entity_id = sa.Column(sa.Unicode)
    idp_url = sa.Column(sa.Unicode)
    idp_x509cert = sa.Column(sa.Text)

    idp_first_name = sa.Column(sa.Unicode)
    idp_last_name = sa.Column(sa.Unicode)
    idp_username = sa.Column(sa.Unicode)
    idp_email = sa.Column(sa.Unicode)

    box_integration_enabled = sa.Column(sa.Boolean, default=False, nullable=False)
    can_download = sa.Column(sa.Boolean, default=False, nullable=False)
    can_embed = sa.Column(sa.Boolean, default=False, nullable=False)
    allow_offline = sa.Column(sa.Boolean, default=False, nullable=False)
    chapter_autoflow = sa.Column(sa.Boolean, default=False, nullable=False)
    footer_text = sa.Column(sa.Unicode, default=None)

    is_algolia_analytics_enabled = sa.Column(sa.Boolean, default=False, nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class IconLibrary(Base):

    __tablename__ = 'icon_library'

    id = sa.Column(sa.Integer, primary_key=True)
    name = sa.Column(sa.Unicode, nullable=False)
    path = sa.Column(sa.Unicode, nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)
    tenant = relationship("Tenant", backref="icons")

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class Path(Base):

    __tablename__ = 'paths'

    id = sa.Column(sa.Integer, primary_key=True)
    order = sa.Column(sa.Integer, nullable=False, default=1)
    slug = sa.Column(sa.Unicode)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    question_id = sa.Column(sa.Integer, sa.ForeignKey('questions.id'))
    icon_id = sa.Column(sa.Integer, sa.ForeignKey('icon_library.id'), default=None)
    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    question = relationship("Question", backref='path')
    tenant = relationship("Tenant", backref='paths')
    icon = relationship("IconLibrary", cascade="all, delete-orphan", single_parent=True)

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == u'en_US':
                return translation.title
        return ''

    def __repr__(self):
        return self.__unicode__()


class PathTranslations(Base):

    __tablename__ = 'path_translations'

    id = sa.Column(sa.Integer, primary_key=True)
    title = sa.Column(sa.Unicode, nullable=False)           # Path title(ex: EUC, SDDC)
    description = sa.Column(sa.Unicode, nullable=False)     # path description

    path_id = sa.Column(sa.Integer, sa.ForeignKey('paths.id'), nullable=False)
    language_id = sa.Column(sa.Unicode, sa.ForeignKey('languages.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    path = relationship("Path", backref='translations')
    languages = relationship("Languages")


class Question(Base):

    __tablename__ = 'questions'

    id = sa.Column(sa.Integer, primary_key=True)
    is_enabled = sa.Column(sa.Boolean, default=True, nullable=False)
    is_deleted = sa.Column(sa.Boolean, default=False, nullable=False)

    tenant_id = sa.Column(sa.Integer, sa.ForeignKey('tenant.id'), nullable=False)

    created_at = sa.Column(sa.DateTime, default=current_timestamp(), nullable=False)
    modified_at = sa.Column(sa.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant = relationship("Tenant", backref='questions')

    def __unicode__(self):
        for translation in self.translations:
            if translation.language_id == u'en_US':
                return translation.text
        return ''

    def __repr__(self):
        return self.__unicode__()


def slugify(input_text, rec_id, model, tenant_id, slugfield="slug", delim=u'-', max_length=255):
    """Generates unique ASCII-only slug."""

    bind = op.get_bind()
    session = Session(bind=bind)

    # Characters to filter in slug name
    _punct_re = re.compile(r'[\t !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.:;~]+')

    result = []
    for word in _punct_re.split(input_text.lower()):
        result.extend(filter(None, _punct_re.split(unidecode(word))))
    slug_text = unicode(delim.join(result))[:max_length]

    # Filter model slugs in a tenant
    slug_records = session.query(model).filter(
        (model.tenant_id == tenant_id) &
        (text(slugfield + ' ~ :reg'))
    ).params(reg=slug_text)
    for slug_rec in slug_records:
        if slug_rec.id == rec_id:
            actual_slug, split_char, copies = slug_rec.slug.rpartition('-')
            if (copies.isdigit() and actual_slug == slug_text) or slug_rec.slug == slug_text:
                    # return if slug is unchanged or already appended with copy number
                    return slug_rec.slug

    # check records count using regex
    count = slug_records.count()
    new_slug = slug_text

    # change/append slug count if slug already exist
    for counter in itertools.count(count):
        # get record count for slug in a tenant
        if not session.query(model).filter_by(tenant_id=tenant_id).filter_by(**{slugfield: new_slug}).count():
            return new_slug

        new_slug = slug_text[:max_length - len(delim + str(counter))] + delim + str(counter)


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():

    bind = op.get_bind()
    session = Session(bind=bind)

    # commands auto generated by Alembic - please adjust! #
    op.add_column('paths', sa.Column('order', sa.Integer(), nullable=False, server_default='1'))
    op.add_column('paths', sa.Column('slug', sa.Unicode(), nullable=True))
    translations = session.query(PathTranslations).join(Path).filter(
        PathTranslations.language_id == u'en_US'
    ).all()
    for trans in translations:
        slug = slugify(trans.title, trans.path_id, Path, trans.path.tenant_id)
        bind.execute("update paths set slug='" + slug + "' where id=" + str(trans.path_id))
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column('paths', 'slug')
    op.drop_column('paths', 'order')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
