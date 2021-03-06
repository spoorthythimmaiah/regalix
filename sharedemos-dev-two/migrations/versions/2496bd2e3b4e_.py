"""empty message

Revision ID: 2496bd2e3b4e
Revises: 2d69cda73fc6
Create Date: 2018-01-29 09:53:26.991718

"""

# revision identifiers, used by Alembic.
revision = '2496bd2e3b4e'
down_revision = '2d69cda73fc6'
branch_labels = None
depends_on = None

import json

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'cta_translations',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.Unicode(), nullable=False),
        sa.Column('cta_button', postgresql.JSON(), nullable=True),
        sa.Column('cta_id', sa.Integer(), nullable=False),
        sa.Column('language_id', sa.Unicode(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('modified_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['cta_id'], ['lead_cta_form.id'], ),
        sa.ForeignKeyConstraint(['language_id'], ['languages.id'], ),
        sa.PrimaryKeyConstraint('id')
    )
    op.add_column(u'lead_cta_form', sa.Column('cta_type', sa.Unicode(),
                                              nullable=True))

    conn = op.get_bind()

    query = conn.execute("select * from tenant")
    tenants = query.fetchall()
    tenant_default_language = {t.id: t.default_locale_id for t in tenants}

    query = conn.execute("select * from lead_cta_form")
    cta_list = query.fetchall()
    for cta in cta_list:
        cta_type = cta.cta_button['type']
        conn.execute(
            """update lead_cta_form set cta_type='{0}' where id={1}"""
            .format(cta_type, cta.id))
        cta.cta_button.pop('type')
        conn.execute(
            """insert into cta_translations(name, cta_button, cta_id,
               language_id, created_at, modified_at)
               values('%s', '%s', '%s', '%s', '%s', '%s')"""
            % (cta.name, json.dumps(cta.cta_button), cta.id,
               tenant_default_language[cta.tenant_id],
               cta.created_at, cta.created_at)
        )

    op.alter_column('lead_cta_form', 'cta_type',
                    existing_type=sa.Unicode(),
                    nullable=False)

    op.drop_column(u'lead_cta_form', 'name')
    op.drop_column(u'lead_cta_form', 'cta_button')
    # end Alembic commands #


def downgrade_():
    # commands auto generated by Alembic - please adjust! #
    conn = op.get_bind()

    query = conn.execute("select * from tenant")
    tenants = query.fetchall()
    tenant_default_language = {t.id: t.default_locale_id for t in tenants}

    query = conn.execute("select * from cta_translations")
    cta_trans = query.fetchall()
    cta_default_content = {}
    for t in cta_trans:
        if t.cta_id not in cta_default_content:
            cta_default_content[t.cta_id] = {}

        if t.language_id not in cta_default_content[t.cta_id]:
            cta_default_content[t.cta_id][t.language_id] = {
                'name': t.name,
                'cta_button': t.cta_button
            }

    op.add_column(u'lead_cta_form', sa.Column('cta_button',
                                              postgresql.JSON(),
                                              autoincrement=False,
                                              nullable=True))
    op.add_column(u'lead_cta_form', sa.Column('name',
                                              sa.VARCHAR(),
                                              autoincrement=False,
                                              nullable=True))

    query = conn.execute("select * from lead_cta_form")
    cta_list = query.fetchall()
    for cta in cta_list:
        def_trans = {}
        if cta.id in cta_default_content and\
                tenant_default_language[cta.tenant_id] in cta_default_content[
                cta.id]:
            def_trans = cta_default_content[cta.id][
                tenant_default_language[cta.tenant_id]]
            def_trans["cta_button"]["type"] = cta.cta_type
            conn.execute(
                """update lead_cta_form
                   set name='%s', cta_button='%s'
                   where id='%s'"""
                % (def_trans["name"],
                   json.dumps(def_trans["cta_button"]),
                   cta.id))

    op.alter_column('lead_cta_form', 'name',
                    existing_type=sa.Unicode(),
                    nullable=False)
    op.drop_column(u'lead_cta_form', 'cta_type')
    op.drop_table('cta_translations')
    # end Alembic commands #


def upgrade_reports():
    pass


def downgrade_reports():
    pass
