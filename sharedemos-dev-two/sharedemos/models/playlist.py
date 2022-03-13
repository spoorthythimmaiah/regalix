from datetime import datetime
from sqlalchemy.ext.hybrid import hybrid_method

from sharedemos.libs.model import (
    change_remaining_order,
    rectify_duplicates,
    update_order_by_element_position
)
from sharedemos.models import db, ExpiryBase, I18nBase


association_table = db.Table(
    'playlist_user_groups_association',
    db.metadata,
    db.Column('playlist_id', db.Integer, db.ForeignKey('playlist.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('playlist_id', 'user_groups_id'),
)


def change_playlist_order(target_section, target_after_playlist,
                          current_section, current_playlist):
    """
    Change playlist order depending upon target_section, target_after_playlist, current_section.

    Params:
        target_section - Section to which the chosen playlist is to place.
        target_after_playlist - Playlist after which the choosed/dragged playlist is placed.
        current_section - Section from which the playlist is choosed/dragged.
        current_playlist - Playlist which is being dragged/choosed to re-order.
    """
    # Sorting the playlists in both target and current.
    target_playlist_list = target_section.playlists
    current_playlist_list = current_section.playlists

    target_playlist_list = sorted(target_playlist_list,
                                  key=lambda k: k.order)

    current_playlist_list = sorted(current_playlist_list,
                                   key=lambda k: k.order)

    """
    Check target_playlist_list and current_playlist_list,
    whether any elements in the list having same order.
    """

    for playlist in target_playlist_list, current_playlist_list:
        rectify_duplicates(playlist)

    """
    If target_after_playlist is None, i.e if the current_playlist is placed on top.
    dont get the remaining playlists in target.
    """
    if not target_after_playlist:
        change_remaining_order(target_playlist_list, increment=True)
    else:
        # If playlists are from different sections or re-arranged within a section.
        update_order_by_element_position(target_playlist_list, target_after_playlist,
                                         increment=True)

    update_order_by_element_position(current_playlist_list, current_playlist,
                                     increment=False)
    current_playlist.order = target_after_playlist.order + \
        1 if target_after_playlist else 1
    current_playlist.section = target_section


class Playlist(I18nBase, ExpiryBase):
    """This entity represents the sub-level under Section."""

    __tablename__ = 'playlist'

    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    mapping_id = db.Column(db.Unicode)

    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=association_table,
        backref="playlists",
        order_by="UserGroup.name"
    )

    section_id = db.Column(
        db.Integer, db.ForeignKey('section.id'), default=None)
    tenant_id = db.Column(db.Integer, db.ForeignKey(
        'tenant.id'), nullable=False)

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    section = db.relationship("Section",
                              backref=db.backref('playlists',
                                                 cascade_backrefs=False,
                                                 order_by='Playlist.order'))
    tenant = db.relationship("Tenant", backref="playlists")
    translations = db.relationship("PlaylistTranslations", backref="playlist",
                                   cascade="all, delete-orphan")
    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    @hybrid_method
    def get_restricted_to_groups(self):
        """
        Recursive function to get retricted to group ids from self/section.

        Returns tuple containing ( groups[], model_with_group_restricted ).
        """
        if self.restricted_to_groups:
            return (self.restricted_to_groups or [], self)

        return self.section.get_restricted_to_groups()

    @hybrid_method
    def has_groups(self):
        """Return True is the model has group info at any level, else False."""
        return bool(self.get_restricted_to_groups()[0])

    @hybrid_method
    def is_restricted_to_groups(self, user_groups):
        """
        Check recursively whether the playlist is restricted to the 'user_groups'.

        param:
            user_groups - List containing SqlAlchmey UserGroup objects.
        Return True, if the model is restricted to the given 'user_groups'.
        Return False,
            if the model has no groups info,
            or if the model is not restricted to given 'user_groups'.

        """
        self_groups = self.get_restricted_to_groups()[0]
        if any(grp in user_groups for grp in self_groups):
            return True

        return False

    @hybrid_method
    def languages_available(self):
        """Return list of translaion ids."""
        return [t.language_id for t in self.translations]

    def __unicode__(self):
        """Playlist repr."""
        return self.get_name()

    def __repr__(self):
        """Return playlist translation name."""
        return self.__unicode__().encode('utf-8')


class PlaylistTranslations(db.Model):
    """
    This entity represents translations w.r.t Playlist.

    Used to store multilingual content on basis of 'language_id'.
    Must have a 'playlist_id'.
    """

    __tablename__ = 'playlist_translations'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)

    playlist_id = db.Column(db.Integer, db.ForeignKey(
        'playlist.id'), nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey(
        'languages.id'), nullable=False)

    created_at = db.Column(
        db.DateTime, default=datetime.utcnow, nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    languages = db.relationship("Languages", backref='playlist_translations')
