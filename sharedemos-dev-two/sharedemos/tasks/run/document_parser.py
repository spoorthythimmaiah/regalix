import json
import requests
from requests.auth import HTTPBasicAuth

from flask import current_app, url_for

from sharedemos.libs.document_parser import upload_docx_to_cdn
from sharedemos.libs.helpers import get_rackspace_container

from sharedemos.models import db, DocumentParser
from sharedemos.tasks.factory import celery


@celery.task(queue='document_parser')
def save_parsed_images(doc_data):
    """
    Save the parsed images from Rackspace to the media folder.

    Creates the folder structure similar to the Rackspace
    container and then saves the image files in the MEDIA_FOLDER.
    Eg- TENANT_UUID/FOLDER_UUID/out/image_NUM.png
    params:
        'doc_data' containing:
        img_folder_path - String URL data containing the location of the images.
        images_list     - List of images to be saved.
        doc_parser_id   - Id of the DocumentParser entity.
    """
    status = u'IMAGES_SAVED'
    description = None
    images_list = json.loads(doc_data['images_list'])
    try:
        container = get_rackspace_container()
        for img in images_list:
            container.download(
                doc_data['img_folder_path'] + img,
                current_app.config['MEDIA_FOLDER']
            )
    except Exception as e:
        status = u'IMAGES_SAVING_FAILED'
        description = unicode(e.message)

    finally:
        document = DocumentParser.query.get(doc_data['doc_parser_id'])
        document.status = status
        if description:
            document.description = description
        db.session.add(document)
        db.session.commit()


@celery.task(queue='document_parser')
def upload_doc(doc_data):
    """Upload the document to Rackspace and initiate DocParser service."""
    doc_details = upload_docx_to_cdn(
        doc_data['filename'],
        doc_data['domain']
    )
    document = DocumentParser.query.filter(
        DocumentParser.id == doc_data['id'],
        DocumentParser.is_canceled.__eq__(False)
    ).first_or_404()

    if doc_details.get('upload_failed'):
        document.status = u'UPLOADING_FAILED'
        if doc_details.get('message'):
            document.description = doc_details['message']
    else:
        try:
            # Send a POST request to 'DocParser' service,
            # with respective document details.
            auth = HTTPBasicAuth(
                current_app.config['DOCUMENT_PARSER_USERNAME'],
                current_app.config['DOCUMENT_PARSER_PASSWORD']
            )
            call_back_url = 'https://{}{}'.format(
                document.tenant.domain,
                url_for('document_parser.callback')
            )
            docx_parser_response = requests.post(
                current_app.config['DOCUMENT_PARSER_URL'],
                auth=auth,
                headers={'Content-type': 'application/json'},
                data=json.dumps({
                    'doc_path': doc_details['doc_path'],
                    'doc_name': doc_details['doc_name'],
                    'doc_type': doc_data['doc_type'],
                    'environment': current_app.config['PROJECT_ENV'],
                    'call_back_url': call_back_url
                })
            )
            if docx_parser_response.status_code != 200:
                raise Exception(docx_parser_response.text)

            parser_data = docx_parser_response.json()
            document.status = unicode(parser_data['status'].upper())
            document.token = unicode(parser_data['token'])
            if parser_data.get('status_message'):
                document.description = unicode(parser_data['status_message'])
        except Exception as e:
            document.status = u'INITIATE_PARSER_FAILED'
            document.description = e.message

    db.session.add(document)
    db.session.commit()
