import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { Category } from 'services/types';

import { ProductsApi } from '../../../services/api/ProductsApi';
import style from './ProductCategoriesList.module.scss';

export interface ProductCategoriesListProps {
  onCategorySelect?: (ids: number[]) => void;
  items?: Readonly<Category[]>;
  title?: string;
  isAsync?: boolean;
  selected?: number[];
}

export const ProductCategoriesList: React.FC<ProductCategoriesListProps> = ({
  onCategorySelect,
  items,
  title = 'All items',
  isAsync,
  selected,
}): React.ReactElement => {
  // TODO remove the function castDraft
  const [selectedIds, setSelectedIds] = React.useState<number[]>(selected || []);
  const [categories, setCategories] = React.useState(items || []);
  const isMountedRef = React.useRef(false);
  const { getTranslatedText } = useTranslate();

  React.useEffect(() => {
    if (isMountedRef.current) {
      if (selected?.length) {
        setSelectedIds(selected);
      }
    }
    isMountedRef.current = true;
  }, [selected]);

  React.useEffect(() => {
    if (isAsync && (!items || !items?.length)) {
      ProductsApi.directories(['categories'])
        .then((data) => {
          if (data?.categories) {
            setCategories(data?.categories);
          }
        })
        .catch((err) => {
          console.warn('Error fetching categories', err);
        });
    }
  }, [isAsync]);

  const toggle = (id: number): void => {
    let arr = selectedIds;

    if (selectedIds.includes(id)) {
      arr = arr.filter((v) => v !== id);
    } else {
      arr = [...arr, id];
    }

    setSelectedIds(arr);
    onCategorySelect?.(arr);
  };

  const selectAll = () => {
    let arr: number[] = [];
    if (selectedIds.length !== categories.length) {
      arr = categories.map((o) => o.id);
    }
    setSelectedIds(arr);
    onCategorySelect?.(arr);
  };

  const allSelected = selectedIds.length === categories.length;

  return (
    <div className="mb-30">
      <div className={clsx('d-flex flex-wrap mb-30', style.categories)}>
        <Chip
          classes={{
            root: clsx(style.category, style.categoryAll, { [style.categoryChecked]: allSelected }),
            label: style.categoryLabel,
          }}
          clickable
          color="secondary"
          label="All"
          onClick={selectAll}
          variant="outlined"
        />
        {categories.map((item) => (
          <Chip
            classes={{
              root: clsx(style.category, { [style.categoryChecked]: selectedIds.includes(item.id) }),
              label: style.categoryLabel,
              icon: style.categoryIcon,
            }}
            className="mb-15"
            clickable
            color="secondary"
            key={item.id}
            label={getTranslatedText(item, 'name')}
            onClick={(): void => toggle(item.id)}
            variant="outlined"
          />
        ))}
      </div>
      <Typography className={style.title} variant="h4">
        {title}
      </Typography>
    </div>
  );
};
