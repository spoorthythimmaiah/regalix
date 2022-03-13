from datetime import datetime

from flask import (
    Blueprint,
    abort,
    current_app,
    g, jsonify,
    request,
    session
)

from sqlalchemy.orm import joinedload

from sharedemos.libs.api import is_author
from sharedemos.libs.decorators import check_bot
from sharedemos.libs.helpers import (
    get_translation
)
from sharedemos.libs.utils import get_latest_entity
from sharedemos.models import (
    db, AudioVideoAnalytics,
    Checklist,
    CheckListItemActivity,
    CTAActivity,
    Path,
    PathFinderActivity,
    Quiz,
    QuizActivity,
    QuizQuestion,
    QuizQuestionActivity,
    QuizMatchingOption,
    QuizMultiSelectOption,
    QuizSortableOption,
    Resource,
    SampleExchangeActivity,
    Section,
    SlugRevision,
    Tenant,
    UserActivity,
    VisitActivity,
    Walkthrough,
    WalkthroughActivity
)

activity_log = Blueprint('activity_log', __name__)


@activity_log.route('/audio-video-analytics', methods=['POST'])
@check_bot
def audio_video_analytics():
    """Function to log Audio-Video Events like play, pause, end."""
    try:
        input_data = request.json
        tenant_id = getattr(current_app, 'tenant_id', None)
        user_id = session.get('user').get('user_id')
        user = UserActivity.query.filter_by(
            unique_user_id=user_id
        ).first_or_404()

        walkthrough = Walkthrough.query.filter_by(
            slug=input_data.get('walkthrough')
        ).first_or_404()

        resource = Resource.query.filter(
            Resource.path == input_data.get('resource'),
            Resource.tenant_id == tenant_id
        ).first()

        av_analytics_model = AudioVideoAnalytics()
        av_analytics_model.tenant_id = tenant_id
        av_analytics_model.report_user_id = user.id
        av_analytics_model.walkthrough_id = walkthrough.id
        av_analytics_model.resource_id = resource.id
        av_analytics_model.events = input_data.get('events')

        db.session.add(av_analytics_model)
        db.session.commit()

        return 'SUCCESS'

    except Exception:
        return 'FAILED'


@activity_log.route('/cta-analytics', methods=['POST'])
@check_bot
def cta_analytics():
    """Log CTA activity."""
    try:
        tenant_id = getattr(current_app, 'tenant_id', None)
        user_id = session.get('user').get('user_id')
        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        cta_activity = CTAActivity()
        cta_activity.cta_id = int(request.json.get('cta_id'))
        cta_activity.user_id = user.id
        cta_activity.tenant_id = tenant_id
        cta_activity.language_id = session['user']['locale']

        product = section = walkthrough = None
        if request.json.get('product'):
            product = get_latest_entity(slug=unicode(request.json['product']),
                                        entity_type=unicode("product"))
        if request.json.get('chapter'):
            walkthrough = get_latest_entity(
                slug=unicode(request.json['chapter']),
                entity_type=unicode("walkthrough")
            )
        if request.json.get('section'):
            section = get_latest_entity(slug=unicode(request.json['section']),
                                        entity_type=unicode("section"))

        if product:
            cta_activity.product_id = product.id
        if section:
            cta_activity.section_id = section.id
        if walkthrough:
            cta_activity.walkthrough_id = walkthrough.id

        db.session.add(cta_activity)
        db.session.commit()

        return 'SUCCESS'

    except Exception:
        return 'FAILED'


@activity_log.route('/checklist-item-activity', methods=['POST'])
@check_bot
def checklist_item_activity():
    """Log checklist activity for user."""
    try:
        checklist_data = request.json
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        user_id = session.get('user').get('user_id')

        checklist_user_activity = CheckListItemActivity()

        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        checklist = Checklist.query.filter(
            (Checklist.tenant_id == tenant_id) &
            (Checklist.slug == checklist_data.get('checklist_slug')) &
            (Checklist.is_enabled.__eq__(True)) &
            (Checklist.is_deleted.__eq__(False))
        ).first()

        locale_requested = session.get('user').get('locale')
        is_locale_available = checklist.is_locale_available(locale_requested)
        locale_served = tenant.default_locale_id
        if is_locale_available:
            locale_served = locale_requested

        checklist_user_activity.tenant_id = tenant_id
        checklist_user_activity.report_user_id = user.id
        checklist_user_activity.checklist_slug = checklist.id
        checklist_user_activity.checklist_id = checklist_data.get(
            'checklist_id')
        checklist_user_activity.checklist_section_id = checklist_data.get(
            'checklist_section_id')
        checklist_user_activity.check_list_item_id = checklist_data.get(
            'checklist_item_id')
        checklist_user_activity.session_id = checklist_data.get(
            'checklist_session_id')
        checklist_user_activity.locale_requested_code = locale_requested
        checklist_user_activity.locale_served_code = locale_served
        checklist_user_activity.is_done = checklist_data.get('is_done')

        db.session.add(checklist_user_activity)
        db.session.commit()

        return 'SUCCESS'
    except Exception:
        return 'FAILED'


@activity_log.route('/path-finder-activity', methods=['POST'])
@check_bot
def path_finder_activity():
    """Log path activity for user."""
    try:
        path_data = request.json
        tenant_id = getattr(current_app, 'tenant_id', None)
        user_id = session.get('user').get('user_id')

        path_activity = PathFinderActivity()

        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        path = Path.query.filter(
            Path.tenant_id == tenant_id,
            Path.slug == path_data.get('path_id'),
        ).first()

        if not path:
            old_path = SlugRevision.query.filter(
                (SlugRevision.tenant_id == tenant_id) &
                (SlugRevision.entity_type == unicode("path")) &
                (SlugRevision.old_slug == path_data.get('path_id'))
            ).first_or_404()
            if old_path:
                path = Path.query.filter(
                    Path.tenant_id == tenant_id,
                    Path.slug == old_path.new_slug,
                ).first()

        path_activity.tenant_id = tenant_id
        path_activity.report_user_id = user.id
        path_activity.path_id = path.id
        path_activity.option_id = path_data.get('option_id')
        path_activity.event_type = path_data.get('entityType')

        db.session.add(path_activity)
        db.session.commit()

        return 'SUCCESS'
    except Exception, e:
        current_app.logger.exception(e)
        return 'FAILED'


@activity_log.route('/quiz-activity', methods=['POST'])
@check_bot
def quiz_activity():
    """Log quiz activity for user."""
    try:
        quiz_data = request.json
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        user_id = session.get('user').get('user_id')
        quiz_session_id = quiz_data.get('quiz_session_id')

        quiz_user_activity = QuizActivity()

        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        quiz = Quiz.query.filter(
            (Quiz.tenant_id == tenant_id) &
            (Quiz.slug == unicode(quiz_data.get('quiz_slug'))) &
            (Quiz.is_enabled.__eq__(True)) &
            (Quiz.is_deleted.__eq__(False))
        ).options(
            joinedload(Quiz.translations),
            joinedload(Quiz.quiz_questions),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.translations),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_multiselect_options),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_multiselect_options
            ).joinedload(QuizMultiSelectOption.translations),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_sortable_options),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_sortable_options
            ).joinedload(QuizSortableOption.translations),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_matching_options),
            joinedload(Quiz.quiz_questions).joinedload(
                QuizQuestion.quiz_matching_options
            ).joinedload(QuizMatchingOption.translations),
        ).first()

        obtained_marks = 0
        correct_answer_count = 0
        total_marks = 0

        activities = QuizQuestionActivity.query.filter(
            (QuizQuestionActivity.tenant_id == tenant_id) &
            (QuizQuestionActivity.report_user_id == user.id) &
            (QuizQuestionActivity.quiz_id == quiz.id) &
            (QuizQuestionActivity.quiz_session_id == quiz_session_id)
        ).join(
            QuizQuestion
        ).filter(
            QuizQuestion.is_deleted.__eq__(False),
            QuizQuestion.is_enabled.__eq__(True)
        ).with_entities(
            QuizQuestion.points,
            QuizQuestionActivity.is_correct_option
        ).all()

        for _a in activities:
            total_marks += _a.points
            if _a.is_correct_option:
                obtained_marks += _a.points
                correct_answer_count += 1

        locale_requested = session.get('user').get('locale')
        is_locale_available = quiz.is_locale_available(locale_requested)
        locale_served = locale_requested if is_locale_available else\
            tenant.default_locale_id

        time_taken_sec = 0
        time_taken = None
        if quiz_data.get('time_left'):
            time_left_data = quiz_data.get('time_left')
            time_taken_sec = datetime.strptime(str(quiz.time_limit), '%M') \
                - datetime.strptime(time_left_data, '%M:%S')

            time_taken_min, time_taken_sec = divmod(time_taken_sec.seconds, 60)
            time_taken = str(int(time_taken_min)) + ' : ' + \
                str(int(time_taken_sec))

        quiz_user_activity.quiz_session_id = quiz_session_id
        quiz_user_activity.tenant_id = tenant_id
        quiz_user_activity.report_user_id = user.id
        quiz_user_activity.quiz_id = quiz.id
        quiz_user_activity.total_questions_count = quiz_data.get(
            'total_questions_count')
        quiz_user_activity.attempted_questions_count = quiz_data.get(
            'attempted_questions_count')
        quiz_user_activity.skipped_questions_count = quiz_data.get(
            'skipped_questions_count')
        quiz_user_activity.time_taken = time_taken_sec
        quiz_user_activity.is_timeout = quiz_data.get('is_timeout', False)
        quiz_user_activity.locale_requested_code = locale_requested
        quiz_user_activity.locale_served_code = locale_served
        quiz_user_activity.score = obtained_marks
        quiz_user_activity.correct_answer_count = correct_answer_count

        db.session.add(quiz_user_activity)
        db.session.commit()

        quiz_activity_dict = dict()
        quiz_activity_dict['total_questions_count'] = quiz_data.get(
            'total_questions_count')
        quiz_activity_dict['attempted_questions_count'] = quiz_data.get(
            'attempted_questions_count')
        quiz_activity_dict['skipped_questions_count'] = quiz_data.get(
            'skipped_questions_count')
        if time_taken is not None:
            quiz_activity_dict['time_taken'] = time_taken
        quiz_activity_dict['grading_style'] = quiz.grading_style
        if quiz.grading_style == 'points':
            quiz_activity_dict['result'] = correct_answer_count
        else:
            if obtained_marks >= quiz.grading_points:
                quiz_activity_dict['result'] = 'Pass'
            else:
                quiz_activity_dict['result'] = 'Fail'
        quiz_activity_dict['marks'] = obtained_marks

        return jsonify(quiz_activity_dict)
    except Exception:
        return 'FAILED'


@activity_log.route('/quiz-question-activity', methods=['POST'])
@check_bot
def quiz_question_activity():
    """Log quiz question activity for user."""
    try:
        quiz_data = request.json
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        user_id = session.get('user').get('user_id')
        question_id = int(quiz_data['question_id'])
        session_id = quiz_data['quiz_session_id']

        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        quiz = Quiz.query.filter(
            (Quiz.tenant_id == tenant_id) &
            (Quiz.slug == unicode(quiz_data.get('quiz_slug'))) &
            (Quiz.is_enabled.__eq__(True)) &
            (Quiz.is_deleted.__eq__(False))
        ).options(
            joinedload(Quiz.translations),
        ).first()

        quiz_question = QuizQuestion.query.filter(
            (QuizQuestion.tenant_id == tenant_id) &
            (QuizQuestion.id == question_id) &
            (QuizQuestion.is_enabled.__eq__(True)) &
            (QuizQuestion.is_deleted.__eq__(False))
        ).options(
            joinedload(QuizQuestion.translations),
            joinedload(QuizQuestion.quiz_multiselect_options),
            joinedload(QuizQuestion.quiz_multiselect_options).joinedload(
                QuizMultiSelectOption.translations),
            joinedload(QuizQuestion.quiz_sortable_options),
            joinedload(QuizQuestion.quiz_sortable_options).joinedload(
                QuizSortableOption.translations),
            joinedload(QuizQuestion.quiz_matching_options),
            joinedload(QuizQuestion.quiz_matching_options).joinedload(
                QuizMatchingOption.translations),
        ).first()

        if quiz_question.option_type in ['single_select', 'multi_select']:
            question_options = quiz_question.quiz_multiselect_options
        elif quiz_question.option_type == 'matching':
            question_options = quiz_question.quiz_matching_options
        else:
            question_options = quiz_question.quiz_sortable_options

        is_correct = True
        option_type = request.json.get('option_type')
        options_data = request.json.get('options_data')
        selected_options = options_data.get('options')

        if option_type in [u'matching', u'sortable']:
            if len(selected_options) > 0:
                for option in selected_options:
                    for key, val in option.iteritems():
                        option_id = int(key.split('_')[1])
                        for ques_option in question_options:
                            if option_id == ques_option.id:
                                if option_type == 'matching':
                                    tr = get_translation(ques_option)
                                    if tr.item_left != val.get('item_left') or\
                                            tr.item_right != val.get(
                                            'item_right'):
                                        is_correct = False
                                else:
                                    if not ques_option.correct_order == val:
                                        is_correct = False
                            if not is_correct:
                                break
            else:
                is_correct = False
        else:
            question_options.sort(
                key=lambda x: x.is_correct_option, reverse=True)
            correct_options_length = sum(
                option.is_correct_option for option in question_options)
            if len(selected_options) >= correct_options_length:
                for option in question_options:
                    for option_id in selected_options:
                        if option.id == option_id:
                            if not option.is_correct_option:
                                is_correct = False
                        if not is_correct:
                            break
                    if not is_correct:
                        break
            else:
                is_correct = False

        locale_requested = session.get('user').get('locale')
        is_locale_available = quiz_question.is_locale_available(
            locale_requested)
        locale_served = locale_requested if is_locale_available else \
            tenant.default_locale_id

        quiz_question_user_activity = QuizQuestionActivity.query.filter(
            QuizQuestionActivity.tenant_id == tenant_id,
            QuizQuestionActivity.report_user_id == user.id,
            QuizQuestionActivity.quiz_id == quiz.id,
            QuizQuestionActivity.quiz_question_id == question_id,
            QuizQuestionActivity.quiz_session_id == session_id
        ).first()
        if not quiz_question_user_activity:
            quiz_question_user_activity = QuizQuestionActivity()
            quiz_question_user_activity.tenant_id = tenant_id
            quiz_question_user_activity.report_user_id = user.id
            quiz_question_user_activity.quiz_id = quiz.id
            quiz_question_user_activity.quiz_question_id = quiz_question.id
            quiz_question_user_activity.quiz_session_id = session_id

        quiz_question_user_activity.answers = options_data
        quiz_question_user_activity.answer_type = option_type
        quiz_question_user_activity.locale_requested_code = locale_requested
        quiz_question_user_activity.locale_served_code = locale_served
        quiz_question_user_activity.is_correct_option = is_correct

        db.session.add(quiz_question_user_activity)
        db.session.commit()

        return 'SUCCESS'
    except Exception:
        return 'FAILED'


@activity_log.route('/visit-activity', methods=['POST'])
@check_bot
def visit_activity():
    """Log visit activity for user."""
    try:
        tenant_id = getattr(current_app, 'tenant_id', None)
        user_id = session.get('user').get('user_id')
        user = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        if not user:
            return 'SUCCESS', 200

        visit_data = request.json
        tenant = Tenant.query.get(tenant_id)
        product = section = walkthrough = None

        if visit_data.get('product'):
            product = get_latest_entity(slug=unicode(visit_data['product']),
                                        entity_type=unicode("product"))
        if visit_data.get('walkthrough'):
            walkthrough = get_latest_entity(
                slug=unicode(visit_data['walkthrough']),
                entity_type=unicode("walkthrough")
            )
        if visit_data.get('section'):
            section = get_latest_entity(slug=unicode(visit_data['section']),
                                        entity_type=unicode("section"))

        # Skip logging activity if section not exist under the product
        if product and section:
            prod = section.get_category()
            if prod.id != product.id:
                return 'FAILED'

        locale_requested = session.get('user').get('locale')

        visit_entity = walkthrough or section or product

        if visit_entity:
            is_locale_available = visit_entity.is_locale_available(
                locale_requested)
            locale_served = locale_requested if is_locale_available \
                else tenant.default_locale_id
        else:
            locale_requested = None
            locale_served = None

        v_activity = VisitActivity()

        v_activity.tenant_id = tenant_id
        v_activity.report_user_id = user.id
        v_activity.product_id = product.id if product else None
        v_activity.section_id = (section.id if section else None) or\
            (product.id if product else None)
        v_activity.walkthrough_id = walkthrough.id if walkthrough else None

        v_activity.locale_requested_code = locale_requested
        v_activity.locale_served_code = locale_served

        db.session.add(v_activity)
        db.session.commit()

        from sharedemos.tasks import add_user_activity
        add_user_activity.delay({
            'tenant_id': user.tenant_id,
            'user_id': user.id,
            'visit_activity_date': str(v_activity.created_at),
            'product_id': product.id if product else None,
            'section_id': v_activity.section_id,
            'walkthrough_id': walkthrough.id if walkthrough else None
        })

        return 'SUCCESS'
    except Exception, e:
        current_app.logger.exception(e)
        return 'FAILED'


@activity_log.route('/sample-exchange-activity', methods=['POST'])
@check_bot
def sample_exchange_activity():
    """
    Log sample-exchange activity.

    Record activity on sample-exchange home page.
    Record activity on individual sample-exchange.
    Logs user's session id.
    """
    try:
        tenant_id = current_app.tenant_id
        user_id = session.get('user', {}).get('user_id')
        user_activity = UserActivity.query.filter(
            UserActivity.tenant_id == tenant_id,
            UserActivity.unique_user_id == user_id
        ).first()

        if not user_activity:
            return 'USERACTIVITY NOT FOUND', 404

        visit_data = request.json
        """
        visit_data will be None if request is from sample-exchange home page.
        If request is from individual sample then,
        visit_data will contain sample ID, NAME and AUTHOR details.
        """

        se_activity = SampleExchangeActivity()
        se_activity.tenant_id = tenant_id
        se_activity.report_user_id = user_activity.id
        if visit_data:
            se_activity.sample_id = visit_data.get('sample_id')
            se_activity.name = visit_data.get('sample_name')
            se_activity.author = visit_data.get('sample_author')

        db.session.add(se_activity)
        db.session.commit()

        return 'SUCCESS'

    except Exception, e:
        current_app.logger.exception(e)
        return 'FAILED'


@activity_log.route('/walkthrough-activity', methods=['POST'])
@activity_log.route('/walkthrough-activity/<int:activity_id>', methods=['PUT'])
@check_bot
def walkthrough_activity(activity_id=None):
    """
    Log walkthrough activity for user.

    NOTE: Change in any logic here should also
    change logic in logging to report database.
    """
    try:
        # format input data
        input_data = request.json
        slide_index = int(input_data.get('slide_index', 0))
        walkthrough_slug = input_data.get('walkthrough')
        if is_author():
            input_data['id'] = slide_index or 1
            walkthrough = get_latest_entity(
                slug=walkthrough_slug,
                entity_type=unicode("draft_walkthrough")
            )
            sl_count = len(
                [sl for sl in walkthrough.slides if not sl.is_deleted])
            input_data['percentage'] = int(
                round((slide_index / float(sl_count or 1)), 2) * 100
            ) if walkthrough else 0
            return jsonify(input_data)

        if request.method == 'POST':
            locale_requested = session.get('user').get('locale')
            parent_slug = input_data.get('product')
            section_slug = input_data.get('section')
            user_id = session.get('user').get('user_id')
            tenant_id = getattr(current_app, 'tenant_id', None)

            # get activity and section details
            parent = Section.query.filter_by(
                tenant_id=tenant_id,
                slug=parent_slug,
                is_deleted=False
            ).first()
            if not parent:
                g.error_message = 'NOT FOUND - PRODUCT ' + parent_slug
                abort(404)

            # check for one level deep chapters/demos
            if not section_slug or section_slug == parent_slug:
                section = parent
            else:
                section = Section.query.filter_by(
                    tenant_id=tenant_id,
                    slug=section_slug,
                    is_deleted=False
                ).first()
                if not section:
                    g.error_message = 'NOT FOUND - SECTION ' + section_slug
                    abort(404)
            walkthrough = Walkthrough.query.filter_by(
                tenant_id=tenant_id,
                slug=walkthrough_slug,
                is_deleted=False
            ).first()
            if not walkthrough:
                g.error_message = 'NOT FOUND - DEMO ' + walkthrough_slug
                abort(404)

            wt_activity = WalkthroughActivity()
            db.session.add(wt_activity)
            db.session.commit()

            from sharedemos.tasks import log_walkthrough_activity
            log_walkthrough_activity.delay({
                'activity_id': wt_activity.id,
                'product_id': parent.id,
                'section_id': section.id,
                'walkthrough_id': walkthrough.id,
                'user_session_id': user_id,
                'slide_index': slide_index,
                'tenant_id': tenant_id,
                'locale_requested': locale_requested,
                'current_time': str(wt_activity.created_at)
            })

            return jsonify(**{"id": wt_activity.id})

        elif request.method == 'PUT':
            activity = WalkthroughActivity.query.get(activity_id)
            activity.duration = input_data.get('duration', 0)
            db.session.add(activity)
            db.session.commit()

            return 'SUCCESS'
    except Exception, e:
        current_app.logger.exception(e)
        return "FAILED"
