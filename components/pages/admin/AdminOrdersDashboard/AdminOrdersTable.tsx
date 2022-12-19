import Avatar from '@material-ui/core/Avatar';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { EnhancedTableHead } from 'components/EnhancedTableHead';
import { sortTable } from 'components/pages/admin/Products/helpers';
import { Pagination } from 'components/Pagination';
import { ProductStatusDropdown } from 'components/ProductStatus';
import format from 'date-fns/format';
import { TableLayout } from 'layouts/TableLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderItem } from 'services/api/admin/OrdersApi';
import { DashboardRole } from 'services/types';

import styles from '../Products/AdminProducts.module.scss';
import TableCellRole from '../StatisticDashboard/components/OrdersTable/TableCellRole';
import { AdminTableProps } from '../SupplierChefs/SupplierChefsTable';
import { SelectItemCell } from '../Table/cells/SelectItemCell';
import { TextCell } from '../Table/cells/TextCell';
import { TextWidthImageСell } from '../Table/cells/TextWidthImageСolumn';

interface AdminOrdersTableProps extends AdminTableProps {
  items: OrderItem[];
  role: DashboardRole;
}

const cellsWidth = {
  0: { width: '10%' },
  1: { width: '20%' },
  2: { width: '30%' },
  3: { width: '20%' },
  4: { width: '10%' },
  5: { width: '10%' },
};

export const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({
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
  const router = useRouter();
  const isSelected = (id: number): boolean => selectedItems.includes(id);

  if (!cells) {
    return null;
  }

  const rows = isLoading ? Array.from<OrderItem | undefined>({ length: 10 }) : sortTable(items, order);

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
            {rows.map((row, index) => {
              const isItemSelected = !!row && isSelected(Number(row.id));
              const key = row?.id || index;

              return (
                <TableRow
                  aria-checked={isItemSelected}
                  hover
                  key={key}
                  role="checkbox"
                  selected={isItemSelected}
                  tabIndex={-1}
                >
                  <SelectItemCell
                    isLoading={isLoading}
                    isItemSelected={isItemSelected}
                    onSelectItem={row ? (): void => onSelectItem(Number(row.id)) : undefined}
                  />
                  <TableCell component="th" scope="row">
                    {row?.id ? (
                      <Link href={`${router.asPath}/${row.id}`}>
                        <a href={`${router.asPath}/${row.id}`}>
                          <div className="d-flex">#{row.id}</div>
                        </a>
                      </Link>
                    ) : (
                      <Skeleton width={20} />
                    )}
                  </TableCell>

                  {role !== DashboardRole.CLOUD_KITCHEN && (
                    <TextCell isLoading={isLoading}>
                      {row ? row.types.map((obj) => <TableCellRole key={obj.id} type={obj.type} />) : null}
                    </TextCell>
                  )}
                  <TableCell>
                    <div className="d-flex align-items-center">
                      {isLoading ? (
                        <>
                          <Skeleton width={17} height={17} variant="circle" className="mr-5" />
                          <Skeleton width={50} height={20} />
                        </>
                      ) : (
                        <>
                          {role !== DashboardRole.CHEF ? (
                            <TextWidthImageСell
                              href={`/admin/${role}/chefs`}
                              id={row?.chefs[0]?.id}
                              name={row?.chefs[0]?.name}
                              image={row?.chefs[0]?.image}
                              imageStyle={{ height: 25, width: 25 }}
                              isLoading={isLoading}
                            />
                          ) : (
                            <>
                              {row?.supplier?.name ? (
                                <>
                                  <Avatar
                                    style={{ width: 22, height: 22, marginRight: 10 }}
                                    alt={row?.supplier?.name}
                                    src={row?.supplier?.image}
                                  />
                                  <span className={styles.orderTableTypeName}>{row?.supplier?.name}</span>
                                </>
                              ) : (
                                <span>---</span>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </TableCell>
                  {role === DashboardRole.CLOUD_KITCHEN && (
                    <TableCell>{isLoading ? <Skeleton width={70} height={20} /> : 'TJCYEND89'}</TableCell>
                  )}
                  <TextCell isLoading={isLoading}>{row?.date && format(new Date(row?.date), 'd MMM Y')}</TextCell>
                  <TextCell isLoading={isLoading}>{row?.total && `AED ${row?.total}`}</TextCell>
                  <TableCell>
                    {isLoading || !row ? (
                      <Skeleton width={67} height={33} />
                    ) : (
                      <ProductStatusDropdown status={row.status} editable={false} role={role}>
                        <MuiMenuItem onClick={(): void => onDeactivateItem(Number(row.id))}>Disable</MuiMenuItem>
                        <MuiMenuItem onClick={(): void => onActivateItem(Number(row.id))}>Active</MuiMenuItem>
                      </ProductStatusDropdown>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
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
