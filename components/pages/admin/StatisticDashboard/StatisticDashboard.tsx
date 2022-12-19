import { Typography } from '@material-ui/core';
import stylesAdminProducts from 'components/pages/admin/Products/AdminProducts.module.scss';
import React from 'react';
import { StatisticsResponse, SupplierApi } from 'services/api/admin/SupplierApi';
import { DashboardRole } from 'services/types';

import { useIsLoading } from '../../../../hooks/useIsLoading';
import { OrdersTable } from './components/OrdersTable/OrdersTable';
import { StatisticBlock } from './components/StatisticBlock';
import styles from './StatisticDashboard.module.scss';

interface StatisticDashboardInterface {
  role: DashboardRole;
}

export const StatisticDashboard: React.FC<StatisticDashboardInterface> = ({ role }) => {
  const [isLoading, loading, loaded] = useIsLoading();
  const [stats, setStats] = React.useState<StatisticsResponse>();

  React.useEffect(() => {
    (async (): Promise<void> => {
      loading();
      try {
        setStats(await SupplierApi.getStatistics<StatisticsResponse>());
      } catch (error) {
        console.error('StatisticDashboard error', error);
      } finally {
        loaded();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="ml-30 mt-30 mr-30">
      <Typography className={stylesAdminProducts.rootTitle} variant="h6">
        Dashboard
      </Typography>
      {role === DashboardRole.CHEF ? (
        <div className={styles.statisticBlocksChef}>
          <StatisticBlock
            loading={isLoading}
            name="Total order"
            value={stats?.totalOrders || 0}
            type="orders"
            role={DashboardRole.CHEF}
          />
          <StatisticBlock
            loading={isLoading}
            name="Total sales"
            value={`AED ${stats?.totalSales || 0}`}
            type="sales"
            role={DashboardRole.CHEF}
          />
        </div>
      ) : (
        <div className={styles.statisticBlocks}>
          <StatisticBlock loading={isLoading} name="Total order" value={stats?.totalOrders || 0} type="orders" />
          <StatisticBlock loading={isLoading} name="Total sales" value={`AED ${stats?.totalSales || 0}`} type="sales" />
          <StatisticBlock loading={isLoading} name="Chefs" value={stats?.chefs || 0} type="chefs" />

          {role === DashboardRole.CLOUD_KITCHEN ? (
            <StatisticBlock loading={isLoading} name="Menu" value={stats?.items || 0} type="menu" />
          ) : (
            <StatisticBlock loading={isLoading} name="Items" value={stats?.items || 0} type="items" />
          )}
        </div>
      )}

      <div className={styles.orderTableSection}>
        <OrdersTable role={role} isLoading={isLoading} items={stats?.recent} />
        <div>
          <StatisticBlock
            className={styles.statsWithGraph}
            loading={isLoading}
            name="Current balance"
            value={`AED ${stats?.balance || 0}`}
          />
          <StatisticBlock
            className={styles.statsWithGraph}
            loading={isLoading}
            name="Balance withdrawals"
            value={`AED ${stats?.withdrawals || 0}`}
          />
        </div>
      </div>
    </div>
  );
};
