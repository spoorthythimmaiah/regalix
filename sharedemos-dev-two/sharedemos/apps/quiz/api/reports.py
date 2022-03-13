from dateutil import parser

from flask import current_app, jsonify, request
from flask.ext.restful import Resource
from sqlalchemy import func

from sharedemos.libs.decorators import app_subscription_required
from sharedemos.libs.exceptions import SharedemosException

from sharedemos.models import (
    Quiz,
    QuizTranslation,
    QuizActivity,
    QuizQuestion,
    QuizQuestionTranslation,
    QuizQuestionActivity,
    Tenant,
    User,
    UserActivity
)


class Reports(object):

    def get_quizzes(self):
        return Quiz.query.join(
            QuizTranslation
        ).join(
            QuizQuestion, QuizQuestion.quiz_id == Quiz.id
        ).join(
            Tenant, Quiz.tenant_id == Tenant.id
        ).filter(
            Quiz.tenant_id == current_app.tenant_id,
            Quiz.is_enabled.__eq__(True),
            Quiz.is_deleted.__eq__(False),
            QuizQuestion.is_enabled.__eq__(True),
            QuizQuestion.is_deleted.__eq__(False),
            QuizTranslation.language_id == Tenant.default_locale_id
        ).with_entities(
            Quiz.id,
            Quiz.due_date,
            Quiz.grading_points,
            Quiz.grading_style,
            QuizTranslation.name,
            func.count(QuizQuestion.id).label("total_questions")
        ).order_by(
            Quiz.order
        ).group_by(
            Quiz.id,
            QuizTranslation.name
        ).all()

    def get_quiz_activities(self, quiz_id=None):
        base_query = QuizActivity.query.join(
            UserActivity
        ).join(
            User
        ).join(
            Quiz, QuizActivity.quiz_id == Quiz.id
        ).filter(
            QuizActivity.tenant_id == current_app.tenant_id,
            Quiz.is_enabled.__eq__(True),
            Quiz.is_deleted.__eq__(False)
        )

        if quiz_id:
            base_query = base_query.filter(
                Quiz.id == quiz_id
            )

        if request.args.get("from_date"):
            from_date = parser.parse(request.args.get("from_date"))
            base_query = base_query.filter(
                QuizActivity.created_at.__gt__(from_date)
            )

        if request.args.get("to_date"):
            to_date = parser.parse(request.args.get("to_date"))
            base_query = base_query.filter(
                QuizActivity.created_at.__lt__(to_date)
            )

        return base_query.with_entities(
            QuizActivity.quiz_id,
            QuizActivity.quiz_session_id.label("session_id"),
            QuizActivity.correct_answer_count.label("correct_answers"),
            QuizActivity.total_questions_count.label("total_questions"),
            QuizActivity.score,
            QuizActivity.created_at,
            QuizActivity.time_taken,
            UserActivity.user_id,
            User.first_name,
            User.last_name
        ).order_by(
            QuizActivity.created_at.desc()
        ).all()

    def get_question_activities(self, quiz_id, session_ids=None):
        base_query = QuizQuestionActivity.query.filter(
            QuizQuestionActivity.tenant_id == current_app.tenant_id,
            QuizQuestionActivity.quiz_id == quiz_id,
        ).join(
            UserActivity
        )

        if session_ids:
            base_query = base_query.filter(
                QuizQuestionActivity.quiz_session_id.in_(session_ids)
            )

        return base_query.with_entities(
            QuizQuestionActivity.quiz_question_id.label("question_id"),
            QuizQuestionActivity.is_correct_option.label("is_correct"),
            UserActivity.user_id
        ).all()

    def get_all(self):
        q_activities = self.get_quiz_activities()

        # Get all users who started quiz
        base_query = QuizQuestionActivity.query.join(
            UserActivity
        ).join(
            User
        ).filter(
            QuizQuestionActivity.tenant_id == current_app.tenant_id
        )

        if request.args.get("from_date"):
            from_date = parser.parse(request.args.get("from_date"))
            base_query = base_query.filter(
                QuizQuestionActivity.created_at.__gt__(from_date)
            )

        if request.args.get("to_date"):
            to_date = parser.parse(request.args.get("to_date"))
            base_query = base_query.filter(
                QuizQuestionActivity.modified_at.__lt__(to_date)
            )

        users_started = base_query.with_entities(
            func.count(
                func.distinct(
                    User.id
                )
            ).label("users")
        ).first()

        users_passed_quiz = {}
        users_submitted_quiz = set()
        quizzes = {_q.id: _q._asdict() for _q in self.get_quizzes()}
        for _a in q_activities:
            # consider passed if grading style is pass/fail
            # and grading points are defined
            _q = quizzes[_a.quiz_id]
            if _q["grading_style"] == "pass_or_fail" and _q["grading_points"]\
                    and _a.score > _q["grading_points"]:
                if _a.quiz_id not in users_passed_quiz:
                    users_passed_quiz[_a.quiz_id] = set()
                users_passed_quiz[_a.quiz_id].add(_a.user_id)

            # Log participant for a quiz
            if "users" not in quizzes[_a.quiz_id]:
                quizzes[_a.quiz_id]["users"] = set()
            quizzes[_a.quiz_id]["users"].add(_a.user_id)
            users_submitted_quiz.add(_a.user_id)

        quiz_list = []
        for _qid, _qdata in quizzes.iteritems():
            avg_passed = None
            total_users = len(quizzes[_qid].get("users", []))

            if _qdata["grading_style"] == "pass_or_fail" and\
                    _qdata["grading_points"]:
                users_passed = len(users_passed_quiz.get(_qid, []))
                avg_passed = int(users_passed / float(total_users or 1) * 100)

            _qdata.update({
                "users": total_users,
                "average_passing": avg_passed,
                "due_date": _qdata["due_date"].isoformat()
                if _qdata["due_date"] else None
            })
            quiz_list.append(_qdata)

        return {
            "list": quiz_list,
            "users": {
                "started": users_started.users,
                "submitted": len(users_submitted_quiz)
            }
        }

    def get_questions(self, quiz_id):
        return QuizQuestion.query.join(
            QuizQuestionTranslation
        ).join(
            Tenant, QuizQuestion.tenant_id == Tenant.id
        ).filter(
            QuizQuestion.tenant_id == current_app.tenant_id,
            QuizQuestion.quiz_id == quiz_id,
            QuizQuestion.is_enabled.__eq__(True),
            QuizQuestion.is_deleted.__eq__(False),
            QuizQuestionTranslation.language_id == Tenant.default_locale_id
        ).with_entities(
            QuizQuestion.id,
            QuizQuestion.order,
            QuizQuestion.points,
            QuizQuestionTranslation.title
        ).order_by(
            QuizQuestion.order
        ).all()

    def get_quiz(self, quiz_id):
        return Quiz.query.join(
            QuizTranslation
        ).join(
            QuizQuestion, QuizQuestion.quiz_id == Quiz.id
        ).join(
            QuizQuestionTranslation,
            QuizQuestionTranslation.quiz_question_id == QuizQuestion.id
        ).join(
            Tenant, Quiz.tenant_id == Tenant.id
        ).filter(
            Quiz.tenant_id == current_app.tenant_id,
            Quiz.id == quiz_id,
            Quiz.is_enabled.__eq__(True),
            Quiz.is_deleted.__eq__(False),
            QuizQuestion.is_enabled.__eq__(True),
            QuizQuestion.is_deleted.__eq__(False),
            QuizTranslation.language_id == Tenant.default_locale_id
        ).with_entities(
            Quiz.id,
            Quiz.time_limit,
            Quiz.grading_style,
            Quiz.grading_points,
            QuizTranslation.name
        ).first_or_404()

    def get_by_quiz(self, quiz_id):
        quiz = self.get_quiz(quiz_id)

        graded_quiz = quiz.grading_style == "pass_or_fail"\
            and quiz.grading_points
        timer_enabled = quiz.time_limit

        qz_activities = self.get_quiz_activities(quiz_id)

        users = {}
        for _a in qz_activities:
            uid = _a.user_id
            score = None
            if graded_quiz:
                score = _a.score

            time_taken = _a.time_taken if timer_enabled else None
            # Choose best activity in case of multiple attempts based on score
            if uid not in users:
                users[uid] = {
                    "first_name": _a.first_name,
                    "last_name": _a.last_name,
                    "user_id": uid,
                    "score": score,
                    "session_id": _a.session_id,
                    "time_taken": time_taken,
                    "completed_at": _a.created_at.isoformat()
                }
            elif users[uid]["score"] <= score:
                users[uid].update({
                    "score": score,
                    "session_id": _a.session_id,
                    "time_taken": time_taken,
                    "completed_at": _a.created_at.isoformat()
                })

        questions = self.get_questions(quiz.id)
        question_chart = {}
        for _q in questions:
            question_chart[_q.id] = {
                "right": set(),
                "wrong": set(),
                "title": _q.title
            }

        session_ids = [_u["session_id"] for _u in users.values()]
        if session_ids:
            q_activities = self.get_question_activities(quiz.id, session_ids)
            user_activities = {}
            for _a in q_activities:
                if _a.user_id not in user_activities:
                    user_activities[_a.user_id] = {}
                user_activities[_a.user_id][_a.question_id] = _a.is_correct

            for uid, data in users.iteritems():
                if "answers" not in data:
                    data["answers"] = []

                for _q in questions:
                    ans = "skipped"
                    ua = user_activities[uid]
                    if _q.id in ua:
                        if ua[_q.id]:
                            ans = "right"
                            question_chart[_q.id]["right"].add(uid)
                        else:
                            ans = "wrong"
                            question_chart[_q.id]["wrong"].add(uid)
                    data["answers"].append(ans)

        # Most answered question
        maq = max(
            question_chart.values(),
            key=lambda k: len(k["right"])
        )

        # Least answered question
        laq = max(
            question_chart.values(),
            key=lambda k: len(k["wrong"])
        )

        users_list = sorted(
            users.values(),
            key=lambda k: k["completed_at"],
            reverse=True
        )

        average_time = None
        if timer_enabled and users:
            durations = [_u["time_taken"]
                         for _, _u in users.iteritems()]
            average_time = sum(durations) / len(durations)

        average_score = None
        total_score = None
        if graded_quiz and users:
            scores = [_u["score"]
                      for _, _u in users.iteritems()]
            average_score = sum(scores) / len(scores)
            total_score = sum([_q.points for _q in questions])

        top_performer = None
        least_performer = None
        if users and graded_quiz:
            top_performer = max(
                users.values(),
                key=lambda k: (k["score"], k["completed_at"])
            )
            least_performer = min(
                users.values(),
                key=lambda k: (k["score"], k["completed_at"])
            )

        response = {
            "average_score": average_score,
            "total_score": total_score,
            "average_time": average_time,
            "question": {
                "list": [_q._asdict() for _q in questions]
            },
            "user": {
                "list": users_list,
                "top": top_performer,
                "least": least_performer
            }
        }

        if len(maq["right"]):
            response["question"].update({
                "passed": {
                    "title": maq["title"],
                    "rate": int(
                        len(maq["right"]) / float(len(users) or 1) * 100
                    )
                }
            })
        if len(laq["wrong"]):
            response["question"].update({
                "failed": {
                    "title": laq["title"],
                    "rate": int(
                        len(laq["wrong"]) / float(len(users) or 1) * 100
                    )
                }
            })

        return response


class QuizReportsApi(Resource):

    method_decorators = [app_subscription_required('QUIZ')]

    def get(self):

        try:
            report = Reports()
            quiz_id = request.args.get("quiz_id", type=int)
            if quiz_id:
                return jsonify({
                    "status": "SUCCESS",
                    "result": report.get_by_quiz(quiz_id)
                })

            return jsonify({
                "status": "SUCCESS",
                "result": report.get_all()
            })
        except Exception as e:
            raise SharedemosException(400, message=str(e))
