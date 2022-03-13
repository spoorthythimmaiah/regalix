"""empty message

Revision ID: 1af7ba79c565
Revises: 51274a780dc5, 16a378b11b0b
Create Date: 2016-09-19 13:32:17.274516

"""

# revision identifiers, used by Alembic.
revision = '1af7ba79c565'
down_revision = ('51274a780dc5', '16a378b11b0b')
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
