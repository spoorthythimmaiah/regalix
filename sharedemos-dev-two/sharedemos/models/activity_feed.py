from datetime import datetime

from sharedemos.models import db


class ActivityFeed(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    playlist_id = db.Column(db.Integer, db.ForeignKey('playlist.id'), default=None)
    draft_walkthrough_id = db.Column(db.Integer, db.ForeignKey('draft_walkthrough.id'), default=None)
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'), default=None)
    entity = db.Column(db.Unicode, nullable=False)
    attribute = db.Column(db.Unicode, nullable=True)
    action = db.Column(db.Unicode, nullable=False)
    primary_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    secondary_user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)

    product = db.relationship("Section", foreign_keys=product_id)
    section = db.relationship("Section", foreign_keys=section_id)
    playlist = db.relationship("Playlist", backref='activity_feed', foreign_keys=playlist_id)
    draft_walkthrough = db.relationship("DraftWalkthrough", backref='activity_feed', foreign_keys=draft_walkthrough_id)
    walkthrough = db.relationship("Walkthrough", backref='activity_feed', foreign_keys=walkthrough_id)
    primary_user = db.relationship("User", backref='activity_feed', foreign_keys=primary_user_id)
    secondary_user = db.relationship("User", backref='secondary_activity_feed', foreign_keys=secondary_user_id)

    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'), nullable=True)
