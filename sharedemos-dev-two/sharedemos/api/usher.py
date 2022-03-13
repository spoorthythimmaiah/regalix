from flask import current_app, url_for, request
from flask.ext.restful import Resource
from sqlalchemy import func, desc

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import get_default_translation
from sharedemos.models import (
    Tag,
    Section,
    SectionTranslations,
    Walkthrough,
    WalkthroughTranslations,
    Playlist
)


def build_url(chapter, product, section=None):
    embed_url = url_for(
        'main.embed_playlist',
        product_id=product.slug,
        demo_id=chapter.slug,
        _external=True
    )
    if section:
        embed_url = url_for(
            'main.embed_playlist',
            product_id=product.slug,
            section_id=section.slug,
            demo_id=chapter.slug,
            _external=True
        )

    embed_code = "<iframe width='100%' height='600' " +\
        "src='" + embed_url + "' frameborder='0' " +\
        "allowfullscreen style='border:1px solid #e7ecf2;'>" +\
        "</iframe>"

    return unicode(embed_code)


def get_chapter_for_tags(tag_list, section_id):
    tenant_id = getattr(current_app, 'tenant_id', None)
    chapters = Walkthrough.query.join(
        WalkthroughTranslations
    ).join(
        Tag, Tag.id == func.any(WalkthroughTranslations.tag_ids)
    ).join(
        Walkthrough.playlist
    ).filter(
        Walkthrough.tenant_id == tenant_id,
        Walkthrough.is_deleted.__eq__(False),
        Walkthrough.is_enabled.__eq__(True),
        func.trim(Tag.name).in_(tag_list),
        Playlist.section_id == section_id,
        Playlist.is_deleted.__eq__(False),
        Playlist.is_enabled.__eq__(True)
    ).group_by(
        Walkthrough
    ).having(
        func.count(func.distinct(Tag.name)) > 0
    ).order_by(
        desc(func.count(func.distinct(Tag.name)))
    ).all()

    return chapters


def get_chapter_matching_tag(chapters_list, tag_name):
    """
    Return a chapter from the list matching the tag ids and tag_name.

    params:
        chapters_list- list of chapters to query from.
        tag_name- unicode value of tag name.
    """
    for chapter in chapters_list:
        ch_trans = get_default_translation(chapter)
        if not ch_trans.tag_ids:
            continue
        tag_count = Tag.query.filter(Tag.id.in_(ch_trans.tag_ids), func.trim(Tag.name) == tag_name).count()
        if tag_count:
            return chapter


def get_generic_demo():
    tenant_id = getattr(current_app, 'tenant_id', None)
    chapter = Walkthrough.query.join(
        WalkthroughTranslations
    ).join(
        Tag, Tag.id == func.any(WalkthroughTranslations.tag_ids)
    ).filter(
        Walkthrough.tenant_id == tenant_id,
        Walkthrough.is_deleted.__eq__(False),
        Walkthrough.is_enabled.__eq__(True),
        func.trim(Tag.name) == u'generic'
    ).first()

    if not chapter:
        return ""

    if not chapter.playlist.section.parent:
        embed_code = build_url(chapter, chapter.playlist.section)
    else:
        product = chapter.playlist.section.get_category()
        embed_code = build_url(chapter, product, chapter.playlist.section)

    return embed_code


class UsherApi(Resource):

    def post(self):

        if not request.json:
            raise SharedemosException(404)

        treatment = unicode(request.json.get('treatment', '').strip())
        codetype = unicode(request.json.get('codetype', '').strip())
        framework = unicode(request.json.get('framework', '').strip())
        generic_demo = get_generic_demo()
        demo_found = False

        response = {
            'count': 1,
            'generic': generic_demo,
            'status': False
        }

        if not treatment or not codetype or not framework:
            return response, 200

        tenant_id = getattr(current_app, 'tenant_id', None)

        fw_tags_list = [tag.strip() for tag in framework.split(',')]

        tags = Tag.query.filter(
            Tag.tenant_id == tenant_id,
            func.trim(Tag.name).in_(fw_tags_list + [treatment, codetype])
        ).all()

        if not tags:
            return response, 200

        product = Section.query.join(SectionTranslations).join(
            Tag, Tag.id == func.any(SectionTranslations.tag_ids)
        ).filter(Section.tenant_id == tenant_id,
                 Section.parent_id.is_(None),
                 Section.is_deleted.__eq__(False),
                 Section.is_enabled.__eq__(True),
                 func.trim(Tag.name) == treatment).first()
        if not product:
            return response, 200

        section = Section.query.join(SectionTranslations).join(
            Tag, Tag.id == func.any(SectionTranslations.tag_ids)
        ).filter(Section.tenant_id == tenant_id,
                 Section.parent_id.isnot(None),
                 Section.is_deleted.__eq__(False),
                 Section.is_enabled.__eq__(True),
                 func.trim(Tag.name) == codetype).first()
        if not section:
            return response, 200

        response['steps'] = dict()

        tag_list = fw_tags_list[:]
        tag_list = list(set(tag_list))
        chapters = get_chapter_for_tags(tag_list, section.id)
        if codetype not in tag_list:
            tag_list.append(codetype)
        chapters_with_codetype = get_chapter_for_tags(tag_list, section.id)

        step_tags = [u'create', u'customize', u'implement', u'test']
        for step in step_tags:
            embed_code = ''
            chapter = get_chapter_matching_tag(chapters, step)

            if not chapter:
                """
                    If chapter not found for the step,
                    check chapter tagged with codetype
                """
                chapter = get_chapter_matching_tag(chapters_with_codetype, step)

                if not chapter:
                    if step not in response['steps']:
                        response['steps'][step] = generic_demo
                    continue

            if chapter.playlist.section.id == product.id:
                embed_code = build_url(chapter, chapter.playlist.section)
            else:
                treatment_product = chapter.playlist.section.get_category()
                if chapter.playlist.section.id == section.id and\
                        treatment_product.id == product.id:
                    embed_code = build_url(chapter, product,
                                           chapter.playlist.section)

            if embed_code:
                demo_found = True
                response['steps'][step] = embed_code

        """
            If any of real demo matches search,
            update count, status and delete generic demo
        """
        if demo_found:
            response['count'] = len(step_tags)
            response['status'] = True
            del response['generic']
        else:
            del response['steps']

        return response, 200
