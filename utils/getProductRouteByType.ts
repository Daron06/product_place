import { ProductType } from '../redux/ducks/favorites/types/contracts';

const productTypeToRoute = {
  chefTable: 'chefs-table',
  chefStore: 'chefs-store',
  menu: 'menu',
  masterClass: 'master-classes',
  recipe: 'recipes',
};

export const getProductRouteByType = (type: ProductType, slug?: string): string => {
  return ['', productTypeToRoute[type], slug].join('/');
};
