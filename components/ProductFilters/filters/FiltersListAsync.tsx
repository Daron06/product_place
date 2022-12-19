import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';

import { useIsLoading } from '../../../hooks/useIsLoading';
import { ProductsApi } from '../../../services/api/ProductsApi';
import { Supplier } from '../../../services/types';
import { FilterList } from '../../FilterList';

interface FiltersListAsyncProps {
  label: string;
  selected?: number[];
  onApply?: (ids: number[]) => void;
  onReset?: () => void;
  directory: 'cuisines' | 'chefs' | 'suppliers';
  testId?: string;
}

export const FiltersListAsync: React.FC<FiltersListAsyncProps> = ({
  label,
  testId,
  selected,
  directory,
  onApply,
  onReset,
}) => {
  const [items, setItems] = React.useState<Array<Cuisine | Chef | Supplier>>([]);
  const { 0: isLoading, 2: loaded } = useIsLoading(true);
  const { t } = useTranslate('search');

  async function fetchData(): Promise<void> {
    try {
      const data = await ProductsApi.directories([directory]);
      setItems(data[directory] || []);
      loaded();
    } catch (err) {
      console.warn(`Error fetching "${directory}"`, err);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <FilterList<number>
      items={items.map((item) => ({ name: item.name, value: Number(item.id) }))}
      values={selected}
      onApply={onApply}
      onReset={onReset}
      label={label}
      placeholder={t('search')}
      testId={testId}
      isLoading={isLoading}
    />
  );
};
