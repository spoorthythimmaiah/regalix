"""empty message

Revision ID: 3a2c2977201
Revises: 41128da257ee
Create Date: 2015-11-25 00:26:03.051145

"""

# revision identifiers, used by Alembic.
revision = '3a2c2977201'
down_revision = '41128da257ee'
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
    op.add_column('audience_companies', sa.Column('is_enabled', sa.Boolean(), nullable=False, server_default="true"))
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column('audience_companies', 'is_enabled')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass