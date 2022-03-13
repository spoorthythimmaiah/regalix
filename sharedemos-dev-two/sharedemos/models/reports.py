from sqlalchemy.sql.functions import current_timestamp
from sqlalchemy.dialects.postgresql import ARRAY

from sharedemos.models import db


class ReportTenant(db.Model):
    __tablename__ = 'report_tenant'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    title = db.Column(db.Unicode)
    domain = db.Column(db.Unicode, nullable=False)
    timezone = db.Column(db.Unicode, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class SiteVisitors(db.Model):
    __tablename__ = 'visitors'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('report_tenant.id'), nullable=False)
    from_date = db.Column(db.DateTime(timezone=True), nullable=False)
    product = db.Column(db.String(255))                                             # Product Name

    site_visitors_count = db.Column(db.Integer, default=0, nullable=False)          # Unique new visitors created for given date
    overall_site_visitors_count = db.Column(db.Integer, default=0, nullable=False)  # Includes duplicate/repeat visitors created before

    demo_visitors_count = db.Column(db.Integer, default=0, nullable=False)          # Number of NEW visitors visiting demo
    overall_demo_visitors_count = db.Column(db.Integer, default=0, nullable=False)  # Number of ALL visitors visiting demo

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class VisitorsGeography(db.Model):
    __tablename__ = 'visitors_geography'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('report_tenant.id'), nullable=False)
    from_date = db.Column(db.DateTime(timezone=True), nullable=False)
    product = db.Column(db.String(255))                                             # Product Name
    country = db.Column(db.Unicode, nullable=False)                                 # Country Name
    country_iso_code = db.Column(db.Unicode, nullable=False)                        # Country ISO Code

    visitors_count = db.Column(db.Integer, default=0, nullable=False)               # Unique new visitors created for given date
    overall_visitors_count = db.Column(db.Integer, default=0, nullable=False)       # Includes duplicate/repeat visitors created before

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class VisitorsReferral(db.Model):
    __tablename__ = 'visitors_referral'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('report_tenant.id'), nullable=False)
    from_date = db.Column(db.DateTime(timezone=True), nullable=False)
    source = db.Column(db.Unicode, nullable=False)                                  # Referral source Name
    product = db.Column(db.String(255))                                             # Product Name

    visitors_count = db.Column(db.Integer, default=0, nullable=False)               # Unique new visitors created for given date
    overall_visitors_count = db.Column(db.Integer, default=0, nullable=False)       # Includes duplicate/repeat visitors created before

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class TopicActivity(db.Model):
    __tablename__ = 'topic_activity'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('report_tenant.id'), nullable=False)
    from_date = db.Column(db.DateTime(timezone=True), nullable=False)
    product = db.Column(db.String(255), nullable=False)                             # Product Name
    section = db.Column(db.String(255))                                             # Section name
    walkthrough = db.Column(db.String(255))                                         # Demo name

    hierarchy = db.Column(ARRAY(db.String(255)))                                    # Product path/tree

    visit_count = db.Column(db.Integer, default=0, nullable=False)                  # Exclude repeat visits
    overall_visit_count = db.Column(db.Integer, default=0, nullable=False)          # Include repeat visits

    completion_count = db.Column(db.Integer, default=0, nullable=False)             # Exclude duplicate completions
    overall_completion_count = db.Column(db.Integer, default=0, nullable=False)     # Include duplicate completions

    completion_rate = db.Column(db.Float, default=0.0, nullable=False)              # VisitCount/CompletionCount
    overall_completion_rate = db.Column(db.Float, default=0.0, nullable=False)      # OVisitCount/OCompletionCount

    total_slides_count = db.Column(db.Integer, default=0, nullable=False)           # No. of users visited <= 99% of slides in demo
    average_frames_completed = db.Column(db.Float, default=0.0, nullable=False)     # Avg. Slides completed by users who visited demo
    percent_completions_25 = db.Column(db.Integer, default=0, nullable=False)       # No. of users visited <= 25% of slides in demo
    percent_completions_50 = db.Column(db.Integer, default=0, nullable=False)       # No. of users visited <= 50% of slides in demo
    percent_completions_75 = db.Column(db.Integer, default=0, nullable=False)       # No. of users visited <= 75% of slides in demo
    percent_completions_100 = db.Column(db.Integer, default=0, nullable=False)       # No. of users visited <= 99% of slides in demo

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)


class LeadsGenerated(db.Model):
    __tablename__ = 'leads_generated'
    __bind_key__ = 'reports'

    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('report_tenant.id'), nullable=False)
    from_date = db.Column(db.DateTime(timezone=True), nullable=False)
    product = db.Column(db.String(255), nullable=False)                             # Product Name
    section = db.Column(db.String(255), nullable=False)                             # Section Name

    leads_count = db.Column(db.Integer, default=0, nullable=False)                  # Number of leads for the entity

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(), onupdate=current_timestamp(), nullable=False)
