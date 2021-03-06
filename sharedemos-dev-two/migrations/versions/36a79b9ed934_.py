"""empty message

Revision ID: 36a79b9ed934
Revises: 5940fc0a5201
Create Date: 2020-02-13 10:34:44.601130

"""

# revision identifiers, used by Alembic.
revision = '36a79b9ed934'
down_revision = '5940fc0a5201'
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
        'draft_pitch_related_asset_association',
        sa.Column('draft_pitch_id', sa.Integer(), nullable=False),
        sa.Column('chapter_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['chapter_id'], ['walkthrough.id'], ),
        sa.ForeignKeyConstraint(['draft_pitch_id'], ['draft_pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('draft_pitch_id', 'chapter_id')
    )
    op.create_table(
        'pitch_related_asset_association',
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('chapter_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['chapter_id'], ['walkthrough.id'], ),
        sa.ForeignKeyConstraint(['pitch_id'], ['pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('pitch_id', 'chapter_id')
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pitch_related_asset_association')
    op.drop_table('draft_pitch_related_asset_association')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass

