export function getKeyOrValue(map: Map<string, string>, searchKey: string, either: boolean): string {
  const array = [...map.entries()];
  let result = 'unknown';

  array.forEach(([key, value]) => {
    if (key.toLocaleLowerCase().trim() === searchKey.toLocaleLowerCase().trim()) {
      result = either ? key : value;
    }
  });

  return result;
}
