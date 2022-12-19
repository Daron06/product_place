import TableCell from '@material-ui/core/TableCell';
import { Checkbox } from 'components/Checkbox';
import React from 'react';

interface SelectItemCellProps {
  isLoading: boolean;
  isItemSelected: boolean;
  labelId?: string;
  onSelectItem?: () => void;
}

export const SelectItemCell: React.FC<SelectItemCellProps> = ({
  isItemSelected,
  isLoading,
  onSelectItem,
  labelId,
}): React.ReactElement => {
  return (
    <TableCell padding="checkbox" onClick={onSelectItem}>
      {isLoading ? <div /> : <Checkbox checked={isItemSelected} inputProps={{ 'aria-labelledby': labelId }} />}
    </TableCell>
  );
};
