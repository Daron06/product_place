import useSetState from 'ahooks/lib/useSetState';
import React from 'react';

import { QueryParams, ResponseWithMeta } from '../services/types';
import { useIsLoading } from './useIsLoading';

interface UsePaginationReturnProps<T> {
  take: number;
  query: string;
  page: number;
  setPage: (page: number) => void;
  setQuery: (query: string) => void;
  setTake: (take: number) => void;
  setParams: (newState: QueryParams) => void;
  isLoading: boolean;
  data: PaginationData<T>;
  setData: React.Dispatch<React.SetStateAction<PaginationData<T>>>;
  setLoading: (value: boolean) => void;
}

export type PaginationResponse<T> = { items: T[] } & ResponseWithMeta;
export type ApiMethod<T> = (params: QueryParams) => Promise<PaginationResponse<T>>;
type PaginationData<T = unknown> = { items: T[]; totalCount: number };

type UsePaginationProps<T> = {
  apiMethod: ApiMethod<T>;
  take?: number;
  initialPage?: number;
};

const initialState = {
  query: '',
  page: 1,
  take: 10,
} as const;

export const useTablePagination = <T>({
  apiMethod,
  take,
  initialPage = 1,
}: UsePaginationProps<T>): UsePaginationReturnProps<T> => {
  const [isLoading, loading, loaded] = useIsLoading();
  const [data, setData] = React.useState<PaginationData<T>>({
    items: [],
    totalCount: 0,
  });
  const [state, setState] = useSetState<QueryParams>({
    ...initialState,
    page: initialPage,
    take: take || initialState.take,
  });

  const setPage = (page: number): void => {
    setState({
      page,
    });
  };

  const setQuery = (query: string): void => {
    setState({
      query,
    });
  };

  const setTake = (val: number): void => {
    setState({
      take: val,
    });
  };

  const setParams = (newState: typeof state): void => {
    setState(newState);
  };

  React.useEffect(() => {
    (async (): Promise<void> => {
      loading();
      try {
        const resp = await apiMethod(state);
        setData({
          items: resp.items,
          totalCount: resp.meta.total,
        });
      } catch (error) {
        console.error('StatisticDashboard error', error);
      } finally {
        loaded();
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const setLoading = (value: boolean): void => {
    if (value) {
      loading();
    } else {
      loaded();
    }
  };

  return {
    take: state.take || initialState.take,
    query: state.query || initialState.query,
    page: state.page || initialState.page,
    setPage,
    setQuery,
    setTake,
    setParams,
    isLoading,
    setLoading,
    data,
    setData,
  } as const;
};
