from wtforms import HiddenField, TextAreaField

from .base import BaseModelView
from .helpers import JSONAdminConverter, SDQueryAjaxModelLoader

from sharedemos.models import (
    Section,
    SectionVideo,
    db
)


class SectionView(BaseModelView):
    can_delete = False
    column_searchable_list = ("slug",)
    column_list = ("parent", "slug", "order",
                   "is_enabled", "is_hidden", "is_deleted", "is_private",)
    form_ajax_refs = {
        "parent": SDQueryAjaxModelLoader(
            "parent",
            db.session,
            Section,
            fields=["slug"],
            filter_colmns=["playlists"]
        ),
    }

    form_columns = [
        "parent",
        "tenant_id",
        "analytics",
        "order",
        "is_enabled",
        "is_hidden",
        "is_deleted",
        "videos",
    ]
    form_extra_fields = {
        "tenant_id": HiddenField(),
        "analytics": TextAreaField()
    }
    inline_models = (
        (
            SectionVideo,
            dict(form_excluded_columns=["created_at", "modified_at"])
        ),
    )
    model_form_converter = JSONAdminConverter
