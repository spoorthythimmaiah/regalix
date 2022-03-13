from datetime import datetime
from distutils.util import strtobool
import json
import os
import werkzeug

from flask import (
    current_app,
    jsonify,
    g, request,
    session
)
from flask.ext.login import login_user
from flask.ext.principal import (
    identity_changed,
    Identity
)
from flask.ext.restful import Resource, fields, marshal, reqparse
from sqlalchemy import func
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_admin_access
from sharedemos.libs.helpers import (
    encrypt_password,
    get_random_string,
    log_last_activity,
    namegen_filename,
    notify_user_about_content_access
)
from sharedemos.libs.model import log_activity_feed
from sharedemos.models import (
    db, add_user,
    User,
    UserSocialAuth,
    Section,
    SectionsRestrictedUsers
)


user_fields = {
    'first_name': fields.String,
    'last_name': fields.String,
    'picture_url': fields.String,
    'email': fields.String,
    'role_id': fields.Integer,
    're_add': fields.Boolean,
    'invite_status': fields.Boolean,
}

parser = reqparse.RequestParser()
parser.add_argument('first_name', required=True, type=unicode,
                    location=['json', 'form'], help='First Name required')
parser.add_argument('last_name', type=unicode, default=u'',
                    location=['json', 'form'])
parser.add_argument('email', required=True, type=unicode,
                    location=['json', 'form'], help='Email required')
parser.add_argument('role_id', type=unicode, location=['json', 'form'])
parser.add_argument('company', type=unicode, location=['json', 'form'])
parser.add_argument('old_pwd', type=unicode, location=['json', 'form'])
parser.add_argument('new_pwd', type=unicode, location=['json', 'form'])
parser.add_argument('profile_pic', type=werkzeug.datastructures.FileStorage,
                    location='files')
parser.add_argument('re_add', type=bool, location=['json', 'form'])
parser.add_argument('resend_invite', type=bool, location=['json', 'form'])
parser.add_argument('sections', type=unicode, location=['json', 'form'])
parser.add_argument('remove_restrictions', type=unicode, default=u'false',
                    location=['json', 'form'])

patch_parser = reqparse.RequestParser()
patch_parser.add_argument('email', required=True, type=unicode,
                          location='form', help='Email required')
patch_parser.add_argument('set_consent_status', type=bool, default=False,
                          location='form')


class UserApi(Resource):

    @has_admin_access
    def get(self, role_id=None):
        tenant_id = getattr(current_app, 'tenant_id', None)

        request_args = reqparse.request.args
        if request_args:
            user_details = User.query.filter(
                (User.tenant_id == tenant_id) &
                (func.lower(User.email) == func.lower(
                    request_args.get('email')))
            ).first()
            """
                In case the user belonging to same tenant has been deleted,
                and wants be added again.
            """
            if user_details and user_details.tenant_id == tenant_id\
                    and user_details.is_deleted:
                user_details = {'re_add': True}
        else:
            users_query = User.query.filter(
                (User.tenant_id == tenant_id) &
                (User.is_deleted.__eq__(False))
            )

            if role_id:
                users_query = users_query.filter(User.role_id == role_id)

            user_details = users_query.order_by(User.id).all()

            for user_detail in user_details:
                user_detail.invite_status = False
                if user_detail.password:
                    user_detail.invite_status = True

        return format_data(marshal(user_details, user_fields))

    @has_admin_access
    def post(self):
        post_data = parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        unique_user_id = get_random_string(length=6)

        user_first_name = post_data.get('first_name', '').strip()
        user_last_name = post_data.get('last_name', '').strip()
        user_email = post_data.get('email', '').strip()

        user_data = User.query.filter(
            (User.tenant_id == tenant_id) &
            (func.lower(User.email) == func.lower(user_email))
        ).first()

        if user_data:
            if post_data['re_add']:
                user_data.first_name = user_first_name
                user_data.last_name = user_last_name
                user_data.role_id = post_data.get('role_id')
                user_data.is_deleted = False
                # Check the registration_status before re-adding.
                if user_data.registration_status:
                    user_data.registration_status = False
                    user_data.unique_user_id = unique_user_id
                log_last_activity('re-added', 'user', user_data)
            else:
                raise SharedemosException(412, message='USER_EXIST')
        else:
            user_details = dict(
                first_name=user_first_name,
                last_name=user_last_name,
                email=user_email,
                unique_user_id=unique_user_id,
                role_id=post_data.get('role_id')
            )
            user_data = add_user(user_details)
            db.session.add(user_data)
            log_last_activity('created', 'user', user_data)

        if user_data.role_id == unicode(2):
            section_slugs = json.loads(post_data.get('sections')) or []
            if section_slugs:
                restrict_sections = Section.query.filter(
                    Section.tenant_id == tenant_id,
                    Section.slug.in_(section_slugs),
                    Section.is_deleted.__eq__(False)
                ).all()
                for section in restrict_sections:
                    rest_section = SectionsRestrictedUsers()
                    rest_section.restricted_section = section
                    rest_section.restricted_user = user_data
                    rest_section.created_by = g.user.id
                    rest_section.modified_by = g.user.id
                    log_last_activity('created', 'section-restriction',
                                      rest_section)

        mail_status = notify_user_about_content_access(user_data)

        if not mail_status:
            user_data.email_sent = False

        db.session.add(user_data)
        db.session.commit()

        user_data.invite_status = False
        if user_data.password:
            user_data.invite_status = True

        return format_data(marshal(user_data, user_fields)), 200

    def put(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        put_data = parser.parse_args()
        old_pwd = put_data.get('old_pwd')
        new_pwd = put_data.get('new_pwd')

        user_model = User.query.filter(
            (User.tenant_id == tenant_id) &
            (func.lower(User.email) == func.lower(
                put_data.get('email', '').strip())) &
            (User.is_deleted.__eq__(False))
        ).first_or_404()

        if not put_data.get('first_name'):
            raise SharedemosException(403, message='NAME_ERROR')

        if user_model and g.user.role_id == 1 or g.user.id == user_model.id:
            user_model.first_name = put_data.get('first_name').strip()
            user_model.last_name = put_data.get('last_name').strip()
            if put_data.get('role_id'):
                user_model.role_id = put_data.get('role_id')
            if put_data.get('company'):
                user_model.tenant.name = put_data.get('company')

            if put_data.get('profile_pic'):
                profile_pic_file = put_data.get('profile_pic')
                profile_pic_name = namegen_filename(None, profile_pic_file)
                profile_pic_file.save(
                    os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                 profile_pic_name))
                user_model.picture_url = profile_pic_name

            if old_pwd and new_pwd:
                if user_model.password == encrypt_password(unicode(old_pwd)):
                    user_model.password = encrypt_password(unicode(new_pwd))
                else:
                    raise SharedemosException(403, message='NO_MATCH')

            if put_data.get('resend_invite') and not user_model.password:
                mail_status = notify_user_about_content_access(user_model)
                if not mail_status:
                    user_model.email_sent = False

            if user_model.role_id == unicode(2):
                # Deny the selected sections' access for user if he is author.
                section_slugs = json.loads(put_data.get('sections')) or []
                if section_slugs:
                    # Get the selected sections list.
                    restrict_sections = Section.query.filter(
                        Section.tenant_id == tenant_id,
                        Section.slug.in_(section_slugs),
                        Section.is_deleted.__eq__(False)
                    ).all()
                    sections_skip_list = []
                    # Check in the user's previous records.
                    for user_section in user_model.restricted_sections:
                        if user_section.restricted_section in\
                                restrict_sections:
                            sections_skip_list.append(
                                user_section.restricted_section)
                            if user_section.is_granted:
                                user_section.is_granted = False
                                user_section.modified_by = g.user.id
                                log_activity_feed(
                                    entity='user', action='denied',
                                    section=user_section.restricted_section,
                                    secondary_user_id=user_model.id)
                        elif not user_section.is_granted:
                            user_section.is_granted = True
                            user_section.modified_by = g.user.id
                            log_activity_feed(
                                entity='user', action='granted',
                                section=user_section.restricted_section,
                                secondary_user_id=user_model.id)

                    # Create a new restriction-record.
                    for section in restrict_sections:
                        if section not in sections_skip_list:
                            rest_section = SectionsRestrictedUsers()
                            rest_section.restricted_section = section
                            rest_section.restricted_user = user_model
                            rest_section.created_by = g.user.id
                            rest_section.modified_by = g.user.id
                            log_activity_feed(
                                entity='user',
                                action='denied',
                                section=section,
                                secondary_user_id=user_model.id)
                elif strtobool(json.loads(
                        put_data.get('remove_restrictions'))):
                    for user_section in user_model.restricted_sections:
                        if not user_section.is_granted:
                            user_section.is_granted = True
                            user_section.modified_by = g.user.id
                            log_activity_feed(
                                entity='user',
                                action='granted',
                                section=user_section.restricted_section,
                                secondary_user_id=user_model.id)

                from sharedemos.tasks import delete_api_cache_data
                delete_api_cache_data.delay({
                    'delete_pattern': True,
                    'entity': 'product_tree',
                    'tenant_id': tenant_id,
                })
                delete_api_cache_data.delay({
                    'delete_pattern': True,
                    'entity': 'all_products',
                    'tenant_id': tenant_id,
                })

            log_last_activity('edited', 'user', user_model)
            db.session.add(user_model)
            db.session.commit()
            return format_data(marshal(user_model, user_fields)), 201
        raise SharedemosException(404)

    def patch(self):
        """Used to update few fields in a model."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        email = patch_parser.parse_args().get('email', '').lower()
        user = User.query.filter(
            (User.tenant_id == tenant_id) &
            (func.lower(User.email) == email) &
            (User.is_deleted.__eq__(False))
        ).first_or_404()

        consent_status = patch_parser.parse_args().get('set_consent_status')
        if consent_status:
            user_social_auth = user.social_auth.first()
            if not user_social_auth:
                user_social_auth = UserSocialAuth()
                user_social_auth.user_id = user.id
                user_social_auth.provider = u'email'
                user_social_auth.uid = email
            if not user_social_auth.extra_data:
                user_social_auth.extra_data = MutableDict(
                    {'consent_status': True,
                     'consent_date': unicode(datetime.utcnow())}
                )
            elif u'consent_status' not in user_social_auth.extra_data.keys():
                user_social_auth.extra_data.update(
                    {'consent_status': True,
                     'consent_date': unicode(datetime.utcnow())}
                )
            db.session.add(user_social_auth)
            db.session.commit()
            session['is_nda_approved'] = True
        return jsonify(status='SUCCESS')

    @has_admin_access
    def delete(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        email = parser.parse_args().get('email', '').lower()
        if g.user.email.lower() == email:
            raise SharedemosException(403)

        user_data = User.query.filter(
            (User.tenant_id == tenant_id) &
            (func.lower(User.email) == func.lower(email)) &
            (User.is_deleted.__eq__(False))
        ).first_or_404()

        user_data.is_deleted = True
        db.session.add(user_data)
        db.session.commit()

        log_last_activity('deleted', 'user', user_data)
        entity = 'product_tree_user_' + str(user_data.id)
        from sharedemos.tasks import delete_api_cache_data
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': entity,
            'tenant_id': tenant_id,
        })

        return jsonify(status='DELETED')


class LinkedinUserApi(Resource):

    def post(self):
        if g.user.is_active():
            return {'status': 'LOGGED_IN'}, 200

        tenant_id = getattr(current_app, 'tenant_id', None)
        email = request.json.get('emailAddress')
        user = User.query.filter(
            (User.tenant_id == tenant_id) &
            (func.lower(User.email) == func.lower(email))
        ).first()

        if not user:
            user_details = dict(
                first_name=request.json.get('firstName'),
                last_name=request.json.get('lastName'),
                email=request.json.get('emailAddress'),
                unique_user_id=get_random_string(6),
                role_id=request.json.get('role_id'),
                picture_url=request.json.get('pictureUrl')
            )
            user = add_user(user_details)
        else:
            if request.json.get('firstName'):
                user.first_name = request.json.get('firstName')

            if request.json.get('lastName'):
                user.last_name = request.json.get('lastName')

            if request.json.get('pictureUrl'):
                user.picture_url = request.json.get('pictureUrl')

            user.last_login = datetime.utcnow()

        db.session.add(user)
        db.session.commit()

        login_user(user)
        identity_changed.send(current_app._get_current_object(),
                              identity=Identity(user.id))

        return format_data(marshal(user, user_fields)), 201
