import datetime
from email.MIMEText import MIMEText
from flask import (
    Blueprint,
    abort,
    current_app,
    g, jsonify,
    make_response,
    redirect,
    request,
    render_template,
    session,
    url_for
)
from flask.ext.login import login_user
from flask.ext.principal import (
    identity_changed,
    Identity
)
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    get_jwt_identity,
    get_raw_jwt,
    jwt_required,
    jwt_refresh_token_required,
    revoke_token
)
from social.actions import do_complete
from social.apps.flask_app.routes import do_login
from social.apps.flask_app.utils import psa, load_backend, load_strategy
from sqlalchemy import func

from sharedemos.libs.decorators import redirect_logged_in_user
from sharedemos.libs.forms import ResetPasswordForm
from sharedemos.libs.helpers import (
    Mailer,
    encrypt_password,
    get_random_string,
    user_session_logout
)
from sharedemos.libs.psa.actions import do_auth
from sharedemos.libs.utils import get_tenant_api
from sharedemos.models import (
    ResetPassword,
    Tenant,
    User,
    UserGroup,
    db
)

auth = Blueprint('auth', __name__)


def _registration_success(tenant_id, user_model):
    """Set the registration_status, and redirects the user."""
    # Set the registration status.
    user_model.registration_status = True
    db.session.add(user_model)
    db.session.commit()

    # To check if the registered user is Admin and is the first user for that
    # particular tenant
    user_model_count = User.query.filter_by(tenant_id=tenant_id).count()
    if user_model.role_id == 1 and user_model_count == 1:
        session['create_site_page'] = True

    user_session_logout()
    login_user(user_model)
    return _redirect_user(user_model)


def _redirect_user(user):
    # Send Identity change signal to flask-principal
    identity_changed.send(
        current_app._get_current_object(),
        identity=Identity(user.id)
    )

    if user.is_author():
        return redirect(url_for('dashboard.library'))

    if user.is_analyst():
        return redirect(url_for('dashboard.category_reports'))

    if user.is_viewer():
        return redirect(url_for('main.home'))

    return redirect(
        url_for(
            current_app.config.get('DEFAULT_LOGIN_REDIRECT')
        )
    )


def _revoke_current_token():
    current_token = get_raw_jwt()
    jti = current_token['jti']
    revoke_token(jti)


@auth.route('/forgot-password/', methods=['GET', 'POST'])
@redirect_logged_in_user
def forgot_password():
    """Tenant password recovery page."""
    tenant_id = getattr(current_app, 'tenant_id', None)

    page_type = 'Enter-Email'
    website_url = current_app.config.get('SDEMOS_WEBSITE_URL')

    if request.method == 'POST':
        email_id = request.form.get('email')
        mail_from = "Sharedemos <support@sharedemos.com>"
        mail_subject = "ShareDemos - Reset your password"
        user_model = User.query.filter(
            (func.lower(User.email) == func.lower(email_id)) &
            (User.tenant_id == tenant_id) &
            (User.is_deleted.__eq__(False))
        ).first()

        # If User model exists for given email id, then proceed, if not then
        # show error msg
        if user_model and user_model.tenant_id == tenant_id:
            # Get the list of Pwd-Reset models for that user_model if exists
            user_name = user_model.first_name
            tenant_url = user_model.tenant.domain
            pwd_reset_model_list = ResetPassword.query.filter(
                ResetPassword.user == user_model).all()

            mailer_object = Mailer()

            # Iterate through each model to find out if the link has not been
            # used to reset the pwd
            for pwd_reset_model in pwd_reset_model_list:
                if not pwd_reset_model.reset_status:
                    template_args = {
                        'unique_id': pwd_reset_model.unique_id,
                        'user_name': user_name,
                        'tenant_url': tenant_url,
                        'sdemos_website_url': website_url
                    }
                    mail_body = MIMEText((render_template(
                        'mail/reset_password_mail.html', **template_args)
                    ).encode('ascii', 'ignore'),
                        'html'
                    )

                    mailer_object.send_mail(
                        email_id, mail_from, mail_subject, mail_body)
                    mailer_object.close_mail()

                    return render_template(
                        'forgot_password.html',
                        **{"page_type": None,
                           "sdemos_website_url": website_url
                           })

            # If no Pwd-Reset model, or all the pwd-reset links have been used,
            # then generate a new link
            unique_id = get_random_string(8)
            page_type = None
            template_args = {
                'unique_id': unique_id,
                'user_name': user_name,
                'tenant_url': tenant_url,
                'sdemos_website_url': website_url
            }
            mail_body = MIMEText((render_template(
                'mail/reset_password_mail.html', **template_args)
            ).encode('ascii', 'ignore'),
                'html'
            )
            mailer_object.send_mail(
                email_id, mail_from, mail_subject, mail_body)
            mailer_object.close_mail()

            # Create a new Pwd-Reset record
            new_pwd_reset = ResetPassword()
            new_pwd_reset.unique_id = unique_id
            new_pwd_reset.user = user_model
            db.session.add(new_pwd_reset)
            db.session.commit()
        else:
            page_type = 'Error'

    template_args = {
        "page_type": page_type,
        "sdemos_website_url": website_url,
    }
    template = 'forgot_password.html'
    if request.host == 'solidfire.sharedemos.com':
        template = 'tenants/default/solidfire/forgot_password.html'
    return render_template(template, **template_args)


@auth.route('/refresh-access-token.json')
@jwt_refresh_token_required
def get_new_access_token():
    """Get_new_access_token."""
    current_user = get_jwt_identity()
    access_token = {
        'access_token': create_access_token(identity=current_user)
    }
    return jsonify(access_token), 200


@auth.route('/login/')
@redirect_logged_in_user
def login():
    """Tenant login page."""
    template_args = {
        'sdemos_website_url': current_app.config.get('SDEMOS_WEBSITE_URL')
    }
    redirect_next = request.args.get('next')
    template = 'login.html'
    if request.host == 'members.helpgrowct.com':
        template = 'tenants/default/helpgrowct/signin.html'
    elif request.host == 'solidfire.sharedemos.com':
        template = 'tenants/default/solidfire/signin.html'

    return render_template(template, next=redirect_next, **template_args)


@auth.route('/login/select/')
@redirect_logged_in_user
def choose_login():
    """Tenant custom login page."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    template_type = None
    if tenant.template:
        template_type = tenant.template.lower()
    if template_type in ['purestorage', 'bmc', 'designeverest']:
        template_args = dict()
        template = 'tenants/seo/{}/login.html'.format(template_type)
        tenant_settings = get_tenant_api()
        template_args.update({
            'api': {
                'tenant': tenant_settings
            },
            'tenant': tenant,
            'usergroups': [grp.slug for grp in tenant.user_groups]
        })
        return render_template(template, **template_args)

    return "<h1>Template not available.</h1>"


@auth.route('/logout/')
def logout():
    """Logout route."""
    return_url = user_session_logout()
    return_url = request.args.get('redirect_to', return_url)
    return redirect(return_url)


@auth.route('/logout-access-token.json')
@jwt_required
def logout_access_token():
    """Revoking the access Token."""
    try:
        _revoke_current_token()
    except KeyError:
        return jsonify({
            'msg': 'Access token not found in the blacklist store'
        }), 500
    return jsonify({"msg": "Successfully logged out by access token"}), 200


@auth.route('/logout-refresh-token.json')
@jwt_refresh_token_required
def logout_refresh_token():
    """Revoking the refresh Token."""
    try:
        _revoke_current_token()
    except KeyError:
        return jsonify({
            'msg': 'Refresh token not found in the blacklist store'
        }), 500
    return jsonify({"msg": "Successfully logged out by refresh token"}), 200


@auth.route('/login.json', methods=['POST'])
def mobile_login():
    """For login through mobile returning jwt."""
    user_name = request.json.get('username')
    password = encrypt_password(request.json.get('password'))

    tenant = Tenant.query.filter(
        Tenant.domain == unicode(request.host)
    ).first_or_404()
    user = User.query.filter(
        User.username == user_name,
        User.tenant_id == tenant.id
    ).first()

    if not user:
        return jsonify({'msg': "Invalid Credentials"})

    if user.password == password:
        return jsonify({
            'access_token': create_access_token(identity=user.id),
            'refresh_token': create_refresh_token(identity=user.id)
        }), 200
    return jsonify({'msg': "Invalid Credentials"})


@auth.route('/register/<unique_user_id>', methods=['GET', 'POST'])
def register_user(unique_user_id):
    """
    New users thru sign-up, auto logs in.

    New users thru permissions, will be asked for password.
    """
    template_args = {}
    user_model = User.query.filter(
        User.unique_user_id == unique_user_id
    ).first_or_404()
    tenant_id = getattr(current_app, 'tenant_id', None)

    if user_model.registration_status:
        return redirect(url_for('auth.login'))

    tenant = Tenant.query.get(tenant_id)
    template_args['user'] = user_model
    template_args['tenant'] = tenant

    template_args['picture_url'] = "/static/images/avatar.png"
    if user_model.picture_url and user_model.picture_url != 'default':
        template_args['picture_url'] = user_model.picture_url

    if user_model.password:
        return _registration_success(tenant_id, user_model)

    if request.method == 'POST':
        user_model.password = encrypt_password(request.form['password'])
        user_model.onboard_at = datetime.datetime.utcnow()
        return _registration_success(tenant_id, user_model)

    template = 'register_user.html'
    if request.host == 'members.helpgrowct.com':
        template = 'tenants/default/helpgrowct/choose-password.html'
    elif request.host == 'solidfire.sharedemos.com':
        template = 'tenant/default/solidfire/choose-password.html'
    return render_template(template, **template_args)


@auth.route('/reset-password/<unique_id>', methods=['GET', 'POST'])
@redirect_logged_in_user
def reset_password(unique_id):
    """Password reset page."""
    tenant_id = getattr(current_app, 'tenant_id', None)

    template_args = {
        "page_type": 'Reset-Page',
        "sdemos_website_url": current_app.config.get('SDEMOS_WEBSITE_URL'),
    }
    pwd_reset_model = ResetPassword.query.filter(
        ResetPassword.unique_id == unique_id
    ).first()

    if not pwd_reset_model or pwd_reset_model.reset_status \
            or pwd_reset_model.user.tenant_id != tenant_id:
        return render_template('reset_password.html', **{"page_type": 'Error'})

    form = ResetPasswordForm(request.form)

    if request.method == 'POST' and form.validate():
        pwd_reset_model.reset_status = True
        user_model = pwd_reset_model.user
        user_model.password = encrypt_password(
            unicode(request.form.get('newPassword'))
        )

        db.session.add(pwd_reset_model)
        db.session.commit()

        login_user(user_model)
        _redirect_user(user_model)

    return render_template('reset_password.html', **template_args)


@auth.route('/saml-mobile.json')
def saml_access_token():
    """saml_access_token."""
    if 'user_id' not in session:
        return jsonify({'msg': 'Need Authorization for JWT'})

    return jsonify({
        'access_token': create_access_token(identity=session['user_id']),
        'refresh_token': create_refresh_token(identity=session['user_id'])
    }), 200


@auth.route('/saml-metadata/<usergroup>')
@auth.route('/saml-metadata', defaults={'usergroup': None})
def saml_metadata(usergroup):
    """saml_metadata."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    tenant = Tenant.query.get(tenant_id)
    user_groups = [
        grp for grp in tenant.user_groups if grp.idp_entity_id and
        grp.idp_url and grp.idp_x509cert
    ]
    if not tenant.sp_public_certificate or not tenant.sp_private_key or \
            (user_groups and not usergroup) or\
            (usergroup and not user_groups):
        abort(404)
    usergroup = usergroup.lower() if usergroup else None
    if usergroup:
        group = UserGroup.query.filter(
            UserGroup.slug == usergroup
        ).first_or_404()
        usergroup = group.slug

    complete_url = url_for(
        "auth.saml_auth",
        backend="saml",
        usergroup=usergroup
    )
    saml_backend = load_backend(
        load_strategy(),
        "saml",
        redirect_uri=complete_url,
    )
    metadata, errors = saml_backend.generate_metadata_xml()
    if not errors:
        resp = make_response(metadata, 200)
        resp.headers['Content-Type'] = 'text/xml'

        return resp


@auth.route('/login-saml', defaults={'backend': 'saml'})
@redirect_logged_in_user
@psa('auth.saml_auth')
def saml_login(backend):
    """saml_login."""
    usergroup = request.args.get('usergroup')
    usergroup = usergroup.lower() if usergroup else None
    complete_url = url_for(
        "auth.saml_auth",
        backend="saml",
        usergroup=usergroup
    )
    g.backend = load_backend(
        load_strategy(),
        "saml",
        redirect_uri=complete_url,
    )
    return do_auth(g.backend)


@auth.route('/auth/saml/<usergroup>', methods=['POST'],
            defaults={'backend': 'saml'})
@auth.route('/auth/saml', methods=['POST'],
            defaults={'backend': 'saml', 'usergroup': None})
@psa('social.complete')
def saml_auth(backend, usergroup, *args, **kwargs):
    """saml_auth."""
    try:
        """
            If app is launched from IDP,
            then group information in strategy
            session will not be available
        """
        kwargs['usergroup'] = usergroup
        return do_complete(g.backend, login=do_login, user=g.user,
                           *args, **kwargs)
    except Exception, ex:
        # DO NOT DELETE - Print statements to debug any future SSO issues
        # SSO issues are difficult to reproduce as we may not have IdP credentials
        # Best way to debug and fix is from logs
        print "REQUEST VALUES : ", request.values
        print "PSA_EXCEPTION_TRACEBACK : "
        import traceback
        traceback.print_exc()
        print "SOCIAL_COMPLETE_EXCEPTION : ", Exception, ex
        # Redirect user to login page if user groups are configured
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if tenant.user_groups:
            return redirect(url_for('auth.choose_login'))
        abort(400)
