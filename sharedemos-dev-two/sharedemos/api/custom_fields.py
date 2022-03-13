from flask.ext.restful import fields, marshal

from sharedemos.libs.url import static_url


class MediaURL(fields.String):
    """Building MediaURL."""

    def format(self, value):
        """Function to build media url."""
        if value:
            return static_url(filename="media/" + value)


class NestedJSON(fields.Nested):
    """Custom JSON field.

    Allows returning an empty dictionary/list if marshaled value is None/empty
    """

    def __init__(self, nested, allow_empty=False, **kwargs):
        self.allow_empty = allow_empty
        super(NestedJSON, self).__init__(nested, **kwargs)

    def output(self, key, obj):
        value = fields.get_value(key if self.attribute is None
                                 else self.attribute, obj)
        if value is None or value == {} or value == []:
            if self.allow_null:
                return None
            elif self.allow_empty:
                return value

        return marshal(value, self.nested)
