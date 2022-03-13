from flask.ext.restful import fields

from sharedemos.libs.url import static_url

NAME_TITLE_REGEX = r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$'


class OptionField(fields.Raw):
    def format(self, value):
        if value is not None:
            if value.get("image"):
                value["image"] = static_url(filename="media/" + value["image"])
            return value
        return {}
