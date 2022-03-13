"""Sharedemos Apps -PitchActivity models."""

from datetime import datetime

from sharedemos.models import db


class PitchActivity(db.Model):
    """
    Log Pitch activity.

    Logs the activity when a pitch is opened.
    (i.e when a user is viewing the pitch overview page)
    """

    __tablename__ = "pitch_activity"

    id = db.Column(db.Integer, primary_key=True)
    pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'), nullable=False)

    # session_id and user_id are 'nullable' cause, if in case in future
    # if the pitch is made accessible to public users,
    # then we may have to save only session ids.
    # But as of now, since PitchApp is only private, we only need user_id and
    # session_id is not mandatory.
    session_id = db.Column(db.Unicode)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    tenant_id = db.Column(db.Integer, db.ForeignKey("tenant.id"), nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)


class PitchSectionActivity(db.Model):
    """
    Log Pitch section activity.

    Logs the activity when a user takes a pitch
    and lands into the pitch section page.
    """

    __tablename__ = "pitch_section_activity"

    id = db.Column(db.Integer, primary_key=True)
    pitch_id = db.Column(db.Integer, db.ForeignKey('pitch.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('pitch_section.id'), nullable=False)

    session_id = db.Column(db.Unicode)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    tenant_id = db.Column(db.Integer, db.ForeignKey("tenant.id"), nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)


class PitchRecordingActivity(db.Model):
    """
    Log Pitch recording activity.

    Logs the activity when a user submits his/her recording.
    """

    __tablename__ = "pitch_recording_activity"

    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('pitch_section.id'), nullable=False)
    recording_id = db.Column(db.Integer, db.ForeignKey('pitch_recording.id'), nullable=False)

    session_id = db.Column(db.Unicode)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    tenant_id = db.Column(db.Integer, db.ForeignKey("tenant.id"), nullable=False)

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
