from datetime import datetime

from sqlalchemy.dialects.postgresql import ARRAY

from sharedemos.models import db


class AnnouncementWidget(db.Model):

    __tablename__ = 'announcement_widget'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    tenant = db.relationship("Tenant", backref=db.backref('announcement_widget',
                             cascade="all, delete-orphan", uselist=False))
    translations = db.relationship("AnnouncementWidgetTranslation",
                                   backref=db.backref('announcement_widget'))

    def __unicode__(self):
        """Announcement Widget repr."""
        for trans in self.translations:
            if trans.language_id == self.tenant.default_locale_id:
                return unicode(trans.title)
        return u''

    def __repr__(self):
        """Announcement Widget repr."""
        return self.__unicode__().encode('utf-8')


class AnnouncementWidgetTranslation(db.Model):

    __tablename__ = 'announcement_widget_translations'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    announcement_widget_id = db.Column(db.Integer, db.ForeignKey('announcement_widget.id'))
    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode, nullable=True)
    chapter_tags = db.Column(ARRAY(db.Integer, dimensions=1), nullable=False)
    result_title = db.Column(db.Unicode, nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    language = db.relationship("Languages",
                               backref=db.backref('announcement_widget_translations',
                                                  cascade="all, delete-orphan"))
