"""Recommendations App Helper modules."""
from datetime import datetime, timedelta

from flask import current_app, g

from sharedemos.libs.utils import get_valid_chapters
from sharedemos.models import (
    User,
    UserActivity,
    UserGroup,
    UserGroupMappings,
    WalkthroughActivity
)


def is_new_user(user):
    """Return True or False depending upon the user creation time."""
    today = datetime.today()

    # Check if user has been created today 15 minutes ago.
    if user.created_at > (today - timedelta(minutes=15)):
        return True

    return False


class ActivityHistory(object):
    """ActivityHistory fetches default recommended content or assets' history."""

    def __init__(self, app='library', asset_type='chapter', limit=5):
        """
        Initialize with default params.

        Since as of now only 'library' app is where recommendations
        are being used and only on the chapters.
        'library' and 'chapter' will be the default values to fetch
        recommendations.
        """
        self.app = app
        self.asset_type = asset_type
        self.user = g.user
        self.limit = limit

    def fetch_activity_history(self):
        """
        Fetch the user activity history on the type of the asset.

        The user activity based on App and type of asset
        consumed over a period of past time will be
        fetched and a dict containing top 5 list of valid asset ids is returned.
        The default limit is '5'.
        """
        tenant_id = current_app.tenant_id

        activity_history = {
            'type': None,
            'ids': []
        }
        if self.app == 'library' and self.asset_type == 'chapter':
            activity_history['type'] = 'chapter'
            activities = WalkthroughActivity.query.join(
                UserActivity
            ).distinct(
                WalkthroughActivity.walkthrough_id
            ).filter(
                UserActivity.tenant_id == tenant_id,
                UserActivity.user_id == self.user.id,
            ).with_entities(
                WalkthroughActivity.walkthrough_id
            ).order_by(
                WalkthroughActivity.walkthrough_id,
                WalkthroughActivity.created_at.desc()
            ).limit(self.limit)

            # Check the walkthrough_id for valid walkthroughs.
            chapter_ids = [activity.walkthrough_id for activity in activities]
            valid_chapters = get_valid_chapters(chapter_ids)
            activity_history['ids'] = [chapter.Walkthrough.id for chapter in valid_chapters]

        return activity_history

    def fetch_default_recommendations(self):
        """
        Fetch the default user group recommendations.

        Whenever there is no user's activity over a type of asset,
        then check the other users in the group and fetch the
        most popular content and display them as recommendations.
        """
        recommendations = []

        tenant_id = current_app.tenant_id
        current_user_groups = self.user.user_group_slugs()

        if not current_user_groups:
            return recommendations

        if self.app == 'library' and self.asset_type == 'chapter':
            activities = WalkthroughActivity.query.join(
                UserActivity, UserActivity.id == WalkthroughActivity.report_user_id
            ).join(
                User, User.id == UserActivity.user_id
            ).join(
                UserGroupMappings, UserGroupMappings.user_id == User.id
            ).join(
                UserGroup, UserGroup.id == UserGroupMappings.group_id
            ).distinct(
                WalkthroughActivity.walkthrough_id
            ).filter(
                WalkthroughActivity.tenant_id == tenant_id,
                UserGroup.slug.in_(current_user_groups),
            ).with_entities(
                WalkthroughActivity.walkthrough_id
            ).order_by(
                WalkthroughActivity.walkthrough_id,
                WalkthroughActivity.created_at.desc()
            ).limit(self.limit)

            # Check the walkthrough_id for valid walkthroughs.
            chapter_ids = [activity.walkthrough_id for activity in activities]
            recommendations = get_valid_chapters(chapter_ids)

        return recommendations
