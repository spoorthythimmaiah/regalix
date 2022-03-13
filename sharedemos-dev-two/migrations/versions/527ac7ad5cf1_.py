"""empty message

Revision ID: 527ac7ad5cf1
Revises: 4deef22b2f82, 36a79b9ed934
Create Date: 2020-02-18 12:38:17.270211

"""

# revision identifiers, used by Alembic.
revision = '527ac7ad5cf1'
down_revision = ('4deef22b2f82', '36a79b9ed934')
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
