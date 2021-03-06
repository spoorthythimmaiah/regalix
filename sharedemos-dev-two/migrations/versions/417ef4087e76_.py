"""empty message

Revision ID: 417ef4087e76
Revises: 8dc145b7ae5
Create Date: 2016-12-07 10:08:18.936368

"""

# revision identifiers, used by Alembic.
revision = '417ef4087e76'
down_revision = '8dc145b7ae5'
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
    bind = op.get_bind()
    op.add_column('tenant', sa.Column('unique_tenant_id', sa.Unicode(), nullable=True))
    bind.execute("update tenant set unique_tenant_id = substring(md5(random()::text), 27)")
    # md5 has 35 chars so selecting only 6 by using substring
    op.create_unique_constraint('tenant_unique_key', 'tenant', ['unique_tenant_id'])
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('tenant_unique_key', 'tenant', type_='unique')
    op.drop_column('tenant', 'unique_tenant_id')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
