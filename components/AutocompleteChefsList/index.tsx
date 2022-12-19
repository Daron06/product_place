import React from 'react';

import { useList } from '../../hooks/useList';
import { Chef } from '../../redux/ducks/products/types/contracts';
import { AutocompleteChefsField } from '../AutocompleteField/AutocompleteChefsField';
import { IngredientsList } from '../pages/admin/IngredientsList/IngredientsList';

interface AutocompleteChefsListProps {
  onChange: (value: Chef[]) => void;
  items?: Chef[];
  name?: string;
}

export const AutocompleteChefsList: React.FC<AutocompleteChefsListProps> = ({ onChange, items, name }) => {
  const { 0: chefsList, 1: add, 2: remove } = useList<Chef>(items || []);

  const handleChange = (obj: Chef | null) => {
    if (obj) {
      add(obj);
    }
  };

  React.useEffect(() => {
    onChange(chefsList);
  }, [chefsList]);

  return (
    <>
      <AutocompleteChefsField<Chef> name={name || 'chefs'} placeholder="Search chef..." onChange={handleChange} />
      {chefsList.length > 0 && (
        <div className="mt-10">
          <IngredientsList items={chefsList.filter(Boolean)} onRemove={(item) => remove({ id: item.id })} />
        </div>
      )}
    </>
  );
};
