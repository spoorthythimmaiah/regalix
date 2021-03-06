"""empty message

Revision ID: 4500cd556e83
Revises: 1ec446c565cf
Create Date: 2016-10-04 11:01:47.381205

"""

# revision identifiers, used by Alembic.
revision = '4500cd556e83'
down_revision = '1ec446c565cf'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('mail_digest', sa.Column('show_viewers', sa.Boolean(), server_default='false', nullable=False))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('mail_digest', 'show_viewers')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
