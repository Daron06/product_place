import { useAlert } from 'hooks/useAlert';
import React from 'react';
import { AddIngredient } from 'redux/ducks/admin/supplier/ingredients/types/contracts';
import { IngredientsApi } from 'services/api/admin/IngredientsApi';
import { Ingredient } from 'services/types';

interface UseIngredients {
  addNewIngredient: (data: AddIngredient) => void;
  updateIngredientRequest: (id: string, data: AddIngredient) => void;
  addedUpdatedItem?: Ingredient;
}

export function useIngredients(): UseIngredients {
  const [addedUpdatedItem, setAddedUpdatedItem] = React.useState<Ingredient>();
  const { openAlert } = useAlert();

  const addNewIngredient = async (data: AddIngredient): Promise<void> => {
    try {
      const { data: addeIngredient } = await IngredientsApi.add(data);
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(addeIngredient);
    } catch (error) {
      console.warn('addNewIngredient:', error);
    }
  };

  const updateIngredientRequest = async (id: string, params: AddIngredient): Promise<void> => {
    try {
      const { data: updatedIngredient } = await IngredientsApi.update({ id, params });
      openAlert('The item has been successfully saved', 'success');
      setAddedUpdatedItem(updatedIngredient);
    } catch (error) {
      console.warn('updateIngredientRequest:', error);
    }
  };

  return {
    addNewIngredient,
    updateIngredientRequest,
    addedUpdatedItem,
  };
}
