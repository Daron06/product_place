import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import format from 'date-fns/format';
import React from 'react';
import { OrderItem } from 'services/api/admin/OrdersApi';
import { IconType } from 'services/types';
import { convert24To12Format } from 'utils/date/bookingDateFormat';

export const SraffOrderDeliveryDate: React.FC<{
  data?: OrderItem['date'];
  loading: boolean;
  type?: IconType;
  time?: string;
}> = ({ data, loading, type, time }): React.ReactElement => {
  return (
    <Paper elevation={0} className="p-20">
      <Typography className="fw-bold fz-large-18" style={{ marginBottom: 15 }}>
        {type === 'masterClass' || type === 'chefTable' ? 'Meeting date' : 'Delivery date'}
      </Typography>
      <Typography>{loading ? <Skeleton width={70} /> : data && format(new Date(data), 'EEEE dd MMM yyyy')}</Typography>
      {type === 'masterClass' || type === 'chefTable' ? (
        <Typography>{loading ? <Skeleton width={50} /> : time && convert24To12Format(time)}</Typography>
      ) : (
        <Typography>{loading ? <Skeleton width={50} /> : data && format(new Date(data), 'hh:mm a')}</Typography>
      )}
    </Paper>
  );
};
