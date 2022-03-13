"""empty message

Revision ID: 4d0b7997372a
Revises: None
Create Date: 2014-10-01 10:57:42.325692

"""

# revision identifiers, used by Alembic.
revision = '4d0b7997372a'
down_revision = None

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('walkthrough',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=True),
    sa.Column('title', sa.Unicode(), nullable=True),
    sa.Column('slug', sa.Unicode(), nullable=True),
    sa.Column('resource_hostname', sa.Unicode(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('slug')
    )
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('section',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=True),
    sa.Column('title', sa.Unicode(), nullable=True),
    sa.Column('slug', sa.Unicode(), nullable=True),
    sa.Column('parent_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['parent_id'], ['section.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('slug')
    )
    op.create_table('resource',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=True),
    sa.Column('path', sa.Unicode(), nullable=True),
    sa.Column('resource_type', sa.Unicode(), nullable=True),
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('walkthroughs_sections',
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('section_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], )
    )
    op.create_table('walkthroughs_tags',
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('tag_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], )
    )
    op.create_table('slide',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('text', sa.Unicode(), nullable=True),
    sa.Column('resource_id', sa.Integer(), nullable=True),
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('order', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['resource_id'], ['resource.id'], ),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('hotspot',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('display', postgresql.JSON(), nullable=True),
    sa.Column('action', postgresql.JSON(), nullable=True),
    sa.Column('hotspot_type', sa.Unicode(), nullable=True),
    sa.Column('slide_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('modified_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['slide_id'], ['slide.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('hotspot')
    op.drop_table('slide')
    op.drop_table('walkthroughs_tags')
    op.drop_table('walkthroughs_sections')
    op.drop_table('resource')
    op.drop_table('section')
    op.drop_table('tag')
    op.drop_table('walkthrough')
    ### end Alembic commands ###


def downgrade_reports():
    pass
