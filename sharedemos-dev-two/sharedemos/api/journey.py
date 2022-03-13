from datetime import datetime
import re
from werkzeug.datastructures import FileStorage

from flask import current_app, g, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse

from sqlalchemy import event
from sqlalchemy.sql import exists

from sharedemos.api.cta import cta_details
from sharedemos.libs.api import is_author, format_data, get_locale
from sharedemos.libs.decorators import (
    app_subscription_required,
    check_user_access,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    create_cta,
    create_file,
    ExpireEntity
)
from sharedemos.libs.model import model_slugify, update_model_slug_revision
from sharedemos.libs.utils import (
    get_asset_metadata,
    get_usergroups,
    validate_user_group,
    user_groups_fields
)
from sharedemos.models import (
    db,
    create_journey_slug,
    DraftJourney,
    DraftJourneyAsset,
    DraftJourneyTranslations,
    IconLibrary,
    Journey,
    JourneyAsset,
    JourneyTranslations,
    CTATranslations,
    Section,
    SectionJourneys,
    Tenant,
    UserGroup,
    update_journey_slug,
)

journey_asset_details = {
    "first_slide": fields.String(attribute="_first_slide", default=""),
    "id": fields.Integer,
    "name": fields.String(attribute="_name"),
    "order": fields.Integer,
    "product": fields.Nested({
        "slug": fields.String,
    }),
    "section": fields.Nested({
        "slug": fields.String
    }),
    "slug": fields.String,
    "thumbnail": fields.String(attribute="_thumbnail"),
    "type": fields.String(attribute="_asset_type"),
    "link": fields.String(attribute="_link")
}
journey_api_fields = {
    'assets': fields.Nested(journey_asset_details, attribute='_assets',
                            allow_null=True),
    'cta_details': fields.Nested(cta_details, attribute='_cta_details'),
    'description': fields.String(attribute='_description'),
    'expire_at': fields.DateTime,
    'icon_path': fields.String(attribute='_icon_path', default=''),
    'is_enabled': fields.Boolean(default=True),
    'name': fields.String(attribute='_name'),
    'published': fields.Boolean(default=False, attribute='_is_published'),
    'restricted_to_group_details': fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
    'slug': fields.String(default=''),
    'tags': fields.List(fields.Raw),
    'id': fields.Integer
}


def update_journey_order(current_journey, after_journey, order):
    """
    Update the Journey order.

    current_journey: Journey is going to be reordered.
    after_journey: Journey after which selected journey is going to be placed
    order: position of the current journey after reorder.
    """
    # If order is 1, the order of the current_journey is 1
    # i.e the current_journey is going to be placed on top,
    reorder_value = 1
    if order == 1:
        # Journey is going to be placed at top(first) position
        from_order = 1
        to_order = current_journey.order - 1
    elif after_journey.order < order:
        # Journey is reordered in upward direction(but not first position)
        from_order = after_journey.order + 1
        to_order = current_journey.order - 1
    else:
        # Journey is reordered in downward direction
        from_order = current_journey.order + 1
        to_order = after_journey.order
        reorder_value = -1

    tenant_id = getattr(current_app, "tenant_id", None)
    draft_journey_ids = DraftJourney.query.filter(
        DraftJourney.tenant_id == tenant_id,
        DraftJourney.is_deleted.__eq__(False),
        DraftJourney.order.between(from_order, to_order)
    ).with_entities(DraftJourney.id).all()

    # udpating order for draft journeys based on reorder_value
    DraftJourney.query.filter(
        DraftJourney.id.in_(draft_journey_ids)
    ).update(
        values={DraftJourney.order: DraftJourney.order + reorder_value},
        synchronize_session=False
    )

    # updating order for pubilshed journeys based on reorder_value
    Journey.query.filter(
        Journey.tenant_id == tenant_id,
        Journey.draft_id.in_(draft_journey_ids)
    ).update(
        values={Journey.order: Journey.order + reorder_value},
        synchronize_session=False
    )

    published_journey = current_journey.published
    current_journey.order = order
    db.session.add(current_journey)
    if published_journey:
        published_journey.order = order
        db.session.add(published_journey)


def get_journey_details(slug):
    """
    Function will accept journey slug as input parameter.

    checks for is_author, based on condition it will fetch journey
    details(cta details, icon details, asset details).
    """
    tenant_id = getattr(current_app, 'tenant_id', None)

    if is_author():
        journey = DraftJourney.query.filter(
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.slug == slug,
            DraftJourney.is_deleted.__eq__(False)
        ).first()
        if journey and journey.published:
            journey._is_published = True
    else:
        journey = Journey.query.filter(
            Journey.tenant_id == tenant_id,
            Journey.slug == slug,
            Journey.is_enabled.__eq__(True),
            Journey.is_deleted.__eq__(False)
        )
        if g.user.is_active() and g.user.is_viewer() and not g.user.is_admin():
            user_groups = getattr(g.user, 'groups', None)
            if user_groups:
                group_ids = [grp.id for grp in user_groups]
                journey = journey.filter(
                    Journey.restricted_to_groups.any(
                        UserGroup.id.in_(group_ids)
                    )
                )
        journey = journey.first()
    if journey:
        locale = get_locale()
        translation = journey.get_translation(locale)
        journey._name = translation.name
        journey._description = translation.description
        restricted_groups = journey.restricted_to_groups
        journey._restricted_to_group_details = restricted_groups
        journey_restricted_group_ids = {group.id for group in restricted_groups}

        if translation.icon_id:
            journey._icon_path = translation.icon.path
        if journey.cta_id:
            journey._cta_details = journey.cta.get_translation(locale)

        journey_assets = []
        for asset in journey.assets:
            if asset.is_deleted:
                continue
            _asset = get_asset_metadata(asset, journey_restricted_group_ids)
            if _asset:
                journey_assets.append(_asset)
        journey._assets = journey_assets

        return journey


def get_journeys():
    """Function will return all journey details(home page)."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    all_journey_details = []
    if is_author():
        journeys = DraftJourney.query.filter(
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.is_deleted.__eq__(False)
        ).order_by(DraftJourney.order.asc()).all()
    else:
        journeys = Journey.query.filter(
            Journey.tenant_id == tenant_id,
            Journey.is_deleted.__eq__(False),
            Journey.is_enabled.__eq__(True)
        ).order_by(Journey.order.asc()).all()

    all_journey_details = []
    for journey in journeys:
        journey_details = get_journey_details(journey.slug)
        if journey_details:
            if is_author() or journey_details._assets:
                all_journey_details.append(journey_details)

    return all_journey_details


def publish_journey(draft_journey):
    """Function will accept draft journey object as the parameter."""
    try:
        event.remove(JourneyTranslations, 'after_insert', create_journey_slug)
        event.remove(JourneyTranslations, 'after_update', update_journey_slug)

        published_journey = draft_journey.published
        if not published_journey:
            published_journey = Journey()
            published_journey.created_by = session.get('user_id')

        tenant_id = draft_journey.tenant_id
        model_id = getattr(published_journey, 'id', None)

        new_slug = model_slugify(
            input_text=draft_journey.slug,
            rec_id=model_id,
            tenant_id=tenant_id,
            primary_model=Journey,
            secondary_model=DraftJourney,
            slugfield="slug",
            draft_id=draft_journey.id
        )

        if published_journey.slug and published_journey.slug != new_slug:
            update_model_slug_revision(
                new_slug=new_slug,
                tenant_id=tenant_id,
                model=published_journey
            )

        published_journey.modified_by = session.get('user_id')
        published_journey.is_enabled = draft_journey.is_enabled = True
        published_journey.slug = new_slug
        published_journey.order = draft_journey.order
        published_journey.tenant_id = tenant_id
        published_journey.cta_id = draft_journey.cta_id
        published_journey.restricted_to_groups = draft_journey.restricted_to_groups
        published_journey.tags = draft_journey.tags
        published_journey.draft = draft_journey

        # adding draft_journey asset to published journey
        published_journey_assets = published_journey.assets
        published_journey_asset_ids = [
            asset.asset_id for asset in published_journey_assets
        ]
        draft_journey_assets = [asset for asset in draft_journey.assets
                                if not asset.is_deleted]
        draft_journey_asset_ids = [
            asset.asset_id for asset in draft_journey_assets
        ]

        for asset in published_journey_assets:
            if asset.asset_id not in draft_journey_asset_ids:
                asset.is_deleted = True
            else:
                asset.is_deleted = False
                asset.order = draft_journey_asset_ids.index(asset.asset_id) + 1
            db.session.add(asset)
        for asset in draft_journey_assets:
            if asset.asset_id not in published_journey_asset_ids:
                _asset = JourneyAsset()
                _asset.asset_type = asset.asset_type
                _asset.asset_id = asset.asset_id
                _asset.order = asset.order
                _asset.tenant_id = asset.tenant_id
                _asset.journey = published_journey
                db.session.add(_asset)

        db.session.add_all([draft_journey, published_journey])

        # adding translations to published journey object
        pub_trans = [tr.language_id for tr in published_journey.translations]
        for dr_trans in draft_journey.translations:
            if dr_trans.language_id not in pub_trans:
                trans = JourneyTranslations()
                trans.language_id = dr_trans.language_id
                trans.journey = published_journey
            else:
                trans = published_journey.get_locale_translation(
                    dr_trans.language_id
                )

            trans.name = dr_trans.name
            trans.description = dr_trans.description
            trans.icon = dr_trans.icon
            db.session.add(trans)
        db.session.commit()

    except Exception as e:
        raise SharedemosException(500, message=e.message)

    else:
        # Upload journey to algolia.
        from sharedemos.tasks import upload_to_algolia
        upload_to_algolia.delay({
            'category': 'journey',
            'journey_id': published_journey.id,
            'tenant_id': tenant_id
        })

    finally:
        event.listen(JourneyTranslations, 'after_insert', create_journey_slug)
        event.listen(JourneyTranslations, 'after_update', update_journey_slug)


parser = reqparse.RequestParser()
parser.add_argument('name', type=unicode, required=True,
                    location='json', help='Name required')
parser.add_argument('description', type=unicode, location='json')
parser.add_argument('restricted_to_groupids', type=list, location='json',
                    default=[])
parser.add_argument('tags', type=list, location='json', default=[])
parser.add_argument('expire_at', type=unicode, location='json', default=None)

icon_parser = reqparse.RequestParser()
icon_parser.add_argument('icon', type=FileStorage, location='files')


class JourneyApi(Resource):

    method_decorators = [app_subscription_required('JOURNEYS')]

    @check_user_access
    def get(self, slug=None, **kwargs):
        if kwargs.get('ret_url'):
            return kwargs, 200

        # individual journey based on slug
        if slug:
            journey_details = get_journey_details(slug)

        # all journeys details
        else:
            journey_details = get_journeys()

        return format_data(marshal(journey_details, journey_api_fields)), 200

    @has_author_access
    def post(self):
        """
        Creating new Journey.

        inputs: Journey name, description and restricted_groups
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        post_data = parser.parse_args()
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('name'))

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')
        if not post_data.get('tags'):
            raise SharedemosException(
                412, message=SharedemosException.DATA_MISSING % 'JOURNEY TAG')

        journey = DraftJourney()

        nth_journey = DraftJourney.query.filter(
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.is_deleted.__eq__(False)
        ).order_by(DraftJourney.order.desc()).first()

        journey.order = (nth_journey.order + 1) if nth_journey else 1
        journey.tenant_id = tenant_id
        journey.created_by = session.get('user_id')
        journey.tags = post_data['tags']

        # Restrictions is only for private tenant.
        if tenant.flags.is_private and post_data.get('restricted_to_groupids'):
            # raises exception if validation fails.
            validate_user_group(post_data['restricted_to_groupids'], tenant_id)
            journey.restricted_to_groups = get_usergroups(
                post_data['restricted_to_groupids']
            )

        journey_trans = DraftJourneyTranslations()
        journey_trans.name = unicode(post_data.get('name'))
        journey_trans.description = unicode(post_data.get('description'))
        journey_trans.language_id = tenant.default_locale_id
        journey_trans.journey = journey
        db.session.add_all([journey, journey_trans])

        # Schedule disable - EOL (End of life).
        if post_data.get('expire_at'):
            db.session.flush()  # To get the journey.id
            expiry_date = datetime.strptime(
                str(post_data['expire_at']),
                '%Y-%m-%dT%H:%M'
            )
            expiry_entity = ExpireEntity(journey)
            expiry_entity.new(expiry_date)
            # In POST, there is no scenario to handle update/delete eol.

        db.session.commit()

        journey_details = get_journey_details(journey.slug)

        return format_data(marshal(journey_details, journey_api_fields)), 200

    @has_author_access
    def put(self, slug):
        """
        Update name, description and user_group restriction.

        Create translation for journey object
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        draft_journey = DraftJourney.query.filter(
            DraftJourney.slug == slug,
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.is_deleted.__eq__(False),
        ).first_or_404()

        put_data = parser.parse_args()

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('name'))

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if not put_data.get('tags'):
            raise SharedemosException(
                412, message=SharedemosException.DATA_MISSING % 'JOURNEY TAG')

        if tenant.flags.is_private and put_data.get('restricted_to_groupids'):
            # raises exception if validation fails.
            validate_user_group(put_data['restricted_to_groupids'], tenant_id)
            draft_journey.restricted_to_groups = get_usergroups(
                put_data['restricted_to_groupids']
            )

        draft_journey.modified_by = session.get('user_id')
        draft_journey.tags = put_data['tags']

        translation = draft_journey.get_locale_translation(
            session['author']['locale']
        )
        if not translation:
            translation = DraftJourneyTranslations()
            translation.language_id = session['author']['locale']

        translation.name = unicode(put_data.get('name'))
        translation.description = unicode(put_data.get('description'))
        translation.journey = draft_journey

        # Schedule disable - EOL (End of life).
        if 'expire_at' in put_data:
            expiry_entity = ExpireEntity(draft_journey)
            if put_data['expire_at']:
                expiry_date = datetime.strptime(
                    str(put_data['expire_at']),
                    '%Y-%m-%dT%H:%M'
                )
                if draft_journey.expire_at != expiry_date:
                    if not expiry_entity.job.id or not expiry_entity.job.created_by:
                        expiry_entity.new(expiry_date)
                    else:
                        expiry_entity.update(expiry_date)
            else:
                expiry_entity.delete()

        db.session.add_all([draft_journey, translation])

        db.session.commit()

        journey_details = get_journey_details(draft_journey.slug)

        return format_data(marshal(journey_details, journey_api_fields)), 200

    @has_author_access
    def patch(self, slug=None):
        """
        Updating Journey fields.

        publish, enable/disable, adding cta to journey,
        adding icon to journey, adding assets.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        draft_journey = DraftJourney.query.filter(
            DraftJourney.slug == slug,
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.is_deleted.__eq__(False)
        ).first_or_404()
        published_journey = draft_journey.published
        icon_data = icon_parser.parse_args()
        if icon_data.get("icon"):
            icon_hex_name = create_file(icon_data.get("icon"))
            trans = draft_journey.get_translation(session["author"]["locale"])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(trans.name)
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            trans.icon = icon_lib
            db.session.add_all([icon_lib, trans])
            db.session.commit()

            journey_details = get_journey_details(draft_journey.slug)

            return format_data(marshal(
                journey_details, journey_api_fields)
            ), 200

        if 'is_asset' in request.json:
            asset_data = request.json.get("asset")
            incoming_asset_ids = [asset.get('asset_id') for asset in asset_data]
            journey_assets = draft_journey.assets

            # if asset is already in journey assets, then no need to create
            # asset object, we are checking for deleted/edited assets
            for asset in journey_assets:
                if asset.asset_id not in incoming_asset_ids:
                    asset.is_deleted = True
                else:
                    asset.is_deleted = False
                    asset.order = incoming_asset_ids.index(asset.asset_id) + 1
                db.session.add(asset)

            journey_asset_ids = [asset.asset_id for asset in journey_assets]

            # if asset not in journey then create asset object
            for asset in asset_data:
                if asset.get('asset_id') not in journey_asset_ids:
                    _asset = DraftJourneyAsset()
                    _asset.asset_type = asset.get('asset_type')
                    _asset.asset_id = asset.get('asset_id')
                    _asset.order = asset.get('order')
                    _asset.tenant_id = tenant_id
                    _asset.journey_id = draft_journey.id
                    db.session.add(_asset)

        if 'is_cta' in request.json:
            # update cta information
            if draft_journey.cta_id:
                cta = draft_journey.cta
                # checks for locale trarnslation, if locale translation available
                # then update cta details.
                translation = cta.get_locale_translation(
                    session['author']['locale']
                )
                if not translation:
                    translation = CTATranslations()
                    translation.language_id = session['author']['locale']

                translation.name = request.json.get("name")
                request.json.get("options").pop("type")
                translation.cta_button = request.json.get("options")
                translation.cta = cta
                db.session.add(translation)

            # create new cta for journey
            else:
                tenant = draft_journey.tenant
                if session['author']['locale'] != tenant.default_locale_id:
                    raise SharedemosException(
                        412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                        % tenant.default_locale.name
                    )

                cta = create_cta(request.json, tenant.default_locale_id)
                draft_journey.cta = cta
                db.session.add(draft_journey)

        if 'is_enabled' in request.json:
            is_enabled = request.json.get('is_enabled')
            draft_journey.is_enabled = is_enabled
            draft_journey.modified_by = session.get('user_id')

            published_journey = draft_journey.published
            if published_journey:
                published_journey.is_enabled = is_enabled
                published_journey.modified_by = session.get('user_id')
                db.session.add(published_journey)

            db.session.add(draft_journey)

        if 'is_publish' in request.json:
            draft_journey_assets = [asset for asset in draft_journey.assets
                                    if not asset.is_deleted]
            if not draft_journey_assets:
                raise SharedemosException(404, message="NO_CONTENT")

            publish_journey(draft_journey)

        if 'reorder' in request.json:
            """
                current_journey: journey going to be reordered
                aftern journey: journey after which current journey
                is going to be placed(after reordering)
            """
            current_journey = draft_journey
            after_journey = None
            after_journey_slug = request.json.get('afterJourneySlug')
            if after_journey_slug:
                after_journey = DraftJourney.query.filter(
                    DraftJourney.tenant_id == tenant_id,
                    DraftJourney.slug == after_journey_slug,
                    DraftJourney.is_deleted.__eq__(False)
                ).first_or_404()

                if after_journey.order < current_journey.order:
                    order = after_journey.order + 1
                else:
                    order = after_journey.order
            else:
                order = 1

            update_journey_order(current_journey, after_journey, order)

        db.session.commit()
        # Clear all_jouneys cache
        from sharedemos.tasks import delete_api_cache_data
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': '*journey',
            'tenant_id': tenant_id
        })
        # Clear the sections which are connected to this particular journey
        if draft_journey.published:
            query_stmt = exists().where(
                SectionJourneys.journey_id == draft_journey.published.id)

            sections = Section.query.join(SectionJourneys).join(Journey).filter(
                Section.is_deleted.__eq__(False),
                Journey.is_deleted.__eq__(False),
                Section.tenant_id == tenant_id,
                Journey.tenant_id == tenant_id,
                SectionJourneys.tenant_id == tenant_id,
                query_stmt).all()

            for section in sections:
                delete_api_cache_data.delay({
                    'entity': 'section',
                    'model_id': section.id,
                    'delete_pattern': True,
                    'delete_parent': bool(section.parent_id),
                    'clear_all_products': not bool(section.parent_id),
                    'tenant_id': tenant_id
                })

        # Update algolia content on is_enabled action.
        if 'is_enabled' in request.json and published_journey:
            from sharedemos.tasks import update_algolia_content
            update_algolia_content.delay({
                'entity': 'journey',
                'entity_id': published_journey.id,
                'tenant_id': tenant_id,
                'action': 'UPDATE',
                'is_enabled': published_journey.is_enabled
            })

        journey_details = get_journey_details(draft_journey.slug)

        return format_data(marshal(journey_details, journey_api_fields)), 200

    @has_author_access
    def delete(self, slug):
        """
        Function accepts draft journey slug as the input parameter.

        It will update is_deleted flag to True in draft journey and it will
        check for published version of journey. If published version available
        then is_deleted flag of published version will also update to True.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        draft_journey = DraftJourney.query.filter(
            DraftJourney.slug == slug,
            DraftJourney.tenant_id == tenant_id,
            DraftJourney.is_deleted.__eq__(False),
        ).first_or_404()

        draft_journey.is_deleted = True
        draft_journey.modified_by = session.get('user_id')
        published_journey = draft_journey.published
        if published_journey:
            published_journey.is_deleted = True
            published_journey.modified_by = session.get('user_id')
            db.session.add(published_journey)
        db.session.add(draft_journey)
        db.session.commit()
        # Clear all_jouneys cache and algolia index.
        from sharedemos.tasks import (
            update_algolia_content, delete_api_cache_data)
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': '*journey',
            'tenant_id': tenant_id
        })
        if published_journey:
            update_algolia_content.delay({
                'entity': 'journey',
                'entity_id': published_journey.id,
                'tenant_id': tenant_id,
                'action': 'DELETE'
            })
            query_stmt = exists().where(
                SectionJourneys.journey_id == published_journey.id)

            sections = Section.query.join(SectionJourneys).join(
                Journey).filter(
                Section.is_deleted.__eq__(False),
                Journey.is_deleted.__eq__(False),
                Section.tenant_id == tenant_id,
                Journey.tenant_id == tenant_id,
                SectionJourneys.tenant_id == tenant_id,
                query_stmt).all()
            for section in sections:
                delete_api_cache_data.delay({
                    'entity': 'section',
                    'model_id': section.id,
                    'delete_pattern': True,
                    'delete_parent': bool(section.parent_id),
                    'clear_all_products': not bool(section.parent_id),
                    'tenant_id': tenant_id
                })

        return {'delete': 'OK'}, 204


class JourneyTagsAndOptionsApi(Resource):
    """API to get Tenant Specific Journey Tags and Options."""

    def get(self):
        tenant_id = current_app.tenant_id
        draft_journeys = DraftJourney.query.filter(
            DraftJourney.is_deleted.__eq__(False),
            DraftJourney.tenant_id == tenant_id).all()

        tags_list = []
        options_list = []

        for journey in draft_journeys:
            if journey.tags:
                for tag in journey.tags:
                    if tag.get('name') not in tags_list:
                        tags_list.append(tag['name'])
                    for option in tag.get('options', []):
                        if option not in options_list:
                            options_list.append(option)
        tags_options = {
            'tags': tags_list,
            'options': options_list
        }

        return tags_options
