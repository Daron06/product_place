import { RootState } from '../../types';
import { ImmutableDirectoriesState } from './types/state';

export const selectDirectoriesData = (state: RootState): ImmutableDirectoriesState['data'] => state.directories.data;

export const selectChefsDirectory = (state: RootState): ImmutableDirectoriesState['data']['chefs'] =>
  state.directories.data.chefs;

export const selectCategoriesDirectory = (state: RootState): ImmutableDirectoriesState['data']['categories'] =>
  state.directories.data.categories;

export const selectPostCategoriesDirectory = (state: RootState): ImmutableDirectoriesState['data']['postCategories'] =>
  state.directories.data['post-categories'];

export const selectCloudKitchensDirectory = (state: RootState): ImmutableDirectoriesState['data']['cloudKitchens'] =>
  state.directories.data.cloudKitchens;

export const selectStatusesDirectory = (state: RootState): ImmutableDirectoriesState['data']['statuses'] =>
  state.directories.data.statuses;

export const selectSuppliersDirectory = (state: RootState): ImmutableDirectoriesState['data']['suppliers'] =>
  state.directories.data.suppliers;

export const selectCuisinesDirectory = (state: RootState): ImmutableDirectoriesState['data']['cuisines'] =>
  state.directories.data.cuisines;

export const selectRequiredDirectory = (state: RootState): ImmutableDirectoriesState['data']['required'] =>
  state.directories.data?.required;

export const selectOptionsDirectory = (state: RootState): ImmutableDirectoriesState['data']['options'] =>
  state.directories.data?.options;
