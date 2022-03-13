"""empty message

Revision ID: 5940fc0a5201
Revises: 3d99292fa240, 311b5149e5ed
Create Date: 2020-01-17 09:16:15.969763

"""

# revision identifiers, used by Alembic.
revision = '5940fc0a5201'
down_revision = ('3d99292fa240', '311b5149e5ed')
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

