import re

from flask import current_app, request, session

from flask.ext.restful import Resource, marshal, reqparse

from sharedemos.libs.api import format_data
from sharedemos.libs.bulletin_board import (
    bulletin_board_api_fields,
    change_bulletin_board_order,
    get_bulletin_boards,
    get_bulletin_board_details
)
from sharedemos.libs.decorators import (
    app_subscription_required,
    check_user_access,
    has_author_access
)
from sharedemos.libs.exceptions import SharedemosException
from sharedemos.libs.helpers import (
    clear_bulletin_board_cache,
    get_locale_translation,
)
from sharedemos.libs.utils import (
    get_usergroups,
    validate_user_group
)
from sharedemos.models import (
    db,
    BulletinBoard,
    BulletinBoardLinks,
    BulletinBoardLinksTranslations,
    BulletinBoardTranslations,
    Section,
    Tenant,
)


def duplicate_bulletin_board(original_bboard):
    """Function to duplicate the selected Bulletin board."""
    bulletin_board = BulletinBoard()
    bulletin_board.section_id = original_bboard.section_id
    bulletin_board.order = original_bboard.order
    bulletin_board.tenant_id = original_bboard.tenant_id
    bulletin_board.is_enabled = original_bboard.is_enabled

    for _trans in original_bboard.translations:
        bboard_trans = BulletinBoardTranslations()
        bboard_trans.name = _trans.name
        bboard_trans.description = _trans.description
        bboard_trans.language_id = _trans.language_id
        bboard_trans.bulletin_board = bulletin_board
    bulletin_board.created_by = bulletin_board.modified_by = session['user_id']
    db.session.add_all([bulletin_board, bboard_trans])
    for link in original_bboard.bulletin_board_links:
        if link.is_deleted:
            continue
        bb_link = BulletinBoardLinks()
        if link.link_type == 'external':
            for link_trans in link.translations:
                bb_link_trans = BulletinBoardLinksTranslations()
                bb_link_trans.link = link_trans.link
                bb_link_trans.title = link_trans.title
                bb_link_trans.language_id = link_trans.language_id
                bb_link_trans.bulletin_board_link = bb_link
                db.session.add(bb_link_trans)
        else:
            bb_link.product_id = link.product_id
            bb_link.section_id = link.section_id
            bb_link.walkthrough_id = link.walkthrough_id
        bb_link.order = link.order
        bb_link.link_type = link.link_type
        bb_link.tenant_id = link.tenant_id
        bb_link.bulletin_board = bulletin_board
        db.session.add(bb_link)
    db.session.commit()


def update_siblings_order(section):
    """Update the order of all bulletin board."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    section_id = section.id if section else None
    bulletin_boards = BulletinBoard.query.filter(
        BulletinBoard.tenant_id == tenant_id,
        BulletinBoard.is_deleted.__eq__(False),
        BulletinBoard.section_id == section_id
    ).order_by(
        BulletinBoard.order,
        BulletinBoard.created_at
    ).all()

    order = 1
    for bboard in bulletin_boards:
        bboard.order = order
        order += 1
        db.session.add(bboard)
    db.session.commit()


parser = reqparse.RequestParser()
parser.add_argument('name', type=unicode, required=True,
                    location='json', help='Name required')
parser.add_argument('description', type=unicode, location='json')
parser.add_argument('links', type=list, location='json')
parser.add_argument('section_slug', type=unicode, location='json')
parser.add_argument('restricted_to_groupids', type=list, location='json',
                    default=[])


class BulletinBoardApi(Resource):

    method_decorators = [app_subscription_required('BULLETIN_BOARD')]

    @check_user_access
    def get(self, id=None):
        """Get Bulletin boards."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        if id:
            bulletin_board = BulletinBoard.query.filter(
                BulletinBoard.id == id,
                BulletinBoard.tenant_id == tenant_id,
                BulletinBoard.is_deleted.__eq__(False),
                BulletinBoard.is_enabled.__eq__(True)
            ).first_or_404()
            bulletin_board_details = get_bulletin_board_details(
                bulletin_board, all_links=True)
        else:
            bulletin_board_details = get_bulletin_boards()
        return marshal(bulletin_board_details, bulletin_board_api_fields), 200

    @has_author_access
    def post(self):
        """Create new Bulletin Board Record."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        post_data = parser.parse_args()

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('name'))

        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(post_data.get('links')) == 0:
            raise SharedemosException(
                412, message='Provide atleast one link.')

        section_slug = post_data.get('section_slug')
        section_id = None
        bulletin_board = BulletinBoard()
        if section_slug:
            section = Section.query.filter(
                (Section.slug == section_slug) &
                (Section.tenant_id == tenant_id) &
                (Section.is_deleted.__eq__(False))
            ).first_or_404()
            if not section.can_edit():
                raise SharedemosException(
                    403, message=SharedemosException.ACCESS_RESTRICTED
                )
            section_id = section.id
        nth_child = BulletinBoard.query.filter_by(
            tenant_id=tenant_id,
            is_deleted=False,
            section_id=section_id,
        ).order_by(BulletinBoard.order.desc()).first()

        order = (nth_child.order if nth_child else 0) + 1

        bulletin_board.tenant_id = tenant_id
        bulletin_board.order = order
        bulletin_board.section_id = section_id
        bulletin_board.created_by = bulletin_board.modified_by = session.get('user_id')
        # Restrictions is only for private tenant.
        if tenant.flags.is_private and post_data.get('restricted_to_groupids'):
            validate_user_group(post_data['restricted_to_groupids'], tenant_id)   # raises exception if validation fails.
            bulletin_board.restricted_to_groups = get_usergroups(
                post_data['restricted_to_groupids']
            )

        bulletin_board_trans = BulletinBoardTranslations()
        bulletin_board_trans.name = unicode(post_data.get('name'))
        bulletin_board_trans.description = unicode(post_data.get('description'))

        bulletin_board_trans.language_id = session['author']['locale']
        bulletin_board_trans.bulletin_board = bulletin_board
        db.session.add_all([bulletin_board, bulletin_board_trans])
        for link in post_data['links']:
            bblink = BulletinBoardLinks()
            bblink.order = link['order']
            bblink.tenant_id = tenant_id
            bblink.link_type = link['type']
            bblink.bulletin_board = bulletin_board
            if link['type'] == 'external':
                bblink_trans = BulletinBoardLinksTranslations()
                bblink_trans.title = link['title']
                bblink_trans.link = link['url']
                bblink_trans.language_id = session['author']['locale']
                bblink_trans.bulletin_board_links = bblink
                db.session.add(bblink_trans)
            else:
                bblink.product_id = link.get('product_id')
                bblink.section_id = link.get('section_id')
                bblink.walkthrough_id = link.get('chapter_id')
            db.session.add(bblink)
        db.session.commit()
        clear_bulletin_board_cache(
            bulletin_board
        )
        bulletin_board_details = get_bulletin_board_details(
            bulletin_board)
        return format_data(marshal(
            bulletin_board_details, bulletin_board_api_fields
        )), 201

    @has_author_access
    def put(self, id):
        """
        Modifiy the Bulletin board.

        Changes in title, description, link-details, restriction to groups
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        put_data = parser.parse_args()
        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('name'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'name')

        if len(put_data.get('links')) == 0:
            raise SharedemosException(
                412, message='Provide atleast one link.')

        bulletin_board = BulletinBoard.query.filter(
            BulletinBoard.id == id
        ).first_or_404()
        if bulletin_board.section and\
                not bulletin_board.section.can_edit():
            raise SharedemosException(
                403, message=SharedemosException.ACCESS_RESTRICTED
            )

        bulletin_board_trans = get_locale_translation(bulletin_board)
        if not bulletin_board_trans:
            bulletin_board_trans = BulletinBoardTranslations()
            bulletin_board_trans.language_id = session['author']['locale']
            bulletin_board_trans.bulletin_board_id = bulletin_board.id

        bulletin_board_trans.name = put_data.get('name')
        bulletin_board_trans.description = put_data.get('description')
        bulletin_board_trans.links = put_data.get('links')
        link_data = put_data['links']
        incoming_link_id_order = {link.get('link_id'): link.get('order')
                                  for link in link_data}
        bboard_links = bulletin_board.bulletin_board_links
        for bb_link in bboard_links:
            if bb_link.id not in incoming_link_id_order.keys():
                bb_link.is_deleted = True
            else:
                bb_link.order = incoming_link_id_order[bb_link.id]
                if bb_link.link_type == 'external':
                    bblink_trans = get_locale_translation(bb_link)
                    if not bblink_trans:
                        bblink_trans = BulletinBoardLinksTranslations()
                    external_link_data = filter(
                        lambda link_data: link_data['link_id'] == bb_link.id, link_data)
                    bblink_trans.title = external_link_data[0].get('title')
                    bblink_trans.link = external_link_data[0].get('url')
                    bblink_trans.language_id = session['author']['locale']
                    bblink_trans.bulletin_board_link_id = bb_link.id
                    db.session.add(bblink_trans)
            db.session.add(bb_link)

        for data in link_data:
            if not data.get('link_id'):
                bboard_link = BulletinBoardLinks()
                if data['type'] == 'external':
                    if session['author']['locale'] != tenant.default_locale_id:
                        raise SharedemosException(
                            412,
                            message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                            % tenant.default_locale.name)
                    bblink_trans = BulletinBoardLinksTranslations()
                    bblink_trans.link = data['url']
                    bblink_trans.title = data['title']
                    bblink_trans.language_id = session['author']['locale']
                    bblink_trans.bulletin_board_link = bboard_link
                    db.session.add(bblink_trans)
                else:
                    bboard_link.product_id = data.get('product_id')
                    bboard_link.section_id = data.get('section_id')
                    bboard_link.walkthrough_id = data.get('chapter_id')
                bboard_link.order = data['order']
                bboard_link.link_type = data['type']
                bboard_link.tenant_id = tenant_id
                bboard_link.bulletin_board = bulletin_board
                db.session.add(bboard_link)
        bulletin_board_trans.modified_by = session.get('user_id')

        if tenant.flags.is_private and put_data.get('restricted_to_groupids'):
            validate_user_group(put_data['restricted_to_groupids'], tenant_id)   # raises exception if validation fails.
            bulletin_board.restricted_to_groups = get_usergroups(
                put_data['restricted_to_groupids']
            )
        db.session.add_all([bulletin_board_trans, bulletin_board])
        db.session.commit()

        clear_bulletin_board_cache(
            bulletin_board
        )
        bulletin_board = get_bulletin_board_details(bulletin_board)
        return format_data(marshal(bulletin_board, bulletin_board_api_fields)), 200

    @has_author_access
    def patch(self, id):
        """
        Function Modifies the Bulletin board.
        i.e Enable/Disable, copy, reorder/rearrange bulletin boards.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)

        bulletin_board = BulletinBoard.query.filter(
            BulletinBoard.id == id
        ).first_or_404()

        if 'copy' in request.json:
            source_bulletin_board = BulletinBoard.query.filter_by(
                id=id,
                tenant_id=tenant_id,
                is_deleted=False
            ).first_or_404()

            duplicate_bulletin_board(source_bulletin_board)
            update_siblings_order(source_bulletin_board.section)
            clear_bulletin_board_cache(
                bulletin_board
            )

            return {"status": "UPDATED"}, 201

        if 'is_enabled' in request.json:
            bulletin_board.is_enabled = request.json['is_enabled']

        if 'reorder' in request.json:
            target_entity_id = request.json.get('target_entity_id')
            target_bulletin_board = None
            if target_entity_id:
                target_bulletin_board = BulletinBoard.query.filter(
                    BulletinBoard.tenant_id == tenant_id,
                    BulletinBoard.id == target_entity_id,
                    BulletinBoard.is_deleted.__eq__(False)
                ).first()
            section = request.json.get('section_slug')
            change_bulletin_board_order(
                bulletin_board, target_bulletin_board, section
            )

        db.session.add(bulletin_board)
        db.session.commit()
        clear_bulletin_board_cache(
            bulletin_board
        )

        bulletin_board = get_bulletin_board_details(bulletin_board)
        return format_data(marshal(
            bulletin_board, bulletin_board_api_fields
        )), 200

    @has_author_access
    def delete(self, id):
        """Mark bulletin board entity as deleted."""
        bulletin_board = BulletinBoard.query.filter(
            BulletinBoard.id == id
        ).first_or_404()

        bulletin_board.is_deleted = True
        bulletin_board.modified_by = session.get('user_id')
        db.session.add(bulletin_board)
        db.session.commit()
        clear_bulletin_board_cache(
            bulletin_board
        )
        return {'delete': 'OK'}, 204
