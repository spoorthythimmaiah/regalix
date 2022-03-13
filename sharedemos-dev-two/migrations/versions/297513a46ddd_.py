"""empty message

Revision ID: 297513a46ddd
Revises: 1de0993ab050
Create Date: 2016-07-27 12:36:33.666259

"""

# revision identifiers, used by Alembic.
revision = '297513a46ddd'
down_revision = '1de0993ab050'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('resource', sa.Column('frames', postgresql.JSON(), nullable=True))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('resource', 'frames')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
