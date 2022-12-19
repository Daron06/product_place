import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import { Checkbox } from 'components/Checkbox';
import { Icon } from 'components/Icon';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

import { OrderBy, TableOrder } from '../../hooks/useProductsTable';
import styles from './EnhancedTable.module.scss';

export interface EnhancedTableProps {
  cells: Array<HeadCell | undefined>;
  cellsWidth?: { [key: number]: { width: string } };
  numSelected?: number;
  onSort?: (property: HeadCell['id']) => void;
  onSelectAll?: () => void;
  order: TableOrder;
  rowCount: number;
  selectable?: boolean;
}

export interface HeadCell {
  id:
    | keyof Product
    | 'commission'
    | 'category'
    | 'sales'
    | 'masterClass'
    | 'items'
    | 'menu'
    | 'mealKits'
    | 'total'
    | 'chef'
    | 'order'
    | 'amount'
    | 'date'
    | 'subtotal'
    | 'quantity'
    | 'product'
    | 'summary'
    | 'invoice'
    | 'unique'
    | 'cloud'
    | string;
  label: string;
}

const defaultCellsWidth = {
  0: { width: '40%' },
  1: { width: '8%' },
  2: { width: '40%' },
};

export const EnhancedTableHead: React.FC<EnhancedTableProps> = ({
  cells,
  cellsWidth = defaultCellsWidth,
  onSelectAll,
  order,
  numSelected = 0,
  rowCount,
  onSort,
  selectable = true,
}): React.ReactElement => {
  const onSortClick = (id: HeadCell['id']): void => {
    if (onSort) {
      onSort(id);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox" onClick={onSelectAll}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              classes={{ root: styles.checkboxRoot }}
            />
          </TableCell>
        )}
        {cells.map(
          (headCell, index) =>
            headCell && (
              <TableCell
                key={headCell.id}
                sortDirection={order.cell === headCell.id ? order.type : false}
                classes={{ root: styles.tableCell }}
                onClick={(): void => onSortClick(headCell.id)}
                style={cellsWidth[index]}
              >
                {headCell.label}
                {headCell.id === order.cell && (
                  <Icon
                    className={clsx(styles.filterIcon, {
                      [styles.ascending]: order.type === OrderBy.ASC,
                      [styles.descending]: order.type === OrderBy.DESC,
                    })}
                    type="sort"
                  />
                )}
              </TableCell>
            ),
        )}
      </TableRow>
    </TableHead>
  );
};
