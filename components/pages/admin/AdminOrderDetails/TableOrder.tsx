import { Avatar, Paper, TableCell, TableHead, Typography } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Skeleton } from '@material-ui/lab';
import { HeadCell } from 'components/EnhancedTableHead';
import { Result } from 'components/Result';
import React from 'react';
import { OrderItem, OrderProduct } from 'services/api/admin/OrdersApi';
import { DashboardRole } from 'services/types';

import stylesAdminProduct from '../Products/AdminProducts.module.scss';
import { TextCell } from '../Table/cells/TextCell';
import styles from './AdminOrderDetails.module.scss';
import { AdminOrderSummary } from './AdminOrderSummary';

interface AdminOrdersTableProps {
  order?: OrderItem;
  isLoading: boolean;
  cells?: HeadCell[];
  role?: DashboardRole;
}

const cellsWidth = {
  0: { width: '50%' },
  1: { width: '20%' },
  2: { width: '10%' },
  3: { width: '10%' },
  4: { width: '10%' },
};

export const TableOrder: React.FC<AdminOrdersTableProps> = ({
  order,
  isLoading = true,
  cells,
  role,
}): React.ReactElement | null => {
  if (!order) {
    return null;
  }

  if (!isLoading && order && !order.products.length) {
    return <Result title="Order is empty" status="empty" />;
  }

  return (
    <Paper elevation={0}>
      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {cells?.map((headCell, index) => (
                <TableCell key={headCell.id} classes={{ root: stylesAdminProduct.tableCell }} style={cellsWidth[index]}>
                  {headCell.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(isLoading ? [...Array(1)] : order.products).map(
              (row: OrderProduct | undefined): React.ReactElement => {
                return (
                  <TableRow className={styles.tableRow} key={row?.id}>
                    <td className="pl-20">
                      {isLoading ? (
                        <Skeleton width="100px" height="50px" />
                      ) : (
                        <>
                          <div className="d-flex align-items-center">
                            <Avatar src={row?.image} className={styles.productImage} />
                            <div className="d-flex flex-column pl-10">
                              <span className="fw-bold">{row?.name}</span>
                              {row?.options?.length ? (
                                row?.options.map((option) => (
                                  <div key={option.id} className="d-flex align-items-center">
                                    <Typography className="text-color-600" component="span">
                                      Code: {option.sku || row.sku || '---'}, {option.name} - {option?.quantity}
                                    </Typography>
                                  </div>
                                ))
                              ) : (
                                <Typography className="text-color-600" component="span">
                                  {row?.sku}
                                </Typography>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                    <TextCell isLoading={isLoading}>{`AED ${
                      role === DashboardRole.CHEF ? row?.chefPrice : row?.supplierPrice
                    }`}</TextCell>
                    <TextCell isLoading={isLoading}>{`AED ${row?.price}`}</TextCell>
                    <TableCell>
                      <div className="d-flex align-items-center">
                        {isLoading ? (
                          <Skeleton variant="text" width={Math.round(Math.random() * 70) + 100} />
                        ) : (
                          <span style={{ margin: '0 auto' }}>{row?.quantity}</span>
                        )}
                      </div>
                    </TableCell>

                    <TextCell isLoading={isLoading}>{`AED ${row?.total}`}</TextCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <AdminOrderSummary
        loading={isLoading}
        summary={order?.summary}
        delivery={order?.delivery}
        vat={order?.vat}
        total={order?.total}
      />
    </Paper>
  );
};
