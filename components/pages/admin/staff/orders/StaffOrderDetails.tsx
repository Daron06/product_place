import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { GoToLink } from 'components/GoToLink';
import { OrderTypeIcons } from 'components/OrderTypeIcons';
import { Select } from 'components/Select';
import { TrackOrderModal } from 'components/TrackOrderModal';
import format from 'date-fns/format';
import React from 'react';
import { OrderItem, OrdersApi } from 'services/api/admin/OrdersApi';

import { OrderStatus } from '../../../../../services/api/OrderApi';
import { AdminGoBackButton } from '../../AdminGoBackButton';
import { OrderPaymentInfo } from './OrderPaymentInfo';
import { SraffOrderDeliveryDate } from './SraffOrderDeliveryDate';
import { StaffOrderCustomerInfo } from './StaffOrderCustomerInfo';
import styles from './StaffOrderDetails.module.scss';
import { StaffOrderInfoTable } from './StaffOrderInfoTable';
import { StaffOrderShippingAddress } from './StaffOrderShippingAddress';

export const staffOrderStatus = [
  OrderStatus.PENDING,
  OrderStatus.COMPLETED,
  OrderStatus.RETURNED,
  OrderStatus.CANCELED,
  OrderStatus.PROCESSING,
];

export const StaffOrderDetails: React.FC<{ order: OrderItem }> = ({ order }): React.ReactElement => {
  const [loading, setIsLoading] = React.useState(false);
  const [openTrackOrderModal, setTrackOrderModal] = React.useState<boolean>(false);

  const handleOrderStatusChange = async (
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
  ): Promise<void> => {
    setIsLoading(true);
    try {
      if (!order) {
        throw new Error('Error');
      }
      await OrdersApi.changeStatus([Number(order.id)], event.target.value as OrderStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="p-30">
      <div className="d-flex align-items-center mb-20">
        <AdminGoBackButton />
        <Typography className="fw-bold d-flex ml-20" variant="h4">
          Order {loading ? <Skeleton className="ml-10" width={100} /> : `#${order?.id}`}
        </Typography>
        <Divider className="ml-20 mr-20" orientation="vertical" style={{ height: 12, backgroundColor: '3e0e0e0' }} />
        <OrderTypeIcons OrderTypes={order?.types} />
        <Divider className="ml-20 mr-20" orientation="vertical" style={{ height: 12, backgroundColor: '#e0e0e0' }} />
        <Typography>
          {loading ? (
            <Skeleton width={140} />
          ) : (
            order !== null && format(new Date(order.createdAt), 'EEEE dd MMM yyyy hh:mm a')
          )}
        </Typography>
        <Divider className="ml-20 mr-20" orientation="vertical" style={{ height: 12, backgroundColor: '#e0e0e0' }} />
        <div className="d-flex align-items-center">
          {loading ? (
            <>
              <Skeleton variant="circle" width={25} height={25} />
              <Skeleton className="ml-10" variant="text" width={90} />
            </>
          ) : order?.supplier ? (
            <>
              <Typography className="mr-10 text-color-600">Supplier:</Typography>
              <Avatar src={order.supplier.image} style={{ width: 25, height: 25 }} />
              <Typography className="ml-10">{order.supplier.name}</Typography>
            </>
          ) : (
            (order?.types[0]?.type === 'masterClass' || order?.types[0]?.type === 'chefTable') && (
              <>
                <Typography className="mr-10 text-color-600">Chef:</Typography>
                <Avatar src={order?.products[0]?.chef.image} style={{ width: 25, height: 25 }} />
                <Typography className="ml-10">{order?.products[0]?.chef.name}</Typography>
              </>
            )
          )}
        </div>
      </div>
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          <StaffOrderInfoTable
            delivery={order?.delivery}
            products={order?.products}
            loading={loading}
            summary={order?.summary}
            vat={order?.vat}
            total={order?.total}
            guests={order?.data?.guests}
          />
          <div className={styles.detailsGrid}>
            <div>
              <StaffOrderCustomerInfo data={order?.contact} loading={loading} />
            </div>
            {order?.status !== 'canceled' && order?.address?.type !== 'recorded' && (
              <>
                <StaffOrderShippingAddress data={order?.address} urlMeeting={order?.url} loading={loading} />
                <SraffOrderDeliveryDate
                  time={order?.productDate?.from}
                  data={order?.date}
                  type={order?.types[0]?.type}
                  loading={loading}
                />
              </>
            )}
            {order?.instructions && (
              <Paper elevation={0} className="p-20">
                <Typography className="fw-bold fz-large-18 mb-20">Special Instructions</Typography>
                <div className="d-flex">
                  <div className="d-flex flex-column ml-15">
                    <Typography className="mb-5">{loading ? <Skeleton width={100} /> : order?.instructions}</Typography>
                  </div>
                </div>
              </Paper>
            )}
          </div>
        </section>
        <aside className="adminDataUpsertAsideGrid">
          <Paper elevation={0} className="p-20">
            <Typography className="fw-bold fz-large-18 mb-10">Status</Typography>
            {order && (
              <Select
                MenuProps={{
                  classes: { paper: styles.ordersSelect },
                }}
                defaultValue={String(order.status)}
                fullWidth
                items={staffOrderStatus.map((value) => ({ name: value[0].toUpperCase() + value.slice(1), value }))}
                name="status"
                onChange={handleOrderStatusChange}
              />
            )}
          </Paper>
          <Paper elevation={0} className="p-20">
            <Typography className="fw-bold fz-large-18 mb-10">Shipping information</Typography>
            <div>
              <Typography className="fz-large-13 mb-10">Tracking number</Typography>
              <Typography>{order?.trackId}</Typography>
            </div>
            {!!order?.tracking.length && (
              <div className="mt-20">
                <GoToLink text="Track order" onClick={(): void => setTrackOrderModal(true)} />
              </div>
            )}
          </Paper>
          <OrderPaymentInfo method={order?.checkout.payment.type} status={order?.checkout.status} />
        </aside>
      </div>
      {order && (
        <TrackOrderModal
          open={openTrackOrderModal}
          tracking={order.tracking}
          onClose={(): void => setTrackOrderModal(false)}
        />
      )}
    </div>
  );
};
