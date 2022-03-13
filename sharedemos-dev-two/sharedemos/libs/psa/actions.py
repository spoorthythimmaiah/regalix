from social.utils import sanitize_redirect


def do_auth(backend, redirect_name='next'):
    # Clean any partial pipeline data
    backend.strategy.clean_partial_pipeline()

    # Save any defined next value into session
    data = backend.strategy.request_data(merge=False)

    # Save extra data into session.
    for field_name in backend.setting('FIELDS_STORED_IN_SESSION', []):
        if field_name in data:
            backend.strategy.session_set(field_name, data[field_name])

    if redirect_name in data:
        # Check and sanitize a user-defined GET/POST next field value
        redirect_uri = data[redirect_name]
        if backend.setting('SANITIZE_REDIRECTS', True):
            allowed_hosts = backend.setting('ALLOWED_REDIRECT_HOSTS', []) + \
                [backend.strategy.request_host()]
            redirect_uri = sanitize_redirect(allowed_hosts, redirect_uri)
        backend.strategy.session_set(
            redirect_name,
            redirect_uri or backend.setting('LOGIN_REDIRECT_URL')
        )
    return backend.start(backend.data.get('RelayState'))
