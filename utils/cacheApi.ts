const responseMap = new Map();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const cacheApi = async <T>(callback: (...rest) => T, ...rest: unknown[]): Promise<T> => {
  const curTime = new Date();
  if (!responseMap.has(callback)) {
    responseMap.set(callback, null);
    const data = await callback(...rest);
    const cacheDieTime = +curTime.setSeconds(curTime.getSeconds() + 30);
    responseMap.set(callback, { data, cacheDieTime });
    return data;
  }
  const { data, cacheDieTime } = responseMap.get(callback);
  if (cacheDieTime <= curTime) {
    responseMap.delete(callback);
  }
  return data;
};
