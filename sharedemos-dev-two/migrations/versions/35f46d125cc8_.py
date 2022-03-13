"""empty message

Revision ID: 35f46d125cc8
Revises: 4300f53ff2f8
Create Date: 2019-02-07 06:59:24.178074

"""

# revision identifiers, used by Alembic.
revision = '35f46d125cc8'
down_revision = '2295686e9b0'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.add_column('activity_feed', sa.Column('attribute', sa.Unicode(), nullable=True))
    op.add_column('activity_feed', sa.Column('language_id', sa.Unicode(), nullable=True))
    op.create_foreign_key('activity_feed_language_id_fkey', 'activity_feed', 'languages', ['language_id'], ['id'])
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('activity_feed_language_id_fkey', 'activity_feed', type_='foreignkey')
    op.drop_column('activity_feed', 'language_id')
    op.drop_column('activity_feed', 'attribute')
    ### end Alembic commands ###


def upgrade_reports():
    pass

def downgrade_reports():
    pass
