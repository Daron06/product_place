import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import { EnhancedTableHead } from 'components/EnhancedTableHead';
import styles from 'components/pages/admin/Products/AdminProducts.module.scss';
import { AdminTableProps } from 'components/pages/admin/SupplierChefs/SupplierChefsTable';
import { Pagination } from 'components/Pagination';
import { TableLayout } from 'layouts/TableLayout';
import React from 'react';
import { ImmutableIngredientsState } from 'redux/ducks/admin/supplier/ingredients/types/state';
import { DashboardRole } from 'services/types';

import { IngredientsTableRow } from './IngredientsTableRow';

interface IngredientsTableProps extends AdminTableProps {
  items: ImmutableIngredientsState['items'];
  role?: DashboardRole;
}

const cellsWidth = {
  0: { width: '5%' },
  1: { width: '50%' },
  2: { width: '10%' },
  3: { width: '10%' },
  4: { width: '10%' },
  5: { width: '15%' },
};

const cellsWidthStaff = {
  0: { width: '5%' },
  1: { width: '25%' },
  2: { width: '25%' },
  3: { width: '10%' },
  4: { width: '10%' },
  5: { width: '10%' },
  6: { width: '15%' },
};

export const IngredientsTable: React.FC<IngredientsTableProps> = ({
  currentPage,
  totalItems,
  items,
  onPaginationChange,
  onSelectAllItems,
  onSelectItem,
  onActivateItem,
  onDeactivateItem,
  onSort,
  order,
  pageCount,
  selectedItems,
  isLoading = false,
  cells,
  role,
}): React.ReactElement | null => {
  const isSelected = (id: number): boolean => selectedItems.includes(id);

  if (!cells) {
    return null;
  }

  return (
    <TableLayout isEmpty={!isLoading && !items?.length}>
      <TableContainer>
        <Table className={styles.table} size="medium">
          <EnhancedTableHead
            cells={cells}
            cellsWidth={role === DashboardRole.STAFF ? cellsWidthStaff : cellsWidth}
            numSelected={selectedItems.length}
            order={order}
            onSelectAll={onSelectAllItems}
            onSort={onSort}
            rowCount={items?.length || 0}
          />
          <TableBody>
            {/* TODO: Поправить типизацию. Убрать any */}
            {(isLoading ? ([...Array(6)] as ImmutableIngredientsState['items']) : items).map(
              (row, index): React.ReactElement => {
                const isItemSelected = !!row && isSelected(Number(row.id));
                const labelId = `enhanced-table-${index}`;

                return (
                  <IngredientsTableRow
                    key={labelId}
                    labelId={labelId}
                    item={row}
                    isSelected={isItemSelected}
                    isLoading={isLoading}
                    onSelectItem={onSelectItem}
                    onActivateItem={onActivateItem}
                    onDeactivateItem={onDeactivateItem}
                    role={role}
                  />
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {items && (
        <div className="d-flex justify-content-between p-20">
          <Pagination color="white" currentPage={currentPage} goToPage={onPaginationChange} pageCount={pageCount} />
          <Typography variant="subtitle1">
            {items.length * currentPage}/{totalItems}
          </Typography>
        </div>
      )}
    </TableLayout>
  );
};
