import re
import werkzeug

from flask import current_app, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse

from sharedemos.api.custom_fields import MediaURL
from sharedemos.libs.api import (
    format_data,
    get_locale,
    is_author
)
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import create_file
from sharedemos.models import (
    IconLibrary,
    QuizDraftQuestion,
    QuizDraftMatchingOption,
    QuizDraftMatchingOptionTranslation,
    QuizDraftMultiSelectOption,
    QuizDraftMultiSelectOptionTranslation,
    QuizDraftSortableOption,
    QuizDraftSortableOptionTranslation,
    QuizMatchingOption,
    QuizMultiSelectOption,
    QuizSortableOption,
    Tenant,
    db
)

from .custom_fields import NAME_TITLE_REGEX, OptionField

icon_fields = {
    'name': fields.String,
    'url': MediaURL(fields.String, attribute="path")
}

option_fields = {
    'option_id': fields.Integer(attribute='id'),
    'text': fields.String,
    'description': fields.String,
    'icon': fields.Nested(icon_fields, allow_null=True),
    'item_left': OptionField(attribute='item_left'),
    'item_right': OptionField(attribute='item_right'),
    'is_correct_option': fields.Boolean
}


def create_mutable_dict(tenant_id, description, icon, item_translation=None):
    item = dict()
    if description is not None:
        item['text'] = description
    elif item_translation is not None and item_translation.get('text'):
        item['text'] = item_translation['text']
    if icon:
        icon_hex_name = create_file(icon)
        icon = IconLibrary()
        icon.name = unicode(description)
        icon.path = icon_hex_name
        icon.tenant_id = tenant_id
        item['image'] = icon_hex_name
        db.session.add(icon)
    elif item_translation is not None and item_translation.get('image'):
        item['image'] = item_translation['image']
    return item


option_parser = reqparse.RequestParser()
option_parser.add_argument('title', type=unicode,
                           location=['form', 'json'], default="")
option_parser.add_argument('description', type=unicode,
                           location=['form', 'json'], default="")
option_parser.add_argument('question_id', type=int, required=True,
                           location=['form', 'json'],
                           help='Question ID Required')
option_parser.add_argument('option_id', type=unicode,
                           location=['form', 'json'])
option_parser.add_argument('option_type', type=unicode, required=True,
                           location=['form', 'json'],
                           help='Option Type Required')
option_parser.add_argument('remove_icon', type=bool, location=['form', 'json'],
                           default=False)
option_parser.add_argument('icon', type=werkzeug.datastructures.FileStorage,
                           location='files')


class QuizOptionApi(Resource):

    method_decorators = [app_subscription_required('QUIZ')]

    def get(self, option_id):

        tenant_id = getattr(current_app, 'tenant_id', None)

        table_name = None
        option_type = request.args.get('option_type')
        if is_author():
            if option_type in ['single_select', 'multi_select']:
                table_name = QuizDraftMultiSelectOption
            elif option_type == 'matching':
                table_name = QuizDraftMatchingOption
            else:
                table_name = QuizDraftSortableOption
        else:
            if option_type in ['single_select', 'multi_select']:
                table_name = QuizMultiSelectOption
            elif option_type == 'matching':
                table_name = QuizMatchingOption
            else:
                table_name = QuizSortableOption

        quiz_option = table_name.query.filter_by(
            tenant_id=tenant_id,
            id=int(option_id),
            is_deleted=False
        ).first()

        locale = get_locale()
        translation = quiz_option.get_translation(locale)
        if option_type == 'matching':
            quiz_option.item_left = translation.item_left
            quiz_option.item_right = translation.item_right

        elif option_type in ['single_select', 'multi_select', 'sortable']:
            quiz_option.text = translation.text
            quiz_option.description = translation.description
            if translation.icon:
                quiz_option.icon = translation.icon

        return format_data(marshal(quiz_option, option_fields)), 200

    @has_author_access
    def post(self):
        post_data = option_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING %
                tenant.default_locale.name)

        question = QuizDraftQuestion.query.filter(
            (QuizDraftQuestion.tenant_id == tenant_id) &
            (QuizDraftQuestion.id == int(post_data['question_id'])) &
            (QuizDraftQuestion.is_deleted.__eq__(False))
        ).first_or_404()

        if 'matching' in post_data.get('option_type'):
            nth_option = QuizDraftMatchingOption.query.filter_by(
                tenant_id=tenant_id,
                quiz_question_id=int(post_data['question_id']),
                is_deleted=False
            ).order_by(QuizDraftMatchingOption.order.desc()).first()

            order = (nth_option.order if nth_option else 0) + 1

            item_side = post_data.get('option_type').split('_')[1]

            if item_side == 'left':

                quiz_option = QuizDraftMatchingOption()
                quiz_option.tenant_id = tenant_id
                quiz_option.quiz = question.quiz
                quiz_option.quiz_question = question
                quiz_option.order = order

                translation = QuizDraftMatchingOptionTranslation()
                translation.language_id = session['author']['locale']
                description = None
                if post_data.get('description'):
                    description = post_data.get('description')
                item = create_mutable_dict(
                    tenant_id, description, post_data.get('icon'))

                translation.item_left = item
                quiz_option.translations.append(translation)

            else:
                quiz_option = QuizDraftMatchingOption.query.filter(
                    QuizDraftMatchingOption.tenant_id == tenant_id,
                    QuizDraftMatchingOption.id == int(post_data['option_id']),
                    QuizDraftMatchingOption.is_deleted.__eq__(False)
                ).first_or_404()

                description = None
                if post_data.get('description'):
                    description = post_data.get('description')
                item = create_mutable_dict(
                    tenant_id, description, post_data.get('icon'))

                translation = quiz_option.get_translation(
                    session["author"]["locale"])
                translation.item_right = item

            quiz_option.quiz.is_published = False
            quiz_option.quiz_question.is_published = False

            db.session.add(quiz_option)
            db.session.commit()

            translation = quiz_option.get_translation(
                session["author"]["locale"])
            if item_side == 'left':
                quiz_option.item_left = translation.item_left
            else:
                quiz_option.item_right = translation.item_right

        else:

            if 'select' in post_data.get('option_type'):
                quiz_option = QuizDraftMultiSelectOption()
                translation = QuizDraftMultiSelectOptionTranslation()
                nth_option = QuizDraftMultiSelectOption.query.filter_by(
                    tenant_id=tenant_id,
                    quiz_question_id=int(post_data['question_id']),
                    is_deleted=False
                ).order_by(QuizDraftMultiSelectOption.order.desc()).first()
            else:
                quiz_option = QuizDraftSortableOption()
                translation = QuizDraftSortableOptionTranslation()
                nth_option = QuizDraftSortableOption.query.filter_by(
                    tenant_id=tenant_id,
                    quiz_question_id=int(post_data['question_id']),
                    is_deleted=False
                ).order_by(QuizDraftSortableOption.order.desc()).first()

            order = (nth_option.order if nth_option else 0) + 1

            quiz_option.tenant_id = tenant_id
            quiz_option.quiz = question.quiz
            quiz_option.quiz_question = question
            quiz_option.order = order
            if post_data.get('option_type') == 'single_select':
                quiz_option.is_single_select = True
            elif post_data.get('option_type') == 'sortable':
                quiz_option.correct_order = order

            translation.language_id = session['author']['locale']
            translation.text = post_data.get('title')
            translation.description = post_data.get('description')
            quiz_option.translations.append(translation)

            if post_data.get('icon'):
                icon_hex_name = create_file(post_data['icon'])
                icon = IconLibrary()
                icon.name = unicode(post_data['description'])
                icon.path = icon_hex_name
                icon.tenant_id = tenant_id
                translation.icon = icon
                db.session.add(icon)

            quiz_option.quiz.is_published = False
            quiz_option.quiz_question.is_published = False

            db.session.add(quiz_option)
            db.session.commit()

            translation = quiz_option.get_translation(
                session["author"]["locale"])
            quiz_option.text = translation.text
            quiz_option.description = translation.description
            if translation.icon:
                quiz_option.icon = translation.icon

        return format_data(marshal(quiz_option, option_fields)), 200

    @has_author_access
    def put(self, option_id):

        put_data = option_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        option_type = put_data.get('option_type')
        invalid_title = re.match(NAME_TITLE_REGEX, put_data.get('title'))
        if 'matching' not in option_type and invalid_title:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS %
                'title')

        if option_type in ['single_select', 'multi_select']:
            quiz_option = QuizDraftMultiSelectOption.query.filter_by(
                tenant_id=tenant_id,
                id=option_id,
                is_deleted=False
            ).first()
        elif 'matching' in option_type:
            quiz_option = QuizDraftMatchingOption.query.filter_by(
                tenant_id=tenant_id,
                id=int(option_id),
                is_deleted=False
            ).first()
        else:
            quiz_option = QuizDraftSortableOption.query.filter_by(
                tenant_id=tenant_id,
                id=int(option_id),
                is_deleted=False
            ).first()

        trans = quiz_option.get_locale_translation(session["author"]["locale"])
        if not trans:
            if option_type in ['single_select', 'multi_select']:
                trans = QuizDraftMultiSelectOptionTranslation()
                trans.quiz_multiselect_option_id = quiz_option.id
            elif 'matching' in option_type:
                trans = QuizDraftMatchingOptionTranslation()
                trans.quiz_matching_option_id = quiz_option.id
            else:
                trans = QuizDraftSortableOptionTranslation()
                trans.quiz_sortable_option_id = quiz_option.id
            trans.language_id = session['author']['locale']

        if option_type in ['single_select', 'multi_select', 'sortable']:
            trans.text = put_data.get('title')
            trans.description = put_data.get('description')
            if put_data.get('icon'):
                icon_hex_name = create_file(put_data['icon'])
                icon_lib = IconLibrary()
                icon_lib.name = unicode(put_data['title'])
                icon_lib.path = icon_hex_name
                icon_lib.tenant_id = tenant_id
                trans.icon = icon_lib
                db.session.add(icon_lib)
            elif put_data['remove_icon']:
                trans.icon = None
        elif 'matching' in option_type:
            item_side = option_type.split('_')[1]
            default_translation = quiz_option.get_default_translation()

            description = None
            if put_data.get('description'):
                description = put_data.get('description')
            if item_side == 'left':
                item = create_mutable_dict(
                    tenant_id,
                    description,
                    put_data.get('icon'),
                    default_translation.item_left)
                trans.item_left = item
                if not trans.item_right:
                    trans.item_right = default_translation.item_right
            else:
                item = create_mutable_dict(
                    tenant_id,
                    description,
                    put_data.get('icon'),
                    default_translation.item_right
                )
                trans.item_right = item
                if not trans.item_left:
                    trans.item_left = default_translation.item_left

        quiz_option.modified_by = session.get('user_id')
        quiz_option.quiz.is_published = False
        quiz_option.quiz_question.is_published = False
        quiz_option.is_published = False

        db.session.add_all([trans, quiz_option])
        db.session.commit()

        translation = quiz_option.get_translation(session["author"]["locale"])
        if option_type in ['single_select', 'multi_select', 'sortable']:
            quiz_option.text = translation.text
            quiz_option.description = translation.description
            if translation.icon:
                quiz_option.icon = translation.icon
        elif 'matching' in option_type:
            item_side = option_type.split('_')[1]
            quiz_option.item_left = trans.item_left
            quiz_option.item_right = trans.item_right

        return format_data(marshal(quiz_option, option_fields)), 200

    @has_author_access
    def patch(self, option_id):

        tenant_id = getattr(current_app, 'tenant_id', None)

        option_type = request.json.get('option_type')
        if option_type in ['single_select', 'multi_select']:
            quiz_option = QuizDraftMultiSelectOption.query.filter_by(
                tenant_id=tenant_id,
                id=option_id,
                is_deleted=False
            ).first()
        elif option_type == 'sortable':
            quiz_option = QuizDraftSortableOption.query.filter_by(
                tenant_id=tenant_id,
                id=option_id,
                is_deleted=False
            ).first()

        if request.json.get('correct_option'):
            if request.json.get('option_type') == 'single_select':
                options = quiz_option.quiz_question.quiz_multiselect_options
                for option in options:
                    option.is_correct_option = False

            quiz_option.is_correct_option = request.json.get(
                'is_correct_option')
            quiz_option.is_published = False

        if request.json.get('reorder'):
            options_order = request.json.get('options_order')
            quiz_options = QuizDraftSortableOption.query.filter_by(
                tenant_id=tenant_id,
                quiz_question_id=quiz_option.quiz_question_id,
                is_deleted=False
            ).all()
            for option in quiz_options:
                order = options_order.get('option_' + str(option.id))
                option.correct_order = order
                option.is_published = False

        quiz_option.quiz_question.is_published = False
        quiz_option.quiz.is_published = False

        db.session.add(quiz_option)
        db.session.commit()

        return {'status': 'UPDATED'}, 201

    @has_author_access
    def delete(self, option_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        option_type = request.form.get('option_type')

        if option_type in ['single_select', 'multi_select']:
            table_name = QuizDraftMultiSelectOption
        elif option_type == 'matching':
            table_name = QuizDraftMatchingOption
        else:
            table_name = QuizDraftSortableOption

        quiz_option = table_name.query.filter(
            (table_name.tenant_id == tenant_id) &
            (table_name.id == option_id) &
            (table_name.is_deleted.__eq__(False))
        ).first_or_404()

        quiz_option.is_deleted = True
        quiz_option.is_published = False
        quiz_option.quiz.is_published = False
        quiz_option.quiz_question.is_published = False

        db.session.add(quiz_option)
        db.session.commit()

        return {'status': 'DELETED'}, 200
