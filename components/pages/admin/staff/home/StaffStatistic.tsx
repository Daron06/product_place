import { Paper } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { StaffStatisticResponse, SupplierApi } from 'services/api/admin/SupplierApi';
import { DashboardRole } from 'services/types';

import { useIsLoading } from '../../../../../hooks/useIsLoading';
import { StatisticBlock } from '../../StatisticDashboard/components/StatisticBlock';
import styles from './StaffStatistic.module.scss';

export const StaffStatistic = (): React.ReactElement => {
  const [isLoading, loading, loaded] = useIsLoading();
  const [stats, setStats] = React.useState<StaffStatisticResponse | null>(null);

  React.useEffect(() => {
    (async (): Promise<void> => {
      loading();
      try {
        const data = await SupplierApi.getStatistics<StaffStatisticResponse>();
        setStats(data);
      } catch (error) {
        console.error('StatisticDashboard error', error);
      } finally {
        loaded();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-30">
      <Typography className="mb-30 fz-large-26 fw-bold" variant="h4">
        Dashboard
      </Typography>
      <div className={styles.statisticsBlocks}>
        <StatisticBlock
          color="#AD7CA8"
          className={styles.statisticsBlock}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Orders"
          type="orders"
          value={stats?.orders.pending || 0}
          loading={isLoading}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.orders.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <div className={styles.twoColumnBlock}>
          <Paper elevation={0} className="p-20 h-100">
            <div className="d-flex h-100">
              <div>
                <Typography className="fz-large-18 mb-15">Income</Typography>
                <Typography className="fw-bold" variant="h4">
                  AED {stats?.amount.income}
                </Typography>
              </div>
              <Divider className="ml-auto mr-30" orientation="vertical" style={{ backgroundColor: '#373737' }} />
              <div className="mr-auto">
                <Typography className="fz-large-18 mb-15">Sales</Typography>
                <Typography className="fz-large-18 fw-bold">AED {stats?.amount.sales}</Typography>
              </div>
            </div>
          </Paper>
        </div>
        <StatisticBlock
          color="#AD7CA8"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Suppliers"
          type="orders"
          value={stats?.suppliers.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.suppliers.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#7169D1"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Cloud Kitchens"
          type="cloudKitchen"
          value={stats?.kitchen.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.kitchen.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#46ADE7"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Chefs"
          type="chefs"
          value={stats?.chefs.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.chefs.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#AD7CA8"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Menu"
          type="menu"
          value={stats?.menu.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.menu.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#CA9341"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Recipes"
          type="recipes"
          value={stats?.recipies.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.recipies.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#B6B854"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Masterclasses"
          type="masterClass"
          value={stats?.masterClass.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.masterClass.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#B6B854"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Store"
          type="store"
          value={stats?.store.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.store.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#B6B854"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Chef’s Table"
          type="chefTable"
          value={stats?.chefTable.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.chefTable.total || 0}</Typography>
          </div>
        </StatisticBlock>
        <StatisticBlock
          color="#1CBD8D"
          className={styles.statisticsBlock}
          loading={isLoading}
          name="Pending"
          role={DashboardRole.STAFF}
          title="Warehouse"
          type="warehouse"
          value={stats?.warehouse.pending || 0}
        >
          <div className="d-flex align-items-center justify-content-between">
            <Typography className="text-color-600">Total</Typography>
            <Typography className="text-color-600">{stats?.warehouse.total || 0}</Typography>
          </div>
        </StatisticBlock>
      </div>
    </div>
  );
};
