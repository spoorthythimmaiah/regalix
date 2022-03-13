"""empty message

Revision ID: 42f8fe6336e6
Revises: 42a04e03271, 1e22f1617669
Create Date: 2017-02-28 07:46:01.985498

"""

# revision identifiers, used by Alembic.
revision = '42f8fe6336e6'
down_revision = ('42a04e03271', '1e22f1617669')
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

