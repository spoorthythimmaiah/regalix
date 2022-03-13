"""empty message

Revision ID: 38236fc333db
Revises: 384807cc7dd5, a16a420531f
Create Date: 2016-01-25 20:51:47.191681

"""

# revision identifiers, used by Alembic.
revision = '38236fc333db'
down_revision = ('384807cc7dd5', 'a16a420531f')
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

