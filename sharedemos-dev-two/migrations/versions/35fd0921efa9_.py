"""empty message

Revision ID: 35fd0921efa9
Revises: 3412713627f5, 47f643067f
Create Date: 2015-12-18 23:22:45.887737

"""

# revision identifiers, used by Alembic.
revision = '35fd0921efa9'
down_revision = ('3412713627f5', '47f643067f')
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

