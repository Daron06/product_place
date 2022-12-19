import data from '../data';
import { queryParamsGuard } from '../queryParamsGuard';

describe('Check queryParamsGuard', () => {
  it('Check correct filters', () => {
    const obj = queryParamsGuard(data.queryObject);
    expect(obj).toEqual(data.queryObject);
  });

  it('Check filters with unknown params', () => {
    const obj = queryParamsGuard({
      ...data.queryObject,
      test: 1,
      hello: null,
    });
    expect(obj).toEqual(data.queryObject);
  });

  it('Check empty object', () => {
    const obj = queryParamsGuard({});
    expect(obj).toEqual({});
  });
});
