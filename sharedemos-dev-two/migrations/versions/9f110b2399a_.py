"""empty message

Revision ID: 9f110b2399a
Revises: 3d092264319e, 2ee73a144434
Create Date: 2016-03-31 11:57:45.833488

"""

# revision identifiers, used by Alembic.
revision = '9f110b2399a'
down_revision = ('3d092264319e', '2ee73a144434')
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    pass


def downgrade_():
    pass


def upgrade_reports():
    pass


def downgrade_reports():
    pass

