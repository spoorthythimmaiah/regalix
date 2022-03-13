from flask import current_app, request
from flask.ext.restful import fields, marshal, Resource
from sqlalchemy.sql import and_

from sharedemos.libs.api import (
    add_to_api_cache,
    construct_cache_key_list,
    get_product_path,
    format_data,
    is_author
)
from sharedemos.libs.helpers import get_default_translation
from sharedemos.models import Section, Tenant, User


product_details = {
    'name': fields.String,
    'slug': fields.String,
    'description': fields.String,
    'is_asset_linked': fields.Boolean(attribute='_is_asset_linked')
}


def get_next_generation(product, get_draft=False, user=None):
    next_gen = {
        'name': unicode(product),
        'slug': product.slug,
        'id': product.id,
        'order': product.order,
        'is_private': product.tenant.flags.is_private or product.is_private,
        'is_asset_linked': bool(get_default_translation(product).resource_id),
        'can_edit': getattr(product, '_can_edit', None),
        'demos_count': 0,
        'slides_count': 0,
    }

    children_list = [_c for _c in product.children
                     if not _c.is_deleted and _c.is_enabled]
    playlist_list = None
    if not children_list:
        playlist_list = [_p for _p in product.playlists
                         if not _p.is_deleted and _p.is_enabled]

    if product.has_groups() and 'groups' not in next_gen:
        next_gen['groups'] = [grp.id for grp in product.get_restricted_to_groups()[0]]

    for child in children_list:
        if 'children' not in next_gen:
            next_gen['children'] = list()
        child._can_edit = child.can_edit(user)
        child_info = get_next_generation(child, get_draft, user)
        next_gen['demos_count'] += child_info.get('demos_count')
        next_gen['slides_count'] += child_info.get('slides_count')
        next_gen['children'].append(child_info)

    if playlist_list:
        if 'playlists' not in next_gen:
            next_gen['playlists'] = list()

        for playlist in playlist_list:
            playlist_groups = []
            if playlist.has_groups():
                playlist_groups = [grp.id for grp in playlist.get_restricted_to_groups()[0]]
            demos = list()
            playlist_walkthroughs = playlist.draft_walkthroughs\
                if get_draft else playlist.walkthroughs
            playlist_walkthroughs = [_w for _w in playlist_walkthroughs
                                     if not _w.is_deleted and _w.is_enabled]
            slides_in_playlist = 0
            slides_count = 0
            for walkthrough in playlist_walkthroughs:
                chapter_groups = []
                if not get_draft:
                    if walkthrough.has_groups():
                        chapter_groups = [grp.id for grp in walkthrough.get_restricted_to_groups()[0]]
                # Get the count of draft_slides.
                slides_count = len([sl for sl in walkthrough.slides
                                   if not sl.is_deleted])

                demos.append({
                    'name': unicode(walkthrough),
                    'slug': walkthrough.slug,
                    'walkthrough_id': walkthrough.id,
                    'slides_count': slides_count,
                    'groups': chapter_groups
                })
                slides_in_playlist += slides_count

            next_gen['playlists'].append({
                'name': unicode(playlist),
                'order': playlist.order,
                'demos': demos,
                'playlist_id': playlist.id,
                'groups': playlist_groups
            })

            next_gen['demos_count'] += len(demos)
            next_gen['slides_count'] += slides_in_playlist

    return next_gen


def merge_products(product, product_list):
    if not product_list:
        product_list.append(product)
        return

    siblings = [ch['slug'] for ch in product_list]
    if product['slug'] not in siblings:
        product_list.append(product)

    selected_prod = dict()
    for pr in product_list:
        if pr['slug'] == product['slug']:
            selected_prod = pr
            break

    if 'children' in product and product['children']:
        for child in product['children']:
            merge_products(child, selected_prod['children'])
        selected_prod['children'] = sorted(selected_prod['children'],
                                           key=lambda k: k['order'])


def get_ancestor(section, tree):
    if section.parent:
        tree = {
            'name': unicode(section.parent),
            'slug': section.parent.slug,
            'order': section.parent.order,
            'is_private': section.parent.is_private,
            'children': [tree]
        }
        return get_ancestor(section.parent, tree)

    return tree


def get_product_tree(get_draft=False, user=None):
    product_tree = list()
    tenant_id = getattr(current_app, 'tenant_id', None)

    tenant = Tenant.query.get(tenant_id)
    if not tenant:
        return product_tree

    if tenant.flags.is_private or is_author():
        products = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id.is_(None)) &
            (Section.is_enabled.__eq__(True)) &
            (Section.is_deleted.__eq__(False))
        )
        if request.args.get('current_section'):
            current_section = Section.query.filter(
                (Section.tenant_id == tenant_id) &
                (Section.slug == request.args.get('current_section')) &
                (Section.is_deleted.__eq__(False))
            ).first()
            if current_section:
                query_conditions = []
                current_product = current_section.get_category()
                query_conditions.append(Section.slug != current_product.slug)
                products = products.filter(and_(*query_conditions))

        products = products.order_by(Section.order).all()

        for product in products:
            product._can_edit = product.can_edit(user)
            product_tree.append(get_next_generation(product, get_draft, user))
    else:
        sections = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id.is_(None)) &
            (Section.is_enabled.__eq__(True)) &
            (Section.is_deleted.__eq__(False)) &
            (Section.is_private.__eq__(False))
        ).all()

        product_list = list()
        for sec in sections:
            sec._can_edit = sec.can_edit(user)
            tree = get_next_generation(sec, get_draft, user)
            tree = get_ancestor(sec, tree)
            product_list.append(tree)

        for prod in product_list:
            merge_products(prod, product_tree)

        product_tree = sorted(product_tree, key=lambda k: k['order'])

    return product_tree


class ProductTreeApi(Resource):

    def get(self, product_id=None, section_id=None):
        get_draft = request.args.get('get_draft')
        user_email = request.args.get('user')
        get_cache = False if request.args.get('get_cache') and\
            request.args.get('get_cache') == 'False' else True
        tenant_id = getattr(current_app, 'tenant_id', None)
        user = None

        if user_email:
            user = User.query.filter_by(
                tenant_id=tenant_id,
                email=user_email,
                is_deleted=False
            ).first()
            # While creating a new user
            if not user:
                user = 'is_new'

        if not product_id and not section_id:
            # Cache contents of SiteMap(ProductTree).
            cache = getattr(current_app, 'cache', None)
            # 'tenant' parameter is not sent to 'construct_cache_key_list',
            # since translations' data is not needed for the dashboard.
            entity = 'product_tree_user_' + str(user.id)\
                if user and getattr(user, 'id', None) else 'product_tree_default'
            product_tree_key = construct_cache_key_list(entity=entity)
            product_tree = cache.get(product_tree_key[0])
            if not product_tree or not get_cache:
                product_tree = get_product_tree(bool(get_draft), user)
                add_to_api_cache(entity=entity, api_data=product_tree)
            return product_tree

        product = Section.query.filter((Section.tenant_id == tenant_id) &
                                       (Section.parent_id.is_(None)) &
                                       (Section.slug == product_id) &
                                       (Section.is_deleted.__eq__(False))
                                       ).first_or_404()
        path = get_product_path(product, section_id, tenant_id)

        return format_data(marshal(path, product_details, envelope="path"))
