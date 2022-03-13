"""empty message

Revision ID: 2ad718ffc50c
Revises: 1b5fc131e611, 4530aa42bc65
Create Date: 2020-02-24 10:44:26.091376

"""

# revision identifiers, used by Alembic.
revision = '2ad718ffc50c'
down_revision = ('1b5fc131e611', '4530aa42bc65')
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

