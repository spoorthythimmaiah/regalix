from sqlalchemy import UniqueConstraint
from sqlalchemy.sql.functions import current_timestamp

from sharedemos.models import db


class TenantIndex(db.Model):
    """ Tenant Domain mapped with algolia index ids. """

    __tablename__ = 'tenant_index'

    id = db.Column(db.Integer, primary_key=True)
    algolia_index = db.Column(db.Unicode, nullable=False, unique=True)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False, unique=True)

    tenant = db.relationship("Tenant", backref=db.backref("tenant_index", uselist=False))

    __table_args__ = (
        UniqueConstraint('tenant_id', name='uq_tenant_index_tenant_id'),
        UniqueConstraint('algolia_index', name='uq_tenant_index_algolia_index'),
    )


class SearchIndex(db.Model):
    """ Overal search count with last searched datetime. """

    __tablename__ = 'search_index'

    id = db.Column(db.Integer, primary_key=True)
    count = db.Column(db.Integer, nullable=False, default=0)
    last_searched_at = db.Column(db.DateTime)
    from_date = db.Column(db.DateTime, nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(),
                            onupdate=current_timestamp(), nullable=False)
    tenant_index_id = db.Column(db.Integer, db.ForeignKey('tenant_index.id'), nullable=False)

    tenant_index = db.relationship("TenantIndex", backref=db.backref("search_index"))
    search_activity = db.relationship("SearchActivity", backref=db.backref("search_index"))


class SearchActivity(db.Model):
    """ Single word search count with average hits."""

    __tablename__ = 'search_activity'

    id = db.Column(db.Integer, primary_key=True)
    word = db.Column(db.Unicode, nullable=False)
    count = db.Column(db.Integer, nullable=False, default=0)
    avg_hit_count = db.Column(db.Integer, default=0)
    avg_hit_count_without_typo = db.Column(db.Integer, default=0)
    from_date = db.Column(db.DateTime, nullable=False)
    modified_at = db.Column(db.DateTime, default=current_timestamp(),
                            onupdate=current_timestamp(), nullable=False)
    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    search_index_id = db.Column(db.Integer, db.ForeignKey('search_index.id'), nullable=False)
