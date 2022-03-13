from datetime import datetime

from sharedemos.models import db
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON


class QuizQuestionActivity(db.Model):
    """Each Question activity will be logged with session id.

    log will be updated if he re-edit the answer.
    """

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'))
    report_user_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'))
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'))
    quiz_question_id = db.Column(db.Integer, db.ForeignKey('quiz_question.id'))
    quiz_session_id = db.Column(db.Unicode, nullable=False)
    is_correct_option = db.Column(db.Boolean, default=False, nullable=False)

    # need to maintain the wrong answers
    answers = db.Column(MutableDict.as_mutable(JSON))
    answer_type = db.Column(db.Unicode)

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    quiz = db.relationship("Quiz", foreign_keys=quiz_id)
    quiz_question = db.relationship(
        "QuizQuestion", foreign_keys=quiz_question_id)

    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)


class QuizActivity(db.Model):
    """Adding record for successive attempts or timeouts.

    Each record for each submission or time out.
    """

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'))
    report_user_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'))
    quiz_session_id = db.Column(db.Unicode, nullable=False)

    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'))
    total_questions_count = db.Column(db.Integer, nullable=False, default=0)
    attempted_questions_count = db.Column(
        db.Integer, nullable=False, default=0)
    skipped_questions_count = db.Column(db.Integer, nullable=False, default=0)
    correct_answer_count = db.Column(db.Integer, nullable=False, default=0)
    score = db.Column(db.Integer, nullable=False, default=0)

    time_taken = db.Column(db.Integer, nullable=False, default=0)
    is_timeout = db.Column(db.Boolean, default=True, nullable=False)

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)
