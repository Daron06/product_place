export const convert24To12Format = (time: string): string | null => {
  let hours = Number(time.split(':')[0]);
  const minutes = time.split(':')[1];
  const amPm = Number(hours) >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;

  const strTime = `${hours}:${minutes} ${amPm}`;
  return minutes ? strTime : null;
};
