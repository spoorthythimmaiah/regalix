from datetime import datetime

from sqlalchemy import Index, CheckConstraint
from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.dialects.postgresql import JSON

from sharedemos.models import db


class UserActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    unique_user_id = db.Column(db.Unicode, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    browser = db.Column(db.Unicode, nullable=False)
    version = db.Column(db.Unicode, nullable=False)
    platform = db.Column(db.Unicode, nullable=False)
    language = db.Column(db.Unicode)
    ip_address = db.Column(db.Unicode)
    city = db.Column(db.Unicode)
    state = db.Column(db.Unicode)
    country = db.Column(db.Unicode)
    country_iso_code = db.Column(db.Unicode)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship("User", backref=db.backref(
        "user_activity"), foreign_keys=user_id)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)


class WalkthroughActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'))
    report_user_id = db.Column(db.Integer, db.ForeignKey('user_activity.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))
    slide_index = db.Column(db.Integer)
    revisit = db.Column(db.Boolean, default=True)
    duration = db.Column(db.Integer, default=0)

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    product = db.relationship(
        "Section",
        backref=db.backref(
            "product_walkthrough_activity",
            cascade="all, delete-orphan"
        ),
        foreign_keys=product_id
    )
    section = db.relationship(
        "Section",
        backref=db.backref(
            "section_walkthrough_activity",
            cascade="all, delete-orphan"
        ),
        foreign_keys=section_id
    )
    walkthrough = db.relationship("Walkthrough", backref=db.backref(
        "walkthrough_activity", cascade="all, delete-orphan"))
    tenant = db.relationship("Tenant", backref="walkthrough_activities")

    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)

    __table_args__ = (
        Index(
            'unique_first_visit_record',
            tenant_id,
            report_user_id,
            product_id,
            section_id,
            walkthrough_id,
            slide_index,
            unique=True,
            postgresql_where=(~revisit)
        ),
    )


class CompletionActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        'section.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey(
        'section.id'), nullable=False)
    walkthrough_id = db.Column(db.Integer, db.ForeignKey(
        'walkthrough.id'), nullable=False)
    entity_total = db.Column(db.Integer, nullable=False)
    entity_complete = db.Column(db.Integer, default=0, nullable=False)

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    modified_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )
    user_activity = db.relationship(
        "UserActivity",
        backref=db.backref(
            "user_completion_activity",
            cascade="all, delete-orphan"
        ),
        foreign_keys=report_user_id
    )
    product = db.relationship(
        "Section",
        backref=db.backref(
            "product_completion_activity",
            cascade="all, delete-orphan"
        ),
        foreign_keys=product_id
    )
    section = db.relationship(
        "Section",
        backref=db.backref(
            "section_completion_activity",
            cascade="all, delete-orphan"
        ),
        foreign_keys=section_id
    )
    walkthrough = db.relationship("Walkthrough", backref=db.backref(
        "completion_activity", cascade="all, delete-orphan"))
    tenant = db.relationship("Tenant", backref="completion_activities")

    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)

    __table_args__ = (
        CheckConstraint((entity_complete <= entity_total),
                        name='check_slides_completed'),
    )


class VisitActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    user_activity = db.relationship(
        "UserActivity",
        backref=db.backref(
            "user_visit_activity", cascade="all, delete-orphan"),
        foreign_keys=report_user_id)
    product = db.relationship(
        "Section",
        backref=db.backref(
            "product_visit_activity", cascade="all, delete-orphan"),
        foreign_keys=product_id)
    section = db.relationship(
        "Section",
        backref=db.backref("section_visit_activity",
                           cascade="all, delete-orphan"),
        foreign_keys=section_id)
    walkthrough = db.relationship(
        "Walkthrough",
        backref=db.backref(
            "walkthrough_visit_activity", cascade="all, delete-orphan"),
        foreign_keys=walkthrough_id)
    tenant = db.relationship("Tenant", backref="visit_activities")

    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)


class ReferralTracking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)
    source = db.Column(db.Unicode, nullable=False)
    medium = db.Column(db.Unicode, nullable=False)
    campaign = db.Column(db.Unicode, default=u"none", server_default=u"none")
    term = db.Column(db.Unicode)
    content = db.Column(db.Unicode)
    entrance_path = db.Column(db.Unicode, nullable=False)
    is_repeated = db.Column(db.Boolean, default=False,
                            server_default="false", nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    user_activity = db.relationship(
        "UserActivity",
        backref=db.backref("referral_source",
                           order_by="ReferralTracking.created_at")
    )


class AudioVideoAnalytics(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))
    resource_id = db.Column(db.Integer, db.ForeignKey('resource.id'))
    events = db.Column(db.Unicode)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    walkthrough = db.relationship(
        "Walkthrough",
        backref=db.backref(
            "walkthrough_audio_video_analytics", cascade="all, delete-orphan"),
        foreign_keys=walkthrough_id)
    tenant = db.relationship("Tenant", backref="audio_video_analytics")


class PathFinderActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)

    path_id = db.Column(db.Integer, db.ForeignKey('paths.id'), nullable=False)
    option_id = db.Column(db.Integer, db.ForeignKey('options.id'))
    event_type = db.Column(db.Unicode)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    path = db.relationship(
        "Path",
        backref=db.backref(
            "path_finder_activity", cascade="all, delete-orphan"),
        foreign_keys=path_id)
    option = db.relationship(
        "Option",
        backref=db.backref(
            "option_path_finder_activity", cascade="all, delete-orphan"),
        foreign_keys=option_id)
    tenant = db.relationship("Tenant", backref="path_finder_activities")


class CheckListItemActivity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    is_done = db.Column(db.Boolean, default=False, nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False, default=None)
    session_id = db.Column(db.Unicode, nullable=False)

    locale_requested_code = db.Column(
        db.Unicode, db.ForeignKey('languages.id'))
    locale_served_code = db.Column(db.Unicode, db.ForeignKey('languages.id'))

    checklist_id = db.Column(db.Integer, db.ForeignKey(
        'checklist.id'), nullable=False)
    checklist_section_id = db.Column(db.Integer, db.ForeignKey(
        'checklist_section.id'), nullable=False)
    check_list_item_id = db.Column(
        db.Integer, db.ForeignKey('checklist_item.id'), nullable=False)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)

    checklist = db.relationship(
        "Checklist",
        backref=db.backref(
            "check_list_item_activity", cascade="all, delete-orphan"),
        foreign_keys=checklist_id)
    checklist_section = db.relationship(
        "ChecklistSection",
        backref=db.backref(
            "check_list_item_activity", cascade="all, delete-orphan"),
        foreign_keys=checklist_section_id)
    checklist_item = db.relationship(
        "ChecklistItem",
        backref=db.backref(
            "check_list_item_activity", cascade="all, delete-orphan"),
        foreign_keys=check_list_item_id)
    tenant = db.relationship("Tenant", backref="check_list_activities")
    locale_requested = db.relationship(
        "Languages", foreign_keys=locale_requested_code)
    locale_served = db.relationship(
        "Languages", foreign_keys=locale_served_code)


class SampleExchangeActivity(db.Model):
    """Record Activity on sample-exchange."""

    id = db.Column(db.Integer, primary_key=True)
    sample_id = db.Column(db.Integer, nullable=True)
    name = db.Column(db.Unicode, nullable=True)
    author = db.Column(db.Unicode, nullable=True)
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)
    report_user_id = db.Column(db.Integer, db.ForeignKey(
        'user_activity.id'), nullable=False)
    user_activity = db.relationship(
        "UserActivity",
        backref=db.backref(
            "user_sample_exchane_activity", cascade="all, delete-orphan"),
        foreign_keys=report_user_id)


class PathFinderSuggestionMailActivity(db.Model):
    """Record Activity on PathFinder suggestion mailer."""

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    email = db.Column(
        db.Unicode,
        nullable=False
    )
    # suggestion_ids = {'suggestion_ids': [], 'group_suggestion_ids:[]'}.
    suggestion_ids = db.Column(
        MutableDict.as_mutable(JSON),
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    report_user_id = db.Column(
        db.Integer,
        db.ForeignKey('user_activity.id'),
        nullable=False
    )

    tenant_id = db.Column(
        db.Integer,
        db.ForeignKey('tenant.id'),
        nullable=False
    )

    path_id = db.Column(
        db.Integer,
        db.ForeignKey('paths.id'),
        nullable=False
    )

    option_id = db.Column(
        db.Integer,
        db.ForeignKey('options.id'),
        nullable=False
    )
