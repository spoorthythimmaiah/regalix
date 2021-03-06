"""empty message

Revision ID: 520072eed16
Revises: 6c6be8cb839
Create Date: 2015-11-06 23:26:33.284134

"""

# revision identifiers, used by Alembic.
revision = '520072eed16'
down_revision = '6c6be8cb839'
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
    op.add_column('section', sa.Column('is_private', sa.Boolean(), nullable=False, server_default="false"))
    op.add_column('tenant', sa.Column('is_private', sa.Boolean(), nullable=False, server_default="false"))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tenant', 'is_private')
    op.drop_column('section', 'is_private')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
