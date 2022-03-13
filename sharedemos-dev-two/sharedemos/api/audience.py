from datetime import datetime
from urlparse import urlparse
from email.MIMEText import MIMEText
from flask import (
    g, current_app,
    render_template
)
from flask.ext.restful import Resource, fields, marshal, reqparse
from sqlalchemy import func

from sharedemos.libs.api import format_data
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.decorators import app_subscription_required, has_author_access
from sharedemos.libs.helpers import (
    Mailer,
    add_date_time,
    get_utc_time,
    get_local_time
)
from sharedemos.libs.url import static_url
from sharedemos.models import (
    db, AudienceCompany,
    AudienceEmployee,
    AudienceSection,
    Section
)


class ExpiryDate(fields.DateTime):
    def output(self, key, obj):
        if not obj.expire_at:
            return None
        expiry_date = get_local_time(obj.tenant.timezone, obj.expire_at)
        return datetime.strftime(expiry_date, '%B %d, %Y')


employee = {
    'employee_id': fields.Integer(attribute='id'),
    'company_id': fields.Integer,
    'first_name': fields.String,
    'last_name': fields.String,
    'initials': fields.String,
    'email': fields.String,
    'email_sent': fields.Boolean,
}

audience = {
    'company_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'message': fields.String,
    'website_url': fields.String,
    'logo_file_name': fields.String(attribute='logo_url'),
    'logo_url': fields.String(
        attribute=lambda x: (static_url(filename='media/external_icons/' + x.logo_url) if x.logo_url else None)),
    'expire_at': ExpiryDate(),
    'unique_link_id': fields.String,
    'sections': fields.List(fields.String, default=[], attribute='sections_list'),
    'is_enabled': fields.Boolean,
    'is_private': fields.Boolean(attribute='tenant.flags.is_private'),
    'users': fields.Nested(employee, allow_null=True, attribute='audience_employees')
}


audience_data = reqparse.RequestParser()
audience_data.add_argument('name', required=True, type=unicode,
                           location='json', help='Company Name required')
audience_data.add_argument('message', required=True, type=unicode,
                           location='json', help='Company Message required')
audience_data.add_argument('website', required=True,
                           type=unicode, location='json', help='Website url required')
audience_data.add_argument('icon', required=True, type=unicode,
                           location='json', help='Website logo url required')
audience_data.add_argument(
    'company_id', type=int, default=None, location='json', help='Company id required')


shared_content = reqparse.RequestParser()
shared_content.add_argument('link_expiry_date', type=unicode, location='json')
shared_content.add_argument(
    'section_list', default=[], type=list, location='json')


def get_domain_name(url):
    parsed_url = urlparse(url)
    parsed_url = (parsed_url.scheme or 'http') + '://' + parsed_url.netloc

    return parsed_url


def notify_audience_user(tenant, audience_user):
    try:
        template_args = {
            'tenant': tenant,
            'audience_user': audience_user,
        }
        mailer = Mailer()
        mail_subject = audience_user.first_name.title(
        ) + ", you've got content waiting for you."
        mail_body = MIMEText((
            render_template('mail/notify_audience_user.html', **template_args)
        ).encode('ascii', 'ignore'), 'html')
        mailer.send_mail(audience_user.email, g.user.email,
                         mail_subject, mail_body)
        return True
    except Exception, e:
        print 'Audience Mailer exception', e
        return False


class AudienceCompanyApi(Resource):

    method_decorators = [has_author_access,
                         app_subscription_required('AUDIENCE')]

    def get(self, company_id=None):
        """ Get one company/all companies information """

        tenant_id = getattr(current_app, 'tenant_id', None)

        # Get specified company data
        if company_id:
            company_data = AudienceCompany.query.filter(
                (AudienceCompany.tenant_id == tenant_id) &
                (AudienceCompany.is_enabled.__eq__(True)) &
                (AudienceCompany.is_deleted.__eq__(False)) &
                (AudienceCompany.id == company_id)
            ).first()

            if not company_data:
                raise SharedemosException(404)

            # Filter deleted users
            company_data.audience_employees = [
                usr for usr in company_data.audience_employees if not usr.is_deleted]
            section_list = list()
            for sec in company_data.audience_sections_list:
                if sec.section.is_deleted or not sec.section.is_enabled:
                    continue
                section_list.append(sec.section.slug)
            company_data.sections_list = section_list

            return marshal(company_data, audience)

        audiences = AudienceCompany.query.filter(
            (AudienceCompany.tenant_id == tenant_id) &
            (AudienceCompany.is_enabled.__eq__(True)) &
            (AudienceCompany.is_deleted.__eq__(False))
        ).order_by(AudienceCompany.created_at).all()

        # Filter deleted users
        for aud in audiences:
            aud.audience_employees = [
                usr for usr in aud.audience_employees if not usr.is_deleted]
            section_list = list()
            for sec in aud.audience_sections_list:
                if sec.section.is_deleted or not sec.section.is_enabled:
                    continue
                section_list.append(sec.section.slug)
            aud.sections_list = section_list

        return marshal(audiences, audience)

    def post(self):
        """ Add new company information """

        try:
            company_data = audience_data.parse_args()
            tenant_id = getattr(current_app, 'tenant_id', None)
            audience_company = AudienceCompany.query.filter(
                (AudienceCompany.tenant_id == tenant_id) &
                (AudienceCompany.website_url == company_data['website'])
            ).first()

            # check if company profile exist with same url
            if audience_company:
                # check if company was deleted
                if audience_company.is_deleted:
                    audience_company.is_deleted = False
                    audience_company.message = ""
                    audience_company.expiry_date = None
                    audience_company.audience_employees = []
                    audience_company.audience_sections_list = []
                    db.session.add(audience_company)
                else:
                    return {'message': 'EXISTS'}, 200
            else:
                audience_company = AudienceCompany()
                audience_company.name = company_data['name']
                audience_company.message = company_data['message']
                audience_company.logo_url = unicode(company_data['icon'])
                audience_company.website_url = company_data['website']
                audience_company.tenant_id = tenant_id
                db.session.add(audience_company)

            db.session.commit()
            return {'message': 'SUCCESS'}, 200
        except Exception:
            raise SharedemosException(500, message='FAILED')

    def put(self, company_id):
        """ Update company information """

        try:
            if not company_id:
                raise SharedemosException(404)

            company_data = audience_data.parse_args()
            audience_company = AudienceCompany.query.filter(
                (AudienceCompany.id == company_id) &
                (AudienceCompany.is_deleted.__eq__(False))
            ).first()

            # check if company profile exist with same url
            if not audience_company:
                return {'message': 'NOT EXISTS'}, 404

            audience_company.name = company_data['name']
            audience_company.message = company_data['message']
            audience_company.logo_url = unicode(company_data['icon'])
            audience_company.website_url = company_data['website']
            db.session.add(audience_company)

            db.session.commit()
            return {'message': 'SUCCESS'}, 200
        except Exception:
            raise SharedemosException(500, message='FAILED')

    def patch(self, company_id):
        """ Add/Update content shared by company """

        try:
            shared_data = shared_content.parse_args()
            if not company_id:
                raise SharedemosException(404)

            tenant_id = getattr(current_app, 'tenant_id', None)
            audience_company = AudienceCompany.query.get(company_id)
            if not audience_company or audience_company.is_deleted or not audience_company.is_enabled:
                raise SharedemosException(404)

            try:
                link_expiry_date = None
                if shared_data['link_expiry_date']:
                    link_expiry_date = datetime.strptime(
                        shared_data['link_expiry_date'], "%m-%d-%Y")
                    link_expiry_date = add_date_time(
                        link_expiry_date, days=1, seconds=-1)
                    link_expiry_date = get_utc_time(
                        audience_company.tenant.timezone, link_expiry_date)
            except Exception:
                raise SharedemosException(500, message='DATE_PARSE_ERROR')

            audience_company.audience_sections_list = []
            if shared_data['section_list']:
                sections = Section.query.filter(
                    (Section.tenant_id == tenant_id) &
                    (Section.is_deleted.__eq__(False)) &
                    (Section.is_enabled.__eq__(True)) &
                    (Section.slug.in_(shared_data['section_list']))
                ).all()

                for section in sections:
                    sec = AudienceSection()
                    sec.section_id = section.id
                    sec.company_id = company_id
                    sec.tenant_id = tenant_id
                    db.session.add(sec)

            audience_company.expire_at = link_expiry_date

            db.session.add(audience_company)
            db.session.commit()
            return {'message': 'SUCCESS'}, 200

        except Exception:
            raise SharedemosException(500, message='FAILED')

    def delete(self, company_id):
        """ Delete company """

        try:
            if not company_id:
                raise SharedemosException(404)

            tenant_id = getattr(current_app, 'tenant_id', None)
            audience_company = AudienceCompany.query.filter(
                (AudienceCompany.id == company_id) &
                (AudienceCompany.tenant_id == tenant_id)
            ).first()

            if not audience_company:
                raise SharedemosException(404)

            audience_company.is_deleted = True

            db.session.add(audience_company)
            db.session.commit()

            return {'message': 'SUCCESS'}, 200
        except Exception:
            raise SharedemosException(500, message='FAILED')


employee_data = reqparse.RequestParser()
employee_data.add_argument('first_name', required=True, type=unicode,
                           location='json', help='Employee first name required')
employee_data.add_argument('last_name', required=True, type=unicode,
                           location='json', help='Employee last name required')
employee_data.add_argument('email', required=True, type=unicode,
                           location='json', help='Employee email required')


class AudienceEmployeeApi(Resource):

    method_decorators = [has_author_access,
                         app_subscription_required('AUDIENCE')]

    def get(self, company_id, user_id=None):
        """ Get one user/all users belongs to company """

        if not company_id:
            raise SharedemosException(404)

        tenant_id = getattr(current_app, 'tenant_id', None)
        # Get specified user data
        if user_id:
            user_data = AudienceEmployee.query.filter(
                (AudienceEmployee.tenant_id == tenant_id) &
                (AudienceEmployee.is_deleted.__eq__(False)) &
                (AudienceEmployee.company_id == company_id) &
                (AudienceEmployee.id == user_id)
            ).first()
            if not user_data:
                raise SharedemosException(404)
            return format_data(marshal(user_data, employee))

        users_list = AudienceEmployee.query.filter(
            (AudienceEmployee.tenant_id == tenant_id) &
            (AudienceEmployee.is_deleted.__eq__(False)) &
            (AudienceEmployee.company_id == company_id)
        ).all()
        return format_data(marshal(users_list, employee))

    def post(self, company_id):
        """ Save employee information """

        try:
            user_data = employee_data.parse_args()
            if not company_id:
                raise SharedemosException(404)

            tenant_id = getattr(current_app, 'tenant_id', None)

            company = AudienceCompany.query.get(company_id)
            if not company:
                raise SharedemosException(404)

            employee = AudienceEmployee.query.filter(
                (AudienceEmployee.tenant_id == tenant_id) &
                (func.lower(AudienceEmployee.email) == func.lower(user_data['email'])) &
                (AudienceEmployee.company_id == company_id)
            ).first()

            if employee:
                if not employee.is_deleted:
                    return {'message': 'EXISTS'}, 400
                employee.is_deleted = False
            else:
                employee = AudienceEmployee()
                employee.tenant_id = tenant_id
                employee.email = user_data['email'].lower()
                employee.company = company

            employee.first_name = user_data['first_name']
            employee.last_name = user_data['last_name']

            db.session.add(employee)
            db.session.flush()
            email_status = notify_audience_user(company.tenant, employee)
            employee.email_sent = email_status
            db.session.add(employee)

            db.session.commit()

            return {'message': 'SUCCESS'}, 200

        except Exception:
            raise SharedemosException(500, message='FAILED')

    def put(self, company_id, user_id):
        """ Update employee information """

        try:
            user_data = employee_data.parse_args()
            if not company_id or not user_id:
                raise SharedemosException(404)

            tenant_id = getattr(current_app, 'tenant_id', None)
            employee = AudienceEmployee.query.filter(
                (AudienceEmployee.tenant_id == tenant_id) &
                (AudienceEmployee.id == user_id) &
                (AudienceEmployee.company_id == company_id) &
                (AudienceEmployee.is_deleted.__eq__(False))
            ).first()

            if not employee:
                raise SharedemosException(404)

            if user_data['email'].lower() != employee.email.lower():
                new_employee = AudienceEmployee.query.filter(
                    (AudienceEmployee.tenant_id == tenant_id) &
                    (func.lower(AudienceEmployee.email) == func.lower(user_data['email'])) &
                    (AudienceEmployee.is_deleted.__eq__(False)) &
                    (AudienceEmployee.company_id == company_id)
                ).first()
                if new_employee:
                    return {'message': 'EXISTS'}, 400
                employee.email_sent = False

            employee.first_name = user_data['first_name']
            employee.last_name = user_data['last_name']
            employee.email = user_data['email'].lower()
            if not employee.email_sent:
                db.session.add(employee)
                email_status = notify_audience_user(
                    employee.company.tenant, employee)
                employee.email_sent = email_status

            db.session.add(employee)
            db.session.commit()

            return {'message': 'SUCCESS'}, 200
        except Exception:
            raise SharedemosException(500, message='FAILED')

    def delete(self, company_id, user_id):
        """ Delete employee """

        try:
            if not company_id or not user_id:
                raise SharedemosException(404)

            tenant_id = getattr(current_app, 'tenant_id', None)
            employee = AudienceEmployee.query.filter(
                (AudienceEmployee.tenant_id == tenant_id) &
                (AudienceEmployee.id == user_id) &
                (AudienceEmployee.company_id == company_id) &
                (AudienceEmployee.is_deleted.__eq__(False))
            ).first()

            if not employee:
                raise SharedemosException(404)

            employee.is_deleted = True

            db.session.add(employee)
            db.session.commit()

            return {'message': 'SUCCESS'}, 200
        except Exception:
            raise SharedemosException(500, message='FAILED')
