import requests

from flask import current_app, request
from flask.ext.restful import Resource, fields, marshal

from sharedemos.libs.decorators import app_subscription_required
from sharedemos.models import SampleExchange
from sharedemos.cache import CacheManager

samples_api_fields = {
    "title": fields.String,
    "description": fields.String,
    "result_title": fields.String,
    "platform": fields.List(fields.String),
    "tags": fields.List(fields.String)
}


def get_samples(params, sample_id=None):
    """Get samples from vmware end Point."""
    # Headers format {x-vmware-code-client: localhost.com,sample-exchange}
    headers = {
        'x-vmware-code-client': u'{},{}'.format(
            request.host, 'sample-exchange'
        )
    }

    se_end_point = "https://apigw.vmware.com/sampleExchange/v1/search/samples"

    if sample_id:
        se_end_point = u'{}/{}'.format(se_end_point, sample_id)

    try:
        sample_data = requests.get(
            url=se_end_point,
            params=params,
            headers=headers
        )

    except Exception as e:
        print str(e)

    else:
        if sample_data.status_code == 200:
            return sample_data.json()


class SampleExchangeApi(Resource):
    """API to fecth Sample Exchange."""

    method_decorators = [app_subscription_required('SAMPLE_EXCHANGE')]

    def get(self, id=None, **kwargs):

        sample_details = SampleExchange.query.filter(
            SampleExchange.tenant_id == current_app.tenant_id
        ).first_or_404()

        request_params = {"modified": False}
        cache_manger = CacheManager()
        if id:
            sample = cache_manger.get(
                'sample_exchange', **{'object_id': id})

            if not sample:
                sample = get_samples(request_params, id)
                if sample:
                    cache_manger.add(
                        'sample_exchange',
                        sample, **{'object_id': id}
                    )

            return sample, 200

        se_api_response = cache_manger.get('sample_exchange')

        if not se_api_response:

            if sample_details.platform:
                request_params['req_platform'] = sample_details.platform

            all_samples = []
            for tag in sample_details.tags:
                request_params['req_tag'] = tag
                samples = get_samples(request_params)
                if samples:
                    all_samples.append({tag: samples})

            se_api_response = {
                'samples_api_data': marshal(
                    sample_details, samples_api_fields),
                'all_samples': all_samples
            }
            cache_manger.add('sample_exchange', se_api_response)

        return se_api_response, 200
