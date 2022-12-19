import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import format from 'date-fns/format';
import React from 'react';

interface CustomerInfoProps {
  ordersCount?: number;
  total?: number;
  birthdayDate?: string | null;
  registeredDate: string;
}

export const CustomerInfo: React.FC<CustomerInfoProps> = ({ ordersCount = 0, total, birthdayDate, registeredDate }) => {
  return (
    <WhiteBlock title="Customer info">
      <ul>
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Registration date</Typography>
          <Typography className="fz-large-14">{format(new Date(registeredDate), 'd/MM/yyyy')}</Typography>
        </li>
        {birthdayDate && (
          <>
            <Divider className="mt-15 mb-15" />
            <li className="d-flex align-items-center justify-content-between">
              <Typography className="text-color-600 fz-large-14">Birthday</Typography>
              <Typography className="fz-large-14">{format(new Date(birthdayDate), 'd/MM/yyyy')}</Typography>
            </li>
          </>
        )}
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Orders</Typography>
          <Typography className="fz-large-14 fw-bold" color="secondary">
            {ordersCount}
          </Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Total spend</Typography>
          <Typography className="fz-large-14 fw-bold">AED {total}</Typography>
        </li>
      </ul>
    </WhiteBlock>
  );
};
