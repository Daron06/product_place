import { HeadCell } from 'components/EnhancedTableHead';
import { OrderBy, TableOrder } from 'hooks/useProductsTable';
import React from 'react';

export type UseTableSortReturnProps = [order: TableOrder, setOrder: (property: HeadCell['id']) => void];

export function useTableSort(): UseTableSortReturnProps {
  const [order, setOrder] = React.useState<TableOrder>({ type: OrderBy.DESC, cell: 'id' });

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

  return [order, sortItems];
}
