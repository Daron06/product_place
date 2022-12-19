import { Paper, TableCell, TableHead } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Skeleton } from '@material-ui/lab';
import { HeadCell } from 'components/EnhancedTableHead';
import { Result } from 'components/Result';
import format from 'date-fns/format';
import React from 'react';

import stylesAdminProduct from '../Products/AdminProducts.module.scss';
import { TextCell } from '../Table/cells/TextCell';
import styles from './AdminProfile.module.scss';

interface AdminOrdersTableProps {
  orders?: any;
  cells?: HeadCell[];
}

const cellsWidth = {
  0: { width: '40%' },
  1: { width: '30%' },
  2: { width: '15%' },
  3: { width: '15%' },
};

const ordersReplacement = [
  {
    id: '#23123',
    status: 'successful',
    date: '2011-10-05T14:48:00.000Z',
    price: 1233,
  },
  {
    id: '#23123',
    status: 'failure',
    date: '2011-10-05T14:48:00.000Z',
    price: 1233,
  },
];

export const AdminAccountingTable: React.FC<AdminOrdersTableProps> = ({ orders }): React.ReactElement | null => {
  if (orders && !ordersReplacement.length) {
    return <Result title="Order is empty" status="empty" />;
  }

  return (
    <Paper elevation={0}>
      <TableContainer className={styles.adminTable}>
        <Table size="medium">
          <TableHead>
            <TableRow>
              {['Type', 'Date', 'Value', 'Status'].map((headCell, index) => (
                <TableCell key={headCell} classes={{ root: stylesAdminProduct.tableCell }} style={cellsWidth[index]}>
                  {headCell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(!ordersReplacement.length ? [...Array(1)] : ordersReplacement).map(
              (row): React.ReactElement => {
                return (
                  <TableRow className={styles.tableRow} key={row?.id}>
                    <td>
                      {!ordersReplacement.length ? (
                        <Skeleton width="100px" height="50px" />
                      ) : (
                        <>
                          <div className="d-flex align-items-center">
                            {row.status === 'successful' ? (
                              <div className={styles.adminTableOrder}>
                                <svg
                                  width="13"
                                  height="12"
                                  viewBox="0 0 13 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.77419 1H12M12 1V9.3871M12 1L1 11"
                                    stroke="#1CBD8D"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Credit. Order <span className="text-secondary">{row.id}</span>
                              </div>
                            ) : (
                              <div className={styles.adminTableOrder}>
                                <svg
                                  width="11"
                                  height="12"
                                  viewBox="0 0 11 12"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10.5 2.27419L10.5 11.5M10.5 11.5L2.1129 11.5M10.5 11.5L0.5 0.5"
                                    stroke="#373737"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                Disbursement {row.id}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </td>

                    <TableCell>
                      <div className="d-flex align-items-center">
                        {!ordersReplacement.length ? (
                          <Skeleton variant="text" width={70} />
                        ) : (
                          <span>{format(new Date(row.date), 'd MMM Y')}</span>
                        )}
                      </div>
                    </TableCell>
                    <TextCell isLoading={!ordersReplacement.length}>{`AED ${row?.price}`}</TextCell>

                    <TextCell isLoading={!ordersReplacement.length}>{row?.status}</TextCell>
                  </TableRow>
                );
              },
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
