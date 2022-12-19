import { normalizeProductsParams } from '../normalizers/MenuParamsNormalizer';

describe('Check normalizeMenuParams', () => {
  it('Check with all params', () => {
    const normalized = normalizeProductsParams({
      chef_ids: '1,2',
      cuisine_ids: '2',
      orderBy: 'name',
      page: '2',
      take: '6',
      minPrice: '0',
      maxPrice: '2000',
      query: '',
    });
    expect(normalized).toEqual({
      chef_ids: [1, 2],
      cuisine_ids: [2],
      orderBy: 'name',
      page: 2,
      take: 6,
      minPrice: 0,
      maxPrice: 2000,
      query: undefined,
    });
  });

  it('Check incorrect params', () => {
    const normalized = normalizeProductsParams({
      chef_ids: [1, 2],
      cuisine_ids: undefined,
      orderBy: 'incorrect',
      page: 5,
      take: undefined,
      minPrice: null,
      maxPrice: '2000',
      query: 'test',
    });
    expect(normalized).toEqual({
      chef_ids: [1, 2],
      cuisine_ids: undefined,
      orderBy: undefined,
      page: 5,
      take: undefined,
      minPrice: undefined,
      maxPrice: 2000,
      query: 'test',
    });
  });

  it('Empty values', () => {
    const normalized = normalizeProductsParams({});
    expect(normalized).toEqual({
      chef_ids: undefined,
      cuisine_ids: undefined,
      orderBy: undefined,
      page: undefined,
      take: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      query: undefined,
    });
  });
});
