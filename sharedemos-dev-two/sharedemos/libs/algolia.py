import json
import string
import requests
import uuid

from algoliasearch import algoliasearch
from bs4 import BeautifulSoup
from collections import defaultdict
from urllib import unquote

from flask import current_app, url_for

from sharedemos.libs.helpers import (
    get_tenant_uuid,
    get_translation
)
from sharedemos.libs.url import static_url
from sharedemos.models import SampleExchange, Tenant


WHITELIST_ATTRIBUTES = ['objectID', 'public', 'url',
                        'is_public', 'is_enabled']


def uuid_from_id(entity_id, entity):
    """
    Generate an ObjectID.

    ObjectId: combination of record id and app type.
    """
    object_id = "%s_%s" % (entity, entity_id)
    return unicode(
        uuid.uuid5(
            uuid.NAMESPACE_OID,
            unicode(object_id).decode('utf-8').encode('utf-8'))
    )


def get_alogolia_client(tenant_domain):
    """Get algolia-search client for given tenant."""
    project_env = current_app.config.get('PROJECT_ENV')
    # Return None while 'testing'.
    if project_env == 'testing':
        return None

    aloglia_api_key = current_app.config.get('ALGOLIA_API_KEY')
    client = algoliasearch.Client(
        current_app.config.get('ALGOLIA_APPLICATION_ID'),
        aloglia_api_key)

    return client


def init_algolia(tenant_domain):
    """Initialize algolia-search using domain to create algolia index."""
    client = get_alogolia_client(tenant_domain)
    index_name = get_tenant_uuid(tenant_domain)
    algolia_index = client.init_index(index_name)
    return algolia_index


def get_all_tags(section, tags=None):
    """
    Tag recursive function.

    Return list of all tags from the subsection to the top level Section.
    """
    if not tags:
        tags = []

    for trans in section.translations:
        # Function to return tags associated with current translation
        tags += trans.get_tags()

    return tags


def upload_journey_to_search(journey):
    """Upload Journey data to algolia."""
    try:
        translation = journey.get_translation()
        if not translation:
            return

        journey_dict = defaultdict(list)
        attributes_to_retrieve = {"category", "url"}

        journey_dict.update({
            "category": "journeys",
            "is_enabled": journey.is_enabled,
            "objectID": uuid_from_id(journey.id, "journey"),
            "url": url_for("main.journey", journey_slug=journey.slug),
        })

        tenant = journey.tenant
        # adding user group restriction
        if journey.restricted_to_groups:
            journey_dict["groups"] = [
                grp.id for grp in journey.restricted_to_groups
            ]
            attributes_to_retrieve.add("groups")

        for trans in journey.translations:
            thumbnail_key = u"{}_{}".format("image_url", trans.language_id)
            if trans.icon_id:
                journey_dict[thumbnail_key] = static_url(
                    filename='media/' + trans.icon.path
                )
                attributes_to_retrieve.add(thumbnail_key)
            title_key = u"{}_{}".format("title", trans.language_id)
            journey_dict[title_key] = trans.name
            attributes_to_retrieve.add(title_key)
            if trans.description:
                description_key = u"{}_{}".format(
                    "description", trans.language_id)
                journey_dict[description_key] = trans.description
                attributes_to_retrieve.add(description_key)

        journey_json_data = json.loads(json.dumps(journey_dict))
        algolia_index = init_algolia(tenant.domain)
        algolia_index.add_object(journey_json_data)

        update_algolia_settings(
            journey_dict,
            list(attributes_to_retrieve),
            algolia_index
        )

    except Exception, e:
        print "Uploading Journey data- FAILED", e


def upload_section_to_search(section):
    """Upload leafnode section data and asset-data to algolia."""
    try:
        default_translation = section.get_default_translation()
        if not default_translation.resource_id and not section.is_leafnode:
            return

        object_id = uuid_from_id(section.id, "section")
        tags = get_all_tags(section)
        product = section.get_category()
        product_name = product.get_name()
        tenant = section.tenant
        section_dict = defaultdict(list)

        section_dict.update({
            "category": "library",
            "is_asset": False,
            "is_enabled": section.is_enabled and section.is_available(
                include_is_hidden=False),
            "is_leafnode": section.is_leafnode,
            "is_public": not section.is_private,
            "objectID": object_id,
            "product": product_name,
            "public": True,
            "tags": tags
        })

        # adding thumbnial
        thumbnail = u"{}_{}".format("image_url", tenant.default_locale_id)
        if section.icon_id:
            section_dict[thumbnail] = static_url(
                filename="media/" + section.icon.path
            )

        # Check for SPA templates.
        if tenant.template.lower() in current_app.config["SPA_TEMPLATES"]:
            url = product.slug
            if section.slug != product.slug:
                url = u"{}/{}".format(url, section.slug)
            url = unquote(
                url_for("main.home", _anchor="!/" + url)
            )

        elif tenant.template.lower() == u'avaya':
            url = url_for('apps.library', section=section.slug)

        else:
            url = url_for(
                "main.route_handler",
                section=section.slug
            )

        section_dict["url"] = url

        attributes_to_retrieve = {
            "category", "is_asset", "is_leafnode", "product",
            "url", thumbnail
        }

        for trans in section.translations:

            if(
                trans.resource_id and
                trans.resource.resource_type == u"asset_link"
            ):
                # adding asset information
                section_dict["is_asset"] = True
                asset_url_key = u"{}_{}".format("asset_url", trans.language_id)
                section_dict[asset_url_key] = url_for(
                    "main.serve_section_assets",
                    asset_name=trans.resource.name
                )
                attributes_to_retrieve.add(asset_url_key)

            # adding breadcrumb
            breadcrumb_key = u"{}_{}".format("breadcrumb", trans.language_id)
            section_dict[breadcrumb_key] = trans.title
            if section.slug != product.slug:
                section_dict[breadcrumb_key] = u"{} > {}".format(
                    product_name,
                    trans.title
                )
            attributes_to_retrieve.add(breadcrumb_key)

            # adding title and description
            title_key = u"{}_{}".format("title", trans.language_id)
            description_key = u"{}_{}".format("description", trans.language_id)
            section_dict[title_key] = trans.title
            section_dict[description_key] = trans.description
            attributes_to_retrieve.update([title_key, description_key])

        # adding user group restriction
        restricted_to_groups = section.get_restricted_to_groups()[0]
        if restricted_to_groups:
            section_dict["groups"] = [grp.id for grp in restricted_to_groups]
            attributes_to_retrieve.add("groups")

        section_json_data = json.loads(json.dumps(section_dict))
        algolia_index = init_algolia(tenant.domain)
        algolia_index.add_object(section_json_data)

        update_algolia_settings(
            section_dict,
            list(attributes_to_retrieve),
            algolia_index
        )

    except Exception, e:
        print "Uploading section data- FAILED", e


def upload_walkthrough_to_search(chapter):
    """Upload chapter content to algolia."""
    try:
        walkthrough_dict = defaultdict(list)
        playlist = chapter.playlist
        section = playlist.section
        product = section.get_category()
        tenant = chapter.tenant

        is_enabled = (
            chapter.is_enabled and
            not chapter.is_deleted and
            playlist.is_enabled and
            not playlist.is_deleted and
            section.is_available(include_is_hidden=False)
        )
        object_id = uuid_from_id(chapter.id, "walkthrough")
        url = get_chapter_url(product, section, chapter, tenant)
        tags_list = get_all_tags(section)

        walkthrough_dict.update({
            "category": "library",
            "is_enabled": is_enabled,
            "is_public": not section.check_private(),
            "objectID": object_id,
            "product": product.get_name(),
            "public": True,
            "tags": tags_list,
            "url": url
        })

        attributes_to_retrieve = {"url", "category", "product"}

        for trans in chapter.translations:
            # adding chapter tags with section's tags
            tags_list += trans.get_tags()

            language_id = trans.language_id
            product_name = product.get_name(language_id)
            section_name = section.get_name(language_id)
            chapter_name = unicode(trans.title)

            breadcrumb_key = u"{}_{}".format("breadcrumb", language_id)
            walkthrough_dict[breadcrumb_key] = u"{} > {}".format(
                section_name,
                chapter_name
            )
            if product.id != section.id:
                walkthrough_dict[breadcrumb_key] = u"{} > {}".format(
                    product_name,
                    walkthrough_dict[breadcrumb_key]
                )

            thumbnail_key = u"{}_{}".format(
                "image_url",
                language_id
            )

            thumbnail_url = chapter.get_thumbnail(locale=language_id)
            if thumbnail_url:
                walkthrough_dict[thumbnail_key] = thumbnail_url

            title_key = u"{}_{}".format("title", language_id)
            walkthrough_dict[title_key] = chapter_name

            attributes_to_retrieve.update(
                [breadcrumb_key, thumbnail_key, title_key]
            )
        walkthrough_dict["tags"] = tags_list

        for trans in section.translations:
            section_title = u"{}_{}".format(
                "section_title",
                trans.language_id
            )
            section_description = u"{}_{}".format(
                "section_description",
                trans.language_id
            )
            walkthrough_dict[section_title] = unicode(trans.title)
            walkthrough_dict[section_description] = unicode(
                trans.description
            )

        media_type = None
        slides = [_s for _s in chapter.slides if not _s.is_deleted]
        for slide in slides:
            if not media_type:
                media_type = slide.primary_resource.resource_type
            slide_translations = [_t for _t in slide.translations if _t.notes]
            for trans in slide_translations:
                for content in trans.notes.values():
                    if content.get("title"):
                        walkthrough_dict["notes_" + trans.language_id].\
                            append(unicode(BeautifulSoup(
                                           content.get("title"), "lxml")))
                    if content.get("body"):
                        walkthrough_dict["notes_" + trans.language_id].\
                            append(unicode(BeautifulSoup(
                                           content.get("body"), "lxml")))

            # Add content resource
            if slide.primary_resource and\
                    slide.primary_resource.resource_type == "content":

                translations = slide.primary_resource.translations()
                for trans in translations:
                    if not trans.content:
                        continue
                    content = BeautifulSoup(trans.content, "lxml")
                    content = unicode(content.get_text())
                    walkthrough_dict[
                        "text_content_" + trans.language_id
                    ].append(content)

            # Add footer resource
            if slide.secondary_resource and\
                    slide.secondary_resource.resource_type == "footer" and\
                    slide.secondary_resource.content:
                content = BeautifulSoup(slide.secondary_resource.content,
                                        "lxml")
                content = unicode(content.get_text())
                walkthrough_dict[
                    "text_footer_" + slide.secondary_resource.language_id
                ].append(content)

            # Index slide hotspots
            for hotspot in slide.hotspots:
                for hotspot_trans in hotspot.translations:
                    """
                        query hotspot translations,
                        if there is callout then get the "text",
                        if no callout return None.
                    """
                    if hotspot_trans.callout and\
                            hotspot_trans.callout.get("text"):
                        walkthrough_dict[
                            "hotspots_text_" + hotspot_trans.language_id
                        ].append(
                            unicode(hotspot_trans.callout.get("text")))

            # Index slide pins
            for pin in slide.pins:
                pin_translations = [_t for _t in pin.translations
                                    if _t.callout]
                for trans in pin_translations:
                    # index pin translations
                    if trans.callout.get("title"):
                        walkthrough_dict[
                            "pin_text_" + trans.language_id
                        ].append(trans.callout.get("title"))
                    if trans.callout.get("body"):
                        walkthrough_dict[
                            "pin_text_" + trans.language_id
                        ].append(trans.callout.get("body"))

        walkthrough_dict["media_type"] = media_type
        attributes_to_retrieve.add("media_type")
        restricted_to_groups = chapter.get_restricted_to_groups()[0]
        if restricted_to_groups:
            walkthrough_dict["groups"] = [
                grp.id for grp in restricted_to_groups]
            attributes_to_retrieve.add("groups")

        walkthrough_json = json.loads(json.dumps(walkthrough_dict))
        algolia_index = init_algolia(tenant.domain)
        algolia_index.add_object(walkthrough_json)

        update_algolia_settings(
            walkthrough_dict,
            list(attributes_to_retrieve),
            algolia_index
        )
    except Exception, e:
        print "Uploading walkthrough data- FAILED", e


def upload_pathfinder_to_search(path):
    """Uploadig Pathfinder Contents to Algolia Search."""
    try:
        algolia_index = init_algolia(path.tenant.domain)
        questions_dict = defaultdict(list)

        questions = [_q for _q in path.questions
                     if not _q.is_deleted and _q.is_enabled]
        for qstn in questions:
            attributes_to_retrieve = {"category", "url"}
            object_id = uuid_from_id(qstn.id, "path_question")
            url = url_for(
                'main.pathfinder',
                slug=path.slug
            )

            questions_dict.update({
                "category": u"pathfinder",
                "is_enabled": True,
                "objectID": object_id,
                "url": url
            })
            for q_trans in qstn.translations:
                language_id = q_trans.language_id

                key = u"{}_{}".format("question_text", language_id)
                questions_dict[key] = unicode(q_trans.text)

                key = u"{}_{}".format("question_subtext", language_id)
                questions_dict[key] = unicode(q_trans.subtext)

                path_trans = get_translation(
                    path,
                    locale=q_trans.language_id
                )

                # adding thumbnail image details
                thumbnail = "image_url_" + q_trans.language_id
                if path_trans.icon_id:
                    questions_dict[thumbnail] = static_url(
                        filename="media/" + path_trans.icon.path
                    )

                # Title will be path title
                title = u"{}_{}".format("title", language_id)
                questions_dict[title] = unicode(path_trans.title)

                # Description will be path description
                description = u"{}_{}".format("description", language_id)
                questions_dict[description] = unicode(
                    path_trans.description
                )

                # adding breadcrumb details
                breadcrumb = u"{}_{}".format("breadcrumb", language_id)
                questions_dict[breadcrumb] = u"{} > {}".format(
                    "Home", path_trans.title
                )

            options = [option for option in qstn.options
                       if not option.is_deleted and option.is_enabled]
            for opt in options:
                for trans in opt.translations:
                    option_text = u"{}_{}".format(
                        "option_text", trans.language_id
                    )
                    questions_dict[option_text].append(unicode(trans.text))

            attributes_to_retrieve.update([thumbnail, breadcrumb, title])
            question_json = json.loads(json.dumps(questions_dict))
            algolia_index.add_object(question_json)

            update_algolia_settings(
                questions_dict,
                list(attributes_to_retrieve),
                algolia_index
            )
    except Exception, e:
        print "Uploading pathfinder data- FAILED", e


def upload_faq_to_search(faq_group):
    """Upload faq contents to algolia search."""
    try:
        algolia_index = init_algolia(faq_group.tenant.domain)
        attributes_to_retrieve = {"category", "url"}
        url = url_for("main.faq", slug=faq_group.slug)
        faq_dict = defaultdict(list)

        faq_sections = [_section for _section in faq_group.faq_sections
                        if not _section.is_deleted and _section.is_enabled]
        for section in faq_sections:
            questions = [_q for _q in section.questions
                         if not _q.is_deleted and _q.is_enabled]
            for ques in questions:
                object_id = uuid_from_id(ques.id, 'faq')
                faq_dict.update({
                    "objectID": object_id,
                    "url": url,
                    "is_enabled": True,
                    "category": "faq"
                })

                for trans in ques.translations:
                    language_id = trans.language_id

                    # adding question details
                    question = u"{}_{}".format("question", language_id)
                    faq_dict[question] = unicode(trans.question)

                    # adding answer details
                    answer = u"{}_{}".format("answer", language_id)
                    content = BeautifulSoup(trans.answer, 'lxml')
                    content = unicode(content.get_text())
                    faq_dict[answer] = unicode(answer)

                    g_trans = get_translation(
                        ques.group,
                        locale=trans.language_id
                    )

                    # adding thumbnail
                    thumbnail = u"{}_{}".format("image_url", language_id)
                    if g_trans.icon_id:
                        faq_dict[thumbnail] = static_url(
                            filename="media/" + g_trans.icon.path
                        )

                    # Title will be faq group title
                    title = u"{}_{}".format("title", language_id)
                    faq_dict[title] = unicode(g_trans.name)

                    # Description will be faq group description
                    description = u"{}_{}".format(
                        "description",
                        language_id
                    )
                    faq_dict[description] = unicode(g_trans.description)

                    # adding breadcrumb details
                    breadcrumb = u"{}_{}".format("breadcrumb", language_id)
                    faq_dict[breadcrumb] = u"{} > {}".format(
                        "Home",
                        g_trans.name
                    )

                attributes_to_retrieve.update([thumbnail, breadcrumb, title])
                question_json = json.loads(json.dumps(faq_dict))
                algolia_index.add_object(question_json)

                update_algolia_settings(
                    faq_dict,
                    list(attributes_to_retrieve),
                    algolia_index
                )

    except Exception, e:
        print "Uploading faq data- FAILED", e


def upload_checklist_to_search(checklist):
    """Upload checklist data to Algolia Search."""
    try:
        algolia_index = init_algolia(checklist.tenant.domain)
        attributes_to_retrieve = {"category", "url"}
        url = url_for(
            "main.check_list",
            slug=checklist.slug
        )
        checklist_dict = defaultdict(list)

        action = "deleteObject"
        for sec in checklist.checklist_sections:
            attributes_list = list()
            for item in sec.checklist_items:
                object_id = uuid_from_id(item.id, "checklist")
                if item.is_deleted:
                    attributes_list.append({
                        "objectID": object_id,
                    })
                    continue

                checklist_dict.update({
                    "objectID": object_id,
                    "url": url,
                    "is_enabled": item.is_enabled,
                    "category": "checklist"
                })

                for trans in item.translations:
                    language_id = trans.language_id

                    # adding checklist item's title
                    title = u"{}_{}".format("title", language_id)
                    checklist_dict[title] = unicode(trans.title)

                    # adding checklist item's description
                    description = u"{}_{}".format(
                        "description",
                        language_id
                    )
                    checklist_dict[description] = unicode(trans.description)

                    s_trans = get_translation(
                        item.checklist_section,
                        locale=trans.language_id
                    )
                    g_trans = get_translation(
                        item.checklist_section.checklist,
                        locale=trans.language_id
                    )

                    # Title will be checklist group title
                    key = u"{}_{}".format(
                        "checklist_group_title",
                        language_id
                    )
                    checklist_dict[key] = unicode(g_trans.title)

                    # Description will be checklist group description
                    key = u"{}_{}".format(
                        "checklist_group_description",
                        language_id
                    )
                    checklist_dict[key] = unicode(g_trans.description)

                    thumbnail = u"{}_{}".format("image_url", language_id)
                    if g_trans.icon_id:
                        checklist_dict[thumbnail] = static_url(
                            filename="media/" + g_trans.icon.path
                        )

                    key = u"{}_{}".format("section_title", language_id)
                    checklist_dict[key] = unicode(s_trans.title)

                    # adding breadcrumb
                    breadcrumb = u"{}_{}".format("breadcrumb", language_id)
                    checklist_dict[breadcrumb] = u"{} > {}".format(
                        "Home",
                        g_trans.title
                    )

                attributes_to_retrieve.update([thumbnail, title, breadcrumb])
                checklist_json = json.loads(json.dumps(checklist_dict))
                algolia_index.add_object(checklist_json)

                update_algolia_settings(
                    checklist_dict,
                    list(attributes_to_retrieve),
                    algolia_index
                )
            algolia_batch_update(
                action, attributes_list, checklist.tenant.domain
            )

    except Exception, e:
        print "Uploading checklist data- FAILED", e


def upload_samples_to_search(tenant_domain):
    """Upload the samples to algolia.

    Params:
    tenant_domain - Domain column of Tenant model

    searchable attributes: Title,author name, description, tags
    Non-searchable attributes: category,objectId,sample_id,url

    """
    try:
        sample = SampleExchange.query.join(Tenant).filter(
            Tenant.domain == tenant_domain
        ).first_or_404()

        algolia_index = init_algolia(tenant_domain)
        attributes_to_retrieve = {"category", "url"}
        platform = sample.platform
        headers = {
            "x-vmware-code-client": "{},{}".format(
                tenant_domain,
                "sample-exchange"
            )
        }

        sampleexchange_dict = defaultdict(list)
        for tag in sample.tags:
            data = {
                "modified": False,
                "req_tag": tag
            }
            if platform:
                data.update({"req_platform": platform})
            sample_data = requests.get(
                "https://apigw.vmware.com/sampleExchange/v1/"
                "search/samples", params=data, headers=headers
            )
            if sample_data.status_code == 200:
                for sample in sample_data.json():
                    object_id = uuid_from_id(
                        sample.get('id'),
                        'sampleexchange'
                    )
                    url = url_for(
                        "main.sample_exchange",
                        id=sample.get('id')
                    )
                    author = sample.get("author", {})

                    sampleexchange_dict.update({
                        "category": "sample_exchange",
                        "objectID": object_id,
                        "is_enabled": True,
                        "url": url,
                        "sample_id": sample.get("id"),
                        "title_en_US": sample.get("name"),
                        "author_name": author.get("fullName", ""),
                        "description_en_US": sample.get("readmeHtml"),
                        "tags": sample.get("tags"),
                        "downloadUrl": sample.get("downloadUrl")
                    })

                    attributes_to_retrieve.update([
                        "sample_id",
                        "author_name",
                        "title_en_US",
                        "tags",
                        "downloadUrl"
                    ])
                    samples_json = json.loads(json.dumps(sampleexchange_dict))
                    algolia_index.add_object(samples_json)
                    update_algolia_settings(
                        sampleexchange_dict,
                        list(attributes_to_retrieve),
                        algolia_index
                    )
    except Exception, e:
        print "Uploading samples failed", e


def update_algolia_settings(searchable_attributes,
                            attributes_to_retrieve,
                            algolia_index):
    """Get the pre-set attributes from algolia."""
    algolia_settings = algolia_index.get_settings()

    searchable_attributes_from_settings = algolia_settings.get(
        'searchableAttributes', []) or []
    attributes_to_retrieve_from_settings = algolia_settings.get(
        'attributesToRetrieve', []) or []

    # Configuring algolia to search-index only on specified fields.
    searchable_attributes = [key for key in searchable_attributes
                             if key not in WHITELIST_ATTRIBUTES and
                             'image_url' not in key]
    searchable_attributes = list(
        set().union(searchable_attributes,
                    searchable_attributes_from_settings))

    attributes_to_retrieve = list(
        set().union(attributes_to_retrieve,
                    attributes_to_retrieve_from_settings))

    algolia_index.set_settings({
        "searchableAttributes": sorted(searchable_attributes, reverse=True),
        "attributesToRetrieve": sorted(attributes_to_retrieve, reverse=True)
    })


def get_walkthrough_attributes(walkthrough):
    """Walkthrough attributes."""
    object_id = uuid_from_id(walkthrough.id, 'walkthrough')
    section = walkthrough.playlist.section
    product = section.get_category()
    tenant = walkthrough.tenant

    url = get_chapter_url(product, section, walkthrough, tenant)
    attributes = {
        'objectID': object_id,
        'url': url,
        'product': product.get_name()
    }
    for translation in section.translations:
        attributes['section_title_' + translation.language_id] = unicode(
            translation.title)
        attributes['section_description_' + translation.language_id] = unicode(
            translation.description)

    for translation in walkthrough.translations:
        language_id = translation.language_id
        product_translation = get_translation(
            product, locale=language_id)
        section_translation = get_translation(
            section, locale=language_id)
        chapter_translation = get_translation(
            walkthrough, locale=language_id)
        key = 'breadcrumb_' + translation.language_id
        attributes[key] = string.join(
            [unicode(product_translation.title),
             unicode(section_translation.title),
             unicode(chapter_translation.title)],
            ' > '
        )
        """
            If the slug of product and section are same,
            then its only a product->playlist, no section.
        """
        if product.id == section.id:
            attributes[key] = string.join(
                [unicode(product_translation.title),
                 unicode(chapter_translation.title)],
                '>'
            )
    return attributes


def algolia_batch_update(action, attributes, tenant_domain):
    """Batch update to algolia."""
    client = get_alogolia_client(tenant_domain)
    index_name = get_tenant_uuid(tenant_domain)
    all_demos = [{
                 'action': action,
                 'indexName': index_name,
                 'body': attribute
                 } for attribute in attributes]
    client.batch(all_demos)


def get_chapter_url(product, section, chapter, tenant):
    """Return url for a given chapter based on template."""
    if tenant.template.lower() in current_app.config['SPA_TEMPLATES']:
        url = product.slug
        if product.id != section.id:
            url += '/' + section.slug

        url += '/' + chapter.slug

        url = unquote(
            url_for(
                'main.home',
                _anchor='!/' + url
            )
        )
    else:
        if tenant.template.lower() in (u'dell', u'avaya'):
            url = url_for(
                'main.launchpad',
                section=section.slug,
                chapter=chapter.slug
            )
        else:
            url = url_for(
                'main.route_handler',
                section=section.slug,
                chapter=chapter.slug
            )

    return url
