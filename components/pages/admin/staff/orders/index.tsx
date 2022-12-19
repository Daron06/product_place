import { StaffOrdersTable } from 'components/pages/admin/staff/orders/StaffOrdersTable';
import { useCellsByEndpoint } from 'hooks/useCellsByEndpoint';
import { useTableSort } from 'hooks/useSortTable';
import React from 'react';
import { selectAdminProductsState } from 'redux/ducks/admin/products/selectors';
import { useTypedSelector } from 'redux/reducer';
import { OrdersApi, ResponseOrders } from 'services/api/admin/OrdersApi';

export const StaffOrders: React.FC = (): React.ReactElement => {
  const state = useTypedSelector(selectAdminProductsState);
  const [order, sortItems] = useTableSort();
  const { cells } = useCellsByEndpoint();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [ordersResponse, setOrdersResponse] = React.useState<ResponseOrders>({
    items: [],
    meta: { total: 0 },
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

  return (
    <StaffOrdersTable
      items={ordersResponse.items}
      onPaginationChange={(page: number): void => setCurrentPage(page)}
      onSelectItem={(): void => {}}
      onSelectAllItems={(): void => {}}
      onSort={sortItems}
      order={order}
      pageCount={Math.ceil(ordersResponse.meta.total / 6)}
      currentPage={state.queryParams.page || currentPage}
      totalItems={state.totalCount}
      isLoading={isLoading}
      cells={cells}
      title="Orders"
    />
  );
};
