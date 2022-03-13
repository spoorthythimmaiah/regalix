from behave import given, then
from ..libs.utils import construct_list_of_tuples
import json
from datetime import datetime, timedelta
from sharedemos.models.user import User
from sharedemos.models.section import Section


def send_data(context, start_date, end_date):
    from_date = str(start_date.month) + "/" + str(start_date.day) + "/" + str(start_date.year)
    till_date = str(end_date.month) + "/" + str(end_date.day) + "/" + str(end_date.year)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?request_from=filter&fromDate=' + from_date + '&untillDate=' + till_date + '&searchText=')


def check_result(context, start_date, end_date):
    result = json.loads(context.page.data)['activity_details']
    if result != []:
        for item in result:
            date_object = datetime.strptime(item['created'], '%B %d, %Y %I:%M:%S %p')
            if start_date.date() <= date_object.date() <= end_date.date():
                assert True
            else:
                assert False, 'Incorrect result'


@given(u'user clicks on the activity link')
def load_activity_feed(context):
    context.page = context.tenant_client.get('/dashboard/activity')


@then(u'"{values}" should be in the response "{n}"')
def check_output(context, values, n):
    tuple_list = construct_list_of_tuples(values)
    output = json.loads(context.page.data)['activity_details'][int(n)]
    result = list(output.items())
    for item in tuple_list:
        assert item in result


@given(u'user lands in activity feed page')
def land_in_activity_feed(context):
    context.page = context.tenant_client.get('/api/activity-feed/')


@given(u'user searches the activity feed for the "{search_type}" "{search_text}"')
def search_user_name(context, search_type, search_text):
    context.page = context.tenant_client.get('/api/activity-feed/?request_from=filter&fromDate=&untillDate=&searchText=' + search_text)


@then(u'search results for the "{search_type}" "{search_text}" are displayed')
def search_user_result(context, search_type, search_text):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert search_text in item[search_type]


@then(u'nothing should be displayed')
def display_nothing(context):
    result = json.loads(context.page.data)['activity_details']
    if result == []:
        assert True
    else:
        assert False, 'Some Results found'


@given(u'user filters the activity feed from previous day to present day')
def filter_previous_to_present(context):
    date_from = datetime.now() - timedelta(days=1)
    date_till = datetime.now()
    send_data(context, date_from, date_till)


@then(u'date filter result for previous day to present day is displayed')
def result_previous_to_present(context):
    date_from = datetime.now() - timedelta(days=1)
    date_till = datetime.today()
    check_result(context, date_from, date_till)


@given(u'user filters the activity feed from previous day to next day')
def filter_previous_to_next(context):
    date_from = datetime.now() - timedelta(days=1)
    date_till = datetime.now() + timedelta(days=1)
    send_data(context, date_from, date_till)


@then(u'date filter result for previous day to next day is displayed')
def result_previous_to_next(context):
    date_from = datetime.now() - timedelta(days=1)
    date_till = datetime.now() + timedelta(days=1)
    check_result(context, date_from, date_till)


@given(u'user filters the activity from present day to next day')
def filter_present_to_next(context):
    date_from = datetime.now()
    date_till = datetime.now() + timedelta(days=1)
    send_data(context, date_from, date_till)


@then(u'date filter result for present to next day is displayed')
def result_present_to_next(context):
    date_from = datetime.now()
    date_till = datetime.now() + timedelta(days=1)
    check_result(context, date_from, date_till)


@given(u'user filters the activity feed for author with firstname as "{firstname}" and lastname as "{lastname}"')
def filter_author(context, firstname, lastname):
    user = User.query.filter((User.first_name == firstname) & (User.last_name == lastname)).first()
    user_id = str(user.id)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?authors=' + user_id + '&request_from=filter&fromDate=&untillDate=&searchText=')


@then(u'author filter result related to author "{author_name}" is displayed')
def result_author_filter(context, author_name):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert author_name in item['user_name']


@given(u'user filters the activity feed for authors A and B with author A\'s firstname as "{a_firstname}" and lastname as "{a_lastname}" and author B\'s firstname as "{b_firstname}" and lastname as "{b_lastname}"')
def filter_authors(context, a_firstname, a_lastname, b_firstname, b_lastname):
    user_a = User.query.filter((User.first_name == a_firstname) & (User.last_name == a_lastname)).first()
    user_b = User.query.filter((User.first_name == b_firstname) & (User.last_name == b_lastname)).first()
    user_aid = str(user_a.id)
    user_bid = str(user_b.id)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?authors=' + user_aid + '&authors=' + user_bid + '&request_from=filter&fromDate=&untillDate=&searchText=')


@then(u'authors filter results related to authors A "{author_a}" and B "{author_b}" are displayed')
def result_authors_filter(context, author_a, author_b):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert author_a in item['user_name'] or author_b in item['user_name']


@given(u'user filters the activity feed for category "{category_name}"')
def filter_category(context, category_name):
    name = category_name.lower().replace(" ", "-")
    section = Section.query.filter(Section.slug == name).first()
    section_id = str(section.id)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?categories=' + section_id + '&request_from=filter&fromDate=&untillDate=&searchText=')


@then(u'category filter result for the category "{category_name}" is displayed')
def result_category_filter(context, category_name):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert category_name in item['product_name']


@given(u'user filters the activity feed for both the categories "{category_a}" and "{category_b}"')
def filter_categories(context, category_a, category_b):
    name_a = category_a.lower().replace(" ", "-")
    name_b = category_b.lower().replace(" ", "-")
    section_aid = str(Section.query.filter(Section.slug == name_a).first().id)
    section_bid = str(Section.query.filter(Section.slug == name_b).first().id)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?categories=' + section_aid + '&categories=' + section_bid +
        '&request_from=filter&fromDate=&untillDate=&searchText=')


@then(u'category filter result for the categories "{category_a}" and "{category_b}" are displayed')
def result_categories_filter(context, category_a, category_b):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert category_a in item['product_name'] or category_b in item['product_name']


@given(u'user filters the activity feed based on author with firstname as "{firstname}" and lastname as "{lastname}" and category "{category_name}"')
def filter_author_category(context, firstname, lastname, category_name):
    user_id = str(User.query.filter((User.first_name == firstname) & (User.last_name == lastname)).first().id)
    section_name = category_name.lower().replace(" ", "-")
    section_id = str(Section.query.filter(Section.slug == section_name).first().id)
    context.page = context.tenant_client.get(
        '/api/activity-feed/?authors=' + user_id + '&categories=' + section_id +
        '&request_from=filter&fromDate=&untillDate=&searchText=')


@then(u'filter results for the author "{author_name}" and category "{section_name}" are displayed')
def result_author_category(context, author_name, section_name):
    result = json.loads(context.page.data)['activity_details']
    for item in result:
        assert author_name in item['user_name'] and section_name in item['product_name']


@given(u'User wants to delete a subsection "{section_name}" related to "{domain}" domain')
def delete_subsection(context, section_name, domain):
    slug = section_name.lower().replace(" ", "-")
    context.page = context.tenant_client.delete('/api/section/' + slug + '?author=1')
