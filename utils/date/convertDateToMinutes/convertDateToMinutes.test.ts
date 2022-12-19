import { convertDateToMinutes } from './index';

describe('test', () => {
  test('for the fact that with correct data, the correct answer', () => {
    expect(convertDateToMinutes(['12:00', '13:00'])).toEqual([720, 780]);
  });
});
