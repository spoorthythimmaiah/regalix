from wtforms import HiddenField

from .base import BaseModelView


class UserView(BaseModelView):
    column_list = ["first_name", "last_name", "email",
                   "role", "unique_id", "is_deleted",
                   "last_login"]
    column_searchable_list = ("first_name", "last_name", "email")

    form_extra_fields = {
        "tenant_id": HiddenField()
    }

    form_columns = [
        "role",
        "first_name",
        "last_name",
        "email",
        "password",
        "tenant_id",
    ]


class UserGroupView(BaseModelView):
    form_columns = [
        "name",
        "description",
        "group_code",
        "role",
        "idp_entity_id",
        "idp_url",
        "idp_x509cert",
        "idp_first_name",
        "idp_last_name",
        "idp_username",
        "idp_email",
        "idp_usertype",
        "tenant_id",
        "is_default"
    ]
    form_extra_fields = {"tenant_id": HiddenField()}
    column_list = ["name", "is_default"]
