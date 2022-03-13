"""empty message

Revision ID: 4f7b187be3a9
Revises: 233158ceab66
Create Date: 2018-09-04 12:16:24.428019

"""

# revision identifiers, used by Alembic.
revision = '4f7b187be3a9'
down_revision = '233158ceab66'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy import func, false
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_reports():
    pass


def downgrade_reports():
    pass


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tenant_footer',
                    sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default=false()),
                    sa.Column('created_at', sa.DateTime(), nullable=False, server_default=func.now()),
                    sa.Column('modified_at', sa.DateTime(), nullable=False, server_default=func.now()),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('tenant_footer_translations',
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('footer_id', sa.Integer(), nullable=False),
                    sa.Column('links', postgresql.JSON(none_as_null=True), nullable=True),
                    sa.Column('text', sa.Unicode(), nullable=True),
                    sa.Column('language_id', sa.Unicode(), nullable=False),
                    sa.ForeignKeyConstraint(['footer_id'], ['tenant_footer.id'], ),
                    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('tenant_header',
                    sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default=false()),
                    sa.Column('created_at', sa.DateTime(), nullable=False, server_default=func.now()),
                    sa.Column('modified_at', sa.DateTime(), nullable=False, server_default=func.now()),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_by', sa.Integer(), nullable=True),
                    sa.Column('modified_by', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('tenant_header_translations',
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('header_id', sa.Integer(), nullable=False),
                    sa.Column('title', sa.Unicode(), nullable=True),
                    sa.Column('language_id', sa.Unicode(), nullable=False),
                    sa.ForeignKeyConstraint(['header_id'], ['tenant_header.id'], ),
                    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )

    conn = op.get_bind()

    query = conn.execute(
        """
        select id, default_locale_id, footer_text
        from tenant
        where footer_text!= ''
        and
        footer_text is not null
        """)

    tenants = query.fetchall()
    tenant_details = {t.id: {'locale': t.default_locale_id, 'text': t.footer_text} for t in tenants}

    for tenant in tenants:
        tenant_footer = conn.execute(
            """
            insert into tenant_footer (tenant_id)
            values('%s') returning *;
            """
            % (tenant.id))
        footer = tenant_footer.first()

        conn.execute(
            """insert into tenant_footer_translations (footer_id,language_id, text, created_at, modified_at)
               values('%s','%s','%s','%s','%s')
            """
            % (footer.id, tenant_details[footer.tenant_id]['locale'], tenant_details[footer.tenant_id]['text'],
               footer.created_at, footer.modified_at))

    op.drop_column(u'tenant', 'footer_text')
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column(u'tenant', sa.Column('footer_text', sa.VARCHAR(), autoincrement=False, nullable=True))

    bind = op.get_bind()
    query = bind.execute("""select tf.tenant_id, tft.text
            from tenant_footer_translations tft
            join tenant_footer tf on tft.footer_id=tf.id
            join tenant t on tf.tenant_id=t.id
            where tft.language_id = t.default_locale_id
            """)

    footer_texts = query.fetchall()

    for footer_text in footer_texts:
        bind.execute(
            """update tenant
               set footer_text=%(t_text)s
               where id=%(t_id)s
            """,
            t_text=footer_text.text,
            t_id=footer_text.tenant_id)

    op.drop_table('tenant_header_translations')
    op.drop_table('tenant_header')
    op.drop_table('tenant_footer_translations')
    op.drop_table('tenant_footer')
    ### end Alembic commands ###
