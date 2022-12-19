import useSet from 'ahooks/lib/useSet';
import React from 'react';
import { FieldError } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { selectChefsDirectory, selectRequiredDirectory } from '../../../../redux/ducks/directories/selectors';
import { RootState } from '../../../../redux/types';
import { AutocompleteOptionItem } from '../../../AutocompleteField';
import { RequiredListView } from './View';

export interface RequiredListProps {
  onChange: (items: AutocompleteOptionItem[]) => void;
  error?: FieldError;
  value?: Array<{
    id: string | number;
    name: string;
    name__ar?: string | null;
    image: string;
  }>;
  type?: 'required' | 'chefs';
  placeholder?: string;
}

export const RequiredList: React.FC<RequiredListProps> = ({
  onChange,
  error,
  type = 'required',
  value = [],
  placeholder,
}): React.ReactElement => {
  const [selectedItems, { add, remove }] = useSet<AutocompleteOptionItem>(value);
  const required = useSelector<RootState>((state) => {
    return (type === 'required' ? selectRequiredDirectory : selectChefsDirectory)(state);
  }) as RequiredListProps['value'];

  const items = required?.map((item) => ({
    id: item.id,
    name: item.name,
    name__ar: item.name__ar,
    image: item.image,
  }));

  const onSelectRequire = (item: AutocompleteOptionItem | null): void => {
    if (item) {
      add(item);
    }
  };

  const onRemoveSelectedItem = (item: AutocompleteOptionItem): void => {
    if (typeof window !== 'undefined' && window.confirm('Are you sure remove required?')) {
      remove(item);
    }
  };

  React.useEffect(() => {
    onChange([...selectedItems]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  return (
    <RequiredListView
      items={items}
      selectedItems={[...selectedItems]}
      onSelect={onSelectRequire}
      onRemove={onRemoveSelectedItem}
      error={error}
      placeholder={placeholder}
    />
  );
};
