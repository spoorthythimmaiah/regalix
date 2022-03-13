"""empty message

Revision ID: 4c9acf112f39
Revises: 51f17087ca56
Create Date: 2017-03-16 10:39:27.409139

"""

# revision identifiers, used by Alembic.
revision = '4c9acf112f39'
down_revision = '51f17087ca56'
branch_labels = None
depends_on = None

from alembic import op


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.alter_column('options', 'type', new_column_name='option_type')
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.alter_column('options', 'option_type', new_column_name='type')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass