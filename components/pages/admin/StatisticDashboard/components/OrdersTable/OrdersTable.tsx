import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Skeleton } from '@material-ui/lab';
import { TextWidthImageСell } from 'components/pages/admin/Table/cells/TextWidthImageСolumn';
import { ProductStatusDropdown } from 'components/ProductStatus';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import format from 'date-fns/format';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderItem } from 'services/api/admin/OrdersApi';
import { DashboardRole } from 'services/types';

import styles from './OrdersTable.module.scss';
import TableCellRole from './TableCellRole';

interface OrdersTableProps {
  items?: OrderItem[];
  isLoading: boolean;
  role: DashboardRole;
}

export const OrdersTable: React.FC<OrdersTableProps> = ({ items, isLoading, role }) => {
  const rows = isLoading ? [...Array(5)] : items;
  const router = useRouter();

  if (!rows) {
    return null;
  }

  return (
    <WhiteBlock className={styles.orderTableWhiteBlock}>
      <div className={styles.orderTable}>
        <h4 className={styles.orderTableTitle}>Recent orders</h4>
        <Table size="small">
          <TableHead classes={{ root: styles.orderTableHead }}>
            <TableRow>
              <TableCell className={styles.orderTableCell}>Order</TableCell>
              {role !== DashboardRole.CLOUD_KITCHEN && <TableCell className={styles.orderTableCell}>Type</TableCell>}
              {role === DashboardRole.CHEF ? (
                <TableCell className={styles.orderTableCell}>Supplier</TableCell>
              ) : (
                <TableCell className={styles.orderTableCell}>Chef</TableCell>
              )}
              <TableCell className={styles.orderTableCell}>Date</TableCell>
              <TableCell className={styles.orderTableCell}>Amount</TableCell>
              <TableCell className={styles.orderTableCell}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={!isLoading ? row.id : index} className={styles.orderTableRow} hover>
                {isLoading ? (
                  <TableCell component="th" scope="row">
                    <Skeleton width={30} height={20} className="ml-10" />
                  </TableCell>
                ) : (
                  <TableCell component="th" scope="row">
                    <Link href={`${router.asPath}/orders/${row.id}`}>
                      <a href={`${router.asPath}/orders/${row.id}`}>
                        <div className="d-flex pl-20">#{row.id}</div>
                      </a>
                    </Link>
                  </TableCell>
                )}

                {role !== DashboardRole.CLOUD_KITCHEN && (
                  <TableCell className={styles.orderTableTypeName}>
                    {isLoading ? (
                      <Skeleton width={50} height={20} />
                    ) : (
                      row.types.map((el) => {
                        return <TableCellRole key={el.id} type={el.type} />;
                      })
                    )}
                  </TableCell>
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
                            id={row?.chefs[0].id}
                            name={row?.chefs[0].name}
                            image={row?.chefs[0].image}
                            imageStyle={{ height: 25, width: 25 }}
                            isLoading={isLoading}
                          />
                        ) : (
                          <>
                            {row.supplier?.name ? (
                              <>
                                <Avatar
                                  alt={row.supplier?.name}
                                  className={styles.orderTableAvatar}
                                  src={row.supplier?.image}
                                />
                                <span className={styles.orderTableTypeName}>{row.supplier?.name}</span>
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
                <TableCell>
                  {isLoading ? <Skeleton width={70} height={20} /> : format(new Date(row.date), 'd MMM Y')}
                </TableCell>
                <TableCell>{isLoading ? <Skeleton width={70} height={20} /> : <>AED {row.total}</>}</TableCell>
                <TableCell>
                  {isLoading ? (
                    <Skeleton width={80} height={25} />
                  ) : (
                    <ProductStatusDropdown status={row.status} editable={false} />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </WhiteBlock>
  );
};
