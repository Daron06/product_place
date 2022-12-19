import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { EnhancedTableHead, HeadCell } from 'components/EnhancedTableHead';
import { Pagination } from 'components/Pagination';
import { Result } from 'components/Result';
import { Immutable } from 'immer';
import React from 'react';
import { ProductChefNullable } from 'redux/ducks/products/types/state';

import { TableOrder } from '../../../../hooks/useProductsTable';
import styles from './AdminProducts.module.scss';
import { ProductTableRow } from './ProductTableRow';

interface ProductTableProps {
  items: ProductChefNullable[];
  onPaginationChange: (page: number) => void;
  onSelectProductItem: (ids: number) => void;
  onActivateItem: (id: number) => void;
  onDeactivateItem: (id: number) => void;
  onSelectAllProductsItems: () => void;
  onSort: (property: HeadCell['id']) => void;
  order: TableOrder;
  pageCount: number;
  currentPage: number;
  selectedProductsItems: number[];
  totalItems: number;
  isLoading?: boolean;
  cells?: HeadCell[];
  takeCount: number;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  currentPage,
  totalItems,
  items,
  onPaginationChange,
  onSelectAllProductsItems,
  onSelectProductItem,
  onActivateItem,
  onDeactivateItem,
  onSort,
  order,
  pageCount,
  selectedProductsItems,
  isLoading = false,
  cells,
  takeCount,
}): React.ReactElement | null => {
  const isSelected = (id: number): boolean => selectedProductsItems.includes(id);

  if (!cells) {
    return null;
  }

  if (!isLoading && items && !items.length) {
    return <Result title="No data to display" status="empty" />;
  }

  return (
    <div className={styles.tableRoot}>
      <Paper className={styles.tablePaper} elevation={0}>
        <TableContainer>
          <Table className={styles.table} size="medium">
            <EnhancedTableHead
              cells={cells}
              numSelected={selectedProductsItems.length}
              order={order}
              onSelectAll={onSelectAllProductsItems}
              onSort={onSort}
              rowCount={items?.length || 0}
            />
            <TableBody>
              {(isLoading ? ([...Array(6)] as Immutable<ProductChefNullable[]>) : items).map((row, index) => {
                const isItemSelected = !!row && isSelected(Number(row.id));
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <ProductTableRow
                    key={labelId}
                    labelId={labelId}
                    isItemSelected={isItemSelected}
                    onActivateItem={onActivateItem}
                    onDeactivateItem={onDeactivateItem}
                    onSelectProductItem={onSelectProductItem}
                    isLoading={isLoading}
                    item={row}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {items && (
          <div className="d-flex justify-content-between p-20">
            <Pagination color="white" currentPage={currentPage} goToPage={onPaginationChange} pageCount={pageCount} />
            {isLoading ? (
              <Skeleton width="40px" />
            ) : (
              <Typography variant="subtitle1">
                {items.length === takeCount ? items.length * currentPage : totalItems}/{totalItems}
              </Typography>
            )}
          </div>
        )}
      </Paper>
    </div>
  );
};
