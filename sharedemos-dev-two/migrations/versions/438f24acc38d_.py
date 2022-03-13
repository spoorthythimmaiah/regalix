"""empty message

Revision ID: 438f24acc38d
Revises: 377433b2972b
Create Date: 2015-02-09 12:05:40.646392

"""

# revision identifiers, used by Alembic.
revision = '438f24acc38d'
down_revision = '377433b2972b'

from alembic import op
import sqlalchemy as sa


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        'sections_tags',
        sa.Column('section_id', sa.Integer(), nullable=True),
        sa.Column('tag_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['section_id'], ['section.id'], ),
        sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], )
    )
    ### end Alembic commands ###


def upgrade_reports():
    pass


def downgrade_():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('sections_tags')
    ### end Alembic commands ###


def downgrade_reports():
    pass
