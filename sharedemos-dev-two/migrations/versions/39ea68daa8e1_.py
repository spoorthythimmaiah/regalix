"""empty message

Revision ID: 39ea68daa8e1
Revises: 5350151e76ee
Create Date: 2017-05-04 10:16:53.357734

"""

# revision identifiers, used by Alembic.
revision = '39ea68daa8e1'
down_revision = '5350151e76ee'
branch_labels = None
depends_on = None

from alembic import op


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    op.execute("""
        INSERT INTO role(id, name, created_at) SELECT 5, 'commenter', current_date WHERE NOT EXISTS (SELECT id from role WHERE id = 5)
    """)


def downgrade_():
    op.execute("""UPDATE users SET role_id=4 WHERE role_id=5""")
    op.execute(""" DELETE FROM role WHERE id = 5 """)


def upgrade_reports():
    pass


def downgrade_reports():
    pass
