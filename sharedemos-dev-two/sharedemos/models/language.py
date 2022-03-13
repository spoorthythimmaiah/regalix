from sqlalchemy.sql.functions import current_timestamp
from sharedemos.models import db


class Languages(db.Model):
    __tablename__ = 'languages'

    id = db.Column(db.Unicode, primary_key=True, nullable=False)
    name = db.Column(db.Unicode, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(), nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    def __unicode__(self):
        return self.id

    def __repr__(self):
        return self.__unicode__()
