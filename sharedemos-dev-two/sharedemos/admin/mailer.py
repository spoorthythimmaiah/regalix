from flask import request
from flask.ext.admin.form.fields import Select2Field
from wtforms import HiddenField, SelectMultipleField

from .base import BaseModelView
from .helpers import SDQueryAjaxModelLoader
from sharedemos.models import db, Section, MailDigestUsers


class MailerView(BaseModelView):
    """Mailer view."""

    column_exclude_list = ["tenant"]

    form_extra_fields = {
        "frequency": Select2Field(
            "Frequency",
            choices=(
                ("weekly", "Weekly"),
                ("monthly", "Monthly"),
                ("quarterly", "Quarterly")
            )
        ),
        "tenant_id": HiddenField(),
        "show_leads": HiddenField(False),
        "show_visitors": HiddenField(False),
        "show_viewers": HiddenField(False),
        "show_content_updates": HiddenField(False),
        "show_new_content": HiddenField(False),
        "user_data": SelectMultipleField(
            "User Data",
            choices=[("leads", "Leads"),
                     ("viewers", "Viewers"),
                     ("visitors", "Visitors"),
                     ("content_updates", "Content Updates"),
                     ("new_content", "New Content")],
            default=["visitors", ]),
    }

    form_ajax_refs = {
        "section": SDQueryAjaxModelLoader(
            "section",
            db.session,
            Section,
            fields=["slug"],
            filter_colmns=["parent_id"]
        ),
    }
    form_excluded_columns = ["mail_digest_users", "tenant"]
    inline_models = [MailDigestUsers]

    def on_form_prefill(self, form, id):
        """Prefill selected options to the form"s user_data."""
        form.user_data.data = list()
        if form.show_leads.data:
            form.user_data.data.append("leads")
        if form.show_viewers.data:
            form.user_data.data.append("viewers")
        if form.show_visitors.data:
            form.user_data.data.append("visitors")
        if form.show_content_updates.data:
            form.user_data.data.append("content_updates")
        if form.show_new_content.data:
            form.user_data.data.append("new_content")

    def validate_form(self, form):
        if request.method not in ("POST", "PUT"):
            return False
        is_valid = super(MailerView, self).validate_form(form)

        form.show_leads.data = True if "leads" in form.user_data.data\
            else False
        form.show_viewers.data = True if "viewers" in form.user_data.data\
            else False
        form.show_visitors.data = True if "visitors" in form.user_data.data\
            else False
        form.show_content_updates.data = True if "content_updates" in\
            form.user_data.data else False
        form.show_new_content.data = True if "new_content" in\
            form.user_data.data else False

        """
            FailSafe - if in case no option is selected
                then set default option to visitors.
        """
        if not form.user_data.data:
            form.show_visitors.data = True

        return is_valid
