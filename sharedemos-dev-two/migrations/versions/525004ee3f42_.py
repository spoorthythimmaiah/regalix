"""empty message

Revision ID: 525004ee3f42
Revises: b2f34e535a0, 2e1d1ca5a9ac
Create Date: 2017-07-17 11:00:49.362459

"""

# revision identifiers, used by Alembic.
revision = '525004ee3f42'
down_revision = ('b2f34e535a0', '2e1d1ca5a9ac')
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

