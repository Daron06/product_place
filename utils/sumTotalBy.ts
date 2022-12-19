import _sumBy from 'lodash/sumBy';

import { CartState } from '../redux/ducks/cart/types/state';

export const sumTotalBy = (items: CartState['items'], prop: string): number => _sumBy(items, prop);
