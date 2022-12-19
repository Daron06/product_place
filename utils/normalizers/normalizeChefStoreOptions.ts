import { useTranslate } from 'hooks/useTranslate';

import { ProductOption, ProductOptionCategory } from '../../redux/ducks/products/types/contracts';
import { Option, OptionVariants, StatusEnum } from '../../services/types';

export const normalizeChefStoreOptions = (arr: ProductOption[], isSupplier = false): Option[] => {
  const categories: Record<string, ProductOptionCategory> = {};
  const objOptions = arr.reduce<Record<string, OptionVariants[]>>((prev, obj) => {
    const key = obj.option.category.name;
    categories[key] = obj.option.category;
    if (!prev[key]) {
      // eslint-disable-next-line no-param-reassign
      prev[key] = [];
    }

    const { currentLanguage } = useTranslate();
    const nameKey = currentLanguage === 'en' ? 'name' : `name__${currentLanguage}`;

    prev[key].push({
      id: obj.option.id,
      option_id: obj.option.id,
      name: obj.option[nameKey] || obj.option.name,
      slug: obj.option.slug,
      inventory: obj.inventory,
      sku: obj.sku,
      price: Number(obj.price),
      supplierPrice: Number(obj.supplierPrice),
      chefPrice: Number(obj.chefPrice),
      color: obj.option.color,
      msrpPrice: obj.msrpPrice ?? 0,
      ...(!isSupplier
        ? {
            supplierPrice: obj.supplierPrice ?? 0,
            chefPrice: obj.chefPrice ?? 0,
          }
        : {}),
    });
    return prev;
  }, {});

  return Object.entries(objOptions).map(([name, options]) => ({
    ...categories[name],
    name,
    options,
    status: StatusEnum.ACTIVE,
    type: categories[name].type as Option['type'],
  }));
};
