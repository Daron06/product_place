import useSet from 'ahooks/lib/useSet';
import React from 'react';

import CheckboxListView, { CheckboxListItem } from './View';

interface CheckboxListProps {
  items: CheckboxListItem[];
}

const CheckboxList: React.FC<CheckboxListProps> = ({ items }): React.ReactElement => {
  const [selected, { add, remove }] = useSet<string>([]);

  const onClickCheckbox = (value: string): void => {
    if (!selected.has(value)) {
      add(value);
    } else {
      remove(value);
    }
  };

  return <CheckboxListView items={items} onClickCheckbox={onClickCheckbox} selected={selected} />;
};

export default CheckboxList;
