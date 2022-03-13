from datetime import datetime, timedelta

import pytz
import string

from flask import current_app
from flask.ext.restful import Resource, fields, reqparse, marshal
from sqlalchemy import desc, or_

from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.helpers import (
    add_date_time,
    get_translation,
    get_utc_time
)
from sharedemos.models import (
    ActivityFeed,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Section,
    SectionTranslations,
    Tenant,
    User,
    Walkthrough,
    WalkthroughTranslations,
)

activity_details = {
    "activity_id": fields.Integer(attribute='id'),
    "action": fields.String,
    "attribute": fields.String,
    "entity": fields.String,
    "language_id": fields.Boolean(default=False),
    "language_name": fields.String(attribute='_language_name'),
    "product_name": fields.String,
    "product_slug": fields.String,
    "section_name": fields.String,
    "section_link": fields.String,
    'playlist_name': fields.String,
    'playlist_link': fields.String,
    'walkthrough_name': fields.String,
    'walkthrough_link': fields.String,
    'draft_walkthrough_name': fields.String,
    'draft_walkthrough_link': fields.String,
    'user_name': fields.String,
    'secondary_user_name': fields.String,
    'initials': fields.String,
    'user_picture_url': fields.String,
    'created': fields.String(attribute='_created_at'),
    'is_product': fields.Boolean(default=False),
    'is_section': fields.Boolean(default=False),
    'is_playlist': fields.Boolean(default=False),
    'is_draft_walkthrough': fields.Boolean(default=False),
    'is_walkthrough': fields.Boolean(default=False),
    'is_deleted': fields.Boolean(default=False),
    'is_disabled': fields.Boolean(default=False),
    'is_user_actions': fields.Boolean(default=False),
    'restricted_product': fields.String,
}

activities_details = {
    "activity_details": fields.Nested(activity_details),
    "page": fields.Integer,
    "is_last_page": fields.Boolean(default=True),
}

parser = reqparse.RequestParser()
parser.add_argument('request_from', location='args')
parser.add_argument('actions', action='append', location='args')
parser.add_argument('categories', action='append', location='args')
parser.add_argument('authors', action='append', location='args')
parser.add_argument('fromDate', location='args')
parser.add_argument('untillDate', location='args')
parser.add_argument('searchText', location='args')
parser.add_argument('page', location='args', default=1)


class ActivityFeedApi(Resource):
    method_decorators = [has_author_access]

    def get(self):
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        offset = datetime.now(
            pytz.timezone(tenant.timezone)
        ).utcoffset().total_seconds()

        filter_options = parser.parse_args()
        if filter_options.get('request_from'):
            base_query = ActivityFeed.query.filter(
                ActivityFeed.tenant_id == tenant_id
            )
            start_date = None
            end_date = None
            if filter_options.get('fromDate'):
                start_date = datetime.strptime(
                    filter_options.get('fromDate'),
                    '%Y-%m-%d'
                )
                start_date = get_utc_time(tenant.timezone, start_date)
            if filter_options.get('untillDate'):
                end_date = datetime.strptime(
                    filter_options.get('untillDate'),
                    '%Y-%m-%d'
                )
                end_date = get_utc_time(tenant.timezone, end_date)
                end_date = add_date_time(end_date, days=1, seconds=-1)
            if start_date and end_date:
                base_query = base_query.filter(
                    ActivityFeed.created_at.between(start_date, end_date)
                )
            elif start_date:
                base_query = base_query.filter(
                    ActivityFeed.created_at.__ge__(start_date)
                )
            elif end_date:
                base_query = base_query.filter(
                    ActivityFeed.created_at.__le__(end_date)
                )

            if filter_options.get('actions'):
                base_query = base_query.filter(
                    ActivityFeed.action.in_(filter_options.get('actions'))
                )
            if filter_options.get('authors'):
                base_query = base_query.filter(
                    or_(
                        ActivityFeed.primary_user_id.in_(
                            filter_options.get('authors')
                        ),
                        ActivityFeed.secondary_user_id.in_(
                            filter_options.get('authors')
                        )
                    )
                )
            if filter_options.get('categories'):
                base_query = base_query.filter(
                    ActivityFeed.product_id.in_(
                        filter_options.get('categories')))
            if filter_options.get('searchText'):
                format_text = filter_options.get('searchText').translate(
                    string.whitespace)

                conditions = list()
                users = User.query.filter(
                    or_(User.first_name.ilike(u'%{}%'.format(format_text)),
                        User.last_name.ilike(u'%{}%'.format(format_text))))
                user_ids = [user.id for user in users]
                if user_ids:
                    conditions.append(
                        ActivityFeed.primary_user_id.in_(user_ids)
                    )
                    conditions.append(
                        ActivityFeed.secondary_user_id.in_(user_ids)
                    )

                sections_trans = SectionTranslations.query.join(
                    Section
                ).filter(
                    Section.tenant_id == tenant_id,
                    SectionTranslations.name.ilike(u'%{}%'.format(format_text))
                )
                section_ids = [sec.section_id for sec in sections_trans]
                if section_ids:
                    conditions.append(ActivityFeed.product_id.in_(section_ids))
                    conditions.append(ActivityFeed.section_id.in_(section_ids))

                dwt_trans = DraftWalkthroughTranslations.\
                    query.join(DraftWalkthrough).filter(
                        Walkthrough.tenant_id == tenant_id,
                        DraftWalkthroughTranslations.name.ilike(
                            u'%{}%'.format(format_text)
                        )
                    )
                dwt_ids = [dwt.walkthrough_id for dwt in dwt_trans]
                if dwt_ids:
                    conditions.append(
                        ActivityFeed.draft_walkthrough_id.in_(dwt_ids)
                    )

                wt_trans = WalkthroughTranslations.query.join(
                    Walkthrough
                ).filter(
                    Walkthrough.tenant_id == tenant_id,
                    WalkthroughTranslations.name.ilike(
                        u'%{}%'.format(format_text)
                    )
                )
                wt_ids = [wt.walkthrough_id for wt in wt_trans]
                if wt_ids:
                    conditions.append(ActivityFeed.walkthrough_id.in_(wt_ids))

                base_query = base_query.filter(or_(*conditions))

            if filter_options.get('searchText') and not conditions:
                activities = list()
                is_last_page = True
            else:
                activities = base_query.order_by(
                    desc(ActivityFeed.created_at)
                ).paginate(
                    int(filter_options.get('page')), 20
                )
                is_last_page = not activities.has_next
                activities = activities.items
        else:
            if not filter_options.get('request_from') and\
                    filter_options.get('page'):
                activities = ActivityFeed.query.filter_by(
                    tenant_id=tenant_id
                ).order_by(
                    desc(ActivityFeed.created_at)
                ).paginate(int(filter_options.get('page')), 20)
            else:
                activities = ActivityFeed.query.filter_by(
                    tenant_id=tenant_id
                ).order_by(
                    desc(ActivityFeed.created_at)).paginate(1, 20)
            is_last_page = not activities.has_next
            activities = activities.items

        activity_list = list()

        supported_locales = tenant.supported_locales
        tenant_default_locale = tenant.default_locale
        if tenant_default_locale not in supported_locales:
            supported_locales.append(tenant_default_locale)
        supported_locales = [{'id': language.id, 'name': language.name}
                             for language in supported_locales]
        for activity in activities:
            activity.product_name = get_translation(activity.product).name
            product_url = '#!/' + activity.product.slug
            activity.product_slug = product_url

            activity.section_name = get_translation(activity.section).name
            if activity.section.id == activity.product.id:
                activity.section_link = product_url
            else:
                activity.section_link = "%s/%s" % (product_url,
                                                   activity.section.slug)

            activity.playlist = activity.playlist

            if activity.playlist:
                activity.playlist_name = get_translation(
                    activity.playlist).name
                activity.playlist_link = activity.section_link

            if activity.draft_walkthrough:
                activity.draft_walkthrough_name = get_translation(
                    activity.draft_walkthrough).name
                activity.draft_walkthrough_link = "%s/%s" % (
                    activity.section_link,
                    activity.draft_walkthrough.slug)

            if activity.walkthrough:
                activity.walkthrough_name = get_translation(
                    activity.walkthrough).name
                activity.walkthrough_link = "%s/%s" % (
                    activity.section_link,
                    activity.walkthrough.slug)

            activity.user_name = unicode(activity.primary_user)
            activity.initials = activity.primary_user.initials
            activity.user_picture_url = activity.primary_user\
                .profile_picture_url

            if activity.action == 'deleted' and not activity.attribute:
                activity.is_deleted = True
            elif activity.action == 'disabled':
                activity.is_disabled = True
            for language in supported_locales:
                if activity.language_id == language.get('id'):
                    activity._language_name = language.get('name')
                    break
            if activity.entity == 'product':
                activity.is_product = True
            elif activity.entity == 'section':
                activity.is_section = True
            elif activity.entity == 'playlist':
                activity.is_playlist = True
            elif activity.entity == 'walkthrough' and\
                    activity.action == 'published':
                activity.is_walkthrough = True
            elif (
                (activity.entity == 'walkthrough' and
                    activity.action != 'published') or
                (activity.entity == 'draft_walkthrough')
            ):
                activity.is_draft_walkthrough = True
            elif activity.entity == 'user':
                activity.is_user_actions = True
                activity.restricted_product = activity.product
                activity.secondary_user_name = unicode(activity.secondary_user)

            if filter_options.get('page'):
                activity.page = filter_options.get('page')
            else:
                activity.page = 1
            local_time = activity.created_at + timedelta(seconds=offset)
            activity._created_at = local_time.strftime(
                '%m/%d/%Y %I:%M:%S %p').decode('utf-8')

            activity_list.append(activity)

        results = {}
        results['activity_details'] = activity_list
        results['page'] = 1
        if filter_options.get('page'):
            results['page'] = int(filter_options.get('page'))
        results['is_last_page'] = is_last_page
        return format_data(marshal(results, activities_details))
