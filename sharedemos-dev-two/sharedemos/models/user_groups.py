from datetime import datetime

from sqlalchemy import event, UniqueConstraint

from sharedemos.libs.model import slugify
from sharedemos.models import db


def create_usergroup_slug(mapper, connection, target):
    """Create unique slug based on the group name."""
    new_slug = slugify(target.name, target.id, UserGroup,
                       target.tenant_id)
    _table = UserGroup.__table__
    connection.execute(
        _table.update().
        where(_table.c.id == target.id).
        values(slug=new_slug)
    )


class UserGroup(db.Model):
    """UserGroup table to store diff groups w.r.t a Tenant."""

    __tablename__ = 'user_groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    group_code = db.Column(db.Unicode)
    slug = db.Column(db.Unicode)
    description = db.Column(db.Unicode)
    is_default = db.Column(db.Boolean, default=False, nullable=False)

    idp_entity_id = db.Column(db.Unicode)
    idp_url = db.Column(db.Unicode)
    idp_x509cert = db.Column(db.Text)
    idp_first_name = db.Column(db.Unicode)
    idp_last_name = db.Column(db.Unicode)
    idp_username = db.Column(db.Unicode)
    idp_email = db.Column(db.Unicode)
    idp_usertype = db.Column(db.Unicode)
    role_id = db.Column(
        db.Integer,
        db.ForeignKey('role.id'),
        nullable=False,
        default=4
    )

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    role = db.relationship("Role")

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_user_group_tenant_id_slug'),
    )

    def __unicode__(self):
        """Group name."""
        return unicode(self.name)

    def __repr__(self):
        """Group representation."""
        return self.__unicode__()


class UserGroupMappings(db.Model):

    __tablename__ = 'user_group_mappings'

    user_id = db.Column(
        db.Integer,
        db.ForeignKey('users.id'),
        nullable=False,
        primary_key=True
    )
    group_id = db.Column(
        db.Integer,
        db.ForeignKey('user_groups.id'),
        nullable=False,
        primary_key=True
    )

    user = db.relationship("User")

    def __unicode__(self):
        """Mapping name."""
        return unicode(self.group.name + ' ' + unicode(self.user))

    def __repr__(self):
        """Mapping representation."""
        return self.__unicode__()


event.listen(UserGroup, 'after_insert', create_usergroup_slug)
event.listen(UserGroup, 'after_update', create_usergroup_slug)
