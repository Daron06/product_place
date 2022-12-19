import data from '../data';
import { sumTotalBy } from '../sumTotalBy';

describe('Check sumTotalBy', () => {
  it('Return correct sum', () => {
    const array = sumTotalBy(data.cart.products as any, 'quantity');
    expect(array).toEqual(11);
  });
});
