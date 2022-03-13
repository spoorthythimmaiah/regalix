import json

from flask import current_app
from flask.ext.admin.contrib.sqla import form
from flask.ext.admin.contrib.sqla.ajax import QueryAjaxModelLoader
from flask.ext.admin.model.ajax import DEFAULT_PAGE_SIZE
from flask.ext.admin.model.form import converts
from sqlalchemy import and_
from wtforms import fields


class DictToJSONField(fields.TextAreaField):
    def process_data(self, value):
        if value is None:
            value = {}

        self.data = json.dumps(value)

    def process_formdata(self, valuelist):
        if valuelist:
            self.data = json.loads(valuelist[0])
        else:
            self.data = "{}"


class JSONAdminConverter(form.AdminModelConverter):
    @converts("JSON")
    def conv_json(self, field_args, **extra):
        return DictToJSONField(**field_args)


class SDQueryAjaxModelLoader(QueryAjaxModelLoader):
    def __init__(self, name, session, model, **options):
        """
        Constructor.

            :param filter_colmn (optional):
                Field to filter which has null value
        """
        super(SDQueryAjaxModelLoader, self).__init__(
            name, session, model, **options)
        self.filter_colmns = options.get("filter_colmns", None)

    def get_list(self, term, offset=0, limit=DEFAULT_PAGE_SIZE):
        tenant_id = getattr(current_app, "tenant_id", None)
        if not tenant_id:
            return list()

        query = self.session.query(self.model)
        if getattr(self.model, "tenant_id", None):
            query = query.filter(self.model.tenant_id == tenant_id)

        # patch fix to display only choices filtered based on Tenant.
        if not isinstance(self._cached_fields[0], int):
            filters = (
                field.ilike(u"%%%s%%" % term) for field in self._cached_fields)
            query = query.filter(and_(*filters))

        if self.filter_colmns is not None:
            query = query.filter_by(
                **{filter_colmn: None for filter_colmn in self.filter_colmns})

        return query.offset(offset).limit(limit).all()
