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
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.helpers import create_file
from sharedemos.models import (
    QuizDraft,
    QuizDraftQuestion,
    QuizDraftQuestionTranslation,
    QuizQuestion,
    Resource as ResourceModel,
    Tenant,
    db
)
from .custom_fields import NAME_TITLE_REGEX, OptionField


resource_fields = {
    'name': fields.String,
    'type': fields.String(attribute="resource_type"),
    'url': MediaURL(fields.String, attribute="path"),
}

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

question_fields = {
    'question_id': fields.Integer(attribute='id'),
    'title': fields.String,
    'description': fields.String,
    'option_type': fields.String(default=''),
    'resource': fields.Nested(resource_fields, allow_null=True),
    'points': fields.Integer(default=0),
    'options': fields.Nested(option_fields, attribute='_options',
                             allow_null=True)
}

question_parser = reqparse.RequestParser()
question_parser.add_argument('title', type=unicode, required=True,
                             location=['form', 'json'], default="",
                             help='Title Required')
question_parser.add_argument('description', type=unicode,
                             location=['form', 'json'], default="")
question_parser.add_argument('points', type=int, location=['form', 'json'],
                             default=0)
question_parser.add_argument('quiz_id', type=unicode, required=True,
                             location=['form', 'json'], help='QuizID Required')
question_parser.add_argument('resource',
                             type=werkzeug.datastructures.FileStorage,
                             location='files')
question_parser.add_argument('resource_type', type=unicode,
                             location=['form', 'json'], default=None)
question_parser.add_argument('remove_resource', type=bool,
                             location=['form', 'json'], default=False)


class QuizQuestionApi(Resource):

    method_decorators = [app_subscription_required('QUIZ')]

    def get(self, question_id):

        if not question_id:
            raise SharedemosException(404)

        tenant_id = getattr(current_app, 'tenant_id', None)
        if is_author():
            question = QuizDraftQuestion.query.filter(
                (QuizDraftQuestion.tenant_id == tenant_id) &
                (QuizDraftQuestion.is_enabled.__eq__(True)) &
                (QuizDraftQuestion.is_deleted.__eq__(False)) &
                (QuizDraftQuestion.id == question_id)
            ).first_or_404()
        else:
            question = QuizQuestion.query.filter(
                (QuizQuestion.tenant_id == tenant_id) &
                (QuizQuestion.is_enabled.__eq__(True)) &
                (QuizQuestion.is_deleted.__eq__(False)) &
                (QuizQuestion.id == question_id)
            ).first_or_404()

        locale = get_locale()
        translation = question.get_translation(locale)
        question.title = translation.title
        question.description = translation.description
        if translation.resource:
            question.resource = translation.resource
        return format_data(marshal(question, question_fields)), 200

    @has_author_access
    def post(self):
        post_data = question_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING %
                tenant.default_locale.name)

        quiz = QuizDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=post_data.get('quiz_id'),
            is_enabled=True,
            is_deleted=False
        ).first()

        nth_child = QuizDraftQuestion.query.filter_by(
            tenant_id=tenant_id,
            quiz_id=quiz.id,
            is_deleted=False
        ).order_by(QuizDraftQuestion.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        quiz_question = QuizDraftQuestion()
        quiz_question.tenant_id = tenant_id
        quiz_question.order = order
        if post_data.get('points'):
            quiz_question.points = post_data.get('points')
        else:
            quiz_question.points = 0
        quiz_question.created_by = session.get('user_id')
        quiz_question.modified_by = session.get('user_id')
        quiz_question.quiz = quiz

        translation = QuizDraftQuestionTranslation()
        translation.language_id = session['author']['locale']
        translation.title = post_data.get('title')
        translation.description = post_data.get('description')
        quiz_question.translations.append(translation)

        if post_data.get('resource'):
            resource_hex_name = create_file(post_data['resource'])
            resource = ResourceModel()
            resource.name = unicode(post_data['title'])
            resource.resource_type = unicode(post_data['resource_type'])
            resource.path = resource_hex_name
            resource.tenant_id = tenant_id
            translation.resource = resource
            db.session.add(resource)

        quiz_question.quiz.is_published = False
        quiz_question.is_published = False

        db.session.add(quiz_question)
        db.session.commit()

        translation = quiz_question.get_translation(
            session["author"]["locale"])
        quiz_question.title = translation.title
        quiz_question.description = translation.description
        if translation.resource:
            quiz_question.resource = translation.resource

        return format_data(marshal(quiz_question, question_fields)), 200

    @has_author_access
    def put(self, question_id):

        put_data = question_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_title = re.match(NAME_TITLE_REGEX, put_data.get('title'))
        if invalid_title:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS
                % 'title')

        quiz_question = QuizDraftQuestion.query.filter(
            (QuizDraftQuestion.tenant_id == tenant_id) &
            (QuizDraftQuestion.id == question_id) &
            (QuizDraftQuestion.is_deleted.__eq__(False))
        ).first_or_404()

        trans = quiz_question.get_locale_translation(
            session["author"]["locale"])
        if not trans:
            trans = QuizDraftQuestionTranslation()
            trans.quiz_question_id = quiz_question.id
            trans.language_id = session['author']['locale']

        # Quiz Question translation
        trans.title = put_data['title']
        trans.description = put_data['description']
        trans.quiz_question = quiz_question
        if put_data.get('resource'):
            resource_hex_name = create_file(put_data['resource'])
            resource = ResourceModel()
            resource.name = unicode(put_data['title'])
            resource.resource_type = unicode(put_data['resource_type'])
            resource.path = resource_hex_name
            resource.tenant_id = tenant_id
            trans.resource = resource
            db.session.add(resource)
        elif put_data['remove_resource']:
            trans.resource = None

        quiz_question.points = put_data.get('points')
        quiz_question.modified_by = session.get('user_id')
        quiz_question.quiz.is_published = False
        quiz_question.is_published = False

        db.session.add_all([trans, quiz_question])
        db.session.commit()

        translation = quiz_question.get_translation(
            session["author"]["locale"])
        quiz_question.title = translation.title
        quiz_question.description = translation.description
        if translation.resource:
            quiz_question.resource = translation.resource
        return format_data(marshal(quiz_question, question_fields)), 200

    @has_author_access
    def patch(self, question_id):

        tenant_id = getattr(current_app, 'tenant_id', None)

        quiz_question = QuizDraftQuestion.query.filter_by(
            tenant_id=tenant_id,
            id=question_id,
            is_deleted=False
        ).order_by(QuizDraftQuestion.order.desc()).first()

        quiz_question.option_type = request.json.get('option_type')

        quiz_question.quiz.is_published = False
        quiz_question.is_published = False

        db.session.add(quiz_question)
        db.session.commit()

        return {'status': 'UPDATED'}, 201

    @has_author_access
    def delete(self, question_id):
        tenant_id = getattr(current_app, 'tenant_id', None)

        quiz_question = QuizDraftQuestion.query.filter(
            (QuizDraftQuestion.tenant_id == tenant_id) &
            (QuizDraftQuestion.id == question_id) &
            (QuizDraftQuestion.is_deleted.__eq__(False))
        ).first_or_404()

        quiz_question.is_deleted = True
        quiz_question.modified_by = session.get('user_id')
        quiz_question.quiz.is_published = False
        quiz_question.is_published = False

        db.session.add(quiz_question)
        db.session.commit()

        return {'status': 'DELETED'}, 200
