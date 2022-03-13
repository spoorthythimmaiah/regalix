from wtforms import HiddenField

from .base import BaseModelView


class LanguageView(BaseModelView):
    column_display_pk = True
    form_columns = ("id", "name")


class SupportedLanguageView(BaseModelView):
    column_exclude_list = ["tenant", "created_at", "modified_at"]
    form_columns = ["tenant_id", "language", "is_public"]
    form_extra_fields = {"tenant_id": HiddenField()}
