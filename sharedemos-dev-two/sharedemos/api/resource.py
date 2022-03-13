import json
import os
import requests

from bs4 import BeautifulSoup
from contextlib import closing
from StringIO import StringIO
from tempfile import gettempdir
from uuid import uuid4
from zipfile import ZipFile

from flask import (
    current_app, jsonify,
    session, request
)
from flask.ext.restful import Resource, fields, reqparse, marshal
from PIL import Image
from sqlalchemy.ext.mutable import MutableDict
from werkzeug.datastructures import FileStorage

from sharedemos.api.custom_fields import NestedJSON
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.model import get_slug_text, slugify
from sharedemos.libs.helpers import (
    convert_file_to_pdf,
    create_file,
    create_folder,
    generate_pdf_thumbnail,
    log_last_activity,
    save_independent_resources,
    upload_to_wistia
)
from sharedemos.models import (
    db, DraftSlide,
    DraftWalkthrough,
    Resource as ResourceModel
)


ALLOWED_FILES_MIMETYPE = (
    'text/plain',
    'text/csv',
    'application/json',
    'application/pdf',
    'application/zip',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/x-zip-compressed',
    'application/octet-stream'
)

ALLOWED_FILE_EXTENSIONS = (
    '.txt', '.csv', '.doc', '.docx',
    '.zip', '.json', '.ppt', '.pptx', '.pdf'
)

frames_details = {
    'path': fields.String,
    'count': fields.Integer,
}

rte_resource_details = {
    'name': fields.String,
    'link': fields.String(attribute=lambda x: '/static/media/' + x.path)
}

resource_details = {
    'name': fields.String,
    'path': fields.String,
    'resource_type': fields.String,
    'content': fields.String,
    'meta_data': NestedJSON(frames_details, allow_empty=True),
}

walkthrough_details = {
    'slug': fields.String,
    'order': fields.Integer,
}
slide_details = {
    'id': fields.Integer,
    'order': fields.String,
    'primary_resource': fields.Nested(resource_details, allow_null=True),
    'secondary_resource': fields.Nested(resource_details, allow_null=True),
    'walkthrough': fields.Nested(walkthrough_details),
}


def create_new_asset(asset_file_obj):
    """
    Create a new asset, slugify its name, upload to rackspace.

    Return resource model object.
    """
    resource = save_independent_resources(asset_file_obj, u'asset_link')
    file_name, extension = os.path.splitext(asset_file_obj.filename)
    resource.meta_data = {
        'file_name': file_name,
        'thumbnail_url': generate_pdf_thumbnail(resource.path)
    }

    # since slugify method will modify 'name' field
    # which will have slugified version of filename,
    # its not advisable to assign the filename to resource.name.
    resource.name = u''

    db.session.add(resource)
    db.session.flush()

    # Generate a slug based on the name of the resource.
    # Call 'slugify' with 'query_filter' params to filter out resources,
    # which are not 'asset_link' type.
    resource.name = slugify(
        input_text=file_name,
        rec_id=resource.id,
        model=ResourceModel,
        tenant_id=resource.tenant_id,
        slugfield=u'name',
        delim='-',
        max_length=255,
        decode=False,
        **{'resource_type': u'asset_link'}
    )
    db.session.add(resource)
    db.session.commit()
    return resource


def delete_image_frames(frames_path, img_list):
    """
    Delete multiple image files.

    params:
        frames_path - String value containing the parent folder path.
        img_list    - List object containing names of files to be deleted.
    """
    try:
        folder_path = "{}/{}".format(
            current_app.config.get('MEDIA_FOLDER'),
            frames_path
        )
        for img_file in img_list:
            os.remove(os.path.join(folder_path, img_file))
    except OSError:
        pass


def get_slide(walkthrough, current_slide_order, is_new=False):
    """
    Return a slide object w.r.t walkthrough and slide order.

    If the 'is_new' is True, then return a new Slide object.
    params:
        walkthrough         - SqlAlchemy Walkthrough model object.
        current_slide_order - Integer value.
        is_new              - Boolean value 'False' by default.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    slide = None
    if not is_new:
        # Add new slide for the given order
        slide = DraftSlide.query.filter(
            (DraftSlide.tenant_id == tenant_id) &
            (DraftSlide.walkthrough_id == walkthrough.id) &
            (DraftSlide.order == current_slide_order) &
            (DraftSlide.is_deleted.__eq__(False))
        ).first()

    if is_new or not slide:
        slide = DraftSlide()
        slide.order = current_slide_order
        slide.tenant_id = tenant_id
        slide.walkthrough_id = walkthrough.id

    return slide


def image2jpg_save(image_file, file_name):
    """
    Save an image resource as 'JPEG' format.

    Check if the input image_file is of the type 'JPEG',
    if not convert it to 'JPEG' and then save it.
    params:
        image_file  - FileStorage object.
        file_name   - String value.
    """
    try:
        img_file = Image.open(image_file)
        if img_file.format != 'JPEG':
            rgba_img = img_file.convert('RGBA')
            background_img = Image.new('RGBA', rgba_img.size, (255, 255, 255))
            alpha_comp = Image.alpha_composite(background_img, rgba_img)
            img_file = alpha_comp
        img_file.save(file_name + '.jpg', 'JPEG', quality=90)
        return True
    except Exception:
        return False


def rearrange_slides(walkthrough, current_slide_order):
    """
    Rearrange the slides order in a walkthrough after a slide update.

    params:
        walkthrough         - SqlAlchemy Walkthrough model object.
        current_slide_order - Integer value.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)

    # get other draft slides in demo
    slides = DraftSlide.query.filter(
        (DraftSlide.tenant_id == tenant_id) &
        (DraftSlide.walkthrough_id == walkthrough.id) &
        (DraftSlide.is_deleted.__eq__(False))
    ).order_by(DraftSlide.order).all()

    # Rearrange in order
    if slides:
        order = 0
        for sl in slides:
            order += 1
            if order == current_slide_order:
                order += 1

            sl.order = order
            db.session.add(sl)


def rename_image(file_details):
    """
    Rename the existing file with 'temp_' name.

    params :
        file_details    - Dictionary Object containing old and new file name details.
    """
    try:
        old_file_name = "{}/{}".format(
            file_details['folder_path'],
            file_details['img_name']
        )
        new_file_name = "{}/temp_{}.jpg".format(
            file_details['folder_path'],
            file_details['frame_number']
        )
        os.rename(old_file_name, new_file_name)
        return True
    except Exception:
        return False


def delete_file_cover_image(name):
    """Function to delete cover image for file type slide.

    I/P: name of the cover image
    """
    try:
        os.remove(
            os.path.join(
                current_app.config['MEDIA_FOLDER'],
                name
            )
        )
    except OSError:
        pass


def save_resource(resource_data, walkthrough):
    """
    Save a resource, based on its type create a new 'Resource' record.

    If a resource_type is:
        'image', then save the image file and file name to path field.
        'audio', then save the audio file and file name to path field.
        'pdf', then save the pdf file and file name to path field.
        'ppt', then covert ppt to pdf then save it as resource type pdf,
            store both ppt and pdf files in static folder and
            store ppt details in meta_data.
        'content', then parse the content using BeautifulSoup html parser
            and store it to content field.
        'embed', then save the embed url in the path field
            and thumbnail_url in the meta_data field.
        'link', then save the url in path field
            and the site details in meta_data field.
        'iframe', then save the iframe url in path field.
        'html5', then save the zip file in the html_folder
            and store the folder path name to path field.
        'sandbox', then save the json file contents into meta_data field.
        'video', then upload to wistia.
        'file', then save the file and file name to path field.

    If the resource data is 'external', then fetch the media from the i/p url,
    and update the records accordingly.
    If a primary resource exists then create a new secondary resource to hold the data.
    If the primary resource has a default 'content',
    then create a Resource to store a multilingual content and save 'default_res_id'
    with primary resource id.
    params:
        resource_data   - Dictionary object containing Resource details.
        walkthrough     - SqlAlchemy Walkthrough object.

    Return SqlAlchemy Slide object for success
    or string object in case of error.
    """
    try:
        slide_order = resource_data['slide_order']
        page_num = resource_data.get('page_num')
        if page_num:
            slide_order = slide_order + (page_num - 1)

        tenant_id = current_app.tenant_id
        walkthrough_name = walkthrough.get_name()
        session_locale_id = session['author']['locale']
        resource_data_type = resource_data.get('type')

        slide = get_slide(walkthrough, slide_order,
                          resource_data.get('is_new'))

        if resource_data.get('type') == u'remote_pdf':
            resource_data_type = u'pdf'

        # Request to save a non default translation RTE content.
        if (
            resource_data_type == 'content' and
            walkthrough.tenant.default_locale_id != session_locale_id
        ):
            html_content = BeautifulSoup(resource_data.get('content'), 'lxml')
            for tag in html_content.findAll('script'):
                tag.replace_with(' ')

            multilingual_res = ResourceModel.query.filter(
                ResourceModel.tenant_id == slide.tenant_id,
                ResourceModel.resource_type == u'content',
                ResourceModel.meta_data['default_res_id'].astext
                .cast(db.Integer).isnot(None),
                ResourceModel.meta_data['default_res_id'].astext
                .cast(db.Integer) == slide.primary_resource_id,
                ResourceModel.meta_data['is_deleted'].astext
                .cast(db.Boolean).__eq__(False),
                ResourceModel.language_id == session_locale_id
            ).first()

            # For every update on a multilingual content,
            # unlink the old record, and create a new record.
            if multilingual_res:
                multilingual_res.meta_data['is_deleted'] = True
                db.session.add(multilingual_res)

            new_multilingual_res = ResourceModel()
            new_multilingual_res.tenant_id = tenant_id
            new_multilingual_res.language_id = session_locale_id
            new_multilingual_res.resource_type = resource_data_type
            new_multilingual_res.name = walkthrough_name
            new_multilingual_res.meta_data = MutableDict({
                'default_res_id': slide.primary_resource.id,
                'is_deleted': False
            })
            new_multilingual_res.content = html_content.decode()
            db.session.add(new_multilingual_res)
            db.session.commit()
            return slide

        resource = ResourceModel()
        resource.tenant_id = tenant_id
        resource.name = walkthrough_name
        resource.resource_type = resource_data_type
        resource.language_id = session_locale_id
        resource.meta_data = MutableDict()

        update_multilingual_content = False
        if resource_data_type == 'content':
            # Checking for XSS-scripts in content.
            html_content = BeautifulSoup(resource_data.get('content'), 'lxml')
            for tag in html_content.findAll('script'):
                tag.replace_with(' ')

            resource.content = html_content.decode()

            # If the slide is new, then it'll
            # have only default language content.
            if not resource_data.get('is_new'):
                """
                    Whenever there is an update on the default-trans content,
                    update the multilingual-records which are
                    associated with the old-res id.
                """
                supported_locales = [locale.id
                                     for locale in
                                     walkthrough.tenant.supported_locales]
                # To prevent invoking SqlAlchemy's 'in_' on an empty sequence.
                if supported_locales:
                    multilingual_res_list = ResourceModel.query.filter(
                        ResourceModel.tenant_id == slide.tenant_id,
                        ResourceModel.language_id.in_(supported_locales),
                        ResourceModel.resource_type == u'content',
                        ResourceModel.meta_data['default_res_id'].astext
                        .cast(db.Integer).isnot(None),
                        ResourceModel.meta_data['default_res_id'].astext
                        .cast(db.Integer) == slide.primary_resource_id,
                        ResourceModel.meta_data['is_deleted'].astext
                        .cast(db.Boolean).__eq__(False)
                    ).all()
                    if multilingual_res_list:
                        update_multilingual_content = True
        elif resource_data_type == 'ppt':
            try:
                filename = unicode(uuid4())
                ppt_file = request.files['resource']
                _file, file_extension = os.path.splitext(ppt_file.filename)
                if not os.path.exists(current_app.config.get('MEDIA_FOLDER')):
                    os.makedirs(current_app.config.get('MEDIA_FOLDER'))

                source_file = os.path.join(
                    current_app.config.get('MEDIA_FOLDER'),
                    "{}{}".format(filename, file_extension)
                )

                ppt_file.save(source_file)
                convert_file_to_pdf(source_file)
                # Check the availability of PDF file after converting PPT to PDF.
                if not os.path.exists(
                    os.path.join(
                        current_app.config.get('MEDIA_FOLDER'),
                        u'{}.{}'.format(filename, 'pdf'))
                ):
                    raise SharedemosException(
                        424,
                        message=SharedemosException.MEDIA_CONVERSION_FAILED
                    )

                resource.name = _file
                resource.path = unicode("{}{}".format(filename, ".pdf"))
                resource.resource_type = u"pdf"
                resource.meta_data = {
                    'thumbnail_url': generate_pdf_thumbnail(resource.path),
                    'source_type': u'ppt',
                    'source_name': "{}{}".format(filename, file_extension)
                }
            except Exception, e:
                raise SharedemosException(400, message=str(e))

        elif resource_data_type == 'embed':
            resource.meta_data['thumbnail_url'] = resource_data.get(
                'thumbnail_url')
            resource.path = unicode(resource_data['path'])

        elif resource_data_type == 'link':
            resource.path = unicode(resource_data['path'])
            resource.meta_data = json.loads(resource_data.get('frames'))

        elif resource_data_type == 'iframe':
            resource.path = unicode(resource_data['path'])

        elif resource_data_type == 'html5' and resource_data.get('resource'):
            resource_file = resource_data['resource']

            # Get the absolute path of the html folder specific to tenant.
            tenant_zip_folder = create_folder(
                'html_zip',
                walkthrough.tenant.unique_tenant_id
            )

            # Get the unique folder name for current html zip file.
            html_folder_name = create_folder(parent_path=tenant_zip_folder)
            zip_folder_path = "{}/{}".format(tenant_zip_folder,
                                             html_folder_name)
            resource.path = html_folder_name

            if resource_file.mimetype == 'text/html':
                resource_file.filename = 'index.html'
                file_path = "{}/{}".format(
                    zip_folder_path,
                    resource_file.filename
                )
                resource_file.save(file_path)
            else:
                zip_file_object = ZipFile(resource_file)
                zip_file_object.extractall(zip_folder_path)

        elif resource_data_type == 'sandbox':
            # Save the file in a temporary location to read its content.
            sandbox_file = request.files['resource']
            temp_json_file = os.path.join(gettempdir(), 'sandbox_data.json')
            sandbox_file.save(temp_json_file)

            # Read the file's content.
            with open(temp_json_file, 'r') as data_file:
                json_data = json.load(data_file)

            # Remove the temporary file.
            os.remove(temp_json_file)
            resource.meta_data = json_data

        elif resource_data_type == u"file":
            resource_file = resource_data.get("resource")
            cover_image = resource_data.get("cover_image")
            cover_image_removed = resource_data.get("cover_image_removed")
            file_name = None

            if resource_file:
                resource.path = create_file(resource_file)
                file_name, ext = os.path.splitext(
                    resource_data.get('resource').filename
                )

                resource.meta_data = {
                    'type': ext,
                    'size': resource_file.tell()
                }
            else:
                resource = slide.primary_resource
            resource.name = resource_data.get("file_name") or file_name

            if cover_image:
                if resource.meta_data.get("thumbnail_url"):
                    delete_file_cover_image(
                        resource.meta_data["thumbnail_url"]
                    )
                resource.meta_data["thumbnail_url"] = create_file(cover_image)

            elif cover_image_removed and\
                    resource.meta_data.get("thumbnail_url"):
                delete_file_cover_image(resource.meta_data["thumbnail_url"])
                resource.meta_data["thumbnail_url"] = None

        else:
            if resource_data.get('external'):
                try:
                    response = requests.get(resource_data['path'], stream=True)
                except Exception:
                    raise SharedemosException(
                        404, message='Error while fetching')

                if not response.ok:
                    raise SharedemosException(412, message='Invalid Response')

                if (
                    not response.headers.get('Content-Type') or
                    resource_data_type not in
                    response.headers.get('Content-Type')
                ):
                    raise SharedemosException(412, message='Invalid File')

                filename = resource_data['path'].split('/')[-1].split('?')[0]
                with closing(StringIO(response.content)) as resource_file:
                    resource.path = create_file(
                        FileStorage(resource_file, filename=filename))
                    if resource_data.get('type') == u'remote_pdf':
                        resource.name = filename
                        resource.meta_data = {
                            'thumbnail_url': generate_pdf_thumbnail(resource.path)
                        }

            elif resource_data.get('resource'):
                resource_file = resource_data['resource']
                # If the resource is 'video',
                # then upload it to wistia and store its response.
                if resource_data_type == 'video':
                    upload_to_wistia(resource, resource_file)
                else:
                    # If the resource is of image/audio/pdf type.
                    resource.path = create_file(resource_file)
                    if resource_data_type == u'pdf':
                        filename, ext = os.path.splitext(
                            resource_data.get('resource').filename
                        )
                        resource.name = filename
                        resource.meta_data = {
                            'thumbnail_url': generate_pdf_thumbnail(resource.path)
                        }

            if not resource.path:
                resource.path = resource_data.get('path')

        if resource_data_type.lower() in (
            u'video', u'embed', u'link', u'iframe',
            u'html5', u'wistia', u'ppt', u'pdf', u'file'
        ):
            slide.primary_resource = resource

        elif resource_data_type.lower() in (
                u'image', u'content', u'audio', u'sandbox'
        ):
            """
                When the resource_type is 'content',
                then it might be a primary/secondary resource(footer content)
            """
            # Check if primary source exist
            if slide.primary_resource:
                # If primary resource is already image
                # replace it with new image else add as secondary source
                if (
                    slide.primary_resource.resource_type in
                    (u"audio", u"image", u"sandbox", ) and
                    slide.primary_resource.resource_type == resource_data_type
                ):
                    slide.primary_resource = resource

                elif(
                    slide.primary_resource.resource_type == 'content' and
                    resource_data_type == 'content'
                ):
                    slide.primary_resource = resource

                else:
                    slide.secondary_resource = resource
            else:
                slide.primary_resource = resource

        if resource_data.get('is_new'):
            rearrange_slides(walkthrough, slide_order)

        db.session.add_all([slide, resource])
        log_last_activity('created', 'resource', resource)
        db.session.commit()

        if update_multilingual_content:
            for res in multilingual_res_list:
                res.meta_data['default_res_id'] = resource.id
                db.session.add(res)
            db.session.commit()
        return slide

    except Exception, e:
        return e.message


def save_resource_360(resource_data, walkthrough):
    """
    Save the image frames in a folder when the resource_type is '360'.

    params:
        resource_data   - Dictionary object containing POST data.
        walkthrough     - SqlAlchemy Walkthrough model object.
    """
    try:
        slide_order = resource_data.get('slide_order')
        frames_data = json.loads(resource_data.get('frames'))
        tenant_id = getattr(current_app, 'tenant_id', None)

        if not slide_order or not frames_data:
            raise SharedemosException(404)

        if frames_data["path"] and frames_data['action_event'] != 'save_frame':
            frames_data["path"] = frames_data["path"].split("/")[-1]

        folder_name = frames_data['path']

        if frames_data['action_event'] == 'initiate':
            """
                'initiate' represents creating new resource model
                and new folder to save img frames.
            """

            slide = get_slide(walkthrough, slide_order,
                              resource_data.get('is_new'))
            resource = ResourceModel()
            resource.language_id = session['author']['locale']
            resource.tenant_id = tenant_id
            resource.name = walkthrough.get_name()
            resource.resource_type = unicode('360')

            folder_name = create_folder()
            resource.path = folder_name
            # 'initiate' with zero.
            resource.meta_data = MutableDict({'count': 0})

            slide.primary_resource = resource

            if resource_data.get('is_new'):
                rearrange_slides(walkthrough, slide_order)
            db.session.add_all([slide, resource])
            log_last_activity('created', 'resource', resource)

        elif frames_data['action_event'] == 'edit':
            folder_path = os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                       frames_data['path'])
            user_actions = frames_data.get('user_actions')
            if user_actions:
                # first delete the frames which are marked for removal.
                if user_actions.get('deleteFrame'):
                    delete_image_frames(
                        frames_data['path'],
                        user_actions.get('deleteFrame')
                    )

                # add or reorder frames.
                img_dict = frames_data.get('img_frames_data')
                for img_num in img_dict:

                    """
                    If the request has new resources added,
                    then save it else rename the existing
                    frames with re-ordered frame numbers.
                    """
                    if img_dict[img_num] == u'img_resource':
                        file_name = "{}/temp_{}".format(folder_path, img_num)
                        image2jpg_save(
                            request.files.get('resource_' + img_num),
                            file_name)
                    else:
                        rename_image({'folder_path': folder_path,
                                      'img_name': img_dict[img_num],
                                      'frame_number': img_num})

                # update count and image frames.
                image_updated = update_image_frames(folder_path)

                if not image_updated:
                    raise Exception

                frame_resource = ResourceModel.query.filter_by(
                    tenant_id=tenant_id,
                    path=frames_data['path']
                ).first_or_404()
                frame_resource.meta_data['count'] = len(
                    frames_data.get('img_frames_data'))
                frame_resource.is_cdn_ready = False
                db.session.add(frame_resource)
                from sharedemos.tasks import (delete_api_cache_data)
                delete_api_cache_data.delay({
                    'delete_pattern': True,
                    'entity': 'product_tree',
                    'tenant_id': tenant_id,
                })
                delete_api_cache_data.delay({
                    'delete_pattern': True,
                    'entity': 'dashboard',
                    'tenant_id': tenant_id
                })

                log_last_activity('edited', 'resource', frame_resource)

        elif frames_data['action_event'] == 'save_frame':
            """
                'save_frame' request data will have img resources
                which are to be saved sequentially.
            """
            folder_path = os.path.join(current_app.config.get('MEDIA_FOLDER'),
                                       frames_data['path'])
            file_name = os.path.join(folder_path, frames_data['frame_number'])

            image_updated = image2jpg_save(resource_data.get('resource'),
                                           file_name)
            if image_updated:
                # Update the frame count after saving the img frame.
                frame_resource = ResourceModel.query.filter_by(
                    tenant_id=tenant_id, path=frames_data['path']
                ).first_or_404()
                frame_resource.meta_data['count'] = int(
                    frames_data['frame_number'])
                db.session.add(frame_resource)
                log_last_activity('created', 'resource', frame_resource)
                folder_name = frames_data['path']
            else:
                raise Exception

        db.session.commit()
        return {'path': folder_name}

    except Exception:
        return 'FRAME_SAVE_ERROR'


def update_image_frames(folder_path):
    """Remove 'temp_' name from the existing images."""
    try:
        # Rename 'temp_' images to frame numbers.
        for img_file in os.listdir(folder_path):
            old_file_name = "{}/{}".format(folder_path, img_file)
            new_file_name = "{}/{}".format(folder_path,
                                           img_file.split('temp_')[1])
            os.rename(old_file_name, new_file_name)
        return True
    except Exception:
        return False


parser = reqparse.RequestParser()
parser.add_argument('walkthrough', required=True, type=unicode,
                    location=['form', 'json'],
                    help='Mapping walkthrough required')
parser.add_argument('slide_order', required=True, type=int,
                    location=['form', 'json'],
                    help='Resource slide order required')
parser.add_argument('is_new', type=lambda x: x == unicode('true'),
                    required=True, location=['form', 'json'])
parser.add_argument('type', required=True, type=unicode,
                    location=['form', 'json'], help='Resource type required')
parser.add_argument('external', type=lambda x: x == unicode('true'),
                    required=True, location=['form', 'json'])
parser.add_argument('path', type=unicode, location=['form', 'json'])
parser.add_argument('thumbnail_url', type=unicode, location=['form', 'json'])
parser.add_argument('content', type=unicode, location=['form', 'json'])
parser.add_argument('frames', type=unicode, location=['form', 'json'])
parser.add_argument('pdf_uid', type=unicode, location=['form', 'json'])
parser.add_argument('page_num', type=int, location=['form', 'json'])
parser.add_argument('file_name', type=unicode, location='form')
parser.add_argument('cover_image_removed', type=lambda x: x == unicode('true'),
                    location='form')
parser.add_argument(
    'resource',
    type=FileStorage,
    location='files',
    help='Resource image required'
)
parser.add_argument(
    'cover_image',
    type=FileStorage,
    location='files',
)


class ResourceApi(Resource):
    """Save the resource linked with slide."""

    method_decorators = [has_author_access]

    def post(self):
        """
        Create a new resource record based on the type of the resource.

        If the resource is 'remote_pdf',
        then fetch and save the pdf as temporary resource.
        If it's 360 images then save single frame at time using 'save_resource_360'.
        For all the other types, save the resource using 'save_resource' method.
        """
        post_data = parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        walkthrough = DraftWalkthrough.query.filter(
            (DraftWalkthrough.tenant_id == tenant_id) &
            (DraftWalkthrough.slug == post_data.get('walkthrough')) &
            (DraftWalkthrough.is_deleted.__eq__(False))
        ).first_or_404()

        if not walkthrough.playlist.section.can_edit():
            raise SharedemosException(403)

        from sharedemos.tasks import delete_api_cache_data
        if post_data.get('type') == '360':
            return_object = save_resource_360(post_data, walkthrough)
            if isinstance(return_object, str) and\
                    return_object in ['FRAME_SAVE_ERROR', 'ERROR']:
                raise SharedemosException(500, message=return_object)
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'product_tree',
                'tenant_id': tenant_id,
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'dashboard',
                'tenant_id': tenant_id
            })
            return marshal(return_object, {'path': fields.String}), 200

        if (
            post_data.get('type') == 'html5' and
            post_data.get('resource') and
            post_data.get('resource').mimetype != 'text/html'
        ):
            names_list = ZipFile(post_data.get('resource')).namelist()
            if not any(
                file_name in ['index.html', 'index.htm']
                for file_name in names_list
            ):
                raise SharedemosException(
                    412,
                    message="Zip file should contain index.html or \
                             index.htm in the parent directory."
                )

        if post_data.get('type') == 'image' and post_data.get('frames'):
            """
                In case Multiple Images upload,
                get the slide_order from frames data,
                get the resource data from request files,
                create a new dict with resource_data params,
                send it save_resource() to create new slides
                untill all frames are saved as new slide.
            """
            frames_data = json.loads(post_data.get('frames'))
            if frames_data.get('action_event') == 'images-multiple':
                resource_data = {
                    'is_new': post_data.get('is_new'),
                    'type': post_data.get('type')
                }

                for img_num in frames_data.get('img_frames_data'):
                    resource_data['slide_order'] = img_num + post_data.get(
                        'slide_order')
                    resource_data['resource'] = request.files.get(
                        'resource_' + str(img_num))
                    return_object = save_resource(resource_data, walkthrough)
                    if isinstance(return_object, str):
                        raise SharedemosException(400, message=return_object)
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'product_tree',
                'tenant_id': tenant_id,
            })
            delete_api_cache_data.delay({
                'delete_pattern': True,
                'entity': 'dashboard',
                'tenant_id': tenant_id
            })
            return jsonify(status='MULTI_IMAGE_UPLOAD_SUCCESS')

        """
            Using the resource api to store images in text-editor-content.
            if its True then it will be resource.
        """
        return_object = save_resource(post_data, walkthrough)
        if isinstance(return_object, str):
            raise SharedemosException(400, message=return_object)

        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'product_tree',
            'tenant_id': tenant_id,
        })
        delete_api_cache_data.delay({
            'delete_pattern': True,
            'entity': 'dashboard',
            'tenant_id': tenant_id
        })
        return format_data(marshal(return_object, slide_details)), 200

    def delete(self, id=None, res_path=None):
        """NOTE - to be performed in failed case of convertPDFToImages."""
        if id:
            resource = ResourceModel.query.get(id)
            db.session.delete(resource)
        elif res_path:
            tenant_id = getattr(current_app, 'tenant_id', None)
            resource = ResourceModel.query.filter_by(
                tenant_id=tenant_id, path=res_path).first()
            if resource:
                log_last_activity('deleted', 'resource', resource)
                db.session.delete(resource)
            else:
                try:
                    os.remove(
                        "{}/{}".format(
                            current_app.config.get('MEDIA_FOLDER'),
                            res_path
                        )
                    )
                except Exception:
                    return jsonify(status='ERROR')
        db.session.commit()
        return jsonify(status='DELETED')


class RTEResourceApi(Resource):
    """Save the RTE Files/Image uploaded while editing an RTE slide."""

    method_decorators = [has_author_access]

    def post(self):
        """Api 'POST' handles creating a new RTE image resource."""
        rte_file = request.files.get('editor_file')
        _file, file_extension = os.path.splitext(rte_file.filename)

        if not rte_file:
            raise SharedemosException(
                400,
                message=SharedemosException.FILE_MISSING
            )

        if (
                not rte_file.mimetype.startswith('image') and
                rte_file.mimetype not in ALLOWED_FILES_MIMETYPE and
                file_extension not in ALLOWED_FILE_EXTENSIONS
        ):
            raise SharedemosException(
                415,
                message='FILE FORMAT NOT SUPPORTED'
            )

        resource = save_independent_resources(
            rte_file,
            unicode(request.form.get('type'))
        )

        db.session.add(resource)
        db.session.commit()
        return format_data(marshal(resource, rte_resource_details)), 200

    def delete(self, path):
        """Delete RTE Resource."""
        if not path:
            raise SharedemosException(412, message='PATH CANNOT BE EMPTY')

        tenant_id = getattr(current_app, 'tenant_id', None)
        resource = ResourceModel.query.filter_by(
            tenant_id=tenant_id, path=path).first()

        if not resource:
            raise SharedemosException(404, message='RESOURCE NOT FOUND')

        db.session.delete(resource)
        db.session.commit()
        log_last_activity('deleted', 'resource', resource)
        return jsonify(status='DELETED')


section_asset_meta_data_fields = {
    'file_name': fields.String
}

section_asset_details = {
    'id': fields.Integer,
    'name': fields.String,
    'meta_data': NestedJSON(section_asset_meta_data_fields,
                            allow_empty=True),
}

section_res_parser = reqparse.RequestParser()
section_res_parser.add_argument('name',
                                type=unicode,
                                location=('json', 'form'),
                                help='Resource name/slug.')


class SectionResourceApi(Resource):
    """Save the asset which is linked to the section."""

    method_decorators = [has_author_access]

    def get(self, id):
        """API 'GET' handles returning a new name generated thru slugify."""
        name = request.args.get('name')
        if not name:
            raise SharedemosException(412, message='NAME CANNOT BE EMPTY')

        slugified_name = slugify(
            input_text=unicode(name),
            rec_id=id,
            model=ResourceModel,
            tenant_id=current_app.tenant_id,
            slugfield=u'name',
            delim='-',
            max_length=255,
            decode=False,
            **{'resource_type': u'asset_link'}
        )
        slug_text = get_slug_text(
            input_text=unicode(name),
            delim='-',
            max_length=255,
            decode=False,
        )
        if slugified_name != slug_text:
            raise SharedemosException(400, message='NAME EXISTS')

        return jsonify(name=slugified_name)

    def post(self):
        """Api 'POST' handles creating a new section asset resource."""
        if not request.files.get('section_asset_resource'):
            raise SharedemosException(
                400,
                message=SharedemosException.FILE_MISSING
            )

        resource = create_new_asset(request.files['section_asset_resource'])
        return format_data(marshal(resource, section_asset_details)), 200

    def put(self, id):
        """
        Api 'PUT' handles updating/creating.

        the slug/name of the existing resource.
        the resource file/path of the existing resource.
        create a new resource if the resource if not available for specific translation.
        """
        resource = ResourceModel.query.filter(
            ResourceModel.id == id,
            ResourceModel.language_id == session['author']['locale']
        ).first()
        asset_file = request.files.get('section_asset_resource')
        if not resource:
            if not asset_file:
                raise SharedemosException(
                    400,
                    message=SharedemosException.FILE_MISSING
                )
            resource = create_new_asset(asset_file)

        else:
            if asset_file:
                resource.path = create_file(asset_file)
                file_name, extension = os.path.splitext(asset_file.filename)
                resource.meta_data = {
                    'file_name': file_name,
                    'thumbnail_url': generate_pdf_thumbnail(resource.path)
                }
                resource.is_cdn_ready = False
            else:
                # Since only 'name' is updated, there is no need to upload to rackspace.
                name = section_res_parser.parse_args().get('name')
                resource.name = slugify(
                    input_text=unicode(name),
                    rec_id=resource.id,
                    model=ResourceModel,
                    tenant_id=resource.tenant_id,
                    slugfield=u'name',
                    delim='-',
                    max_length=255,
                    decode=False,
                    **{'resource_type': u'asset_link'}
                )
                slug_text = get_slug_text(
                    input_text=unicode(name),
                    delim='-',
                    max_length=255,
                    decode=False,
                )
                # 2nd level validation, since the form-data can be manualy edited.
                if slug_text != resource.name:
                    raise SharedemosException(400, message='NAME EXISTS')

            db.session.add(resource)
            db.session.commit()

        return format_data(marshal(resource, section_asset_details)), 200

    def delete(self, id=None):
        """Api 'DELETE' handles deleting previously created asset resource."""
        if id:
            res = ResourceModel.query.get(id)
            db.session.delete(res)
            db.session.commit()
        return jsonify(status='DELETED')
