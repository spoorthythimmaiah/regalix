from flask import current_app
from sqlalchemy import event, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.models import db


def delete_tenant_api_cache(mapper, connection, target):
    from sharedemos.tasks import delete_api_cache_data
    tenant_id = getattr(current_app, 'tenant_id', None)
    delete_api_cache_data.delay({
        'entity': 'tenant',
        'tenant_id': tenant_id,
    })
    delete_api_cache_data.delay({
        'entity': 'section',
        'tenant_id': tenant_id,
        'delete_pattern': True
    })


class TenantApplication(db.Model):

    __tablename__ = 'tenants_applications'

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False, primary_key=True)
    application_id = db.Column(db.Integer, db.ForeignKey('applications.id'), nullable=False, primary_key=True)
    app_data = db.Column(MutableDict.as_mutable(JSON))

    tenant = db.relationship("Tenant", backref=db.backref('tenant_applications', cascade="all, delete-orphan"))
    application = db.relationship("Application", backref=db.backref('tenant_applications', cascade="all, delete-orphan"))

    def __unicode__(self):
        return unicode(self.tenant.name + ' ' + self.application.name)

    def __repr__(self):
        return self.__unicode__()


class Application(db.Model):

    __tablename__ = 'applications'

    id = db.Column(db.Integer, primary_key=True)
    unique_id = db.Column(db.Unicode, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    icon_id = db.Column(db.Integer, db.ForeignKey('icon_library.id'), default=None)

    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, onupdate=current_timestamp(), default=current_timestamp(), nullable=False)

    tenants = db.relationship("Tenant", secondary="tenants_applications", backref="applications")

    __table_args__ = (
        UniqueConstraint('unique_id', name='uq_application_unique_id'),
    )

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()


event.listen(TenantApplication, 'after_delete', delete_tenant_api_cache)
event.listen(TenantApplication, 'after_update', delete_tenant_api_cache)
event.listen(Application, 'after_insert', delete_tenant_api_cache)
event.listen(Application, 'after_delete', delete_tenant_api_cache)
event.listen(Application, 'after_update', delete_tenant_api_cache)
