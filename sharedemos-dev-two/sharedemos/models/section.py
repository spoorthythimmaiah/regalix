from datetime import datetime

from flask import current_app, g
from sqlalchemy import event, UniqueConstraint
from sqlalchemy.ext.hybrid import hybrid_method, hybrid_property
from sqlalchemy.dialects.postgresql import ARRAY
from sharedemos.models import (
    db,
    Base,
    CompletionActivity,
    ExpiryBase,
    I18nBase,
    SlugRevision,
    TagBase,
    Tenant
)

from sharedemos.libs.model import (
    change_remaining_order,
    slugify,
    rectify_duplicates,
    update_order_by_element_position
)
from sharedemos.libs.url import static_url


association_table = db.Table(
    'section_user_groups_association',
    db.metadata,
    db.Column('section_id', db.Integer, db.ForeignKey('section.id')),
    db.Column('user_groups_id', db.Integer, db.ForeignKey('user_groups.id')),
    db.PrimaryKeyConstraint('section_id', 'user_groups_id'),
)


def get_walkthrough_progress(walkthroughs, tenant_id, user_id):
    activities = CompletionActivity.query.filter(
        CompletionActivity.report_user_id == user_id,
        CompletionActivity.tenant_id == tenant_id
    )
    if walkthroughs:
        wt_ids = [wt.id for wt in walkthroughs if wt.is_enabled]
        activities = activities.filter(
            CompletionActivity.walkthrough_id.in_(wt_ids)
        )
    activities = activities.filter(
        CompletionActivity.entity_total <= CompletionActivity.entity_complete
    )
    return (len(activities.all()) / float(len(walkthroughs) or 1)) * 100


def clear_section_cache(mapper, connection, target):
    from sharedemos.tasks import delete_api_cache_data
    delete_api_cache_data.delay({
        'entity': 'section',
        'model_id': target.section_id,
        'tenant_id': target.section.tenant_id,
        'delete_pattern': True
    })


def create_section_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.section.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = slugify(target.name, target.section_id, Section,
                           target.section.tenant_id)
        section_table = Section.__table__
        connection.execute(
            section_table.update().
            where(section_table.c.id == target.section_id).
            values(slug=new_slug)
        )
        return new_slug


def update_section_slug(mapper, connection, target):
    tenant = Tenant.query.get(target.section.tenant_id)
    if target.language_id == tenant.default_locale_id:
        new_slug = create_section_slug(mapper, connection, target)

        # Don't create/update section revision data if slug is unchanged
        if not new_slug or new_slug == target.section.slug:
            return

        # Log section revision details
        tenant_id = target.section.tenant_id
        revision_table = SlugRevision.__table__

        # Delete duplicate slug revisions
        SlugRevision.query.filter(
            (SlugRevision.old_slug == new_slug) &
            (SlugRevision.entity_type == unicode("section")) &
            (SlugRevision.entity_id == target.section.id) &
            (SlugRevision.tenant_id == tenant_id)
        ).delete()

        connection.execute(
            revision_table.insert(),
            old_slug=target.section.slug,
            new_slug=new_slug,
            entity_type=unicode("section"),
            entity_id=target.section.id,
            tenant_id=tenant_id
        )

        connection.execute(
            revision_table.update().
            where((revision_table.c.new_slug == target.section.slug) &
                  (revision_table.c.entity_type == u"section") &
                  (revision_table.c.entity_id == target.section.id) &
                  (revision_table.c.tenant_id == tenant_id)).
            values(new_slug=new_slug)
        )


def change_section_order(target_section, target_after_section,
                         current_section, current_element):
    """Reorder section."""
    """
    Change section order depending upon target_section,
    target_after_section, current_section.

    Params:
        target_section: Section to which the entity is being placed.
        target_after_section: Product/section after which we are placing picked-up entity.
        current_section: Section from which entity is picked-up.
        current_element: Product/Section which is being dragged to re-order.
    """

    tenant_id = getattr(current_app, 'tenant_id', None)
    """
    Adjacent-items:
        Product(Main-Parent) list items, beside current/target element.
    """
    adjacent_items = Section.query.filter_by(
        tenant_id=tenant_id,
        parent_id=None,
        is_deleted=False,
        is_enabled=True,
        is_hidden=False
    ).order_by(Section.order)

    # Sorting the children-sections in both target and current's, if any.
    if target_section:
        target_children_list = target_section.children
        target_children_list = sorted(target_children_list,
                                      key=lambda k: k.order)
    else:
        target_children_list = adjacent_items.all()

    if current_section:
        current_children_list = current_section.children
        current_children_list = sorted(current_children_list,
                                       key=lambda k: k.order)
    else:
        current_children_list = adjacent_items.all()

    """
    Check target_children_list and current_children_list,
    whether any elements having same order.
    """
    for section_list in target_children_list, current_children_list:
        rectify_duplicates(section_list)

    """
    If target_after_section is None,
    i.e if the current_element is placed on top,
    dont get the remaining elements in the target.
    """

    if not target_after_section:
        change_remaining_order(target_children_list, increment=True)
    else:
        update_order_by_element_position(target_children_list,
                                         target_after_section,
                                         increment=True)

    update_order_by_element_position(current_children_list, current_element,
                                     increment=False)

    """
    Change the order and parent-element of the current-element.
    Increment the order by 1 after the target-element,
    if not then the order is 1.
    """
    current_element.order = target_after_section.order + \
        1 if target_after_section else 1
    current_element.parent = target_section


def get_next_section_order(parent=None):
    tenant_id = getattr(current_app, 'tenant_id', None)
    if parent:
        section = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id == parent.id)
        ).order_by(Section.order.desc()).first()
    else:
        section = Section.query.filter(
            (Section.tenant_id == tenant_id) &
            (Section.parent_id.is_(None))
        ).order_by(Section.order.desc()).first()

    return (section.order + 1) if section else 1


class Section(I18nBase, ExpiryBase):
    """
    This entity represents top level in the sdemos hierarchy.

    Alias used - Category, Sub-section, Product.
    Sub-section is used when section has a parent_id.
    """

    __tablename__ = 'section'

    id = db.Column(db.Integer, primary_key=True)
    slug = db.Column(db.Unicode)
    order = db.Column(db.Integer, nullable=False)
    is_enabled = db.Column(db.Boolean, default=True, nullable=False)
    is_hidden = db.Column(db.Boolean, default=False, nullable=False)
    is_deleted = db.Column(db.Boolean, default=False, nullable=False)
    is_private = db.Column(db.Boolean, default=False, nullable=False)
    can_download = db.Column(db.Boolean, default=True, nullable=False)
    mapping_id = db.Column(db.Unicode)

    faq_group_id = db.Column(db.Integer, db.ForeignKey('faq_group.id'))
    icon_id = db.Column(db.Integer, db.ForeignKey('icon_library.id'),
                        default=None)
    parent_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                          default=None)

    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'),
                          nullable=False)
    analytics = db.Column(db.Unicode)
    restricted_to_groups = db.relationship(
        "UserGroup",
        secondary=association_table,
        backref="sections",
        order_by="UserGroup.name"
    )
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    videos = db.relationship("SectionVideo", backref="section",
                             cascade="all, delete-orphan",
                             order_by='SectionVideo.created_at')
    parent = db.relationship("Section",
                             backref=db.backref(
                                 'children',
                                 cascade_backrefs=False,
                                 order_by='Section.order, Section.created_at'
                             ),
                             remote_side=[id],
                             foreign_keys=parent_id)

    icon = db.relationship("IconLibrary",
                           backref=db.backref("sections", uselist=False),
                           single_parent=True)
    translations = db.relationship("SectionTranslations", backref="section",
                                   cascade="all, delete-orphan")
    tenant = db.relationship("Tenant", backref="sections")
    faq_group = db.relationship("FAQGroup", backref="sections", uselist=False)

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    __table_args__ = (
        UniqueConstraint('tenant_id', 'slug',
                         name='uq_section_tenant_id_slug'),
    )

    @hybrid_property
    def icon_url(self):
        """
        Get section-icon's url.

        Return url by checking cdn ready flag and author mode,
        else if no icon return None.
        """
        if self.icon_id:
            return static_url(filename='media/' + self.icon.path)

    @hybrid_property
    def is_leafnode(self):
        """A section which contains only playlists not any other section."""
        children = [ch for ch in self.children
                    if ch.is_enabled and not ch.is_deleted and not ch.is_hidden]
        if len(children):
            return False

        playlists = [pl for pl in self.playlists
                     if pl.is_enabled and not pl.is_deleted]
        if len(playlists):
            return True

        # We consider empty section as leaf node as well,
        # since there is no content under this section
        return True

    @hybrid_method
    def get_progress(self, user_id):
        """Get the walkthourgh progress data."""
        # if section is leaf node, get playlists progress
        tenant_id = getattr(current_app, 'tenant_id', None)
        if self.playlists:
            progress = 0
            for playlist in self.playlists:
                progress += get_walkthrough_progress(playlist.walkthroughs,
                                                     tenant_id, user_id)
            return round(progress / (len(self.playlists) or 1), 2)
        elif self.children:
            avg_list = [child.get_progress(user_id)
                        for child in self.children if child.is_enabled]
            return sum(avg_list) / float(len(avg_list) or 1)
        else:
            return 0.0

    @hybrid_method
    def get_parent_cta(self):
        """If section has no campaign data inherit from parent section."""
        if self.parent_id:
            if self.parent.cta_list:
                return self.parent.cta_list
            return self.parent.get_parent_cta()
        return []

    @hybrid_method
    def get_category(self):
        """Recursive function to get the top level section."""
        if self.parent:
            return self.parent.get_category()

        return self

    @hybrid_method
    def check_private(self):
        """Check private section."""
        """
            Recursive function to check in the hierarchy
            if any section level is private.
        """
        if self.is_private:
            return True
        elif self.parent_id:
            return self.parent.check_private()

        return False

    @hybrid_method
    def is_available(self, include_is_hidden=True):
        """
        Check if section is available.

        Recursive function to check in the hierarchy
        if playlist or any parent section is enabled and not hidden.
        params:
            include_is_hidden - Boolean value defaults to True.
        ('include_is_hidden' will include 'is_hidden' attribute's value to check.
         Basically the purpose of this flag is to get the hidden sections as well.
         So when include_is_hidden=True, the if statement will return True,
         and when include_is_hidden=False, the if statement will return False)
        """
        if (
            self.is_deleted or
            not self.is_enabled or
            (not include_is_hidden and self.is_hidden)
        ):
            return False
        elif self.parent_id:
            return self.parent.is_available(include_is_hidden)

        return True

    @hybrid_method
    def can_edit(self, user=None):
        """Product access restriction check for the author-user."""
        if user == 'is_new':
            return True
        if not user:
            user = g.user
        if user.is_authenticated() and user.role_id == 1:
            return True
        category = self.get_category()
        from sharedemos.libs.api import is_author
        if is_author():
            for restricted_user in category.restricted_users:
                if restricted_user.user_id == user.id and\
                        not restricted_user.is_granted:
                    return False
            return True
        return False

    @hybrid_method
    def get_restricted_to_groups(self):
        """
        Recursive function to get retricted to group ids from self/parent.

        Returns tuple containing ( group_ids[], section_model ).
        """
        if self.restricted_to_groups:
            return (self.restricted_to_groups or [], self)
        if self.parent_id:
            return self.parent.get_restricted_to_groups()
        return ([], self)

    @hybrid_method
    def has_groups(self):
        """Return True is the model has group info at any level, else False."""
        return bool(self.get_restricted_to_groups()[0])

    @hybrid_method
    def is_restricted_to_groups(self, user_groups):
        """
        Check recursively whether the section is restricted to the 'user_groups'.

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
    def get_repository_details(self):
        """Function to get repository details for a given section."""
        if self.listener:
            return {
                "is_linked": True,
                "sync_status": self.listener.get_latest_sync().status[-1]
            }
        if self.parent_id:
            return self.parent.get_repository_details()
        return {}

    @hybrid_method
    def is_locale_available(self, locale):
        """Check for translations w.r.t 'locale'."""
        for translation in self.translations:
            if translation.language_id == locale:
                return True

        return False

    @hybrid_method
    def languages_available(self):
        """Return list of translaion ids."""
        return [t.language_id for t in self.translations]

    def __unicode__(self):
        """Return default locale name for the Section."""
        return self.get_name()

    def __repr__(self):
        """Section repr."""
        return self.__unicode__().encode('utf-8')


class SectionTranslations(TagBase):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)

    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)
    resource_id = db.Column(db.Integer, db.ForeignKey('resource.id'))

    tag_ids = db.Column(ARRAY(db.Integer, dimensions=1))

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    languages = db.relationship("Languages", backref='section_translations')
    resource = db.relationship("Resource",
                               backref=db.backref("section_translations",
                                                  uselist=False),
                               single_parent=True)


class SectionCTA(db.Model):

    __tablename__ = 'sections_cta'

    cta_id = db.Column(db.Integer, db.ForeignKey('lead_cta_form.id'),
                       nullable=False, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           nullable=False, primary_key=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)

    section = db.relationship("Section")
    cta = db.relationship("LeadCTAForm")

    def __unicode__(self):
        """Section CTA repr."""
        return unicode(self.section) + ' ' + unicode(self.cta)

    def __repr__(self):
        """Section CTA repr."""
        return self.__unicode__()


class SectionVideo(Base):

    id = db.Column(db.Integer, primary_key=True)
    link = db.Column(db.Unicode, nullable=False)
    poster_image = db.Column(db.Unicode)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           nullable=False)
    language_id = db.Column(db.Unicode, db.ForeignKey('languages.id'),
                            nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow,
                           nullable=False)
    modified_at = db.Column(db.DateTime,
                            default=datetime.utcnow,
                            onupdate=datetime.utcnow,
                            nullable=False)

    def __unicode__(self):
        """Section video repr."""
        return self.link


class SectionsRestrictedUsers(db.Model):

    __tablename__ = 'sections_restricted_users'

    section_id = db.Column(db.Integer, db.ForeignKey('section.id'),
                           primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'),
                        primary_key=True)
    is_granted = db.Column(db.Boolean, default=False, nullable=False)

    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    modified_at = db.Column(db.DateTime, default=datetime.utcnow,
                            onupdate=datetime.utcnow)

    created_by = db.Column(db.Integer, db.ForeignKey('users.id'))
    modified_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    restricted_section = db.relationship(
        "Section",
        backref=db.backref("restricted_users"))
    restricted_user = db.relationship(
        "User",
        backref=db.backref("restricted_sections"),
        foreign_keys=[user_id])


class SectionJourneys(db.Model):

    __tablename__ = 'section_journeys'

    id = db.Column(db.Integer, primary_key=True)
    section_id = db.Column(db.Integer, db.ForeignKey('section.id'), nullable=False)
    journey_id = db.Column(db.Integer, db.ForeignKey('journeys.id'), nullable=False)
    order = db.Column(db.Integer, nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)


event.listen(SectionTranslations, 'after_insert', create_section_slug)
event.listen(SectionTranslations, 'after_update', update_section_slug)
event.listen(SectionCTA, 'after_insert', clear_section_cache)
event.listen(SectionCTA, 'after_delete', clear_section_cache)
