from sharedemos.models import db


class AccessTokenStore(db.Model):

    __tablename__ = 'access_token_store'

    key = db.Column(db.String(250), primary_key=True)
    value = db.Column(db.LargeBinary, nullable=False)
