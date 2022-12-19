import React from 'react';

type ReturnType = [boolean, () => void, () => void];

export const useIsLoading = (initialValue = false): ReturnType => {
  const [isLoading, setIsLoading] = React.useState<boolean>(initialValue);

  const loading = React.useCallback((): void => {
    setIsLoading(true);
  }, []);

  const loaded = React.useCallback((): void => {
    setIsLoading(false);
  }, []);

  return [isLoading, loading, loaded];
};
