"""empty message

Revision ID: 3ce5690d81ae
Revises: 3b277c3682e1
Create Date: 2019-12-17 09:26:03.264119

"""

# revision identifiers, used by Alembic.
revision = '3ce5690d81ae'
down_revision = '3b277c3682e1'
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
    op.create_table(
        'pitch_resource',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=True),
        sa.Column('resource_type', sa.Unicode(), nullable=False),
        sa.Column('path', sa.Unicode(), nullable=False),
        sa.Column('meta_data', postgresql.JSON(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_pitch',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('uuid', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('modified_by', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('tenant_id', 'uuid', name='uq_draft_pitch_tenant_id')
    )
    op.create_table(
        'draft_pitch_section',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('uuid', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('base_score', sa.Integer(), nullable=False),
        sa.Column('max_attempts', sa.Integer(), nullable=False),
        sa.Column('time_limit', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('modified_by', sa.Integer(), nullable=True),
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['modified_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['pitch_id'], ['draft_pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('tenant_id', 'uuid', name='uq_draft_pitch_section_tenant_id')
    )
    op.create_table(
        'draft_pitch_section_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('keywords', postgresql.JSON(none_as_null=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('base_pitch_resource_id', sa.Integer(), nullable=True),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['base_pitch_resource_id'], ['pitch_resource.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['section_id'], ['draft_pitch_section.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_pitch_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('tags', postgresql.JSON(none_as_null=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('icon_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['pitch_id'], ['draft_pitch.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'draft_pitch_user_groups_association',
        sa.Column('draft_pitch_id', sa.Integer(), nullable=False),
        sa.Column('user_groups_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['draft_pitch_id'], ['draft_pitch.id'], ),
        sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
        sa.PrimaryKeyConstraint('draft_pitch_id', 'user_groups_id')
    )
    op.create_table(
        'pitch',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('uuid', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('version', sa.Integer(), nullable=False),
        sa.Column('draft_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['draft_id'], ['draft_pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_section',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('uuid', sa.Unicode(), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('is_deleted', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('base_score', sa.Integer(), nullable=False),
        sa.Column('max_attempts', sa.Integer(), nullable=False),
        sa.Column('time_limit', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('draft_id', sa.Integer(), nullable=False),
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_by', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['created_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['draft_id'], ['draft_pitch_section.id'], ),
        sa.ForeignKeyConstraint(['pitch_id'], ['pitch.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_section_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('keywords', postgresql.JSON(none_as_null=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('section_id', sa.Integer(), nullable=False),
        sa.Column('base_pitch_resource_id', sa.Integer(), nullable=True),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.ForeignKeyConstraint(['base_pitch_resource_id'], ['pitch_resource.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['section_id'], ['pitch_section.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('title', sa.Unicode(), nullable=False),
        sa.Column('description', sa.Unicode(), nullable=True),
        sa.Column('tags', postgresql.JSON(none_as_null=True), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('icon_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['icon_id'], ['icon_library.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.ForeignKeyConstraint(['pitch_id'], ['pitch.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_recording',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('score', sa.Integer(), nullable=True),
        sa.Column('section_trans_id', sa.Integer(), nullable=False),
        sa.Column('resource_id', sa.Integer(), nullable=False),
        sa.Column('submitted_by', sa.Integer(), nullable=False),
        sa.Column('evaluated_by', sa.Integer(), nullable=True),
        sa.Column('tenant_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['evaluated_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['resource_id'], ['pitch_resource.id'], ),
        sa.ForeignKeyConstraint(['section_trans_id'], ['pitch_section_translations.id'], ),
        sa.ForeignKeyConstraint(['submitted_by'], ['users.id'], ),
        sa.ForeignKeyConstraint(['tenant_id'], ['tenant.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_table(
        'pitch_user_groups_association',
        sa.Column('pitch_id', sa.Integer(), nullable=False),
        sa.Column('user_groups_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['pitch_id'], ['pitch.id'], ),
        sa.ForeignKeyConstraint(['user_groups_id'], ['user_groups.id'], ),
        sa.PrimaryKeyConstraint('pitch_id', 'user_groups_id')
    )
    op.add_column('draft_pitch', sa.Column('latest_pitch_id', sa.Integer(), nullable=True))
    op.create_foreign_key('draft_pitch_latest_pitch_fkey', 'draft_pitch', 'pitch', ['latest_pitch_id'], ['id'])
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('pitch_recording')
    op.drop_table('pitch_user_groups_association')
    op.drop_table('pitch_translations')
    op.drop_table('pitch_section_translations')
    op.drop_table('pitch_section')
    op.drop_table('pitch')
    op.drop_table('draft_pitch_user_groups_association')
    op.drop_table('draft_pitch_translations')
    op.drop_table('draft_pitch_section_translations')
    op.drop_table('pitch_resource')
    op.drop_table('draft_pitch_section')
    op.drop_table('draft_pitch')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
