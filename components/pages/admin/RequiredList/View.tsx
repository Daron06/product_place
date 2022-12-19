import React from 'react';
import { FieldError } from 'react-hook-form';

import { AutocompleteField, AutocompleteOptionItem } from '../../../AutocompleteField';
import { IngredientsList } from '../IngredientsList/IngredientsList';

interface RequiredListViewProps {
  items?: AutocompleteOptionItem[];
  selectedItems: AutocompleteOptionItem[];
  onSelect: (item: AutocompleteOptionItem | null) => void;
  onRemove: (item: AutocompleteOptionItem) => void;
  error?: FieldError;
  placeholder?: string;
}

export const RequiredListView: React.FC<RequiredListViewProps> = ({
  items,
  selectedItems,
  onSelect,
  onRemove,
  error,
  placeholder = 'Select require...',
}): React.ReactElement | null => {
  if (!items) {
    return null;
  }
  return (
    <>
      {selectedItems.length > 0 && <IngredientsList items={[...selectedItems]} onRemove={onRemove} />}
      <AutocompleteField
        items={[...items].filter(
          (item) => !selectedItems.find((obj) => obj.name === item.name || obj.name === item.name__ar),
        )}
        name="required"
        onChange={onSelect}
        error={error}
        placeholder={placeholder}
        autoFocus={error ? true : false}
      />
    </>
  );
};
