"""empty message

Revision ID: 46965b486f53
Revises: 1fefde9e8205
Create Date: 2015-11-23 06:10:59.275060

"""

# revision identifiers, used by Alembic.
revision = '46965b486f53'
down_revision = '1fefde9e8205'
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
    op.add_column('completion_activity', sa.Column('locale_requested_code', sa.Unicode(), nullable=True))
    op.add_column('completion_activity', sa.Column('locale_served_code', sa.Unicode(), nullable=True))
    op.create_foreign_key('completion_activity_locale_served_code_fkey', 'completion_activity', 'languages', ['locale_served_code'], ['id'])
    op.create_foreign_key('completion_activity_locale_requested_code_fkey', 'completion_activity', 'languages', ['locale_requested_code'], ['id'])
    op.add_column('visit_activity', sa.Column('locale_requested_code', sa.Unicode(), nullable=True))
    op.add_column('visit_activity', sa.Column('locale_served_code', sa.Unicode(), nullable=True))
    op.create_foreign_key('visit_activity_locale_served_code_fkey', 'visit_activity', 'languages', ['locale_served_code'], ['id'])
    op.create_foreign_key('visit_activity_locale_requested_code_fkey', 'visit_activity', 'languages', ['locale_requested_code'], ['id'])
    op.add_column('walkthrough_activity', sa.Column('locale_requested_code', sa.Unicode(), nullable=True))
    op.add_column('walkthrough_activity', sa.Column('locale_served_code', sa.Unicode(), nullable=True))
    op.create_foreign_key('walkthrough_activity_locale_served_code_fkey', 'walkthrough_activity', 'languages', ['locale_served_code'], ['id'])
    op.create_foreign_key('walkthrough_activity_locale_requested_code_fkey', 'walkthrough_activity', 'languages', ['locale_requested_code'], ['id'])
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('walkthrough_activity_locale_served_code_fkey', 'walkthrough_activity', type_='foreignkey')
    op.drop_constraint('walkthrough_activity_locale_requested_code_fkey', 'walkthrough_activity', type_='foreignkey')
    op.drop_column('walkthrough_activity', 'locale_served_code')
    op.drop_column('walkthrough_activity', 'locale_requested_code')
    op.drop_constraint('visit_activity_locale_served_code_fkey', 'visit_activity', type_='foreignkey')
    op.drop_constraint('visit_activity_locale_requested_code_fkey', 'visit_activity', type_='foreignkey')
    op.drop_column('visit_activity', 'locale_served_code')
    op.drop_column('visit_activity', 'locale_requested_code')
    op.drop_constraint('completion_activity_locale_served_code_fkey', 'completion_activity', type_='foreignkey')
    op.drop_constraint('completion_activity_locale_requested_code_fkey', 'completion_activity', type_='foreignkey')
    op.drop_column('completion_activity', 'locale_served_code')
    op.drop_column('completion_activity', 'locale_requested_code')
    ### end Alembic commands ###

def upgrade_reports():
    pass


def downgrade_reports():
    pass
