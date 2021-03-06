"""empty message

Revision ID: 3412713627f5
Revises: 1b51096b0819
Create Date: 2015-12-11 21:20:27.465564

"""

# revision identifiers, used by Alembic.
revision = '3412713627f5'
down_revision = '1b51096b0819'
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
    op.add_column('redirect_url', sa.Column('created_at', sa.DateTime(), nullable=False, server_default=current_timestamp()))
    op.add_column('redirect_url', sa.Column('modified_at', sa.DateTime(), nullable=False, server_default=current_timestamp()))
    op.create_table('slug_revisions',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('old_slug', sa.Unicode(), nullable=False),
                    sa.Column('new_slug', sa.Unicode(), nullable=False),
                    sa.Column('entity_type', sa.Unicode(), nullable=False),
                    sa.Column('entity_id', sa.Integer(), nullable=False),
                    sa.Column('tenant_id', sa.Integer(), nullable=False),
                    sa.Column('created_at', sa.DateTime(), nullable=False),
                    sa.Column('modified_at', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('old_slug', 'new_slug', 'entity_type', 'tenant_id',
                                        name='uq_slug_revisions_old_slug_new_slug_entity_type_tenant_id')
                    )
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_table('slug_revisions')
    op.drop_column('redirect_url', 'modified_at')
    op.drop_column('redirect_url', 'created_at')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
