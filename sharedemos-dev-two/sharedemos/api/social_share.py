from flask import current_app, session
from flask.ext.restful import Resource, reqparse

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.utils import get_latest_entity
from sharedemos.models import (
    db,
    Section,
    SocialShare,
    Tenant,
    UserActivity,
    Walkthrough
)
parser = reqparse.RequestParser()

parser.add_argument('media_type', required=True, type=unicode,
                    location='json', help='Media type is required')
parser.add_argument('chapter_slug', type=unicode, location='json')
parser.add_argument('product_slug', type=unicode, location='json')
parser.add_argument('section_slug', type=unicode, location='json')


class SocialShareApi(Resource):

    def post(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        post_data = parser.parse_args()
        chapter_slug = post_data.get("chapter_slug")
        section_slug = post_data.get("section_slug")
        product_slug = post_data.get("product_slug")

        base_query = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_enabled.__eq__(True)) &
            (Section.is_deleted.__eq__(False))
        )

        product = None
        section = None
        if product_slug:
            product = base_query.filter(Section.slug == product_slug).first()
            if not product:
                product = get_latest_entity(product_slug, 'section')

        if product and product.is_private and tenant.flags.is_private:
            raise SharedemosException(
                400, message='social share option is only for public content')

        if section_slug:
            if product and section_slug == product_slug:
                section = product
            else:
                section = base_query.filter(
                    Section.slug == section_slug
                ).first()
            if not section:
                section = get_latest_entity(section_slug, 'section')

        user_id = session['user']['user_id']
        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first_or_404()

        social_share = SocialShare()
        social_share.product_id = product.id if product else None
        social_share.section_id = section.id if section else None
        social_share.tenant_id = tenant_id
        social_share.user_activity_id = user.id
        social_share.media_type = post_data.get("media_type")
        social_share.language_id = session['user']['locale']

        if chapter_slug:
            chapter = Walkthrough.query.filter(
                (Walkthrough.tenant_id == tenant_id),
                (Walkthrough.is_enabled.__eq__(True)),
                (Walkthrough.is_deleted.__eq__(False)),
                (Walkthrough.slug == chapter_slug)
            ).first()
            if not chapter:
                chapter = get_latest_entity(chapter_slug, 'walkthrough')
            social_share.chapter_id = chapter.id
        db.session.add(social_share)
        db.session.commit()
        return {'message': 'SUCCESS'}, 200
