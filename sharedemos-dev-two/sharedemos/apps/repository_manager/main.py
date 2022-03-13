from email.utils import formataddr
from email.header import Header
from email.MIMEText import MIMEText
import json
import magic
import os
import re
import shutil
from urllib import unquote

from flask import current_app, url_for

from sqlalchemy.ext.mutable import MutableDict
from sqlalchemy.orm import joinedload
from werkzeug.datastructures import FileStorage

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import(
    Mailer,
    convert_file_to_pdf,
    create_folder,
    generate_pdf_thumbnail,
    get_rackspace_container,
    upload_to_wistia
)
from sharedemos.libs.model import log_activity_feed
from sharedemos.models import(
    db,
    DraftSlide,
    DraftWalkthrough,
    DraftWalkthroughTranslations,
    Playlist,
    PlaylistTranslations,
    Resource as ResourceModel,
    Section,
    SectionTranslations,
    Tenant,
    User
)


class RepositoryManager(object):
    """
    Repository manager.

    Performs
        1. Content creation,
        2. Resource management(during exception)
        3. Activity tracking
        4. sending mail to users for reporting sync status.
    Return content creation status(success/failed)
    """

    def __init__(self, is_private=False, is_hidden=False,
                 user_id=None, default_locale_id=None, section_id=None):
        """Init Function to initialize the varibales."""
        self.default_locale_id = default_locale_id
        self.is_private = is_private
        self.is_hidden = is_hidden
        self.user_id = user_id
        self.section_id = section_id

        self.cloud_base_path = None
        self.activity_feeder_list = []
        self.saved_resource_list = []

    def read_json(self, json_path):
        """
        Get the contents from reposoitory_manager.

        create respective content in sdemos platform.
        params:
            "json_path": json file path(file path in rackspace)
        """
        try:
            section = Section.query.filter(
                Section.id == self.section_id
            ).options(
                joinedload(Section.tenant),
                joinedload(Section.tenant).joinedload(Tenant.flags)
            ).first_or_404()
            container = get_rackspace_container()
            repository_object = container.get_object(json_path)
            repository_data = json.loads(repository_object.fetch())

            # updating mapping_id for initially created section.
            section.mapping_id = repository_data["root_folder"]["id"]
            db.session.add(section)

            self.cloud_base_path = repository_data.get("cloud_base_path")
            self.default_locale_id = section.tenant.default_locale_id
            self.is_private = section.tenant.flags.is_private
            self.user_id = section.created_by

            # add initially created section activity to activity_feeder_list
            self.activity_feeder_list.append({
                "action": u"created",
                "entity": u"section",
                "section": section,
                "primary_user_id": self.user_id,
                "author_locale": self.default_locale_id
            })

            self.create_library_content(
                folder=repository_data,
                parent_section=section
            )

        except Exception as e:
            # delete media files for newly created content during exception.
            for file in self.saved_resource_list:
                self.delete_file(file)

            return {
                "status": "CONTENT_CREATION_FAILED",
                "message": e.message
            }
        else:
            db.session.commit()
            for activity in self.activity_feeder_list:
                log_activity_feed(**activity)

            return {"status": "CONTENT_CREATION_COMPLETED"}

    def create_library_content(self, folder, parent_section):
        """
        Function to recursively create library content.

        params:
            folder: repository folder details(json object)
        """
        # For root folder, don't create section.
        if folder.get("root_folder"):
            folder = folder["root_folder"]
        else:
            folder["parent_id"] = parent_section.id
            parent_section = self.create_section(data=folder)
        sub_folders = folder["sub_folders"]
        files = folder["files"]
        for folder in sub_folders:
            self.create_library_content(
                folder=folder,
                parent_section=parent_section
            )

        if not sub_folders and files:
            playlist = self.create_playlist(parent_section)
            for file in files:
                self.create_chapter(file, playlist)

    def create_section(self, data):
        """
        Create Section.

        params: data = {
            "name": Name of the section
            "id": repository_manager mapping id.
        }
        """
        # Initialize the class variables.
        parent_id = None
        if data.get("parent_id"):
            parent_id = data["parent_id"]

        tenant_id = current_app.tenant_id
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            data['name']
        )

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name'
            )

        last_child = Section.query.filter(
            Section.tenant_id == tenant_id,
            Section.parent_id == parent_id,
            Section.is_deleted.__eq__(False)
        ).order_by(
            Section.order.desc()
        ).first()
        order = (last_child.order + 1) if last_child else 1

        name = self.get_valid_name(str(data["name"]))
        section = Section(
            order=order,
            tenant_id=tenant_id,
            created_by=self.user_id,
            modified_by=self.user_id,
            is_hidden=self.is_hidden,
            is_private=self.is_private,
            mapping_id=data.get("id"),
            parent_id=parent_id
        )

        translation = SectionTranslations(
            language_id=self.default_locale_id,
            name=name,
            title=name,
            section=section
        )

        db.session.add_all([section, translation])
        db.session.flush()

        # for activity tracking, add section created activity
        # to activity_feeder_list
        self.activity_feeder_list.append({
            "action": u"created",
            "entity": u"section",
            "section": section,
            "primary_user_id": self.user_id,
            "author_locale": self.default_locale_id
        })

        return section

    def create_playlist(self, section):
        """Create a playlist for a given section."""
        playlist = Playlist(
            order=len(section.playlists) + 1,
            tenant_id=current_app.tenant_id,
            created_by=section.created_by,
            modified_by=section.modified_by,
            section_id=section.id,
            mapping_id=section.mapping_id
        )

        translation = PlaylistTranslations(
            name=section.get_name(),
            language_id=self.default_locale_id,
            playlist=playlist
        )

        db.session.add_all([playlist, translation])
        db.session.flush()

        # for activity tracking , add playlist created activity
        # to activity_feeder_list
        self.activity_feeder_list.append({
            "action": u'created',
            "entity": u'playlist',
            "playlist": playlist,
            "section": section,
            "primary_user_id": self.user_id,
            "author_locale": self.default_locale_id
        })
        return playlist

    def create_chapter(self, file, playlist):
        """
        Function to create new chapter under a given playlist.

        1. need to create a chapter with name same as file object name.
        2. create slide under newly created chapter.
        3. download and save respective resource in local storage
        """
        name, extention = os.path.splitext(file["name"])
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            name
        )

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        name = self.get_valid_name(name)
        chapter = DraftWalkthrough(
            order=len(playlist.draft_walkthroughs) + 1,
            tenant_id=current_app.tenant_id,
            created_by=self.user_id,
            modified_by=self.user_id,
            playlist=playlist,
            mapping_id=file.get("id")
        )

        translation = DraftWalkthroughTranslations(
            language_id=self.default_locale_id,
            title=name,
            name=name,
            walkthrough=chapter
        )

        db.session.add_all([chapter, translation])
        db.session.flush()

        slide = self.create_slide(chapter)
        resource = self.create_resouce(file)
        slide.primary_resource_id = resource.id
        db.session.add(slide)

        # for activity tracking , add chapter created activity
        # to activity_feeder_list
        self.activity_feeder_list.append({
            "action": u'created',
            "entity": u'walkthrough',
            "section": playlist.section,
            "playlist": playlist,
            "draft_walkthrough": chapter,
            "author_locale": self.default_locale_id,
            "primary_user_id": self.user_id
        })
        return chapter

    def create_slide(self, chapter):
        """Function to create a slide."""
        slide = DraftSlide()
        slide.order = 1
        slide.tenant_id = current_app.tenant_id
        slide.walkthrough_id = chapter.id

        db.session.add(slide)

        return slide

    def create_resouce(self, file_details):
        """
        Function to create resource object and save respective resources.

        param: dictionary containing file_details,
            eg: {
                  "name": power_edge.docx
                  "downloadable_file":"c85f9314-a37d-444e-9ce7-312f2d9a10d7.docx",
                  "id":"c85f9314-a37d-444e-9ce7-312f2d9a10d7",
                },
                resource type : docx
        download the file from rackspace by using file id,
        create a resouce based on file extention
        """
        name, extention = os.path.splitext(file_details["name"])
        resource = ResourceModel()
        resource.language_id = self.default_locale_id
        resource.tenant_id = current_app.tenant_id
        resource.name = self.get_valid_name(name)
        resource.path = self.save_file(file_details)
        resource.meta_data = MutableDict()

        file_abs_path = os.path.join(
            current_app.config["MEDIA_FOLDER"],
            file_details["downloadable_file"]
        )

        resource_type = self.get_file_type(file_abs_path)

        if resource_type == u"wistia":
            # upload a video to wistia and delete it from local storage.
            with open(file_abs_path, "rb") as _video:
                upload_to_wistia(resource, FileStorage(_video))

            resource.name = name
            self.delete_file(file_details["downloadable_file"])

        elif resource_type == u"html5":
            tenant = Tenant.query.get(current_app.tenant_id)
            # Get the absolute path of the html folder specific to tenant.
            tenant_zip_folder = create_folder(
                'html_zip',
                tenant.unique_tenant_id
            )

            # Get the unique folder name for current html zip file.
            html_folder_name = create_folder(parent_path=tenant_zip_folder)
            zip_folder_path = "{}/{}".format(tenant_zip_folder,
                                             html_folder_name)
            resource.path = html_folder_name
            with open(file_abs_path, "rb") as _html_file:
                resource_file = FileStorage(_html_file)
                file_path = "{}/{}".format(
                    zip_folder_path,
                    'index.html'
                )
                resource_file.save(file_path)

            # add folder containing html zip file to saved_resource_list
            # for deleting during exception.
            self.saved_resource_list.append(
                "{}/{}/{}".format("html5", tenant.unique_tenant_id,
                                  zip_folder_path)
            )

        elif resource_type == u"pdf":
            # check the file extention, if file is of docx/doc or ppt,
            # need to convert file to pdf and update the meta_data.
            if extention in (".doc", ".docx", ".ppt"):
                try:
                    source_file = os.path.join(
                        current_app.config.get('MEDIA_FOLDER'),
                        file_details["downloadable_file"]
                    )
                    convert_file_to_pdf(source_file)

                    filename, file_extension = os.path.splitext(
                        file_details["downloadable_file"]
                    )
                    # Check the availability of PDF after converting file->PDF.
                    if not os.path.exists(
                        os.path.join(
                            current_app.config.get('MEDIA_FOLDER'),
                            u'{}.{}'.format(filename, 'pdf'))
                    ):
                        raise SharedemosException(
                            424,
                            message=SharedemosException.MEDIA_CONVERSION_FAILED
                        )
                    resource.path = unicode("{}{}".format(filename, ".pdf"))
                    resource.meta_data = {
                        'source_type': unicode(extention[1:]),
                        'source_name': "{}{}".format(filename, file_extension)
                    }
                    # add converted pdf file to saved_resource_list.
                    self.saved_resource_list.append(
                        "{}{}".format(filename, ".pdf"))

                except Exception, e:
                    raise SharedemosException(400, message=str(e))

            resource.meta_data["thumbnail_url"] = generate_pdf_thumbnail(
                resource.path
            )

        elif resource_type == u"file":
            resource.meta_data = {
                'type': extention,
                'size': os.path.getsize(file_abs_path)
            }

        resource.resource_type = unicode(resource_type)
        db.session.add(resource)
        db.session.flush()

        return resource

    def save_file(self, resource_file):
        """
        Download a file from rackspace and save it in media folder.

        params-
            resource_file- FileStorage object of a resource file.
        """
        try:
            container = get_rackspace_container()
            file_path = "{}/{}".format(
                self.cloud_base_path,
                resource_file["downloadable_file"]
            )
            if not os.path.exists(current_app.config.get('MEDIA_FOLDER')):
                os.makedirs(current_app.config.get('MEDIA_FOLDER'))

            container.download(
                file_path,
                current_app.config["MEDIA_FOLDER"],
                structure=False
            )

            self.saved_resource_list.append(resource_file["downloadable_file"])

            return resource_file["downloadable_file"]

        except Exception as e:
            raise SharedemosException(400, message=e.message)

    def delete_file(self, file_name):
        """Function to delete resouce file from local storage."""
        try:
            os.remove(os.path.join(
                current_app.config['MEDIA_FOLDER'], file_name))
        except OSError:
            pass

        # delete folder containing html zip file
        try:
            shutil.rmtree(os.path.join(
                current_app.config['MEDIA_FOLDER'], file_name))
        except OSError:
            pass

    def get_valid_name(self, input_text, delimiter=u' '):
        """
        Strip the special chars, add a delimiter & return the  unicode name.

        params:
            input_text - Unicode text to create a slug.
            delimiter - Unicode value used to join the words, default ' ',
        """
        # Characters to filter
        _punct_re = re.compile(r'[\s !"#$%&\'()*\-/<=>?@\[\\\]^_`{|},.:;~+]+')

        result = []

        for word in _punct_re.split(input_text.lower()):
            result.extend(filter(None, _punct_re.split(word)))

        return unicode(delimiter.join(result))

    def get_file_type(self, file_path):
        """
        Function to get file type for a given file.

        params: file_abs_path.
        """
        name, extention = os.path.splitext(file_path)
        mime = magic.Magic(mime=True)
        mime_type = mime.from_file(file_path)

        resource_type = "file"
        if mime_type in current_app.config["ALLOWED_IMAGE_TYPES"]:
            resource_type = "image"
        elif mime_type in current_app.config["ALLOWED_VIDEO_TYPES"]:
            resource_type = "wistia"
        elif mime_type in current_app.config["ALLOWED_AUDIO_TYPES"]:
            resource_type = "audio"
        elif mime_type == "text/html":
            resource_type = "html5"
        elif(
            mime_type in current_app.config["ALLOWED_DOCUMENT_TYPES"] and
            extention in (".pdf", ".ppt", ".doc", ".docx")
        ):
            resource_type = "pdf"

        return unicode(resource_type)

    def notify_user(self, sync_status):
        """
        Function to send a mail to author.

        params: sync_status: success/failed
        sending a mail to author for reporting sync status.
        """
        user = User.query.get(self.user_id)
        section = Section.query.filter(
            Section.id == self.section_id
        ).options(
            joinedload(Section.tenant)
        ).first()
        product = section.get_category()
        anchor = '!/{}'.format(section.slug)

        if product.slug != section.slug:
            anchor = '!/{}/{}'.format(product.slug, section.slug)

        url = unquote(url_for('main.edit', _anchor=anchor))
        content_link = "{}{}".format(section.tenant.domain, url)
        recipient = user.email
        sender = formataddr(
            (str(Header('ShareDemos Admin', 'utf-8')), 'sharedemos@regalix-inc.com'))
        subject = "SharePoint Import Successful"
        message = "Your content is successfully imported/synced from Sharepoint folder.\n\
                   \nPlease click on below link to review and publish it:\n"
        body = MIMEText(
            "Hi, {} {} {}".format(user.first_name, message, content_link)
        )
        if sync_status == u"FAILED":
            subject = "SharePoint Import Failed"
            message = "Your content import is failed for Category " + \
                section.get_name() + " Please try importing again"
            body = MIMEText(
                "Hi, {} {}".format(user.first_name, message)
            )

        mailer = Mailer()
        mailer.send_mail(
            sender, recipient, subject, body
        )
        mailer.close_mail()
