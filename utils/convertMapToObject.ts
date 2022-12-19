export function convertMapToObject<K extends string, V>(map: Map<K, V>): { [key: string]: V } {
  return Array.from(map).reduce(
    (obj, [key, value]) => Object.assign(obj, { [key]: value }), // Be careful! Maps can have non-String keys; object literals can't.
    {},
  );
}
