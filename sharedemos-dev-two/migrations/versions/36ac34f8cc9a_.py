"""empty message

Revision ID: 36ac34f8cc9a
Revises: 3f86eb555b5e
Create Date: 2019-06-28 10:30:48.810373

"""

# revision identifiers, used by Alembic.
revision = '36ac34f8cc9a'
down_revision = '3f86eb555b5e'
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
    op.add_column(
        'downloads',
        sa.Column('language_id', sa.Unicode(), nullable=True)
    )
    op.execute(
        """
        UPDATE downloads as dl SET language_id = t.default_locale_id
        FROM tenant as t WHERE t.id= dl.tenant_id;
        """
    )

    op.alter_column(
        'downloads', 'language_id',
        existing_type=sa.Unicode(), nullable=False
    )
    op.create_foreign_key(
        'downloads_language_id_fkey',
        'downloads', 'languages', ['language_id'], ['id']
    )
    ### end Alembic commands ###


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(
        'downloads_language_id_fkey', 'downloads',
        type_='foreignkey'
    )
    op.drop_column('downloads', 'language_id')
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_reports():
    pass
