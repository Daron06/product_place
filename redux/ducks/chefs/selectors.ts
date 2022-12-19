import { ImmutableChefsState } from 'redux/ducks/chefs/types/state';
import { LoadingState, RootState } from 'redux/types';

export const selectProducts = (state: RootState): ImmutableChefsState => state.chefs;

export const selectChefsItems = (state: RootState): ImmutableChefsState['items'] => state.chefs.items;

export const selectChefsLoading = (state: RootState): boolean => state.chefs.loadingStatus === LoadingState.LOADING;

export const selectChefsQueryParams = (state: RootState): ImmutableChefsState['queryParams'] => state.chefs.queryParams;

export const selectChefsCurrentPage = (state: RootState): number | undefined => state.chefs.queryParams.page;

export const selectChefsTotalCount = (state: RootState): number => state.chefs.totalCount;

export const selectChefsTakeCount = (state: RootState): number => state.chefs.takeCount;
