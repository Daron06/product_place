import { useAlert } from 'hooks/useAlert';
import { useRouter } from 'next/router';
import React from 'react';
import { AdminEndpoints } from 'services/api/endpoints';

import { HeadCell } from '../components/EnhancedTableHead';
import { OrderStatus } from '../services/api/OrderApi';
import { Await, DashboardRole, StatusEnum } from '../services/types';
import { getCellsByEndpoint } from '../utils/getCellsByEndpoint';
import { useTableSort, UseTableSortReturnProps } from './useSortTable';
import { ApiMethod, useTablePagination } from './useTablePagination';
import { UseSelectingTableReturn, useTableSelecting } from './useTableSelecting';

type UseTableReturnProps<T> = {
  currentPage: number;
  orderBy: UseTableSortReturnProps[0];
  sortItems: UseTableSortReturnProps[1];
  cells: HeadCell[] | undefined;
  setPage: (page: number) => void;
  isLoading: boolean;
  totalCount: number;
  hasSelected: (id: number) => boolean;
  items: T[];
  onActivateItem: (id: number[]) => void;
  onDeactivateItem: (id: number[]) => void;
  onRemoveItem: (id: number[]) => void;
  onStatusChange: (id: number, status: OrderStatus) => void;
} & UseSelectingTableReturn;

export interface UseTableProps<T> {
  role: DashboardRole | AdminEndpoints;
  api: {
    getAll: ApiMethod<T>;
    activate?: (ids: number[], items: T[]) => void | Promise<any>;
    deactivate?: (ids: number[], items: T[]) => void;
    delete?: (ids: number[], items: T[]) => void;
    changeStatus?: (id: number[], status: OrderStatus) => Promise<void> | void;
  };
  take?: number;
}

export type TableItem = unknown & {
  id: string | number;
  title?: string;
  price?: number | string;
  status: StatusEnum | OrderStatus;
  parentStatus?: StatusEnum | OrderStatus;
};

export const useTable = <T extends TableItem>({ role, api, take }: UseTableProps<T>): UseTableReturnProps<T> => {
  const router = useRouter();
  const { setPage, page, isLoading, data: tableData, setData, setLoading } = useTablePagination<
    Await<ReturnType<typeof api['getAll']>>['items'][0]
  >({ apiMethod: api.getAll, take, initialPage: Number(router.query.page) || 1 });
  const [orderBy, sortItems] = useTableSort();
  const tableSelectingMethods = useTableSelecting({ role });
  const { openAlert } = useAlert();

  const cells = getCellsByEndpoint(role);

  const hasSelected = (id: number): boolean => tableSelectingMethods.selectedIds.has(id);

  React.useEffect(() => {
    if (Number(page) > 1) {
      router.push(`?page=${page}`, undefined, { shallow: true });
    }
  }, [page]);

  const changeItemStatus = (ids: number[], status: StatusEnum | OrderStatus): void => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((obj) =>
        ids.includes(Number(obj.id))
          ? {
              ...obj,
              status,
            }
          : obj,
      ),
    }));
  };

  const onActivateItem = async (ids: number[]): Promise<void> => {
    if (api.activate) {
      try {
        await api.activate(ids, tableData.items);
        changeItemStatus(ids, StatusEnum.ACTIVE);

        openAlert('Item is activated', 'success');
      } catch (error: any) {
        openAlert(error.response.data[0], 'warning');
      }
    }
  };

  const onDeactivateItem = async (ids: number[]): Promise<void> => {
    if (api.deactivate) {
      try {
        await api.deactivate(ids, tableData.items);
        changeItemStatus(ids, StatusEnum.DISABLED);
        openAlert('Item is deactivated', 'success');
      } catch (error: any) {
        openAlert(error.response.data[0], 'warning');
      }
    }
  };

  const onDeleteItem = async (ids: number[]): Promise<void> => {
    if (api.delete) {
      setLoading(true);
      tableSelectingMethods.deselectAll();

      await api.delete(ids, tableData.items);

      const pageCount = Math.ceil((tableData.totalCount - ids.length) / 10) || 1;
      const data = await api.getAll({ page: pageCount, take: 10 });

      setPage(pageCount);
      setData((prev) => ({
        ...prev,
        items: data.items,
        totalCount: data.meta.total,
      }));

      setLoading(false);
    }
  };

  const onStatusChange = (id: number, status: OrderStatus): void => {
    if (api.changeStatus) {
      api.changeStatus([id], status);
      changeItemStatus([id], status);
    }
  };

  React.useEffect(() => {
    tableSelectingMethods.setItems(tableData.items.map((o) => ({ id: o.id, status: o.status })));
  }, [page, tableData]);

  return {
    cells,
    currentPage: page,
    orderBy,
    sortItems,
    setPage,
    isLoading,
    hasSelected,
    items: tableData.items,
    totalCount: tableData.totalCount,
    onActivateItem,
    onDeactivateItem,
    onRemoveItem: onDeleteItem,
    onStatusChange,
    ...tableSelectingMethods,
  };
};
