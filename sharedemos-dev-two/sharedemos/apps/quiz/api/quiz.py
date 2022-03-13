from datetime import datetime
from random import shuffle
import re
import werkzeug

from flask import current_app, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse
from sqlalchemy import event
from sqlalchemy.orm import joinedload

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
from sharedemos.libs.model import (
    model_slugify,
    update_model_slug_revision
)
from sharedemos.libs.helpers import (
    add_date_time,
    create_file,
    copy_file_from_src,
    get_local_time,
    get_utc_time
)
from sharedemos.models import (
    IconLibrary,
    Quiz,
    QuizTranslation,
    QuizActivity,
    QuizQuestion,
    QuizQuestionTranslation,
    QuizMatchingOption,
    QuizMatchingOptionTranslation,
    QuizMultiSelectOption,
    QuizMultiSelectOptionTranslation,
    QuizSortableOption,
    QuizSortableOptionTranslation,
    QuizDraft,
    QuizDraftTranslation,
    QuizDraftMatchingOption,
    QuizDraftMultiSelectOption,
    QuizDraftQuestion,
    QuizDraftSortableOption,
    Tenant,
    UserActivity,
    db,
    create_quiz_slug,
    update_quiz_slug
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

quiz_fields = {
    'quiz_id': fields.Integer(attribute='id'),
    'name': fields.String,
    'description': fields.String,
    'certification': fields.String,
    'icon': fields.Nested(icon_fields, allow_null=True),
    'slug': fields.String,
    'is_sequential_questions': fields.Boolean,
    'time_limit': fields.Integer,
    're_attempts_count': fields.Integer,
    'due_date': fields.String,
    'can_skip': fields.Boolean,
    'grading_style': fields.String,
    'grading_points': fields.Integer,
    'questions_count': fields.Integer,
    'questions': fields.Nested(question_fields, attribute='_questions'),
    'is_unlimited': fields.Boolean(attribute='_is_unlimited'),
    'total_points': fields.Integer(attribute='_total_points')
}


def copy_quiz(quiz, suffix=''):
    """Function to clone entire quiz."""
    try:
        draft_quiz = quiz.duplicate(
            exclude_columns=["modified_by",
                             "created_by", "slug", "is_published"]
        )
        draft_quiz.created_by = session.get('user_id')
        draft_quiz.modified_by = session.get('user_id')
        draft_quiz.is_published = False
        db.session.add(draft_quiz)

        for translation in quiz.translations:
            draft_translation = translation.duplicate(
                exclude_columns=['icon_id', 'quiz_id', 'name']
            )
            draft_translation.name = translation.name + suffix
            draft_translation.quiz = draft_quiz
            if translation.icon_id:
                icon = translation.icon
                copy_status = copy_file_from_src(icon.path)
                if copy_status.get('msg') == 'COPY_ERROR':
                    raise SharedemosException(500, copy_status.get('msg'))
                new_icon = icon.duplicate()
                new_icon.path = copy_status['path']
                draft_translation.icon = new_icon
                db.session.add(new_icon)
            db.session.add(draft_translation)

        for question in quiz.quiz_questions:
            if question.is_deleted:
                continue
            draft_question = question.duplicate(
                exclude_columns=["created_by",
                                 "modified_by", "quiz_id", "is_published"]
            )
            draft_question.created_by = session.get('user_id')
            draft_question.modified_by = session.get('user_id')
            draft_question.is_published = False
            draft_question.quiz = draft_quiz
            db.session.add(draft_question)

            for question_trans in question.translations:
                draft_question_trans = question_trans.duplicate(
                    exclude_columns=['quiz_question_id', 'resource_id']
                )
                draft_question_trans.quiz_question = draft_question
                if question_trans.resource_id:
                    original_resource = question_trans.resource
                    copy_status = copy_file_from_src(original_resource.path)
                    if copy_status.get('msg') == 'COPY_ERROR':
                        raise SharedemosException(500, copy_status.get('msg'))

                    new_res = original_resource.duplicate()
                    new_res.path = copy_status['path']
                    draft_question_trans.resource = new_res
                    db.session.add(new_res)
                db.session.add(draft_question_trans)

            option_type = question.option_type
            if option_type in('single_select', 'multi_select'):
                for option in question.quiz_multiselect_options:
                    if option.is_deleted:
                        continue
                    draft_option = option.duplicate(
                        exclude_columns=['quiz_question_id',
                                         'quiz_id', 'is_published']
                    )
                    draft_option.is_published = False
                    draft_option.quiz_question = draft_question
                    draft_option.quiz = draft_quiz
                    db.session.add(draft_option)

                    for option_translation in option.translations:
                        dr_ot = option_translation.duplicate(
                            exclude_columns=[
                                'quiz_multiselect_option_id', 'icon_id']
                        )
                        dr_ot.quiz_multiselect_option = draft_option
                        if option_translation.icon_id:
                            original_icon = option_translation.icon
                            copy_status = copy_file_from_src(
                                original_icon.path)
                            if copy_status.get('msg') == 'COPY_ERROR':
                                raise SharedemosException(
                                    500, copy_status.get('msg'))
                            option_icon = original_icon.duplicate()
                            option_icon.path = copy_status['path']
                            dr_ot.icon = option_icon
                            db.session.add(option_icon)
                        db.session.add(dr_ot)

            elif option_type == 'matching':
                for matching_option in question.quiz_matching_options:
                    if matching_option.is_deleted:
                        continue
                    dr_mo = matching_option.duplicate(
                        exclude_columns=['quiz_question_id',
                                         'quiz_id', 'is_published']
                    )
                    dr_mo.is_published = False
                    dr_mo.quiz_question = draft_question
                    dr_mo.quiz = draft_quiz
                    db.session.add(dr_mo)

                    for option_trans in matching_option.translations:
                        matching_option_trans = option_trans.duplicate(
                            exclude_columns=['quiz_matching_option_id']
                        )
                        matching_option_trans.quiz_matching_option = dr_mo
                        db.session.add(matching_option_trans)

            elif option_type == 'sortable':
                for sort_option in question.quiz_sortable_options:
                    if sort_option.is_deleted:
                        continue
                    dr_so = sort_option.duplicate(
                        exclude_columns=['quiz_question_id',
                                         'quiz_id', 'is_published']
                    )
                    dr_so.is_published = False
                    dr_so.quiz_question = draft_question
                    dr_so.quiz = draft_quiz
                    db.session.add(dr_so)

                    for sort_opt_trans in sort_option.translations:
                        sort_option_trans = sort_opt_trans.duplicate(
                            exclude_columns=['icon_id',
                                             'quiz_sortable_option_id']
                        )
                        sort_option_trans.quiz_sortable_option = dr_so
                        if sort_opt_trans.icon_id:
                            icon = sort_opt_trans.icon
                            copy_status = copy_file_from_src(icon.path)
                            if copy_status.get('msg') == 'COPY_ERROR':
                                raise SharedemosException(
                                    500, copy_status.get('msg'))
                            sort_icon = icon.duplicate()
                            sort_icon.path = copy_status['path']
                            sort_option_trans.icon = sort_icon
                            db.session.add(sort_icon)
                        db.session.add(sort_option_trans)
        db.session.commit()

    except Exception as e:
        db.session.rollback()
        raise SharedemosException(400, message=str(e))


def change_siblings_order():
    tenant_id = current_app.tenant_id
    quizzes = QuizDraft.query.filter(
        QuizDraft.tenant_id == tenant_id,
        QuizDraft.is_deleted.__eq__(False),
    ).order_by(QuizDraft.order, QuizDraft.created_at).all()
    for order, quiz in enumerate(quizzes, start=1):
        quiz.order = order
        db.session.add(quiz)
    db.session.commit()


def change_order(quizzes, reorder_value):
    for quiz in quizzes:
        published_quiz = quiz.published
        if published_quiz:
            published_quiz.order += reorder_value
            db.session.add(published_quiz)
        quiz.order += reorder_value
        db.session.add(quiz)


def publish_quiz(draft_quiz):
    """Publish quiz."""
    try:
        event.remove(QuizTranslation, 'after_insert', create_quiz_slug)
        event.remove(QuizTranslation, 'after_update', update_quiz_slug)
        draft_quiz_published = draft_quiz.published
        if draft_quiz_published:
            quiz = draft_quiz_published
            quiz.is_deleted = draft_quiz.is_deleted
        else:
            quiz = Quiz()
            quiz.created_by = session.get('user_id')

        tenant_id = draft_quiz.tenant_id
        model_id = getattr(draft_quiz_published, 'id', None)
        new_slug = model_slugify(
            input_text=draft_quiz.slug,
            rec_id=model_id,
            tenant_id=tenant_id,
            primary_model=Quiz,
            secondary_model=QuizDraft,
            slugfield="slug",
            draft_id=draft_quiz.id
        )
        if quiz.slug and quiz.slug != new_slug:
            update_model_slug_revision(
                new_slug=new_slug,
                tenant_id=tenant_id,
                model=quiz
            )
        quiz.draft = draft_quiz
        quiz.order = draft_quiz.order
        quiz.slug = new_slug
        quiz.tenant_id = draft_quiz.tenant_id
        quiz.modified_by = session.get('user_id')
        quiz.is_sequential_questions = draft_quiz.is_sequential_questions
        quiz.can_skip = draft_quiz.can_skip
        quiz.time_limit = draft_quiz.time_limit
        quiz.due_date = draft_quiz.due_date
        quiz.re_attempts_count = draft_quiz.re_attempts_count
        quiz.grading_style = draft_quiz.grading_style
        quiz.grading_points = draft_quiz.grading_points
        quiz.is_enabled = draft_quiz.is_enabled
        draft_quiz.is_published = True

        pub_trans = [tr.language_id for tr in quiz.translations]
        for translation in draft_quiz.translations:
            if translation.language_id not in pub_trans:
                quiz_translation = QuizTranslation()
                quiz_translation.language_id = translation.language_id
                quiz_translation.quiz = quiz
            else:
                quiz_translation = quiz.get_locale_translation(
                    translation.language_id)

            quiz_translation.name = translation.name
            quiz_translation.description = translation.description
            quiz_translation.certification = translation.certification
            quiz_translation.icon = translation.icon

        db.session.add_all([quiz, draft_quiz, quiz_translation])

        draft_questions = draft_quiz.quiz_questions

        draft_quiz_published = draft_quiz.published
        _quiz = draft_quiz_published if draft_quiz_published else quiz

        for draft_question in draft_questions:
            if draft_question.is_published:
                continue

            draft_question_published = draft_question.published
            if draft_question_published:
                question = draft_question_published
            else:
                question = QuizQuestion()
                question.created_by = session.get('user_id')

            question.quiz_id = _quiz.id
            question.draft = draft_question
            question.tenant_id = draft_question.tenant_id
            question.created_by = session.get('user_id')
            question.modified_by = session.get('user_id')
            question.order = draft_question.order
            question.points = draft_question.points
            question.option_type = draft_question.option_type
            question.is_enabled = draft_question.is_enabled
            question.is_deleted = draft_question.is_deleted
            draft_question.is_published = True

            pub_trans = [tr.language_id for tr in question.translations]
            for translation in draft_question.translations:
                if translation.language_id not in pub_trans:
                    question_translation = QuizQuestionTranslation()
                    question_translation.language_id = translation.language_id
                    question_translation.quiz_question = question
                else:
                    question_translation = question.get_locale_translation(
                        translation.language_id
                    )

                question_translation.title = translation.title
                question_translation.description = translation.description
                question_translation.resource = translation.resource

            db.session.add_all(
                [question, draft_question, question_translation])

            _question = question
            draft_question_published = draft_question.published
            if draft_question_published:
                _question = draft_question_published

            if draft_question.option_type in ['single_select', 'multi_select']:
                draft_options = draft_question.quiz_multiselect_options
            elif draft_question.option_type == 'matching':
                draft_options = draft_question.quiz_matching_options
            else:
                draft_options = draft_question.quiz_sortable_options

            for draft_option in draft_options:

                draft_option_published = draft_option.published
                if draft_option_published:
                    option = draft_option_published
                    option.created_by = session.get('user_id')
                else:
                    if draft_question.option_type in [
                            'single_select', 'multi_select']:
                        option = QuizMultiSelectOption()
                    elif draft_question.option_type == 'matching':
                        option = QuizMatchingOption()
                    else:
                        option = QuizSortableOption()
                    option.created_by = session.get('user_id')

                option.quiz_question_id = _question.id
                option.quiz_id = _quiz.id
                option.draft = draft_option
                option.tenant_id = draft_option.tenant_id
                option.modified_by = session.get('user_id')
                option.order = draft_option.order
                option.is_enabled = draft_option.is_enabled
                option.is_deleted = draft_option.is_deleted
                draft_option.is_published = True
                if draft_question.option_type in [
                        'single_select', 'multi_select']:
                    option.is_correct_option = draft_option.is_correct_option
                    if draft_question.option_type == 'single_select':
                        option.is_single_select = draft_option.is_single_select
                elif draft_question.option_type == 'sortable':
                    option.correct_order = draft_option.correct_order

                pub_trans = [tr.language_id for tr in option.translations]
                for translation in draft_option.translations:
                    if translation.language_id not in pub_trans:
                        if draft_question.option_type in [
                                'single_select', 'multi_select']:
                            o_trans = QuizMultiSelectOptionTranslation()
                            o_trans.quiz_multiselect_option = option
                        elif draft_question.option_type == 'matching':
                            o_trans = QuizMatchingOptionTranslation()
                            o_trans.quiz_matching_option = option
                        else:
                            o_trans = QuizSortableOptionTranslation()
                            o_trans.quiz_sortable_option = option
                        o_trans.language_id = translation.language_id
                    else:
                        o_trans = option.get_locale_translation(
                            translation.language_id
                        )

                    if draft_question.option_type in [
                            'single_select', 'multi_select', 'sortable']:
                        o_trans.text = translation.text
                        o_trans.description = translation.description
                        o_trans.icon = translation.icon
                    elif draft_question.option_type == 'matching':
                        o_trans.item_left = translation.item_left
                        o_trans.item_right = translation.item_right

                db.session.add_all([option, draft_option, o_trans])

        db.session.commit()
        return True
    except Exception as e:
        raise SharedemosException(500, message=e.message)
    finally:
        event.listen(QuizTranslation, 'after_insert', create_quiz_slug)
        event.listen(QuizTranslation, 'after_update', update_quiz_slug)


def get_quiz_details(quiz):
    tenant_id = getattr(current_app, 'tenant_id', None)
    locale = get_locale()
    translation = quiz.get_translation(locale)
    quiz.name = translation.name
    quiz.description = translation.description
    quiz.certification = translation.certification
    if translation.icon:
        quiz.icon = translation.icon

    quiz.questions_count = len([question for question in quiz.quiz_questions
                                if question.is_enabled and
                                not question.is_deleted])

    unique_user_id = session['user']['user_id']
    user = UserActivity.query.filter(
        UserActivity.tenant_id == tenant_id,
        UserActivity.unique_user_id == unique_user_id
    ).first()

    quiz_activities = QuizActivity.query.filter(
        (QuizActivity.quiz_id == quiz.id) &
        (QuizActivity.report_user_id == user.id)
    ).with_entities(
        QuizActivity.quiz_session_id,
        QuizActivity.quiz_id,
        QuizActivity.report_user_id
    ).group_by(
        QuizActivity.quiz_session_id,
        QuizActivity.quiz_id,
        QuizActivity.report_user_id
    ).count()

    quiz.attempts_count = quiz_activities
    if quiz.due_date:
        due_date = get_local_time(quiz.tenant.timezone, quiz.due_date)
        quiz.due_date = due_date

    return quiz


quiz_parser = reqparse.RequestParser()
quiz_parser.add_argument('name', type=unicode, required=True,
                         location=['form', 'json'], help='Title Required')
quiz_parser.add_argument('description', type=unicode,
                         location=['form', 'json'],
                         help='Description Required')
quiz_parser.add_argument('certification', type=unicode, required=True,
                         location=['form', 'json'],
                         help='Certification Required')
quiz_parser.add_argument('due_date', type=unicode, required=False,
                         location=['form', 'json'])
quiz_parser.add_argument('is_sequential', type=bool, default=False,
                         location=['form', 'json'])
quiz_parser.add_argument('can_skip', type=bool, default=False,
                         location=['form', 'json'])
quiz_parser.add_argument('time_limit', type=int, location=['form', 'json'])
quiz_parser.add_argument('re_attempts_count', type=int,
                         location=['form', 'json'])
quiz_parser.add_argument('grading_style', type=unicode,
                         location=['form', 'json'])
quiz_parser.add_argument('grading_points', type=int, location=['form', 'json'])
quiz_parser.add_argument('remove_icon', type=bool, location=['form', 'json'],
                         default=False)
quiz_parser.add_argument('icon', type=werkzeug.datastructures.FileStorage,
                         location='files')
quiz_parser.add_argument('is_unlimited', type=bool, default=False,
                         location=['form', 'json'])


class QuizApi(Resource):

    method_decorators = [app_subscription_required('QUIZ')]

    def get(self, slug=None):

        tenant_id = getattr(current_app, 'tenant_id', None)

        author = is_author()
        if slug:
            if author:
                quiz = QuizDraft.query.filter(
                    (QuizDraft.tenant_id == tenant_id) &
                    (QuizDraft.slug == unicode(slug)) &
                    (QuizDraft.is_enabled.__eq__(True)) &
                    (QuizDraft.is_deleted.__eq__(False))
                ).options(
                    joinedload(QuizDraft.translations)
                ).first_or_404()

                quiz_questions = QuizDraftQuestion.query.filter(
                    (QuizDraftQuestion.tenant_id == tenant_id) &
                    (QuizDraftQuestion.quiz == quiz) &
                    (QuizDraftQuestion.is_enabled.__eq__(True)) &
                    (QuizDraftQuestion.is_deleted.__eq__(False))
                ).options(
                    joinedload(QuizDraftQuestion.translations),
                    joinedload(QuizDraftQuestion.quiz_multiselect_options),
                    joinedload(QuizDraftQuestion.quiz_multiselect_options)
                    .joinedload(QuizDraftMultiSelectOption.translations),
                    joinedload(QuizDraftQuestion.quiz_sortable_options),
                    joinedload(QuizDraftQuestion.quiz_sortable_options)
                    .joinedload(QuizDraftSortableOption.translations),
                    joinedload(QuizDraftQuestion.quiz_matching_options),
                    joinedload(QuizDraftQuestion.quiz_matching_options)
                    .joinedload(QuizDraftMatchingOption.translations),
                ).order_by(QuizDraftQuestion.order.asc()).all()
            else:
                quiz = Quiz.query.filter(
                    (Quiz.tenant_id == tenant_id) &
                    (Quiz.slug == unicode(slug)) &
                    (Quiz.is_enabled.__eq__(True)) &
                    (Quiz.is_deleted.__eq__(False))
                ).options(
                    joinedload(Quiz.translations)
                ).first_or_404()

                quiz_questions = QuizQuestion.query.filter(
                    (QuizQuestion.tenant_id == tenant_id) &
                    (QuizQuestion.quiz_id == quiz.id) &
                    (QuizQuestion.is_enabled.__eq__(True)) &
                    (QuizQuestion.is_deleted.__eq__(False))
                ).options(
                    joinedload(QuizQuestion.translations),
                    joinedload(QuizQuestion.quiz_multiselect_options),
                    joinedload(QuizQuestion.quiz_multiselect_options)
                    .joinedload(QuizMultiSelectOption.translations),
                    joinedload(QuizQuestion.quiz_sortable_options),
                    joinedload(QuizQuestion.quiz_sortable_options)
                    .joinedload(QuizSortableOption.translations),
                    joinedload(QuizQuestion.quiz_matching_options),
                    joinedload(QuizQuestion.quiz_matching_options)
                    .joinedload(QuizMatchingOption.translations),
                ).order_by(QuizQuestion.order.asc()).all()

            quiz._total_points = 0
            locale = get_locale()
            for question in quiz_questions:
                quiz._total_points += question.points
                question_translation = question.get_translation(locale)
                question.title = question_translation.title
                question.description = question_translation.description
                if question_translation.resource:
                    question.resource = question_translation.resource

                if question.option_type in ['single_select', 'multi_select']:
                    question.options = question.quiz_multiselect_options
                elif question.option_type == 'sortable':
                    question.options = question.quiz_sortable_options
                else:
                    question.options = question.quiz_matching_options
                    item_right_list = list()

                options = list()
                for option in question.options:
                    if not option.is_deleted:
                        translation = option.get_translation(locale)
                        if question.option_type == 'matching':
                            option.item_left = translation.item_left
                            if not author:
                                item_right_list.append(translation.item_right)
                            else:
                                option.item_right = translation.item_right
                        elif question.option_type in [
                                'single_select', 'multi_select', 'sortable']:
                            option.text = translation.text
                            option.description = translation.description
                            if translation.icon:
                                option.icon = translation.icon
                        options.append(option)

                question._options = options

                if author:
                    if question.option_type == 'sortable':
                        question._options.sort(key=lambda x: x.correct_order)
                    else:
                        question._options.sort(key=lambda x: x.order)
                else:
                    if question.option_type == 'matching':
                        shuffle(item_right_list)
                        shuffled_list = zip(question._options, item_right_list)
                        for item in shuffled_list:
                            item[0].item_right = item[1]
                    else:
                        shuffle(question._options)

            quiz._questions = quiz_questions
            if not quiz.is_sequential_questions and not author:
                shuffle(quiz._questions)

            quiz = get_quiz_details(quiz)
            quiz._is_unlimited = False \
                if quiz.re_attempts_count is not None else True
            quiz_data = format_data(marshal(quiz, quiz_fields)), 200

            if not author:
                if not quiz._is_unlimited and\
                        quiz.attempts_count > quiz.re_attempts_count:
                    # Return Error msg if max attempts reached.
                    quiz_data = {'status': 'attempts'}, 200
                if quiz.due_date and quiz.due_date <= datetime.utcnow():
                    # Return Error msg if the due-date is passed.
                    # 'due_date' error is given priority.
                    quiz_data = {'status': 'due_date'}, 200

            return quiz_data

        if author:
            quizzes = QuizDraft.query.filter(
                (QuizDraft.tenant_id == tenant_id) &
                (QuizDraft.is_enabled.__eq__(True)) &
                (QuizDraft.is_deleted.__eq__(False))
            ).order_by(QuizDraft.order, QuizDraft.modified_at.desc()).all()
        else:
            quizzes = Quiz.query.filter(
                (Quiz.tenant_id == tenant_id) &
                (Quiz.is_enabled.__eq__(True)) &
                (Quiz.is_deleted.__eq__(False))
            ).order_by(Quiz.order, Quiz.modified_at.desc()).all()

        all_quiz = list()
        for quiz in quizzes:
            quiz = get_quiz_details(quiz)
            all_quiz.append(quiz)
        all_quiz.sort(key=lambda x: x.order)

        return format_data(marshal(all_quiz, quiz_fields)), 200

    @has_author_access
    def post(self):
        post_data = quiz_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412, message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        nth_child = QuizDraft.query.filter_by(
            tenant_id=tenant_id,
            is_enabled=True,
            is_deleted=False
        ).order_by(QuizDraft.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        quiz = QuizDraft()
        quiz.tenant_id = tenant_id
        quiz.order = order
        quiz.created_by = session.get('user_id')
        quiz.modified_by = session.get('user_id')
        quiz.is_sequential_questions = post_data.get('is_sequential')
        quiz.can_skip = post_data.get('can_skip')
        quiz.time_limit = post_data.get('time_limit')
        if post_data.get('due_date'):
            due_date = datetime.strptime(post_data.get('due_date'), '%d/%m/%Y')
            due_date = add_date_time(due_date, days=1, seconds=-1)
            due_date = get_utc_time(tenant.timezone, due_date)
            quiz.due_date = due_date
        quiz.re_attempts_count = post_data.get('re_attempts_count')
        quiz.grading_style = post_data.get('grading_style')
        quiz.grading_points = post_data.get('grading_points')

        translation = QuizDraftTranslation()
        translation.language_id = session['author']['locale']
        translation.name = post_data.get('name')
        translation.description = post_data.get('description')
        translation.certification = post_data.get('certification')
        quiz.translations.append(translation)

        if post_data.get('icon'):
            icon_hex_name = create_file(post_data['icon'])
            icon = IconLibrary()
            icon.name = unicode(post_data['name'])
            icon.path = icon_hex_name
            icon.tenant_id = tenant_id
            translation.icon = icon
            db.session.add(icon)

        quiz.is_published = False

        db.session.add(quiz)
        db.session.commit()

        quiz = get_quiz_details(quiz)
        return format_data(marshal(quiz, quiz_fields)), 200

    @has_author_access
    def put(self, slug):
        put_data = quiz_parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        invalid_name = re.match(NAME_TITLE_REGEX, put_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS %
                'name')

        quiz = QuizDraft.query.filter(
            (QuizDraft.tenant_id == tenant_id) &
            (QuizDraft.slug == unicode(slug)) &
            (QuizDraft.is_enabled.__eq__(True)) &
            (QuizDraft.is_deleted.__eq__(False))
        ).options(
            joinedload(QuizDraft.translations)
        ).first_or_404()

        quiz.modified_by = session.get('user_id')
        quiz.is_sequential_questions = put_data.get('is_sequential')
        quiz.can_skip = put_data.get('can_skip')
        quiz.time_limit = put_data.get('time_limit')

        quiz.due_date = None
        if put_data.get("due_date"):
            due_date = datetime.strptime(put_data.get('due_date'), '%d/%m/%Y')
            due_date = add_date_time(due_date, days=1, seconds=-1)
            due_date = get_utc_time(quiz.tenant.timezone, due_date)
            quiz.due_date = due_date
        quiz.re_attempts_count = put_data.get('re_attempts_count')
        quiz.grading_style = put_data.get('grading_style')
        quiz.grading_points = put_data.get('grading_points')

        translation = quiz.get_locale_translation(session["author"]["locale"])
        if not translation:
            translation = QuizDraftTranslation()
            translation.quiz = quiz
            translation.language_id = session['author']['locale']

        translation.name = put_data.get('name')
        translation.description = put_data.get('description')
        translation.certification = put_data.get('certification')

        if put_data.get('icon'):
            icon_hex_name = create_file(put_data['icon'])
            icon = IconLibrary()
            icon.name = unicode(put_data['name'])
            icon.path = icon_hex_name
            icon.tenant_id = tenant_id
            translation.icon = icon
            db.session.add(icon)
        elif put_data['remove_icon']:
            translation.icon = None

        quiz.is_published = False

        db.session.add_all([translation, quiz])
        db.session.commit()

        quiz = get_quiz_details(quiz)
        return format_data(marshal(quiz, quiz_fields)), 200

    @has_author_access
    def patch(self, slug):

        tenant_id = getattr(current_app, 'tenant_id', None)

        draft_quiz = QuizDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first()

        if request.json.get('publish'):
            if not draft_quiz.is_published:
                publish_quiz(draft_quiz)
                return {'status': 'PUBLISHED'}, 201
            else:
                return {'status': 'NOT PUBLISHED'}, 201

        if request.json.get("reorder"):
            current_quiz = draft_quiz
            after_ele_slug = request.json.get('after_ele_slug')
            if after_ele_slug:
                after_quiz = QuizDraft.query.filter_by(
                    tenant_id=tenant_id,
                    slug=after_ele_slug,
                    is_deleted=False
                ).first()

                if after_quiz.order < current_quiz.order:
                    order = after_quiz.order + 1
                else:
                    order = after_quiz.order
            else:
                order = 1

            quizzes = QuizDraft.query.filter(
                QuizDraft.tenant_id == tenant_id,
                QuizDraft.is_deleted.__eq__(False),
            )

            """
                If after_ele_slug is None, the order of the current_quiz is 1
                i.e the current_quiz is placed on top,
            """
            if order == 1:
                from_order = 1
                to_order = current_quiz.order - 1
                reorder = 1
            elif after_quiz.order < order:
                from_order = after_quiz.order + 1
                to_order = current_quiz.order - 1
                reorder = 1
            else:
                from_order = current_quiz.order + 1
                to_order = after_quiz.order
                reorder = -1

            quizzes = quizzes.filter(
                QuizDraft.order.between(from_order, to_order)
            ).all()
            change_order(quizzes, reorder)

            current_quiz_published = current_quiz.published
            if current_quiz_published:
                current_quiz_published.order = order
                db.session.add(current_quiz_published)

            current_quiz.order = order
            db.session.add(current_quiz)
            db.session.commit()

            return {'status': 'UPDATED'}, 201

        if request.json.get("copy"):
            copy_quiz(draft_quiz, suffix=' (1)')
            change_siblings_order()

    @has_author_access
    def delete(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)

        draft_quiz = QuizDraft.query.filter_by(
            tenant_id=tenant_id,
            slug=slug,
            is_deleted=False
        ).first_or_404()

        draft_quiz.is_deleted = True
        draft_quiz.modified_by = session.get('user_id')
        draft_quiz.is_published = False

        draft_quiz_published = draft_quiz.published
        if draft_quiz_published:
            draft_quiz_published.is_deleted = True
            db.session.add(draft_quiz_published)

        db.session.add(draft_quiz)
        db.session.commit()

        return {'status': 'DELETED'}, 200
