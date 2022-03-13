"""Recommendations App API."""
import requests
from requests.auth import HTTPBasicAuth

from flask import g, current_app, jsonify
from flask.ext.restful import fields, Resource, marshal

from sharedemos.libs.decorators import app_subscription_required, login_required
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import build_url
from sharedemos.libs.utils import get_valid_chapters

from .helpers import (
    ActivityHistory,
    is_new_user
)


chapter_fields = {
    "slug": fields.String,
    "name": fields.String,
    "thumbnail": fields.String,
    "url": fields.String,
    "breadcrumb": fields.String
}


class RecommendationApi(Resource):
    """API to fetch user recommendations from recommendation-service."""

    @app_subscription_required("RECOMMENDATIONS")
    @login_required
    def get(self):
        """
        GET request to fetch assets/chapters.

        When a GET request is initiated,
        the session's logged-in user activity records are fetched to
        observe his previous read assets/chapters.
        Based on this, the previous set of 5(default) asset ids are passed
        into the service api to fetch a list of recommended assets.
        If the user is new or not viewed any content,
        then based on his group, the popular contents amoung his group
        are fetched as the recommended content.
        """
        user = g.user

        chapters = []

        activity_history = ActivityHistory()

        if is_new_user(user):
            chapters = activity_history.fetch_default_recommendations()

        else:

            _history = activity_history.fetch_activity_history()

            # If there is no valid activity history,
            # then fetch default recommendations.
            if not _history['ids']:
                chapters = activity_history.fetch_default_recommendations()

            if (
                _history['type'] == 'chapter' and
                _history['ids']
            ):
                try:
                    auth = HTTPBasicAuth(
                        current_app.config['RECOMMENDATIONS_USERNAME'],
                        current_app.config['RECOMMENDATIONS_PASSWORD']
                    )
                    # Get the recommendations from api service.
                    response = requests.get(
                        current_app.config['RECOMMENDATIONS_URL'],
                        auth=auth,
                        headers={
                            'Content-type': 'application/json',
                            'testing': current_app.config['RECOMMENDATIONS_TESTING_FLAG'],
                            'previous': _history['ids'],
                            'version': current_app.config['RECOMMENDATIONS_ENGINE_VERSION']
                        }
                    ).json()

                except Exception as e:
                    raise SharedemosException(status_code=500, message=unicode(e.message))

                else:
                    # Check for failed status.
                    if not response:
                        return jsonify(
                            status='FAILED',
                            message='No recommendations found for the user {}'.format(
                                user.username
                            )
                        )

                    if (
                        response and
                        response['execution']['status'] == 'FAILED'
                    ):
                        return jsonify(
                            status='FAILED',
                            message=response['execution']['description']
                        )

                    # If response is successful, then fetch valid chapter details.
                    chapter_ids = [int(i) for i in response['recommendation']]
                    chapters = get_valid_chapters(chapter_ids)[:activity_history.limit]

        if not chapters:
            return jsonify(status=None)

        chapters_list = []
        for chapter in chapters:
            section = chapter.Section
            product = section.get_category()
            product_name = product.get_name()
            chapter_name = chapter.Walkthrough.get_name()
            breadcrumb = u'{} > {} > {}'.format(
                product_name, section.get_name(), chapter_name
            )
            if section == product:
                breadcrumb = u'{} > {}'.format(product_name, chapter_name)

            chapters_list.append({
                'slug': chapter.Walkthrough.slug,
                'thumbnail': chapter.Walkthrough.get_thumbnail(),
                'name': chapter_name,
                'url': build_url(section.slug, chapter.Walkthrough.slug),
                'breadcrumb': breadcrumb
            })

        return marshal(chapters_list, chapter_fields)
