import six
from flask import current_app

from flask.ext.login import UserMixin
from sqlalchemy import event, UniqueConstraint
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property
from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy import func
from social.storage.sqlalchemy_orm import (
    SQLAlchemyUserMixin,
    SQLAlchemyAssociationMixin,
    SQLAlchemyNonceMixin,
    SQLAlchemyCodeMixin,
    BaseSQLAlchemyStorage
)

from sharedemos.models import db
from sharedemos.libs.helpers import encrypt_password, get_random_string
from sharedemos.libs.model import (
    admin_permission,
    author_permission,
    analyst_permission,
    viewer_permission
)


def create_user(mapper, connection, target):
    if not target.username:
        target.username = target.email
    if target.password:
        target.password = encrypt_password(target.password)


class User(db.Model, UserMixin):

    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.Unicode)
    last_name = db.Column(db.Unicode)
    username = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120))
    password = db.Column(db.Unicode)
    unique_user_id = db.Column(db.Unicode, unique=True)
    picture_url = db.Column(db.String(255))
    email_sent = db.Column(db.Boolean, nullable=False, default=True)
    is_deleted = db.Column(db.Boolean, nullable=False, default=False)
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'), nullable=False, default=4)
    registration_status = db.Column(db.Boolean, nullable=False, default=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    last_login = db.Column(db.DateTime, default=current_timestamp(), nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    onboard_at = db.Column(db.DateTime)

    tenant = db.relationship("Tenant", backref=db.backref("users", order_by=id))
    role = db.relationship("Role", backref='user')
    groups = db.relationship(
        "UserGroup",
        secondary="user_group_mappings",
        order_by="UserGroup.id"
    )

    @hybrid_method
    def validate_password(self, password):
        if self.password == encrypt_password(password):
            return True

        return False

    @hybrid_method
    def is_admin(self):
        return admin_permission.can()

    @hybrid_method
    def is_author(self):
        return author_permission.can()

    @hybrid_method
    def is_analyst(self):
        return analyst_permission.can()

    @hybrid_method
    def is_viewer(self):
        return viewer_permission.can()

    @hybrid_property
    def initials(self):
        initials = (self.first_name or 'Anonymous')[:1]
        if self.last_name:
            initials += self.last_name[:1]
        elif self.first_name:
            initials = self.first_name[:2]
        return unicode(initials).upper()

    @hybrid_property
    def profile_picture_url(self):
        if self.picture_url:
            if 'http' in self.picture_url:
                return self.picture_url
            return unicode('/static/media/' + self.picture_url)

        return None

    @hybrid_property
    def fullname(self):
        name = self.first_name
        if self.last_name:
            name += " " + self.last_name

        if not name:
            return unicode(self.email)

        return unicode(name)

    @hybrid_method
    def user_group_slugs(self):
        return [grp.slug for grp in self.groups]

    def __unicode__(self):
        return self.fullname

    def __repr__(self):
        return self.__unicode__()

    __table_args__ = (
        UniqueConstraint('email', 'tenant_id', name='uq_user_tenant_id_email'),
        UniqueConstraint('username', 'tenant_id', name='uq_user_tenant_id_username'),
    )


def add_user(user_data):
    tenant_id = getattr(current_app, 'tenant_id', None)
    user = User()
    user.first_name = unicode(user_data.get('first_name', ''))
    user.last_name = unicode(user_data.get('last_name', ''))
    user.email = unicode(user_data.get('email', ''))
    user.unique_user_id = unicode(user_data.get('unique_user_id', get_random_string(length=6)))
    if user_data.get('picture_url'):
        user.picture_url = unicode(user_data['picture_url'])
    if user_data.get('role_id'):
        user.role_id = int(user_data.get('role_id'))
    user.tenant_id = tenant_id

    return user


class _AppSession(object):
    @classmethod
    def _session(cls):
        return db.session


class UserSocialAuth(_AppSession, db.Model, SQLAlchemyUserMixin):
    """Social Auth association model"""
    __table_args__ = None
    uid = db.Column(db.String(255))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id),
                        nullable=False, index=True)
    user = db.relationship(User, backref=db.backref('social_auth',
                           lazy='dynamic', cascade="all, delete-orphan"))

    @classmethod
    def username_max_length(cls):
        return User.__table__.columns.get('username').type.length

    @classmethod
    def user_model(cls):
        return User

    @classmethod
    def get_users_by_email(cls, email):
        tenant_id = getattr(current_app, 'tenant_id', None)
        return cls.user_query().filter(
            (func.lower(User.email) == email.lower()) &
            (User.tenant_id == tenant_id)
        )

    @classmethod
    def get_social_auth(cls, provider, uid):
        """
        Override function to filter tenant specific user
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        if not isinstance(uid, six.string_types):
            uid = str(uid)
        try:
            return cls._query().join(User).filter(
                (cls.provider == provider) &
                (func.lower(cls.uid) == uid.lower()) &
                (User.tenant_id == tenant_id)
            )[0]

        except IndexError:
            return None


class Nonce(_AppSession, db.Model, SQLAlchemyNonceMixin):
    """One use numbers"""
    pass


class Association(_AppSession, db.Model, SQLAlchemyAssociationMixin):
    """OpenId account association"""
    pass


class Code(_AppSession, db.Model, SQLAlchemyCodeMixin):
    pass


class FlaskStorage(BaseSQLAlchemyStorage):
    user = UserSocialAuth
    nonce = Nonce
    association = Association
    code = Code


class ResetPassword(db.Model):
    __tablename__ = 'reset_password'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    unique_id = db.Column(db.Unicode, unique=True, nullable=False)
    reset_status = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), nullable=False)
    user = db.relationship(User, backref="reset_password")

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    def __unicode__(self):
        return self.unique_id

    def __repr__(self):
        return self.__unicode__()


class Role(db.Model):
    """
    # 1     Admin       Master Access
    # 2     Author      Edit Content
    # 3     Analyst     Only reports(no settings/user management)
    # 4     Viewer      Access to Private Tenant
    """

    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, unique=True, nullable=False)
    created_at = db.Column(
        db.DateTime, default=current_timestamp(), nullable=False)

    def __unicode__(self):
        return unicode(self.name).encode('utf-8')

    def __repr__(self):
        return self.__unicode__()


event.listen(User, 'before_insert', create_user)
