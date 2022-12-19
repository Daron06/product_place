import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { OrderItem } from 'services/api/admin/OrdersApi';

export const StaffOrderCustomerInfo: React.FC<{ data?: OrderItem['contact']; loading: boolean }> = ({
  data,
  loading,
}) => {
  return (
    <Paper elevation={0} className="p-20">
      <Typography className="fw-bold fz-large-18 mb-20">Customer information</Typography>
      <div className="d-flex">
        <Avatar style={{ width: 65, height: 65 }} />
        <div className="d-flex flex-column ml-15">
          <Typography className="fw-bold" style={{ marginBottom: 5 }}>
            {loading ? <Skeleton width={100} /> : `${data?.firstName} ${data?.lastName}`}
          </Typography>
          <Typography style={{ marginBottom: 5 }}> {loading ? <Skeleton width={80} /> : data?.email}</Typography>
          <Typography style={{ marginBottom: 5 }}>{loading ? <Skeleton width={80} /> : data?.phone}</Typography>
        </div>
      </div>
    </Paper>
  );
};
