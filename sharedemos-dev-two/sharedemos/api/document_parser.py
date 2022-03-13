"""API for handling Document parser requests."""
import re

from flask import current_app, session
from flask.ext.restful import marshal, fields, Resource, reqparse
from werkzeug.datastructures import FileStorage

from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.document_parser import read_json_create_content
from sharedemos.libs.helpers import create_file
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import db, DocumentParser, Section

docx_api_fields = {
    'section_slug': fields.String(attribute='section.slug'),
    'filename': fields.String(attribute='input_file'),
    'status': fields.String,
    'description': fields.String
}

api_parser = reqparse.RequestParser()
api_parser.add_argument(
    'section_slug',
    type=unicode,
    required=True,
    location='form',
    help='Section slug required.'
)
api_parser.add_argument(
    'document_type',
    type=unicode,
    required=True,
    location='form',
    help='Document type required.'
)
api_parser.add_argument(
    'document',
    type=FileStorage,
    required=True,
    location='files',
    help='Document file required'
)


class DocumentParserApi(Resource):
    """Document parser api to handle GET, POST requests."""

    method_decorators = [has_author_access]

    def get(self, filename):
        """
        Used to get the status of the document.

        'filename' is the uuid filename generating during
        document upload.
        """
        tenant_id = current_app.tenant_id
        doc_parser = DocumentParser.query.filter(
            DocumentParser.tenant_id == tenant_id,
            DocumentParser.input_file == filename
        ).first_or_404()

        if doc_parser.status == u'IMAGES_SAVED':
            content_status = read_json_create_content(
                json_filepath=doc_parser.output_file,
                section_id=doc_parser.section_id,
                user_id=doc_parser.created_by,
                doc_parser_id=doc_parser.id,
                save_images=False
            )
            doc_parser.status = content_status['status']
            if content_status['status'] == u'IMPORT_FAILED':
                doc_parser.description = content_status['message']

        db.session.add(doc_parser)
        db.session.commit()

        return format_data(marshal(doc_parser, docx_api_fields)), 200

    def post(self):
        """
        Used to create a new DocumentParser entity.

        Upload the document to rackspace and
        invoke the 'Doc-Parser' service to initiate
        document parsing. Additionaly create a new entry in
        DocumentParser table with uuid, status, token.
        """
        api_data = api_parser.parse_args()

        document = api_data['document']

        # Validate document detials.
        if document.mimetype not in current_app.config['DOCUMENT_MIMETYPES']:
            raise SharedemosException(412, message='INVALID_FILE')

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            document.filename
        )
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name'
            )

        tenant_id = current_app.tenant_id
        section = Section.query.filter(
            Section.tenant_id == tenant_id,
            Section.is_deleted.__eq__(False),
            Section.is_enabled.__eq__(True),
            Section.slug == api_data['section_slug'],
        ).first_or_404()

        if not section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        doc_parser = DocumentParser()
        doc_parser.tenant_id = tenant_id
        doc_parser.section_id = section.id
        doc_parser.name = document.filename

        doc_filename = create_file(document)
        doc_parser.input_file = doc_filename
        doc_parser.status = u'UPLOADING'
        doc_parser.created_by = session.get('user_id')

        db.session.add(doc_parser)
        db.session.commit()

        # Uploading a document to Rackspace will be a blocking call.
        # Since uploading is dependent on network speed and file size,
        # there are chances of request timeout error.
        # So its made as a celery job.
        # It uploads the doc, and initiates the DocParser service.
        from sharedemos.tasks import upload_doc
        upload_doc.delay({
            'id': doc_parser.id,
            'filename': doc_filename,
            'domain': section.tenant.domain,
            'doc_type': api_data['document_type']
        })
        return format_data(marshal(doc_parser, docx_api_fields)), 201
