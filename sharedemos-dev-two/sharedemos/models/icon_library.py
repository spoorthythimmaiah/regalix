from sqlalchemy import event
from sqlalchemy.sql.functions import current_timestamp
from sharedemos.models import db, Base
from sharedemos.libs.helpers import delete_file


def delete_icon(mapper, connection, target):
    if target.path:
        delete_file(target.path)


class IconLibrary(Base):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    path = db.Column(db.Unicode, nullable=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    tenant = db.relationship("Tenant", backref="icons")

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    is_cdn_ready = db.Column(db.Boolean, nullable=False, default=False)

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__()


event.listen(IconLibrary, 'after_delete', delete_icon)
