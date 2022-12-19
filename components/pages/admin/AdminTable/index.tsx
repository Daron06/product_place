import MuiMenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { EnhancedTableHead, EnhancedTableProps } from 'components/EnhancedTableHead';
import { sortTable } from 'components/pages/admin/Products/helpers';
import { SectionHeader } from 'components/pages/admin/SectionHeader';
import { Pagination } from 'components/Pagination';
import { TableLayout } from 'layouts/TableLayout';
import React from 'react';
import { AdminEndpoints } from 'services/api/endpoints';
import { OrderStatus } from 'services/api/OrderApi';
import { DashboardRole, GetPromiseReturnType, StatusEnum } from 'services/types';

import { TableItem, useTable, UseTableProps } from '../../../../hooks/useTable';
import { ProductStatusDropdown } from '../../../ProductStatus';
import styles from '../Products/AdminProducts.module.scss';
import { SelectItemCell } from '../Table/cells/SelectItemCell';
import { TextCell } from '../Table/cells/TextCell';

interface AdminOrdersTableProps {
  role: DashboardRole | AdminEndpoints;
  take?: number;
  columnsWidth: string[];
  columns?: EnhancedTableProps['cells'];
  children: (items: Record<string, unknown>, isLoading: boolean) => React.ReactNode;
  api: UseTableProps<TableItem>['api'];
  sectionTitle: string;
  possibleStatuses?: OrderStatus[];
  itemsType?: string;
}

export function AdminTable({
  role,
  children,
  columnsWidth,
  columns,
  api,
  take = 10,
  sectionTitle,
  possibleStatuses,
  itemsType,
}: AdminOrdersTableProps): JSX.Element | null {
  const {
    items,
    orderBy,
    selectedIds,
    selectItem,
    selectAll,
    sortItems,
    hasSelected,
    isLoading,
    currentPage,
    setPage,
    totalCount,
    cells,
    onActivateItem,
    onDeactivateItem,
    onRemoveItem,
    onStatusChange,
  } = useTable({
    role,
    api,
    take,
  });

  if (!cells || !columns) {
    return null;
  }

  const rows = isLoading ? Array.from<typeof items[0] | undefined>({ length: take }) : sortTable(items, orderBy);

  return (
    <div className="content ml-30 mt-30 mr-30">
      <SectionHeader
        title={sectionTitle}
        onActivate={selectedIds.size && api.activate ? (): void => onActivateItem([...selectedIds]) : undefined}
        onDeactivate={selectedIds.size && api.deactivate ? (): void => onDeactivateItem([...selectedIds]) : undefined}
        onDelete={selectedIds.size && api.delete ? (): void => onRemoveItem([...selectedIds]) : undefined}
      />
      <TableLayout isEmpty={!isLoading && !items?.length}>
        <TableContainer>
          <Table className={styles.table} size="medium">
            <EnhancedTableHead
              cells={columns || cells}
              cellsWidth={columnsWidth.reduce(
                (prev, cur, index) => ({
                  ...prev,
                  [index]: { width: cur },
                }),
                {},
              )}
              numSelected={selectedIds.size}
              order={orderBy}
              onSelectAll={selectAll}
              onSort={sortItems}
              rowCount={items?.length || 0}
            />
            <TableBody>
              {rows.map((row, index) => {
                const item = row as GetPromiseReturnType<typeof api['getAll']>['items'][0];
                const isItemSelected = !!item && hasSelected(Number(item.id));
                const key = item?.id || index;
                let currentStatus = item?.status;

                if (
                  role !== DashboardRole.STAFF &&
                  (item?.parentStatus === StatusEnum.PENDING || item?.parentStatus === StatusEnum.DISABLED)
                ) {
                  currentStatus = StatusEnum.PENDING;
                }
                return (
                  <TableRow
                    key={key}
                    role="checkbox"
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    hover
                  >
                    <SelectItemCell
                      isLoading={isLoading}
                      isItemSelected={isItemSelected}
                      onSelectItem={item ? (): void => selectItem(Number(item.id)) : undefined}
                    />
                    {isLoading ? (
                      <>{columns?.map((column) => column && <TextCell key={column.id} isLoading={isLoading} />)}</>
                    ) : (
                      children(item, isLoading)
                    )}
                    {item?.status && itemsType !== 'blog' && (
                      <TableCell>
                        {!possibleStatuses ? (
                          <>
                            {isLoading ? (
                              <Skeleton width={67} height={33} />
                            ) : (
                              <ProductStatusDropdown status={currentStatus} role={role}>
                                <MuiMenuItem onClick={(): void => onDeactivateItem([Number(item.id)])}>
                                  Disable
                                </MuiMenuItem>
                                <MuiMenuItem onClick={(): void => onActivateItem([Number(item.id)])}>
                                  Active
                                </MuiMenuItem>
                              </ProductStatusDropdown>
                            )}
                          </>
                        ) : (
                          <>
                            {isLoading ? (
                              <Skeleton width={67} height={33} />
                            ) : (
                              <ProductStatusDropdown status={item.status} role={role}>
                                {possibleStatuses
                                  .filter((el) => el !== 'pending')
                                  .map((status) => (
                                    <MuiMenuItem
                                      key={status}
                                      onClick={(): void => onStatusChange(Number(item.id), status)}
                                    >
                                      {status}
                                    </MuiMenuItem>
                                  ))}
                              </ProductStatusDropdown>
                            )}
                          </>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        {items && totalCount > 1 && (
          <div className="d-flex justify-content-between p-20">
            <Pagination
              color="white"
              currentPage={currentPage}
              goToPage={setPage}
              pageCount={totalCount && Math.ceil(totalCount / take)}
            />
            {!isLoading ? (
              <Typography variant="subtitle1">
                {take * currentPage - (take - items.length)} / {totalCount}
              </Typography>
            ) : (
              <Skeleton width="40px" variant="text" />
            )}
          </div>
        )}
      </TableLayout>
    </div>
  );
}
