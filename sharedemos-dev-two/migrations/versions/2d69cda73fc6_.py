"""empty message

Revision ID: 2d69cda73fc6
Revises: c3e27c3e3e6
Create Date: 2017-12-26 09:21:37.924301

"""

# revision identifiers, used by Alembic.
revision = '2d69cda73fc6'
down_revision = '163280dc744e'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql.functions import current_timestamp


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'tenant_flags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('allow_offline', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('box_integration_enabled', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('can_download', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('can_embed', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('cdn_enable', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('chapter_autoflow', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('is_algolia_analytics_enabled', sa.Boolean(),
                  nullable=False, server_default="false"),
        sa.Column('is_private', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('show_notes', sa.Boolean(), nullable=False,
                  server_default="false"),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )

    conn = op.get_bind()
    query = conn.execute("select * from tenant")
    tenants = query.fetchall()
    for tenant in tenants:
        insert_query = """
            insert into tenant_flags(id, tenant_id, allow_offline,
            box_integration_enabled, can_download, can_embed, cdn_enable,
            chapter_autoflow, is_algolia_analytics_enabled, is_private,
            show_notes, created_at, modified_at) values ({0}, {1}, {2}, {3},
            {4}, {5}, {6}, {7}, {8}, {9}, {10}, {11}, {12})""".format(
            tenant.id, tenant.id,
            tenant.allow_offline,
            tenant.box_integration_enabled,
            tenant.can_download,
            tenant.can_embed,
            tenant.cdn_enable,
            tenant.chapter_autoflow,
            tenant.is_algolia_analytics_enabled,
            tenant.is_private,
            False,
            current_timestamp(),
            current_timestamp())
        op.execute(insert_query)

    op.drop_column(u'tenant', 'allow_offline')
    op.drop_column(u'tenant', 'box_integration_enabled')
    op.drop_column(u'tenant', 'can_download')
    op.drop_column(u'tenant', 'can_embed')
    op.drop_column(u'tenant', 'cdn_enable')
    op.drop_column(u'tenant', 'chapter_autoflow')
    op.drop_column(u'tenant', 'is_algolia_analytics_enabled')
    op.drop_column(u'tenant', 'is_private')
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.add_column(
        u'tenant',
        sa.Column('allow_offline',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('box_integration_enabled',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('can_download',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('can_embed',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('cdn_enable',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('chapter_autoflow',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('is_algolia_analytics_enabled',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    op.add_column(
        u'tenant',
        sa.Column('is_private',
                  sa.BOOLEAN(),
                  server_default=sa.text(u'false'),
                  autoincrement=False,
                  nullable=False
                  )
    )
    conn = op.get_bind()
    query = conn.execute("select * from tenant_flags")
    tenant_flags = query.fetchall()
    for tf in tenant_flags:
        update_query = """
            update tenant set allow_offline={0}, box_integration_enabled={1},
            can_download={2}, can_embed={3}, cdn_enable={4},
            chapter_autoflow={5}, is_algolia_analytics_enabled={6},
            is_private={7} where id={8}
        """.format(tf.allow_offline,
                   tf.box_integration_enabled,
                   tf.can_download, tf.can_embed,
                   tf.cdn_enable, tf.chapter_autoflow,
                   tf.is_algolia_analytics_enabled,
                   tf.is_private, tf.tenant_id)
        op.execute(update_query)
    op.drop_table('tenant_flags')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass