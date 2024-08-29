"""Add dosage form

Revision ID: 5d9ceec257f3
Revises: 985136a5d6e2
Create Date: 2024-08-28 12:39:40.083602

"""
from typing import Sequence

from alembic import op
import sqlalchemy as sa
import sqlmodel


# revision identifiers, used by Alembic.
revision: str = '5d9ceec257f3'
down_revision: str | None = '985136a5d6e2'
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('patient', sa.Column('phone_number', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    op.add_column('rxitem', sa.Column('dosage_form', sqlmodel.sql.sqltypes.AutoString(), nullable=False))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('rxitem', 'dosage_form')
    op.drop_column('patient', 'phone_number')
    # ### end Alembic commands ###
