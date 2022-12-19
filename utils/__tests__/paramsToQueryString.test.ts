import data from '../data';
import { paramsToQueryString } from '../paramsToQueryString';

describe('Check paramsToQueryString', () => {
  it('Return correct query string from object', () => {
    const str = paramsToQueryString(data.queryObject);
    expect(str).toEqual(data.queryString);
  });

  it('Return correct query string with falsy values', () => {
    const str = paramsToQueryString({
      duration: undefined,
      ...data.queryObject,
      supplier_ids: null,
      rating: 0,
    });
    expect(str).toEqual(`${data.queryString}&rating=0`);
  });

  it('Empty object', () => {
    const str = paramsToQueryString({});
    expect(str).toEqual('');
  });
});
