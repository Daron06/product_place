import FormControlLabel from '@material-ui/core/FormControlLabel';
import React from 'react';

import { Checkbox } from '../Checkbox';

export interface CheckboxListItem {
  name: string;
  value: string;
}

interface CheckboxListViewProps {
  items: CheckboxListItem[];
  selected: Set<string>;
  onClickCheckbox: (value: string) => void;
}

const CheckboxListView: React.FC<CheckboxListViewProps> = ({
  items,
  selected,
  onClickCheckbox,
}): React.ReactElement => {
  return (
    <div>
      {items.map((item) => (
        <FormControlLabel
          style={{ width: '100%' }}
          key={String(item.value)}
          control={<Checkbox checked={selected.has(item.value)} onChange={(): void => onClickCheckbox(item.value)} />}
          label={item.name}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default CheckboxListView;
