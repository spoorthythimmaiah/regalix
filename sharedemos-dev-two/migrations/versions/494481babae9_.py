"""empty message

Revision ID: 494481babae9
Revises: b5a032631f5
Create Date: 2015-01-08 12:17:53.294756

"""

# revision identifiers, used by Alembic.
revision = '494481babae9'
down_revision = 'b5a032631f5'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('walkthrough_activity')
    op.drop_table('completion_activity')
    op.drop_table('visit_activity')
    op.drop_table('user_activity')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_activity',
    sa.Column('unique_user_id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('browser', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('version', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('platform', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('language', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('source', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('medium', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('term', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('campaign', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('content', sa.VARCHAR(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.PrimaryKeyConstraint('unique_user_id', name=u'user_activity_pkey'),
    postgresql_ignore_search_path=False
    )

    op.create_table('visit_activity',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('report_user_id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('section_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('walkthrough_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('tenant_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['product_id'], [u'section.id'], name=u'visit_activity_product_id_fkey'),
    sa.ForeignKeyConstraint(['report_user_id'], [u'user_activity.unique_user_id'], name=u'visit_activity_report_user_id_fkey'),
    sa.ForeignKeyConstraint(['section_id'], [u'section.id'], name=u'visit_activity_section_id_fkey'),
    sa.ForeignKeyConstraint(['walkthrough_id'], [u'walkthrough.id'], name=u'visit_activity_walkthrough_id_fkey'),
    sa.PrimaryKeyConstraint('id', name=u'visit_activity_pkey')
    )

    op.create_table('completion_activity',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('report_user_id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('entity_total', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('entity_complete', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('modified_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('section_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('walkthrough_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tenant_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['report_user_id'], [u'user_activity.unique_user_id'], name=u'completion_activity_report_user_id_fkey'),
    sa.PrimaryKeyConstraint('id', name=u'completion_activity_pkey')
    )
    op.create_table('walkthrough_activity',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('report_user_id', sa.VARCHAR(), autoincrement=False, nullable=False),
    sa.Column('section_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('walkthrough_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('slide_index', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('revisit', sa.BOOLEAN(), autoincrement=False, nullable=False),
    sa.Column('created_at', postgresql.TIMESTAMP(), autoincrement=False, nullable=False),
    sa.Column('duration', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('product_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('tenant_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['report_user_id'], [u'user_activity.unique_user_id'], name=u'walkthrough_activity_report_user_id_fkey'),
    sa.ForeignKeyConstraint(['section_id'], [u'section.id'], name=u'walkthrough_activity_section_id_fkey'),
    sa.ForeignKeyConstraint(['walkthrough_id'], [u'walkthrough.id'], name=u'walkthrough_activity_walkthrough_id_fkey'),
    sa.PrimaryKeyConstraint('id', name=u'walkthrough_activity_pkey')
    )
    ### end Alembic commands ###


def downgrade_reports():
    pass
