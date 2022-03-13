import os

from flask import current_app, request, url_for


def static_url(**values):
    filename = values.get('filename', None)
    # Used if we need to refer to system path(ex: while exporting pdf)
    if "_physical" in values and values["_physical"] and filename:
        if filename.startswith("media"):
            return os.path.join(
                current_app.config["MEDIA_FOLDER"],
                filename.replace("media/", "")
            )
        return os.path.join(
            current_app.config["STATIC_FOLDER"],
            filename
        )

    serve_from_cdn = False
    url = request.host

    # Pop _external value if exist
    force_external = values.pop("_external", False)

    if current_app.config["ASSET_CDN_ENABLED"] or\
            not filename.startswith("media"):
        if current_app.config.get('ASSET_CDN_URL'):
            serve_from_cdn = True

    # Add cache buster for all static files
    if not filename.startswith("media"):
        try:
            file_stat = os.stat(
                os.path.join(
                    current_app.static_folder,
                    filename
                )
            )
            values["_cb"] = file_stat.st_mtime
        except OSError:
            pass

    # Skip serving from cdn if: file is downloadable media
    # or it is a development environment
    if current_app.debug or not serve_from_cdn:
        url = current_app.url_map.bind(url)
        return url.build(
            "static",
            values=values,
            force_external=force_external
        )

    url = current_app.config['ASSET_CDN_URL']
    cdn_url = url.split("://")
    _domain = cdn_url[-1]
    _scheme = request.scheme
    if len(cdn_url) > 1:
        _scheme = cdn_url[0]

    url = current_app.url_map.bind(
        server_name=_domain,
        url_scheme=_scheme
    )
    return url.build("static", values=values, force_external=True)


def url_builder(endpoint, **values):
    if endpoint == 'static':
        return static_url(**values)

    return url_for(endpoint, **values)
