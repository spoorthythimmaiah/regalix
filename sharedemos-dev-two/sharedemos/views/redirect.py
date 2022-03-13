"""
    NOTE:  This view can be removed after some Period,
        Since the route defined is a corner case scenario.
"""
from flask import (
    Blueprint,
    redirect,
    url_for
)

redirect_bp = Blueprint('redirect', __name__)


@redirect_bp.route('/t/<product>/<section>/<chapter>/<slide_index>/')
def redirect_handler(product, section, chapter, slide_index):
    """
    Function handles the redirect url for the entities(section, chapter)
        which are under Nested Section.
    """
    return redirect(
        url_for("main.route_handler",
                section=section,
                chapter=chapter,
                slide_index=slide_index)
    )
