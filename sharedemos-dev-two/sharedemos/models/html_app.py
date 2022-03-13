from datetime import datetime
from sqlalchemy import event, UniqueConstraint

from sharedemos.libs.model import slugify
from sharedemos.models import db


def create_app_slug(mapper, connection, target):
    new_slug = slugify(target.name, target.id, HtmlApp,
                       target.tenant_id)
    _table = HtmlApp.__table__
    connection.execute(
        _table.update().
        where(_table.c.id == target.id).
        values(slug=new_slug)
    )


class HtmlApp(db.Model):
    __tablename__ = 'html_apps'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    slug = db.Column(db.Unicode)
    description = db.Column(db.Unicode)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_html_app_tenant_id_slug'),
    )

    def __unicode__(self):
        """App name."""
        return self.name

    def __repr__(self):
        """App name."""
        return self.__unicode__()


event.listen(HtmlApp, 'after_insert', create_app_slug)
