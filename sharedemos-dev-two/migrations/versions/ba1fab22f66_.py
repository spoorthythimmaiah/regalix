"""empty message

Revision ID: ba1fab22f66
Revises: 5268b2608b35
Create Date: 2014-12-26 16:29:57.884834

"""

# revision identifiers, used by Alembic.
revision = 'ba1fab22f66'
down_revision = '5268b2608b35'

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('icon_library',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Unicode(), nullable=False),
    sa.Column('path', sa.Unicode(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('modified_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.alter_column(u'languages', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.alter_column(u'languages', 'modified_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
    op.add_column(u'section', sa.Column('icon_id', sa.Integer(), nullable=True))
    op.add_column(u'section', sa.Column('video_url', sa.Unicode(), nullable=True))
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_column(u'section', 'video_url')
    op.drop_column(u'section', 'icon_id')
    op.alter_column(u'languages', 'modified_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.alter_column(u'languages', 'created_at',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
    op.drop_table('icon_library')
    ### end Alembic commands ###


def downgrade_reports():
    pass
