"""empty message

Revision ID: 334a6183b026
Revises: aac1633b09a
Create Date: 2016-05-26 06:53:28.519981

"""

# revision identifiers, used by Alembic.
revision = '334a6183b026'
down_revision = 'aac1633b09a'
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
    op.add_column('tenant_theme', sa.Column('text_color', sa.Unicode(), server_default='#ffffff', nullable=False))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('tenant_theme', 'text_color')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass

