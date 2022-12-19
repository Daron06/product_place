import Typography from '@material-ui/core/Typography';
import { useTableSort } from 'hooks/useSortTable';
import { useTableSelecting } from 'hooks/useTableSelecting';
import React from 'react';
import { useDispatch } from 'react-redux';
import { activateSupplerChefItems, deactivateSupplerChefItems } from 'redux/ducks/admin/supplier/chefs/actionCreators';
import { OrdersApi, ResponseOrders } from 'services/api/admin/OrdersApi';
import { AdminOrderDashboard, DashboardRole } from 'services/types';
import { getCellsByEndpoint } from 'utils/getCellsByEndpoint';

import styles from '../SupplierChefs/SupplierChefs.module.scss';
import { AdminOrdersTable } from './AdminOrdersTable';

interface SupplierChefsProps {
  title: string;
  role: DashboardRole;
}

export const AdminOrdersDashboard: React.FC<SupplierChefsProps> = ({ title, role }): React.ReactElement => {
  const dispatch = useDispatch();
  const [ordersResponse, setOrdersResponse] = React.useState<ResponseOrders>({
    items: [],
    meta: { total: 0 },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [order, sortItems] = useTableSort();
  const { selectAll, selectedIds, selectItem, setSelectedItemsStatus } = useTableSelecting({
    role,
    items: ordersResponse.items,
    onActivateSelectedItems: (items) => dispatch(activateSupplerChefItems(items)),
    onDeactivateSelectedItems: (items) => dispatch(deactivateSupplerChefItems(items)),
  });

  React.useEffect(() => {
    (async (): Promise<void> => {
      setIsLoading(true);
      try {
        const data = await OrdersApi.getAll({ page: currentPage });
        setOrdersResponse(data);
      } catch (error) {
        console.error('StatisticDashboard error', error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentPage]);

  const cells = getCellsByEndpoint(AdminOrderDashboard[role]);

  const setPage = (page: number): void => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.root}>
      <div className={styles.rootHeader}>
        <Typography className={styles.rootTitle} variant="h6">
          {title}
        </Typography>
      </div>
      <div className="content">
        <AdminOrdersTable
          role={role}
          items={ordersResponse.items}
          onPaginationChange={setPage}
          onActivateItem={(id: number): void => setSelectedItemsStatus(true, [id])}
          onDeactivateItem={(id: number): void => setSelectedItemsStatus(false, [id])}
          onSelectItem={selectItem}
          onSelectAllItems={selectAll}
          onSort={sortItems}
          order={order}
          pageCount={ordersResponse.meta.total && Math.ceil(ordersResponse.meta.total / 11)}
          currentPage={currentPage}
          selectedItems={[...selectedIds]}
          totalItems={ordersResponse.meta.total}
          isLoading={isLoading}
          cells={cells}
        />
      </div>
    </div>
  );
};
