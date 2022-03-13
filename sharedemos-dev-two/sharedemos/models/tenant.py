import os
from datetime import datetime

from flask import current_app, render_template, request

from sqlalchemy import event
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.ext.declarative import declared_attr

from sharedemos.models import db
from sharedemos.libs.api import delete_cache_with_pattern
from sharedemos.libs.helpers import (
    get_random_string,
    log_last_activity,
    remove_pdf
)


def create_theme(mapper, connection, target):
    if target.tenant:
        # Create tenant theme as css file
        remove_theme(mapper, connection, target)
        theme_folder = os.path.join(current_app.config['MEDIA_FOLDER'],
                                    'theme')

        # check and create leaf node
        if not os.path.exists(theme_folder):
            os.makedirs(theme_folder)

        theme_file = os.path.join(theme_folder, str(target.id) + '.css')
        with open(theme_file, 'w') as theme_writer:
            theme_writer.write(render_template('theme.html', theme=target))
            theme_writer.close()


def remove_theme(mapper, connection, target):
    # Delete tenant theme
    try:
        theme_file = os.path.join(current_app.config['MEDIA_FOLDER'], 'theme',
                                  str(target.id) + '.css')
        os.remove(theme_file)
    except OSError:
        pass


def add_tenant_unique_id(mapper, connection, target):
    if not target.unique_tenant_id:
        target.unique_tenant_id = get_random_string(length=6)


def create_update_report_tenant(mapper, connection, target):
    if request.method == 'GET':
        return

    from sharedemos.tasks import (
        create_update_tenant,
        delete_api_cache_data,
    )
    tenant_model = target
    create_update_tenant.delay({
        'id': tenant_model.id,
        'name': unicode(tenant_model.name),
        'domain': unicode(tenant_model.domain),
        'title': unicode(tenant_model.title or ''),
        'timezone': unicode(
            tenant_model.timezone or
            current_app.config['DEFAULT_TIMEZONE']),
        'default_locale': target.default_locale_id,
    })
    delete_api_cache_data.delay({
        'entity': 'tenant',
        'tenant_id': tenant_model.id,
    })
    log_last_activity('updated', 'tenant', tenant_model,
                      tenant_id=tenant_model.id)


def delete_cache_and_assets(mapper, connection, target):
    delete_cache_with_pattern(delete_entity_type='tenant',
                              tenant=target.tenant)
    delete_cache_with_pattern(delete_entity_type='section',
                              tenant=target.tenant)
    delete_cache_with_pattern(delete_entity_type='walkthrough',
                              tenant=target.tenant)
    remove_pdf()


class Tenant(db.Model):

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    title = db.Column(db.Unicode)
    domain = db.Column(db.Unicode, nullable=False, unique=True)
    analytics = db.Column(db.Unicode)
    logo = db.Column(db.Unicode)
    favicon = db.Column(db.Unicode)
    campaign_tracking_code = db.Column(db.Unicode)
    privacy_link = db.Column(db.Unicode)
    timezone = db.Column(db.Unicode, nullable=False)
    default_locale_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                                  default=u'en_US', nullable=False)
    description = db.Column(db.Unicode, default=None)
    template = db.Column(db.Unicode, default=u'box')
    crm_settings = db.Column(MutableDict.as_mutable(JSON))
    unique_tenant_id = db.Column(db.Unicode, unique=True)

    # SAML specific details
    sp_public_certificate = db.Column(db.Text)
    sp_private_key = db.Column(db.Text)

    idp_entity_id = db.Column(db.Unicode)
    idp_url = db.Column(db.Unicode)
    idp_x509cert = db.Column(db.Text)
    idp_first_name = db.Column(db.Unicode)
    idp_last_name = db.Column(db.Unicode)
    idp_username = db.Column(db.Unicode)
    idp_email = db.Column(db.Unicode)
    idp_usertype = db.Column(db.Unicode)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    user_groups = db.relationship(
        "UserGroup",
        backref="tenant",
        order_by="UserGroup.name"
    )
    theme = db.relationship("TenantTheme", uselist=False, backref="tenant",
                            cascade="all, delete-orphan")
    flags = db.relationship("TenantFlags", uselist=False, backref="tenant",
                            cascade="all, delete-orphan")
    default_locale = db.relationship("Languages")
    supported_locales = db.relationship("Languages",
                                        secondary="tenant_language",
                                        backref="tenants")

    @classmethod
    def get_tenant_for_domain(cls, domain):
        tenant = Tenant.query.filter_by(domain=unicode(domain)).first()
        return tenant.id if tenant else None

    @hybrid_method
    def is_app_subscribed(self, app_id):
        app_list = [app.unique_id.upper() for app in self.applications]
        return True if app_id.upper() in app_list else False

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()


class TenantTheme(db.Model):

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    background_color = db.Column(db.Unicode, nullable=False)
    progress_bar_color = db.Column(db.Unicode, nullable=False)
    title_color = db.Column(db.Unicode, nullable=False)
    paragraph_color = db.Column(db.Unicode, nullable=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class TenantLanguage(db.Model):

    __tablename__ = 'tenant_language'

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False, primary_key=True)
    language_id = db.Column(db.Integer, db.ForeignKey('languages.id'),
                            nullable=False, primary_key=True)
    is_public = db.Column(db.Boolean, nullable=False, default=True)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant = db.relationship("Tenant",
                             backref=db.backref('tenant_languages',
                                                cascade="all, delete-orphan"))
    language = db.relationship("Languages",
                               backref=db.backref('tenant_languages',
                                                  cascade="all, delete-orphan")
                               )

    def __unicode__(self):
        return unicode(self.tenant.name + ' ' + self.language.name)

    def __repr__(self):
        return self.__unicode__()


class TenantFlags(db.Model):

    __tablename__ = 'tenant_flags'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    allow_offline = db.Column(db.Boolean, default=False, nullable=False)
    box_integration_enabled = db.Column(db.Boolean, default=False,
                                        nullable=False)
    can_download = db.Column(db.Boolean, default=False, nullable=False)
    can_embed = db.Column(db.Boolean, default=False, nullable=False)
    cdn_enable = db.Column(db.Boolean, default=False, nullable=False)
    chapter_autoflow = db.Column(db.Boolean, default=False, nullable=False)
    is_algolia_analytics_enabled = db.Column(db.Boolean, default=False,
                                             nullable=False)
    is_announcement_widget_enabled = db.Column(db.Boolean, default=False, nullable=False)
    is_private = db.Column(db.Boolean, default=False, nullable=False)
    show_notes = db.Column(db.Boolean, default=False, nullable=False)
    enable_homepage_banner = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)


class TenantHeaderFooterMixin(object):

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))


class TenantHeader(TenantHeaderFooterMixin, db.Model):

    __tablename__ = 'tenant_header'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    translations = db.relationship("TenantHeaderTranslations", backref="tenant_header",
                                   cascade="all, delete-orphan")
    tenant = db.relationship("Tenant",
                             backref=db.backref('tenant_header',
                                                cascade="all, delete-orphan"))


class TenantFooter(TenantHeaderFooterMixin, db.Model):

    __tablename__ = 'tenant_footer'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    translations = db.relationship("TenantFooterTranslations", backref="tenant_footer",
                                   cascade="all, delete-orphan")
    tenant = db.relationship("Tenant",
                             backref=db.backref('tenant_footer',
                                                cascade="all, delete-orphan"))


class HeaderFooterTranslationMixin(object):

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")


class TenantHeaderTranslations(HeaderFooterTranslationMixin, db.Model):

    __tablename__ = 'tenant_header_translations'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    header_id = db.Column(db.Integer, db.ForeignKey('tenant_header.id'),
                          nullable=False)

    title = db.Column(db.Unicode)


class TenantFooterTranslations(HeaderFooterTranslationMixin, db.Model):

    __tablename__ = 'tenant_footer_translations'

    id = db.Column(db.Integer, primary_key=True, nullable=False)

    footer_id = db.Column(db.Integer, db.ForeignKey('tenant_footer.id'),
                          nullable=False)

    links = db.Column(JSON(none_as_null=True))

    text = db.Column(db.Unicode)


event.listen(Tenant, 'before_insert', add_tenant_unique_id)
event.listen(Tenant, 'after_insert', create_update_report_tenant)
event.listen(Tenant, 'after_update', create_update_report_tenant)
event.listen(TenantFlags, 'after_update', delete_cache_and_assets)
event.listen(TenantTheme, 'after_insert', create_theme)
event.listen(TenantTheme, 'after_update', create_theme)
event.listen(TenantTheme, 'after_delete', remove_theme)
event.listen(TenantLanguage, 'after_insert', delete_cache_and_assets)
event.listen(TenantLanguage, 'after_update', delete_cache_and_assets)
event.listen(TenantLanguage, 'after_delete', delete_cache_and_assets)
event.listen(TenantHeader, 'after_insert', delete_cache_and_assets)
event.listen(TenantHeader, 'after_update', delete_cache_and_assets)
event.listen(TenantHeader, 'after_delete', delete_cache_and_assets)
event.listen(TenantFooter, 'after_insert', delete_cache_and_assets)
event.listen(TenantFooter, 'after_update', delete_cache_and_assets)
event.listen(TenantFooter, 'after_delete', delete_cache_and_assets)
