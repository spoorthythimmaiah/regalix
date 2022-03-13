from behave import given, when, then


@given(u'user enables the export to pdf feature')
def enable_export_pdf(context):
    data = {'can_download': True}
    context.tenant_client.post('/dashboard/library/', data=data, follow_redirects=True)


@given(u'user gets the section details of "{section_name}"')
def get_section_details(context, section_name):
    slug = section_name.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/section/' + slug + '?author=1')


@then(u'export to pdf link is not available')
def no_export_pdf(context):
    assert '"can_download": false' in context.page.data


@then(u'export to pdf link is available')
def export_pdf_available(context):
    assert '"can_download": true' in context.page.data


@given(u'user clicks on the export to pdf link under "{subsection}"')
def click_export_link(context, subsection):
    pdf_subsection = subsection.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/export-to-pdf/' + pdf_subsection)


@then(u'"{status}" as status and "{content_type}" as content_type should be in the response')
def check_download(context, status, content_type):
    assert status in context.page.status
    assert content_type in context.page.content_type
