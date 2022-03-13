from flask import session
from sqlalchemy import event
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db, Base
from sharedemos.libs.api import is_author
from sharedemos.libs.helpers import delete_file


def delete_resource(mapper, connection, target):
    if target.path:
        delete_file(target.path)


class Resource(Base):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    resource_type = db.Column(db.Unicode, nullable=False)
    path = db.Column(db.Unicode)
    content = db.Column(db.Unicode)
    meta_data = db.Column(MutableDict.as_mutable(JSON), nullable=False)

    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            default=u'en_US', nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)
    is_cdn_ready = db.Column(db.Boolean, nullable=False, default=False)

    tenant = db.relationship("Tenant", backref="resources")

    @hybrid_method
    def is_content_slide_available(self, locale=None):
        if not locale:
            user = session.get('author') if is_author()\
                else session.get('user')
            locale = user['locale'] if user else self.tenant.default_locale_id

        if self.language_id == locale:
            return True

        resource = self.query.\
            filter(Resource.tenant_id == self.tenant_id,
                   Resource.resource_type == u'content',
                   Resource.language_id == unicode(locale),
                   Resource.meta_data['default_res_id']
                   .astext.cast(db.Integer).isnot(None),
                   Resource.meta_data['default_res_id']
                   .astext.cast(db.Integer) == self.id,
                   Resource.meta_data['is_deleted'].astext
                   .cast(db.Boolean).__eq__(False)).first()

        return True if resource else False

    @hybrid_method
    def languages_available(self):
        trans = self.translations()
        return [t.language_id for t in trans]

    @hybrid_method
    def translations(self):
        if self.resource_type == u'content':
            resources = self.query.\
                filter(Resource.tenant_id == self.tenant_id,
                       Resource.resource_type == u'content',
                       Resource.meta_data['default_res_id']
                       .astext.cast(db.Integer).isnot(None),
                       Resource.meta_data['default_res_id']
                       .astext.cast(db.Integer) == self.id,
                       Resource.meta_data['is_deleted'].astext
                       .cast(db.Boolean).__eq__(False)).all()
            return [self] + resources
        return [self]

    def __unicode__(self):
        return unicode(self.name).encode('utf-8')

    def __repr__(self):
        return self.__unicode__()


event.listen(Resource, 'after_delete', delete_resource)
