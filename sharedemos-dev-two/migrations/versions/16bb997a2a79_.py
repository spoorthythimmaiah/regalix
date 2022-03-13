"""empty message

Revision ID: 16bb997a2a79
Revises: 466a96f1881b
Create Date: 2017-04-24 12:28:09.890840

"""

# revision identifiers, used by Alembic.
revision = '16bb997a2a79'
down_revision = '466a96f1881b'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.add_column('tenants_applications', sa.Column('app_data', postgresql.JSON(), nullable=True))
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column('tenants_applications', 'app_data')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass