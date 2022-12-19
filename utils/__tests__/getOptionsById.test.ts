import data from '../data';
import { getOptionsById } from '../getOptionsById';

describe('Check getOptionsById', () => {
  it('Return options by ID from array of variations', () => {
    const str = getOptionsById(data.variations as any, data.variations[0].id);
    expect(str).toEqual(data.variations[0].options);
  });

  it('Options not found', () => {
    const str = getOptionsById(data.variations as any, 0);
    expect(str).toEqual([]);
  });
});
