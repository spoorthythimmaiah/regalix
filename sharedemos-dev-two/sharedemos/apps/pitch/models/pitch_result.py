"""Sharedemos Apps -PitchResult models."""

from datetime import datetime

from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.models import db


class PitchResult(db.Model):
    """
    Pitch Result table.

    compare_id  - The unique id received as an initial reponse from the
                  Pitch Comparison Api(P_C_A) service.
    meta_data   - The actual response from the P_C_A service stored as it is.
    score       - Contains dictionary of diff params in the score such as
                  similarity, clarity, coverage, duration etc of the pitch.
                  The 'meta_data' will have the unmodified version of the score.
    base_score  - The pitch_section's base_score.
    total_score - Sum of diff params in the 'score' which are calculated by their
                  respective weightages.
                  (similarity + clarity + coverage + duration).
    evaluated_by - Stores the user id, who has modified the score given by
                  the P_C_A service.
    """

    __tablename__ = 'pitch_result'

    id = db.Column(db.Integer, primary_key=True)
    compare_id = db.Column(db.Unicode, unique=True, nullable=False)
    meta_data = db.Column(MutableDict.as_mutable(JSON))
    score = db.Column(MutableDict.as_mutable(JSON))
    base_score = db.Column(db.Integer, nullable=False)

    evaluated_by = db.Column(
        db.Integer, db.ForeignKey('users.id')
    )
    recording_id = db.Column(
        db.Integer, db.ForeignKey('pitch_recording.id'), nullable=False
    )
    tenant_id = db.Column(
        db.Integer, db.ForeignKey('tenant.id'), nullable=False
    )

    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    recording = db.relationship(
        "PitchRecording",
        backref=db.backref(
            "result",
            uselist=False,
            order_by='PitchResult.created_at.desc()'
        )
    )

    @hybrid_property
    def weightage_score(self):
        """
        Get weightages and calculate score based it.

        The calculation of scores is made flexible like this,
        because its dependent on config weightages.
        If in case the weightage changes then, the scores will change accordingly.
        """
        from flask import current_app
        weightages = current_app.config['PITCH_WEIGHTAGES']

        if not self.score:
            return {
                'similarity_of_pitch': 0,
                'duration_of_pitch': 0,
                'coverage_of_topics': 0,
                'clarity_of_speech': 0
            }

        return {
            'similarity_of_pitch': (
                self.score['similarity_of_pitch'] * (weightages['SIMILARTY'] / 100.0)
            ),
            'duration_of_pitch': (
                self.score['duration_of_pitch'] * (weightages['DURATION'] / 100.0)
            ),
            'coverage_of_topics': (
                self.score['coverage_of_topics'] * (weightages['COVERAGE'] / 100.0)
            ),
            'clarity_of_speech': (
                self.score['clarity_of_speech'] * (weightages['CLARITY'] / 100.0)
            )
        }

    @hybrid_property
    def total_score(self):
        """Calculate total score percentages based on their respective weightages."""
        weightage_score = self.weightage_score
        # Total score will be sum of all score percentages
        # # out of the pitch_section's base score.
        return (
            (
                weightage_score['similarity_of_pitch'] +
                weightage_score['duration_of_pitch'] +
                weightage_score['coverage_of_topics'] +
                weightage_score['clarity_of_speech']
            ) * self.base_score
        )
