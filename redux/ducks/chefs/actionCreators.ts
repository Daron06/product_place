import {
  ChefsActionTypes,
  FetchChefsInterface,
  RemoveChefsFilterInterface,
  ResetChefsFilters,
  SetChefsFiltersInterface,
  SetChefsInterface,
  SetChefsLoadingStatusInterface,
  SetChefsPageNumberInterface,
  SetChefsSearchQueryInterface,
  SetChefsTotalCount,
  SetChefsTypeInterface,
} from 'redux/ducks/chefs/types/actions';
import { actionCreator } from 'utils/actionCreator';

export const fetchChefs = actionCreator<FetchChefsInterface>(ChefsActionTypes.FETCH_CHEFS);

export const setChefs = actionCreator<SetChefsInterface>(ChefsActionTypes.SET_CHEFS);

export const setChefsLoadingStatus = actionCreator<SetChefsLoadingStatusInterface>(ChefsActionTypes.SET_LOADING_STATUS);

export const setChefsTotalCount = actionCreator<SetChefsTotalCount>(ChefsActionTypes.SET_CHEFS_TOTAL_COUNT);

export const setChefsType = actionCreator<SetChefsTypeInterface>(ChefsActionTypes.SET_CHEFS_TYPE);

export const setChefsSearchQuery = actionCreator<SetChefsSearchQueryInterface>(ChefsActionTypes.SET_CHEFS_SEARCH_QUERY);

export const setChefsFilters = actionCreator<SetChefsFiltersInterface>(ChefsActionTypes.SET_CHEFS_FILTERS);

export const setChefsPageNumber = actionCreator<SetChefsPageNumberInterface>(ChefsActionTypes.SET_CHEFS_PAGE_NUMBER);

export const removeChefsFilter = actionCreator<RemoveChefsFilterInterface>(ChefsActionTypes.REMOVE_CHEFS_FILTERS);

export const resetChefsFilters = actionCreator<ResetChefsFilters>(ChefsActionTypes.RESET_FILTERS);
