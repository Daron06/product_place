import { convertMinutesToHours } from './index';

describe('convertMinutesToHours', () => {
  test('check if we pass array of minutes from start day, function will return array of strings contains human understandable format', () => {
    expect(convertMinutesToHours([120, 300])).toEqual(['2:00 AM', '5:00 AM']);
  });

  test('check if we pass array of numbers, function will return array of strings', () => {
    expect(convertMinutesToHours(120)).toEqual('2:00 AM');
    expect(convertMinutesToHours(1439)).toEqual('11:59 PM');
  });

  test('check if returned value contains AM/PM', () => {
    expect(convertMinutesToHours(120)).toMatch(/(AM)/i);
    expect(convertMinutesToHours(720)).toMatch(/(PM)/i);
  });
});
