"""Repository Manager db models."""
from datetime import datetime

from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.models import db, Base


class Connector(Base):
    """Connector Table."""

    __tablename__ = "connector"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    uuid = db.Column(db.Unicode, nullable=False)
    platform = db.Column(db.Unicode, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    site_url = db.Column(db.Unicode, nullable=False)
    root_folder = db.Column(db.Unicode, nullable=False)
    username = db.Column(db.Unicode, nullable=False)
    password = db.Column(db.Unicode, nullable=False)
    client_token = db.Column(db.Unicode)
    sync_enabled = db.Column(db.Boolean, default=False)
    notify_enabled = db.Column(db.Boolean, default=False)
    is_deleted = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow, onupdate=datetime.utcnow)
    created_by = db.Column(db.Integer,
                           db.ForeignKey('users.id'), nullable=False)
    modified_by = db.Column(db.Integer,
                            db.ForeignKey('users.id'), nullable=False)
    tenant_id = db.Column(db.Integer,
                          db.ForeignKey('tenant.id'), nullable=False)
    tenant = db.relationship("Tenant", backref="connectors")


class Listener(Base):
    """Listener Table."""

    __tablename__ = "listener"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    uuid = db.Column(db.Unicode, nullable=False)
    sync_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    root_folder = db.Column(db.Unicode, nullable=False)
    client_token = db.Column(db.Unicode)
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    section_id = db.Column(db.Integer,
                           db.ForeignKey("section.id"), nullable=False)
    connector_id = db.Column(db.Integer,
                             db.ForeignKey("connector.id"), nullable=False)
    created_by = db.Column(db.Integer,
                           db.ForeignKey('users.id'), nullable=False)
    modified_by = db.Column(db.Integer,
                            db.ForeignKey('users.id'), nullable=False)
    section = db.relationship("Section",
                              backref=db.backref('listener', uselist=False))
    sync_logs = db.relationship("SyncLog", backref=db.backref('listener'))

    @hybrid_method
    def get_latest_sync(self):
        """
        Return latest sync object.

        listener object has one or more sync records,
        In order to get listener status we need to fetch latest sync object
        """
        return SyncLog.query.filter(
            SyncLog.listener_id == self.id,
        ).order_by(
            SyncLog.created_at.desc()
        ).first()


class SyncLog(Base):
    """Sync log Table."""

    __tablename__ = "sync_log"

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    uuid = db.Column(db.Unicode, nullable=False)
    # INITIAL_SYNC, MANUAL_SYNC, AUTO_SYNC
    sync_type = db.Column(db.Unicode, nullable=False)
    status = db.Column(ARRAY(db.Unicode, dimensions=1), server_default="{}")
    description = db.Column(ARRAY(db.Unicode, dimensions=1),
                            server_default="{}")
    created_at = db.Column(db.DateTime,
                           default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    listener_id = db.Column(db.Integer, db.ForeignKey("listener.id"),
                            nullable=False)
