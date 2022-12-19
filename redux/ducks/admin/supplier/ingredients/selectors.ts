import { ImmutableIngredientsState } from 'redux/ducks/admin/supplier/ingredients/types/state';
import { RootState } from 'redux/types';

export const selectIngredients = (state: RootState): ImmutableIngredientsState => state.admin.ingredients;

export const selectIngredientsQueryParams = (state: RootState): ImmutableIngredientsState['queryParams'] =>
  state.admin.ingredients.queryParams;
