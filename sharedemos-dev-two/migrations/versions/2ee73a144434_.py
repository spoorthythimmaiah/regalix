"""empty message

Revision ID: 2ee73a144434
Revises: 46f2cd21e0ac
Create Date: 2016-03-17 14:11:39.718684

"""

# revision identifiers, used by Alembic.
revision = '2ee73a144434'
down_revision = '46f2cd21e0ac'
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
    op.create_table('activity_feed',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tenant_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('section_id', sa.Integer(), nullable=False),
    sa.Column('playlist_id', sa.Integer(), nullable=True),
    sa.Column('draft_walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('walkthrough_id', sa.Integer(), nullable=True),
    sa.Column('entity', sa.Unicode(), nullable=False),
    sa.Column('action', sa.Unicode(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['draft_walkthrough_id'], ['draft_walkthrough.id'], ),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlist.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['section.id'], ),
    sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
    sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['walkthrough_id'], ['walkthrough.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'draft_walkthrough', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'draft_walkthrough', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_draft_walkthrough_created_by', 'draft_walkthrough', 'users', ['created_by'], ['id'])
    op.create_foreign_key('fk_draft_walkthrough_modified_by', 'draft_walkthrough', 'users', ['modified_by'], ['id'])
    op.add_column(u'playlist', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'playlist', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_playlist_modified_by', 'playlist', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('fk_playlist_created_by', 'playlist', 'users', ['created_by'], ['id'])
    op.add_column(u'section', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'section', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_section_modified_by', 'section', 'users', ['modified_by'], ['id'])
    op.create_foreign_key('fk_section_created_by', 'section', 'users', ['created_by'], ['id'])
    op.add_column(u'walkthrough', sa.Column('created_by', sa.Integer(), nullable=True))
    op.add_column(u'walkthrough', sa.Column('modified_by', sa.Integer(), nullable=True))
    op.create_foreign_key('fk_walkthrough_created_by', 'walkthrough', 'users', ['created_by'], ['id'])
    op.create_foreign_key('fk_walkthrough_modified_by', 'walkthrough', 'users', ['modified_by'], ['id'])
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('fk_walkthrough_modified_by', 'walkthrough', type_='foreignkey')
    op.drop_constraint('fk_walkthrough_created_by', 'walkthrough', type_='foreignkey')
    op.drop_column(u'walkthrough', 'modified_by')
    op.drop_column(u'walkthrough', 'created_by')
    op.drop_constraint('fk_section_modified_by', 'section', type_='foreignkey')
    op.drop_constraint('fk_section_created_by', 'section', type_='foreignkey')
    op.drop_column(u'section', 'modified_by')
    op.drop_column(u'section', 'created_by')
    op.drop_constraint('fk_playlist_modified_by', 'playlist', type_='foreignkey')
    op.drop_constraint('fk_playlist_created_by', 'playlist', type_='foreignkey')
    op.drop_column(u'playlist', 'modified_by')
    op.drop_column(u'playlist', 'created_by')
    op.drop_constraint('fk_draft_walkthrough_modified_by', 'draft_walkthrough', type_='foreignkey')
    op.drop_constraint('fk_draft_walkthrough_created_by', 'draft_walkthrough', type_='foreignkey')
    op.drop_column(u'draft_walkthrough', 'modified_by')
    op.drop_column(u'draft_walkthrough', 'created_by')
    op.drop_table('activity_feed')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
