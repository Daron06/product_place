const convertTime12to24 = (time12h: string): [number, number] => {
  const [time, modifier] = time12h.split(' ');
  // eslint-disable-next-line prefer-const
  let [hours, minutes] = time.split(':');

  if (!modifier) {
    return [Number(hours), Number(minutes)];
  }

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12);
  }

  return [Number(hours), Number(minutes)];
};
/**
 * Takes time in human intelligible format anf converting to minutes
 * @value time like '12:00' or ['12:00', '12:30']
 */
export function convertDateToMinutes(value: string): number;
export function convertDateToMinutes(value: [string, string]): [number, number];
export function convertDateToMinutes(value: string | [string, string]): number | [number, number] {
  /**
   * Function convertTime is takes argument 'time' and converting input value to a hours
   * */
  const convertTime = (time: [number, number]): number =>
    (new Date().setHours(time[0], time[1], 0) - new Date().setHours(0, 0, 0)) / (60 * 1000);

  if (Array.isArray(value)) {
    /**
     * If the value is a array, we need to normalize data, because in array contained
     *  two value like '09:30 AM' or '09:00:00' and we need to bring the data to this form
     *  [9, 30] and [9, 0] accordingly
     */
    const [startTime, endTime] = value.map((item) => convertTime12to24(item));
    return [Math.round(convertTime(startTime)), Math.round(convertTime(endTime))];
  }

  /**
   * If input values is not an array, that is a string^ like '09:30'
   * and we need to split [9, 30]
   * */
  const time: number[] = value.split(':').map(Number);
  return convertTime([Math.round(time[0]), Math.round(time[1])]);
}

export function durationBetween(value: [string, string]): number {
  const [from, to] = convertDateToMinutes(value);
  return Math.floor(to - from);
}
