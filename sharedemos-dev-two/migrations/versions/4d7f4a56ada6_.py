"""empty message

Revision ID: 4d7f4a56ada6
Revises: 468fd6de0682
Create Date: 2016-06-07 06:55:13.996700

"""

# revision identifiers, used by Alembic.
revision = '4d7f4a56ada6'
down_revision = '468fd6de0682'
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
    op.add_column('tenant', sa.Column('template', sa.Unicode(), server_default=u"default", nullable=True))
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.drop_column('tenant', 'template')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
