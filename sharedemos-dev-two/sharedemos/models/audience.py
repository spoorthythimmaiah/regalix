from uuid import uuid4
from sqlalchemy import UniqueConstraint
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.hybrid import hybrid_property

from sharedemos.models import db


def generate_uuid():
    unique_id = unicode(uuid4()).replace('-', '')
    return unique_id


class AudienceCompany(db.Model):

    __tablename__ = 'audience_companies'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    website_url = db.Column(db.Unicode, nullable=False)
    message = db.Column(db.Unicode, nullable=False)
    unique_link_id = db.Column(db.Unicode, default=generate_uuid, nullable=False)
    logo_url = db.Column(db.Unicode)
    expire_at = db.Column(db.DateTime)

    is_enabled = db.Column(db.Boolean, nullable=False, default=True)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant = db.relationship("Tenant", backref="companies")

    def __repr__(self):
        return unicode(self.name)


class AudienceEmployee(db.Model):

    __tablename__ = 'audience_employees'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.Unicode, nullable=False)
    last_name = db.Column(db.Unicode, nullable=False)
    email = db.Column(db.String(120), nullable=False)
    password = db.Column(db.Unicode)
    unique_user_id = db.Column(db.Unicode, unique=True, nullable=False, default=generate_uuid)
    email_sent = db.Column(db.Boolean, nullable=False, default=False)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey('audience_companies.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant = db.relationship("Tenant", backref="audience_companies")
    company = db.relationship("AudienceCompany",
                              backref=db.backref("audience_employees", cascade="all, delete-orphan", order_by=created_at))

    __table_args__ = (
        UniqueConstraint('email', 'company_id', name='_company_employee_email'),
    )

    @hybrid_property
    def initials(self):
        initials = (self.first_name or 'Anonymous')[:1]
        if self.last_name:
            initials += self.last_name[:1]
        elif self.first_name:
            initials = self.first_name[:2]
        return unicode(initials).upper()


class AudienceSection(db.Model):

    __tablename__ = 'audience_sections'

    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    company_id = db.Column(db.Integer, db.ForeignKey('audience_companies.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    section = db.relationship("Section")
    company = db.relationship("AudienceCompany",
                              backref=db.backref(
                                  "audience_sections_list",
                                  cascade="all, delete-orphan",
                                  order_by=created_at))
    tenant = db.relationship("Tenant")

    def __unicode__(self):
        return unicode(self.section)

    def __repr__(self):
        return self.__unicode__()
