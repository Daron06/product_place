import { calcMaxDurationFromDates } from './index';

describe('calcMaxDurationFromDates', () => {
  test('Check empty array of dates', () => {
    expect(calcMaxDurationFromDates([])).toEqual(0);
  });

  test('Return 120 minutes (2 hours)', () => {
    expect(
      calcMaxDurationFromDates([
        {
          booked: 0,
          date: '2022-05-02',
          day: '',
          from: '12:00:00',
          id: '190423',
          isWeekly: false,
          to: '14:00:00',
          url: '',
        },
      ]),
    ).toEqual(120);
  });

  test('Return 240 minutes (4 hours)', () => {
    expect(
      calcMaxDurationFromDates([
        {
          booked: 0,
          date: '2022-05-02',
          day: '',
          from: '15:00:00',
          id: '190423',
          isWeekly: false,
          to: '18:00:00',
          url: '',
        },
        {
          booked: 0,
          date: '2022-05-02',
          day: '',
          from: '12:00:00',
          id: '190423',
          isWeekly: false,
          to: '16:00:00',
          url: '',
        },
        {
          booked: 0,
          date: '2022-05-02',
          day: '',
          from: '11:00:00',
          id: '190423',
          isWeekly: false,
          to: '12:00:00',
          url: '',
        },
      ]),
    ).toEqual(240);
  });
});
