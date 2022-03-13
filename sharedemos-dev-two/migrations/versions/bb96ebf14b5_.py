"""empty message

Revision ID: bb96ebf14b5
Revises: 29a0c4f02d5f
Create Date: 2017-01-10 05:16:18.810132

"""

# revision identifiers, used by Alembic.
revision = 'bb96ebf14b5'
down_revision = '29a0c4f02d5f'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from datetime import datetime

def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('last_activity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('entity', sa.Unicode(), nullable=False),
    sa.Column('entity_id', sa.Integer(), nullable=False),
    sa.Column('action', sa.Unicode(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    conn = op.get_bind()
    query = conn.execute("select id from tenant")
    tenant_list = query.fetchall()
    for tenant_id in tenant_list:
        tenant_id = tenant_id[0]
        max_modified_date = conn.execute("""select GREATEST((select max(modified_at) from tenant where id = {0}),
                                        (select max(created_at) from activity_feed where tenant_id = {0}),
                                        (select max(modified_at) from section where tenant_id = {0}),
                                        (select max(modified_at) from playlist where tenant_id = {0}),
                                        (select max(modified_at) from draft_walkthrough where tenant_id = {0}),
                                        (select max(modified_at) from walkthrough where tenant_id = {0}),
                                        (select max(modified_at) from slide where tenant_id = {0}),
                                        (select max(modified_at) from draft_slide where tenant_id = {0}),
                                        (select max(modified_at) from resource where tenant_id = {0}),
                                        (select max(modified_at) from hotspot where tenant_id = {0}),
                                        (select max(modified_at) from draft_hotspot where tenant_id = {0}),
                                        (select max(modified_at) from pin where tenant_id = {0}),
                                        (select max(modified_at) from draft_pin where tenant_id = {0}),
                                        (select max(modified_at) from tag where tenant_id = {0}),
                                        (select max(modified_at) from icon_library where tenant_id = {0}))""".format(tenant_id))
        max_modified_date = max_modified_date.fetchone()
        last_activity = max_modified_date[0] if max_modified_date else None
        if not last_activity:
            last_activity = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        else:
            last_activity = last_activity.strftime("%Y-%m-%d %H:%M:%S")

        op.execute("""INSERT INTO last_activity (action, tenant_id, entity, entity_id, created_at, updated_at) VALUES
                ('updated', {0}, 'tenant', {0}, TIMESTAMP '{1}',  TIMESTAMP '{1}')""".format(tenant_id, last_activity))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('last_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
