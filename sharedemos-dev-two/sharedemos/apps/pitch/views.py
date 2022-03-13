"""Sharedemos Apps -Pitch Views page."""
from flask import Blueprint, jsonify, request

from .utils import pitch_compare

pitch = Blueprint('pitch', __name__)


@pitch.route('/compare-callback', methods=['POST'])
def compare_callback():
    """
    Callback method for Pitch Comparison Api(P_C_A) service.

    The P_C_A service when it completes its processing,
    will send a POST request with the comparison result's data.

    #Note: This method is only invoked by the P_C_A service,
    so we are not bothered about sending back any response to it,
    as the service will not be waiting for any success or error responses.
    However all the exceptions will be logged onto the file.
    """
    pitch_compare(request.data)
    return jsonify(status='SUCCESS')
