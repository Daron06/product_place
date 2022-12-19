const isNumber = (v: string): boolean => !isNaN(Number(v.replace(/,/g, '')));

export function toArrayOf<T extends string>(value: T | T[]): any[] {
  if (typeof value === 'string') {
    return value.split(',').map((v) => (isNumber(value) ? Number(v) : v));
  }

  if (Array.isArray(value)) {
    return value.map((v) => (isNumber(v) ? Number(v) : v));
  }

  return [];
}
