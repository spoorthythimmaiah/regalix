"""empty message

Revision ID: 1b5fc131e611
Revises: 527ac7ad5cf1
Create Date: 2020-02-17 11:59:32.405857

"""

# revision identifiers, used by Alembic.
revision = '1b5fc131e611'
down_revision = '527ac7ad5cf1'
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
    op.create_table(
        'pitch_activity',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('session_id', sa.Unicode(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['pitch_id'], ['pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_recording_activity',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('recording_id', sa.Integer(), nullable=False),
        sa.Column('session_id', sa.Unicode(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['recording_id'], ['pitch_recording.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_section_activity',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=False),
        sa.Column('session_id', sa.Unicode(), nullable=True),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['section_id'], ['pitch_section.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pitch_section_activity')
    op.drop_table('pitch_recording_activity')
    op.drop_table('pitch_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
