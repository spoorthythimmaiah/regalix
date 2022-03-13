"""Custom Exceptions."""
from werkzeug.exceptions import HTTP_STATUS_CODES


class SharedemosException(Exception):

    status_code = 404

    ACCESS_RESTRICTED = 'CONTENT EDIT ACCESS RESTRICTED.'
    DATA_MISSING = 'DATA MISSING.'
    MEDIA_CONVERSION_FAILED = 'FAILED TO CONVERT PPT TO PDF.'
    DEFAULT_TRANSLATION_MISSING = 'Default language %s translation missing'
    FILE_MISSING = 'RESOURCE/MEDIA/ASSET FILE MISSING'
    FLAG_NOT_ENABLED = 'FLAG IS NOT ENABLED.'
    ID_MISSING = 'ID MISSING'
    INVALID_REQUEST = 'Invalid request'
    LENGTH_EXCEEDED = '%s length exceeded'
    SPECIAL_CHARACTERS = '%s contains special characters'
    UNABLE_TO_DELETE = ("Unable to delete, "
                        "no content or "
                        "default locale content can't be deleted over a non default locale")

    def __init__(self, status_code=None, message=None, payload=None):
        Exception.__init__(self)
        if status_code is not None:
            self.status_code = status_code
        self.message = message if message else HTTP_STATUS_CODES[self.status_code]

        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
