from wtforms import HiddenField, TextAreaField

from .base import BaseModelView
from .helpers import JSONAdminConverter
from sharedemos.models import (
    TenantFooterTranslations,
    TenantHeaderTranslations
)


class TenantAppsView(BaseModelView):
    model_form_converter = JSONAdminConverter
    column_exclude_list = ["tenant"]
    form_columns = ["application", "tenant_id", "app_data"]
    form_extra_fields = {"tenant_id": HiddenField()}


class TenantHeaderView(BaseModelView):
    column_list = ["tenant", "is_deleted"]
    form_columns = [
        "tenant_id",
        "is_deleted",
        "translations",
    ]
    form_extra_fields = {"tenant_id": HiddenField()}

    inline_models = [
        (
            TenantHeaderTranslations,
            dict(form_excluded_columns=["created_at", "modified_at"])
        ),
    ]


class TenantFlagView(BaseModelView):
    column_exclude_list = ["tenant", "created_at",
                           "modified_at", "is_announcement_widget_enabled",
                           "enable_homepage_banner"]
    form_excluded_columns = ("tenant", "created_at",
                             "modified_at", "is_announcement_widget_enabled",
                             "enable_homepage_banner")
    form_extra_fields = {"tenant_id": HiddenField()}


class TenantFooterView(BaseModelView):
    column_list = ["tenant", "is_deleted"]

    model_form_converter = JSONAdminConverter
    form_columns = [
        "tenant_id",
        "is_deleted",
        "translations"
    ]
    form_extra_fields = {"tenant_id": HiddenField()}

    inline_models = [
        (
            TenantFooterTranslations,
            dict(form_excluded_columns=["created_at", "modified_at"])
        ),
    ]


class TenantView(BaseModelView):

    column_list = ("name", "title", "domain", "timezone",)

    form_choices = {
        "template": [
            ("avaya", "AVAYA"),
            ("bmc", "BMC"),
            ("box", "BOX"),
            ("default", "DEFAULT"),
            ("dell", "DELL"),
            ("designeverest", "DESIGNEVEREST"),
            ("grid", "GRID"),
            ("helpsite", "HELPSITE"),
            ("purestorage", "PURESTORAGE"),
            ("regalix", "REGALIX"),
            ("silverpeak", "SILVERPEAK"),
            ("vmware", "VMWARE")
        ]
    }

    form_columns = [
        "name",
        "title",
        "domain",
        "template",
        "analytics",
        "campaign_tracking_code",
        "default_locale",
        "supported_locales",
        "privacy_link",
        "crm_settings",
        "sp_public_certificate",
        "sp_private_key",
        "idp_entity_id",
        "idp_url",
        "idp_x509cert",
        "idp_first_name",
        "idp_last_name",
        "idp_username",
        "idp_email",
        "idp_usertype"
    ]

    form_extra_fields = {
        "analytics": TextAreaField()
    }
