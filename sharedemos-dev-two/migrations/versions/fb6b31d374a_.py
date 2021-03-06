"""empty message

Revision ID: fb6b31d374a
Revises: 271fded6fa63
Create Date: 2015-06-22 13:21:11.193063

"""

# revision identifiers, used by Alembic.
revision = 'fb6b31d374a'
down_revision = '271fded6fa63'

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('mail_digest', 'section_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('mail_digest', 'section_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    ### end Alembic commands ###


def downgrade_reports():
    pass
