from wtforms import HiddenField

from .base import BaseModelView
from .helpers import (
    JSONAdminConverter,
    SDQueryAjaxModelLoader
)

from sharedemos.models import CTATranslations, LeadCTAForm, Section, db


class CTAView(BaseModelView):
    column_list = ("cta_type", "created_at")
    column_searchable_list = ("translations.name",)
    form_columns = [
        "tenant_id",
        "cta_type",
        "translations",
    ]
    form_choices = {
        "cta_type": [
            ("link", "LINK"),
            ("pdf", "PDF"),
            ("form", "FORM")
        ]
    }
    form_extra_fields = {"tenant_id": HiddenField(), }
    model_form_converter = JSONAdminConverter
    inline_models = (
        (
            CTATranslations,
            dict(form_excluded_columns=["created_at", "modified_at"])
        ),
    )


class SectionCTAView(BaseModelView):
    form_columns = [
        "section",
        "cta"
    ]
    column_list = ["section", "cta"]
    column_default_sort = "section"
    form_ajax_refs = {
        "section": SDQueryAjaxModelLoader(
            "section",
            db.session,
            Section,
            fields=["slug"]
        ),
        "cta": SDQueryAjaxModelLoader(
            "cta",
            db.session,
            LeadCTAForm,
            fields=[CTATranslations.name]
        ),
    }
