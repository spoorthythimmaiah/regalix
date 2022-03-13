"""empty message

Revision ID: 4da5044720e1
Revises: 13270820414c
Create Date: 2017-03-20 05:18:16.000343

"""

# revision identifiers, used by Alembic.
revision = '4da5044720e1'
down_revision = '13270820414c'
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
    op.create_table('path_finder_activity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('report_user_id', sa.Integer(), nullable=False),
    sa.Column('path_id', sa.Integer(), nullable=False),
    sa.Column('option_id', sa.Integer(), nullable=True),
    sa.Column('event_type', sa.Unicode(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['option_id'], ['options.id'], ),
    sa.ForeignKeyConstraint(['path_id'], ['paths.id'], ),
    sa.ForeignKeyConstraint(['report_user_id'], ['user_activity.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('path_finder_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass

def downgrade_reports():
    pass
