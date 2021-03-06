"""empty message

Revision ID: 4f4ceb53916e
Revises: ae7c63cd8b5
Create Date: 2016-12-06 14:15:46.138131

"""

# revision identifiers, used by Alembic.
revision = '4f4ceb53916e'
down_revision = 'ae7c63cd8b5'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('tenant_index',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('algolia_index', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('algolia_index'),
    sa.UniqueConstraint('algolia_index', name='uq_tenant_index_algolia_index'),
    sa.UniqueConstraint('tenant_id'),
    sa.UniqueConstraint('tenant_id', name='uq_tenant_index_tenant_id')
    )
    op.create_table('search_index',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False, server_default='0'),
    sa.Column('last_searched_at', sa.DateTime(), nullable=True),
    sa.Column('from_date', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('tenant_index_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['tenant_index_id'], ['tenant_index.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('search_activity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('word', sa.Unicode(), nullable=False),
    sa.Column('count', sa.Integer(), nullable=False, server_default='0'),
    sa.Column('avg_hit_count', sa.Integer(), nullable=True, server_default='0'),
    sa.Column('avg_hit_count_without_typo', sa.Integer(), nullable=True, server_default='0'),
    sa.Column('from_date', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('search_index_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['search_index_id'], ['search_index.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'tenant', sa.Column('is_algolia_analytics_enabled', sa.Boolean(), nullable=False, server_default='false'))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column(u'tenant', 'is_algolia_analytics_enabled')
    op.drop_table('search_activity')
    op.drop_table('search_index')
    op.drop_table('tenant_index')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
