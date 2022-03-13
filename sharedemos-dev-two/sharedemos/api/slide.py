from werkzeug.datastructures import FileStorage
from flask import current_app, session
from flask.ext.restful import fields, marshal, Resource, reqparse
from sqlalchemy.orm.attributes import flag_modified

from sharedemos.api.custom_fields import MediaURL, NestedJSON
from sharedemos.libs.api import format_data
from sharedemos.libs.decorators import has_author_access
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    create_file,
    get_translation,
    get_default_translation,
    log_last_activity
)
from sqlalchemy.ext.mutable import MutableDict

from sharedemos.models import (
    db, DraftPin,
    DraftPinTranslations,
    DraftSlide,
    DraftSlideTranslations,
    DraftWalkthrough,
    Tenant
)


hotspot_display = {
    'height': fields.String,
    'left': fields.String,
    'top': fields.String,
    'width': fields.String,
    'color': fields.String,
    'delay': fields.Integer
}

hotspot_action = {
    'target': fields.String,
    'href': fields.String,
    'slide_number': fields.String,
}

hotspot_callout = {
    'at': fields.String,
    'my': fields.String,
    'text': fields.String,
    'auto_open': fields.Integer,
    'auto_close': fields.Integer
}

hotspots = {
    'id': fields.Integer,
    'action': NestedJSON(hotspot_action, allow_empty=True),
    'callout': NestedJSON(hotspot_callout, allow_empty=True),
    'display': fields.Nested(hotspot_display, allow_null=True),
    'hotspot_type': fields.String()
}

pin_display = {
    'left': fields.String,
    'top': fields.String,
    'frame_number': fields.Integer,
}

pin_callout = {
    'title': fields.String,
    'body': fields.String
}

pins = {
    'id': fields.Integer,
    'order': fields.Integer,
    'callout': NestedJSON(pin_callout, allow_empty=True),
    'display': fields.Nested(pin_display, allow_null=True),
}

resource_details = {
    'path': fields.String,
    'count': fields.Integer,
}

resource = {
    'name': fields.String,
    'path': MediaURL,
    'type': fields.String(attribute='resource_type'),
    'content': fields.String,
    'meta_data': NestedJSON(resource_details, allow_empty=True)
}

slide_details = {
    'hotspots': fields.Nested(hotspots, allow_null=True),
    'pins': fields.Nested(pins, allow_null=True),
    'primary_resource': fields.Nested(resource, allow_null=True),
    'secondary_resource': fields.Nested(resource, allow_null=True),
    'name': fields.String,
    'order': fields.Integer,
    'notes': fields.Raw
}


def get_or_create_slide(walkthrough, order):
    """
    Query/Create slide object from 'walkthrough' and 'order'.

    params:
        walkthrough- sqlalchemy object of 'DraftWalkthrough/Walkthrough' class.
        order- integer slide order value.
    """
    tenant_id = getattr(current_app, 'tenant_id', None)
    slide = DraftSlide.query.filter_by(tenant_id=tenant_id,
                                       walkthrough_id=walkthrough.id,
                                       order=order,
                                       is_deleted=False).first()
    if not slide:
        slide = DraftSlide()
        slide.order = order
        slide.tenant_id = tenant_id
        slide.walkthrough = walkthrough

    return slide


def is_valid_notes_data(notes_data):
    """
    Validation of notes input data.

    Return True, if the 'page_number' is valid,
                 if 'link_title', 'link_url', 'link_resource' are valid,
           else False.
    params:
        notes_data- dictionary notes data.
    """
    page_number = notes_data.get('page_number')
    try:
        int(page_number)
    except ValueError:
        return False

    if notes_data.get('link_title')\
        and not (notes_data.get('link_url') or
                 notes_data.get('resource') or
                 notes_data.get('link_image_url')):
        return False
    elif (notes_data.get('link_url') or
          notes_data.get('resource') or
          notes_data.get('link_image_url')) and not notes_data.get('link_title'):
        return False

    return True


def update_notes_keys(notes, page_number):
    """
    Update paginated notes order once a page is deleted.

    params:
        notes- dictionary notes data.
        page_number- integer page number.
    """
    page_number = page_number + 1
    if not notes.get(str(page_number)):
        return

    notes[str(page_number - 1)] = notes.pop(str(page_number))
    update_notes_keys(notes, page_number)


def update_pin_order(slide):
    """
    Update slide-pins order.

    params:
        slide- sqlalchemy object of DraftSlide/Slide.
    """
    order = 1
    for pin in slide.pins:
        pin.order = order
        db.session.add(pin)
        order += 1


parser = reqparse.RequestParser()
parser.add_argument('walkthrough_id', required=True,
                    type=unicode, location=['json', 'form'])
parser.add_argument('entity', type=dict, location='json')

parser.add_argument('notes', type=unicode, location='form')
parser.add_argument('title', type=unicode, location='form')
parser.add_argument('body', type=unicode, location='form')
parser.add_argument('link_title', type=unicode, location='form')
parser.add_argument('link_type', type=unicode, location='form')
parser.add_argument('link_url', type=unicode, location='form')
parser.add_argument('link_image_url', type=unicode, location='form')
parser.add_argument('page_number', type=unicode, location=['form', 'json'])
parser.add_argument('resource', type=FileStorage, location='files')
parser.add_argument('delete', type=unicode, location='form')


class SlideApi(Resource):
    """Api to handle requests related to updating 'DraftSlide/Slide' contents."""

    method_decorators = [has_author_access]

    def patch(self, order):
        """
        Update/Delete Slide-Notes, Slide-Pin contents.

        params:
            order- integer slide_order value.
        """
        patch_data = parser.parse_args()

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        walkthrough = DraftWalkthrough.query.filter_by(
            tenant_id=tenant_id,
            slug=patch_data['walkthrough_id'],
            is_deleted=False
        ).first_or_404()
        if not walkthrough.playlist.section.can_edit():
            raise SharedemosException(403)

        slide = get_or_create_slide(walkthrough, order)
        slide_trans = get_translation(slide, author=True)
        page_number = patch_data.get('page_number')

        if patch_data.get('entity'):
            if patch_data['entity']['type'] == 'pin':
                action = 'edited'
                if 'entity_id' in patch_data['entity']:
                    pin = DraftPin.query.get(
                        int(patch_data['entity']['entity_id']))
                else:
                    pin = DraftPin()
                    pin.slide_id = slide.id
                    pin.display = MutableDict()
                    pin.order = len(slide.pins) + 1
                    pin.tenant_id = tenant_id
                    action = 'created'

                if patch_data['entity']['event'] == 'tooltip-position':
                    pin.display['position'] = patch_data['entity']['value']
                    db.session.add(pin)
                elif patch_data['entity']['event'] in ['create', 'relocate']:
                    pin.display['top'] = patch_data['entity']['value']['top']
                    pin.display['left'] = patch_data['entity']['value']['left']
                    pin.display['frame_number'] = patch_data['entity']['value']['frame_number']
                    db.session.add(pin)
                elif patch_data['entity']['event'] == 'change-frame':
                    pin.display['frame_number'] = patch_data['entity']['value']['frame_number']
                    db.session.add(pin)
                elif patch_data['entity']['event'] == 'delete':
                    action = 'deleted'
                    db.session.delete(pin)
                    update_pin_order(slide)
                elif patch_data['entity']['event'] in ['pin-title', 'pin-body']:
                    pin_trans = get_translation(pin, author=True)
                    if not pin_trans:
                        if not get_default_translation(pin) and \
                                session['author']['locale'] != tenant.default_locale_id:

                            raise SharedemosException(
                                412,
                                message=SharedemosException
                                .DEFAULT_TRANSLATION_MISSING
                                % tenant.default_locale.name)

                        pin_trans = DraftPinTranslations()

                        pin_trans.language_id = session['author']['locale']
                        pin_trans.callout = MutableDict()
                        pin_trans.pin = pin
                        db.session.add(pin_trans)
                    if patch_data['entity']['event'] == 'pin-title':
                        pin_trans.callout['title'] = patch_data['entity']['value']
                    elif patch_data['entity']['event'] == 'pin-body':
                        pin_trans.callout['body'] = patch_data['entity']['value']

                    db.session.add(pin)
                log_last_activity(action, 'draft_pin', pin)

        elif patch_data.get('notes'):
            action = 'edited'

            if patch_data.get('is_sandbox') and\
                    slide.primary_resource.resource_type == u'sandbox':

                frames_data = slide.primary_resource.meta_data.get('frames')
                for frame in frames_data:
                    if patch_data.get('frame_number') and\
                            frame['index'] == int(
                            patch_data.get('frame_number')):
                        frame['notes'] = unicode(patch_data.get('body'))
                if frames_data:
                    slide.primary_resource.meta_data['frames'] = frames_data

            else:
                if not is_valid_notes_data(patch_data):
                    # 422 Unprocessable Entity.
                    raise SharedemosException(422, message='INVALID INPUT')

                if not slide_trans:
                    default_trans = get_default_translation(slide)
                    if not default_trans and \
                            session['author'][
                            'locale'] != tenant.default_locale_id:
                        raise SharedemosException(
                            412,
                            message=SharedemosException
                            .DEFAULT_TRANSLATION_MISSING
                            % tenant.default_locale.name)

                    slide_trans = DraftSlideTranslations()
                    action = 'created'

                    # If the notes are edited in non-default language,
                    # then save the contents(pages) of default language,
                    # to the newly created slide-translation first.
                    if session['author']['locale'] != tenant.default_locale_id:
                        slide_trans.notes = default_trans.notes

                    slide_trans.language_id = session['author']['locale']
                    slide_trans.slide = slide

                slide_trans.name = unicode('Slide ' + str(order))
                if not slide_trans.notes:
                    slide_trans.notes = {}

                link_resource = patch_data.get(
                    'link_url') or patch_data.get('link_image_url')

                if patch_data.get('link_type') == 'INTERNAL' and\
                        patch_data.get('resource'):
                    link_resource = create_file(
                        patch_data.get('resource'))

                slide_trans.notes[page_number] = {
                    'title': patch_data.get('title'),
                    'body': patch_data.get('body'),
                    'link': {
                        'title': patch_data.get('link_title'),
                        'type': patch_data.get('link_type'),
                        'resource': link_resource
                    }
                }
                flag_modified(slide_trans, 'notes')
                db.session.add(slide_trans)

        elif patch_data.get('delete'):

            # Patch fix: If the author tries to delete
            # a None/Empty content or
            # a default-note in a non-default locale,
            # throw an error.
            if not slide_trans:
                raise SharedemosException(
                    403,
                    message=SharedemosException
                    .UNABLE_TO_DELETE)

            if slide_trans.notes and\
               slide_trans.notes.get(page_number):

                if not is_valid_notes_data(patch_data):
                    # 422 Unprocessable Entity.
                    raise SharedemosException(422, message='INVALID INPUT')

                slide_trans.notes.pop(page_number)
                # If all the pages are deleted,
                # remove the slide_translation entity.
                if not slide_trans.notes.keys():
                    db.session.delete(slide_trans)
                else:
                    update_notes_keys(slide_trans.notes, int(page_number))
                    flag_modified(slide_trans, 'notes')
                    db.session.add(slide_trans)

        db.session.commit()
        slide.notes = slide_trans.notes if slide_trans else None

        for pin in slide.pins:
            trans = get_translation(pin)
            pin.callout = trans.callout if trans else None

        return format_data(marshal(slide, slide_details)), 201
