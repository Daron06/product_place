import MuiMenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { EnhancedTableHead, HeadCell } from 'components/EnhancedTableHead';
import { Pagination } from 'components/Pagination';
import { ProductStatusDropdown } from 'components/ProductStatus';
import { TableLayout } from 'layouts/TableLayout';
import { useRouter } from 'next/router';
import React from 'react';
import { ImmutableSupplierChefsState } from 'redux/ducks/admin/supplier/chefs/types/state';

import { TableOrder } from '../../../../hooks/useProductsTable';
import styles from '../Products/AdminProducts.module.scss';
import { SelectItemCell } from '../Table/cells/SelectItemCell';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

export interface AdminTableProps {
  onPaginationChange: (page: number) => void;
  onSelectItem: (ids: number) => void;
  onActivateItem: (id: number) => void;
  onDeactivateItem: (id: number) => void;
  onSelectAllItems: () => void;
  onSort: (property: HeadCell['id']) => void;
  order: TableOrder;
  pageCount: number;
  currentPage: number;
  selectedItems: number[];
  totalItems: number;
  isLoading?: boolean;
  cells?: HeadCell[];
}

interface SupplierChefsTableProps extends AdminTableProps {
  items: ImmutableSupplierChefsState['items'];
}

const cellsWidth = {
  0: { width: '5%' },
  1: { width: '80%' },
  2: { width: '5%' },
  3: { width: '10%' },
};

export const SupplierChefsTable: React.FC<SupplierChefsTableProps> = ({
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
}): React.ReactElement | null => {
  const router = useRouter();

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
            cellsWidth={cellsWidth}
            numSelected={selectedItems.length}
            order={order}
            onSelectAll={onSelectAllItems}
            onSort={onSort}
            rowCount={items?.length || 0}
          />
          <TableBody>
            {/* TODO: Поправить типизацию. Убрать any */}
            {/* @ts-ignore */}
            {(isLoading ? [...Array(6)] : items).map(
              (row, index): React.ReactElement => {
                const isItemSelected = !!row && isSelected(Number(row.id));
                const labelId = `enhanced-table-${index}`;

                return (
                  <TableRow
                    aria-checked={isItemSelected}
                    hover
                    key={labelId}
                    role="checkbox"
                    selected={isItemSelected}
                    tabIndex={-1}
                  >
                    <SelectItemCell
                      isLoading={isLoading}
                      isItemSelected={isItemSelected}
                      onSelectItem={(): void => onSelectItem(Number(row.id))}
                    />
                    <TextCell isLoading={isLoading}>{row?.id ?? null}</TextCell>
                    <TextWidthImageСell
                      href={router.asPath}
                      id={row?.id}
                      name={row?.name}
                      image={row?.image}
                      imageStyle={{ height: 25, width: 25 }}
                      isLoading={isLoading}
                    />
                    <TextCell color="secondary" classes={{ text: 'fw-bold' }} isLoading={isLoading}>
                      12
                    </TextCell>
                    <TableCell>
                      {isLoading ? (
                        <Skeleton width={67} height={33} />
                      ) : (
                        <ProductStatusDropdown status={row.status}>
                          <MuiMenuItem onClick={(): void => onDeactivateItem(Number(row.id))}>Block</MuiMenuItem>
                          <MuiMenuItem onClick={(): void => onActivateItem(Number(row.id))}>Active</MuiMenuItem>
                        </ProductStatusDropdown>
                      )}
                    </TableCell>
                  </TableRow>
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
