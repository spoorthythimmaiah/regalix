from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.models import db

association_table = db.Table(
    'bulletin_user_group_association',
    db.metadata,
    db.Column('bulletin_id', db.Integer, db.ForeignKey('bulletin_board.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('bulletin_id', 'user_groups_id'),
)


class BulletinBoard(db.Model):

    __tablename__ = 'bulletin_board'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=association_table,
        backref="bulletin_board",
        order_by="UserGroup.id"
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    tenant = db.relationship("Tenant", backref=db.backref('bulletin_boards',
                             cascade="all, delete-orphan"))
    section = db.relationship("Section", backref=db.backref('bulletin_boards',
                              cascade="all, delete-orphan", order_by="BulletinBoard.order"))
    translations = db.relationship("BulletinBoardTranslations",
                                   backref=db.backref('bulletin_board'))

    def __unicode__(self):
        """Bulletin Board repr."""
        for trans in self.translations:
            if trans.language_id == self.tenant.default_locale_id:
                return unicode(trans.name)
        return u''

    def __repr__(self):
        """Bulletin Board repr."""
        return self.__unicode__().encode('utf-8')

    @hybrid_method
    def get_restricted_to_groups(self):
        """Function to get restricted to group ids from self."""
        if self.restricted_to_groups:
            return (self.restricted_to_groups or [], self)
        if self.section_id:
            return self.section.get_restricted_to_groups()
        return([], self)


class BulletinBoardTranslations(db.Model):

    __tablename__ = 'bulletin_board_translations'

    id = db.Column(db.Integer, primary_key=True)
    bulletin_board_id = db.Column(db.Integer,
                                  db.ForeignKey('bulletin_board.id'), nullable=False)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)
    languages = db.relationship("Languages", cascade="all")


class BulletinBoardLinks(db.Model):
    __tablename__ = 'bulletin_board_links'

    id = db.Column(db.Integer, primary_key=True)
    bulletin_board_id = db.Column(db.Integer,
                                  db.ForeignKey('bulletin_board.id'),
                                  nullable=False)
    link_type = db.Column(db.Unicode, nullable=False)
    order = db.Column(db.Integer, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'))
    walkthrough_id = db.Column(db.Integer, db.ForeignKey('walkthrough.id'))
    is_deleted = db.Column(db.Boolean, default=False,
                           nullable=False)

    bulletin_board = db.relationship(
        "BulletinBoard",
        backref=db.backref('bulletin_board_links',
                           cascade="all, delete-orphan",
                           order_by="BulletinBoardLinks.order"))
    tenant = db.relationship("Tenant", backref=db.backref('bulletin_board_links',
                             cascade="all, delete-orphan"))
    product = db.relationship("Section", foreign_keys=product_id)
    section = db.relationship("Section", foreign_keys=section_id)
    walkthrough = db.relationship("Walkthrough", foreign_keys=walkthrough_id)
    translations = db.relationship("BulletinBoardLinksTranslations",
                                   backref=db.backref('bulletin_board_links'))


class BulletinBoardLinksTranslations(db.Model):

    __tablename__ = 'bulletin_board_links_translations'

    id = db.Column(db.Integer, primary_key=True)
    bulletin_board_link_id = db.Column(db.Integer,
                                       db.ForeignKey('bulletin_board_links.id'),
                                       nullable=False)
    title = db.Column(db.Unicode)
    link = db.Column(db.Unicode)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)
    bulletin_board_link = db.relationship(
        "BulletinBoardLinks",
        backref=db.backref('bulletin_board_links_translations',
                           cascade="all, delete-orphan"))
    languages = db.relationship("Languages", cascade="all")
