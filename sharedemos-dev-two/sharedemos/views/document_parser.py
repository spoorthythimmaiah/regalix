"""Blueprint for handling docx parser's requests."""

import json
from urllib import unquote

from flask import (
    abort,
    Blueprint,
    current_app,
    jsonify,
    redirect,
    request,
    url_for
)
from sqlalchemy.orm import joinedload

from sharedemos.libs.api import is_author
from sharedemos.libs.document_parser import read_json_create_content
from sharedemos.models import (
    db,
    DocumentParser,
    DraftWalkthrough,
    Playlist,
    Walkthrough
)

document_parser = Blueprint('document_parser', __name__)


@document_parser.route('/callback', methods=['POST'])
def callback():
    """
    Callback function for DocParser service.

    When the DocParser completes processing the document,
    it sends a POST request to this URL with the details of
    parsed data.
    This function will invoke JSON data parser, content creator,
    cache handlers, algolia and activity feed functions.
    It'll also updates the doc_parser model with the status
    after each phase.
    """
    parser_data = json.loads(request.data)
    tenant_id = current_app.tenant_id
    doc_parser = DocumentParser.query.filter(
        DocumentParser.tenant_id == tenant_id,
        DocumentParser.token == unicode(parser_data['token']),
        DocumentParser.is_canceled.__eq__(False)
    ).first_or_404()

    doc_parser.status = unicode(parser_data['status'].upper())

    # If the DocParser has failed,
    # then reponse might not have 'json_path' / 'status_message'.
    doc_parser.output_file = unicode(parser_data.get('json_path', ''))
    if parser_data.get('status_message'):
        doc_parser.description = unicode(parser_data['status_message'])
    db.session.add(doc_parser)
    db.session.commit()

    if doc_parser.status not in current_app.config['DOCUMENT_PARSER_FAIL_STATUS']:
        content_status = read_json_create_content(
            doc_parser.output_file,
            doc_parser.section_id,
            doc_parser.created_by,
            doc_parser.id
        )
        doc_parser.status = content_status['status']

        # status will be 'IMPORT_PROGRESS' / 'IMPORT_COMPLETE' / 'IMPORT_FAILED'.
        # If the status is progress, then celery task to save images
        # is initiated.
        if content_status['status'] == u'IMPORT_FAILED':
            doc_parser.description = content_status['message']

        # Isolated commits, since 'read_json_create_content' raises an error,
        # which might be related to SqlAlchemy rollback.
        db.session.add(doc_parser)
        db.session.commit()

    from sharedemos.tasks import delete_api_cache_data
    section = doc_parser.section
    delete_api_cache_data.delay({
        'entity': 'section',
        'model_id': section.id,
        'delete_pattern': True,
        'delete_parent': bool(section.parent_id),
        'clear_all_products': not bool(section.parent_id),
        'tenant_id': tenant_id
    })

    delete_api_cache_data.delay({
        'delete_pattern': True,
        'entity': 'product_tree',
        'tenant_id': tenant_id
    })

    return jsonify({'IMPORT_STATUS': doc_parser.status})


@document_parser.route('/crosslinks/<any(section, chapter):entity>/<unique_id>')
def crosslinks(entity, unique_id):
    """
    Redirect to chapter/section url.

    Crosslinks contains 'entity' type which denotes 'Section' / 'Chapter',
    and 'unique_id' which will be mapped to the respective entity.
    From entity type and unique_id, fetch the actual slug from db,
    and redirect to its respective url.

    Eg:
        /crosslinks/chapter/e49cf4dd-d30c-4c04-8888-55d23fc12cbb
        will be redirected to
        url_for('main.launchpad', slug='CHAPTER_SLUG')
    """
    if entity == 'chapter':
        author = is_author()

        model = DraftWalkthrough if author else Walkthrough
        _chapter = model.query.options(
            joinedload(model.tenant),
            joinedload(model.playlist).joinedload(Playlist.section)
        ).filter(
            model.unique_id == unique_id
        ).first_or_404()

        tenant = _chapter.tenant
        section = _chapter.playlist.section
        product = section.get_category()

        if author:
            anchor = '!/{}/{}/{}'.format(product.slug, section.slug, _chapter.slug)
            if product.slug == section.slug:
                anchor = '!/{}/{}'.format(section.slug, _chapter.slug)

            # 'unquote' to disable the character escaping in url_for.
            return redirect(unquote(url_for(
                'main.edit',
                _anchor=anchor
            )))

        if tenant.template.lower() == 'dell':
            return redirect(url_for(
                'main.launchpad',
                section=section.slug,
                chapter=_chapter.slug
            ))

        return redirect(url_for(
            'main.route_handler',
            product=product.slug,
            section=section.slug,
            chapter=_chapter.slug
        ))
    else:
        # 501 Not Implemented.
        abort(501)
