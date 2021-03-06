"""empty message

Revision ID: 33067db73ccf
Revises: 241d44cf9f05
Create Date: 2019-04-22 07:34:39.497517

"""

# revision identifiers, used by Alembic.
revision = '33067db73ccf'
down_revision = '241d44cf9f05'
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
    op.create_table('bulletin_board',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('section_id', sa.Integer(), nullable=True),
    sa.Column('is_enabled', sa.Boolean(), nullable=False),
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bulletin_board_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('bulletin_board_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=False),
    sa.Column('description', sa.Unicode(), nullable=True),
    sa.Column('links', postgresql.JSON(), nullable=False),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['bulletin_board_id'], ['bulletin_board.id'], ),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('bulletin_user_group_association',
    sa.Column('bulletin_id', sa.Integer(), nullable=False),
    sa.Column('user_groups_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['bulletin_id'], ['bulletin_board.id'], ),
    sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
    sa.PrimaryKeyConstraint('bulletin_id', 'user_groups_id')
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('bulletin_user_group_association')
    op.drop_table('bulletin_board_translations')
    op.drop_table('bulletin_board')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass

