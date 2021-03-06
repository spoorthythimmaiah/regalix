"""empty message

Revision ID: 537abbef6c73
Revises: 986c1081557
Create Date: 2018-03-08 09:55:21.690479

"""

# revision identifiers, used by Alembic.
revision = '537abbef6c73'
down_revision = '986c1081557'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'cta_activity',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('cta_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=True),
        sa.Column('walkthrough_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['cta_id'], ['lead_cta_form.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['user_activity.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['product_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_table('cta_activity')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
