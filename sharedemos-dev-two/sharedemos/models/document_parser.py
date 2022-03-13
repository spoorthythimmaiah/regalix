from datetime import datetime

from sharedemos.models import db


class DocumentParser(db.Model):
    """
    Document parser table.

    Used to store input doc file, parsed json file and status of parser.
    If the parser fails then the reason for failure is stored in 'description'.
    'name' has original doc filename, 'input_file' is uuid name with '.docx' extn
    'output_file' is uuid name with '.json' extn.
    """

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    input_file = db.Column(db.Unicode, nullable=False)
    output_file = db.Column(db.Unicode)
    token = db.Column(db.Unicode, unique=True)
    description = db.Column(db.Unicode)
    status = db.Column(db.Unicode, nullable=False)
    is_canceled = db.Column(db.Boolean, nullable=False, default=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    modified_at = db.Column(
        db.DateTime, nullable=False,
        default=datetime.utcnow, onupdate=datetime.utcnow
    )
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    tenant = db.relationship("Tenant", backref="document_parser")
    section = db.relationship("Section", backref="document_parser")
