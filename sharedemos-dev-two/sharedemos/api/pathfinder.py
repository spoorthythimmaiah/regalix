import re
import werkzeug
from flask import current_app, request, session
from flask.ext.restful import Resource, fields, marshal, reqparse
from sqlalchemy.orm.attributes import flag_modified

from sharedemos.libs.exceptions import SharedemosException
from sharedemos.models import (
    db,
    DraftOption,
    DraftOptionTranslations,
    DraftPath,
    DraftPathTranslations,
    DraftQuestion,
    DraftQuestionTranslations,
    DraftSuggestion,
    DraftSuggestionGroup,
    DraftSuggestionGroupTranslations,
    IconLibrary,
    Option,
    OptionTranslations,
    Path,
    PathTranslations,
    Question,
    QuestionTranslations,
    Suggestion,
    SuggestionGroup,
    SuggestionGroupTranslations,
    Tenant,
    Walkthrough
)
from sharedemos.libs.api import (
    is_author,
    format_data,
    get_option_details,
    get_path_details,
    get_question_details
)
from sharedemos.libs.decorators import (
    app_subscription_required,
    has_author_access
)
from sharedemos.libs.model import (
    get_pathfinder_suggestions,
    get_suggestion_details
)
from sharedemos.libs.helpers import (
    create_file,
    get_default_translation,
    get_locale_translation,
    get_translation,
    is_suggestion_available
)

icon_details = {
    'name': fields.String,
    'path': fields.String,
    'is_cdn_enabled': fields.Boolean
}

options = {
    'option_id': fields.Integer(attribute='id'),
    'next_question_id': fields.Integer(
        attribute=lambda x: x.next_question_id
        if x and x.next_question and
        not x.next_question.is_deleted else 0),
    'has_suggestions': fields.Boolean(attribute=lambda x: len(x.suggestions)
                                      if x else 0),
    'order': fields.Integer,
    'text': fields.String,
    'icon': fields.Nested(icon_details, allow_null=True),
    'suggestion_header': fields.String(attribute='suggestion_message'),
}

question_fields = {
    'icon': fields.Nested(icon_details, allow_null=True),
    'information': fields.Nested(options, attribute='_information',
                                 allow_null=True),
    'options': fields.Nested(options, attribute='_options'),
    'question_id': fields.Integer(attribute='id'),
    'subtext': fields.String,
    'text': fields.String,
}

questions_list_fields = {
    'question_id': fields.Integer(attribute='id'),
    'text': fields.String,
    'is_current': fields.Boolean(attribute='_is_current')
}

answer_response = {
    'question': fields.Nested(question_fields, allow_null=True),
    'previous_option_selected': fields.Integer,
    'current_option_selected': fields.Integer,
    'next_option_selected': fields.Integer
}

option_fields = {
    'question_id': fields.Integer(attribute='id'),
    'text': fields.String,
    'icon': fields.Nested(icon_details, allow_null=True),
}

resource_fields = {
    'name': fields.String,
    'path': fields.String,
    'resource_type': fields.String,
    'meta_data': fields.Raw,
    'is_cdn_enabled': fields.Boolean
}

link_metadata = {
    'icon_name': fields.String,
    'icon': fields.String,
    'site_name': fields.String,
    'title': fields.String,
    'description': fields.String,
    'url': fields.String
}

discrete_suggestion_fields = {
    'id': fields.Integer(attribute='_id'),
    'type': fields.String,
    'name': fields.String(attribute='_name'),
    'product_slug': fields.String(attribute='_product_slug'),
    'section_slug': fields.String(attribute='_section_slug'),
    'chapter_slug': fields.String(attribute='slug'),
    'resource': fields.Nested(resource_fields,
                              attribute='_resource',
                              allow_null=True),
    'external_url': fields.Nested(link_metadata,
                                  attribute='external_link',
                                  allow_null=True),
    'total_slides': fields.Integer(attribute='_total_slides')
}

group_details = {
    'id': fields.Integer(attribute='_id'),
    'title': fields.String,
    'description': fields.String,
    'suggestions_list': fields.Nested(discrete_suggestion_fields,
                                      attribute='_suggestions_list',
                                      default=[])
}

ordered_suggestion = {
    'id': fields.Integer,
    'type': fields.String,
    'title': fields.String,
    'description': fields.String,
    'suggestions_list': fields.Nested(discrete_suggestion_fields, default=[]),
    'name': fields.String(attribute='suggestion._name'),
    'product_slug': fields.String(attribute='suggestion._product_slug'),
    'section_slug': fields.String(attribute='suggestion._section_slug'),
    'chapter_slug': fields.String(attribute='suggestion.slug', default=None),
    'resource': fields.Nested(resource_fields,
                              attribute='suggestion._resource',
                              allow_null=True),
    'external_url': fields.Nested(link_metadata,
                                  attribute='suggestion.external_link',
                                  allow_null=True),
    'total_slides': fields.Integer(attribute='suggestion._total_slides')
}

suggestion_fields = {
    'message': fields.Raw(attribute='_suggestion_message', default={}),
    'suggestions': fields.Nested(ordered_suggestion, attribute='_suggestions')
}

path_fields = {
    'description': fields.String,
    'icon': fields.Nested(icon_details, allow_null=True),
    'slug': fields.String,
    'title': fields.String,
    'question': fields.Nested(question_fields, attribute='_question',
                              allow_null=True)
}

external_link_suggestion_fields = {
    'external_link': fields.Raw(attribute='external_link', default={}),
}


def get_tree_suggestion_details(suggestion):
    """Return a dict containing suggestion details for the 'TreeView'."""
    suggestion_details = {
        'order': suggestion.order,
        'created_at': unicode(suggestion.created_at)
    }
    if suggestion.walkthrough_id:
        walkthrough = suggestion.walkthrough
        section = walkthrough.playlist.section
        suggestion_details.update({
            'product_slug': section.get_category().slug,
            'section_slug': section.slug,
            'slug': walkthrough.slug,
            'title': unicode(walkthrough)
        })
    else:
        suggestion_details.update({
            'url': suggestion.external_link['url'],
            'title': suggestion.external_link.get('title')
        })
    return suggestion_details


def get_pathfinder_tree(question, fetch_icon=False,
                        transient_question_list=None):
    """
    Return a dict containing tree info of all questions, options.

    question_details = {
        'id': Question_id,
        'text': Question.translations_text,
        'options': [
                {
                    'id': Option_id,
                    'order': Option_order,
                    'text': Option.translations_text,
                    'suggestions': Option_suggestions,
                    'next_question': Option_next_question-question_details,
                }, ...
            ]
    }

    params:
        question - SqlAlchemy object of Questions class.
        fetch_icon - Boolean value, False by default.
        transient_question_list - List value used for storing
                                  question ids temporarily, None by default.
    """
    question_details = {
        'id': question.id,
        'text': question.text,
        'options': [],
    }
    if transient_question_list is None:
        transient_question_list = []
    transient_question_list.append(question.id)
    for option in question.options:
        if option.is_deleted:
            continue

        grouped_suggestions_dict = {}
        discrete_suggestions_dict = {}
        # Group suggestion query is isolated to eleminate multiple loops.
        for group_suggestion in option.suggestion_groups:
            if not is_suggestion_available(group_suggestion):
                continue

            translation = get_translation(group_suggestion)
            group_details = {
                'id': group_suggestion.id,
                'type': 'group',
                'title': translation.title,
                'order': group_suggestion.order,
                'created_at': unicode(group_suggestion.created_at),
                'suggestions_list': []
            }
            for _suggestion in group_suggestion.suggestions:
                if is_suggestion_available(_suggestion):
                    group_details['suggestions_list'].append(
                        get_tree_suggestion_details(_suggestion)
                    )
            grouped_suggestions_dict[group_suggestion.id] = group_details

        # Only get suggestions which are not grouped(Get only discrete suggestions).
        for suggestion in option.suggestions:
            if not is_suggestion_available(suggestion):
                continue
            if not suggestion.group_id:
                discrete_suggestions_dict[suggestion.id] = {
                    'id': suggestion.id,
                    'type': 'discrete'
                }
                discrete_suggestions_dict[suggestion.id].update(
                    get_tree_suggestion_details(suggestion)
                )

        option_translation = get_translation(option)
        order_details = (option_translation.suggestion_message['order_data']
                         if option_translation.suggestion_message and
                         option_translation.suggestion_message.get('order_data') else
                         None)

        # List containing dict objects.
        ordered_suggestions = []
        if order_details:
            for obj in order_details:
                if isinstance(obj, dict) and\
                        obj.get('groupId') in grouped_suggestions_dict:
                    ordered_suggestions.append(grouped_suggestions_dict[obj['groupId']])

                elif isinstance(obj, int) and obj in discrete_suggestions_dict:
                    ordered_suggestions.append(discrete_suggestions_dict[obj])
        else:
            ordered_suggestions = sorted(
                grouped_suggestions_dict.values() + discrete_suggestions_dict.values(),
                key=lambda x: (x['order'], x['created_at']))

        option_details = {
            'id': option.id,
            'order': option.order,
            'text': (option.text
                     if getattr(option, 'text', None) and option.text
                     else '<IMAGE>'),
            'suggestions': ordered_suggestions,
            'next_question': None
        }
        opt_next_question = option.next_question
        if opt_next_question and\
                not opt_next_question.is_deleted and\
                opt_next_question.is_enabled:
            if opt_next_question.id in transient_question_list:
                option_details['next_question'] = {
                    'id': opt_next_question.id,
                    'is_linked': True,
                    'text': opt_next_question.text,
                }
            else:
                option._next_question = get_question_details(
                    question=opt_next_question,
                    fetch_icon=fetch_icon
                )
                option_details['next_question'] = get_pathfinder_tree(
                    option._next_question,
                    fetch_icon,
                    transient_question_list
                )
        question_details['options'].append(option_details)
    return question_details


def update_order(entity, entities, new_order):
    """Update the entities order after adding/re-ordering."""
    order = 1
    found = False

    for _entity in entities:
        if _entity.id == entity.id:
            _entity.order = new_order
            found = True
        elif _entity.order <= new_order:
            if _entity.order == new_order:
                if not found:
                    order += 1
                _entity.order = order
            else:
                _entity.order = order
            order += 1
        elif _entity.order > new_order:
            _entity.order = order
            order += 1

        _entity.modified_by = session.get('user_id')
        _entity.is_published = False

        _entity_published = _entity.published
        if _entity_published:
            _entity_published.order = _entity.order
            db.session.add(_entity_published)
        db.session.add(_entity)


def publish_path(draft_path):
    """Publish the Pathfinder Path."""
    tenant_id = getattr(current_app, 'tenant_id', None)
    path = draft_path.published
    icons_list = list()
    if not draft_path.is_published:
        if not path:
            path = Path()
            path.created_by = session.get('user_id')
        else:
            path.is_deleted = draft_path.is_deleted

        path.is_enabled = draft_path.is_enabled
        path.draft = draft_path
        path.order = draft_path.order
        path.tenant_id = draft_path.tenant_id
        path.modified_by = session.get('user_id')
        db.session.add(path)

        draft_path.is_published = True
        db.session.add(draft_path)

        published_trans = [tr.language_id for tr in path.translations]
        for trans in draft_path.translations:
            if trans.language_id not in published_trans:
                translation = PathTranslations()
                translation.path = path
                translation.language_id = trans.language_id
            else:
                translation = get_locale_translation(path, trans.language_id)

            translation.title = trans.title
            translation.description = trans.description
            translation.icon = trans.icon
            icons_list.append(translation.icon)
            db.session.add(translation)

    questions = DraftQuestion.query.filter(
        (DraftQuestion.tenant_id == tenant_id) &
        (DraftQuestion.path_id == draft_path.id) &
        (DraftQuestion.is_published.__eq__(False))
    ).all()

    for draft_question in questions:
        draft_question_published = draft_question.published
        if not draft_question_published and draft_question.is_deleted:
            continue

        if not draft_question_published:
            question = Question()
            question.created_by = session.get('user_id')
        else:
            question = draft_question_published
            question.is_deleted = draft_question.is_deleted

        question.is_enabled = draft_question.is_enabled
        question.path = path
        question.draft = draft_question
        question.tenant_id = draft_question.tenant_id
        question.created_by = session.get('user_id')
        question.modified_by = session.get('user_id')

        draft_question.is_published = True
        db.session.add(draft_question)

        published_trans = [tr.language_id for tr in question.translations]
        for trans in draft_question.translations:
            if trans.language_id not in published_trans:
                translation = QuestionTranslations()
                translation.question = question
                translation.language_id = trans.language_id

            else:
                translation = get_locale_translation(question,
                                                     trans.language_id)

            translation.text = trans.text
            translation.subtext = trans.subtext
            translation.icon = trans.icon
            icons_list.append(translation.icon)
            db.session.add(translation)

        if not question.path.question_id and draft_question.path.question and\
                draft_question.path.question.published:
            q_id = draft_question.path.question.published.id
            question.path.question_id = q_id
        db.session.add(question)

    if draft_path.question and draft_path.question.published:
        path.question_id = draft_path.question.published.id
        db.session.add(path)

    options = DraftOption.query.filter(
        (DraftOption.tenant_id == tenant_id) &
        (DraftOption.path_id == draft_path.id) &
        (DraftOption.is_published.__eq__(False))
    ).all()

    positioned_options_dict = dict()

    for draft_option in options:
        if (not draft_option.published and draft_option.is_deleted) or\
                (not draft_option.question.published and
                 draft_option.question.is_deleted):
            continue

        if not draft_option.published:
            option = Option()
            option.created_by = session.get('user_id')
        else:
            option = draft_option.published
            option.is_deleted = draft_option.is_deleted

        option.is_enabled = draft_option.is_enabled
        option.question = draft_option.question.published
        option.path = path
        option.draft = draft_option
        option.order = draft_option.order
        option.tenant_id = draft_option.tenant_id

        option.option_type = draft_option.option_type

        option_trans = get_translation(draft_option)

        if option_trans.suggestion_message and\
                option_trans.suggestion_message.get('order_data'):
            positioned_options_dict[
                option_trans.option_id] = option_trans.suggestion_message.get(
                    'order_data')

        option.modified_by = session.get('user_id')
        if draft_option.next_question:
            option.next_question = draft_option.next_question.published

        db.session.add(option)

        draft_option.is_published = True
        db.session.add(draft_option)

        published_trans = [
            tr.language_id for tr in draft_option.published.translations]
        for trans in draft_option.translations:
            if trans.language_id not in published_trans:
                translation = OptionTranslations()
                translation.option = option
                translation.language_id = trans.language_id
            else:
                translation = get_locale_translation(
                    draft_option.published, trans.language_id)

            translation.text = trans.text
            translation.suggestion_message = trans.suggestion_message
            translation.option = option
            translation.icon = trans.icon
            icons_list.append(translation.icon)

            db.session.add(translation)

    groups = DraftSuggestionGroup.query.filter(
        (DraftSuggestionGroup.tenant_id == tenant_id) &
        (DraftSuggestionGroup.path_id == draft_path.id) &
        (DraftSuggestionGroup.is_published.__eq__(False))
    ).all()

    for draft_group in groups:
        if (not draft_group.published and draft_group.is_deleted) or\
                (not draft_group.option.published and
                 draft_group.option.is_deleted):
            continue

        if not draft_group.published:
            group = SuggestionGroup()
            group.created_by = session.get('user_id')
        else:
            group = draft_group.published
            group.is_deleted = draft_group.is_deleted

        group.option = draft_group.option.published
        group.order = draft_group.order
        group.tenant_id = draft_group.tenant_id
        group.modified_by = session.get('user_id')
        group.draft = draft_group
        group.path = path
        db.session.add(group)

        draft_group.is_published = True
        db.session.add(draft_group)

        published_trans = [
            tr.language_id for tr in draft_group.published.translations]
        for trans in draft_group.translations:
            if trans.language_id not in published_trans:
                translation = SuggestionGroupTranslations()
                translation.language_id = trans.language_id
                translation.group = group
            else:
                translation = get_locale_translation(
                    draft_group.published, trans.language_id)

            translation.title = trans.title
            translation.description = trans.description
            translation.suggestion_group = group
            db.session.add(translation)

    suggestions = DraftSuggestion.query.filter(
        (DraftSuggestion.tenant_id == tenant_id) &
        (DraftSuggestion.path_id == draft_path.id) &
        (DraftSuggestion.is_published.__eq__(False))
    ).all()

    for draft_suggestion in suggestions:
        if (not draft_suggestion.published and draft_suggestion.is_deleted) or\
                (not draft_suggestion.option.published and
                 draft_suggestion.option.is_deleted):
            continue

        if not draft_suggestion.published:
            suggestion = Suggestion()
            suggestion.created_by = session.get('user_id')
        else:
            suggestion = draft_suggestion.published
            suggestion.is_deleted = draft_suggestion.is_deleted

        suggestion.option = draft_suggestion.option.published
        suggestion.path = path
        suggestion.draft = draft_suggestion
        suggestion.tenant_id = draft_suggestion.tenant_id
        suggestion.order = draft_suggestion.order
        suggestion.external_link = draft_suggestion.external_link
        suggestion.walkthrough_id = draft_suggestion.walkthrough_id
        suggestion.modified_by = session.get('user_id')

        draft_suggestion.is_published = True
        db.session.add(draft_suggestion)

        suggestion.group = None
        if draft_suggestion.group:
            suggestion.group = draft_suggestion.group.published
        db.session.add(suggestion)

    db.session.commit()

    if positioned_options_dict:
        option_ids = positioned_options_dict.keys()

        group_ids = list()
        suggestion_ids = list()
        orders = [element for value in positioned_options_dict.values()
                  for element in value]

        for ele in orders:
            if isinstance(ele, dict):
                group_ids.append(ele.get('groupId'))
            elif isinstance(ele, int):
                suggestion_ids.append(ele)

        # add tenant filter here
        options = Option.query.filter(Option.draft_id.in_(option_ids)).all()
        suggestions = Suggestion.query.filter(
            Suggestion.draft_id.in_(suggestion_ids)).all()
        groups = SuggestionGroup.query.filter(
            SuggestionGroup.draft_id.in_(group_ids)).all()

        option_dict = {option.draft_id: option for option in options}
        suggestion_dict = {
            suggestion.draft_id: suggestion.id for suggestion in suggestions}
        group_dict = {group.draft_id: group.id for group in groups}

        for key, value in positioned_options_dict.items():
            published_option = option_dict[key]
            reorder_list = list()
            published_option_trans = get_translation(published_option)
            if published_option_trans.suggestion_message.get('order_data'):
                for _suggestion in published_option_trans.suggestion_message[
                        'order_data']:
                    if type(_suggestion) == dict and \
                            _suggestion.get('groupId') and\
                            group_dict.get(_suggestion['groupId']):
                        reorder_list.append({
                            'groupId': group_dict[_suggestion['groupId']]
                        })
                    elif suggestion_dict.get(_suggestion):
                        reorder_list.append(suggestion_dict[_suggestion])

            for p_trans in published_option.translations:
                p_trans.suggestion_message['order_data'] = reorder_list
                db.session.add(p_trans)
        db.session.commit()

    from sharedemos.tasks import upload_to_algolia
    upload_to_algolia.delay({
        'path_id': path.id,
        'category': u'pathfinder',
        'tenant_id': tenant_id
    })


p_parser = reqparse.RequestParser()
p_parser.add_argument('title', required=True, type=unicode, location=[
                      'form', 'json'], help='Question title required')
p_parser.add_argument('description', type=unicode,
                      location=['form', 'json'], default="")
p_parser.add_argument(
    'remove_icon', type=bool, location=['form', 'json'], default=False)
p_parser.add_argument(
    'icon', type=werkzeug.datastructures.FileStorage, location='files',
    default=None)
p_parser.add_argument(
    'publish', type=bool, location=['form', 'json'], default=False)


class PathApi(Resource):

    method_decorators = [app_subscription_required('PATHFINDER')]

    def get(self, slug=None):
        """
        Used to get paths, path details, path_tree.

        params:
            slug - unicode slug of a particular path.
        """
        tenant_id = getattr(current_app, 'tenant_id', None)
        # Hack to convert string 'true', 'false' to Boolean True/False
        # when value of 'get_tree' is 'true', not('true' == 'false') => True
        # when value of 'get_tree' is 'false', not('false' == 'false') => False
        get_tree = not (request.args.get('get_tree', 'false') == 'false')
        if slug:
            if is_author():
                path = DraftPath.query.filter(
                    (DraftPath.tenant_id == tenant_id) &
                    (DraftPath.slug == unicode(slug)) &
                    (DraftPath.is_deleted.__eq__(False))
                ).first_or_404()
            else:
                path = Path.query.filter(
                    (Path.tenant_id == tenant_id) &
                    (Path.slug == unicode(slug)) &
                    (Path.is_deleted.__eq__(False))
                ).first_or_404()

            path._question = None
            # if 'get_tree' is True, then don't fetch icon details.
            path = get_path_details(path=path,
                                    fetch_icon=(not get_tree))
            path_question = path.question
            if (path_question and not path_question.is_deleted and
                    path_question.is_enabled):
                path._question = get_question_details(
                    question=path_question,
                    fetch_icon=(not get_tree)
                )
                if get_tree and is_author():
                    path_tree_details = {
                        'slug': path.slug,
                        'title': path.title,
                        'question': get_pathfinder_tree(
                            question=path._question
                        )
                    }
                    return path_tree_details

            return format_data(marshal(path, path_fields)), 200

        if is_author():

            paths = DraftPath.query.filter(
                (DraftPath.tenant_id == tenant_id) &
                (DraftPath.is_enabled.__eq__(True)) &
                (DraftPath.is_deleted.__eq__(False))
            ).order_by(DraftPath.order, DraftPath.modified_at.desc()).all()
        else:
            paths = Path.query.join(
                Path.questions
            ).join(
                Question.options
            ).filter(
                Path.tenant_id == tenant_id,
                Path.is_deleted.__eq__(False),
                Path.is_enabled.__eq__(True),
                Path.question_id.isnot(None),
                Question.path_id == Path.id,
                Question.is_deleted.__eq__(False),
                Question.is_enabled.__eq__(True),
                Option.question_id == Question.id,
                Option.is_deleted.__eq__(False),
                Option.is_enabled.__eq__(True)
            ).order_by(Path.order, Path.modified_at.desc()).all()

        for path in paths:
            translation = get_translation(path)
            path.title = translation.title
            path.description = translation.description
            path.icon = translation.icon

        return format_data(marshal(paths, path_fields)), 200

    @has_author_access
    def post(self):

        post_data = p_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            post_data.get('title'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale.id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        nth_child = DraftPath.query.filter(
            (DraftPath.tenant_id == tenant_id) &
            (DraftPath.is_deleted.__eq__(False))
        ).order_by(DraftPath.order.desc()).first()
        order = (nth_child.order if nth_child else 0) + 1

        path = DraftPath()
        path.order = order
        path.tenant_id = tenant_id
        path.created_by = session.get('user_id')
        path.modified_by = session.get('user_id')

        translation = DraftPathTranslations()
        translation.path = path
        translation.language_id = session['author']['locale']
        translation.title = post_data['title']
        translation.description = post_data['description']
        if post_data.get('icon'):
            icon_hex_name = create_file(post_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(post_data['title'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            translation.icon = icon_lib
            db.session.add(icon_lib)
        path.translations.append(translation)

        db.session.add(path)
        db.session.commit()

        return {'status': 'CREATED'}, 201

    @has_author_access
    def put(self, slug):

        put_data = p_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)

        invalid_name = re.match(
            r'^[!@#$%^&*()_+\-=\[\]{};\':\"\\|,.<>\/?]*$',
            put_data.get('title'))
        if invalid_name:
            raise SharedemosException(
                412, message=SharedemosException.SPECIAL_CHARACTERS % 'title')

        path = DraftPath.query.filter(
            (DraftPath.tenant_id == tenant_id) &
            (DraftPath.slug == slug) &
            (DraftPath.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(path, author=True)
        if not trans:
            def_trans = get_default_translation(path)
            trans = DraftPathTranslations()
            trans.path_id = path.id
            trans.language_id = session['author']['locale']
            if def_trans.icon:
                trans.icon = def_trans.icon

        # Path translation
        trans.title = put_data['title']
        trans.description = put_data['description']
        trans.path = path
        if put_data.get('icon'):
            icon_hex_name = create_file(put_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(put_data['title'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            trans.icon = icon_lib
            db.session.add(icon_lib)
            for translation in path.translations:
                translation.icon = icon_lib
                db.session.add(translation)

        elif put_data['remove_icon']:
            for translation in path.translations:
                translation.icon = None
                db.session.add(translation)

        path.modified_by = session.get('user_id')
        path.is_published = False
        db.session.add_all([trans, path])
        db.session.commit()
        return {'status': 'UPDATED'}, 200

    @has_author_access
    def patch(self, slug):

        tenant_id = getattr(current_app, 'tenant_id', None)
        path = DraftPath.query.filter(
            (DraftPath.tenant_id == tenant_id) &
            (DraftPath.slug == slug) &
            (DraftPath.is_deleted.__eq__(False))
        ).first_or_404()

        if 'reorder' in request.json:
            new_order = int(request.json['reorder'])
            paths = DraftPath.query.filter(
                (DraftPath.tenant_id == tenant_id) &
                (DraftPath.is_deleted.__eq__(False))
            ).order_by(DraftPath.order).all()

            order = 1
            found = False

            for _path in paths:
                if _path.slug == path.slug:
                    _path.order = new_order
                    found = True
                elif _path.order <= new_order:
                    if _path.order == new_order:
                        if not found:
                            order += 1
                        _path.order = order
                    else:
                        _path.order = order
                    order += 1
                elif _path.order > new_order:
                    _path.order = order
                    order += 1

                _path.modified_by = session.get('user_id')
                _path.is_published = False
                if _path.published:
                    _path.published.order = _path.order
                db.session.add(_path)

            db.session.commit()

        elif 'publish' in request.json and request.json['publish']:
            publish_path(path)

        return {'status': 'UPDATED'}, 200

    @has_author_access
    def delete(self, slug):
        tenant_id = getattr(current_app, 'tenant_id', None)
        path = DraftPath.query.filter(
            (DraftPath.tenant_id == tenant_id) &
            (DraftPath.slug == slug) &
            (DraftPath.is_deleted.__eq__(False))
        ).first_or_404()
        path.is_deleted = True
        path.modified_by = session.get('user_id')
        if path.published:
            path.published.is_deleted = True
        db.session.add(path)
        db.session.commit()

        if path.published and path.published.id:
            from sharedemos.tasks import delete_path_from_algolia
            delete_path_from_algolia.delay({
                'entity_id': path.published.id
            })
        return {'status': 'DELETED'}, 200


q_parser = reqparse.RequestParser()
q_parser.add_argument('title', required=True, type=unicode, location=[
                      'form', 'json'], help='Question title required')
q_parser.add_argument('description', type=unicode,
                      location=['form', 'json'], default="")
q_parser.add_argument(
    'icon', type=werkzeug.datastructures.FileStorage, location='files',
    default=None)
q_parser.add_argument(
    'remove_icon', type=bool, location=['form', 'json'], default=False)
q_parser.add_argument('path_id', type=unicode, location=['form', 'json'])
q_parser.add_argument('prev_option_id', type=int, location=['form', 'json'])


def add_next_question(question, q_list=[]):
    if question.options:
        for opt in question.options:
            next_q = opt.next_question
            if opt.is_deleted or not opt.is_enabled or not next_q or\
                    next_q.is_deleted or not next_q.is_enabled or\
                    next_q in q_list:
                continue

            q_list.append(next_q)
            add_next_question(next_q, q_list)
    return q_list


def get_path_questions(path):
    q_list = []
    if path.question and path.question.is_enabled and\
            not path.question.is_deleted:
        q_list.append(path.question)
        q_list = add_next_question(path.question, q_list)

    q_list.sort(key=lambda x: x.modified_at, reverse=True)
    return q_list


class QuestionApi(Resource):

    decorators = [app_subscription_required('PATHFINDER'), has_author_access]

    def get(self, question_id=None):
        tenant_id = getattr(current_app, 'tenant_id', None)
        if question_id:
            question = DraftQuestion.query.filter(
                (DraftQuestion.id == question_id) &
                (DraftQuestion.tenant_id == tenant_id) &
                (DraftQuestion.is_deleted.__eq__(False))
            ).first_or_404()

            question = get_question_details(question)

            return format_data(marshal(question, question_fields)), 200
        else:
            questions = list()
            path_id = request.args.get('path_id')
            if path_id:
                path = DraftPath.query.filter(
                    (DraftPath.tenant_id == tenant_id) &
                    (DraftPath.slug == unicode(path_id)) &
                    (DraftPath.is_deleted.__eq__(False))
                ).first()
                if path and path.is_enabled and not path.is_deleted:
                    questions = get_path_questions(path)
            else:
                questions = DraftQuestion.query.filter(
                    (DraftQuestion.tenant_id == tenant_id) &
                    (DraftQuestion.is_deleted.__eq__(False))
                ).order_by(DraftQuestion.modified_at).all()

            current_option_id = request.args.get("current_option_id")
            if current_option_id:
                current_option = DraftOption.query.get(current_option_id)
                current_question = current_option.next_question

            for question in questions:
                if current_option_id and question == current_question:
                    question._is_current = True
                question = get_question_details(question)

            return format_data(marshal(questions, questions_list_fields)), 200

    def post(self):

        post_data = q_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)
        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        path = DraftPath.query.filter(
            (DraftPath.tenant_id == tenant_id) &
            (DraftPath.slug == unicode(post_data['path_id'])) &
            (DraftPath.is_deleted.__eq__(False))
        ).first_or_404()

        question = DraftQuestion()
        question.tenant_id = tenant_id
        question.path = path

        translation = DraftQuestionTranslations()
        translation.language_id = session['author']['locale']
        translation.text = post_data['title']
        translation.subtext = post_data['description']
        if post_data.get('icon'):
            icon_hex_name = create_file(post_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(post_data['title'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            translation.icon = icon_lib
            db.session.add(icon_lib)

        question.translations.append(translation)
        question.created_by = session.get('user_id')
        question.modified_by = session.get('user_id')

        db.session.add(question)

        previous_option = None

        if post_data.get('prev_option_id'):
            previous_option = DraftOption.query.get(
                post_data['prev_option_id'])
            previous_option.next_question = question
            previous_option.is_published = False
            previous_option.modified_by = session.get('user_id')
            db.session.add(previous_option)
        elif post_data.get('path_id'):
            path = DraftPath.query.filter(
                (DraftPath.tenant_id == tenant_id) &
                (DraftPath.slug == unicode(post_data['path_id'])) &
                (DraftPath.is_deleted.__eq__(False))
            ).first_or_404()
            path.question = question
            path.modified_by = session.get('user_id')
            db.session.add(path)

        db.session.commit()
        question = get_question_details(question)

        if 'edit_path_finder' not in session['user']:
            session['user']['edit_path_finder'] = dict(
                previous=list(), next=list())

        pf_session = session['user']['edit_path_finder']
        if post_data.get('prev_option_id'):
            if str(post_data['prev_option_id']) not in pf_session['previous']:
                pf_session['previous'].append(str(previous_option.id))

            if str(post_data['prev_option_id']) not in pf_session['next']:
                pf_session['next'] = list()

        return format_data(marshal(question, question_fields)), 201

    def put(self, question_id):
        put_data = q_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        question = DraftQuestion.query.filter(
            (DraftQuestion.id == question_id) &
            (DraftQuestion.tenant_id == tenant_id) &
            (DraftQuestion.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(question, author=True)
        if not trans:
            def_trans = get_default_translation(question)
            trans = DraftQuestionTranslations()
            trans.question_id = question.id
            trans.language_id = session['author']['locale']
            if def_trans.icon:
                trans.icon = def_trans.icon

        # Question translation
        trans.text = put_data['title']
        trans.subtext = put_data['description']
        if put_data.get('icon'):
            icon_hex_name = create_file(put_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(put_data['title'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            trans.icon = icon_lib
            db.session.add(icon_lib)
            for translation in question.translations:
                translation.icon = icon_lib
                db.session.add(translation)

        elif put_data['remove_icon']:
            for translation in question.translations:
                translation.icon = None
                db.session.add(translation)

        question.modified_by = session.get('user_id')
        question.is_published = False

        db.session.add_all([trans, question])
        db.session.commit()
        question = get_question_details(question)

        return format_data(marshal(question, question_fields)), 200

    def delete(self, question_id):
        tenant_id = getattr(current_app, 'tenant_id', None)
        question = DraftQuestion.query.get(question_id)
        question.is_deleted = True

        question.modified_by = session.get('user_id')
        question.is_published = False

        if question.path.question_id == question.id:
            question.path.question = None

        question_options = DraftOption.query.filter(
            DraftOption.question == question,
            DraftOption.tenant_id == tenant_id
        ).all()
        for option in question_options:
            option.is_deleted = True
            option.modified_by = session.get('user_id')
            db.session.add(option)
        db.session.add(question)
        db.session.commit()
        pf_session = session['user']['edit_path_finder']
        prev_question = None
        for opt in question.options:
            if str(opt.id) in pf_session['previous']:
                prev_question = get_question_details(question)
                pf_session['previous'].remove(str(opt.id))
                break
        return format_data(marshal(prev_question, question_fields)), 200


class AnswerApi(Resource):

    method_decorators = [app_subscription_required('PATHFINDER')]

    def get(self, answer_id):

        tenant_id = getattr(current_app, 'tenant_id', None)
        if is_author():
            option = DraftOption.query.filter(
                (DraftOption.tenant_id == tenant_id) &
                (DraftOption.is_enabled.__eq__(True)) &
                (DraftOption.is_deleted.__eq__(False)) &
                (DraftOption.id == answer_id)
            ).first_or_404()

            if 'edit_path_finder' not in session['user']:
                session['user']['edit_path_finder'] = dict(
                    previous=list(), next=list())

            pf_session = session['user']['edit_path_finder']

        else:
            option = Option.query.filter(
                (Option.tenant_id == tenant_id) &
                (Option.is_enabled.__eq__(True)) &
                (Option.is_deleted.__eq__(False)) &
                (Option.id == answer_id)
            ).first_or_404()

            if 'path_finder' not in session['user']:
                session['user']['path_finder'] = dict(
                    previous=list(), next=list())

            pf_session = session['user']['path_finder']

        api_response = dict()
        if request.args.get('nav'):
            if request.args['nav'] == 'back':
                question = get_question_details(option.question)
                api_response['question'] = question

                if str(answer_id) in pf_session['previous']:
                    pf_session['previous'].remove(str(answer_id))
                    if str(answer_id) not in pf_session['next']:
                        pf_session['next'].append(str(answer_id))

                if option.question.from_option:
                    for _op in option.question.from_option:
                        if str(_op.id) in pf_session['previous']:
                            api_response['previous_option_selected'] = _op.id
                            break

                api_response['current_option_selected'] = api_response[
                    'next_option_selected'] = answer_id
            elif request.args['nav'] == 'next':
                if str(answer_id) in pf_session['next']:
                    pf_session['next'].remove(str(answer_id))
                    if str(answer_id) not in pf_session['previous']:
                        pf_session['previous'].append(str(answer_id))

                if option.next_question:
                    question = get_question_details(option.next_question)
                    api_response['question'] = question

                    _options = [
                        op for op in option.next_question.options
                        if not op.is_deleted and op.is_enabled]
                    for op in _options:
                        if str(op.id) in pf_session['next']:
                            api_response[
                                'current_option_selected'] = api_response[
                                'next_option_selected'] = op.id
                            break

                api_response['previous_option_selected'] = answer_id
        else:
            if option.next_question and not option.next_question.is_deleted:
                question = get_question_details(option.next_question)
                api_response['question'] = question

            if str(answer_id) not in pf_session['previous']:
                pf_session['previous'].append(str(answer_id))

            if str(answer_id) not in pf_session['next']:
                pf_session['next'] = list()

            api_response['previous_option_selected'] = answer_id

        return format_data(marshal(api_response, answer_response)), 200


o_parser = reqparse.RequestParser()
o_parser.add_argument('question_id', type=int, required=True, location=[
                      'form', 'json'], help='Question id required')
o_parser.add_argument(
    'description', type=unicode, location=['form', 'json'], default="")
o_parser.add_argument(
    'is_cta', type=bool, location=['form', 'json'], default=False)
o_parser.add_argument(
    'remove_icon', type=bool, location=['form', 'json'], default=False)
o_parser.add_argument(
    'icon', type=werkzeug.datastructures.FileStorage, location='files')

s_parser = reqparse.RequestParser()
s_parser.add_argument(
    'title', type=unicode, location=['form', 'json'], default="")
s_parser.add_argument(
    'body', type=unicode, location=['form', 'json'], default="")
s_parser.add_argument(
    'icon', type=werkzeug.datastructures.FileStorage, location='files')
s_parser.add_argument(
    'remove_icon', type=bool, location=['form', 'json'], default=False)
s_parser.add_argument(
    'suggestions', type=dict, location=['form', 'json'], default=dict())


class OptionApi(Resource):
    """
    Pathfinder's Option api to handle GET, POST, PUT, PATCH, DELETE requests.

    App subscription access check enabled for all the methods.
    Author access check enabled for POST, PUT, PATCH, DELETE methods.
    """

    method_decorators = [app_subscription_required('PATHFINDER')]

    def get(self, option_id):
        """Return option details for an option_id w.r.t 'is_author'."""
        if not option_id:
            raise SharedemosException(404)

        tenant_id = getattr(current_app, 'tenant_id', None)
        if is_author():
            option = DraftOption.query.filter(
                (DraftOption.tenant_id == tenant_id) &
                (DraftOption.is_enabled.__eq__(True)) &
                (DraftOption.is_deleted.__eq__(False)) &
                (DraftOption.id == option_id)
            ).first_or_404()
        else:
            option = Option.query.filter(
                (Option.tenant_id == tenant_id) &
                (Option.is_enabled.__eq__(True)) &
                (Option.is_deleted.__eq__(False)) &
                (Option.id == option_id)
            ).first_or_404()

        if 'suggestions' in request.url:
            option = get_pathfinder_suggestions(option_id, is_author())
            return format_data(marshal(option, suggestion_fields)), 200
        else:
            option = get_option_details(option)
            return format_data(marshal(option, option_fields)), 200

    @has_author_access
    def post(self):
        """Create a new Option for an existing question."""
        post_data = o_parser.parse_args()
        question = DraftQuestion.query.filter(
            (DraftQuestion.id == post_data['question_id']) &
            (DraftQuestion.is_deleted.__eq__(False))
        ).first()
        if not question:
            raise SharedemosException(404)

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        option = DraftOption()
        option.tenant_id = tenant_id
        option.created_by = session.get('user_id')
        option.modified_by = session.get('user_id')
        option.path_id = question.path_id
        if post_data.get('is_cta'):
            option.option_type = u'information'

        translation = DraftOptionTranslations()
        translation.language_id = session['author']['locale']
        translation.text = post_data['description'] or ""
        if post_data.get('icon'):
            icon_hex_name = create_file(post_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode(post_data['description'])
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            translation.icon = icon_lib
            db.session.add(icon_lib)
        option.translations.append(translation)
        option.order = len(question.options) + 1
        option.question = question

        db.session.add(option)
        db.session.commit()

        return {'status': 'CREATED'}, 201

    @has_author_access
    def put(self, option_id):
        """Update translations, icon, cta details of an Option."""
        put_data = o_parser.parse_args()
        tenant_id = getattr(current_app, 'tenant_id', None)
        option = DraftOption.query.filter(
            (DraftOption.tenant_id == tenant_id) &
            (DraftOption.id == option_id) &
            (DraftOption.is_deleted.__eq__(False))
        ).first_or_404()

        trans = get_translation(option, author=True)
        if not trans:
            def_trans = get_default_translation(option)
            trans = DraftOptionTranslations()
            trans.option_id = option.id
            trans.language_id = session['author']['locale']
            trans.text = def_trans.text
            if def_trans.icon:
                trans.icon = def_trans.icon

        # Option translation
        trans.text = put_data['description']
        if put_data.get('icon'):
            icon_hex_name = create_file(put_data['icon'])
            icon_lib = IconLibrary()
            icon_lib.name = unicode('Option' + str(option.order))
            icon_lib.path = icon_hex_name
            icon_lib.tenant_id = tenant_id
            trans.icon = icon_lib
            db.session.add(icon_lib)
            for translation in option.translations:
                translation.icon = icon_lib
                db.session.add(translation)

        elif put_data['remove_icon']:
            for translation in option.translations:
                translation.icon = None
                db.session.add(translation)

        if put_data.get('is_cta'):
            option.option_type = u'information'
        else:
            option.option_type = u'answer'

        option.modified_by = session.get('user_id')

        option.is_published = False

        db.session.add_all([trans, option])
        db.session.commit()
        return {'status': 'UPDATED'}, 200

    @has_author_access
    def patch(self, option_id):
        """Update suggestions, order details of an Option."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        option = DraftOption.query.filter(
            (DraftOption.tenant_id == tenant_id) &
            (DraftOption.id.__eq__(option_id)) &
            (DraftOption.is_deleted.__eq__(False)) &
            (DraftOption.is_enabled.__eq__(True))
        ).first_or_404()

        path_id = option.path_id

        if not request.json:
            patch_data = s_parser.parse_args()
            option_trans = get_translation(option, author=True)
            if not option_trans:
                def_trans = get_default_translation(option)
                option_trans = DraftOptionTranslations()
                option_trans.language_id = session['author']['locale']
                option_trans.text = def_trans.text
                option_trans.option_id = def_trans.option_id
                option_trans.suggestion_message = \
                    {
                        'icon_path': def_trans.suggestion_message.get(
                            'icon_path'
                        )
                    }

            if not option_trans.suggestion_message:
                option_trans.suggestion_message = {}
            option_trans.suggestion_message['title'] = patch_data.get(
                'title', '')
            option_trans.suggestion_message['body'] = patch_data.get(
                'body', '')

            # Suggestion image/icon is common across all the translations,
            # set/remove all translations image/icon data.

            if patch_data.get('icon'):
                icon_name = create_file(patch_data['icon'])
                for opt_trans in option.translations:
                    if opt_trans.suggestion_message:
                        opt_trans.suggestion_message['icon_path'] = icon_name
                        flag_modified(opt_trans, 'suggestion_message')
                        db.session.add(opt_trans)

            if patch_data.get('remove_icon'):
                for opt_trans in option.translations:
                    opt_trans.suggestion_message.pop('icon_path', None)
                    flag_modified(opt_trans, 'suggestion_message')
                    db.session.add(opt_trans)

            option.modified_by = session.get('user_id')
            option.is_published = False

            db.session.add_all([option_trans, option])
            db.session.commit()

            option = get_pathfinder_suggestions(option.id, is_author())
            return format_data(marshal(option, suggestion_fields)), 200

        elif 'reorder' in request.json:
            new_order = int(request.json['reorder'])
            question_id = option.question_id
            options = DraftOption.query.filter(
                (DraftOption.question_id == question_id) &
                (DraftOption.tenant_id == tenant_id) &
                (DraftOption.is_deleted.__eq__(False)) &
                (DraftOption.is_enabled.__eq__(True))
            ).order_by(DraftOption.order).all()

            order = 1
            found = False

            for _option in options:
                if _option.id == option_id:
                    _option.order = new_order
                    found = True
                elif _option.order <= new_order:
                    if _option.order == new_order:
                        if not found:
                            order += 1
                        _option.order = order
                    else:
                        _option.order = order
                    order += 1
                elif _option.order > new_order:
                    _option.order = order
                    order += 1

                _option.modified_by = session.get('user_id')
                _option.is_published = False
                db.session.add(_option)

            db.session.commit()
            return {'status': 'UPDATED'}, 200

        elif 'next_question_id' in request.json:
            option.next_question_id = int(request.json['next_question_id'])\
                if request.json.get('next_question_id') else None
            option.modified_by = session.get('user_id')
            option.is_published = False
            db.session.add(option)
            db.session.commit()
            next_question = option.next_question \
                if option.next_question else option.question
            question = get_question_details(next_question)
            return format_data(marshal(question, question_fields)), 200

        elif 'suggestions' in request.json:
            patch_data = s_parser.parse_args()
            if 'chapters' in patch_data['suggestions'] or\
                    'external_links' in patch_data['suggestions']:
                suggestion_orders = [
                    each_suggestion.order for each_suggestion in
                    option.suggestions if not each_suggestion.is_deleted and
                    not each_suggestion.group_id]
                _order = max(suggestion_orders) if suggestion_orders else 0
                if 'external_links' in patch_data['suggestions']:
                    if patch_data['suggestions']['external_links']:
                        chapters = patch_data['suggestions']['external_links']

                elif patch_data['suggestions']['chapters']:
                        chapters = Walkthrough.query.filter(
                            (Walkthrough.tenant_id == tenant_id) &
                            (Walkthrough.slug.in_(
                                patch_data['suggestions']['chapters'])) &
                            (Walkthrough.is_deleted.__eq__(False)) &
                            (Walkthrough.is_enabled.__eq__(True))
                        ).all()

                for index, chapter in enumerate(chapters):
                    new_order = _order + index + 1
                    suggestion = DraftSuggestion()
                    suggestion.option = option
                    suggestion.path_id = path_id
                    if 'external_links' in patch_data['suggestions']:
                        suggestion.external_link = chapter
                    else:
                        suggestion.walkthrough = chapter
                    suggestion.tenant_id = tenant_id
                    suggestion.order = new_order
                    suggestion.created_by = session.get('user_id')
                    suggestion.modified_by = session.get('user_id')
                    db.session.add(suggestion)

                # updating the order data for newly added demos
                option_trans = get_translation(option)
                if option_trans.suggestion_message and\
                        option_trans.suggestion_message.get('order_data'):
                    db.session.commit()
                    order_data = option_trans.suggestion_message.get(
                        'order_data')
                    new_elements = []
                    for suggestion in option.suggestions:
                        if not suggestion.is_deleted and not suggestion.group\
                                and suggestion.id not in order_data:
                            new_elements.append(suggestion.id)

                    suggestion_message = dict()
                    for key, value in option_trans.suggestion_message.items():
                        suggestion_message[key] = value

                    suggestion_message[
                        'order_data'] = order_data + new_elements

                    option_trans.suggestion_message = suggestion_message
                    option.is_published = False
                    db.session.add(option_trans)

            if 'message' in patch_data['suggestions']:
                if option_trans.suggestion_message:
                    suggestion_message = dict()
                    for k, val in option_trans.suggestion_message.items():
                        suggestion_message[k] = val

                    for k, val in patch_data['suggestions']['message'].items():
                        suggestion_message[k] = val

                else:
                    option_trans.suggestion_message = patch_data[
                        'suggestions']['message']
                db.session.add(option_trans)

                option.modified_by = session.get('user_id')
                option.is_published = False

            db.session.add(option)
            db.session.commit()
            option = get_pathfinder_suggestions(option.id, is_author())
            return format_data(marshal(option, suggestion_fields)), 200

    @has_author_access
    def delete(self, option_id):
        """Set 'deleted' flag for an Option and its suggestions."""
        option = DraftOption.query.get(option_id)

        for suggestion in option.suggestions:
            suggestion.is_deleted = True
            suggestion.modified_by = session.get('user_id')
            db.session.add(suggestion)
        for group in option.suggestion_groups:
            group.is_deleted = True
            group.modified_by = session.get('user_id')
            db.session.add(group)

        option.is_deleted = True
        option.modified_by = session.get('user_id')

        option.is_published = False

        db.session.add(option)
        db.session.commit()
        return {'status': 'DELETED'}, 200


suggestion_parser = reqparse.RequestParser()
suggestion_parser.add_argument(
    'suggestion_id', type=int, required=True, location='json',
    help='suggestion id required')
suggestion_parser.add_argument(
    'title', required=True, type=unicode, location='json', default="")


class SuggestionsApi(Resource):
    """
    Pathfinder's Suggestion api to handle GET, PUT, PATCH, DELETE requests.

    App subscription access check and Author access check,
    have been enabled for all the methods.
    """

    method_decorators = [
        app_subscription_required('PATHFINDER'), has_author_access]

    def get(self, suggestion_id):
        """Get the details of External link to edit title and description."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        suggestion = DraftSuggestion.query.filter(
            (DraftSuggestion.id == suggestion_id) &
            (DraftSuggestion.tenant_id == tenant_id)
        ).order_by(DraftSuggestion.order).first()

        return format_data(
            marshal(suggestion, external_link_suggestion_fields)), 200

    def put(self, suggestion_id):
        """Update external link details for the given suggestion."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        put_data = suggestion_parser.parse_args()
        suggestion = DraftSuggestion.query.filter(
            (DraftSuggestion.id == put_data['suggestion_id']) &
            (DraftSuggestion.tenant_id == tenant_id)
        ).order_by(DraftSuggestion.order).first()

        suggestion.is_published = False
        external_link = suggestion.external_link

        external_link_data = dict()
        external_link_data['title'] = put_data['title']
        external_link_data['description'] = external_link.get('description')
        external_link_data['url'] = external_link.get('url')
        external_link_data['icon'] = external_link.get('icon')
        external_link_data['icon_name'] = external_link.get('icon_name')
        external_link_data['site_name'] = external_link.get('site_name')

        suggestion.external_link = external_link_data
        db.session.add(suggestion)
        db.session.commit()

        option = get_pathfinder_suggestions(suggestion.option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200

    def patch(self, suggestion_id):
        """Update order details of an existing Suggestion."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        if 'reorder' in request.json:

            to_group = int(request.json['to_group']) if request.json.get(
                'to_group') else None
            current_suggestion_id = int(request.json['id'])
            target_position = int(request.json['reorder'])

            current_suggestion = DraftSuggestion.query.filter(
                (DraftSuggestion.id == current_suggestion_id) &
                (DraftSuggestion.is_deleted.__eq__(False)) &
                (DraftSuggestion.tenant_id == tenant_id)
            ).first_or_404()

            cur_order = current_suggestion.order
            current_suggestion.is_published = False

            if 'order_data' in request.json:
                """
                'order_data' is stored in option_translations.suggestion_message,
                only when the suggestions' item order has been changed.
                It's a list of ordered data containing
                group_ids, suggestion entity ids.
                """

                # need to change if you change backref.
                option = current_suggestion.option
                option_trans = get_translation(option, author=True)
                if not option_trans:
                    trans = get_default_translation(option)
                    option_trans = DraftOptionTranslations()
                    option_trans.language_id = session['author']['locale']
                    option_trans.text = trans.text
                    option_trans.option_id = option.id
                    option_trans.suggestion_message = trans.suggestion_message
                suggestion_page_details = option_trans.suggestion_message

                suggestion_page = dict()
                for key, value in suggestion_page_details.items():
                    suggestion_page[key] = value
                order_data = list()
                for ele in request.json['order_data']:
                    if isinstance(ele, dict):
                        group_ele = {'groupId': int(ele.get('groupId'))}
                        order_data.append(group_ele)
                    elif isinstance(ele, unicode):
                        order_data.append(int(ele))

                suggestion_page['order_data'] = order_data

                option_trans.suggestion_message = suggestion_page
                for trans in option.translations:
                    trans.suggestion_message[
                        'order_data'] = suggestion_page['order_data']
                option.modified_by = session.get('user_id')

                option.is_published = False

                db.session.add(option_trans)

            if current_suggestion.group:
                from_group = current_suggestion.group.id

                if from_group == to_group:
                    suggestions = [
                        suggestion for suggestion in
                        current_suggestion.group.suggestions
                        if not suggestion.is_deleted]
                    update_order(
                        current_suggestion, suggestions, target_position)
                elif to_group and from_group != to_group:
                    if 'next_suggestion' in request.json:
                        next_suggestion = DraftSuggestion.query.get_or_404(
                            int(request.json['next_suggestion']))
                        current_suggestion.order = next_suggestion.order
                        for suggestion in next_suggestion.group.suggestions:
                            if not suggestion.is_deleted and\
                                    suggestion.order >= next_suggestion.order:
                                suggestion.order += 1
                                suggestion.is_published = False
                                db.session.add(suggestion)

                    else:
                        to_group_suggestions = DraftSuggestion.query.filter(
                            DraftSuggestion.group_id == to_group,
                            DraftSuggestion.is_deleted.__eq__(False)
                        ).all()
                        _orders = [
                            _suggestion.order for _suggestion in
                            to_group_suggestions]
                        current_suggestion.order = max(
                            _orders) if _orders else 1

                    current_suggestion.group_id = int(to_group)

                    from_group_suggestions = DraftSuggestion.query.filter(
                        (DraftSuggestion.group_id == to_group) &
                        (DraftSuggestion.is_deleted.__eq__(False)) &
                        (DraftSuggestion.tenant_id == tenant_id) &
                        (DraftSuggestion.order >= cur_order)).all()

                    for suggestion in from_group_suggestions:
                        suggestion.order -= 1
                        suggestion.is_published = False
                        db.session.add(suggestion)

                    db.session.add(current_suggestion)
                elif not to_group:

                    for suggestion in current_suggestion.group.suggestions:
                        if not suggestion.is_deleted and\
                                suggestion.order > cur_order:
                            suggestion.order -= 1
                            suggestion.is_published = False
                            db.session.add(suggestion)

                    for suggestion in current_suggestion.option.suggestions:
                        if not suggestion.is_deleted and not suggestion.group\
                                and suggestion.order >= target_position:
                            suggestion.order += 1
                            suggestion.is_published = False
                            db.session.add(suggestion)

                    current_suggestion.group_id = None
                    current_suggestion.order = target_position
                    db.session.add(current_suggestion)

            else:
                if to_group:
                    to_suggestion_group = DraftSuggestionGroup.query\
                        .get_or_404(to_group)
                    if 'next_suggestion' in request.json:
                        next_suggestion = DraftSuggestion.query.get_or_404(
                            int(request.json['next_suggestion']))
                        current_suggestion.order = next_suggestion.order
                        for suggestion in next_suggestion.group.suggestions:
                            if not suggestion.is_deleted and\
                                    suggestion.order >= next_suggestion.order:
                                suggestion.order += 1
                                db.session.add(suggestion)
                    else:
                        _orders = [
                            _suggestion.order for _suggestion in
                            to_suggestion_group.suggestions
                            if not _suggestion.is_deleted]
                        current_suggestion.order = max(
                            _orders) if _orders else 1

                    current_suggestion.group = to_suggestion_group
                    db.session.add(current_suggestion)

                    for suggestion in current_suggestion.option.suggestions:
                        if not suggestion.is_deleted and not suggestion.group:
                            if suggestion.order > cur_order:
                                suggestion.order -= 1
                                suggestion.is_published = False
                            db.session.add(suggestion)

                else:
                    suggestions = [
                        suggestion for suggestion in
                        current_suggestion.option.suggestions
                        if not suggestion.is_deleted]
                    update_order(
                        current_suggestion, suggestions, target_position)
            db.session.add(option)
            db.session.commit()

    def delete(self, suggestion_id):
        """Delete the suggestion for given id."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        current_suggestion = DraftSuggestion.query.filter(
            (DraftSuggestion.id == suggestion_id) &
            (DraftSuggestion.tenant_id == tenant_id)
        ).order_by(DraftSuggestion.order).first()

        option_id = current_suggestion.option_id

        if current_suggestion.group:
            suggestions = current_suggestion.group.suggestions
            current_suggestion.group.is_published = False
        else:
            suggestions = [
                suggestion for suggestion in
                current_suggestion.option.suggestions if not suggestion.group]
            current_suggestion.option.is_published = False

        for suggestion in suggestions:
            if suggestion.id == current_suggestion.id:
                suggestion.is_deleted = True
                suggestion.modified_by = session.get('user_id')
                suggestion.is_published = False
                db.session.add(suggestion)
            if suggestion.order > current_suggestion.order:
                suggestion.order = suggestion.order - 1
                suggestion.modified_by = session.get('user_id')
                suggestion.is_published = False
                db.session.add(suggestion)

        db.session.commit()
        option = get_pathfinder_suggestions(option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200


g_parser = reqparse.RequestParser()
g_parser.add_argument('title', required=True, type=unicode,
                      location='json', help='Suggestion Group title required')
g_parser.add_argument('description', required=True, type=unicode,
                      location='json',
                      help='Suggestion Group description required')
g_parser.add_argument('option_id', type=int, location='json')
g_parser.add_argument('suggestion_header_message', type=dict, location='json')
g_parser.add_argument('suggestions', type=list, location='json')
g_parser.add_argument('suggestions_type', type=unicode, location='json')


class SuggestionGroupsApi(Resource):
    """
    Pathfinder's SuggestionGroups api to handle GET, POST, PUT, PATCH, DELETE requests.

    App subscription access check and Author access check,
    have been enabled for all the methods.
    """

    method_decorators = [
        app_subscription_required('PATHFINDER'), has_author_access]

    def get(self, group_id):
        """Get the suggestion group details."""
        suggestion_group = DraftSuggestionGroup.query.get_or_404(group_id)

        group_translation = get_translation(suggestion_group)
        group_translation._id = group_id

        suggestions_list = list()
        for suggestion in suggestion_group.suggestions:
            if is_suggestion_available(suggestion):
                suggestions_list.append(
                    get_suggestion_details(suggestion)
                )

        group_translation._suggestions_list = suggestions_list

        return format_data(marshal(group_translation, group_details)), 200

    def post(self):
        """Create a new SuggestionGroup for an option."""
        post_data = g_parser.parse_args()
        option_id = post_data['option_id']

        tenant_id = getattr(current_app, 'tenant_id', None)
        tenant = Tenant.query.get(tenant_id)

        if session['author']['locale'] != tenant.default_locale_id:
            raise SharedemosException(
                412,
                message=SharedemosException.DEFAULT_TRANSLATION_MISSING
                % tenant.default_locale.name)

        option = DraftOption.query.filter(
            (DraftOption.tenant_id == tenant_id) &
            (DraftOption.id.__eq__(option_id)) &
            (DraftOption.is_deleted.__eq__(False)) &
            (DraftOption.is_enabled.__eq__(True))
        ).first_or_404()

        path_id = option.path_id
        option_trans = get_translation(option, author=True)
        if not option_trans.suggestion_message:
            option_trans.suggestion_message = post_data[
                'suggestion_header_message']
            option.modified_by = session.get('user_id')
            option.is_published = False
            db.session.add(option)

        suggestion_group = DraftSuggestionGroup()
        suggestion_group.tenant_id = tenant_id
        suggestion_group.option_id = option_id
        suggestion_group.path_id = option.path_id

        suggestion_group.created_by = session.get('user_id')
        suggestion_group.modified_by = session.get('user_id')

        group_orders = [
            group.order for group in option.suggestion_groups
            if not group.is_deleted]
        max_group_order = max(group_orders) if group_orders else 0
        suggestion_group.order = max_group_order + 1

        group_translation = DraftSuggestionGroupTranslations()
        group_translation.language_id = session['author']['locale']
        group_translation.title = post_data['title'] or ""
        group_translation.description = post_data['description'] or ""

        suggestion_group.translations.append(group_translation)

        db.session.add(suggestion_group)

        chapters = list()
        if post_data['suggestions_type'] == 'link_chapter' and\
                post_data['suggestions']:
            chapters = Walkthrough.query.filter(
                (Walkthrough.tenant_id == tenant_id) &
                (Walkthrough.slug.in_(post_data['suggestions'])) &
                (Walkthrough.is_deleted.__eq__(False)) &
                (Walkthrough.is_enabled.__eq__(True))
            ).all()

        if post_data['suggestions_type'] == 'link_external' and\
                post_data['suggestions']:
            chapters = post_data['suggestions']

        suggestion_orders = [
            each_suggestion.order for each_suggestion in option.suggestions
            if not each_suggestion.is_deleted and
            not each_suggestion.group_id]
        max_suggestion_order = max(
            suggestion_orders) if suggestion_orders else 0

        if chapters:
            for index, chapter in enumerate(chapters):
                new_order = max_suggestion_order + index + 1
                suggestion = DraftSuggestion()
                suggestion.group = suggestion_group
                suggestion.option_id = option_id
                suggestion.path_id = path_id
                if post_data['suggestions_type'] == 'link_external':
                    suggestion.external_link = chapter
                else:
                    suggestion.walkthrough = chapter
                suggestion.tenant_id = tenant_id
                suggestion.order = new_order
                suggestion.created_by = session.get('user_id')
                suggestion.modified_by = session.get('user_id')
                db.session.add(suggestion)

        if option_trans.suggestion_message and\
                option_trans.suggestion_message.get('order_data'):
            db.session.commit()
            order_data = option_trans.suggestion_message.get('order_data')
            new_elements = []
            for group in option.suggestion_groups:
                if not group.is_deleted and\
                        {u'groupId': group.id} not in order_data:
                    new_elements.append({u'groupId': group.id})

            suggestion_message = dict()
            for key, value in option_trans.suggestion_message.items():
                suggestion_message[key] = value

            suggestion_message['order_data'] = order_data + new_elements
            option_trans.suggestion_message = suggestion_message
            option.is_published = False
            db.session.add(option)

        db.session.commit()

        option = get_pathfinder_suggestions(option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200

    def put(self, group_id):
        """Update translations, suggestions/walkthroughs for a SuggestionGroup."""
        put_data = g_parser.parse_args()
        option_id = put_data['option_id']

        tenant_id = getattr(current_app, 'tenant_id', None)

        option = DraftOption.query.filter(
            (DraftOption.tenant_id == tenant_id) &
            (DraftOption.id.__eq__(option_id)) &
            (DraftOption.is_deleted.__eq__(False)) &
            (DraftOption.is_enabled.__eq__(True))
        ).first_or_404()

        path_id = option.path_id

        suggestion_group = DraftSuggestionGroup.query.get_or_404(group_id)

        group_translation = get_translation(suggestion_group, author=True)
        if not group_translation:
            group_translation = DraftSuggestionGroupTranslations()
            group_translation.language_id = session['author']['locale']
            group_translation.suggestion_group_id = suggestion_group.id

        group_translation.title = put_data['title']
        group_translation.description = put_data['description']

        suggestion_group.translations.append(group_translation)
        suggestion_group.is_published = False

        db.session.add_all([suggestion_group, group_translation])
        if put_data['suggestions_type'] == 'link_chapter':
            if put_data['suggestions']:
                chapters = Walkthrough.query.filter(
                    (Walkthrough.tenant_id == tenant_id) &
                    (Walkthrough.slug.in_(put_data['suggestions'])) &
                    (Walkthrough.is_deleted.__eq__(False)) &
                    (Walkthrough.is_enabled.__eq__(True))
                ).all()
            else:
                chapters = []

            group_suggestions = DraftSuggestion.query.filter(
                (DraftSuggestion.tenant_id == tenant_id) &
                (DraftSuggestion.walkthrough_id.isnot(None)) &
                (DraftSuggestion.group_id.__eq__(group_id)) &
                (DraftSuggestion.is_deleted.__eq__(False))
            ).order_by(DraftSuggestion.order).all()

            _suggestions = [
                suggestion.walkthrough.slug for suggestion in
                group_suggestions]

            update_start_order = None
            for suggestion in group_suggestions:
                if suggestion.walkthrough.slug not in put_data['suggestions']:
                    if not update_start_order:
                        update_start_order = suggestion.order
                        suggestion.group.is_published = False
                    suggestion.is_deleted = True
                    suggestion.modified_by = session.get('user_id')
                    db.session.add(suggestion)

            # update the suggestion order
            if update_start_order:
                for _suggestion in group_suggestions:
                    if not _suggestion.is_deleted and\
                            _suggestion.order > update_start_order:
                        _suggestion.order -= 1
                        _suggestion.modified_by = session.get('user_id')
                        db.session.add(_suggestion)

            suggestion_orders = [
                each_suggestion.order for each_suggestion in
                suggestion_group.suggestions if not each_suggestion.is_deleted]
            _order = max(suggestion_orders) if suggestion_orders else 0

            new_order = _order + 1

            for chapter in chapters:
                if chapter.slug not in _suggestions:
                    suggestion = DraftSuggestion()
                    suggestion.group = suggestion_group
                    suggestion.group.is_published = False
                    suggestion.option_id = option_id
                    suggestion.path_id = path_id
                    suggestion.walkthrough = chapter
                    suggestion.tenant_id = tenant_id
                    suggestion.order = new_order
                    new_order += 1
                    db.session.add(suggestion)

        else:
            chapters = put_data['suggestions']
            suggestion_orders = [
                each_suggestion.order for each_suggestion in
                suggestion_group.suggestions if not each_suggestion.is_deleted]
            _order = max(suggestion_orders) if suggestion_orders else 0

            if chapters:
                for index, chapter in enumerate(chapters):
                    new_order = _order + index + 1
                    suggestion = DraftSuggestion()
                    suggestion.group = suggestion_group
                    suggestion.path_id = path_id
                    suggestion.option_id = option_id
                    suggestion.external_link = chapter
                    suggestion.tenant_id = tenant_id
                    suggestion.order = new_order
                    suggestion.created_by = session.get('user_id')
                    suggestion.modified_by = session.get('user_id')
                    suggestion.group.is_published = False
                    db.session.add(suggestion)

        db.session.commit()

        option = get_pathfinder_suggestions(option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200

    def patch(self, group_id):
        """Update order details of the SuggestionGroup entities."""
        suggestion_group = DraftSuggestionGroup.query.get_or_404(group_id)
        if 'reorder' in request.json:
            new_order = int(request.json.get('reorder'))

            groups = [
                group for group in suggestion_group.option.suggestion_groups
                if not group.is_deleted]

            update_order(suggestion_group, groups, new_order)

            if 'order_data' in request.json:
                option = suggestion_group.option
                option_trans = get_translation(option)
                suggestion_page_details = option_trans.suggestion_message
                suggestion_page = dict()
                for key, value in suggestion_page_details.items():
                    suggestion_page[key] = value

                order_data = list()
                for ele in request.json['order_data']:
                    if isinstance(ele, dict):
                        group_ele = {'groupId': int(ele.get('groupId'))}
                        order_data.append(group_ele)
                    elif isinstance(ele, unicode):
                        order_data.append(int(ele))

                suggestion_page['order_data'] = order_data

                option_trans.suggestion_message = suggestion_page
                for each in option.translations:
                    each.suggestion_message[
                        'order_data'] = suggestion_page['order_data']
                option.modified_by = session.get('user_id')

                option.is_published = False

                db.session.add(option)

            db.session.commit()

        option = get_pathfinder_suggestions(
            suggestion_group.option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200

    def delete(self, group_id):
        """Set 'deleted' flag for a SuggestionGroup and its suggestion entities."""
        tenant_id = getattr(current_app, 'tenant_id', None)
        suggestion_group = DraftSuggestionGroup.query.get_or_404(group_id)

        option_id = suggestion_group.option_id

        suggestions = DraftSuggestion.query.filter(
            (DraftSuggestion.group_id == group_id) &
            (DraftSuggestion.tenant_id == tenant_id)
        ).order_by(DraftSuggestion.order).all()

        suggestion_group.is_deleted = True
        suggestion_group.is_published = False
        suggestion_group.modified_by = session.get('user_id')
        for suggestion in suggestions:
            suggestion.is_deleted = True
            suggestion.is_published = False
            suggestion.modified_by = session.get('user_id')
            db.session.add(suggestion)

        # update group order
        for group in suggestion_group.option.suggestion_groups:
            if not group.is_deleted and group.order > suggestion_group.order:
                group.order -= 1
                group.modified_by = session.get('user_id')
                group.is_published = False
                db.session.add(group)

        db.session.add(suggestion_group)
        db.session.commit()
        option = get_pathfinder_suggestions(option_id, is_author())
        return format_data(marshal(option, suggestion_fields)), 200
