"""empty message

Revision ID: 5aa8a2a385fd
Revises: 2b3e18f648c7
Create Date: 2014-12-10 09:26:27.130852

"""

# revision identifiers, used by Alembic.
revision = '5aa8a2a385fd'
down_revision = '2b3e18f648c7'

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('completion_activity', sa.Column('section_id', sa.Integer(), nullable=True))
    op.add_column('completion_activity', sa.Column('walkthrough_id', sa.Integer(), nullable=True))
    op.drop_column('completion_activity', 'entity_id')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('completion_activity', sa.Column('entity_id', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_column('completion_activity', 'walkthrough_id')
    op.drop_column('completion_activity', 'section_id')
    ### end Alembic commands ###


def downgrade_reports():
    pass
