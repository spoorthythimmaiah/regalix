from flask import current_app, g, url_for
from flask.ext.restful import fields, marshal

from sqlalchemy import or_

from sharedemos.api.journey import get_journeys
from sharedemos.models import Section, UserGroup
from sharedemos.libs.api import(
    format_data,
    construct_cache_key_list,
    add_to_api_cache,
    is_author
)
from sharedemos.libs.helpers import build_url
from sharedemos.libs.utils import (
    check_user_get_cache_entity,
    get_tenant_api,
    is_restricted_to_groups
)

chapter_api_fields = {
    'name': fields.String,
    'slug': fields.String,
    'tags': fields.List(fields.String, attribute='_tags'),
    'url': fields.String(attribute='_url')
}

playlists_api_feilds = {
    'name': fields.String,
    'product': fields.String(attribute='_product'),
    'section': fields.String(attribute='_section'),
    'chapters': fields.Nested(chapter_api_fields, attribute='walkthroughs_')
}

journey_api_fields = {
    'name': fields.String(attribute='_name'),
    'url': fields.String(attribute='_url'),
    'icon_path': fields.String(attribute='_icon_path', default='')
}


def get_all_playlists():
    """Get all playlist details."""
    user = g.user
    cache_entity_type = check_user_get_cache_entity('all_playlists', user)
    playlists_cache_key = construct_cache_key_list(
        entity=cache_entity_type)
    cache = getattr(current_app, 'cache')
    playlists_in_cache = cache.get(playlists_cache_key[0])

    tenant_in_cache = get_tenant_api()
    response = {
        'all_playlists': [],
        'tenant': tenant_in_cache
    }

    if not playlists_in_cache:
        products = get_all_products()
        playlists_details = []
        for product in products:
            if product.is_leafnode:
                playlists = get_playlists_data(product)
                playlists_details.extend(playlists)

            elif product.children:
                playlists = get_leafnode_section_playlists(product)
                playlists_details.extend(playlists)

        playlists_in_cache = format_data(
            marshal(
                playlists_details, playlists_api_feilds, envelope='all_playlists'
            ))
        # Add data to cache
        add_to_api_cache(
            entity=cache_entity_type, api_data=playlists_in_cache)

    response.update(playlists_in_cache)

    return response


def get_leafnode_section_playlists(section):
    """
    Recursive function to get leafnode section playlists.

    params:
        section: SqlAlchemy 'Section' object.
    """
    playlists = []
    for child in section.children:
        if child.is_leafnode and is_section_available(child):
            playlists.extend(get_playlists_data(child))

        elif child.children:
            playlists.extend(get_leafnode_section_playlists(child))

    return playlists


def is_section_available(section):
    """
    Check availabilty of section.
    Based on is_enabled, is_deleted, is_hidden and user_groups entities.

    params:
        section: Sqlalchemy 'Section' object.
    """
    user = g.user
    user_groups = getattr(user, 'groups', None)
    if (
        not section.is_enabled or
        section.is_deleted or
        section.is_hidden or
        is_restricted_to_groups(user_groups, section, is_author())
    ):
        return False
    return True


def get_all_products():
    """Get all products."""
    tenant_id = current_app.tenant_id
    all_products = Section.query.filter(
        (Section.tenant_id == tenant_id) &
        (Section.parent_id.is_(None)) &
        (Section.is_deleted.__eq__(False))
    )
    """
    Get all sections for an author/admin,
    private and public sections for a analyst/viewer,
    only enabled and public sections for an anon-user.
    """
    if not is_author():
        user = g.user
        if user.is_active() and user.is_viewer():
            all_products = all_products.filter(
                (Section.is_enabled.__eq__(True)) &
                (Section.is_hidden.__eq__(False))
            )
            user_groups = getattr(user, 'groups', None)
            if user_groups:
                group_ids = [grp.id for grp in user_groups]
                all_products = all_products.filter(
                    or_(
                        ~Section.restricted_to_groups.any(),
                        Section.restricted_to_groups.any(
                            UserGroup.id.in_(group_ids))))
        else:
            all_products = all_products.filter(
                (Section.is_enabled.__eq__(True)) &
                (Section.is_private.__eq__(False)) &
                (Section.is_hidden.__eq__(False)))

    all_products = all_products.order_by(
        Section.order
    ).all()

    return all_products


def get_all_journeys():
    """Get all journeys."""
    user = g.user
    cache = getattr(current_app, 'cache')

    cache_entity_type = check_user_get_cache_entity('all_journeys', user)
    all_journeys_cache_key = construct_cache_key_list(
        entity=cache_entity_type)
    journeys_in_cache = cache.get(all_journeys_cache_key[0])

    response = {
        'tenant': get_tenant_api(),
        'all_journeys': []
    }
    if not journeys_in_cache:
        journeys_in_cache = get_journeys()

        for journey in journeys_in_cache:
            # Build journey URL.
            journey._url = url_for('main.journey', journey_slug=journey.slug)

        journeys_in_cache = format_data(
            marshal(
                journeys_in_cache, journey_api_fields, envelope='all_journeys')
        )

        add_to_api_cache(
            entity=cache_entity_type, api_data=journeys_in_cache)

    response.update(journeys_in_cache)

    return response


def get_playlists_data(section):
    """
    Get playlists data.

    params:
        section: Sqlalchemy 'Section' object.
    """
    playlists = []
    user_groups = getattr(g.user, 'groups', None)
    author = is_author()
    for playlist in section.playlists:
        if (
            playlist.is_deleted or
            (not author and not playlist.is_enabled) or
            is_restricted_to_groups(user_groups, playlist, author)
        ):
            continue
        playlist.name = playlist.get_name()
        playlist._product = section.get_category().slug
        playlist._section = section.slug

        if author:
            walkthroughs = playlist.draft_walkthroughs
        else:
            walkthroughs = playlist.walkthroughs

        playlist.walkthroughs_ = []
        for walkthrough in walkthroughs:
            """
            In this scenario, 'walkthrough' variable can have
            either draft or published entity, to check restrictions,
            only published entity is required.
            """
            draft = getattr(walkthrough, 'draft', walkthrough)
            published_chapter = draft.published
            if (
                walkthrough.is_deleted or
                (not author and not walkthrough.is_enabled) or
                is_restricted_to_groups(user_groups, published_chapter, author)
            ):
                continue

            wt_trans = walkthrough.get_translation()
            # Add chapter translation data.
            walkthrough.name = wt_trans.name
            walkthrough._tags = wt_trans.get_tags()
            # Build chapter URL
            walkthrough._url = build_url(section.slug, walkthrough.slug)

            playlist.walkthroughs_.append(walkthrough)

        if playlist.walkthroughs_:
            playlists.append(playlist)

    return playlists
