from simplekv.db.sql import SQLAlchemyStore

from sharedemos.models import db


class SDSQLAlchemyStore(SQLAlchemyStore):

    def __init__(self, tablename):

        self.bind = db.engine

        self.table = tablename
