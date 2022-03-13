"""empty message

Revision ID: 241d44cf9f05
Revises: 10ac5264ca9d
Create Date: 2019-04-03 14:56:10.746577

"""

# revision identifiers, used by Alembic.
revision = '241d44cf9f05'
down_revision = '2ad3e5a8eab3'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa

from sqlalchemy.sql import table, column


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'walkthrough_user_groups_association',
        sa.Column('walkthrough_id', sa.Integer(), nullable=False),
        sa.Column('user_groups_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
        sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
        sa.PrimaryKeyConstraint('walkthrough_id', 'user_groups_id')
    )
    op.create_table(
        'playlist_user_groups_association',
        sa.Column('playlist_id', sa.Integer(), nullable=False),
        sa.Column('user_groups_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['playlist_id'], ['playlist.id'], ),
        sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
        sa.PrimaryKeyConstraint('playlist_id', 'user_groups_id')
    )
    op.create_table(
        'section_user_groups_association',
        sa.Column('section_id', sa.Integer(), nullable=False),
        sa.Column('user_groups_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
        sa.PrimaryKeyConstraint('section_id', 'user_groups_id')
    )
    op.add_column('user_groups', sa.Column('is_default', sa.Boolean(), nullable=True))
    is_default = table('user_groups', column('is_default'))
    op.execute(is_default.update().values(is_default=False))
    op.alter_column('user_groups', 'is_default', nullable=False, server_default=u'false')
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user_groups', 'is_default')
    op.drop_table('section_user_groups_association')
    op.drop_table('playlist_user_groups_association')
    op.drop_table('walkthrough_user_groups_association')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
