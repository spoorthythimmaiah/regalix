from wtforms import HiddenField

from .base import BaseModelView


class TagView(BaseModelView):
    column_exclude_list = ["tenant"]
    form_columns = ["name", "tenant_id"]
    form_extra_fields = {"tenant_id": HiddenField()}
