import os
from flask import session

from sqlalchemy import event, UniqueConstraint
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import declared_attr
from sqlalchemy.ext.hybrid import hybrid_method
from sqlalchemy.sql.functions import current_timestamp

from sharedemos.libs.model import (
    change_remaining_order,
    model_slugify,
    rectify_duplicates,
    slugify,
    update_order_by_element_position
)
from sharedemos.libs.url import static_url
from sharedemos.models import (
    db,
    ExpiryBase,
    I18nBase,
    Resource,
    SlugRevision,
    TagBase,
    Tenant
)


association_table = db.Table(
    'walkthrough_user_groups_association',
    db.metadata,
    db.Column('walkthrough_id', db.Integer, db.ForeignKey('walkthrough.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('walkthrough_id', 'user_groups_id'),
)


def create_walkthrough_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.walkthrough.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = model_slugify(
            target.name,
            target.walkthrough_id,
            target.walkthrough.tenant_id,
            Walkthrough,
            DraftWalkthrough
        )
        walkthrough_table = Walkthrough.__table__
        connection.execute(
            walkthrough_table.update().
            where(walkthrough_table.c.id == target.walkthrough_id).
            values(slug=new_slug)
        )

        return new_slug


def update_walkthrough_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.walkthrough.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_walkthrough_slug(mapper, connection, target)

        # Don't create/update walkthrough revision data if slug is unchanged
        if not new_slug or new_slug == target.walkthrough.slug:
            return

        # Log walkthrough revision details
        tenant_id = target.walkthrough.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("walkthrough")) &
            (SlugRevision.entity_id == target.walkthrough.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.walkthrough.slug,
            new_slug=new_slug,
            entity_type=unicode("walkthrough"),
            entity_id=target.walkthrough.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.walkthrough.slug) &
                  (revision_table.c.entity_type == u"walkthrough") &
                  (revision_table.c.entity_id == target.walkthrough.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def create_draft_walkthrough_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.walkthrough.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(
            target.name,
            target.walkthrough_id,
            DraftWalkthrough,
            target.walkthrough.tenant_id
        )
        walkthrough_table = DraftWalkthrough.__table__
        connection.execute(
            walkthrough_table.update().
            where(walkthrough_table.c.id == target.walkthrough_id).
            values(slug=new_slug)
        )
        return new_slug


def update_draft_walkthrough_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.walkthrough.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_draft_walkthrough_slug(mapper, connection, target)

        # skip create/update revision if slug is unchanged
        if not new_slug or new_slug == target.walkthrough.slug:
            return

        # Log draft walkthrough revision details
        tenant_id = target.walkthrough.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("draft_walkthrough")) &
            (SlugRevision.entity_id == target.walkthrough.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()
        connection.execute(
            revision_table.insert(),
            old_slug=target.walkthrough.slug,
            new_slug=new_slug,
            entity_type=unicode("draft_walkthrough"),
            entity_id=target.walkthrough.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.walkthrough.slug) &
                  (revision_table.c.entity_type == u"draft_walkthrough") &
                  (revision_table.c.entity_id == target.walkthrough.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def change_walkthrough_order(target_playlist, target_after_chapter,
                             current_playlist, current_chapter):
    """
    Change walkthrough order depending upon target_playlist,
    target_after_chapter, current_playlist.

    Params:
        target_playlist: Playlist in which we are placing the picked chapter.
        target_after_chapter: Chapter after which we are placing the picked-up chapter.
        current_playlist: Playlist from which the chapter is dragged/picked-up to re-arrange.
        current_chapter: Chapter which is being dragged to re-order.
    """

    # Sorting the walkthroughs in both target and current's.
    target_chapter_list = target_playlist.draft_walkthroughs
    current_chapter_list = current_playlist.draft_walkthroughs

    target_chapter_list = sorted(target_chapter_list,
                                 key=lambda k: k.order)
    current_chapter_list = sorted(current_chapter_list,
                                  key=lambda k: k.order)

    """
    Check target_chapter_list and current_chapter_list,
    whether any elements having same order.
    """
    for chapter_list in target_chapter_list, current_chapter_list:
        rectify_duplicates(chapter_list)

    """
    If target_after_chapter is None, i.e if the current_chapter is placed to top,
    dont get the remaining chapters in target.
    """
    if not target_after_chapter:
        change_remaining_order(target_chapter_list, increment=True)
    else:
        """
        If chapters are from different playlists
        or re-arranged within a playlist.
        """
        update_order_by_element_position(target_chapter_list,
                                         target_after_chapter, increment=True)

    update_order_by_element_position(current_chapter_list,
                                     current_chapter, increment=False)

    """
    Change the order, parent playlist of the current chapter.
    Increment the order by 1 after the target-chapter, if not then order is 1.
    """
    current_chapter.order = target_after_chapter.order + \
        1 if target_after_chapter else 1
    current_chapter.playlist = target_playlist


def change_published_walkthrough_order(playlist):
    """
    Change the order of the walkthroughs in published state.
    """
    draft_walkthroughs_list = sorted(playlist.draft_walkthroughs,
                                     key=lambda k: k.order)
    # Get published chapters from draft chapters which are not deleted.
    published_demo_list = [walkthrough.published
                           for walkthrough in draft_walkthroughs_list
                           if walkthrough.published and
                           not walkthrough.is_deleted]

    # Change the order and playlist
    for order, walkthrough in enumerate(published_demo_list, start=1):
        walkthrough.order = order
        walkthrough.playlist = playlist


def create_walkthrough_tag(mapper, connection, target):
    from sharedemos.tasks import upload_to_algolia
    upload_to_algolia.delay({
        'category': 'chapter',
        'chapter_id': target.id,
        'tenant_id': target.tenant_id
    })


class WalkthroughMixin(object):

    slug = db.Column(db.Unicode)
    resource_hostname = db.Column(db.Unicode, nullable=False,
                                  default=u"localhost")
    order = db.Column(db.Integer, nullable=False)
    slide_transition_effect = db.Column(db.Unicode)
    unique_id = db.Column(db.Unicode, unique=True)

    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def created_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def modified_by(cls):
        return db.Column(db.Integer, db.ForeignKey('users.id'))

    @declared_attr
    def tenant_id(cls):
        return db.Column(db.Integer, db.ForeignKey('tenant.id'),
                         nullable=False)

    @declared_attr
    def tenant(cls):
        return db.relationship("Tenant", backref=cls.__tablename__ + 's')

    @declared_attr
    def playlist_id(cls):
        return db.Column(db.Integer, db.ForeignKey('playlist.id'),
                         nullable=False)

    @declared_attr
    def playlist(cls):
        return db.relationship("Playlist", backref=db.backref(
            cls.__tablename__ + 's', cascade="all, delete-orphan",
            order_by=lambda: (cls.order, cls.created_at)))

    @hybrid_method
    def get_thumbnail(self, locale=None):
        resource = self.get_thumbnail_resource(locale)
        if resource:
            resource_type = resource.resource_type
            if resource_type == u'sandbox':
                return resource.path
            if (
                (resource_type in (u'embed', u'wistia')) and
                resource.meta_data.get('thumbnail_url')
            ):
                return resource.meta_data['thumbnail_url']

            filename = None

            if resource_type in [u'360', u'rackspace']:
                filename = resource.path + '/1.jpg'

            elif resource_type in [u'footer', u'image']:
                filename = resource.path

            elif resource_type == u'link':
                if resource.meta_data and resource.meta_data.get('icon_name'):
                    # Temporary fix for link type slide thumbnail.
                    _file, file_extension = os.path.splitext(
                        resource.meta_data.get('icon_name')
                    )
                    if file_extension:
                        filename = 'external_icons/' + \
                            resource.meta_data['icon_name']

            elif resource_type in (u'pdf', u'file') and\
                    resource.meta_data and resource.meta_data.get('thumbnail_url'):
                filename = resource.meta_data.get('thumbnail_url')

            if filename:
                return static_url(filename='media/' + filename)

    @hybrid_method
    def get_thumbnail_resource(self, locale=None):
        first_slide = self.get_first_slide()
        """
            video & audio type slide uses
            secondary resource(image) as thumbnail

            Skip providing thumbnail resource information for html5
        """
        if first_slide:
            pri_resource = first_slide.primary_resource
            sec_resource = first_slide.secondary_resource
            if pri_resource:
                resource_type = pri_resource.resource_type
                if resource_type in [
                    u'image', u'360', u'footer',
                    u'rackspace', u'embed', u'wistia',
                    u'pdf', u'file'
                ]:
                    return pri_resource

                elif resource_type == u'link' and\
                        pri_resource.meta_data and\
                        pri_resource.meta_data.get('icon_name'):
                    return pri_resource

                elif resource_type == u'sandbox':
                    for frame in pri_resource.meta_data.get('frames', []):
                        if frame['type'] == 'image':
                            image = '%s/frame-%04d.jpg' % (
                                pri_resource.meta_data['cdn_url'],
                                frame['index'])
                            pri_resource.path = image
                            return pri_resource

                elif resource_type == u'content':
                    locale_id = locale or session['user']['locale']
                    if first_slide.secondary_resource:
                        if pri_resource.tenant.default_locale_id == locale_id:
                            return first_slide.secondary_resource

                        img_resource = Resource.query.filter(
                            (Resource.meta_data['default_res_id']
                                .astext.cast(db.Integer) ==
                                first_slide.primary_resource_id) &
                            (Resource.language_id == locale_id) &
                            (Resource.resource_type == u'image')).first()

                        return img_resource if img_resource else\
                            first_slide.secondary_resource

            if sec_resource and sec_resource.resource_type == u'image':
                return first_slide.secondary_resource

    @hybrid_method
    def get_first_slide(self):
        """Return the valid first slide in a Walkthrough."""
        for slide in self.slides:
            if not slide.is_deleted and slide.order is 1:
                return slide

    @hybrid_method
    def languages_available(self):
        """Return list of translaion ids."""
        return [t.language_id for t in self.translations]

    def __unicode__(self):
        """Return default locale name for the Walkthrough."""
        return self.get_name()

    def __repr__(self):
        """Return unicode of Walkthrough model."""
        return self.__unicode__().encode('utf-8')


class Walkthrough(WalkthroughMixin, I18nBase):

    __tablename__ = 'walkthrough'

    id = db.Column(db.Integer, primary_key=True)
    draft_id = db.Column(db.Integer, db.ForeignKey('draft_walkthrough.id'),
                         nullable=False)
    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=association_table,
        backref="walkthroughs",
        order_by="UserGroup.name"
    )

    draft = db.relationship(
        "DraftWalkthrough",
        backref=db.backref("published", uselist=False),
        foreign_keys=[draft_id])

    @hybrid_method
    def get_restricted_to_groups(self):
        """
        Recursive function to get retricted to group ids from self/playlist/section.

        Returns tuple containing ( groups[], model_with_group_restricted ).
        """
        if self.restricted_to_groups:
            return (self.restricted_to_groups or [], self)

        return self.playlist.get_restricted_to_groups()

    @hybrid_method
    def has_groups(self):
        """Return True is the model has group info at any level, else False."""
        return bool(self.get_restricted_to_groups()[0])

    @hybrid_method
    def is_restricted_to_groups(self, user_groups):
        """
        Check recursively whether the draft_walkthrough is restricted to the 'user_groups'.

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

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_walkthrough_tenant_id_slug'),
    )

    @hybrid_method
    def is_locale_available(self, locale):

        for translation in self.translations:
            if translation.language_id == locale:
                return True

        return False


class DraftWalkthrough(WalkthroughMixin, I18nBase, ExpiryBase):
    """This entity represents a sub-level under a Playlist."""

    __tablename__ = 'draft_walkthrough'

    id = db.Column(db.Integer, primary_key=True)
    mapping_id = db.Column(db.Unicode)

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_draft_walkthrough_tenant_id_slug'),
    )


class WalkthroughTranslationMixin(object):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    title = db.Column(db.Unicode, nullable=False)
    tag_ids = db.Column(ARRAY(db.Integer, dimensions=1))
    created_at = db.Column(db.DateTime, default=current_timestamp(),
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=current_timestamp(),
                            onupdate=current_timestamp(),
                            nullable=False)

    @declared_attr
    def language_id(cls):
        return db.Column(db.Unicode, db.ForeignKey('languages.id'),
                         nullable=False)

    @declared_attr
    def languages(cls):
        return db.relationship("Languages")

    def __unicode__(self):
        return unicode(self.name)

    def __repr__(self):
        return self.__unicode__().encode('utf-8')


class WalkthroughTranslations(WalkthroughTranslationMixin, TagBase):

    __tablename__ = 'walkthrough_translations'

    walkthrough_id = db.Column(
        db.Integer,
        db.ForeignKey('walkthrough.id'),
        nullable=False
    )

    walkthrough = db.relationship(
        "Walkthrough",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


class DraftWalkthroughTranslations(WalkthroughTranslationMixin, db.Model):

    __tablename__ = 'draft_walkthrough_translations'

    walkthrough_id = db.Column(
        db.Integer,
        db.ForeignKey('draft_walkthrough.id'),
        nullable=False
    )

    walkthrough = db.relationship(
        "DraftWalkthrough",
        backref=db.backref(
            "translations",
            cascade="all, delete-orphan",
            viewonly=True
        )
    )


event.listen(WalkthroughTranslations, 'after_insert', create_walkthrough_slug)
event.listen(WalkthroughTranslations, 'after_update', update_walkthrough_slug)
event.listen(DraftWalkthroughTranslations, 'after_insert',
             create_draft_walkthrough_slug)
event.listen(DraftWalkthroughTranslations, 'after_update',
             update_draft_walkthrough_slug)
event.listen(Walkthrough, 'after_update', create_walkthrough_tag)
