from datetime import datetime
from sharedemos.models import db


class HomepageBanner(db.Model):

    __tablename__ = 'homepage_banner'

    id = db.Column(db.Integer, primary_key=True)

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    modified_at = db.Column(db.DateTime, default=datetime.utcnow,
                            onupdate=datetime.utcnow, nullable=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    modified_by = db.Column(
        db.Integer,
        db.ForeignKey('users.id')
    )

    translations = db.relationship(
        "HomepageBannerTranslations",
        backref="homepage_banner",
        cascade="all, delete-orphan"
    )

    tenant = db.relationship(
        "Tenant",
        backref=db.backref(
            "homepage_banner",
            cascade="all , delete-orphan",
            uselist=False
        )
    )

    def __unicode__(self):
        for trans in self.translations:
            if trans.language_id == self.tenant.default_locale_id:
                return unicode(trans.title)
        return u''

    def __repr__(self):
        """Homepage Banner repr."""
        return self.__unicode__().encode('utf-8')


class HomepageBannerTranslations(db.Model):

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.Unicode)

    description = db.Column(db.Unicode)

    banner_id = db.Column(db.Integer, db.ForeignKey('homepage_banner.id'),
                          nullable=False)

    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)

    resource_id = db.Column(db.Integer, db.ForeignKey('resource.id'))

    background_image_id = db.Column(db.Integer, db.ForeignKey('resource.id'))

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    modified_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    resource = db.relationship(
        "Resource",
        uselist=False,
        single_parent=True,
        foreign_keys=[resource_id]
    )

    background_image = db.relationship(
        "Resource",
        uselist=False,
        single_parent=True,
        foreign_keys=[background_image_id]
    )


class HomepageBannerCTA(db.Model):

    __tablename__ = 'homepage_banner_cta'

    cta_id = db.Column(
        db.Integer, db.ForeignKey('lead_cta_form.id'),
        nullable=False,
        primary_key=True
    )

    banner_id = db.Column(
        db.Integer,
        db.ForeignKey('homepage_banner.id'),
        nullable=False,
        primary_key=True
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    banner = db.relationship("HomepageBanner")

    cta = db.relationship("LeadCTAForm")

    def __unicode__(self):
        return unicode(self.banner) + ' ' + unicode(self.cta)

    def __repr__(self):
        """Home Page Banner CTA repr."""
        return self.__unicode__()
