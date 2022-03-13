from datetime import datetime
from sqlalchemy import event
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db, Base, I18nBase


def clear_section_cache(mapper, connection, target):
    from sharedemos.tasks import delete_api_cache_data
    for section in target.cta.sections:
        delete_api_cache_data.delay({
            'entity': 'section',
            'model_id': section.id,
            'tenant_id': section.tenant_id,
            'delete_pattern': True
        })


class Leads(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    report_user_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'),
                               nullable=False)
    user_data = db.Column(MutableDict.as_mutable(JSON), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           nullable=False)
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow, nullable=False)

    tenant = db.relationship(
        "Tenant", backref=db.backref("leads", cascade="all, delete-orphan"))
    product = db.relationship(
        "Section",
        backref=db.backref("leads_product", cascade="all, delete-orphan"),
        foreign_keys=product_id)
    section = db.relationship(
        "Section",
        backref=db.backref("leads_section", cascade="all, delete-orphan"),
        foreign_keys=section_id)
    walkthrough = db.relationship(
        "Walkthrough",
        backref=db.backref("leads", cascade="all, delete-orphan"))


class LeadCTAForm(I18nBase):
    id = db.Column(db.Integer, primary_key=True)

    cta_type = db.Column(db.Unicode, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    sections = db.relationship("Section", secondary="sections_cta",
                               backref="cta_list")

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    tenant = db.relationship("Tenant")
    translations = db.relationship("CTATranslations", backref="cta",
                                   cascade="all, delete-orphan")
    homepage_banner = db.relationship(
        "HomepageBanner",
        secondary="homepage_banner_cta",
        backref="cta_list"
    )

    def __unicode__(self):
        """CTA repr."""
        for t in self.translations:
            if t.language_id == self.tenant.default_locale_id:
                return unicode(t.name)
        return ''

    def __repr__(self):
        """CTA repr."""
        return self.__unicode__()


class CTATranslations(Base):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    cta_button = db.Column(MutableDict.as_mutable(JSON))

    cta_id = db.Column(db.Integer, db.ForeignKey('lead_cta_form.id'),
                       nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    languages = db.relationship("Languages", backref='cta_translations')


class CTAActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    cta_id = db.Column(db.Integer, db.ForeignKey('lead_cta_form.id'),
                       nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'),
                        nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)

    product_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)


event.listen(CTATranslations, 'after_insert', clear_section_cache)
event.listen(CTATranslations, 'after_update', clear_section_cache)
