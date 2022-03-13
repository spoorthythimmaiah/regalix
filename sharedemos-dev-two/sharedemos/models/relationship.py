from sqlalchemy.sql.functions import current_timestamp

from sharedemos.models import db


class ProductRelationship(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.Unicode, nullable=False, default=unicode("version"))
    source_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    destination_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(), onupdate=current_timestamp(), nullable=False)

    source = db.relationship("Section",
                             backref=db.backref("relationship_source", cascade="all, delete-orphan"),
                             foreign_keys=source_id)
    destination = db.relationship("Section",
                                  backref=db.backref("relationship_destination", cascade="all, delete-orphan"),
                                  foreign_keys=destination_id)
