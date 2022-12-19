import { Avatar, Paper } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { Result } from 'components/Result';
import { StatusInfo } from 'components/StatusInfo';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import format from 'date-fns/format';
import adminLayoutStyles from 'layouts/AdminLayout/AdminLayout.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { OrderItem, OrdersApi } from 'services/api/admin/OrdersApi';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole } from 'services/types';
import { getCellsByEndpoint } from 'utils/getCellsByEndpoint';

import { SraffOrderDeliveryDate } from '../staff/orders/SraffOrderDeliveryDate';
import { StaffOrderShippingAddress } from '../staff/orders/StaffOrderShippingAddress';
import TableCellRole from '../StatisticDashboard/components/OrdersTable/TableCellRole';
import styles from './AdminOrderDetails.module.scss';
import { TableOrder } from './TableOrder';

type AdminOrderDetailsProps = {
  role: DashboardRole;
};

export const AdminOrderDetails: React.FC<AdminOrderDetailsProps> = ({ role }): React.ReactElement => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [order, setOrder] = React.useState<OrderItem>();

  const cells = getCellsByEndpoint(AdminEndpoints.ORDERS);
  const { query } = useRouter();

  React.useEffect(() => {
    (async (): Promise<void> => {
      setLoading(true);
      try {
        setOrder(await OrdersApi.getOrderById(Number(query.id)));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (!loading && !order) {
    return (
      <div>
        <Result title="Order not found" status="empty" />
      </div>
    );
  }

  return (
    <div className="p-30">
      <div className="mb-20">
        {loading ? (
          <div className="d-flex">
            <Skeleton width="50px" height="60px" className="mr-15" />
            <Skeleton width="550px" height="60px" />
          </div>
        ) : (
          <div className={styles.header}>
            <Link href={`/admin/${role}/orders`}>
              <Button variant="outlined" className={adminLayoutStyles.backButton}>
                <Icon type="arrow-left" />
              </Button>
            </Link>
            <h4>Order #{order?.id}</h4>
            {order && <TableCellRole type={order.types[0].type} />}
            <span>{order?.date && format(new Date(order?.createdAt), 'EEEE dd MMM yyyy hh:mm a')}</span>
            {role === DashboardRole.SUPPLIER && (
              <div className="d-flex align-items-center">
                <p className="pr-10">Chef:</p>
                <Avatar style={{ height: 25, width: 25 }} src={order?.products[0].chef?.image} />
                <span className="pl-10">{order?.products[0].chef?.name}</span>
              </div>
            )}

            {role === DashboardRole.CHEF && order?.supplier?.name && (
              <div className="d-flex align-items-center">
                <p className="pr-10">Supplier:</p>
                <Avatar style={{ height: 25, width: 25 }} src={order?.supplier?.image} />
                <span className="pl-10">{order?.supplier?.name}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="d-flex">
        <div className={styles.orderBlock}>
          <TableOrder order={order} isLoading={loading} cells={cells} role={role} />
          {role === DashboardRole.CHEF && (
            <>
              {order?.status !== 'canceled' && (
                <>
                  {(order?.types[0]?.type === 'chefTable' || order?.types[0]?.type === 'masterClass') &&
                    order?.address?.type !== 'recorded' && (
                      <>
                        <div className="mt-20 mb-20">
                          <StaffOrderShippingAddress data={order?.address} urlMeeting={order?.url} loading={loading} />
                        </div>
                        <SraffOrderDeliveryDate
                          time={order?.productDate?.from}
                          data={order?.date}
                          type={order?.types[0]?.type}
                          loading={loading}
                        />
                      </>
                    )}
                </>
              )}
              <Paper elevation={0} className="p-20 mt-20">
                {loading ? (
                  <>
                    <Skeleton width="200px" height="30px" />
                    <Skeleton width="400px" height="20px" />
                  </>
                ) : (
                  <>
                    <span className="fw-bold fz-large-18">Order history</span>
                    <div className="d-flex justify-content-between pt-30">
                      <span>
                        <strong>Order #{order?.id}</strong> the order has been sent
                      </span>
                      <span style={{ opacity: 0.6 }}>
                        {order?.createdAt && format(new Date(order?.createdAt), 'EEEE dd MMM yyyy hh:mm a')}
                      </span>
                    </div>
                  </>
                )}
              </Paper>
            </>
          )}
          {(role === DashboardRole.SUPPLIER || role === DashboardRole.CLOUD_KITCHEN) &&
            (loading ? (
              <Paper elevation={0} className="pt-20 pb-20 pl-20 pr-20 mt-20">
                <Skeleton width="200px" height="30px" />
                <Skeleton width="400px" height="20px" />
              </Paper>
            ) : (
              order?.instructions && (
                <Paper elevation={0} className="pt-20 pb-20 pl-20 pr-20 mt-20">
                  <span className="fw-bold fz-large-18">Special Instructions</span>
                  <p>{order?.instructions}</p>
                </Paper>
              )
            ))}
        </div>

        <div className="ml-30" style={{ width: 310 }}>
          {role === DashboardRole.SUPPLIER && (
            <>
              {order?.status && (
                <WhiteBlock title="Status">
                  <div className={clsx(styles.status, styles[`${order?.status}`])}>
                    <StatusInfo type={order.status} />
                  </div>
                </WhiteBlock>
              )}
            </>
          )}
          {role !== DashboardRole.CHEF ? (
            <Paper elevation={0} className="p-20">
              {loading ? (
                <>
                  <Skeleton />
                  <Skeleton />
                  <Skeleton />
                </>
              ) : (
                <>
                  <span className="fw-bold fz-large-18 pb-20 d-ib">Shipping information</span>
                  <div className={styles.orderTracking}>
                    <span>Tracking number</span>
                    <span>{order?.trackId}</span>
                  </div>
                  {/* <div className={styles.orderTrack} onClick={onOpenTrack}>
                    <span>Track order</span>
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9.66667 1L14 5.5M14 5.5L9.66667 10M14 5.5H1"
                        stroke="#1CBD8D"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <TrackOrder open={trackOpen} onClose={onOpenTrack} /> */}
                </>
              )}
            </Paper>
          ) : (
            <>
              {order?.status && (
                <WhiteBlock title="Status">
                  <div className={clsx(styles.status, styles[`${order?.status}`])}>
                    <StatusInfo type={order.status} />
                  </div>
                </WhiteBlock>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
