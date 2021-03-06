"""empty message

Revision ID: 9842b9610e4
Revises: a9b0dc54fe1
Create Date: 2015-09-16 21:35:04.799105

"""

# revision identifiers, used by Alembic.
revision = '9842b9610e4'
down_revision = 'a9b0dc54fe1'
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
    op.add_column('section_video', sa.Column('poster_image', sa.Unicode(), nullable=True))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('section_video', 'poster_image')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
