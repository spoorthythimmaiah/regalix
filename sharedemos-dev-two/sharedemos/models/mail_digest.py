from flask import current_app

from sharedemos.models import db


class MailDigest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    tenant = db.relationship("Tenant", backref="mail_digest")
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section = db.relationship("Section", backref="mail_digest")
    frequency = db.Column(db.Unicode, nullable=False)
    show_leads = db.Column(db.Boolean, default=False, nullable=False)
    show_viewers = db.Column(db.Boolean, default=False, nullable=False)
    show_visitors = db.Column(db.Boolean, default=False, nullable=False)
    show_content_updates = db.Column(db.Boolean, default=False, nullable=False)
    show_new_content = db.Column(db.Boolean, default=False, nullable=False)
    is_disabled = db.Column(db.Boolean, default=False, nullable=False)

    def __unicode__(self):
        if self.section:
            for sec in self.section.translations:
                if sec.language_id == self.tenant.default_locale_id:
                    return unicode(sec.name).encode('utf-8')
        return ''

    def __repr__(self):
        return self.__unicode__()


class MailDigestUsers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), nullable=False)
    unsubscribe = db.Column(db.Boolean, default=False, server_default="false")
    mail_digest_id = db.Column(db.Integer, db.ForeignKey('mail_digest.id'), nullable=False)
    mail_digest = db.relationship("MailDigest", backref="mail_digest_users")
