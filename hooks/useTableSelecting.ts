import useSet from 'ahooks/lib/useSet';
import React from 'react';
import { AdminEndpoints } from 'services/api/endpoints';
import { DashboardRole } from 'services/types';

import { TableItem } from './useTable';

interface UseSelectingTableProps {
  items?: Readonly<TableItem[]>;
  onDeleteSelectedItems?: (items: number[]) => void;
  onActivateSelectedItems?: (items: number[]) => void;
  onDeactivateSelectedItems?: (items: number[]) => void;
  role: AdminEndpoints | DashboardRole;
}

export interface UseSelectingTableReturn {
  disabledItems: boolean;
  deleteSelectedItems: () => void;
  selectedIds: Set<number>;
  selectAll: () => void;
  selectItem: (id: number) => void;
  setSelectedItemsStatus: (activate: boolean, ids?: number[]) => void;
  setItems: React.Dispatch<React.SetStateAction<Readonly<TableItem[] | undefined>>>;
  deselectAll: () => void;
}

export function useTableSelecting({
  items: rows,
  onDeleteSelectedItems,
  onActivateSelectedItems,
  onDeactivateSelectedItems,
  role,
}: UseSelectingTableProps): UseSelectingTableReturn {
  const [selectedIds, { add, remove, reset }] = useSet<number>();
  const [items, setItems] = React.useState<Readonly<TableItem[]> | undefined>(rows);

  const deleteSelectedItems = (): void => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure delete selected items?')) {
      if (onDeleteSelectedItems) {
        onDeleteSelectedItems([...selectedIds]);
      }
      reset();
    }
  };

  const selectItem = (id: number): void => {
    if (selectedIds.has(id)) {
      remove(id);
    } else {
      add(id);
    }
  };

  const selectAll = (): void => {
    if (items && items.length) {
      if (selectedIds.size > 0) {
        reset();
      } else {
        items.forEach((item) => {
          if (role !== DashboardRole.STAFF && item.status === 'pending') {
            return;
          }
          add(Number(item.id));
        });
      }
    }
  };

  const deselectAll = (): void => {
    reset();
  };

  const setSelectedItemsStatus = (activate: boolean, ids?: number[]): void => {
    const filteredItems = (ids || [...selectedIds]).filter((id) => items?.find((obj) => Number(obj.id) === id));

    if (filteredItems.length) {
      if (activate && onActivateSelectedItems) {
        onActivateSelectedItems(filteredItems);
      } else if (onDeactivateSelectedItems) {
        onDeactivateSelectedItems(filteredItems);
      }
    }
    reset();
  };

  return {
    disabledItems: !selectedIds.size,
    deleteSelectedItems,
    deselectAll,
    selectedIds,
    selectAll,
    selectItem,
    setSelectedItemsStatus,
    setItems,
  };
}
