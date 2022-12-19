const formatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
});

/**
 * This function takes argument to human intelligible format
 * */

export function convertMinutesToHours(time: number): string;
export function convertMinutesToHours(time: [number, number]): [string, string];
export function convertMinutesToHours(time: number | [number, number]): string | [string, string] {
  if (time === undefined || time === null) {
    console.error(`Unexpected input value, expected number or [number, number], but got ${time}`);
  }
  const startHour = new Date().setHours(0, 0, 0, 0);

  if (Array.isArray(time)) {
    const minutesFrom = new Date(time[0] * 60 * 1000 + startHour);
    const minutesTill = new Date(time[1] * 60 * 1000 + startHour);

    return [formatter.format(minutesFrom), formatter.format(minutesTill)];
  }

  const minutesFrom = new Date(time * 60 * 1000 + startHour);
  return formatter.format(minutesFrom);
}
