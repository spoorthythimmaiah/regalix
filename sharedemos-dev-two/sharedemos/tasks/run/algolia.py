from flask import current_app
from sqlalchemy.orm import joinedload

from sharedemos.models import (
    Checklist,
    FAQ,
    FAQGroup,
    FAQSection,
    Journey,
    Section,
    Path,
    Playlist,
    Tenant,
    Walkthrough,
)
from sharedemos.libs.algolia import (
    algolia_batch_update,
    get_walkthrough_attributes,
    init_algolia,
    uuid_from_id,
    upload_journey_to_search,
    upload_pathfinder_to_search,
    upload_faq_to_search,
    upload_checklist_to_search,
    upload_section_to_search,
    upload_walkthrough_to_search,
)
from sharedemos.libs.api import (
    get_all_chapters,
    get_all_children,
    get_all_playlists
)
from sharedemos.tasks.factory import celery


@celery.task(queue='algolia_tasks')
def update_algolia_content(data):
    """Update_algolia_content."""
    tenant_id = data.get('tenant_id')
    entity = data['entity']
    tenant = Tenant.query.get(tenant_id)
    algolia_index = init_algolia(tenant.domain)
    current_app.config['SERVER_NAME'] = tenant.domain
    with current_app.app_context() and current_app.test_request_context():
        if entity == u'playlist':
            """
                'action' represents what operation is executed
                'DELETE': remove all chapter from algolia under this playlist
                'UPDATE': update flags in algolia(
                        is_enabled is the only flag to update in playlist)
                'REORDER': re index(remove and add) all chapters under
                    this playlist to update newly changed items(
                    section & breadcrumb)
            """
            playlist = Playlist.query.get(data['entity_id'])
            attributes_list = []
            action = 'partialUpdateObject'
            for chapter in playlist.walkthroughs:
                object_id = uuid_from_id(chapter.id, 'walkthrough')
                if data['action'] == 'DELETE':
                    attributes_list.append({'objectID': object_id})
                    action = 'deleteObject'
                if data['action'] == 'UPDATE':
                    attributes_list.append({
                        'objectID': object_id,
                        'is_enabled': data.get('is_enabled')
                    })
                elif data['action'] == 'REORDER':
                    attributes = get_walkthrough_attributes(chapter)
                    attributes_list.append(attributes)
            algolia_batch_update(
                action, attributes_list, tenant.domain)

        elif entity == u'walkthrough':
            """
                'action' represents what operation is executed
                'DELETE': remove chapter from algolia
                'UPDATE': update flags in algolia(
                        is_enabled and groups are updated in chapter)
                'REORDER': re index(remove and add) chapter to update
                    newly changed items(section & breadcrumb)
            """
            chapter = Walkthrough.query.get(data['entity_id'])
            object_id = uuid_from_id(chapter.id, 'walkthrough')
            if data['action'] == 'DELETE':
                algolia_index.delete_object(object_id)
            elif data['action'] == 'UPDATE':
                if 'is_enabled' in data:
                    algolia_index.partial_update_object({
                        'objectID': object_id,
                        'is_enabled': data.get('is_enabled')
                    })
                elif 'groups' in data:
                    algolia_index.partial_update_object({
                        'objectID': object_id,
                        'groups': data['groups']
                    })
            elif data['action'] == 'REORDER':
                attributes = get_walkthrough_attributes(chapter)
                algolia_index.partial_update_object(attributes)

        elif entity == u'tenant':
            """
                'action' represents what operation is executed
                update access flag(is_public) of all records in algolia
            """
            if data['action'] == 'PRIVACY_UPDATE':
                all_records = algolia_index.browse_all()
                action = 'partialUpdateObject'
                attributes_list = [{'objectID': record['objectID'],
                                    'is_public': record.get('is_public')}
                                   for record in all_records]
                algolia_batch_update(
                    action, attributes_list, tenant.domain)

        elif entity == u'section':
            """
                'action' represents what operation is executed
                'DELETE': remove chapter from algolia under this section
                'UPDATE': update specified flags
                    if supplied else re index(remove and add) all chapters
                    under this section
                'REORDER' refers to UPDATE here with no flags.

                If the section is of asset type,
                then update the section record flags.
                To check whether the section is asset-linked or not,
                get the default_translation instead of locale specific translation.
            """
            section = Section.query.filter(
                Section.id == data['entity_id']
            ).options(
                joinedload(Section.tenant),
                joinedload(Section.translations)
            ).first()
            section_translation = section.get_default_translation()
            object_id = uuid_from_id(section.id, 'section')

            if data.get("is_name_changed"):
                algolia_index.delete_object(object_id)
                upload_section_to_search(section)

            if section_translation.resource_id or section.is_leafnode:
                if data['action'] == 'UPDATE':
                    if 'is_enabled' in data:
                        algolia_index.partial_update_object({
                            'objectID': object_id,
                            'is_enabled': data['is_enabled']
                        })
                    if 'is_private' in data:
                        algolia_index.partial_update_object({
                            'objectID': object_id,
                            'is_public': not data['is_private']
                        })
                    if 'reorder' in data:
                        # For updating the translations and asset-contents.
                        algolia_index.delete_object(object_id)
                        upload_section_to_search(section)

                    all_playlists = get_all_playlists([section])
                    if all_playlists:
                        all_chapters = get_all_chapters(all_playlists)
                        attributes_list = []
                        action = 'partialUpdateObject'
                        for chapter in all_chapters:
                            attributes = get_walkthrough_attributes(chapter)
                            if 'is_enabled' in data:
                                attributes['is_enabled'] = data.get("is_enabled")
                            attributes_list.append(attributes)
                        algolia_batch_update(
                            action, attributes_list, tenant.domain)

                if data['action'] == 'DELETE':
                    algolia_index.delete_object(object_id)
                    all_playlists = get_all_playlists([section])

                    if all_playlists:
                        all_chapters = get_all_chapters(all_playlists)

                        attributes_list = []
                        action = 'deleteObject'
                        for chapter in all_chapters:
                            attributes_list.append({'objectID': uuid_from_id(
                                chapter.id, 'walkthrough')})
                        algolia_batch_update(
                            action, attributes_list, tenant.domain)

            else:
                _children = get_all_children(section.children)
                for child in _children:
                    if child.is_leafnode:
                        # TODO: instead of delete,
                        # we've to do batch update similar to walkthrough.
                        algolia_index.delete_object(uuid_from_id(child.id, 'section'))
                        if data['action'] == 'UPDATE':
                            upload_section_to_search(child)

                all_playlists = get_all_playlists(_children)
                if all_playlists:
                    all_chapters = get_all_chapters(all_playlists)

                    attributes_list = []
                    action = 'partialUpdateObject'
                    for chapter in all_chapters:
                        attributes = {}
                        attributes['objectID'] = uuid_from_id(chapter.id, 'walkthrough')

                        if data['action'] == 'DELETE':
                            action = 'deleteObject'

                        if data['action'] == 'UPDATE':
                            if 'reorder' in data or data.get("is_name_changed"):
                                attributes = get_walkthrough_attributes(chapter)
                            if 'is_enabled' in data:
                                attributes['is_enabled'] = data["is_enabled"]
                            if 'is_private' in data:
                                attributes['is_public'] = not data['is_private']

                        attributes_list.append(attributes)

                    algolia_batch_update(
                        action, attributes_list, tenant.domain)

        elif entity == u'checklist':
            checklist = Checklist.query.get(data.get('checklist_id'))
            action = 'partialUpdateObject'
            attributes_list = []
            for section in checklist.checklist_sections:
                attributes_list += [{
                    'objectID': uuid_from_id(item.id, 'checklist'),
                    'is_enabled': data.get('is_enabled')}
                    for item in section.checklist_items
                ]
            algolia_batch_update(
                action, attributes_list, tenant.domain
            )

        elif entity == u'journey':
            journey = Journey.query.get(data['entity_id'])
            if journey:
                action = data['action']
                object_id = uuid_from_id(journey.id, entity)

                if action == 'DELETE':
                    algolia_index.delete_object(object_id)

                if action == 'UPDATE' and 'is_enabled' in data:
                    algolia_index.partial_update_object({
                        'objectID': object_id,
                        'is_enabled': data['is_enabled']
                    })


@celery.task(queue='algolia_tasks')
def upload_to_algolia(algolia_data):
    """For algolia upload/update published walkthrough is queried not a draft."""
    tenant_id = algolia_data.get('tenant_id')
    tenant = Tenant.query.get(tenant_id)
    current_app.config['SERVER_NAME'] = tenant.domain
    with current_app.app_context() and current_app.test_request_context():
        algolia_category = algolia_data.get('category')
        if algolia_category == u'pathfinder':
            path = Path.query.get(algolia_data.get('path_id'))
            if path:
                upload_pathfinder_to_search(path)
        elif algolia_category == u'faq':
            faq_group = FAQGroup.query.get(algolia_data.get('faq_group_id'))
            if faq_group:
                upload_faq_to_search(faq_group)
        elif algolia_category == u'checklist':
            checklist = Checklist.query.get(algolia_data.get('checklist_id'))
            if checklist:
                upload_checklist_to_search(checklist)
        elif algolia_category == u'chapter':
            walkthrough = Walkthrough.query.filter(
                Walkthrough.id == algolia_data.get("chapter_id")
            ).options(
                joinedload(Walkthrough.tenant),
                joinedload(Walkthrough.translations)
            ).first()
            if walkthrough:
                upload_walkthrough_to_search(walkthrough)
        elif algolia_category == u'section':
            section = Section.query.filter(
                Section.id == algolia_data.get("section_id")
            ).options(
                joinedload(Section.tenant),
                joinedload(Section.translations)
            ).first()
            if section:
                upload_section_to_search(section)

        elif algolia_category == u'journey':
            journey = Journey.query.filter(
                Journey.id == algolia_data.get("journey_id")
            ).options(
                joinedload(Journey.translations),
                joinedload(Journey.tenant)).first()
            if journey:
                upload_journey_to_search(journey)


@celery.task(queue='algolia_tasks')
def delete_faq_from_algolia(data):
    """Delete_faq_from_algolia."""
    category = data.get('entity')
    action = 'deleteObject'
    if category == u'group':
        faq_group = FAQGroup.query.get(data.get('entity_id'))
        attributes_list = []
        for section in faq_group.faq_sections:
            attributes_list += [{'objectID': uuid_from_id(question.id, 'faq')}
                                for question in section.questions]
        algolia_batch_update(
            action, attributes_list, faq_group.tenant.domain
        )

    elif category == u'section':
        faq_section = FAQSection.query.get(data.get('entity_id'))
        attributes_list = [{'objectID': uuid_from_id(question.id, 'faq')}
                           for question in faq_section.questions]
        algolia_batch_update(
            action, attributes_list, faq_section.tenant.domain
        )

    elif category == u'faq':
        faq = FAQ.query.get(data.get('entity_id'))
        algolia_index = init_algolia(faq.tenant.domain)
        objectid = uuid_from_id(faq.id, 'faq')
        algolia_index.delete_object(objectid)


@celery.task(queue='algolia_tasks')
def delete_path_from_algolia(data):
    """Delete_path_from_algolia."""
    path = Path.query.get(data.get('entity_id'))
    action = 'deleteObject'
    attributes_list = [{'objectID': uuid_from_id(question.id, 'faq')}
                       for question in path.questions]
    algolia_batch_update(action, attributes_list, path.tenant.domain)


@celery.task(queue='algolia_tasks')
def delete_checklist_from_algolia(data):
    """Delete_checklist_from_algolia."""
    checklist = Checklist.query.get(data.get('checklist_id'))
    action = 'deleteObject'
    attributes_list = []
    for section in checklist.checklist_sections:
        attributes_list += [{'objectID': uuid_from_id(item.id, 'checklist')}
                            for item in section.checklist_items]
    algolia_batch_update(action, attributes_list, checklist.tenant.domain)
