import { actionCreator } from 'utils/actionCreator';

import {
  ActivateIngredientItemsInterface,
  AddIngredientRequestInterface,
  AddIngredientSuccessInterface,
  BlockIngredientItemsInterface,
  ChangeIngredientsPaginationInterface,
  FetchIngredientsInterface,
  IngredientsActionTypes,
  RemoveIngredientInterface,
  RemoveIngredientsFilterInterface,
  SetIngredientsFiltersInterface,
  SetIngredientsItemsInterface,
  SetIngredientsLoadingStatus,
  SetIngredientsTotalCount,
  UpdateIngredientInterface,
} from './types/actions';

export const addIngredientRequest = actionCreator<AddIngredientRequestInterface>(
  IngredientsActionTypes.ADD_INGREDIENT_REQUEST,
);
export const addIngredientSuccess = actionCreator<AddIngredientSuccessInterface>(
  IngredientsActionTypes.ADD_INGREDIENT_SUCCESS,
);

export const fetchIngredients = actionCreator<FetchIngredientsInterface>(IngredientsActionTypes.FETCH_INGREDIENTS);

export const changeIngredientsPagination = actionCreator<ChangeIngredientsPaginationInterface>(
  IngredientsActionTypes.CHANGE_PAGINATION,
);

export const setIngredientsItems = actionCreator<SetIngredientsItemsInterface>(
  IngredientsActionTypes.SET_INGREDIENTS_ITEMS,
);

export const setIngredientsLoadingStatus = actionCreator<SetIngredientsLoadingStatus>(
  IngredientsActionTypes.SET_INGREDIENTS_LOADING_STATUS,
);

export const setIngredientsTotalCount = actionCreator<SetIngredientsTotalCount>(
  IngredientsActionTypes.SET_INGREDIENTS_COUNT,
);

export const setIngredientsFilters = actionCreator<SetIngredientsFiltersInterface>(
  IngredientsActionTypes.SET_INGREDIENTS_FILTERS,
);

export const removeIngredientsFilter = actionCreator<RemoveIngredientsFilterInterface>(
  IngredientsActionTypes.REMOVE_INGREDIENTS_FILTERS,
);

export const activateIngredientItems = actionCreator<ActivateIngredientItemsInterface>(
  IngredientsActionTypes.ACTIVATE_ITEMS,
);

export const blockIngredientItems = actionCreator<BlockIngredientItemsInterface>(IngredientsActionTypes.BLOCK_ITEMS);

export const updateIngredient = actionCreator<UpdateIngredientInterface>(IngredientsActionTypes.UPDATE_INGREDIENT);

export const removeIngredientItems = actionCreator<RemoveIngredientInterface>(IngredientsActionTypes.REMOVE_INGREDIENT);
