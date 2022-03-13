"""empty message

Revision ID: 1b51096b0819
Revises: 566801742ff6
Create Date: 2015-12-10 23:17:40.699486

"""

# revision identifiers, used by Alembic.
revision = '1b51096b0819'
down_revision = '566801742ff6'
branch_labels = None
depends_on = None

from alembic import op


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.execute("ALTER TABLE draft_walkthrough DROP CONSTRAINT IF EXISTS draft_walkthrough_slug_key")
    op.execute("ALTER TABLE draft_walkthrough DROP CONSTRAINT IF EXISTS uq_draft_walkthrough_tenant_id_slug")
    op.create_unique_constraint('uq_draft_walkthrough_tenant_id_slug', 'draft_walkthrough', ['tenant_id', 'slug'])

    op.execute("ALTER TABLE walkthrough DROP CONSTRAINT IF EXISTS walkthrough_slug_key")
    op.execute("ALTER TABLE walkthrough DROP CONSTRAINT IF EXISTS uq_walkthrough_tenant_id_slug")
    op.create_unique_constraint('uq_walkthrough_tenant_id_slug', 'walkthrough', ['tenant_id', 'slug'])

    op.execute("ALTER TABLE section DROP CONSTRAINT IF EXISTS section_slug_key")
    op.execute("ALTER TABLE section DROP CONSTRAINT IF EXISTS uq_section_tenant_id_slug")
    op.create_unique_constraint('uq_section_tenant_id_slug', 'section', ['tenant_id', 'slug'])
    # end Alembic commands #


def downgrade_():
    """Constraints not removed as it may impact on content created here after"""
    pass


def upgrade_reports():
    pass


def downgrade_reports():
    pass