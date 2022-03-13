"""empty message

Revision ID: 537b93fd8cd8
Revises: 58fee14dec42
Create Date: 2017-08-28 07:38:49.329791

"""

# revision identifiers, used by Alembic.
revision = '537b93fd8cd8'
down_revision = '58fee14dec42'
branch_labels = None
depends_on = None

from alembic import op


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.alter_column('tenant_language', 'is_enabled', new_column_name='is_public')
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.alter_column('tenant_language', 'is_public', new_column_name='is_enabled')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
