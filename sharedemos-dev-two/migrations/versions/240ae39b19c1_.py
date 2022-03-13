"""empty message

Revision ID: 240ae39b19c1
Revises: 36ac34f8cc9a, 18933d866046
Create Date: 2019-07-01 13:19:28.495069

"""

# revision identifiers, used by Alembic.
revision = '240ae39b19c1'
down_revision = ('36ac34f8cc9a', '18933d866046')
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

