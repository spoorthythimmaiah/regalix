"""empty message

Revision ID: 25a95bf846db
Revises: 323262f0c695
Create Date: 2019-08-02 08:49:36.842316

"""

# revision identifiers, used by Alembic.
revision = '25a95bf846db'
down_revision = '323262f0c695'
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
    op.create_table(
        'path_finder_suggestion_mail_activity',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('email', sa.Unicode(), nullable=False),
        sa.Column('suggestion_ids', postgresql.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('report_user_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('path_id', sa.Integer(), nullable=False),
        sa.Column('option_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['option_id'], ['options.id'], ),
        sa.ForeignKeyConstraint(['path_id'], ['paths.id'], ),
        sa.ForeignKeyConstraint(['report_user_id'], ['user_activity.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('path_finder_suggestion_mail_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
