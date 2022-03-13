from wtforms import HiddenField, TextAreaField

from sharedemos.libs.helpers import (
    clear_bulletin_board_cache,
    clear_samples_cache
)
from sharedemos.models import (
    BulletinBoardTranslations,
    Section,
    UserGroup,
    db
)

from .base import BaseModelView
from .helpers import JSONAdminConverter, SDQueryAjaxModelLoader


class ApplicationView(BaseModelView):
    column_list = ["name", "unique_id", "is_enabled"]
    form_columns = ("name", "unique_id", "description", "is_enabled")


def bulletin_board_name(view, context, model, name):
    """
    Display the name of bulletin board.

    Returns unicode of model i.e BulletinBoardTranslations name.
    """
    return unicode(model)


class BulletinBoardAppView(BaseModelView):

    inline_models = [(
        BulletinBoardTranslations,
        dict(form_excluded_columns=["created_at", "modified_at"])),
    ]

    column_list = ["name", "order", "is_enabled", "is_deleted", "tenant",
                   "section", "modified_at"]

    column_formatters = {
        "name": bulletin_board_name
    }
    model_form_converter = JSONAdminConverter
    form_columns = [
        "tenant_id",
        "order",
        "is_deleted",
        "is_enabled",
        "section",
        "translations",
        "restricted_to_groups"
    ]
    form_extra_fields = {"tenant_id": HiddenField(), }

    form_ajax_refs = {
        "section": SDQueryAjaxModelLoader(
            "section",
            db.session,
            Section,
            fields=["slug"]
        ),
        "restricted_to_groups": SDQueryAjaxModelLoader(
            "restricted_to_groups",
            db.session,
            UserGroup,
            fields=["name"]
        )
    }

    def after_model_change(self, form, model, is_created):
        clear_bulletin_board_cache(model)

    def after_model_delete(self, model):
        clear_bulletin_board_cache(model)


class SampleExchangeAppView(BaseModelView):
    column_list = ["title", "description", "result_title", "platform", "tags"]
    form_columns = ["title", "description", "result_title", "platform",
                    "tags", "tenant_id"]
    form_extra_fields = {
        "description": TextAreaField(),
        "tenant_id": HiddenField()
    }

    def after_model_change(self, form, model, is_created):
        clear_samples_cache()

    def after_model_delete(self, model):
        clear_samples_cache()
