import React from 'react';

import { useProductsTable } from '../../../../hooks/useProductsTable';
import { LoadingState } from '../../../../redux/types';
import { AdminEndpoints } from '../../../../services/api/endpoints';
import { AdminProductsView } from './AdminProductsView';

export type Order = 'asc' | 'desc';

interface AdminProductsProps {
  title: string;
  endpoint: AdminEndpoints;
}

export const AdminProducts: React.FC<AdminProductsProps> = ({ title, endpoint }): React.ReactElement => {
  const {
    state,
    order,
    sortItems,
    selectedIds,
    setPage,
    selectItem,
    selectAll,
    setSelectedItemsStatus,
    deleteSelectedItems,
  } = useProductsTable(endpoint);

  return (
    <AdminProductsView
      title={title}
      order={order}
      items={state.items ?? []}
      takeCount={state.takeCount}
      totalItems={state.totalCount}
      selectedProductsItems={selectedIds}
      currentPage={state.queryParams.page || 1}
      pageCount={Math.ceil(state.totalCount / state.takeCount)}
      isLoading={state.loadingStatus === LoadingState.LOADING}
      onDeleteSelectedItems={deleteSelectedItems}
      onSort={sortItems}
      onPaginationChange={setPage}
      onSelectProductItem={selectItem}
      onSelectAllProductsItems={selectAll}
      onActivateSelectedItems={(): void => setSelectedItemsStatus(true)}
      onDeactivateSelectedItems={(): void => setSelectedItemsStatus(false)}
      onActivateItem={(id: number): void => setSelectedItemsStatus(true, [id])}
      onDeactivateItem={(id: number): void => setSelectedItemsStatus(false, [id])}
    />
  );
};
