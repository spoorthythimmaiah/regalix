from datetime import datetime
from collections import Counter

from flask import current_app, g, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse

from sqlalchemy.sql import func

from sharedemos.libs.api import format_data

from sharedemos.libs.decorators import (
    app_subscription_required,
    has_commenter_access,
    has_author_access
)
from sharedemos.libs.helpers import add_date_time
from sharedemos.libs.model import (
    get_time_bounds,
    get_progress_difference,
)
from sharedemos.libs.utils import get_latest_entity
from sharedemos.models import (
    db,
    Message,
    Playlist,
    Rating,
    Section,
    SectionTranslations,
    Slide,
    Tenant,
    UserActivity,
    Walkthrough,
    WalkthroughTranslations
)

RATINGS_PER_PAGE = 10

highest_lowest_section_api_fields = {
    "avg_rating": fields.Float,
    "section_id": fields.Integer,
    "section_name": fields.String,
    "product_id": fields.Integer,
}
highest_lowest_chapter_api_fields = {
    "avg_rating": fields.Float,
    "chapter_id": fields.Integer,
    "chapter_name": fields.String,
    "section_id": fields.Integer,
    "product_id": fields.Integer,
}
rating_feedback_progres_fields = {
    "count": fields.Integer,
    "progress": fields.Float
}
category_api_fields = {
    "comments": fields.Integer,
    "product_name": fields.String,
    "product_id": fields.Integer,
    "ratings": fields.Integer,
    "section_id": fields.Integer(default=None),
    "section_name": fields.String,
    "is_deleted": fields.Boolean,
    "is_enabled": fields.Boolean(default=True)
}
rating_api_fields = {
    "categories": fields.Nested(category_api_fields),
    "feedback_received": fields.Nested(rating_feedback_progres_fields),
    "highest_rated_section": fields.Nested(highest_lowest_section_api_fields),
    "highest_rated_chapter": fields.Nested(highest_lowest_chapter_api_fields),
    "lowest_rated_section": fields.Nested(highest_lowest_section_api_fields),
    "lowest_rated_chapter": fields.Nested(highest_lowest_chapter_api_fields),
    "rating_received": fields.Nested(rating_feedback_progres_fields),
}
rating_comments_api_fields = {
    "chapter_name": fields.String,
    "chapter_id": fields.Integer,
    "comments": fields.String,
    "created_at": fields.DateTime(dt_format='rfc822'),
    "ratings": fields.Integer,
    "is_deleted": fields.Boolean,
    "is_enabled": fields.Boolean(default=True)
}
chapter_details_fields = {
    "chapter_id": fields.Integer,
    "chapter_name": fields.String
}
section_details_fields = {
    "section_id": fields.Integer,
    "section_name": fields.String
}
product_details_fields = {
    "product_id": fields.Integer,
    "product_name": fields.String
}
chapter_rating_api_fields = {
    "content_ratings": fields.Nested(rating_comments_api_fields),
    "is_leaf_node": fields.Boolean(default=False),
    "page": fields.Integer,
    "total_rating": fields.Integer,
    "avg_rating": fields.Float,
    "chapter_details": fields.Nested(chapter_details_fields),
    "section_details": fields.Nested(section_details_fields),
    "product_details": fields.Nested(product_details_fields)
}
section_rating_api_fields = {
    "is_leaf_node": fields.Boolean(default=False),
    "page": fields.Integer,
    "content_ratings": fields.Nested(rating_comments_api_fields),
    "avg_rating": fields.Float,
    "total_rating": fields.Integer,
    "section_details": fields.Nested(section_details_fields),
    "product_details": fields.Nested(product_details_fields)
}
product_rating_api_fields = {
    "categories": fields.Nested(category_api_fields),
    "is_leaf_node": fields.Boolean(default=False),
    "product_details": fields.Nested(product_details_fields)
}
msg_parser = reqparse.RequestParser()
msg_parser.add_argument('slide_id', required=True, type=int,
                        location='json', help='Slide id required')
msg_parser.add_argument('message', required=True, type=unicode,
                        location='json', help='Message required')


def get_products(product_id, tenant_id, tenant_locale_id, ):
    products = Section.query.join(
        SectionTranslations
    ).filter(
        (SectionTranslations.language_id == tenant_locale_id),
        (Section.tenant_id == tenant_id),
    )
    if product_id == 'all':
        products = products.filter(
            Section.parent_id.is_(None)
        )
    else:
        products = products.filter(
            Section.id == product_id
        )
    products = products.with_entities(
        Section.id,
        SectionTranslations.name,
        Section.is_deleted,
        Section.is_enabled
    ).all()
    return products


def get_available_section_ids(tenant_id):
    section_list = Section.query.join(
        Rating,
        Rating.section_id == Section.id
    ).filter(
        Section.tenant_id == tenant_id,
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True)
    ).with_entities(
        Section
    ).all()
    return [section.id for section in section_list
            if section.is_available()]


def get_available_chapter_ids(tenant_id, available_section_ids):
    chapter_list = Rating.query.join(
        Walkthrough,
        Rating.chapter_id == Walkthrough.id
    ).join(
        Playlist
    ).join(
        Section
    ).filter(
        Walkthrough.tenant_id == tenant_id,
        Walkthrough.is_deleted.__eq__(False),
        Walkthrough.is_enabled.__eq__(True),
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True),
        Playlist.is_deleted.__eq__(False),
        Playlist.is_enabled.__eq__(True)
    ).with_entities(
        Section.id.label("section_id"),
        Walkthrough.id.label("chapter_id")
    ).all()

    return [chapter_id for section_id, chapter_id in chapter_list
            if section_id in available_section_ids]


def get_highest_lowest_rated_sections(base_query, tenant_locale_id,
                                      available_section_ids):
    """
    Finding highest rated and lowest rated section.

    It takes base_query, tenanat_locale_id, available_section_ids as parameters
    For finding the highest/lowest rated section, we are considering the
    ratings of the section along with ratings of it's chapters.
    section modified date is using as the second filtering paramter for finding
    the highest/lowest rated section.
    """
    section_ratings = base_query.join(
        Section,
        Rating.section_id == Section.id
    ).join(
        SectionTranslations,
    ).filter(
        SectionTranslations.language_id == tenant_locale_id,
        Rating.section_id.in_(available_section_ids)
    ).with_entities(
        Rating.section_id,
        Rating.product_id,
        Section.modified_at,
        SectionTranslations.name,
        func.avg(Rating.value).label("avg_rating")
    ).group_by(
        Rating.section_id,
        Rating.product_id,
        Section.modified_at,
        SectionTranslations.name
    ).all()

    highest_rated_section = {}
    lowest_rated_section = {}
    if section_ratings:
        h_rated_section = max(section_ratings,
                              key=lambda x: (x.avg_rating,
                                             x.modified_at))
        l_rated_section = min(section_ratings,
                              key=lambda x: (x.avg_rating,
                                             x.modified_at))

        highest_rated_section["section_name"] = h_rated_section.name
        highest_rated_section["avg_rating"] = round(
            h_rated_section.avg_rating * 2) / 2
        highest_rated_section["section_id"] = h_rated_section.section_id
        highest_rated_section["product_id"] = h_rated_section.product_id

        lowest_rated_section["section_name"] = l_rated_section.name
        lowest_rated_section["avg_rating"] = round(
            l_rated_section.avg_rating * 2) / 2
        lowest_rated_section["section_id"] = l_rated_section.section_id
        lowest_rated_section["product_id"] = l_rated_section.product_id

    return highest_rated_section, lowest_rated_section


def get_highest_lowest_rated_chapters(base_query, tenant_locale_id,
                                      available_chapter_ids):
    """
    Finding the highest and lowest rated chapter.

    It takes base_query, tenant_locale_id, available_chapter_ids as paramters,
    chapter modified date is used as second filtering parameter for finding
    the highes/lowest rated chapter
    """
    chapter_ratings = base_query.join(
        Walkthrough,
        Walkthrough.id == Rating.chapter_id
    ).join(
        WalkthroughTranslations
    ).filter(
        WalkthroughTranslations.language_id == tenant_locale_id,
        Rating.chapter_id.isnot(None),
        Rating.chapter_id.in_(available_chapter_ids),
    ).with_entities(
        Rating.chapter_id,
        Rating.section_id,
        Rating.product_id,
        WalkthroughTranslations.name,
        func.avg(Rating.value).label("avg_rating"),
        Walkthrough.modified_at
    ).group_by(
        Rating.chapter_id,
        Rating.section_id,
        Rating.product_id,
        Walkthrough.modified_at,
        WalkthroughTranslations.name
    ).all()

    highest_rated_chapter = {}
    lowest_rated_chapter = {}
    if chapter_ratings:
        h_rated_chapter = max(chapter_ratings,
                              key=lambda x: (x.avg_rating,
                                             x.modified_at))
        l_rated_chapter = min(chapter_ratings,
                              key=lambda x: (x.avg_rating,
                                             x.modified_at))

        highest_rated_chapter["chapter_name"] = h_rated_chapter.name
        highest_rated_chapter["avg_rating"] = round(
            h_rated_chapter.avg_rating * 2) / 2
        highest_rated_chapter["chapter_id"] = h_rated_chapter.chapter_id
        highest_rated_chapter["section_id"] = h_rated_chapter.section_id
        highest_rated_chapter["product_id"] = h_rated_chapter.product_id

        lowest_rated_chapter["chapter_name"] = l_rated_chapter.name
        lowest_rated_chapter["avg_rating"] = round(
            l_rated_chapter.avg_rating * 2) / 2
        lowest_rated_chapter["chapter_id"] = l_rated_chapter.chapter_id
        lowest_rated_chapter["section_id"] = l_rated_chapter.section_id
        lowest_rated_chapter["product_id"] = l_rated_chapter.product_id

    return highest_rated_chapter, lowest_rated_chapter


def get_all_categories_ratings(cur_rating_received, products):
    """
    Return list of all the products with the count of ratings and comments.

    It takes cur_rating_received and list of the products as the parameters.
    """
    cur_feedback_received = [rating for rating in cur_rating_received
                             if rating.comments]
    section_ratings_count = dict(
        Counter([rating.product_id for rating in cur_rating_received])
    )
    section_feedback_count = dict(
        Counter([rating.product_id for rating in cur_feedback_received])
    )
    categories = [{
        "is_enabled": product.is_enabled,
        "is_deleted": product.is_deleted,
        "product_name": product.name,
        "product_id": product.id,
        "ratings": section_ratings_count.get(product.id),
        "comments": section_feedback_count.get(product.id)
    } for product in products if section_ratings_count.get(product.id)
    ]
    return categories


def get_rating_feedback_progress(cur_rating_received, prev_rating_received):
    """
    Return rating progress and feedback progress.

    It takes cur_rating_received and prev_rating_received as the parameters.
    """
    cur_feedback_received = len(
        [rating for rating in cur_rating_received if rating.comments]
    )
    prev_feedback_received = len(
        [rating for rating in prev_rating_received if rating.comments]
    )

    rating_progress = get_progress_difference(
        len(cur_rating_received),
        len(prev_rating_received)
    )
    feedback_progress = get_progress_difference(
        cur_feedback_received,
        prev_feedback_received
    )

    rating_received = {
        "count": len(cur_rating_received),
        "progress": rating_progress
    }
    feedback_received = {
        "count": cur_feedback_received,
        "progress": feedback_progress
    }
    return rating_received, feedback_received


def get_all_leaf_sections(section_id, children=None):
    """
    Return list of ids of all the leaf node sections.

    It takes section id and empty list as the paramters.
    """
    if children is None:
        children = []
    _sections = Section.query.filter(
        Section.parent_id == section_id,
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True)
    ).all()
    for _section in _sections:
        children.append(_section.id)
        children = get_all_leaf_sections(_section.id, children)
    return children


def get_section_ratings(base_query, section_id, cur_start_date,
                        cur_end_date, page, tenant):
    section_rating_info = Rating.query.join(
        SectionTranslations,
        SectionTranslations.section_id == Rating.section_id
    ).filter(
        SectionTranslations.language_id == tenant.default_locale_id,
        Rating.tenant_id == tenant.id,
        Rating.section_id == section_id,
        Rating.created_at.between(cur_start_date, cur_end_date)
    ).with_entities(
        SectionTranslations.name,
        Rating.product_id,
        func.avg(Rating.value).label("avg_rating"),
        func.count(Rating.value).label("total_rating")
    ).group_by(
        Rating.product_id,
        SectionTranslations.name,
        Rating.section_id
    ).first()

    ratings = base_query.with_entities(
        Rating.chapter_id,
        Rating.comments,
        Rating.created_at,
        Rating.value,
    ).paginate(page, RATINGS_PER_PAGE)
    ratings = ratings.items

    chapter_ids = [rating.chapter_id for rating in ratings
                   if rating.chapter_id]
    chapter_dict = {}
    if chapter_ids:
        chapters = Walkthrough.query.filter(
            Walkthrough.id.in_(chapter_ids)
        ).join(
            WalkthroughTranslations
        ).filter(
            WalkthroughTranslations.language_id == tenant.default_locale_id
        ).with_entities(
            Walkthrough.id,
            Walkthrough.is_enabled,
            Walkthrough.is_deleted,
            WalkthroughTranslations.name
        ).all()
        chapter_dict = {
            chapter.id: {
                'name': chapter.name,
                'is_enabled': chapter.is_enabled,
                'is_deleted': chapter.is_deleted
            } for chapter in chapters
        }

    product_name = None
    if section_id == section_rating_info.product_id:
        product_name = section_rating_info.name
    else:
        product = SectionTranslations.query.filter(
            SectionTranslations.language_id == tenant.default_locale_id,
            SectionTranslations.section_id == section_rating_info.product_id
        ).with_entities(SectionTranslations.name).first()
        product_name = product.name

    section_details = {
        "section_id": section_id,
        "section_name": section_rating_info.name
    }
    product_details = {
        "product_id": section_rating_info.product_id,
        "product_name": product_name
    }
    chapters_rating = [{
        'ratings': rating.value,
        'comments': rating.comments if rating.comments else None,
        'created_at': rating.created_at,
        'chapter_name': chapter_dict.get(rating.chapter_id, {}).get('name'),
        'is_deleted': chapter_dict.get(rating.chapter_id, {}).get('is_deleted'),
        'is_enabled': chapter_dict.get(rating.chapter_id, {}).get('is_enabled'),
        'chapter_id': rating.chapter_id
        if rating.chapter_id else None
    } for rating in ratings]

    section_response = {
        "content_ratings": chapters_rating,
        "is_leaf_node": True,
        "page": page,
        "avg_rating": round(section_rating_info.avg_rating * 2) / 2,
        "total_rating": round(section_rating_info.total_rating * 2) / 2,
        "section_details": section_details,
        "product_details": product_details
    }
    return format_data(
        marshal(section_response, section_rating_api_fields)
    )


def get_chapter_ratings(base_query, chapter_id, cur_start_date,
                        cur_end_date, page, tenant):
    chapter_rating_info = Rating.query.join(
        WalkthroughTranslations,
        WalkthroughTranslations.walkthrough_id == Rating.chapter_id
    ).filter(
        WalkthroughTranslations.language_id == tenant.default_locale_id,
        Rating.tenant_id == tenant.id,
        Rating.chapter_id == chapter_id,
        Rating.created_at.between(cur_start_date, cur_end_date)
    ).with_entities(
        WalkthroughTranslations.name,
        Rating.section_id,
        Rating.product_id,
        func.count(Rating.value).label("total_rating"),
        func.avg(Rating.value).label("avg_rating")
    ).group_by(
        Rating.chapter_id,
        Rating.section_id,
        Rating.product_id,
        WalkthroughTranslations.name
    ).first()

    ratings = base_query.join(
        WalkthroughTranslations,
        Rating.chapter_id == WalkthroughTranslations.walkthrough_id
    ).filter(
        WalkthroughTranslations.language_id == tenant.default_locale_id,
        Rating.chapter_id == chapter_id
    ).with_entities(
        Rating.value,
        Rating.comments,
        Rating.created_at,
    ).paginate(page, RATINGS_PER_PAGE)
    ratings = ratings.items

    section = SectionTranslations.query.filter(
        SectionTranslations.language_id == tenant.default_locale_id,
        SectionTranslations.section_id == chapter_rating_info.section_id
    ).with_entities(SectionTranslations.name).first()

    product = None
    if chapter_rating_info.section_id == chapter_rating_info.product_id:
        product = section
    else:
        product = SectionTranslations.query.filter(
            SectionTranslations.language_id == tenant.default_locale_id,
            SectionTranslations.section_id == chapter_rating_info.product_id
        ).with_entities(SectionTranslations.name).first()

    chapter_details = {
        "chapter_name": chapter_rating_info.name,
        "chapter_id": chapter_id
    }
    section_details = {
        "section_name": section.name,
        "section_id": chapter_rating_info.section_id
    }
    product_details = {
        "product_name": product.name,
        "product_id": chapter_rating_info.product_id
    }
    chapter_response = [{
        'ratings': rating.value,
        'comments': rating.comments if rating.comments else None,
        'created_at': rating.created_at
    } for rating in ratings]

    chapter_response = {
        "content_ratings": chapter_response,
        "is_leaf_node": True,
        "page": page,
        "chapter_details": chapter_details,
        "section_details": section_details,
        "product_details": product_details,
        "avg_rating": round(chapter_rating_info.avg_rating * 2) / 2,
        "total_rating": chapter_rating_info.total_rating
    }
    return format_data(
        marshal(chapter_response, chapter_rating_api_fields)
    )


def get_all_sections(children, cur_start_date, cur_end_date,
                     product_id, tenant):
    """
    Returns the list of all the sections of the given product,
    with count of ratings and comments. It also returns the product details
    """
    ratings = Rating.query.join(
        Section,
        Section.id == Rating.section_id
    ).join(
        SectionTranslations
    ).filter(
        SectionTranslations.language_id == tenant.default_locale_id,
        Section.is_deleted.__eq__(False),
        Section.is_enabled.__eq__(True),
        Rating.product_id == product_id,
        Rating.created_at.between(cur_start_date, cur_end_date),
        Rating.section_id.in_(children)
    ).with_entities(
        Rating.section_id,
        func.count(Rating.value).label("total_ratings"),
        func.count(Rating.comments).label("total_comments"),
        SectionTranslations.name
    ).group_by(
        Rating.section_id,
        SectionTranslations.name
    ).all()

    product = SectionTranslations.query.filter(
        SectionTranslations.language_id == tenant.default_locale_id,
        SectionTranslations.section_id == product_id
    ).with_entities(SectionTranslations.name).first()

    product_details = {
        "product_id": product_id,
        "product_name": product.name
    }

    categories = [{
        "ratings": rating.total_ratings,
        "comments": rating.total_comments,
        "section_name": rating.name,
        "section_id": rating.section_id,
        "product_id": product_id,
    } for rating in ratings]

    prodcut_response = {
        "categories": categories,
        "is_leaf_node": False,
        "product_details": product_details
    }
    return format_data(
        marshal(prodcut_response, product_rating_api_fields)
    )


class MessageApi(Resource):

    method_decorators = [app_subscription_required('MESSAGING')]

    @has_commenter_access
    def post(self):

        post_data = msg_parser.parse_args()
        slide = Slide.query.filter(
            (Slide.id == post_data['slide_id']) &
            (Slide.is_deleted.__eq__(False))
        ).first_or_404()

        tenant_id = getattr(current_app, 'tenant_id', None)
        message = Message()
        message.tenant_id = tenant_id
        message.slide_id = slide.id
        message.text = post_data['message']
        message.user_id = g.user.id
        db.session.add(message)
        db.session.commit()

        return {'status': 'SUCCESS'}, 200


rating_parser = reqparse.RequestParser()
rating_parser.add_argument('chapter_slug', type=unicode, location='json')
rating_parser.add_argument('comment', type=unicode, location='json')
rating_parser.add_argument('rate_value', required=True, type=int,
                           location='json', help='Rating value required')
rating_parser.add_argument('product_slug', required=True, type=unicode,
                           location='json', help='product slug required')
rating_parser.add_argument('section_slug', required=True, type=unicode,
                           location='json', help='Section slug required')


class RatingApi(Resource):

    method_decorators = [app_subscription_required('RATING')]

    def get(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        from_date = request.args.get('from_date')
        to_date = request.args.get('to_date')
        date_range = request.args.get('date_range')
        product_id = request.args.get('category_id')

        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)

        cur_start_date, cur_end_date, pr_st_date, pr_ed_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        tenant_locale_id = tenant.default_locale_id

        # get all home level categories.
        products = get_products(product_id, tenant_id, tenant_locale_id)
        product_ids = [product.id for product in products]

        base_query = Rating.query.filter(
            Rating.tenant_id == tenant_id,
            Rating.product_id.in_(product_ids)
        )

        cur_ratings = base_query.filter(
            Rating.created_at.between(cur_start_date, cur_end_date)
        )

        available_section_ids = get_available_section_ids(tenant_id)
        available_chapter_ids = get_available_chapter_ids(
            tenant_id,
            available_section_ids
        )
        h_rated_section, l_rated_section = get_highest_lowest_rated_sections(
            cur_ratings,
            tenant_locale_id,
            available_section_ids
        )
        h_rated_chapter, l_rated_chapter = get_highest_lowest_rated_chapters(
            cur_ratings,
            tenant_locale_id,
            available_chapter_ids
        )
        cur_rating_received = cur_ratings.all()
        prev_rating_received = base_query.filter(
            Rating.created_at.between(pr_st_date, pr_ed_date),
        ).all()
        rating_received, feedback_received = get_rating_feedback_progress(
            cur_rating_received,
            prev_rating_received
        )
        categories = get_all_categories_ratings(cur_rating_received, products)

        rating_response = {
            "highest_rated_chapter": h_rated_chapter,
            "lowest_rated_chapter": l_rated_chapter,
            "highest_rated_section": h_rated_section,
            "lowest_rated_section": l_rated_section,
            "rating_received": rating_received,
            "feedback_received": feedback_received,
            "categories": categories
        }
        return format_data(
            marshal(rating_response, rating_api_fields)
        )

    def post(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        post_data = rating_parser.parse_args()

        user_id = session.get('user', {}).get('user_id')
        user_activity = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).with_entities(
            UserActivity.id
        ).first_or_404()

        base_query = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.is_enabled.__eq__(True)) &
            (Section.is_deleted.__eq__(False))
        )
        product = None
        section = base_query.filter(
            Section.slug == post_data['section_slug']
        ).first()
        if not section:
            section = get_latest_entity(post_data['section_slug'], 'section')

        if post_data['section_slug'] == post_data['product_slug']:
            product = section
        else:
            product = base_query.filter(
                Section.slug == post_data['product_slug']
            ).first()
            if not product:
                product = get_latest_entity(
                    post_data['product_slug'], 'section')

        rating = Rating()
        rating.tenant_id = tenant_id
        rating.user_activity_id = user_activity.id
        rating.value = post_data.get('rate_value')
        rating.comments = post_data.get('comment')
        rating.language_id = session['user']['locale']
        rating.product_id = product.id
        rating.section_id = section.id

        if post_data.get('chapter_slug'):
            chapter = Walkthrough.query.filter(
                (Walkthrough.tenant_id == tenant_id),
                (Walkthrough.is_enabled.__eq__(True)),
                (Walkthrough.is_deleted.__eq__(False)),
                (Walkthrough.slug == post_data['chapter_slug'])
            ).first()
            if not chapter:
                chapter = get_latest_entity(
                    post_data['chapter_slug'], 'walkthrough'
                )

            rating.chapter_id = chapter.id

        db.session.add(rating)
        db.session.commit()

        return {'message': 'SUCCESS'}, 200


class FeedbackApi(Resource):
    method_decorators = [app_subscription_required('RATING')]

    @has_author_access
    def get(self):
        section_id = request.args['section_id']\
            if request.args.get("section_id") else None
        chapter_id = request.args['chapter_id']\
            if request.args.get("chapter_id") else None
        product_id = request.args['product_id']\
            if request.args.get("product_id") else None
        from_date = request.args.get('from_date')
        to_date = request.args.get('to_date')
        star_filtering = request.args.get("star_filtering")
        date_filtering = request.args.get("date_filtering")
        date_range = request.args.get('date_range')
        page = int(request.args.get("page")) if request.args.get("page") else 1

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        from_date = datetime.strptime(
            from_date, '%Y-%m-%d') if from_date else None
        to_date = datetime.strptime(
            to_date, '%Y-%m-%d') if to_date else None
        if to_date:
            to_date = add_date_time(to_date, days=1, seconds=-1)

        cur_start_date, cur_end_date, pr_st_date, pr_ed_date = get_time_bounds(
            date_range,
            from_date,
            to_date,
            timezone=tenant.timezone
        )

        base_query = Rating.query.filter(
            Rating.tenant_id == tenant_id,
            Rating.created_at.between(cur_start_date, cur_end_date)
        )
        order_by_filter = Rating.value.desc() if star_filtering and\
            star_filtering.lower() == 'descending' else Rating.value.asc()
        base_query = base_query.order_by(order_by_filter)
        order_by_filter = Rating.created_at.desc() if date_filtering and\
            date_filtering.lower() == 'descending' else Rating.created_at.asc()
        base_query = base_query.order_by(order_by_filter)

        # section level ratings
        if section_id and product_id and not chapter_id:
            base_query = base_query.filter(
                Rating.section_id == section_id
            )
            section_response = get_section_ratings(
                base_query, section_id, cur_start_date,
                cur_end_date, page, tenant
            )
            return section_response

        # chapter level ratings
        elif chapter_id:
            return get_chapter_ratings(base_query, chapter_id, cur_start_date,
                                       cur_end_date, page, tenant)

        # If not section_id and chapter_id
        children = get_all_leaf_sections(product_id)
        if children:
            return get_all_sections(children, cur_start_date,
                                    cur_end_date, product_id, tenant)
        base_query = base_query.filter(
            Rating.product_id == product_id
        )
        return get_section_ratings(base_query, product_id, cur_start_date,
                                   cur_end_date, page, tenant)
