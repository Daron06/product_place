import { convert24To12Format } from './index';

describe('test', () => {
  test('for the fact that with correct time, the correct answer', () => {
    expect(convert24To12Format('12:00:00')).toEqual('12:00 PM');
    expect(convert24To12Format('13:00:00')).toEqual('1:00 PM');
    expect(convert24To12Format('00:03')).toEqual('12:03 AM');
  });
  test('In case of incorrect data, the correct answer is', () => {
    expect(convert24To12Format('asadasd')).toEqual(null);
    expect(convert24To12Format('2412.12312')).toEqual(null);
  });
});
