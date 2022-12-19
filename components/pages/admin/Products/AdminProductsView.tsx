import { HeadCell } from 'components/EnhancedTableHead';
import styles from 'components/pages/admin/Products/AdminProducts.module.scss';
import { Immutable } from 'immer';
import React from 'react';
import { ProductChefNullable } from 'redux/ducks/products/types/state';

import { useCellsByEndpoint } from '../../../../hooks/useCellsByEndpoint';
import { TableOrder } from '../../../../hooks/useProductsTable';
import { SectionHeader } from '../SectionHeader';
import { ProductTable } from './ProductTable';

interface AdminProductViewProps {
  items: Immutable<ProductChefNullable[]>;
  onPaginationChange: (page: number) => void;
  onDeactivateSelectedItems: () => void;
  onActivateSelectedItems: () => void;
  onActivateItem: (id: number) => void;
  onDeactivateItem: (id: number) => void;
  onSelectProductItem: (ids: number) => void;
  onSelectAllProductsItems: () => void;
  onSort: (property: HeadCell['id']) => void;
  onDeleteSelectedItems: () => void;
  order: TableOrder;
  pageCount: number;
  totalItems: number;
  currentPage: number;
  isLoading?: boolean;
  selectedProductsItems: number[];
  title: string;
  takeCount: number;
}

export const AdminProductsView: React.FC<AdminProductViewProps> = ({
  currentPage,
  items,
  onPaginationChange,
  onDeactivateSelectedItems,
  onActivateSelectedItems,
  onDeleteSelectedItems,
  onActivateItem,
  onDeactivateItem,
  onSelectProductItem,
  onSelectAllProductsItems,
  onSort,
  order,
  pageCount,
  totalItems,
  isLoading = false,
  selectedProductsItems,
  title,
  takeCount,
}): React.ReactElement => {
  const disabledMenuItemAction = !selectedProductsItems.length;
  const { cells } = useCellsByEndpoint();

  return (
    <div className={styles.root}>
      <SectionHeader
        actionsDisabled={disabledMenuItemAction}
        title={title}
        onActivate={onActivateSelectedItems}
        onDeactivate={onDeactivateSelectedItems}
        onDelete={onDeleteSelectedItems}
      />
      <div className="content">
        <ProductTable
          items={items as ProductChefNullable[]}
          onPaginationChange={onPaginationChange}
          onActivateItem={onActivateItem}
          onDeactivateItem={onDeactivateItem}
          onSelectProductItem={onSelectProductItem}
          onSelectAllProductsItems={onSelectAllProductsItems}
          onSort={onSort}
          order={order}
          pageCount={pageCount}
          currentPage={currentPage}
          selectedProductsItems={selectedProductsItems}
          totalItems={totalItems}
          isLoading={isLoading}
          takeCount={takeCount}
          cells={cells}
        />
      </div>
    </div>
  );
};
