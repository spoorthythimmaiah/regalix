"""empty message

Revision ID: 4300f53ff2f8
Revises: 111166c924ed
Create Date: 2018-11-28 10:44:03.653792

"""

# revision identifiers, used by Alembic.
revision = '4300f53ff2f8'
down_revision = '111166c924ed'
branch_labels = None
depends_on = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('announcement_widget',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.Column('created_by', sa.Integer(), nullable=True),
    sa.Column('modified_by', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('announcement_widget_translations',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('announcement_widget_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.Unicode(), nullable=False),
    sa.Column('description', sa.Unicode(), nullable=True),
    sa.Column('chapter_tags', postgresql.ARRAY(sa.Integer(), dimensions=1), nullable=False),
    sa.Column('result_title', sa.Unicode(), nullable=False),
    sa.Column('language_id', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
    sa.ForeignKeyConstraint(['announcement_widget_id'], ['announcement_widget.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'tenant_flags', sa.Column('is_announcement_widget_enabled', sa.Boolean(),
                  nullable=False, server_default='false'))
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column(u'tenant_flags', 'is_announcement_widget_enabled')
    op.drop_table('announcement_widget_translations')
    op.drop_table('announcement_widget')
    ### end Alembic commands ###


def upgrade_reports():
    pass

def downgrade_reports():
    pass
