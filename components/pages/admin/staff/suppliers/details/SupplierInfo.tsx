import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';
import { StaffSupplierDetails } from 'redux/ducks/products/types/contracts';

interface SupplierInfoProps {
  data: StaffSupplierDetails['info'];
  title: string;
}

export const SupplierInfo: React.FC<SupplierInfoProps> = ({ data, title }) => {
  const normalizeDate = (date: string): string => new Intl.DateTimeFormat('en-US').format(new Date(date));
  return (
    <WhiteBlock title={title}>
      <ul>
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Registration date</Typography>
          <Typography className="fz-large-14">{normalizeDate(data.registeredAt)}</Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">First order</Typography>
          <Typography className="fz-large-14">{data.firstOrder ? normalizeDate(data.firstOrder) : '-'}</Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Last order</Typography>
          <Typography className="fz-large-14">{data.lastOrder ? normalizeDate(data.lastOrder) : '-'}</Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Orders</Typography>
          <Typography className="fz-large-14 fw-bold" color="secondary">
            {data.orders}
          </Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Meal Kits</Typography>
          <Typography className="fz-large-14 fw-bold" color="secondary">
            {data.mealKits}
          </Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Items</Typography>
          <Typography color="secondary" className="fz-large-14 fw-bold">
            {data.items}
          </Typography>
        </li>
        <Divider className="mt-15 mb-15" />
        <li className="d-flex align-items-center justify-content-between">
          <Typography className="text-color-600 fz-large-14">Total income</Typography>
          <Typography className="fz-large-14 fw-bold">{data.income ? `AED ${data?.income}` : 0}</Typography>
        </li>
      </ul>
    </WhiteBlock>
  );
};
