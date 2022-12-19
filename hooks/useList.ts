import React from 'react';

type UseListReturnProps<T> = [
  T[],
  (value: T) => void,
  (obj: { index?: number; id?: string | number }) => void,
  ({ newValue, index, id }: { newValue?: T; index?: number; id?: string | number }) => void,
  (arr: T[]) => void,
  () => void,
];

/**
 * Returns a list and methods for manipulating the list data
 * @param {number} defaultValue Initialized value
 * @returns items, add, remove, update, set, reset
 */
export const useList = <T extends { id?: string | number }>(defaultValue: T[] = []): UseListReturnProps<T> => {
  const [items, setItems] = React.useState<T[]>(defaultValue);

  const add = (value: T): void => {
    setItems((prev) => [...prev, value]);
  };

  const remove = ({ index, id }: { index?: number; id?: string | number }): void => {
    setItems((prev) =>
      prev.filter((val, i) => {
        if (typeof index !== 'undefined') {
          return Number(index) !== i;
        }
        if (typeof val === 'object' && 'id' in val) {
          return Number(val.id) !== Number(id);
        }
        return true;
      }),
    );
  };

  const update = ({ newValue, index, id }: { newValue?: T; index?: number; id?: string | number }): void => {
    if ((isNaN(Number(index)) && !id) || !newValue) {
      return;
    }
    setItems((prev) =>
      prev.map((val, i) => {
        if (index === i) {
          return newValue;
        }
        if (typeof val === 'object' && 'id' in val && id === val.id) {
          return newValue;
        }
        return val;
      }),
    );
  };

  const set = (arr: T[]): void => {
    setItems(arr);
  };

  const reset = (): void => {
    setItems([]);
  };

  return [items, add, remove, update, set, reset];
};
