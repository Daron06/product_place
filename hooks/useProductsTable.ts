import useSet from 'ahooks/lib/useSet';
import React from 'react';
import { useDispatch } from 'react-redux';

import { HeadCell } from '../components/EnhancedTableHead';
import {
  activateProductsItems,
  changePagination,
  deactivateProductsItems,
  deleteProductsItems,
  fetchProductsItems,
} from '../redux/ducks/admin/products/actionCreators';
import { selectAdminProductsState } from '../redux/ducks/admin/products/selectors';
import { ImmutableAdminProductsState } from '../redux/ducks/admin/products/types/state';
import { useTypedSelector } from '../redux/reducer';
import { AdminEndpoints } from '../services/api/endpoints';

export enum OrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export type TableOrder = { type: OrderBy; cell: HeadCell['id'] };

interface UseProductTableReturnType {
  state: ImmutableAdminProductsState;
  order: TableOrder;
  sortItems: (property: HeadCell['id']) => void;
  selectedIds: number[];
  selectItem: (id: number) => void;
  selectAll: () => void;
  setPage: (page: number) => void;
  setSelectedItemsStatus: (activate: boolean, ids?: number[]) => void;
  deleteSelectedItems: () => void;
}

export const useProductsTable = (endpoint: AdminEndpoints): UseProductTableReturnType => {
  const dispatch = useDispatch();
  const state = useTypedSelector(selectAdminProductsState);
  const [order, setOrder] = React.useState<TableOrder>({ type: OrderBy.ASC, cell: 'name' });
  const [selectedIds, { add, remove, reset }] = useSet<number>();

  React.useEffect(() => {
    dispatch(
      fetchProductsItems({
        endpoint,
      }),
    );
  }, [dispatch, endpoint]);

  const sortItems = (property: HeadCell['id']): void => {
    if (order.cell === property) {
      setOrder((prev) => ({
        ...prev,
        type: order.type === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC,
      }));
    } else {
      setOrder({
        cell: property,
        type: OrderBy.ASC,
      });
    }
  };

  const deleteSelectedItems = (): void => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure delete selected items?')) {
      dispatch(deleteProductsItems([...selectedIds]));
      reset();
    }
  };

  const setSelectedItemsStatus = (activate: boolean, ids?: number[]): void => {
    const filteredItems = (ids || [...selectedIds]).filter((id) =>
      state.items?.find((obj) => Number(obj.id) === id && obj.status !== 'pending'),
    );
    if (filteredItems.length) {
      if (activate) {
        dispatch(activateProductsItems(filteredItems));
      } else {
        dispatch(deactivateProductsItems(filteredItems));
      }
    }
    reset();
  };

  const selectItem = (id: number): void => {
    if (selectedIds.has(id)) {
      remove(id);
    } else {
      add(id);
    }
  };

  const selectAll = (): void => {
    const activeItems = state.items.filter((obj) => obj.status !== 'pending');
    if (state.items) {
      if (selectedIds.size === activeItems.length) {
        reset();
      } else {
        activeItems.forEach((item) => {
          add(Number(item.id));
        });
      }
    }
  };

  const setPage = (page: number): void => {
    dispatch(changePagination(page));
  };

  return {
    state,
    order,
    selectedIds: [...selectedIds],
    selectItem,
    selectAll,
    setPage,
    setSelectedItemsStatus,
    sortItems,
    deleteSelectedItems,
  };
};
