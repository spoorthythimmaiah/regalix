"""empty message

Revision ID: 259fc108434
Revises: 537b93fd8cd8, 3317ba4417dc
Create Date: 2017-09-01 07:31:44.101404

"""

# revision identifiers, used by Alembic.
revision = '259fc108434'
down_revision = ('537b93fd8cd8', '3317ba4417dc')
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
