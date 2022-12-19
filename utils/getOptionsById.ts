import { Option, OptionVariants } from '../services/types';

export const getOptionsById = (arr: Option[], id: number): OptionVariants[] => {
  return arr.find((o) => o.id === id)?.options || [];
};
