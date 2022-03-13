from sqlalchemy.sql.functions import current_timestamp
from sharedemos.models import db


class Tag(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    tenant = db.relationship("Tenant", backref="tags")

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()
