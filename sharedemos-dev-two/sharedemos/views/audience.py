from datetime import datetime

from flask import (
    Blueprint,
    abort,
    current_app,
    flash,
    redirect,
    render_template,
    request,
    session,
    url_for
)
from sharedemos.models import (
    db, AudienceCompany,
    AudienceEmployee,
    Tenant
)
from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.helpers import encrypt_password


audience = Blueprint('audience', __name__)


def get_template_args(tenant_id):

    """ Function to return template args"""

    airbrake_api_key = current_app.config.get('AIRBRAKE_API_KEY')
    airbrake_project_id = current_app.config.get('AIRBRAKE_PROJECT_ID')
    cache_buster = current_app.config.get('CACHE_BUSTER', datetime.strftime(datetime.now(), '%Y%m%d%H%M%S'))
    tenant = Tenant.query.get(tenant_id)
    languages = [{'id': tenant.default_locale.id, 'name': tenant.default_locale.name}]
    for language in tenant.supported_locales:
        if language.id != tenant.default_locale.id:
            languages.append({'id': language.id, 'name': language.name})
    selected_language = session['user']['locale']
    for language in languages:
        if language['id'] == selected_language:
            language['selected'] = True
            break
    project_env = current_app.config.get('PROJECT_ENV')

    return {
        "airbrake_api_key": airbrake_api_key,
        "airbrake_project_id": airbrake_project_id,
        "cache_buster": cache_buster,
        "languages": languages,
        "project_env": project_env,
        "tenant": tenant,
        "view_type": 'audience',
    }


@audience.route('/<company_id>/<unique_user_id>')
@app_subscription_required("AUDIENCE")
def home(company_id, unique_user_id):

    """ Audiences home page """
    tenant_id = getattr(current_app, 'tenant_id', None)

    if 'audience' not in session['user'] \
            or session['user']['audience']['company_id'] != company_id or\
            session['user']['audience']['employee_id'] != unique_user_id or\
            session['user']['audience']['tenant_id'] != tenant_id:
        return redirect(url_for('audience.register', company_id=company_id, unique_user_id=unique_user_id))

    employee = AudienceEmployee.query.join(AudienceCompany).filter(
        (AudienceCompany.is_enabled.__eq__(True)) &
        (AudienceCompany.is_deleted.__eq__(False)) &
        (AudienceCompany.tenant_id == tenant_id) &
        (AudienceCompany.unique_link_id == company_id) &
        (AudienceEmployee.tenant_id == tenant_id) &
        (AudienceEmployee.unique_user_id == unique_user_id) &
        (AudienceEmployee.is_deleted.__eq__(False))
    ).first_or_404()

    if employee.company.expire_at and employee.company.expire_at < datetime.utcnow():
        abort(404)

    template_args = get_template_args(tenant_id)
    template_args.update({
        'employee': employee
    })
    return render_template('audience/home.html', **template_args)


@audience.route('/register/<company_id>/<unique_user_id>', methods=['GET', 'POST'])
@app_subscription_required("AUDIENCE")
def register(company_id, unique_user_id):

    """ Register audience user """

    tenant_id = getattr(current_app, 'tenant_id', None)
    employee = AudienceEmployee.query.join(AudienceCompany).filter(
        (AudienceCompany.is_enabled.__eq__(True)) &
        (AudienceCompany.is_deleted.__eq__(False)) &
        (AudienceCompany.tenant_id == tenant_id) &
        (AudienceCompany.unique_link_id == company_id) &
        (AudienceEmployee.unique_user_id == unique_user_id) &
        (AudienceEmployee.tenant_id == tenant_id) &
        (AudienceEmployee.is_deleted.__eq__(False))
    ).first_or_404()

    if request.method == 'POST':
        if not employee.password:
            employee.password = encrypt_password(request.form['password'])
            db.session.add(employee)
            db.session.commit()

        if 'audience' not in session['user']:
            session['user']['audience'] = dict()

        session['user']['audience'] = {
            'company_id': company_id,
            'employee_id': unique_user_id,
            'tenant_id': employee.tenant_id
        }
        session.modified = True
        return redirect(url_for('audience.home', company_id=company_id, unique_user_id=unique_user_id))

    if employee.password:
        return redirect(url_for('audience.login', company_id=company_id, unique_user_id=unique_user_id))

    return render_template('audience/register.html', employee=employee)


@audience.route('/login/<company_id>/<unique_user_id>', methods=['GET', 'POST'])
@app_subscription_required("AUDIENCE")
def login(company_id, unique_user_id):

    """ Login audience user """

    tenant_id = getattr(current_app, 'tenant_id', None)
    employee = AudienceEmployee.query.join(AudienceCompany).filter(
        (AudienceCompany.is_enabled.__eq__(True)) &
        (AudienceCompany.is_deleted.__eq__(False)) &
        (AudienceCompany.tenant_id == tenant_id) &
        (AudienceCompany.unique_link_id == company_id) &
        (AudienceEmployee.tenant_id == tenant_id) &
        (AudienceEmployee.unique_user_id == unique_user_id) &
        (AudienceEmployee.is_deleted.__eq__(False))
    ).first_or_404()

    if request.method == 'POST':
        if employee.password != encrypt_password(request.form['password']):
            flash('Your password is not valid')
            return redirect(url_for('audience.login', company_id=company_id, unique_user_id=unique_user_id))

        elif 'audience' not in session['user']:
            session['user']['audience'] = dict()

        session['user']['audience'] = {
            'company_id': company_id,
            'employee_id': unique_user_id,
            'tenant_id': employee.tenant_id
        }
        return redirect(url_for('audience.home', company_id=company_id, unique_user_id=unique_user_id))

    if not employee.password:
        return redirect(url_for('audience.register', company_id=company_id, unique_user_id=unique_user_id))

    if 'audience' not in session['user']:
        return render_template('audience/login.html', employee=employee)
    elif session['user']['audience']['company_id'] != company_id\
            or session['user']['audience']['employee_id'] != unique_user_id\
            or session['user']['audience']['tenant_id'] != tenant_id:
        # match user and company with existing session's data and clear from session if not matched
        session['user'].pop('audience')
        return render_template('audience/login.html', employee=employee)

    return redirect(url_for('audience.home', company_id=company_id, unique_user_id=unique_user_id))


@audience.route('/<company_id>/<unique_user_id>/logout')
@app_subscription_required("AUDIENCE")
def logout(company_id, unique_user_id):
    session['user'].pop('audience')
    return redirect(url_for('audience.login', company_id=company_id, unique_user_id=unique_user_id))
