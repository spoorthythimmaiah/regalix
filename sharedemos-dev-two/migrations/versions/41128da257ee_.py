"""empty message

Revision ID: 41128da257ee
Revises: 46965b486f53
Create Date: 2015-11-24 19:44:01.976720

"""

# revision identifiers, used by Alembic.
revision = '41128da257ee'
down_revision = '46965b486f53'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.add_column('tenant', sa.Column('description', sa.Unicode(), nullable=True))
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column('tenant', 'description')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
