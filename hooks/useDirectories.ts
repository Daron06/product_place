import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDirectories } from 'redux/ducks/directories/actionsCreators';
import {
  selectCategoriesDirectory,
  selectChefsDirectory,
  selectCuisinesDirectory,
  selectDirectoriesData,
  selectPostCategoriesDirectory,
  selectStatusesDirectory,
  selectSuppliersDirectory,
} from 'redux/ducks/directories/selectors';
import { ImmutableDirectoriesState } from 'redux/ducks/directories/types/state';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { ProductsApi } from 'services/api/ProductsApi';
import { Directories } from 'services/types';

interface UseDirectories {
  categories?: ImmutableDirectoriesState['data']['categories'];
  postCategories?: ImmutableDirectoriesState['data']['postCategories'];
  cuisines?: ImmutableDirectoriesState['data']['cuisines'];
  chefs?: ImmutableDirectoriesState['data']['chefs'];
  suppliers?: ImmutableDirectoriesState['data']['suppliers'];
  statuses?: ImmutableDirectoriesState['data']['statuses'];
}

interface UseDirectoriesProps {
  admin?: boolean;
  directories: Directories[];
}

export function useDirectories({ admin = false, directories }: UseDirectoriesProps): UseDirectories {
  const dispatch = useDispatch();
  const cuisines = useSelector(selectCuisinesDirectory);
  const chefs = useSelector(selectChefsDirectory);
  const categories = useSelector(selectCategoriesDirectory);
  const statuses = useSelector(selectStatusesDirectory);
  const suppliers = useSelector(selectSuppliersDirectory);
  const allDirectories = useSelector(selectDirectoriesData);
  const postCategories = useSelector(selectPostCategoriesDirectory);

  React.useEffect(() => {
    const getDirectories = async (): Promise<void> => {
      try {
        if (admin) {
          const response = await AdminProductsApi.directories(directories);
          dispatch(setDirectories(response.data));
        } else {
          const response = await ProductsApi.directories(directories);
          dispatch(setDirectories(response));
        }
      } catch (error) {
        console.error('useDirectories:', error);
      }
    };

    if (directories.some((key) => !allDirectories[key])) {
      getDirectories();
    }
  }, [admin]);

  return {
    categories,
    postCategories,
    cuisines,
    chefs,
    statuses,
    suppliers,
  };
}
