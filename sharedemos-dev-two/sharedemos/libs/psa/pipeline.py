from datetime import datetime

from flask import g, current_app, url_for, session

from flask.ext.principal import Identity, identity_changed

from social.exceptions import AuthException
from sqlalchemy import or_, func

from sharedemos.models import db, Tenant, UserGroup
from sharedemos.libs.helpers import get_random_string


USER_FIELDS = ('username',)


def get_user_groups(usertype):
    user_group_list = []
    tenant_id = getattr(current_app, 'tenant_id', None)
    if isinstance(usertype, list) and usertype:
        conditions = []
        for _ut in usertype:
            conditions.append(
                func.lower(UserGroup.group_code) == func.lower(unicode(_ut))
            )

        user_group_list = UserGroup.query.filter(
            UserGroup.tenant_id == tenant_id,
            or_(*conditions)
        ).all()
    elif usertype:
        user_group_list = UserGroup.query.filter(
            UserGroup.tenant_id == tenant_id,
            func.lower(UserGroup.group_code) == func.lower(unicode(usertype))
        ).all()

    return user_group_list


def set_redirect_url(user, **kwargs):
    if kwargs.get('response', {}).get('hash_url'):
        session['hash_url'] = kwargs.get('response', {}).get('hash_url')
        if 'next' in kwargs.get('response', {}):
            session['next_url'] = kwargs.get(
                'response', {}
            ).get('next') + kwargs.get(
                'response', {}
            ).get('hash_url')

    if 'hash_url' in session:
        current_app.config['LOGIN_REDIRECT_URL'] = session['hash_url']
        del session['hash_url']
    elif user.role_id == 3:
        current_app.config['LOGIN_REDIRECT_URL'] = url_for(
            'dashboard.category_reports')
    elif user.role_id == 4:
        current_app.config['LOGIN_REDIRECT_URL'] = url_for('main.home')
    else:
        current_app.config['LOGIN_REDIRECT_URL'] = url_for('dashboard.library')

    # Tell Flask-Principal the identity changed
    identity_changed.send(
        current_app._get_current_object(),
        identity=Identity(user.id)
    )


def validate_user(strategy, user, is_new=False, *args, **kwargs):
    """Login validation pipeline for `email` backend only."""
    if g.backend.name != "email":
        return

    if not user:
        raise AuthException(
            g.backend,
            'The email or password you entered is incorrect.'
        )

    tenant_id = getattr(current_app, 'tenant_id', None)

    if user.is_deleted or user.tenant_id != tenant_id:
        raise AuthException(g.backend, 'User with given email does not exist.')

    password = unicode(strategy.request_data().get('password'))
    if not user.validate_password(password):
        raise AuthException(
            g.backend,
            'The email or password you entered is incorrect.'
        )


def create_user(strategy, details, user=None, *args, **kwargs):
    fields = dict()
    is_saml_backend = False
    if kwargs.get('backend') and kwargs['backend'].name == "saml":
        is_saml_backend = True
    for _name in strategy.setting('USER_FIELDS', USER_FIELDS):
        _value = kwargs.get(_name) or details.get(_name)
        if _value and not isinstance(_value, list):
            _value = unicode(_value)
        fields[_name] = _value

    if not fields:
        return

    # Keep username as email
    fields['username'] = fields.get('email')
    tenant_id = getattr(current_app, 'tenant_id', None)
    usergroup = kwargs.get('usergroup')
    usertype = fields.get('usertype')

    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    is_usertype_configured = False

    tenant_user_groups = tenant.user_groups
    if tenant.idp_usertype:
        is_usertype_configured = True
    elif usergroup and tenant_user_groups:
        for ug in tenant_user_groups:
            if ug.slug == usergroup and ug.idp_usertype:
                is_usertype_configured = True
                break

    if user:
        if is_saml_backend:
            # Update basic info
            user.first_name = fields.get('first_name')
            user.last_name = fields.get('last_name')
            user.is_deleted = False

            user_group_list = []
            if usergroup:
                user_group_list = UserGroup.query.filter(
                    UserGroup.tenant_id == tenant_id,
                    UserGroup.slug == usergroup
                ).all()
            elif usertype:
                user_group_list = get_user_groups(usertype)

            if user_group_list:
                user.groups = user_group_list
                user.role_id = min([grp.role_id for grp in user_group_list])
                if "is_access_denied" in session:
                    del session["is_access_denied"]
            elif is_usertype_configured:
                user.is_deleted = True
                session["is_access_denied"] = True

        # update last login time
        user.last_login = datetime.utcnow()
        db.session.add(user)
        db.session.commit()
        set_redirect_url(user, **kwargs)

        return {
            'is_new': False
        }

    # Update user group information for login user
    user_group_list = []
    if usergroup:
        user_group_list = UserGroup.query.filter(
            UserGroup.tenant_id == tenant_id,
            UserGroup.slug == usergroup
        ).all()
    elif usertype:
        user_group_list = get_user_groups(usertype)

    if is_usertype_configured and not user_group_list:
        current_app.config['LOGIN_REDIRECT_URL'] = "/"
        session["is_access_denied"] = True
        return {
            "is_new": False
        }

    if "is_access_denied" in session:
        del session["is_access_denied"]

    fields.pop('usertype')
    fields['tenant_id'] = tenant_id
    fields['registration_status'] = True
    fields['onboard_at'] = datetime.utcnow()
    fields['unique_user_id'] = get_random_string(length=6)
    if user_group_list:
        fields['role_id'] = min([grp.role_id for grp in user_group_list])

    user = strategy.create_user(**fields)
    user.groups = user_group_list

    db.session.commit()
    set_redirect_url(user, **kwargs)

    return {
        'is_new': True,
        'user': user
    }
