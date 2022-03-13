"""empty message

Revision ID: 51274a780dc5
Revises: 4d53f869526
Create Date: 2016-09-15 17:31:31.768791

"""

# revision identifiers, used by Alembic.
revision = '51274a780dc5'
down_revision = '4d53f869526'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()





def upgrade_():
    op.add_column('mail_digest', sa.Column('all_products', sa.Boolean(), server_default='false', nullable=True))
    op.alter_column('mail_digest', 'section_id',
               existing_type=sa.INTEGER(),
               nullable=True)


def downgrade_():
    op.alter_column('mail_digest', 'section_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_column('mail_digest', 'all_products')


def upgrade_reports():
  pass


def downgrade_reports():
  pass
