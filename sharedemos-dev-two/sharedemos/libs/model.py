from collections import OrderedDict
from datetime import datetime
import itertools
import re
from unidecode import unidecode
from urllib import unquote

from flask import abort, current_app, session, url_for
from flask.ext.principal import (
    Permission,
    RoleNeed
)
from sqlalchemy import text

from sharedemos.models import (
    db, ActivityFeed,
    SlugRevision
)

from .helpers import (
    add_date_time,
    get_timezone_specific_datetime,
    get_translation,
    get_utc_specific_datetime,
    is_suggestion_available,
    log_last_activity
)
from .url import static_url


admin_permission = Permission(RoleNeed(1))
author_permission = Permission(RoleNeed(2))
analyst_permission = Permission(RoleNeed(3))
viewer_permission = Permission(RoleNeed(4))
commenter_permission = Permission(RoleNeed(5))


def change_remaining_order(elements_list, increment=False):
    """Increment/Decrement the element's order."""
    for element in elements_list:
        if increment:
            element.order += 1
        else:
            element.order -= 1


def is_empty_playlist(chapters_list=[]):
    """Check for empty chapters inside a playlist."""
    for chapter in chapters_list:
        if not chapter.is_deleted and chapter.is_enabled:
            return False
    return True


def filter_entities(items, limit=0):
    """Limit elements."""
    new_items = OrderedDict()
    item_count = 0
    for key, value in items.items():
        if item_count >= limit:
            break
        new_items[key] = value
        item_count += 1

    return new_items


def get_model_tags(model, locale=None):
    """
    Return the model's tag associated with the locale.

    If provided locale's tag is not found,
    return default tenant_locale's tag,
    """
    default_tags = []
    tags = []
    for trans in model.translations:
        if trans.language_id == model.tenant.default_locale_id:
            default_tags = trans.tag_ids

        if locale and trans.language_id == locale:
            tags = trans.tag_ids
            break
    else:
        tags = default_tags

    if tags:
        from sharedemos.models import Tag
        return Tag.query.filter(Tag.id.in_(tags)).all()

    return []


def get_suggestion_details(suggestion, get_thumbnail=False):
    """
    Append suggestion details to suggestion entity.

    If a suggestion is link, then append thumbnail_url details,
    else if its a walkthrough, then append total_slides,
    thumbnail_url, walkthrough url details.

    params:
        suggestion- SqlAlchemy Suggestion object.
        get_thumbnail- Boolean value defaults to False.
            (Since thumbnail url is used only in pathfinder suggestions mail,
            flag check is implemented.)

    Returns:
        'suggestion_entity' with the above details,
    """
    suggestion_entity = None
    if suggestion.walkthrough_id:
        suggestion_entity = suggestion.walkthrough
        suggestion_entity._name = get_translation(suggestion_entity).name
        section = suggestion_entity.playlist.section
        suggestion_entity._product_slug = section.get_category().slug
        suggestion_entity._section_slug = section.slug
        suggestion_entity._total_slides = len([slide
                                               for slide in suggestion_entity.slides
                                               if not slide.is_deleted])

        product_slug = suggestion_entity._product_slug
        section_slug = section.slug
        chapter_slug = suggestion_entity.slug

        if suggestion_entity.tenant.template == 'vmware':
            entity_url = url_for(
                'main.route_handler',
                section=section_slug,
                chapter=chapter_slug,
                _external=True
            )

        else:
            url = '!/' + product_slug
            if product_slug != section_slug:
                url += '/' + section_slug

            url += '/' + chapter_slug

            entity_url = unquote(url_for(
                'main.home',
                _external=True,
                _anchor=url
            ))

        if get_thumbnail:
            suggestion_entity._url = entity_url
            suggestion_entity._thumbnail_url = suggestion_entity.get_thumbnail()

        # 'thumbnail_resource' is appened to check,
        # whether the resource is 'cdn_enabled' or not,
        # and to assign the resource path accordingly.
        suggestion_entity._resource = suggestion_entity.get_thumbnail_resource()

    else:
        suggestion_entity = suggestion
        if get_thumbnail:
            _thumbnail_url = None
            if suggestion.external_link.get('icon_name'):
                _thumbnail_url = static_url(
                    filename='media/external_icons/{}'.format(
                        suggestion.external_link['icon_name']),
                )
            suggestion_entity._thumbnail_url = _thumbnail_url

    suggestion_entity._id = suggestion.id
    suggestion_entity.order = suggestion.order
    suggestion_entity.created_at = suggestion.created_at
    return suggestion_entity


def get_pathfinder_suggestions(option_id, is_author=False, get_thumbnail=False):
    """
    Return an option by appending the valid suggestions details.

    Query all available valid suggestion(group & single) entities,
    order them by either 'created_at' or w.r.t 'order_data',
    append it to 'Option' object and return it.

    params:
        option_id- Integer value.
        is_author- Boolean value defaults to False.
        get_thumbnail- Booleam value defaults to False.
            (Passed to get_suggestion_details()).
    """
    from sharedemos.models import Option, DraftOption
    tenant_id = getattr(current_app, 'tenant_id', None)
    if is_author:
        option = DraftOption.query.filter(
            (DraftOption.id == option_id) &
            (DraftOption.tenant_id == tenant_id) &
            (DraftOption.is_deleted.__eq__(False)) &
            (DraftOption.is_enabled.__eq__(True))
        ).first_or_404()
    else:
        option = Option.query.filter(
            (Option.id == option_id) &
            (Option.tenant_id == tenant_id) &
            (Option.is_deleted.__eq__(False)) &
            (Option.is_enabled.__eq__(True))
        ).first_or_404()

    grouped_suggestions_dict = {}
    discrete_suggestions_dict = {}

    # Group suggestions queries are isolated to eleminate multiple loops.
    # Since option.suggestions will list all suggestions,
    # querying suggestion_groups will only list suggestions which are grouped.
    for group_suggestion in option.suggestion_groups:
        if not is_suggestion_available(group_suggestion):
            continue

        translation = get_translation(group_suggestion)
        group_details = {
            'id': group_suggestion.id,
            'type': 'group',
            'title': translation.title,
            'description': translation.description,
            'order': group_suggestion.order,
            'created_at': group_suggestion.created_at,
            'suggestions_list': []
        }
        for suggestion in group_suggestion.suggestions:
            if is_suggestion_available(suggestion):
                group_details['suggestions_list'].append(
                    get_suggestion_details(suggestion, get_thumbnail)
                )
        grouped_suggestions_dict[group_suggestion.id] = group_details

    for discrete_suggestion in option.suggestions:
        if not is_suggestion_available(discrete_suggestion):
            continue

        if not discrete_suggestion.group_id:
            suggestion_detail = get_suggestion_details(
                discrete_suggestion, get_thumbnail)
            discrete_suggestions_dict[suggestion_detail._id] = {
                'id': suggestion_detail._id,
                'type': 'discrete',
                'order': suggestion_detail.order,
                'created_at': suggestion_detail.created_at,
                'suggestion': suggestion_detail,
                '_url': getattr(suggestion_detail, '_url', None)
            }
            if get_thumbnail and getattr(suggestion_detail,
                                         '_thumbnail_url', None):
                discrete_suggestions_dict[suggestion_detail._id].update({
                    '_thumbnail_url': suggestion_detail._thumbnail_url
                })

    # Order the results based on 'order_data' if available.
    option_translation = get_translation(option)
    order_details = (option_translation.suggestion_message['order_data']
                     if option_translation.suggestion_message and
                     option_translation.suggestion_message.get('order_data') else
                     None)

    # List containing dict objects.
    ordered_suggestions = []
    if order_details:
        for obj in order_details:
            if isinstance(obj, dict) and\
                    obj.get('groupId') in grouped_suggestions_dict:
                ordered_suggestions.append(
                    grouped_suggestions_dict[obj['groupId']])

            elif isinstance(obj, int) and obj in discrete_suggestions_dict:
                ordered_suggestions.append(discrete_suggestions_dict[obj])
    else:
        ordered_suggestions = sorted(
            grouped_suggestions_dict.values() + discrete_suggestions_dict.values(),
            key=lambda x: (x['order'], x['created_at']))

    option._suggestions = ordered_suggestions
    option._suggestion_message = option_translation.suggestion_message

    return option


def get_progress_difference(val1, val2):
    """Function to get the percentage difference between two values."""
    if not val2:
        if not val1:
            return 0
        return 100
    return round(round(((val1 - val2) / float(val2)), 2) * 100, 2)


def get_slug_text(input_text, delim=u'-', max_length=255, decode=True):
    """
    Strip of the speacial chars, add a delimiter and return the slug in unicode.

    params:
        input_text - Unicode text to create a slug.
        delim -      Unicode value delimiter, used to join to words, defaults to '-'.
        max_length - Integer number to limit the generated slug, defaults to 255.
        decode -     Boolean field which determines slug to be generated in ASCII only or not.
    """
    # Characters to filter in slug name
    _punct_re = re.compile(r'[\s !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.:;~+]+')

    result = []

    # Assign unidecode function if decode is True else assign an empty function.
    decode_func = unidecode if decode else lambda x: x

    for word in _punct_re.split(input_text.lower()):
        result.extend(filter(None, _punct_re.split(decode_func(word))))
    return unicode(delim.join(result))[:max_length]


def get_time_bounds(date_range, from_date=None, to_date=None, timezone=None):
    """
    Get time slots for given date range.

        TIMEZONE: "US/Pacific"
        PST: UTC-8
        PDT: UTC-7

        PST -> UTC (+8) : 2015/09/24 00:00:00 -> 2015/09/24 08:00:00
        UTC -> PST (-8) : 2015/09/24 00:00:00 -> 2015/09/23 16:00:00

        PDT -> UTC (+7) : 2015/09/24 00:00:00(PDT) -> 2015/09/24 07:00:00(UTC)
        UTC -> PDT (-7) : 2015/09/24 00:00:00(UTC) -> 2015/09/23 17:00:00(PDT)
    """
    today = datetime.utcnow()
    if not to_date:
        to_date = today.replace(hour=23, minute=59, second=59, microsecond=0)
    to_date = get_timezone_specific_datetime(timezone, to_date)
    cur_end_date_utc = get_utc_specific_datetime(to_date)

    if from_date:
        cur_start_date = get_timezone_specific_datetime(timezone, from_date)
        cur_start_date_utc = get_utc_specific_datetime(cur_start_date)
    else:
        from_date = today.replace(hour=0, minute=0, second=0, microsecond=0)
        cur_start_date = get_timezone_specific_datetime(timezone, from_date)
        cur_start_date_utc = get_utc_specific_datetime(cur_start_date)

    prev_start_date = add_date_time(cur_start_date, days=-1)
    prev_start_date_utc = get_utc_specific_datetime(prev_start_date)

    if date_range == 'yesterday':
        cur_start_date_utc = add_date_time(cur_start_date_utc, days=-1)
        cur_end_date_utc = add_date_time(cur_start_date_utc, days=1,
                                         seconds=-1)
        prev_start_date_utc = add_date_time(cur_start_date_utc, days=-1)

    elif date_range == 'week':
        cur_start_date_utc = add_date_time(cur_start_date_utc, days=-6)
        prev_start_date_utc = add_date_time(cur_start_date_utc, days=-7)

    elif date_range == 'month':
        cur_start_date_utc = add_date_time(cur_start_date_utc, months=-1)
        prev_start_date_utc = add_date_time(cur_start_date_utc, months=-1)

    elif date_range == 'quarter':
        cur_start_date_utc = add_date_time(cur_start_date_utc, months=-3)
        prev_start_date_utc = add_date_time(cur_start_date_utc, months=-3)

    elif date_range == 'half-year':
        cur_start_date_utc = add_date_time(cur_start_date_utc, months=-6)
        prev_start_date_utc = add_date_time(cur_start_date_utc, months=-6)

    elif date_range == 'year':
        cur_start_date_utc = add_date_time(cur_start_date_utc, years=-1)
        prev_start_date_utc = add_date_time(cur_start_date_utc, years=-1)

    elif date_range == 'custom':
        days_between = (cur_start_date_utc - cur_end_date_utc).days
        prev_start_date = add_date_time(from_date, days=days_between)
        prev_start_date = get_timezone_specific_datetime(timezone,
                                                         prev_start_date)
        prev_start_date_utc = get_utc_specific_datetime(prev_start_date)

    prev_end_date = add_date_time(cur_start_date_utc, seconds=-1)
    prev_end_date_utc = get_utc_specific_datetime(prev_end_date)

    return cur_start_date_utc, cur_end_date_utc,\
        prev_start_date_utc, prev_end_date_utc


def log_activity_feed(entity, action, section, **kwargs):
    """
    Log all activity.

    Storing the operations performed on the entities
    entity - action performed on section/playlist/walkthrough
        /secondary_user_role
    action - changes made on the entity.
    This method is called in schedular function,
    so any request or session related data should have an alternate.
    """
    playlist = kwargs.get('playlist')
    draft_walkthrough = kwargs.get('draft_walkthrough')
    secondary_user_id = kwargs.get('secondary_user_id')
    primary_user_id = kwargs.get('primary_user_id') or session.get('user_id')
    product = section.get_category()

    activity_feed = ActivityFeed()
    activity_feed.tenant_id = section.tenant_id
    activity_feed.product = product
    activity_feed.section = section
    activity_feed.playlist = playlist
    activity_feed.draft_walkthrough = draft_walkthrough
    activity_feed.action = unicode(action)
    activity_feed.attribute = kwargs.get('attribute')
    activity_feed.primary_user_id = primary_user_id
    activity_feed.secondary_user_id = secondary_user_id
    activity_feed.entity = unicode(entity)
    activity_feed.language_id = (
        kwargs.get('author_locale') or session['author']['locale']
    )
    activity_feed.walkthrough = None
    if draft_walkthrough:
        activity_feed.walkthrough = draft_walkthrough.published

    if section.id == product.id and entity == 'section':
        activity_feed.entity = u'product'

    entity_id = None
    if action == 'created':
        db.session.commit()
    if entity in ['product', 'section']:
        model = section
    elif entity == 'playlist':
        model = playlist
    elif entity in ('walkthrough', 'draft_walkthrough') and draft_walkthrough:
        if draft_walkthrough.published:
            model = draft_walkthrough.published
        else:
            model = draft_walkthrough
    elif entity == 'user':
        model = None
        entity_id = secondary_user_id

    log_last_activity(
        action,
        entity,
        model=model,
        entity_id=entity_id,
        user_id=primary_user_id
    )

    db.session.add(activity_feed)


def slugify(input_text, rec_id, model,
            tenant_id, slugfield="slug", delim=u'-',
            max_length=255, decode=True, **query_filter):
    """
    Generate and Return a unique slug.

    params:
        input_text- Unicode text to create a slug.
        rec_id-     Integer Id of the model.
        model-      SqlAlchemy model Class.
        tenant_id-  Integer id of the Tenant.
        slugfield-  String data represents the attribute of the model to query the slug.
        delim-      Unicode value delimiter, used to join to words, defaults to '-'.
        max_length- Integer number to limit the generated slug, defaults to 255.
        decode-     Boolean field which determines slug to be generated in ASCII only or not.
        query_filter- Extra query params to filter out the records.

    """
    slug_text = get_slug_text(input_text, delim, max_length, decode)

    if not slug_text:
        abort(404)

    # Filter model slugs in a tenant
    slug_records = model.query.filter(
        (model.tenant_id == tenant_id) &
        (text(slugfield + ' ~ :reg'))
    ).filter_by(**query_filter).params(reg=slug_text)

    for slug_rec in slug_records:
        if slug_rec.id == rec_id:
            actual_slug, split_char, copies = getattr(
                slug_rec, slugfield).rpartition('-')
            # return if slug is unchanged or already appended with copy number
            if (copies.isdigit() and actual_slug == slug_text) or\
                    getattr(slug_rec, slugfield) == slug_text:
                return getattr(slug_rec, slugfield)

    # check records count using regex
    count = slug_records.count()
    new_slug = slug_text

    # change/append slug count if slug already exist
    for counter in itertools.count(count):
        # get record count for slug in a tenant
        if not model.query.filter_by(
            tenant_id=tenant_id
        ).filter_by(**{slugfield: new_slug}).count():
            return new_slug

        new_slug = slug_text[:max_length - len(delim + str(counter))] +\
            delim + str(counter)


def model_slugify(input_text, rec_id, tenant_id, primary_model,
                  secondary_model, slugfield="slug", draft_id=None):
    """
    Slug generator.

    Call slugify function to get a slug, compare it with the other model,
    if it exists then try generating a new one.
    """
    new_slug = slugify(input_text, rec_id, primary_model, tenant_id)

    # Check if the 'slug' exists in the secondary model table,
    # if its not, then return 'new_slug',
    # if it exists, then check whether the primary model's draft id
    # is same as secondary model's id,
    # if equal then return 'new_slug' else try generating a 'new_slug'.
    secondary_ = secondary_model.query.filter_by(
        tenant_id=tenant_id
    ).filter_by(**{slugfield: new_slug}).first()

    if not secondary_ or secondary_.id == draft_id:
        return new_slug

    return model_slugify(new_slug, rec_id, tenant_id, secondary_model,
                         primary_model, slugfield="slug", draft_id=draft_id)


def update_model_slug_revision(new_slug, tenant_id, model):
    """Update published model slug revision table data."""
    SlugRevision.query.filter(
        (SlugRevision.old_slug == new_slug) &
        (SlugRevision.entity_type == unicode(model.__tablename__)) &
        (SlugRevision.entity_id == model.id) &
        (SlugRevision.tenant_id == tenant_id)
    ).delete()

    new_slug_rev = SlugRevision()
    new_slug_rev.old_slug = model.slug
    new_slug_rev.new_slug = new_slug
    new_slug_rev.entity_type = unicode(model.__tablename__)
    new_slug_rev.entity_id = model.id
    new_slug_rev.tenant_id = tenant_id
    db.session.add(new_slug_rev)

    slug_rev_list = SlugRevision.query.filter_by(
        new_slug=model.slug,
        entity_type=unicode(model),
        entity_id=model.id,
        tenant_id=tenant_id
    ).all()

    for slug_rev in slug_rev_list:
        slug_rev.new_slug = new_slug
        db.session.add(slug_rev)


def update_order_by_element_position(child_elements_list, element, increment):
    """Get remaining Children and change the order."""
    if element in child_elements_list:
        element_index = child_elements_list.index(element) + 1
        # Slice the list to get the remaining children in the list.
        remaining_elements = child_elements_list[element_index:]
        # Change order of remaining children by
        # incrementing/decrementing the current order num.
        change_remaining_order(remaining_elements, increment)


def reassign_entity_order(elements_list, entity_order=1):
    """
    Re-index the elements order in elements_list starting from 1.

    Params:
        elements_list - list of section/playlist/walkthrough objects.
    """
    for element in elements_list:
        element.order = entity_order
        entity_order += 1


def rectify_duplicates(entity_list):
    """
    Check for duplicate entity,if found re-order it from 1.

    params:
        entity_list - list of target/chosen section/playlist/chapter.
    """
    order_list = []
    for entity in entity_list:
        if entity.order in order_list:
            reassign_entity_order(entity_list)
            break
        order_list.append(entity.order)
