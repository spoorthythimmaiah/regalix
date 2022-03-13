import os
import calendar
from datetime import datetime, timedelta

import pytz

from flask import (
    g, current_app,
    request,
    session,
)


from .exceptions import SharedemosException
from .helpers import (
    add_date_time,
    filter_fields,
    get_translation,
    get_default_translation,
    get_locale_translation,
    get_local_time
)
from .url import static_url


def add_to_api_cache(entity, api_data, slug=None, tenant=None):
    cache = getattr(current_app, 'cache', None)
    keys_list = construct_cache_key_list(entity, slug, tenant)
    for key in keys_list:
        cache.delete(key)
        cache.set(key, api_data)


def construct_cache_key_list(entity=None, slug=None, tenant=None,
                             locale_id=None):
    """Construct tenant and locale specific api key for caching.

    Ex:
        1. For tenant with Id = 1, locale = 'en_US' and no slug,
            cache key will be 1_en_us_section
        2. For tenant with Id = 1, locale = 'en_US' and slug = 'abc-def',
            cache key will be 1_en_us_section-abc-def
        3. For all entities a list containing all locale_ids is returned.
    """
    tenant_id = tenant.id if tenant else current_app.tenant_id
    cache_keys_list = list()

    if entity == 'tenant' and locale_id:
        key = '%s_%s_%s' % (tenant_id, locale_id, entity)
        cache_keys_list.append(unicode(key.lower()))
        return cache_keys_list

    supported_locales = list()
    if tenant:
        supported_locales = [locale.id for locale in tenant.supported_locales]
        if tenant.default_locale.id not in supported_locales:
            supported_locales.append(tenant.default_locale.id)

    if not supported_locales:
        user = session.get('author') if is_author() else session.get('user')
        if user:
            supported_locales.append(user['locale'])

    for locale_id in supported_locales:
        key = unicode(tenant_id) + '_' + locale_id + '_' + entity
        if slug:
            key += '_' + slug
        cache_keys_list.append(key.lower())

    return cache_keys_list


def delete_cache_with_pattern(delete_entity_type=None,
                              clear_all_products=False,
                              tenant=None):
    """Delete cache with regex.

    If 'clear_all_products' is True, then clear
        'all_products', 'recent_demos', 'trending_demos' and
        'anonymous content'.
    If 'delete_entity_type' is set, then finds the keys matching the
        pattern, and removes them.
    """
    cache = getattr(current_app, 'strict_redis', None)
    if cache:
        if clear_all_products:
            tenant_arg = {'tenant': tenant}
            entity_keys_list = construct_cache_key_list(
                entity='all_products', tenant=tenant
            )
            entity_keys_list += construct_cache_key_list(
                entity='recent_demos', tenant=tenant
            )
            entity_keys_list += construct_cache_key_list(
                entity='trending_demos', tenant=tenant
            )
            entity_keys_list += construct_cache_key_list(
                entity='bulletin_boards', tenant=tenant
            )
            for entity_pattern in entity_keys_list:
                for key in cache.keys(entity_pattern + '*'):
                    cache.delete(key)

            delete_from_api_cache(entity='supported_languages', **tenant_arg)
            delete_from_api_cache(entity='tenant', **tenant_arg)

        if delete_entity_type:
            entity_keys_list = construct_cache_key_list(
                entity=delete_entity_type, tenant=tenant)
            for entity_pattern in entity_keys_list:
                for key in cache.keys(entity_pattern + '*'):
                    cache.delete(key)


def get_section_slug_list(section, slug_list=None):
    """Traverse from leaf to parent Section and get list of section slugs.

    Params:
        section: Section object.
        slug_list: list type.
    """
    if not slug_list:
        slug_list = []
    if section.parent_id:
        slug_list.append(section.parent.slug)
        get_section_slug_list(section.parent, slug_list)
    return slug_list


def delete_from_api_cache(entity, model=None, **kwargs):
    """Delete api cache.

    'delete_parent', 'delete_children' passed thru kwargs,
    if 'tenant' is passed as a kwarg, then cache of all supported locales
    of the tenant are also cleared.
    """
    delete_parent = kwargs.get('delete_parent', False)
    delete_children = kwargs.get('delete_children', False)
    delete_chapters = kwargs.get('delete_chapters', False)
    tenant = kwargs.get('tenant')

    cache = getattr(current_app, 'strict_redis', None)
    if cache:
        if model:
            keys_list = construct_cache_key_list(
                entity=entity, slug=model.slug, tenant=tenant)
        else:
            keys_list = construct_cache_key_list(entity=entity, tenant=tenant)
        for key in keys_list:
            cache.delete(key)

        if model:
            if delete_parent:
                keys_list = list()
                if entity == 'section':
                    if model.parent_id:
                        keys_list = construct_cache_key_list(
                            entity=entity, slug=model.parent.slug,
                            tenant=tenant)
                    else:
                        keys_list = construct_cache_key_list(entity,
                                                             tenant=tenant)
                elif entity == 'walkthrough':
                    keys_list = construct_cache_key_list(
                        entity='section', slug=model.playlist.section.slug,
                        tenant=tenant)

                for key in keys_list:
                    cache.delete(key)

            if getattr(model, 'children', None) and delete_children:
                for child in model.children:
                    if not child.is_deleted:
                        keys_list = construct_cache_key_list(entity=entity,
                                                             slug=child.slug,
                                                             tenant=tenant)
                        for key in keys_list:
                            cache.delete(key)
                        if child.children:
                            delete_from_api_cache(
                                entity=entity,
                                model=child,
                                **{'delete_children': delete_children,
                                   'tenant': tenant})
            if getattr(model, '_chapters', None) and delete_chapters:
                for chapter in model._chapters:
                    keys_list = construct_cache_key_list(entity='walkthrough',
                                                         slug=chapter.slug,
                                                         tenant=tenant)
                    for key in keys_list:
                        cache.delete(key)


def format_data(api_result):
    if not is_author():
        filter_fields(
            api_result,
            ['id', 'can_edit', 'is_enabled', 'is_hidden', 'published',
             'is_correct_option', 're_attempts_count',
             'due_date'])

    return api_result


def get_all_chapters(playlists, get_disabled=False, chapters_list=None):
    """
    Function to get all chapters under the sections' playlists.

    param:
        playlists     - SqlAlchemy 'Playlist' object.
        get_disabled  - False by default, only set to True when deleting cache.
        chapters_list - Empty list object.
    """
    if not chapters_list:
        chapters_list = []

    for playlist in playlists:
        for chapter in playlist.walkthroughs:
            if (
                chapter in chapters_list or
                chapter.is_deleted or
                (not get_disabled and not chapter.is_enabled)
            ):
                continue

            chapters_list.append(chapter)

    return chapters_list


def get_all_children(section_list, get_disabled=False, children_list=None):
    """
    Recursive function to get all sections under a parent-section.

    param:
        section_list    - List of SqlAlchemy 'Section' object.
        children_list   - Output list of SqlAlchemy 'Section' objects,
                          None by default.
    """
    if not children_list:
        children_list = []

    for section in section_list:
        if (
            section.is_deleted or
            (not get_disabled and not section.is_enabled)
        ):
            continue

        if section not in children_list:
            children_list.append(section)

        get_all_children(section.children, get_disabled, children_list)

    return children_list


def get_all_playlists(sections_list, get_disabled=False, playlists=None):
    """
    Return list of valid playlists from a sections list.

    param:
        sections_list - List of SqlAlchemy 'Section' object.
        get_disabled  - False by default, only set to True when deleting cache.
        playlists     - Empty list object.

    """
    if not playlists:
        playlists = []
    for section in sections_list:
        for playlist in section.playlists:
            if (
                playlist in playlists or
                playlist.is_deleted or
                (not get_disabled and not playlist.is_enabled)
            ):
                continue

            playlists.append(playlist)

    return playlists


def get_all_chapters_from_sections(sections):
    """Function to get all chapters from sections(list)."""
    _children = get_all_children(sections)
    _playlists = get_all_playlists(_children)
    return get_all_chapters(_playlists)


def get_graph_slots(tenant, date_range, cur_start_date, cur_end_date):

    # Reset the timezone info of start and end dates.
    cur_start_date = cur_start_date.replace(tzinfo=None)
    cur_end_date = cur_end_date.replace(tzinfo=None)

    graph_slots = list()
    if date_range == 'custom':
        if (cur_end_date - cur_start_date).days <= 7:
            date_range = 'week'
        elif (cur_end_date - cur_start_date).days <= 31:
            date_range = 'month'
        elif (cur_end_date - cur_start_date).days <= 90:
            date_range = 'quarter'
        elif (cur_end_date - cur_start_date).days <= 90:
            date_range = 'half-year'
        else:
            date_range = 'year'

    if date_range in ['today', 'yesterday']:
        start_date = cur_start_date
        display_date = get_local_time(tenant.timezone, start_date)
        graph_slots.append({
            'key': display_date.strftime("%Y,%m,%d"),
            'start_date': start_date,
            'end_date': add_date_time(start_date, days=1, seconds=-1)
        })

    elif date_range == 'week':
        start_date = cur_start_date
        while start_date <= cur_end_date:
            display_date = start_date
            tz = pytz.timezone(tenant.timezone or current_app.config[
                               'DEFAULT_TIMEZONE'])
            display_date -= tz.utcoffset(start_date)
            graph_slots.append({
                'key': display_date.strftime("%Y,%m,%d"),
                'start_date': start_date,
                'end_date': add_date_time(start_date, days=1, seconds=-1)
            })
            start_date += timedelta(days=1)

    elif date_range in ['month', 'quarter']:
        start_date = cur_start_date
        week = 1
        while start_date <= cur_end_date:
            end_date = add_date_time(start_date, weeks=1, seconds=-1)
            if end_date > cur_end_date:
                end_date = cur_end_date
            display_date = start_date
            tz = pytz.timezone(tenant.timezone or current_app.config[
                               'DEFAULT_TIMEZONE'])
            display_date -= tz.utcoffset(start_date)
            graph_slots.append({
                'key': display_date.strftime("%Y,%m,%d"),
                'start_date': start_date,
                'end_date': end_date
            })
            start_date = add_date_time(start_date, weeks=1)
            week += 1

    elif date_range in ['half-year', 'year']:
        start_date = cur_start_date
        while start_date <= cur_end_date:
            month_end_day = calendar.monthrange(start_date.year,
                                                start_date.month)[1]
            month_end_date = datetime(
                start_date.year,
                start_date.month,
                month_end_day,
                start_date.hour,
                start_date.minute,
                start_date.second,
            )
            if month_end_date > cur_end_date:
                month_end_date = cur_end_date
            graph_slots.append({
                'key': start_date.strftime("%Y,%m,%d"),
                'start_date': start_date,
                'end_date': month_end_date
            })
            start_date = add_date_time(month_end_date, days=1)

    return graph_slots


def get_product_path(product, section_id, tenant_id):

    path = list()
    if section_id:
        path = get_section_path(product, section_id, path)

        # If section not found under product raise not found exception
        if product.slug != section_id and not path:
            raise SharedemosException(404)

    _product_detail = get_section_details(product)
    path.insert(0, _product_detail)
    return path


def get_path_details(path, fetch_icon=True):
    """
    Return Pathfinder Path details(title, description).

    params:
        path - SqlAlchemy object of Path class.
        fetch_icon - Boolean value, True by default.
    """
    translation = get_translation(path)
    path.title = translation.title
    path.description = translation.description
    if fetch_icon:
        path.icon = translation.icon
    return path


def get_question_details(question, fetch_icon=True):
    """
    Return PathFinder Question details with options data.

    params:
        question - SqlAlchemy object of Questions class.
        fetch_icon - Boolean value, True by default.
    """
    translation = get_translation(question)
    question.text = translation.text
    question.subtext = translation.subtext
    if fetch_icon:
        question.icon = translation.icon

    options = [op for op in question.options
               if op.is_enabled and not op.is_deleted]
    for option in options:
        translation = get_translation(option)
        if option.option_type == 'information':
            options = []
            question._information = option
            question._information.text = translation.text
            if fetch_icon:
                question._information.icon = translation.icon
            break
        option.text = translation.text
        if fetch_icon:
            option.icon = translation.icon

    question._options = options

    return question


def get_option_details(option):
    translation = get_translation(option)
    option.text = translation.text
    option.icon = translation.icon

    return option


def get_section_details(section):
    translation = get_translation(section)
    section.name = translation.name

    if not translation.description:
        default_trans = get_default_translation(section)
        translation.description = default_trans.description

    section.description = translation.description
    section._is_asset_linked = bool(translation.resource_id)
    return section


def get_section_path(section, target_slug, full_path=[]):
    section_list = list()
    if not section.is_deleted:
        if section.children:
            section_list = section.children

    for sec in section_list:
        if sec.slug == target_slug:
            if sec.is_deleted or not sec.is_enabled:
                raise SharedemosException(404)

            _sec_detail = get_section_details(sec)
            full_path.insert(0, _sec_detail)
            return full_path
        else:
            status = get_section_path(sec, target_slug, full_path)
            if status:
                if sec.is_deleted or not sec.is_enabled:
                    raise SharedemosException(404)

                _sec_detail = get_section_details(sec)
                full_path.insert(0, _sec_detail)
                break

    return full_path


def is_audience():
    # check for valid audience request
    tenant_id = getattr(current_app, 'tenant_id', None)
    if request.args.get('company') and 'user' in session and\
            'audience' in session['user'] and\
            session['user']['audience']['tenant_id'] == tenant_id:
        return True
    return False


def is_author():
    # check for author's request/authentication/tenant/permission
    tenant_id = getattr(current_app, 'tenant_id', None)
    if request.args.get('author') and g.user.is_active() and\
            g.user.tenant_id == tenant_id and g.user.is_author():
        return True
    return False


def is_chapter_available(chapter):
    """Check if chapter is available.

    For end users, include chapter if selected translation is available.
    check slide notes and RTE type slides for selection
    """
    ch_trans = get_locale_translation(chapter)
    slides = [sl for sl in chapter.slides if not sl.is_deleted]
    if not len(slides):
        return False

    for each_slide in slides:
        slide_type = each_slide.primary_resource.resource_type
        if slide_type == 'content':
            if each_slide.primary_resource.is_content_slide_available():
                return True
        elif ch_trans:
            return True
    return False


def check_translations_available(entity):
    """Function to check translation is available or not for entity."""
    if not entity or len(entity.translations) <= 1:
        return False

    enabled_locales = [
        language.language_id for language in entity.tenant.tenant_languages
        if language.is_public
    ] + [entity.tenant.default_locale_id]

    supported_locales = [trans.language_id for trans in entity.translations]
    locales_avilable = set(supported_locales).intersection(
        set(enabled_locales))
    return True if len(locales_avilable) > 1 else False


def available_locales(entity):
    """Function to get available locales for the entity(section/chapter)."""
    if not entity:
        return []

    enabled_locales = [
        language.language_id for language in entity.tenant.tenant_languages
        if language.is_public
    ] + [entity.tenant.default_locale_id]

    supported_locales = [trans.language_id for trans in entity.translations]
    locales_avilable = set(supported_locales).intersection(
        set(enabled_locales))
    return list(locales_avilable)


def update_resource_url(resource):
    """Update resource path and thumbnail url."""
    path = resource.path
    if resource.resource_type in (
        u"image", u"pdf", u"file",
        u"audio", u"360", u"video"
    ):
        path = static_url(filename="media/" + resource.path)
    elif resource.resource_type == "sandbox":
        path = resource.meta_data.get("cdn_url")

    elif resource.resource_type == "html5":
        _src = u"media/{}/{}/{}/index.html".format(
            resource.resource_type,
            resource.tenant.unique_tenant_id,
            resource.path
        )
        path = static_url(filename=_src)
    resource._path = path

    if resource.resource_type == "pdf":
        file_extension = os.path.splitext(resource.path)[-1]
        if resource.meta_data.get("source_type") and\
                resource.meta_data["source_type"] == "ppt":
            file_extension = os.path.splitext(
                resource.meta_data["source_name"]
            )[-1]
        resource._file_name = u"{}{}".format(
            resource.name, file_extension
        )
        if resource.meta_data.get("thumbnail_url"):
            resource._thumbnail = static_url(
                filename="media/" + resource.meta_data["thumbnail_url"]
            )

    elif resource.resource_type == "link" and\
            resource.meta_data.get("icon"):
        file_extension = os.path.splitext(
            resource.meta_data["icon_name"]
        )[-1]
        icon = None
        if file_extension:
            icon = static_url(
                filename="media/external_icons/" +
                resource.meta_data["icon_name"]
            )
        resource.meta_data["icon"] = icon

    elif resource.resource_type in (u"embed", u"wistia"):
        resource._thumbnail = resource.meta_data.get("thumbnail_url")


def get_locale():
    """Function to get locale based on user or author."""
    user = session.get("user")
    if not user:
        user = session.get("author")
    return user["locale"]
