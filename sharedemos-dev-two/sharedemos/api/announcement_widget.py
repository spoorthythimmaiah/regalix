import json

from flask import current_app, session
from flask.ext.restful import fields, marshal, reqparse, Resource

from sharedemos.models import (
    db,
    AnnouncementWidget,
    AnnouncementWidgetTranslation,
    Tag, TenantFlags
)
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import get_translation
from sharedemos.libs.utils import create_update_tags

widget_fields = {
    'id': fields.Integer,
    'title': fields.String(attribute='_title'),
    'description': fields.String(attribute='_description'),
    'tags': fields.List(fields.String, attribute='_tags'),
    'result_title': fields.String(attribute='_result_title'),
}

parser = reqparse.RequestParser()
parser.add_argument('title', required=True, type=unicode,
                    location='form', help='Title required')
parser.add_argument('description', type=unicode,
                    location='form')
parser.add_argument('result_title', required=True, type=unicode,
                    location='form', help='Result title is required')
parser.add_argument('tags', required=True, type=unicode,
                    location='form')
parser.add_argument('widget_id', type=unicode, location='form')


class AnnouncementWidgetApi(Resource):
    """Widget Api for vmware."""

    method_decorators = [has_author_access]

    def get(self):
        """Fetch widget details for the tenant."""
        tenant_id = current_app.tenant_id
        tenant_flag = TenantFlags.query.filter(
            TenantFlags.tenant_id == tenant_id).first_or_404()
        if not tenant_flag.is_announcement_widget_enabled:
            raise SharedemosException(
                400,
                message="Announcement widget " + SharedemosException.FLAG_NOT_ENABLED
            )
        announcement_widget = AnnouncementWidget.query.filter(
            AnnouncementWidget.tenant_id == tenant_id
        ).first_or_404()
        announcement_widget_trans = get_translation(announcement_widget)
        announcement_widget._title = announcement_widget_trans.title
        announcement_widget._description = announcement_widget_trans.description
        chapter_tags = announcement_widget_trans.chapter_tags
        announcement_widget._tags = []
        if chapter_tags:
            tags = Tag.query.filter(Tag.id.in_(
                chapter_tags)).all()
            announcement_widget._tags = [unicode(tag) for tag in tags]
        announcement_widget._result_title = announcement_widget_trans.result_title

        return format_data(marshal(announcement_widget, widget_fields))

    def post(self):
        """Save the widget details to Database."""
        post_data = parser.parse_args()
        tenant_id = current_app.tenant_id
        tenant_flag = TenantFlags.query.filter(
            TenantFlags.tenant_id == tenant_id).first_or_404()
        # Since only one widget for a tenant, check whether widget is exists or not.
        if tenant_flag.tenant.announcement_widget:
            raise SharedemosException(400,
                                      message='Announcement widget already exists.')
        announcement_widget = AnnouncementWidget()
        announcement_widget.tenant_id = tenant_id
        announcement_widget.created_by = session.get('user_id')
        announcement_widget_trans = AnnouncementWidgetTranslation()
        announcement_widget_trans.title = post_data.get('title')
        announcement_widget_trans.description = post_data.get('description')
        announcement_widget_trans.result_title = post_data.get('result_title')
        announcement_widget_trans.chapter_tags = create_update_tags(
            json.loads(post_data.get('tags')))
        announcement_widget_trans.language_id = session['author']['locale']
        announcement_widget_trans.announcement_widget = announcement_widget
        tenant_flag.is_announcement_widget_enabled = True
        db.session.add_all([announcement_widget_trans, announcement_widget, tenant_flag])
        db.session.commit()

        return format_data(marshal(announcement_widget, widget_fields)), 200

    def put(self):
        """Save the changes of existing widget."""
        put_data = parser.parse_args()
        tenant_id = current_app.tenant_id
        widget_id = put_data.get('widget_id')
        announcement_widget = AnnouncementWidget.query.filter(
            AnnouncementWidget.id == widget_id,
            AnnouncementWidget.tenant_id == tenant_id).first_or_404()
        translation = get_translation(announcement_widget, author=True)
        if not translation:
            translation = AnnouncementWidgetTranslation()
            translation.language_id = session['author']['locale']
        translation.title = put_data.get('title')
        translation.description = put_data.get('description')
        translation.result_title = put_data.get('result_title')
        translation.chapter_tags = create_update_tags(
            json.loads(put_data.get('tags')))
        translation.announcement_widget = announcement_widget
        announcement_widget.modified_by = session.get('user_id')
        db.session.add_all([translation, announcement_widget])
        db.session.commit()

        return format_data(marshal(announcement_widget, widget_fields)), 200
