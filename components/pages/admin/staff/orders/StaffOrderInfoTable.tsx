import { TableRow } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { OrderItem, OrderProduct } from 'services/api/admin/OrdersApi';

import styles from './StaffOrderDetails.module.scss';

interface StaffOrderInfoTableProps {
  delivery?: OrderItem['delivery'];
  loading: boolean;
  products?: OrderProduct[];
  summary?: OrderItem['summary'];
  total?: OrderItem['total'];
  vat?: OrderItem['vat'];
  guests?: {
    children: number;
    adults: number;
  };
}

export const StaffOrderInfoTable: React.FC<StaffOrderInfoTableProps> = ({
  delivery,
  loading,
  products,
  summary,
  total,
  vat,
  guests,
}): React.ReactElement => {
  return (
    <Paper elevation={0}>
      <Table className={styles.staffOrderInfoTable}>
        <TableHead>
          <TableRow>
            <TableCell className={styles.headText}>Product</TableCell>
            <TableCell className={styles.headText}>Price</TableCell>
            <TableCell className={styles.headText}>Adults</TableCell>
            <TableCell className={styles.headText}>Children</TableCell>
            <TableCell className={styles.headText}>Quantity</TableCell>
            <TableCell className={styles.headText}>Subtotal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell>
                <div className="d-flex align-items-center">
                  <Skeleton variant="rect" style={{ borderRadius: 8, marginRight: 30 }} width={45} height={45} />
                  <div className="d-flex flex-column">
                    <Skeleton variant="text" width={245} />
                    <Skeleton variant="text" width={45} />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" width={50} />
              </TableCell>
            </TableRow>
          ) : (
            products?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="d-flex align-items-center">
                    <Avatar className="mr-10" src={item.image} style={{ borderRadius: 8 }} />
                    <div className="d-flex flex-column">
                      <Typography className="fw-bold">{item.name}</Typography>
                      {item.options?.length ? (
                        item.options.map((option) => (
                          <div key={option.id} className="d-flex align-items-center">
                            <Typography className="text-color-600" component="span">
                              Code: {option.sku || item.sku || '---'}, {option.name} - {option?.quantity}
                            </Typography>
                          </div>
                        ))
                      ) : (
                        <Typography className="text-color-600" component="span">
                          {item.sku}
                        </Typography>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>AED {item.price}</TableCell>
                <TableCell>{guests?.adults ?? '---'}</TableCell>
                <TableCell>{guests?.children ?? '---'}</TableCell>
                <TableCell>{guests ? '---' : item.quantity}</TableCell>
                <TableCell>AED {item.total}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <div className="p-20">
        <ul className="d-flex flex-column align-items-end">
          <li className="d-flex">
            <Typography component="span" className="fz-large-14 text-color-700">
              Order Summary
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {loading ? <Skeleton variant="text" width={100} /> : `AED ${summary}`}
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              Delivery
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {loading ? <Skeleton variant="text" width={100} /> : `AED ${delivery}`}
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              VAT 5%
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30">
              {loading ? <Skeleton variant="text" width={100} /> : `AED ${vat}`}
            </Typography>
          </li>
          <li className="d-flex mt-10">
            <Typography component="span" className="fz-large-14 text-color-700">
              Total
            </Typography>
            <Typography component="span" className="fz-large-14 ml-30 fw-bold">
              {loading ? <Skeleton variant="text" width={100} /> : `AED ${total}`}
            </Typography>
          </li>
        </ul>
      </div>
    </Paper>
  );
};
