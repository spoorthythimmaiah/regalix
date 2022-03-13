"""empty message

Revision ID: dacba323283
Revises: 50fb331bb6a1, 9f110b2399a
Create Date: 2016-04-06 10:31:05.522543

"""

# revision identifiers, used by Alembic.
revision = 'dacba323283'
down_revision = ('50fb331bb6a1', '9f110b2399a')
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

