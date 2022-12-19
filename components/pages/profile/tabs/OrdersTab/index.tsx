/* eslint-disable no-param-reassign */
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Skeleton from '@material-ui/lab/Skeleton';
import { Pagination } from 'components/Pagination';
import { TabPanel } from 'components/TabPanel';
import React from 'react';
import { IOrderItem, OrderApi } from 'services/api/OrderApi';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { ProfileTabTitle } from '../../ProfileTabTitle';
import styles from './OrdersTab.module.scss';
import { ProfileOrders } from './ProfileOrders';

export const OrdersTab: React.FC = (): React.ReactElement => {
  const { t } = useTranslate('profile');
  const [activeTab, setActiveTab] = React.useState<string>('');
  const [orders, setOrders] = React.useState<IOrderItem[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [totalCount, setTotalCount] = React.useState<number>(0);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const TAKE = 5;

  React.useEffect(() => {
    (async (): Promise<void> => {
      setLoading(false);

      const response = await OrderApi.getAllByType(
        activeTab ? { status: activeTab, take: TAKE, page: currentPage } : { take: TAKE, page: currentPage },
      );
      setOrders(response.items);
      setTotalCount(response.meta.total);
      setLoading(true);
    })();
  }, [activeTab, currentPage]);

  const handleTabsChange = (_: unknown, newValue: string): void => {
    setCurrentPage(1);
    setActiveTab(newValue);
  };

  return (
    <>
      <ProfileTabTitle value={t('orders.title')} />
      <div className={styles.orders}>
        <div className={styles.tabs}>
          <Tabs
            TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
            indicatorColor="primary"
            onChange={handleTabsChange}
            value={activeTab}
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab label={t('orders.tabs.all')} value="" />
            <Tab label={t('orders.tabs.pending')} value="pending" />
            <Tab label={t('orders.tabs.approved')} value="approved" />
            <Tab label={t('orders.tabs.declined')} value="declined" />
            <Tab label={t('orders.tabs.processing')} value="processing" />
          </Tabs>
        </div>

        <div className={styles.tabsContent}>
          {orders && (
            <>
              <TabPanel active={activeTab} tab="">
                <ProfileOrders items={orders} loading={loading} />
              </TabPanel>
              <TabPanel active={activeTab} tab="pending">
                <ProfileOrders items={orders} loading={loading} />
              </TabPanel>
              <TabPanel active={activeTab} tab="approved">
                <ProfileOrders items={orders} loading={loading} />
              </TabPanel>
              <TabPanel active={activeTab} tab="declined">
                <ProfileOrders items={orders} loading={loading} />
              </TabPanel>
              <TabPanel active={activeTab} tab="processing">
                <ProfileOrders items={orders} loading={loading} />
              </TabPanel>
            </>
          )}
        </div>
      </div>
      {orders && totalCount > 1 && (
        <div className="d-flex justify-content-between align-items-center p-20">
          <Pagination
            color="white"
            currentPage={currentPage}
            goToPage={setCurrentPage}
            pageCount={totalCount && Math.ceil(totalCount / TAKE)}
          />
          {loading ? (
            <span>
              {5 * currentPage - (TAKE - orders.length)} / {totalCount}
            </span>
          ) : (
            <Skeleton width="40px" variant="text" />
          )}
        </div>
      )}
    </>
  );
};
