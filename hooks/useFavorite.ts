import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addFavorite, deleteFavorite } from '../redux/ducks/favorites/actionsCreator';
import { selectFavoritesByType } from '../redux/ducks/favorites/selectors';
import { ProductType } from '../redux/ducks/favorites/types/contracts';

interface UseFavoritesReturnProps {
  hasFavorite: (id: number) => boolean;
  toggleFavorite: (itemId: number) => void;
}

export function useFavorite(type: ProductType): UseFavoritesReturnProps {
  const dispatch = useDispatch();
  const favoriteItems = useSelector(selectFavoritesByType(type));

  const hasFavorite = React.useCallback(
    (itemId: number): boolean => {
      return !!favoriteItems.find((item) => Number(item.id) === Number(itemId));
    },
    [favoriteItems],
  );

  const toggleFavorite = React.useCallback(
    (itemId: number): void => {
      if (hasFavorite(itemId)) {
        dispatch(deleteFavorite({ id: itemId, type }));
      } else {
        dispatch(addFavorite({ id: itemId, type }));
      }
    },
    [hasFavorite, type],
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}
