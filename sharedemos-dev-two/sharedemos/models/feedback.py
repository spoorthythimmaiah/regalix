from datetime import datetime

from sharedemos.models import db


class Message(db.Model):

    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    slide_id = db.Column(db.Integer, db.ForeignKey('slide.id'), nullable=False)
    text = db.Column(db.Unicode, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    user = db.relationship("User", backref=db.backref("messages"), foreign_keys=user_id)


class Rating(db.Model):

    __tablename__ = 'rating'

    id = db.Column(db.Integer, primary_key=True)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    chapter_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))
    value = db.Column(db.Integer, nullable=False)
    comments = db.Column(db.Unicode)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    user_activity_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'), nullable=False)
