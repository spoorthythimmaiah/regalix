from flask import current_app, session
from flask.ext.restful import fields, reqparse, Resource, marshal

from sharedemos.libs.api import format_data
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    create_cta,
    get_locale_translation,
    log_last_activity
)
from sharedemos.models import (
    db,
    LeadCTAForm,
    Tenant
)

cta_details = {
    'cta_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'cta_button': fields.Raw,
}


parser = reqparse.RequestParser()
parser.add_argument('name', required=True, type=unicode,
                    location='json', help='CTA name required')
parser.add_argument('options', required=True, type=dict,
                    location='json', help='CTA options required')


class CTAFormApi(Resource):

    def get(self, id=None):

        tenant_id = getattr(current_app, 'tenant_id', None)

        if id:
            cta = LeadCTAForm.query.filter(
                LeadCTAForm.tenant_id == tenant_id,
                LeadCTAForm.id == id
            ).first_or_404()
            trans = get_locale_translation(cta)
            cta.name = trans.name
            cta.cta_button = trans.cta_button

            return format_data(marshal(cta, cta_details)), 200

        all_cta = LeadCTAForm.query.filter(
            LeadCTAForm.tenant_id == tenant_id
        ).all()

        cta_list = []
        for cta in all_cta:
            trans = get_locale_translation(cta)
            if not trans:
                continue
            cta.name = trans.name
            cta.cta_button = trans.cta_button
            cta_list.append(cta)

        return format_data(marshal(cta_list, cta_details)), 200

    def post(self):

        tenant_id = current_app.tenant_id
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name
            )

        post_data = parser.parse_args()
        cta = create_cta(post_data, tenant.default_locale_id)
        log_last_activity('created', 'CTA', cta)
        db.session.commit()

        return format_data(marshal(cta, cta_details))
