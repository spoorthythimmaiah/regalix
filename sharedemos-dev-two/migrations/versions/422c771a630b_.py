"""empty message

Revision ID: 422c771a630b
Revises: 2496bd2e3b4e, 418f7d775c35
Create Date: 2018-02-01 06:51:43.342939

"""

# revision identifiers, used by Alembic.
revision = '422c771a630b'
down_revision = ('2496bd2e3b4e', '418f7d775c35')
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
