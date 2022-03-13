from datetime import datetime

from sharedemos.models import db


class SocialShare(db.Model):

    __tablename__ = 'social_share'

    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow, nullable=False)
    media_type = db.Column(db.Unicode, nullable=False)
    tenant_id = db.Column(db.Integer,
                          db.ForeignKey('tenant.id'), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    user_activity_id = db.Column(
        db.Integer, db.ForeignKey('user_activity.id'), nullable=False)
    language_id = db.Column(
        db.Unicode, db.ForeignKey('languages.id'), nullable=False)
