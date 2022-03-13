from behave import given


@given(u'User gets product tree with "{slug}" and "{section}" of "{domain}" page')
def getting_product_tree_with_section(context, domain, slug, section):
    slug = slug.lower().replace(" ", "-")
    section = section.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/product-tree/' + slug + "/" + section)


@given(u'User gets product tree with "{slug}" of "{domain}" page')
def getting_product_tree(context, domain, slug):
    slug = slug.lower().replace(" ", "-")
    context.page = context.tenant_client.get('/api/product-tree/' + slug)
