from sharedemos.models import db
from sqlalchemy import UniqueConstraint
from sqlalchemy.sql.functions import current_timestamp


class RedirectUrl(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    old_url = db.Column(db.Unicode, nullable=False, unique=True)
    new_url = db.Column(db.Unicode, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    tenant = db.relationship("Tenant", backref="redirect_old_url")

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class SlugRevision(db.Model):

    __tablename__ = 'slug_revisions'

    id = db.Column(db.Integer, primary_key=True)
    old_slug = db.Column(db.Unicode, nullable=False)
    new_slug = db.Column(db.Unicode, nullable=False)
    entity_type = db.Column(db.Unicode, nullable=False, default=unicode("section"))
    entity_id = db.Column(db.Integer, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    tenant = db.relationship("Tenant")

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(), onupdate=current_timestamp(), nullable=False)

    __table_args__ = (
        UniqueConstraint(
            'old_slug',
            'new_slug',
            'entity_type',
            'tenant_id',
            name='uq_slug_revisions_old_slug_new_slug_entity_type_tenant_id'
        ),
    )
