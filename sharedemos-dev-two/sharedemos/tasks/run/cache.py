from sqlalchemy.orm import joinedload
from sharedemos.models import (
    Playlist,
    Section,
    Tenant,
    Walkthrough
)
from sharedemos.libs.api import (
    delete_cache_with_pattern,
    delete_from_api_cache,
    get_all_chapters,
    get_all_children,
    get_all_playlists,
    get_section_slug_list
)
from sharedemos.tasks.factory import celery


@celery.task(queue='cache_tasks')
def delete_api_cache_data(api_data):
    """
    Delete API cache data.

    if 'api_data' has:
        * model_id, then get the model from model_id,
            get all children, chapters,
            get 2 levels of parents in case of section,
            get parent-section in case of walkthrough.
        * delete_pattern, then create an entity_pattern_list,
            remove all the cache data matching entities and RETURN.
        * if 'entity' is walkthrough, then by default remove its section cache.
        * if its not 'delete_pattern', then remove cache with normal entity.
        * if 'delete_path' is true, delete cache till the parent section.

    """
    model = None
    tenant = None
    if api_data.get('tenant_id'):
        tenant = Tenant.query.get(api_data.get('tenant_id'))

    entity = api_data.get('entity')
    clear_all_products = api_data.get('clear_all_products')

    if api_data.get('model_id'):
        model_id = api_data['model_id']

        if entity == 'section':
            model = Section.query.get(model_id)

            if api_data.get('delete_parent'):
                # If 'delete_parent' is True,
                # then by default delete 2 levels of parents.
                # (This is to clear sub-category cache for 'BMC').
                parent = model.parent
                if parent:
                    model._parents = [parent]
                    if parent.parent_id:
                        model._parents.append(parent.parent)

            if api_data.get('delete_children'):
                # get_disabled=True cause, we are calling the cache delete functions
                # after setting an entity as disabled in the sdemos api.
                # So the actual entity which gets disabled in the api,
                # will be filtered out when we call get_all_entity method
                # and will not be removed if get_disabled is not set to True.
                model._children = get_all_children(model.children, get_disabled=True)

                all_playlists = None
                if model._children:
                    all_playlists = get_all_playlists(model._children, get_disabled=True)
                else:
                    all_playlists = get_all_playlists([model], get_disabled=True)

                if all_playlists:
                    model._chapters = get_all_chapters(all_playlists, get_disabled=True)

            if api_data.get('delete_path'):
                model._sec_slug_list = get_section_slug_list(model)

        elif entity == 'walkthrough':
            model = Walkthrough.query.options(
                joinedload(Walkthrough.playlist).joinedload(Playlist.section)
            ).filter(
                Walkthrough.id == model_id
            ).first()

            model._parents = [model.playlist.section]
            if api_data.get('delete_path'):
                model._sec_slug_list = get_section_slug_list(model._parents[0])

    if api_data.get('delete_pattern'):
        # 'delete_pattern' is True,
        # incase of calling from models,
        # also incase of calling with entity as
        # 'product_tree', 'dashboard', 'all_playlists' and 'all_journeys'.

        if model:
            entity_pattern_list = (
                ['*{}*_{}'.format(api_data['entity'], model.slug)]
                if getattr(model, 'slug', None)
                else
                []
            )

            for parent in getattr(model, '_parents', []):
                entity_pattern_list.append(
                    '*section*_{}'.format(parent.slug)
                )

            for child in getattr(model, '_children', []):
                entity_pattern_list.append(
                    '*section*_{}'.format(child.slug)
                )

            for chapter in getattr(model, '_chapters', []):
                entity_pattern_list.append(
                    '*walkthrough*_{}'.format(chapter.slug)
                )
                entity_pattern_list.append(
                    '*_launchpad*_{}'.format(chapter.slug)
                )
            for slug in getattr(model, '_sec_slug_list', []):
                entity_pattern_list.append(
                    '*section*_{}'.format(slug)
                )

            for entity_pattern in entity_pattern_list:
                delete_cache_with_pattern(
                    delete_entity_type=entity_pattern,
                    clear_all_products=clear_all_products,
                    tenant=tenant
                )

        elif entity:
            delete_cache_with_pattern(
                delete_entity_type=entity,
                clear_all_products=clear_all_products,
                tenant=tenant
            )
        return

    delete_from_api_cache(
        entity=entity,
        model=model,
        **{'delete_parent': api_data.get('delete_parent'),
           'delete_children': api_data.get('delete_children'),
           'delete_chapters': api_data.get('delete_chapters'),
           'tenant': tenant
           }
    )
