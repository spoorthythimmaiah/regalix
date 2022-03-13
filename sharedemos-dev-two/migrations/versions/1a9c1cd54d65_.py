"""empty message

Revision ID: 1a9c1cd54d65
Revises: ae7c63cd8b5
Create Date: 2016-12-06 09:08:19.279991

"""

# revision identifiers, used by Alembic.
revision = '1a9c1cd54d65'
down_revision = 'ae7c63cd8b5'
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
        'applications',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('unique_id', sa.Unicode(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('icon_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('unique_id', name='uq_application_unique_id')
    )
    op.create_table(
        'tenants_applications',
        sa.Column('tenant_id', sa.Integer(), nullable=True),
        sa.Column('application_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['application_id'], ['applications.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], )
    )
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_table('tenants_applications')
    op.drop_table('applications')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass