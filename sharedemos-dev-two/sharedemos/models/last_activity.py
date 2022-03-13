from sharedemos.models import db
from sqlalchemy.sql.functions import current_timestamp


class LastActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    entity = db.Column(db.Unicode, nullable=False)
    entity_id = db.Column(db.Integer, nullable=False)
    action = db.Column(db.Unicode, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    updated_by = db.relationship("User", backref='last_activity', foreign_keys=user_id)
    tenant = db.relationship("Tenant", backref=db.backref("last_activity", uselist=False))

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    updated_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)
