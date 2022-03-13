from flask import (
    current_app,
    jsonify,
    request,
    session
)
from flask.ext.restful import Resource, fields, marshal, reqparse

from sharedemos.api.custom_fields import MediaURL
from sharedemos.libs.api import format_data, is_author
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    get_translation,
    get_locale_translation
)
from sharedemos.models import (
    db, FAQDraftGroup,
    FAQDraftGroupTranslation,
    FAQGroup,
    FAQGroupTranslation,
    FAQDraftSection,
    FAQDraftSectionTranslation,
    FAQSection,
    FAQSectionTranslation,
    FAQDraft,
    FAQDraftTranslation,
    FAQ,
    FAQTranslation,
    Tenant
)


def get_group_details(group):
    translation = get_translation(group)
    group.name = translation.name
    group.description = translation.description
    group.icon = translation.icon
    sections = []
    for section in group.faq_sections:
        if section.is_deleted or (not is_author() and not section.is_enabled):
            continue
        translation = get_translation(section)
        section.name = translation.name

        questions = []
        for question in section.questions:
            if question.is_deleted or (not is_author() and
                                       not question.is_enabled):
                continue
            translation = get_translation(question)
            question.question = translation.question
            question.answer = translation.answer
            questions.append(question)

        section._questions = questions
        sections.append(section)

    group._sections = sections
    return group


def publish_group(dr_group):
    if dr_group.is_published:
        return dr_group

    group = dr_group.published
    if not group:
        group = FAQGroup()
        group.draft = dr_group
        group.tenant_id = dr_group.tenant_id
        group.created_by = session.get('user_id')

    group.modified_by = session.get('user_id')
    group.order = dr_group.order
    group.is_deleted = dr_group.is_deleted
    group.is_enabled = dr_group.is_enabled

    db.session.add(group)

    published_translations = [tr.language_id for tr in group.translations]
    for trans in dr_group.translations:
        if trans.language_id not in published_translations:
            translation = FAQGroupTranslation()
            translation.language_id = trans.language_id
            translation.group = group
        else:
            translation = get_locale_translation(group, trans.language_id)

        translation.name = trans.name
        translation.description = trans.description
        translation.icon_id = trans.icon_id
        db.session.add(translation)

    sections = FAQDraftSection.query.filter(
        FAQDraftSection.group_id == dr_group.id,
        FAQDraftSection.is_published.__eq__(False)
    ).all()

    for dr_section in sections:
        section = dr_section.published
        if not section:
            section = FAQSection()
            section.group = group
            section.draft = dr_section
            section.tenant_id = dr_group.tenant_id
            section.created_by = session.get('user_id')

        section.modified_by = session.get('user_id')
        section.order = dr_section.order
        section.is_enabled = dr_section.is_enabled
        section.is_deleted = dr_section.is_deleted

        db.session.add(section)

        published_translations = [tr.language_id
                                  for tr in section.translations]
        for trans in dr_section.translations:
            if trans.language_id not in published_translations:
                translation = FAQSectionTranslation()
                translation.language_id = trans.language_id
                translation.section = section
            else:
                translation = get_locale_translation(section,
                                                     trans.language_id)

            translation.name = trans.name
            db.session.add(translation)

        dr_section.is_published = True
        db.session.add(dr_section)

    qnas = FAQDraft.query.filter(
        FAQDraft.group_id == dr_group.id,
        FAQDraft.is_published.__eq__(False)
    ).all()

    for dr_qna in qnas:
        qna = dr_qna.published
        if not qna:
            qna = FAQ()
            qna.group = group
            qna.section = dr_qna.section.published
            qna.draft = dr_qna
            qna.tenant_id = dr_group.tenant_id
            qna.created_by = session.get('user_id')

        qna.modified_by = session.get('user_id')
        qna.order = dr_qna.order
        qna.is_enabled = dr_qna.is_enabled
        qna.is_deleted = dr_qna.is_deleted
        db.session.add(qna)

        dr_qna.is_published = True
        db.session.add(dr_qna)

        published_translations = [tr.language_id
                                  for tr in qna.translations]
        for trans in dr_qna.translations:
            if trans.language_id not in published_translations:
                translation = FAQTranslation()
                translation.language_id = trans.language_id
                translation.faq = qna
            else:
                translation = get_locale_translation(qna,
                                                     trans.language_id)

            translation.question = trans.question
            translation.answer = trans.answer
            db.session.add(translation)

    dr_group.is_published = True
    db.session.add(dr_group)

    db.session.commit()
    from sharedemos.tasks import upload_to_algolia
    upload_to_algolia.delay({
        'category': u'faq',
        'faq_group_id': group.id,
        'tenant_id': dr_group.tenant_id
    })

    return dr_group


icon_details = {
    'id': fields.Integer,
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path")
}

faq_fields = {
    'id': fields.Integer,
    'order': fields.Integer,
    'section_id': fields.Integer,
    'question': fields.String,
    'answer': fields.String
}

faq_section_fields = {
    'id': fields.Integer,
    'order': fields.Integer,
    'name': fields.String,
    'questions': fields.Nested(
        faq_fields,
        attribute='_questions',
        default=[])
}

faq_group_fields = {
    'slug': fields.String,
    'name': fields.String,
    'description': fields.String,
    'icon': fields.Nested(icon_details, allow_null=True),
    'questions_count': fields.Integer(default=0),
    'sections': fields.Nested(faq_section_fields, attribute='_sections',
                              default=[]),
    'published': fields.Boolean(attribute='is_published')
}


group_parser = reqparse.RequestParser()
group_parser.add_argument('name', required=True, type=unicode, location='json',
                          help='Name required')
group_parser.add_argument('description', type=unicode,
                          location='json', help='Description required')
group_parser.add_argument('icon_id', default=0, type=int, location='json')


class FAQGroupApi(Resource):

    method_decorators = [app_subscription_required('FAQ')]

    def get(self, slug=None):

        tenant_id = getattr(current_app, 'tenant_id', None)

        if is_author():
            groups = FAQDraftGroup.query.filter(
                FAQDraftGroup.tenant_id == tenant_id,
                FAQDraftGroup.is_deleted.__eq__(False)
            )
            if slug:
                groups = groups.filter(
                    FAQDraftGroup.slug == unicode(slug)
                ).first_or_404()
            else:
                groups = groups.order_by(FAQDraftGroup.order).all()

        else:
            groups = FAQGroup.query.filter(
                FAQGroup.tenant_id == tenant_id,
                FAQGroup.is_deleted.__eq__(False),
                FAQGroup.is_enabled.__eq__(True)
            )
            if slug:
                groups = groups.filter(
                    FAQGroup.slug == unicode(slug)
                ).first_or_404()
            else:
                groups = groups.order_by(FAQGroup.order).all()

        if slug:
            groups = get_group_details(groups)
        else:
            for grp in groups:
                grp = get_group_details(grp)

        return format_data(marshal(groups, faq_group_fields))

    @has_author_access
    def post(self):
        post_data = group_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        # Add Group information
        d_group = FAQDraftGroup()
        d_group.tenant_id = tenant_id
        nth_child = FAQDraftGroup.query.filter(
            FAQDraftGroup.tenant_id == tenant_id,
            FAQDraftGroup.is_deleted.__eq__(False)
        ).order_by(FAQDraftGroup.order.desc()).first()
        d_group.order = (nth_child.order if nth_child else 0) + 1
        d_group.created_by = d_group.modified_by = session.get('user_id')
        db.session.add(d_group)

        # Add Group translation
        translation = FAQDraftGroupTranslation()
        translation.group = d_group
        translation.name = post_data['name']
        translation.description = post_data['description']
        translation.language_id = session['author']['locale']
        translation.icon_id = post_data['icon_id'] or None
        db.session.add(translation)

        db.session.commit()
        return format_data(marshal(d_group, faq_group_fields)), 201

    @has_author_access
    def put(self, slug):
        put_data = group_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        # Get Group information
        d_group = FAQDraftGroup.query.filter(
            FAQDraftGroup.tenant_id == tenant_id,
            FAQDraftGroup.slug == unicode(slug),
            FAQDraftGroup.is_deleted.__eq__(False)
        ).first_or_404()

        # Update Group translation
        translation = get_locale_translation(d_group)
        if not translation:
            translation = FAQDraftGroupTranslation()
            translation.group = d_group
            translation.language_id = session['author']['locale']

        translation.name = put_data['name']
        translation.description = put_data['description']
        translation.icon_id = put_data['icon_id'] or None
        db.session.add(translation)

        d_group.is_published = False
        d_group.modified_by = session.get('user_id')
        db.session.add(d_group)

        db.session.commit()
        return format_data(marshal(d_group, faq_group_fields)), 200

    @has_author_access
    def patch(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)

        # Get Group information
        d_group = FAQDraftGroup.query.filter(
            FAQDraftGroup.tenant_id == tenant_id,
            FAQDraftGroup.slug == unicode(slug),
            FAQDraftGroup.is_deleted.__eq__(False)
        ).first_or_404()

        if 'publish' in request.json:
            d_group = publish_group(d_group)

        return format_data(marshal(d_group, faq_group_fields)), 200

    @has_author_access
    def delete(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)
        d_group = FAQDraftGroup.query.filter(
            FAQDraftGroup.slug == unicode(slug),
            FAQDraftGroup.tenant_id == tenant_id
        ).first_or_404()

        # Update deleted flag
        d_group.is_deleted = True
        db.session.add(d_group)

        if d_group.published:
            # Update deleted flag if published version exist
            d_group.published.is_deleted = True
            db.session.add(d_group.published)
            from sharedemos.tasks import delete_faq_from_algolia
            delete_faq_from_algolia.delay({
                'entity': u'group',
                'entity_id': d_group.published.id,
            })

        db.session.commit()
        return jsonify(status='DELETED')


section_parser = reqparse.RequestParser()
section_parser.add_argument('group_id', required=True, type=unicode,
                            location='json', help='Group ID required')
section_parser.add_argument('name', required=True, type=unicode,
                            location='json', help='Name required')


class FAQSectionApi(Resource):

    method_decorators = [app_subscription_required('FAQ'), has_author_access]

    def get(self, id):
        tenant_id = getattr(current_app, 'tenant_id', None)
        d_section = FAQDraftSection.query.filter(
            FAQDraftSection.id == id,
            FAQDraftSection.tenant_id == tenant_id,
            FAQDraftSection.is_deleted.__eq__(False)
        ).first_or_404()

        translation = get_translation(d_section)
        d_section.name = translation.name

        return format_data(marshal(d_section, faq_section_fields))

    def post(self):
        post_data = section_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        d_group = FAQDraftGroup.query.filter(
            FAQDraftGroup.slug == post_data['group_id'],
            FAQDraftGroup.is_deleted.__eq__(False),
            FAQDraftGroup.tenant_id == tenant_id
        ).first_or_404()

        if session['author']['locale'] != d_group.tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % d_group.tenant.default_locale.name)

        # Add Section information
        d_section = FAQDraftSection()
        d_section.tenant_id = tenant_id
        d_section.group_id = d_group.id
        d_section.order = len(d_group.faq_sections) + 1
        d_section.created_by = d_section.modified_by = session.get('user_id')
        db.session.add(d_section)

        # Add Section translation
        translation = FAQDraftSectionTranslation()
        translation.name = post_data['name']
        translation.language_id = session['author']['locale']
        translation.section = d_section
        db.session.add(translation)

        d_group.is_published = False
        db.session.add(d_group)

        db.session.commit()

        return format_data(marshal(d_section, faq_section_fields)), 201

    def put(self, id):
        put_data = section_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        # Get Group information
        d_section = FAQDraftSection.query.filter(
            FAQDraftSection.tenant_id == tenant_id,
            FAQDraftSection.id == id,
            FAQDraftSection.is_deleted.__eq__(False)
        ).first_or_404()

        # Update Group translation
        translation = get_locale_translation(d_section)
        if not translation:
            translation = FAQDraftSectionTranslation()
            translation.section_id = d_section.id
            translation.language_id = session['author']['locale']

        translation.name = put_data['name']
        db.session.add(translation)

        d_section.is_published = False
        d_section.modified_by = session.get('user_id')
        db.session.add(d_section)

        d_section.group.is_published = False
        db.session.add(d_section.group)

        db.session.commit()
        return format_data(marshal(d_section, faq_section_fields)), 200

    def delete(self, id):
        tenant_id = getattr(current_app, 'tenant_id', None)
        d_section = FAQDraftSection.query.filter(
            FAQDraftSection.id == id,
            FAQDraftSection.tenant_id == tenant_id
        ).first_or_404()

        # Update deleted flag
        d_section.is_deleted = True
        d_section.is_published = False
        db.session.add(d_section)

        d_section.group.is_published = False
        db.session.add(d_section.group)

        db.session.commit()
        if d_section.published:
            from sharedemos.tasks import delete_faq_from_algolia
            delete_faq_from_algolia.delay({
                'entity': u'section',
                'entity_id': d_section.published.id,
            })
        return jsonify(status='DELETED')


faq_parser = reqparse.RequestParser()
faq_parser.add_argument('group_id', required=True, type=unicode,
                        location='json', help='Group ID required')
faq_parser.add_argument('section_id', required=True, type=int,
                        location='json', help='Section ID required')
faq_parser.add_argument('question', required=True, type=unicode,
                        location='json', help='Question required')
faq_parser.add_argument('answer', required=True, type=unicode,
                        location='json', help='Answer required')


class FAQApi(Resource):

    method_decorators = [app_subscription_required('FAQ'), has_author_access]

    def get(self, id):
        tenant_id = getattr(current_app, 'tenant_id', None)
        d_qna = FAQDraft.query.filter(
            FAQDraft.id == id,
            FAQDraft.tenant_id == tenant_id,
            FAQDraft.is_deleted.__eq__(False)
        ).first_or_404()

        translation = get_translation(d_qna)
        d_qna.question = translation.question
        d_qna.answer = translation.answer

        return format_data(marshal(d_qna, faq_fields))

    def post(self):
        post_data = faq_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)

        d_section = FAQDraftSection.query.join(FAQDraftGroup).filter(
            FAQDraftGroup.slug == post_data['group_id'],
            FAQDraftSection.id == post_data['section_id'],
            FAQDraftSection.is_deleted.__eq__(False),
            FAQDraftSection.tenant_id == tenant_id
        ).first_or_404()

        if session['author']['locale'] != d_section.tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % d_section.tenant.default_locale.name)

        # Add FAQ information
        d_qna = FAQDraft()
        d_qna.section_id = d_section.id
        d_qna.group = d_section.group
        d_qna.tenant_id = tenant_id
        d_qna.order = len(d_section.questions) + 1
        d_qna.created_by = d_qna.modified_by = session.get('user_id')
        db.session.add(d_qna)

        # Add FAQ translation
        translation = FAQDraftTranslation()
        translation.question = post_data['question']
        translation.answer = post_data['answer']
        translation.language_id = session['author']['locale']
        translation.faq = d_qna
        db.session.add(translation)

        d_qna.group.is_published = False
        d_section.is_published = False
        db.session.add(d_qna.group)

        db.session.commit()

        return format_data(marshal(d_qna, faq_fields))

    def put(self, id):
        put_data = faq_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        # Get QnA information
        d_qna = FAQDraft.query.filter(
            FAQDraft.tenant_id == tenant_id,
            FAQDraft.id == id,
            FAQDraft.is_deleted.__eq__(False)
        ).first_or_404()

        # Update QnA translation
        translation = get_locale_translation(d_qna)
        if not translation:
            translation = FAQDraftTranslation()
            translation.faq_id = d_qna.id
            translation.language_id = session['author']['locale']

        translation.question = put_data['question']
        translation.answer = put_data['answer']
        db.session.add(translation)

        d_qna.is_published = False
        d_qna.section.is_published = False
        d_qna.modified_by = session.get('user_id')
        db.session.add(d_qna)

        d_qna.group.is_published = False
        db.session.add(d_qna.group)

        db.session.commit()
        return format_data(marshal(d_qna, faq_fields)), 200

    def delete(self, id):
        tenant_id = getattr(current_app, 'tenant_id', None)
        d_qna = FAQDraft.query.filter(
            FAQDraft.id == id,
            FAQDraft.tenant_id == tenant_id
        ).first_or_404()

        # Update deleted flag
        d_qna.is_deleted = True
        d_qna.is_published = False
        db.session.add(d_qna)

        d_qna.group.is_published = False
        db.session.add(d_qna.group)
        db.session.commit()
        if d_qna.published:
            from sharedemos.tasks import delete_faq_from_algolia
            delete_faq_from_algolia.delay({
                'entity': u'faq',
                'entity_id': d_qna.published.id,
            })
        return jsonify(status='DELETED')
