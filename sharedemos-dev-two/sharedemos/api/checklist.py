import re
import werkzeug

from flask import current_app, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse
from sqlalchemy import desc, event
from sqlalchemy.orm import joinedload
from sharedemos.models import (
    db,
    Checklist,
    ChecklistDraft,
    ChecklistTranslation,
    ChecklistDraftTranslation,
    ChecklistSection,
    ChecklistDraftSection,
    ChecklistSectionTranslation,
    ChecklistDraftSectionTranslation,
    ChecklistItem,
    ChecklistDraftItem,
    ChecklistItemTranslation,
    ChecklistDraftItemTranslation,
    ChecklistSuggestion,
    ChecklistDraftSuggestion,
    CheckListItemActivity,
    IconLibrary,
    Tenant,
    Walkthrough,
    create_checklist_slug,
    update_checklist_slug
)
from sharedemos.api.custom_fields import MediaURL
from sharedemos.libs.api import is_author, format_data
from sharedemos.libs.helpers import (
    create_file,
    check_parent_restriction,
    get_translation,
    get_default_translation,
    get_locale_translation
)
from sharedemos.libs.url import static_url
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.model import model_slugify, update_model_slug_revision


checklist_suggestion_fields = {
    'suggestion_id': fields.Integer,
    'suggestion_type': fields.String,
    'title': fields.String,
    'thumbnail': fields.String,
    'link': fields.String,
}

checklist_item_fields = {
    'checklist_item_id': fields.Integer(attribute='id'),
    'title': fields.String,
    'description': fields.String,
    'suggestions': fields.Nested(
        checklist_suggestion_fields,
        attribute='_suggestions',
        allow_null=True
    )
}

checklist_section_fields = {
    'checklist_section_id': fields.Integer(attribute='id'),
    'title': fields.String,
    'checklist_items': fields.Nested(checklist_item_fields,
                                     attribute='_items',
                                     allow_null=True)
}

checklist_fields = {
    'checklist_id': fields.Integer(attribute='id'),
    'title': fields.String,
    'description': fields.String,
    'is_enabled': fields.Boolean,
    'is_featured': fields.Boolean,
    'is_published': fields.Boolean,
    'icon': fields.Nested({
        "url": MediaURL(fields.String, attribute="path"),
        "name": fields.String
    }, allow_null=True),
    'slug': fields.String,
    'items_count': fields.Integer(attribute='items_count'),
    'views_count': fields.Integer(attribute='views_count'),
    'checklist_sections': fields.Nested(checklist_section_fields,
                                        attribute='_sections',
                                        allow_null=True)
}

all_checklists_fields = {
    'featured_checklists': fields.Nested(checklist_fields,
                                         attribute='featured_checklists',
                                         allow_null=True),
    'trending_checklists': fields.Nested(checklist_fields,
                                         attribute='trending_checklists',
                                         allow_null=True),
    'recent_checklists': fields.Nested(checklist_fields,
                                       attribute='recent_checklists',
                                       allow_null=True),
}


def get_recent_checklists():
    tenant_id = getattr(current_app, 'tenant_id')
    checklists = Checklist.query.filter(
        Checklist.tenant_id == tenant_id
    ).order_by(desc(Checklist.modified_at)).all()

    return checklists


def get_suggestions(checklist_item):
    final_suggestions = list()
    for ch_it_suggestion in checklist_item.checklist_suggestions:
        if not ch_it_suggestion.is_deleted:
            suggestion = dict()
            suggestion['suggestion_id'] = ch_it_suggestion.id
            suggestion['order'] = ch_it_suggestion.order
            chapter = ch_it_suggestion.walkthrough
            if chapter:
                if not is_author():
                    if not check_parent_restriction(chapter.playlist.section)\
                            or not chapter.playlist.is_enabled or\
                            not chapter.is_enabled or\
                            chapter.is_deleted or chapter.playlist.is_deleted:
                        continue
                translation = get_translation(chapter)
                suggestion['title'] = translation.title

                product = chapter.playlist.section.get_category()

                chapter.product_id = product.slug
                url = request.host_url + '#!/' + chapter.product_id
                if chapter.product_id != chapter.playlist.section.slug:
                    url += '/' + chapter.playlist.section.slug
                url += '/' + chapter.slug
                suggestion['link'] = url

                suggestion['suggestion_type'] = 'walkthrough'
                suggestion['thumbnail'] = chapter.get_thumbnail()\
                    or static_url(
                    filename='images/default_chapter_icon.jpg'
                )

            else:
                suggestion['suggestion_type'] = 'external_link'
                suggestion['title'] = ch_it_suggestion.external_link.get(
                    'title')
                suggestion['thumbnail'] = static_url(
                    filename='images/default_link_icon.png'
                )
                if ch_it_suggestion.external_link.get('icon_name'):
                    icon = static_url(
                        filename='media/external_icons/' +
                        ch_it_suggestion.external_link['icon_name'],
                    )
                    suggestion['thumbnail'] = icon
                suggestion['link'] = ch_it_suggestion.external_link.get('url')
            final_suggestions.append(suggestion)
    final_suggestions.sort(key=lambda x: x['order'])
    return final_suggestions


def get_trending_checklists(checklists):
    trending_checklists = list()
    for checklist in checklists:
        checklist = get_checklist_details(checklist)
        if checklist.views_count > 0:
            trending_checklists.append(checklist)
    trending_checklists.sort(key=lambda x: x.views_count, reverse=True)
    return trending_checklists


def get_checklist_details(checklist):
    translation = get_translation(checklist)
    checklist.title = translation.title
    checklist.description = translation.description
    checklist.icon = translation.icon
    items_count = 0
    checklist_sections = [ch for ch in checklist.checklist_sections
                          if ch.is_enabled and not ch.is_deleted]
    for checklist_section in checklist_sections:
        checklist_items = [ch for ch in checklist_section.checklist_items
                           if ch.is_enabled and not ch.is_deleted]
        items_count += len(checklist_items)
    checklist.items_count = items_count

    checklist_activities = CheckListItemActivity.query.filter(
        (CheckListItemActivity.checklist_id == checklist.id)
    ).with_entities(
        CheckListItemActivity.session_id,
        CheckListItemActivity.checklist_id
    ).group_by(
        CheckListItemActivity.session_id,
        CheckListItemActivity.checklist_id
    ).count()

    checklist.views_count = checklist_activities
    return checklist


def publish_checklist(checklist_draft):
    """Publish checklist."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    checklist_draft_published = checklist_draft.published
    if checklist_draft_published:
        checklist = checklist_draft_published
        checklist.is_deleted = checklist_draft.is_deleted
    else:
        checklist = Checklist()
        checklist.created_by = session.get('user_id')

    checklist_draft.is_enabled = True
    checklist.draft = checklist_draft
    checklist.order = checklist_draft.order
    checklist.tenant_id = checklist_draft.tenant_id
    checklist.modified_by = session.get('user_id')
    checklist.is_enabled = True
    checklist.is_featured = checklist_draft.is_featured

    checklist_draft.is_published = True

    pub_trans = [tr.language_id for tr in checklist.translations]
    for translation in checklist_draft.translations:
        if translation.language_id not in pub_trans:
            checklist_translation = ChecklistTranslation()
            checklist_translation.language_id = translation.language_id
            checklist_translation.checklist = checklist
        else:
            checklist_translation = get_locale_translation(
                checklist, translation.language_id)

        checklist_translation.title = translation.title
        checklist_translation.description = translation.description
        checklist_translation.icon = translation.icon

        db.session.add(checklist_translation)

    model_id = getattr(checklist, 'id', None)
    new_slug = model_slugify(input_text=checklist_draft.slug,
                             rec_id=model_id,
                             tenant_id=tenant_id,
                             primary_model=Checklist,
                             secondary_model=ChecklistDraft,
                             slugfield="slug",
                             draft_id=checklist_draft.id)

    if checklist.slug and checklist.slug != new_slug:
        update_model_slug_revision(new_slug=new_slug,
                                   tenant_id=tenant_id,
                                   model=checklist)

    checklist.slug = new_slug

    db.session.add_all([checklist, checklist_draft])

    checklist_draft_sections = checklist_draft.checklist_sections

    checklist_draft_published = checklist_draft.published
    if checklist_draft_published:
        _checklist = checklist_draft_published
    else:
        _checklist = checklist

    for checklist_draft_section in checklist_draft_sections:
        if checklist_draft_section.is_published:
            continue

        checklist_draft_section_published = checklist_draft_section.published
        if checklist_draft_section_published:
            checklist_section = checklist_draft_section_published
        else:
            checklist_section = ChecklistSection()
            checklist_section.created_by = session.get('user_id')

        checklist_section.checklist_id = _checklist.id
        checklist_section.draft = checklist_draft_section
        checklist_section.tenant_id = checklist_draft_section.tenant_id
        checklist_section.created_by = session.get('user_id')
        checklist_section.modified_by = session.get('user_id')
        checklist_section.order = checklist_draft_section.order
        checklist_section.is_enabled = checklist_draft_section.is_enabled
        checklist_section.is_deleted = checklist_draft_section.is_deleted
        checklist_draft_section.is_published = True
        db.session.add(checklist_section)

        pub_trans = [tr.language_id for tr in checklist_section.translations]
        for translation in checklist_draft_section.translations:
            if translation.language_id not in pub_trans:
                ch_sec_trans = ChecklistSectionTranslation()
                ch_sec_trans.language_id = translation.language_id
                ch_sec_trans.checklist_section = checklist_section
            else:
                ch_sec_trans = get_locale_translation(checklist_section,
                                                      translation.language_id)

            ch_sec_trans.title = translation.title
            db.session.add(ch_sec_trans)

        db.session.add(checklist_draft_section)

        if checklist_draft_section_published:
            _checklist_section = checklist_draft_section_published
        else:
            _checklist_section = checklist_section

        checklist_draft_items = checklist_draft_section.checklist_items

        for ch_dr_item in checklist_draft_items:
            ch_dr_item_published = ch_dr_item.published
            if ch_dr_item_published:
                checklist_item = ch_dr_item_published
                checklist_item.created_by = session.get('user_id')
            else:
                checklist_item = ChecklistItem()
                checklist_item.created_by = session.get('user_id')

            checklist_item.checklist_section_id = _checklist_section.id
            checklist_item.checklist_id = _checklist.id
            checklist_item.draft = ch_dr_item
            checklist_item.tenant_id = ch_dr_item.tenant_id
            checklist_item.modified_by = session.get('user_id')
            checklist_item.order = ch_dr_item.order
            checklist_item.is_enabled = ch_dr_item.is_enabled
            checklist_item.is_deleted = ch_dr_item.is_deleted
            ch_dr_item.is_published = True
            db.session.add(checklist_item)

            pub_trans = [tr.language_id for tr in checklist_item.translations]
            for translation in ch_dr_item.translations:
                if translation.language_id not in pub_trans:
                    ch_it_trans = ChecklistItemTranslation()
                    ch_it_trans.language_id = translation.language_id
                    ch_it_trans.checklist_item = checklist_item
                    ch_it_trans.language_id = translation.language_id
                else:
                    ch_it_trans = get_locale_translation(
                        checklist_item, translation.language_id)

                ch_it_trans.title = translation.title
                ch_it_trans.description = translation.description
                db.session.add(ch_it_trans)

            db.session.add(ch_dr_item)

            if ch_dr_item_published:
                _checklist_item = ch_dr_item_published
            else:
                _checklist_item = checklist_item

            checklist_draft_suggestions = ch_dr_item.checklist_suggestions

            for ch_dr_suggestion in checklist_draft_suggestions:
                ch_dr_suggestion_published = ch_dr_suggestion.published
                if ch_dr_suggestion_published:
                    ch_suggestion = ch_dr_suggestion_published
                    ch_suggestion.created_by = session.get('user_id')
                else:
                    ch_suggestion = ChecklistSuggestion()
                    ch_suggestion.created_by = session.get('user_id')

                ch_suggestion.checklist_item_id = _checklist_item.id
                ch_suggestion.draft = ch_dr_suggestion
                ch_suggestion.tenant_id = ch_dr_suggestion.tenant_id
                ch_suggestion.modified_by = session.get('user_id')
                ch_suggestion.order = ch_dr_suggestion.order
                ch_suggestion.walkthrough_id = ch_dr_suggestion.walkthrough_id
                ch_suggestion.external_link = ch_dr_suggestion.external_link
                ch_suggestion.is_deleted = ch_dr_suggestion.is_deleted
                ch_dr_suggestion.is_published = True

                db.session.add_all([ch_suggestion, ch_dr_suggestion])

    db.session.commit()

    from sharedemos.tasks import upload_to_algolia
    upload_to_algolia.delay({
        'category': u'checklist',
        'checklist_id': checklist.id,
        'tenant_id': tenant_id
    })

    return True


checklist_parser = reqparse.RequestParser()
checklist_parser.add_argument('title', type=unicode, required=True,
                              location=['form', 'json'], default="",
                              help='Title Required')
checklist_parser.add_argument('description', type=unicode,
                              location=['form', 'json'])
checklist_parser.add_argument('is_featured', type=bool, default=False,
                              location=['form', 'json'])
checklist_parser.add_argument('remove_icon', type=bool,
                              location=['form', 'json'], default=False)
checklist_parser.add_argument('icon', type=werkzeug.datastructures.FileStorage,
                              location='files')


class ChecklistApi(Resource):

    method_decorators = [app_subscription_required('CHECKLIST')]

    def get(self, slug=None, session_id=None):
        tenant_id = getattr(current_app, 'tenant_id', None)

        if slug:

            if is_author():
                checklist_query_table = ChecklistDraft
                checklist_section_query_table = ChecklistDraftSection
                checklist_item_query_table = ChecklistDraftItem
            else:
                checklist_query_table = Checklist
                checklist_section_query_table = ChecklistSection
                checklist_item_query_table = ChecklistItem

            checklist = checklist_query_table.query.filter(
                (checklist_query_table.tenant_id == tenant_id) &
                (checklist_query_table.slug == unicode(slug)) &
                (checklist_query_table.is_deleted.__eq__(False))
            )

            checklist = checklist.options(
                joinedload(checklist_query_table.translations),
                joinedload(checklist_query_table.checklist_sections),
                joinedload(checklist_query_table.checklist_sections)
                .joinedload(checklist_section_query_table.translations),
                joinedload(checklist_query_table.checklist_sections)
                .joinedload(checklist_section_query_table.checklist_items),
                joinedload(checklist_query_table.checklist_sections)
                .joinedload(checklist_section_query_table.checklist_items).
                joinedload(checklist_item_query_table.translations),
                joinedload(checklist_query_table.checklist_sections).
                joinedload(checklist_section_query_table.checklist_items).
                joinedload(checklist_item_query_table.checklist_suggestions),
            ).first_or_404()

            checklist_sections = [ch for ch in checklist.checklist_sections
                                  if ch.is_enabled and not ch.is_deleted]
            for checklist_section in checklist_sections:
                translation = get_translation(checklist_section)
                checklist_section.title = translation.title
                checklist_items = [
                    ch for ch in checklist_section.checklist_items
                    if ch.is_enabled and not ch.is_deleted]
                for checklist_item in checklist_items:
                    translation = get_translation(checklist_item)
                    checklist_item.title = translation.title
                    checklist_item.description = translation.description
                    checklist_item._suggestions = get_suggestions(
                        checklist_item)
                checklist_section._items = checklist_items
            checklist._sections = checklist_sections

            checklist = get_checklist_details(checklist)

            return format_data(marshal(checklist, checklist_fields)), 200

        if is_author():
            checklist_query_table = ChecklistDraft
            checklist_section_query_table = ChecklistDraftSection
        else:
            checklist_query_table = Checklist
            checklist_section_query_table = ChecklistSection

        checklists = checklist_query_table.query.filter(
            (checklist_query_table.tenant_id == tenant_id) &
            (checklist_query_table.is_deleted.__eq__(False))
        )

        if not is_author():
            checklists = checklists.filter(
                checklist_query_table.is_enabled.__eq__(True)
            )

        checklists = checklists.options(
            joinedload(checklist_query_table.checklist_sections)
            .joinedload(checklist_section_query_table.checklist_items),
            joinedload(checklist_query_table.checklist_sections),
            joinedload(checklist_query_table.translations),
        ).order_by(checklist_query_table.id).all()

        for checklist in checklists:
            checklist = get_checklist_details(checklist)

        trending_checklists = list(checklists)

        all_checklists = dict()
        all_checklists['featured_checklists'] = checklists
        all_checklists['trending_checklists'] = get_trending_checklists(
            trending_checklists)
        all_checklists['recent_checklists'] = get_recent_checklists()

        return format_data(marshal(all_checklists, all_checklists_fields)), 200

    @has_author_access
    def post(self):
        post_data = checklist_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale.id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        nth_child = ChecklistDraft.query.filter_by(
            tenant_id=tenant_id,
            is_deleted=False
        ).order_by(ChecklistDraft.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        checklist_draft = ChecklistDraft()
        checklist_draft.tenant_id = tenant_id
        checklist_draft.order = order
        checklist_draft.created_by = session.get('user_id')
        checklist_draft.modified_by = session.get('user_id')
        checklist_draft.is_featured = post_data.get('is_featured')

        translation = ChecklistDraftTranslation()
        translation.language_id = session['author']['locale']
        translation.title = post_data.get('title')
        translation.description = post_data.get('description')
        checklist_draft.translations.append(translation)

        if post_data.get('icon'):
            icon_hex_name = create_file(post_data['icon'])
            icon = IconLibrary()
            icon.name = unicode(post_data['title'])
            icon.path = icon_hex_name
            icon.tenant_id = tenant_id
            translation.icon = icon
            db.session.add(icon)

        db.session.add(checklist_draft)
        db.session.commit()

        checklist = get_checklist_details(checklist_draft)

        return format_data(marshal(checklist, checklist_fields)), 200

    @has_author_access
    def put(self, slug):

        put_data = checklist_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_title = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('title'))
        if invalid_title:
            raise SharedemosException(
                412,
                message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        checklist_draft = ChecklistDraft.query.filter(
            (ChecklistDraft.tenant_id == tenant_id) &
            (ChecklistDraft.slug == slug) &
            (ChecklistDraft.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(checklist_draft, author=True)
        if not trans:
            trans = ChecklistDraftTranslation()
            trans.checklist_draft_id = checklist_draft.id
            trans.language_id = session['author']['locale']
            default_translation = get_default_translation(checklist_draft)
            if default_translation.icon:
                trans.icon = default_translation.icon

        # Draft Checklist translation
        trans.title = put_data['title']
        trans.description = put_data['description']
        trans.checklist_draft = checklist_draft
        if put_data.get('icon'):
            icon_hex_name = create_file(put_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(put_data['title'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            trans.icon = icon_lib
            db.session.add(icon_lib)
            for translation in checklist_draft.translations:
                translation.icon = icon_lib
                db.session.add(translation)
        elif put_data['remove_icon']:
            trans.icon = None
            for translation in checklist_draft.translations:
                translation.icon = None

        checklist_draft.modified_by = session.get('user_id')
        checklist_draft.is_featured = put_data.get('is_featured')

        checklist_draft.is_published = False

        db.session.add(trans)
        db.session.add(checklist_draft)
        db.session.commit()

        checklist = get_checklist_details(checklist_draft)

        return format_data(marshal(checklist, checklist_fields)), 200

    @has_author_access
    def patch(self, slug):

        tenant_id = getattr(current_app, 'tenant_id', None)
        checklist_draft = ChecklistDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).options(
            joinedload(ChecklistDraft.translations),
            joinedload(ChecklistDraft.checklist_sections),
            joinedload(ChecklistDraft.checklist_sections)
            .joinedload(ChecklistDraftSection.translations),
            joinedload(ChecklistDraft.checklist_sections)
            .joinedload(ChecklistDraftSection.checklist_items),
            joinedload(ChecklistDraft.checklist_sections)
            .joinedload(ChecklistDraftSection.checklist_items).
            joinedload(ChecklistDraftItem.translations),
            joinedload(ChecklistDraft.checklist_sections).
            joinedload(ChecklistDraftSection.checklist_items).
            joinedload(ChecklistDraftItem.checklist_suggestions),
        ).first()

        if 'is_enabled' in request.json:
            is_enabled = request.json.get('is_enabled')
            checklist_draft_published = checklist_draft.published
            if checklist_draft_published:
                checklist_draft_published.is_enabled = is_enabled
                db.session.add(checklist_draft_published)
            checklist_draft.is_enabled = is_enabled
            db.session.add(checklist_draft)
            db.session.commit()
            from sharedemos.tasks import update_algolia_content
            update_algolia_content.delay({
                'entity': 'checklist',
                'checklist_id': checklist_draft_published.id,
                'tenant_id': tenant_id,
                'is_enabled': is_enabled
            })

            return {'status': 'UPDATED'}, 201

        if request.json.get('publish'):
            try:
                event.remove(ChecklistTranslation, 'after_insert',
                             create_checklist_slug)
                event.remove(ChecklistTranslation, 'after_update',
                             update_checklist_slug)
                publish_checklist(checklist_draft)

            except Exception:
                raise SharedemosException(500, message='PUBLISH_ERROR')

            finally:
                event.listen(ChecklistTranslation, 'after_insert',
                             create_checklist_slug)
                event.listen(ChecklistTranslation, 'after_update',
                             update_checklist_slug)

            return {'status': 'PUBLISHED'}, 201

    @has_author_access
    def delete(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)

        checklist_draft = ChecklistDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first_or_404()

        checklist_draft.is_deleted = True
        checklist_draft.modified_by = session.get('user_id')
        checklist_draft.is_published = False

        checklist_draft_published = checklist_draft.published
        if checklist_draft_published:
            checklist_draft_published.is_deleted = True
            db.session.add(checklist_draft_published)
        db.session.add(checklist_draft)
        db.session.commit()
        if checklist_draft_published and checklist_draft_published.id:
            from sharedemos.tasks import delete_checklist_from_algolia
            delete_checklist_from_algolia.delay({
                'checklist_id': checklist_draft_published.id,
            })
        return {'status': 'DELETED'}, 200


checklist_section_parser = reqparse.RequestParser()
checklist_section_parser.add_argument(
    'title', type=unicode, required=True,
    location=['json'], default="", help='Title Required')
checklist_section_parser.add_argument(
    'checklist_slug', type=unicode, required=True,
    location=['json'], help='CHecklist ID Required')


class ChecklistSectionApi(Resource):

    method_decorators = [app_subscription_required('CHECKLIST')]

    def get(self, section_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        if section_id:
            if is_author():
                checklist_section_query_table = ChecklistDraftSection
                checklist_item_query_table = ChecklistDraftItem
            else:
                checklist_section_query_table = ChecklistSection
                checklist_item_query_table = ChecklistItem

            checklist_section = checklist_section_query_table.query.filter(
                (checklist_section_query_table.tenant_id == tenant_id) &
                (checklist_section_query_table.id == section_id) &
                (checklist_section_query_table.is_deleted.__eq__(False))
            ).options(
                joinedload(checklist_section_query_table.translations),
                joinedload(checklist_section_query_table.translations),
                joinedload(checklist_section_query_table.checklist_items),
                joinedload(checklist_section_query_table.checklist_items).
                joinedload(checklist_item_query_table.translations),
                joinedload(checklist_section_query_table.checklist_items).
                joinedload(checklist_item_query_table.checklist_suggestions),
            ).first_or_404()

            checklist_items = [ch for ch in checklist_section.checklist_items
                               if ch.is_enabled and not ch.is_deleted]
            for checklist_item in checklist_items:
                translation = get_translation(checklist_item)
                checklist_item.title = translation.title
                checklist_item.description = translation.description
                checklist_item._suggestions = get_suggestions(checklist_item)
            checklist_section._items = checklist_items

            translation = get_translation(checklist_section)
            checklist_section.title = translation.title

            return format_data(
                marshal(checklist_section, checklist_section_fields)), 200

    @has_author_access
    def post(self):
        post_data = checklist_section_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING %
                tenant.default_locale.name)

        checklist = ChecklistDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=post_data.get('checklist_slug'),
            is_deleted=False
        ).first_or_404()

        nth_child = ChecklistDraftSection.query.filter_by(
            tenant_id=tenant_id,
            is_deleted=False
        ).order_by(ChecklistDraftSection.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        checklist_draft_section = ChecklistDraftSection()
        checklist_draft_section.tenant_id = tenant_id
        checklist_draft_section.order = order
        checklist_draft_section.created_by = session.get('user_id')
        checklist_draft_section.modified_by = session.get('user_id')
        checklist_draft_section.checklist_draft = checklist

        translation = ChecklistDraftSectionTranslation()
        translation.language_id = session['author']['locale']
        translation.title = post_data.get('title')
        checklist_draft_section.translations.append(translation)

        checklist_draft_section.checklist_draft.is_published = False

        db.session.add(checklist_draft_section)
        db.session.commit()

        translation = get_translation(checklist_draft_section)
        checklist_draft_section.title = translation.title

        return format_data(
            marshal(checklist_draft_section, checklist_section_fields)), 200

    @has_author_access
    def put(self, section_id):

        put_data = checklist_section_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_title = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('title'))
        if invalid_title:
            raise SharedemosException(
                412,
                message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        checklist_draft_section = ChecklistDraftSection.query.filter(
            (ChecklistDraftSection.tenant_id == tenant_id) &
            (ChecklistDraftSection.id == section_id) &
            (ChecklistDraftSection.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(checklist_draft_section, author=True)
        if not trans:
            trans = ChecklistDraftSectionTranslation()
            trans.checklist_draft_section_id = checklist_draft_section.id
            trans.language_id = session['author']['locale']

        # Draft Checklist translation
        trans.title = put_data['title']
        trans.checklist_draft_section = checklist_draft_section

        checklist_draft_section.modified_by = session.get('user_id')
        checklist_draft_section.checklist_draft.is_published = False
        checklist_draft_section.is_published = False

        db.session.add(checklist_draft_section)
        db.session.commit()

        translation = get_translation(checklist_draft_section)
        checklist_draft_section.title = translation.title

        return format_data(
            marshal(checklist_draft_section, checklist_section_fields)), 200

    @has_author_access
    def delete(self, section_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        checklist_draft_section = ChecklistDraftSection.query.filter_by(
            tenant_id=tenant_id,
            id=section_id,
            is_deleted=False
        ).first_or_404()

        checklist_draft_section.is_deleted = True
        checklist_draft_section.modified_by = session.get('user_id')
        checklist_draft_section.checklist_draft.is_published = False
        checklist_draft_section.is_published = False

        db.session.add(checklist_draft_section)
        db.session.commit()

        return {'status': 'DELETED'}, 200


checklist_item_parser = reqparse.RequestParser()
checklist_item_parser.add_argument('title', type=unicode, required=True,
                                   location=['json'], default="",
                                   help='Title Required')
checklist_item_parser.add_argument('description', type=unicode,
                                   location=['json'], default="")
checklist_item_parser.add_argument('checklist_section_id', type=int,
                                   required=True, location=['json'],
                                   help='Checklist Section ID Required')


class ChecklistItemApi(Resource):

    method_decorators = [app_subscription_required('CHECKLIST')]

    def get(self, item_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        if item_id:
            if is_author():
                checklist_item_query_table = ChecklistDraftItem
            else:
                checklist_item_query_table = ChecklistItem

            checklist_item = checklist_item_query_table.query.filter(
                (checklist_item_query_table.tenant_id == tenant_id) &
                (checklist_item_query_table.id == item_id) &
                (checklist_item_query_table.is_deleted.__eq__(False))
            ).options(
                joinedload(checklist_item_query_table.translations),
                joinedload(checklist_item_query_table.checklist_suggestions),
            ).first_or_404()

            translation = get_translation(checklist_item)
            checklist_item.title = translation.title
            checklist_item.description = translation.description
            checklist_item._suggestions = get_suggestions(checklist_item)

            return format_data(
                marshal(checklist_item, checklist_item_fields)), 200

    @has_author_access
    def post(self):
        post_data = checklist_item_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING %
                tenant.default_locale.name)

        checklist_section = ChecklistDraftSection.query.filter_by(
            tenant_id=tenant_id,
            id=post_data.get('checklist_section_id'),
            is_enabled=True,
            is_deleted=False
        ).first_or_404()

        nth_child = ChecklistDraftItem.query.filter_by(
            tenant_id=tenant_id,
            is_deleted=False
        ).order_by(ChecklistDraftItem.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        checklist_draft_item = ChecklistDraftItem()
        checklist_draft_item.tenant_id = tenant_id
        checklist_draft_item.order = order
        checklist_draft_item.created_by = session.get('user_id')
        checklist_draft_item.modified_by = session.get('user_id')
        checklist_draft_item.checklist_draft_section = checklist_section

        translation = ChecklistDraftItemTranslation()
        translation.language_id = session['author']['locale']
        translation.title = post_data.get('title')
        translation.description = post_data.get('description')
        checklist_draft_item.translations.append(translation)

        checklist_draft_item.checklist_draft_section\
            .checklist_draft.is_published = False
        checklist_draft_item.checklist_draft_section.is_published = False
        checklist_draft_item.is_published = False

        db.session.add(checklist_draft_item)
        db.session.commit()

        translation = get_translation(checklist_draft_item)
        checklist_draft_item.title = translation.title
        checklist_draft_item.description = translation.description

        return format_data(
            marshal(checklist_draft_item, checklist_item_fields)), 200

    @has_author_access
    def put(self, item_id):

        put_data = checklist_item_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_title = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('title'))
        if invalid_title:
            raise SharedemosException(
                412,
                message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        checklist_draft_item = ChecklistDraftItem.query.filter(
            (ChecklistDraftItem.tenant_id == tenant_id) &
            (ChecklistDraftItem.id == item_id) &
            (ChecklistDraftItem.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(checklist_draft_item, author=True)
        if not trans:
            trans = ChecklistDraftItemTranslation()
            trans.checklist_draft_item_id = checklist_draft_item.id
            trans.language_id = session['author']['locale']

        # Draft Checklist Item translation
        trans.title = put_data['title']
        trans.description = put_data['description']
        trans.checklist_draft_item = checklist_draft_item

        checklist_draft_item.modified_by = session.get('user_id')
        checklist_draft_item.checklist_draft_section\
            .checklist_draft.is_published = False
        checklist_draft_item.checklist_draft_section.is_published = False
        checklist_draft_item.is_published = False

        db.session.add(checklist_draft_item)
        db.session.commit()

        translation = get_translation(checklist_draft_item)
        checklist_draft_item.title = translation.title
        checklist_draft_item.description = translation.description

        return format_data(
            marshal(checklist_draft_item, checklist_item_fields)), 200

    @has_author_access
    def patch(self, item_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        checklist_draft_item = ChecklistDraftItem.query.filter(
            (ChecklistDraftItem.tenant_id == tenant_id) &
            (ChecklistDraftItem.id == item_id) &
            (ChecklistDraftItem.is_deleted.__eq__(False))
        ).first_or_404()

        if 'suggestions' in request.json:
            patch_data = request.json
            if 'chapters' in patch_data['suggestions'] or\
                    'external_links' in patch_data['suggestions']:

                nth_child = ChecklistDraftSuggestion.query.filter_by(
                    tenant_id=tenant_id,
                    checklist_draft_item_id=checklist_draft_item.id,
                    is_deleted=False
                ).order_by(ChecklistDraftSuggestion.order.desc()).first()

                _order = nth_child.order if nth_child else 0

                if 'external_links' in patch_data['suggestions']:
                    if patch_data['suggestions']['external_links']:
                        suggestions = patch_data['suggestions'][
                            'external_links']

                else:
                    if patch_data['suggestions']['chapters']:
                        suggestions = Walkthrough.query.filter(
                            (Walkthrough.tenant_id == tenant_id) &
                            (Walkthrough.slug.in_(
                                patch_data['suggestions']['chapters'])) &
                            (Walkthrough.is_deleted.__eq__(False)) &
                            (Walkthrough.is_enabled.__eq__(True))
                        ).all()

                for index, chapter in enumerate(suggestions):
                    new_order = _order + index + 1
                    checklist_suggestion = ChecklistDraftSuggestion()
                    checklist_suggestion.\
                        checklist_draft_item = checklist_draft_item
                    if 'external_links' in patch_data['suggestions']:
                        checklist_suggestion.external_link = chapter
                    else:
                        checklist_suggestion.walkthrough = chapter
                    checklist_suggestion.tenant_id = tenant_id
                    checklist_suggestion.order = new_order
                    checklist_suggestion.created_by = session.get('user_id')
                    checklist_suggestion.modified_by = session.get('user_id')
                    db.session.add(checklist_suggestion)

        checklist_draft_item.checklist_draft_section\
            .checklist_draft.is_published = False
        checklist_draft_item.checklist_draft_section.is_published = False
        checklist_draft_item.is_published = False

        db.session.add(checklist_draft_item)
        db.session.commit()

        translation = get_translation(checklist_draft_item)
        checklist_draft_item.title = translation.title
        checklist_draft_item.description = translation.description

        checklist_draft_item._suggestions = get_suggestions(
            checklist_draft_item)
        return format_data(
            marshal(checklist_draft_item, checklist_item_fields)), 200

    @has_author_access
    def delete(self, item_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        checklist_draft_item = ChecklistDraftItem.query.filter_by(
            tenant_id=tenant_id,
            id=item_id,
            is_deleted=False
        ).first_or_404()

        checklist_draft_item.is_deleted = True
        checklist_draft_item.modified_by = session.get('user_id')
        checklist_draft_item.checklist_draft_section\
            .checklist_draft.is_published = False
        checklist_draft_item.checklist_draft_section.is_published = False
        checklist_draft_item.is_published = False

        db.session.add(checklist_draft_item)
        db.session.commit()

        return {'status': 'DELETED'}, 200


suggestion_parser = reqparse.RequestParser()
suggestion_parser.add_argument('title', required=True, type=unicode,
                               location=['form', 'json'],
                               help='Title Required')


class ChecklistSuggestionApi(Resource):

    method_decorators = [app_subscription_required('CHECKLIST')]

    def get(self, suggestion_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        if suggestion_id:
            if is_author():
                suggestion_table = ChecklistDraftSuggestion
            else:
                suggestion_table = ChecklistSuggestion

            checklist_suggestion = suggestion_table.query.filter(
                (suggestion_table.tenant_id == tenant_id) &
                (suggestion_table.id == suggestion_id) &
                (suggestion_table.is_deleted.__eq__(False))
            ).first_or_404()

            if checklist_suggestion.walkthrough:
                translation = get_translation(checklist_suggestion.walkthrough)
                checklist_suggestion.title = translation.title
            else:
                checklist_suggestion.title = checklist_suggestion\
                    .external_link.get('title')

            return format_data(
                marshal(checklist_suggestion, checklist_suggestion_fields)
            ), 200

    def put(self, suggestion_id):
        """Update external link title and description for given suggestion."""
        tenant_id = getattr(current_app, 'tenant_id', None)

        put_data = suggestion_parser.parse_args()
        suggestion = ChecklistDraftSuggestion.query.filter(
            (ChecklistDraftSuggestion.id == suggestion_id) &
            (ChecklistDraftSuggestion.tenant_id == tenant_id)
        ).order_by(ChecklistDraftSuggestion.order).first_or_404()

        suggestion.is_published = False
        external_link = suggestion.external_link

        external_link_data = dict()
        external_link_data['title'] = put_data['title']
        external_link_data['description'] = external_link.get('description')
        external_link_data['url'] = external_link.get('url')
        external_link_data['icon'] = external_link.get('icon')
        external_link_data['icon_name'] = external_link.get('icon_name')
        external_link_data['site_name'] = external_link.get('site_name')

        suggestion.external_link = external_link_data
        suggestion.checklist_draft_item.checklist_draft_section\
            .checklist_draft.is_published = False
        suggestion.checklist_draft_item\
            .checklist_draft_section.is_published = False
        suggestion.checklist_draft_item.is_published = False
        suggestion.is_published = False
        db.session.add(suggestion)
        db.session.commit()

        if suggestion.walkthrough:
            translation = get_translation(suggestion.walkthrough)
            suggestion.title = translation.title
        else:
            suggestion.title = suggestion.external_link.get('title')

        return format_data(
            marshal(suggestion, checklist_suggestion_fields)), 200

    def patch(self, suggestion_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        if request.json.get('reorder'):
            suggestions_order = request.json.get('suggestions_order')

            suggestion = ChecklistDraftSuggestion.query.filter_by(
                tenant_id=tenant_id,
                id=suggestion_id,
                is_deleted=False
            ).first_or_404()

            suggestions = ChecklistDraftSuggestion.query.filter_by(
                tenant_id=tenant_id,
                checklist_draft_item_id=suggestion.checklist_draft_item_id,
                is_deleted=False
            ).all()

            for suggestion in suggestions:
                order = suggestions_order.get(
                    'suggestion_' + str(suggestion.id))
                suggestion.order = order
                suggestion.is_published = False
                db.session.add(suggestion)

            suggestion.checklist_draft_item.checklist_draft_section\
                .checklist_draft.is_published = False
            suggestion.checklist_draft_item\
                .checklist_draft_section.is_published = False
            suggestion.checklist_draft_item.is_published = False

            db.session.add(suggestion)
            db.session.commit()

            if suggestion.walkthrough:
                translation = get_translation(suggestion.walkthrough)
                suggestion.title = translation.title
            else:
                suggestion.title = suggestion.external_link.get('title')

            return {'status': 'UPDATED'}, 201

    def delete(self, suggestion_id):
        """Delete the suggestion for given id."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        current_suggestion = ChecklistDraftSuggestion.query.filter(
            (ChecklistDraftSuggestion.id == suggestion_id) &
            (ChecklistDraftSuggestion.tenant_id == tenant_id)
        ).order_by(ChecklistDraftSuggestion.order).first()

        suggestions = current_suggestion.checklist_draft_item\
            .checklist_suggestions
        current_suggestion.checklist_draft_item\
            .checklist_draft_section.checklist_draft.is_published = False
        current_suggestion.checklist_draft_item\
            .checklist_draft_section.is_published = False
        current_suggestion.checklist_draft_item.is_published = False
        current_suggestion.is_published = False

        for suggestion in suggestions:
            if suggestion.id == current_suggestion.id:
                suggestion.is_deleted = True
                suggestion.modified_by = session.get('user_id')
                suggestion.is_published = False
                db.session.add(suggestion)
            if suggestion.order > current_suggestion.order:
                suggestion.order = suggestion.order - 1
                suggestion.modified_by = session.get('user_id')
                suggestion.is_published = False
                db.session.add(suggestion)

        db.session.commit()
        return {'status': 'DELETED'}, 200
