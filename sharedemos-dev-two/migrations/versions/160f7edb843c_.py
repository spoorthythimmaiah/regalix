"""empty message

Revision ID: 160f7edb843c
Revises: 2f53338a593a
Create Date: 2014-10-27 05:08:04.897597

"""

# revision identifiers, used by Alembic.
revision = '160f7edb843c'
down_revision = '2f53338a593a'

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('walkthroughs_sections')
    op.add_column('section', sa.Column('order', sa.Integer(), nullable=False))
    op.add_column('walkthrough', sa.Column('order', sa.Integer(), nullable=False))
    op.add_column('walkthrough', sa.Column('section_id', sa.Integer(), nullable=False))
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('walkthrough', 'section_id')
    op.drop_column('walkthrough', 'order')
    op.drop_column('section', 'order')
    op.create_table('walkthroughs_sections',
    sa.Column('walkthrough_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.Column('section_id', sa.INTEGER(), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['section_id'], [u'section.id'], name=u'walkthroughs_sections_section_id_fkey'),
    sa.ForeignKeyConstraint(['walkthrough_id'], [u'walkthrough.id'], name=u'walkthroughs_sections_walkthrough_id_fkey')
    )
    ### end Alembic commands ###


def downgrade_reports():
    pass
