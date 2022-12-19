import { ProductDates } from '../../../redux/ducks/products/types/contracts';
import { durationBetween } from '../convertDateToMinutes';

export const calcMaxDurationFromDates = (dates: ProductDates[]): number => {
  if (!dates.length) {
    return 0;
  }

  const arr = dates.map((obj) => durationBetween([obj.from, obj.to]));

  return Math.max(...arr);
};
