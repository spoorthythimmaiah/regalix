from flask_wtf import Form
from wtforms import (
    BooleanField,
    StringField,
    FileField,
    HiddenField,
    PasswordField,
    validators
)

from sharedemos.libs.helpers import check_extensions


class TenantForm(Form):
    ALLOWED_EXTENSIONS = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/vnd.microsoft.icon',
        'image/x-icon'
    ]
    name = StringField(u'Name')
    domain = StringField(u'Domain')
    description = StringField(u'Description')
    timezone = FileField(u'Timezone')
    title = StringField(u'Title Msg', default=u'Product Walkthroughs')
    logo = FileField(u'Logo', validators=[
        check_extensions(ALLOWED_EXTENSIONS)])
    remove_logo = HiddenField(u'Remove Logo?', default=False)
    favicon = FileField(u'Favicon', validators=[
        check_extensions(ALLOWED_EXTENSIONS)])
    remove_favicon = HiddenField(u'Remove Favicon?', default=False)
    is_private = BooleanField(u'Private?')
    allow_offline = BooleanField(u'Offline?')
    can_download = BooleanField(u'Download?')
    can_embed = BooleanField(u'Embed?')
    is_general = BooleanField(u'General?')
    enable_box = BooleanField()
    enable_announcement_widget = BooleanField()
    chapter_autoflow = BooleanField()
    show_notes = BooleanField()
    enable_homepage_banner = BooleanField()
    background_color = StringField(u'Background Color')
    progress_bar_color = StringField(u'Progress Bar Color')
    title_color = StringField(u'Title Color')
    paragraph_color = StringField(u'Paragraph Color')


class ResetPasswordForm(Form):
    newPassword = PasswordField(
        u'New Password', [
            validators.Required(),
            validators.EqualTo(
                'reenterpassword',
                message='Passwords must match')]
    )
    reenterpassword = PasswordField(
        u'Re-Enter Password',
        [validators.Required()])
