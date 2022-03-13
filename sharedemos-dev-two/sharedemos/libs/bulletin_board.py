from flask import (
    current_app,
    g,
    session,
    url_for
)

from flask.ext.restful import fields
from sqlalchemy import or_
from sharedemos.libs.api import (
    is_author,
)
from sharedemos.libs.helpers import (
    clear_bulletin_board_cache,
    get_default_translation,
    get_translation
)
from sharedemos.libs.model import (
    change_remaining_order,
    update_order_by_element_position
)
from sharedemos.models import (
    db,
    BulletinBoard,
    BulletinBoardLinks,
    Playlist,
    Section,
    Tenant,
    UserGroup,
    Walkthrough
)
from .url import static_url


BREADCRUMB_HOME = 'home'

bulletin_board_link_details = {
    'name': fields.String(attribute='_name'),
    'url': fields.String(attribute='_url'),
    'link_type': fields.String,
    'breadcrumb': fields.String(attribute='_breadcrumb'),
    'image_src': fields.String(attribute='_image_src'),
    'order': fields.Integer,
    'groups': fields.List(fields.Integer, attribute='_groups'),
    'product_id': fields.Integer,
    'section_id': fields.Integer,
    'chapter_id': fields.Integer(attribute='walkthrough_id'),
    'slide_type': fields.String(attribute='_slide_type')
}
user_groups_fields = {
    '_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'is_default': fields.Boolean,
    'is_author': fields.Boolean(attribute='_is_author'),
}
bulletin_board_api_fields = {
    '_id': fields.Integer(attribute='id'),
    'name': fields.String(attribute='_name'),
    'description': fields.String(attribute='_description'),
    'is_enabled': fields.Boolean,
    'links': fields.Nested(bulletin_board_link_details,
                           allow_null=False, attribute='_links'),
    'has_more_links': fields.Boolean(attribute='_has_more_links'),
    'restricted_to_group_details': fields.Nested(
        user_groups_fields,
        allow_null=True,
        attribute='_restricted_to_group_details'
    ),
}


def change_bulletin_board_order(choosen_bboard, target_bboard, target_section):
    """
    Update the order of bulletin board, when the author re-arranges it.

    Params:
        choosen_bboard: Bulletin board which is being dragged to re-order.
        target_bboard: Bulletin board object,
        bulletin board after which the choosen bulletin board is being placed.
        target_section: Section object, represents in which section bulletin boards are re-ordered.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    section_id = None
    if target_section:
        section = Section.query.filter_by(
            tenant_id=tenant_id,
            slug=target_section,
            is_deleted=False,
            is_enabled=True
        ).first_or_404()
        section_id = section.id
    adjacent_bboards = BulletinBoard.query.filter_by(
        tenant_id=tenant_id,
        section_id=section_id,
        is_deleted=False
    ).order_by(BulletinBoard.order).all()
    if not target_bboard:
        change_remaining_order(adjacent_bboards, increment=True)
    else:
        update_order_by_element_position(adjacent_bboards,
                                         target_bboard,
                                         increment=True)

    update_order_by_element_position(adjacent_bboards, choosen_bboard,
                                     increment=False)
    choosen_bboard.order = target_bboard.order + \
        1 if target_bboard else 1


def delete_link_from_bboard(entity_type, entity_id):
    """
    Delete the links in bulletin boards when the category/section/chapter is disabled.

    Params:
    entity_id:integer type, Takes section/chapter id
    entity_type:string ,takes "section/chapter"
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    base_query = BulletinBoard.query.join(BulletinBoardLinks).filter(
        BulletinBoard.tenant_id == tenant_id,
        BulletinBoard.is_deleted.__eq__(False),
        BulletinBoardLinks.is_deleted.__eq__(False)
    )
    if entity_type == u'section':
        bulletin_board_links = base_query.filter(or_(
            BulletinBoardLinks.section_id == entity_id,
            BulletinBoardLinks.product_id == entity_id
        )).with_entities(BulletinBoardLinks).all()
    else:
        bulletin_board_links = base_query.filter(
            BulletinBoardLinks.walkthrough_id == entity_id
        ).with_entities(BulletinBoardLinks).all()
    bulletin_boards = []
    for bboard_link in bulletin_board_links:
        bboard_link.is_deleted = True
        db.session.add(bboard_link)
        bulletin_boards.append(bboard_link.bulletin_board)
    db.session.commit()
    for bboard in bulletin_boards:
        clear_bulletin_board_cache(bboard)


def delete_unavailable_link(bb_link):
    """
    Function to delete link if chapter/section/product is not available.

    Params :link, Sqlalachemy object of bulletin boardlinks.
    """
    bb_link.is_deleted = True
    db.session.add(bb_link)
    db.session.commit()


def get_bulletin_boards():
    """
    Function to get all BulletinBoards which are in home level.

    Returns - list of all BulletinBoards with details.
    """
    all_bulletin_boards = []
    user = g.user
    tenant_id = current_app.tenant_id
    tenant = Tenant.query.get(tenant_id)
    bulletin_boards = BulletinBoard.query.filter(
        (BulletinBoard.tenant_id == tenant_id) &
        (BulletinBoard.is_deleted.__eq__(False)) &
        (BulletinBoard.section_id.is_(None))).order_by(BulletinBoard.order)
    if is_author():
        bulletin_boards = bulletin_boards.all()
    else:
        bulletin_boards = bulletin_boards.filter(
            BulletinBoard.is_enabled.__eq__(True))
        if tenant.flags.is_private and user.is_active() and user.is_viewer():
            user_groups = getattr(user, 'groups', None)
            if user_groups:
                group_ids = [grp.id for grp in user_groups]
                bulletin_boards = bulletin_boards.filter(
                    or_(
                        ~BulletinBoard.restricted_to_groups.any(),
                        BulletinBoard.restricted_to_groups.any(
                            UserGroup.id.in_(group_ids))
                    )
                )
        bulletin_boards = bulletin_boards.limit(2).all()
    for b_board in bulletin_boards:
        bb_details = get_bulletin_board_details(b_board, len(bulletin_boards))
        if bb_details:
            all_bulletin_boards.append(bb_details)

    return all_bulletin_boards


def get_bulletin_board_details(bulletin_board, total_bulletin_boards=None, all_links=False):
    """
    Function to get the details of a bulletin.

    params:
        bulletin_board - SQLAlchemy Object of BulletinBoard
        total_bulletin_boards - count of BulletinBoards
        all_links - if true, send all the links in the bulletin board
    returns:
        BulletinBoard object with translations details.
    """
    all_bb_links = get_bulletin_board_link_details(
        bulletin_board.bulletin_board_links,
        bulletin_board.tenant
    )
    author = is_author()
    if not author and not all_bb_links:
        return
    user_group, model_with_group = bulletin_board.get_restricted_to_groups()
    bulletin_board._restricted_to_group_details = user_group
    translation = get_translation(bulletin_board)
    bulletin_board._name = translation.name
    bulletin_board._description = translation.description or u''
    # If Number of BulletinBoard is greater than one
    # then the limit of links to display is 5 else 10
    if bulletin_board.tenant.template.lower() == u'dell':
        all_links = True
    num_links = len(bulletin_board.bulletin_board_links) if all_links else 5
    if not author and total_bulletin_boards:
        num_links = num_links if total_bulletin_boards > 1 else 10
    bulletin_board._links = all_bb_links[:num_links]
    bulletin_board._has_more_links = True if len(
        all_bb_links) > num_links else False
    return bulletin_board


def get_bulletin_board_link_details(bulletin_board_links, tenant):
    """
    Return list with link details- url, breadcrumb, name, order, thumbnail_url.

    Params:
        bulletin_board_links - List of Sqlalchemy BulletinBoard links objects.
        tenant - Sqlalchemy Tenant object.
    """
    author = is_author()
    user = session.get('author') if author else session.get('user')
    locale = (
        user['locale']
        if user and user.get('locale')
        else tenant.default_locale_id
    )

    all_links = []
    for link in bulletin_board_links:
        if link.is_deleted:
            continue

        image_src = slide_type = None
        if link.link_type == u'external':
            link_trans = get_translation(link)
            link._name = link_trans.title
            link._url = link_trans.link
            link._image_src = image_src
        else:
            # Other than 'external', link_type will be 'internal'.
            url = breadcrumb = name = ''
            product_name = section_name = None
            groups = []
            if link.walkthrough_id:
                chapter = Walkthrough.query.join(
                    Playlist).join(Section).filter(
                    Walkthrough.id == link.walkthrough_id,
                    Walkthrough.tenant_id == tenant.id,
                    Walkthrough.is_deleted.__eq__(False),
                    Walkthrough.is_enabled.__eq__(True),
                    Playlist.is_enabled.__eq__(True),
                    Playlist.is_deleted.__eq__(False),
                    Section.is_enabled.__eq__(True),
                    Section.is_deleted.__eq__(False),
                ).with_entities(
                    Walkthrough, Section
                ).first()

                if not(chapter and chapter.Section.is_available(include_is_hidden=False)):
                    delete_unavailable_link(link)
                    continue

                product = chapter.Section.get_category()
                product_name = product.get_name(locale=locale)
                section = chapter.Section
                section_name = section.get_name(locale=locale)
                chapter = chapter.Walkthrough
                chapter_name = chapter.get_name(locale=locale)
                image_src = chapter.get_thumbnail()
                first_slide = chapter.get_first_slide()
                if first_slide and first_slide.primary_resource:
                    slide_type = first_slide.primary_resource.resource_type

                url = url_for(
                    'main.route_handler',
                    section=section.slug,
                    chapter=chapter.slug,
                )
                if product == section:
                    breadcrumb = u'{} > {} > {}'.format(
                        BREADCRUMB_HOME,
                        product_name,
                        chapter_name
                    )
                else:
                    breadcrumb = u'{} > {} > {} > {}'.format(
                        BREADCRUMB_HOME,
                        product_name,
                        section_name,
                        chapter_name
                    )

                if tenant.template.lower() in (u'dell', u'avaya'):
                    url = url_for(
                        'main.launchpad',
                        section=section.slug, chapter=chapter.slug)

                name = chapter.get_name(locale=locale)
                groups = [
                    group.id
                    for group in chapter.get_restricted_to_groups()[0]
                ]

            elif link.section_id and not (link.walkthrough_id):
                section = Section.query.filter(
                    Section.tenant_id == tenant.id,
                    Section.id == link.section_id,
                    Section.is_deleted.__eq__(False),
                    Section.is_enabled.__eq__(True)
                ).first()

                if not(section and section.is_available(include_is_hidden=False)):
                    delete_unavailable_link(link)
                    continue

                # Check if the section is asset linked.
                asset = None
                default_translation = get_default_translation(section)
                if default_translation.resource_id:
                    asset = default_translation.resource
                    trans = get_translation(
                        section, author=author, locale=locale
                    )
                    if trans and trans.resource_id:
                        asset = trans.resource
                        link._is_linked_asset = True
                    url = url_for(
                        'main.serve_section_assets',
                        asset_name=asset.name
                    )
                    product = section.get_category()
                    slide_type = u'asset'
                    if product == section:
                        breadcrumb = u'{} > {} > {}'.format(
                            BREADCRUMB_HOME,
                            product.get_name(locale=locale),
                        )
                    else:
                        breadcrumb = u'{} > {} > {}'.format(
                            BREADCRUMB_HOME,
                            product.get_name(locale=locale),
                            section.get_name(locale=locale),
                        )

                else:
                    product = section.get_category()
                    slide_type = u'section'
                    url = url_for(
                        'main.route_handler',
                        section=section.slug
                    )
                    if product == section:
                        breadcrumb = u'{} > {}'.format(
                            BREADCRUMB_HOME,
                            product.get_name(locale=locale)
                        )
                    else:
                        breadcrumb = u'{} > {} > {}'.format(
                            BREADCRUMB_HOME,
                            product.get_name(locale=locale),
                            section.get_name(locale=locale)
                        )
                    if tenant.template.lower() == u'avaya':
                        url = url_for('apps.library', section=section.slug)

                groups = [
                    group.id
                    for group in section.get_restricted_to_groups()[0]
                ]
                name = section.get_name(locale=locale)
                image_src = section.icon_url
                if not image_src and asset:
                    if asset.meta_data.get('thumbnail_url'):
                        image_src = static_url(
                            filename='media/' +
                            asset.meta_data['thumbnail_url']
                        )

            elif link.product_id and not(link.walkthrough_id or link.section_id):
                product = Section.query.filter(
                    Section.tenant_id == tenant.id,
                    Section.id == link.product_id,
                    Section.is_deleted.__eq__(False),
                    Section.is_enabled.__eq__(True)
                ).first()

                if not product:
                    delete_unavailable_link(link)
                    continue

                asset = None
                default_translation = get_default_translation(product)
                if default_translation.resource_id:
                    asset = default_translation.resource
                    trans = get_translation(
                        product, author=author, locale=locale
                    )
                    if trans and trans.resource_id:
                        asset = trans.resource
                        link._is_linked_asset = True
                    url = url_for(
                        'main.serve_section_assets',
                        asset_name=asset.name
                    )
                    breadcrumb = u'{} > {}'.format(
                        BREADCRUMB_HOME,
                        product.get_name(locale=locale),
                    )
                    slide_type = u'asset'
                else:
                    slide_type = u'section'
                    breadcrumb = u'{} > {}'.format(
                        BREADCRUMB_HOME,
                        product.get_name(locale=locale)
                    )
                    url = url_for(
                        'main.route_handler',
                        section=product.slug
                    )

                    if tenant.template.lower() == u'avaya':
                        url = url_for('apps.library', section=product.slug)

                name = product.get_name(locale=locale)
                image_src = product.icon_url
                if not image_src and asset:
                    if asset.meta_data.get('thumbnail_url'):
                        image_src = static_url(
                            filename='media/' +
                            asset.meta_data['thumbnail_url']
                        )

                groups = [
                    group.id
                    for group in product.get_restricted_to_groups()[0]
                ]

            link._breadcrumb = breadcrumb
            link._url = url
            link._name = name
            link._groups = groups
            link._image_src = image_src
            link._slide_type = slide_type
        all_links.append(link)
    return all_links
