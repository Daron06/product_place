import { HeadCell } from 'components/EnhancedTableHead';
import _orderBy from 'lodash/orderBy';

import { OrderBy, TableOrder } from '../../../../hooks/useProductsTable';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends HeadCell['id']>(
  order: OrderBy,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b): number => descendingComparator(a, b, orderBy)
    : (a, b): number => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: Readonly<T> | T[], comparator: (a, b) => number): T[] {
  if (!Array.isArray(array)) {
    throw Error('Is not array');
  }

  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

export function sortTable<T>(arr: T[], ordering: TableOrder): T[] {
  return _orderBy<T>(arr, ordering.cell, ordering.type);
}
