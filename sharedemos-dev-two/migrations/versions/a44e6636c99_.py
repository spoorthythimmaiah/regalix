"""empty message

Revision ID: a44e6636c99
Revises: 1a9c1cd54d65, 4f4ceb53916e
Create Date: 2016-12-07 05:04:43.036613

"""

# revision identifiers, used by Alembic.
revision = 'a44e6636c99'
down_revision = ('1a9c1cd54d65', '4f4ceb53916e')
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    pass


def downgrade_():
    pass


def upgrade_reports():
    pass


def downgrade_reports():
    pass
