from flask import abort
from sharedemos.libs.core import create_app, DomainDispatcher
from sharedemos.models import Tenant


def make_app(domain):

    app = create_app('sharedemos')
    tenant_id = Tenant.get_tenant_for_domain(domain)
    # Abort if tenant is invalid/unavailable
    if not tenant_id:
        abort(404)

    app.tenant_id = tenant_id

    return app


application = DomainDispatcher(make_app)
