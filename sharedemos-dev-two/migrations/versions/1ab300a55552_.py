"""empty message

Revision ID: 1ab300a55552
Revises: 59d874b6d0dc
Create Date: 2017-05-31 13:47:54.707279

"""

# revision identifiers, used by Alembic.
revision = '1ab300a55552'
down_revision = '50c97f5e0f10'
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
    op.create_index('unique_first_visit_record', 'walkthrough_activity', ['tenant_id', 'report_user_id', 'product_id', 'section_id', 'walkthrough_id', 'slide_index'], unique=True, postgresql_where=sa.text(u'NOT walkthrough_activity.revisit'))
    op.execute("alter table completion_activity add constraint check_slides_completed check (entity_complete <= entity_total);")
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.execute("alter table completion_activity drop constraint check_slides_completed;")
    op.drop_index('unique_first_visit_record', table_name='walkthrough_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
