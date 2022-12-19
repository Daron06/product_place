import { toArrayOf } from '../toArrayOf';

const correct = ['1,2,3,4,5', 'a1,b2,c3'];
const incorrect = ['1, 2, 3', null, undefined];

describe('Check toArrayOf', () => {
  it('Return correct array of numbers', () => {
    const array = toArrayOf(correct[0]);
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });

  it('Return correct array of strings', () => {
    const array = toArrayOf(correct[1]);
    expect(array).toEqual(['a1', 'b2', 'c3']);
  });

  it('Check incorrect value', () => {
    const array = incorrect.map((v) => toArrayOf(v as any));
    expect(array).toEqual([['1', ' 2', ' 3'], [], []]);
  });

  it('Convert array of strings to numbers', () => {
    const array = toArrayOf(correct[0].split(','));
    expect(array).toEqual([1, 2, 3, 4, 5]);
  });
});
