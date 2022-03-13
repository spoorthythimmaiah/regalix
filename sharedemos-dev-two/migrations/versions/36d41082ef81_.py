from alembic import op
import sqlalchemy as sa

"""empty message

Revision ID: 36d41082ef81
Revises: 10ac5264ca9d
Create Date: 2019-04-05 07:19:59.522071

"""

# revision identifiers, used by Alembic.
revision = '36d41082ef81'
down_revision = '10ac5264ca9d'
branch_labels = None
depends_on = None


def upgrade(engine_name):
    globals()["upgrade_%s" % engine_name]()


def downgrade(engine_name):
    globals()["downgrade_%s" % engine_name]()


def upgrade_():
    # commands auto generated by Alembic - please adjust! #
    op.create_table(
        'user_group_mappings',
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('group_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['group_id'], ['user_groups.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
        sa.PrimaryKeyConstraint('user_id', 'group_id')
    )

    query = op.get_bind().execute("select * from users where group_id is not NULL")
    if query:
        users = query.fetchall()
        for user in users:
            op.get_bind().execute(
                sa.text(
                    """
                    insert into
                    user_group_mappings(user_id, group_id)
                    values (:u_id, :g_id)
                    """
                ), u_id=user.id, g_id=user.group_id
            )
    op.drop_constraint(u'users_group_id_fkey', 'users', type_='foreignkey')
    op.drop_column(u'users', 'group_id')
    # end Alembic commands #


def downgrade_():
    """
        op.add_column(
            u'users',
            sa.Column('group_id', sa.INTEGER(), autoincrement=False, nullable=True))
        op.create_foreign_key(
            u'users_group_id_fkey', 'users', 'user_groups', ['group_id'], ['id'])
        op.drop_table('user_group_mappings')
    """
    """
        NOTE: Raise exception as DB downgrade is incompatible at this point
        There is no way to map user to specific group
    """
    raise Exception("Cannot downgrade database!!")


def upgrade_reports():
    pass


def downgrade_reports():
    pass
