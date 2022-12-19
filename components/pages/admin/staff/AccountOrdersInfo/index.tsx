import Typography from '@material-ui/core/Typography';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import Link from 'next/link';
import React from 'react';

import styles from './AccountOrdersInfo.module.scss';

interface AccountOrdersInfoProps {
  type?: string;
  // TODO: Поправить типизацию
  orders: any[];
}

export const AccountOrdersInfo: React.FC<AccountOrdersInfoProps> = ({ type, orders }) => {
  return (
    <WhiteBlock title="Latest orders">
      {!orders.length ? (
        <Typography className="text-color-600">The {type} no have orders</Typography>
      ) : (
        <ul className={styles.list}>
          {orders.map((order) => (
            <li className="d-flex align-items-center justify-content-between" key={order.id}>
              <div className="d-flex flex-column">
                <Typography className="fz-large-14" color="secondary">
                  <Link href={`/admin/staff/orders/${order.id}`}>
                    <a href={`/admin/staff/orders/${order.id}`}>Order #{order.id}</a>
                  </Link>
                </Typography>
                <Typography className="fz-large-13 text-color-600">
                  {new Intl.DateTimeFormat('en-US').format(new Date(order.date))}
                </Typography>
              </div>
              <Typography className="fz-large-13 fw-bold">AED {order.total}</Typography>
            </li>
          ))}
        </ul>
      )}
    </WhiteBlock>
  );
};
