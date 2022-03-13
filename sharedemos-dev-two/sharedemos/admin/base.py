from flask import current_app, request
from flask.ext.admin.contrib.sqla import ModelView, tools
from flask.ext.login import current_user
from sqlalchemy import asc, desc, or_


# Flask and Flask-SQLAlchemy initialization here
class BaseModelView(ModelView):
    # filter redundant fields for display
    column_exclude_list = ["created_at", "modified_at"]

    # the number of entries to display on the list view
    page_size = 10

    def can_create(self):
        return current_user.is_authenticated() and current_user.is_author()

    def can_delete(self):
        return self.is_accessible()

    def can_edit(self):
        return current_user.is_authenticated() and current_user.is_author()

    def is_accessible(self):
        return current_user.is_authenticated() and current_user.is_author()

    def get_list(self, page, sort_field, sort_desc, search, filters,
                 page_size=True):

        query = self.get_query()
        tenant_id = getattr(current_app, "tenant_id", None)
        if hasattr(self.model, "tenant_id"):
            query = query.filter(self.model.tenant_id == tenant_id)
        elif hasattr(self.model, "domain"):
            query = query.filter(self.model.id == tenant_id)

        # Apply search
        if self._search_supported and search:
            # Apply terms
            terms = search.split(' ')
            for term in terms:
                if not term:
                    continue

                stmt = tools.parse_like_term(term)

                filter_stmt = []
                for _c in self._search_fields:
                    col = _c[0]
                    if type(col.type).__name__ == 'JSON':
                        filter_stmt.append(col["text"].astext.ilike(stmt))
                    else:
                        filter_stmt.append(col.ilike(stmt))

            query = query.filter(or_(*filter_stmt))

        if sort_field:
            sort_order = asc if sort_desc else desc
            query = query.order_by(sort_order(sort_field))

        return query.count(), query.offset(page * page_size).limit(page_size)

    def validate_form(self, form):
        """
        Custom Validator.

            -Adds tenant_id to the form data.
        """
        if request.method not in ('POST', 'PUT'):
            return False

        ret_val = super(BaseModelView, self).validate_form(form)

        if getattr(form, 'tenant_id', None):
            tenant_id = getattr(current_app, 'tenant_id', None)
            form.tenant_id.data = tenant_id

        return ret_val
