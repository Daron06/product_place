import { Tab, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import useMap from 'ahooks/lib/useMap';
import { FilterListProps } from 'components/FilterList';
import styles from 'components/MainSearch/MainSearch.module.scss';
import { countOfPeoplesTemp } from 'components/pages/admin/staff/chef-table/constants';
import format from 'date-fns/format';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { setChefsFilters } from 'redux/ducks/chefs/actionCreators';
import { setFilters, setProductsKind } from 'redux/ducks/products/actionCreators';
import { Chef, Cuisine } from 'redux/ducks/products/types/contracts';
import { ChefHas, ProductQueryParams, ProductsKindSearch, StatusEnum, Supplier } from 'services/types';
import { convertMapToObject } from 'utils/convertMapToObject';

import { useTranslate } from '../../hooks/useTranslate';
import { ProductsApi } from '../../services/api/ProductsApi';
import { paramsToQueryString } from '../../utils/paramsToQueryString';
import { chefsIncludeItems } from '../pages/chefs';
import { PriceFilterProps } from '../PriceFilter';
import { Search } from '../Search';
import { AsyncSearchChef } from './AsyncSearchChefs';
import { DaysFilterItemProps } from './DaysFilterItem';
import { FilterItem, FilterListItem } from './FilterItem';

const PriceFilter = dynamic<PriceFilterProps>(
  () => import(/* webpackChunkName: "PriceFilter" */ 'components/PriceFilter').then((m) => m.PriceFilter),
  {
    ssr: false,
  },
);
const FilterList = dynamic<FilterListProps<ChefHas>>(
  () => import(/* webpackChunkName: "FilterList" */ 'components/FilterList').then((m) => m.FilterList),
  {
    ssr: false,
  },
);
const DaysFilterItem = dynamic<DaysFilterItemProps>(
  () => import(/* webpackChunkName: "DaysFilterItem" */ './DaysFilterItem').then((m) => m.DaysFilterItem),
  {
    ssr: false,
  },
);

export interface MainSearchProps {
  chefs: Chef[] | null;
  availableTabs: Array<ProductsKindSearch | undefined>;
}

const tabLabel: Map<string, string> = new Map();

tabLabel.set('Chef', 'Choose chef');
tabLabel.set('Cuisine', 'Choose cuisine');
tabLabel.set('Rating', 'What rating?');
tabLabel.set('Price', 'What price?');
tabLabel.set('Type', 'What type?');
tabLabel.set('Date', 'What date?');
tabLabel.set('Guests', 'How many guests?');

const productType = {
  chefTable: 'chefs-table',
  chefs: ProductsKindSearch.CHEFS,
  'chefs-store': ProductsKindSearch.CHEF_STORE,
  menu: ProductsKindSearch.MENU,
  masterClasses: 'master-classes',
  recipe: 'recipes',
};

export const typesArray = [
  { name: 'Online', id: 'online' },
  { name: 'Offline', id: 'offline' },
  { name: 'Recorded', id: 'recorded' },
];

export const chefTableTypesArray = [
  { name: 'At home', id: 'at-home' },
  { name: 'At restaurant', id: 'at-restaurant' },
];

export const durationsArray = [
  { name: '60', id: 60 },
  { name: '90', id: 90 },
  { name: '120', id: 120 },
  { name: '180', id: 180 },
];

const MainSearch: FC<MainSearchProps> = ({ chefs, availableTabs }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [directories, setDirectories] = React.useState<{ cuisines: Cuisine[]; suppliers: Supplier[] }>({
    cuisines: [],
    suppliers: [],
  });
  const [activeTab, setActiveTab] = React.useState<ProductsKindSearch>(ProductsKindSearch.CHEFS);
  const [filters, { set, remove }] = useMap<keyof ProductQueryParams, string | number | number[]>();
  const { t, currentLanguage } = useTranslate('main-search');
  const { t: chefsTr } = useTranslate('chefs');

  const handleTabsChange = (_: unknown, newValue: ProductsKindSearch): void => {
    setActiveTab(newValue);
  };

  const handleSearchParams = (ids: string | number[], queryField: keyof ProductQueryParams): void => {
    set(queryField, ids);
  };

  const handleDaysApply = (daysRange: { start: Date; end: Date }): void => {
    set('dateFrom', format(daysRange.start, 'yyyy-MM-dd'));
    set('dateTo', format(daysRange.end, 'yyyy-MM-dd'));
  };

  const handleOnSubmit = (): void => {
    const params = convertMapToObject(filters);
    setIsLoading(true);
    if (activeTab !== 'chefs') {
      dispatch(setProductsKind(activeTab));
      dispatch(setFilters(params));
    } else {
      dispatch(setChefsFilters(params));
    }
    router.push({
      pathname: productType[activeTab],
      query: paramsToQueryString(params),
    });
  };

  const handleDeleteFilter = (keys: Array<keyof ProductQueryParams>): void => {
    keys.forEach((item) => remove(item));
  };

  const handlePriceApply = (priceRange: [number, number]): void => {
    const [minPrice, maxPrice]: [number, number] = priceRange;
    set('minPrice', minPrice);
    set('maxPrice', maxPrice);
  };

  const prepareItems = (item): FilterListItem => ({
    name: currentLanguage === 'ar' && item.name__ar ? item.name__ar : item.name,
    value: item.id,
  });

  const cuisineLabel = filters.get('cuisine_ids')
    ? (filters.get('cuisine_ids') as number[])
        ?.map((id) => directories.cuisines?.find((obj) => Number(obj.id) === Number(id))?.name)
        .join(', ')
    : t('view-list');

  const supplierLabel = filters.get('supplier_ids')
    ? (filters.get('supplier_ids') as number[])
        ?.map((id) => directories.suppliers?.find((obj) => Number(obj.id) === Number(id))?.name)
        .join(', ')
    : t('view-list');

  const priceLabel =
    filters.get('minPrice') || filters.get('maxPrice')
      ? `Min: ${filters.get('minPrice')}; Max: ${filters.get('maxPrice')}`
      : 'Select';

  const labelByTab = activeTab === ProductsKindSearch.MASTER_CLASSES ? t('guests') : t('seats');

  const getGuestsLabel = (guestsArray: Array<{ name: string; id: string }>): string =>
    filters.get('people')
      ? (filters.get('people') as number[])
          ?.map((id) => guestsArray?.find((obj) => Number(obj.id) === Number(id))?.name)
          .join(', ')
      : `${t('how-many')} ${labelByTab}`;

  const typesLabel = filters.get('type')
    ? (filters.get('type') as number[])?.map((id) => typesArray?.find((obj) => obj.id === String(id))?.name).join(', ')
    : t('what-types');

  const chefTableTypesLabel = filters.get('type')
    ? (filters.get('type') as number[])
        ?.map((id) => chefTableTypesArray?.find((obj) => obj.id === String(id))?.name)
        .join(', ')
    : t('what-types');

  const dayLabel = filters.get('dateFrom')
    ? `${format(new Date(filters.get('dateFrom') as string), 'MMM dd')} - ${format(
        new Date(filters.get('dateTo') as string),
        'MMM dd',
      )}`
    : t('what-is-date');

  const durationsLabel = filters.get('duration')
    ? (filters.get('duration') as number[])
        ?.map((id) => durationsArray?.find((obj) => Number(obj.id) === Number(id))?.name)
        .join(', ')
    : t('what-is-duration');

  const chefsIncludeItemsTran = chefsIncludeItems.map((item) => ({
    name: chefsTr(item.value),
    value: item.value,
  }));

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        const { cuisines, suppliers } = await ProductsApi.directories(['cuisines', 'suppliers']);
        setDirectories({ cuisines: cuisines || [], suppliers: suppliers || [] });
      } catch (err) {
        console.warn('Error fetching directories MainSearch', err);
      }
    })();
  }, []);

  return (
    <Paper className={styles.mainSearch}>
      <Tabs
        TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
        indicatorColor="primary"
        onChange={handleTabsChange}
        value={activeTab}
      >
        {availableTabs?.includes(ProductsKindSearch.CHEFS) && (
          <Tab label={t('chefs')} value={ProductsKindSearch.CHEFS} />
        )}
        {availableTabs?.includes(ProductsKindSearch.MENU) && (
          <Tab label={t('delivery-menu')} value={ProductsKindSearch.MENU} />
        )}
        {availableTabs?.includes(ProductsKindSearch.RECIPE) && (
          <Tab label={t('recipe-boxes')} value={ProductsKindSearch.RECIPE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.CHEF_STORE) && (
          <Tab label={t('chefs-store')} value={ProductsKindSearch.CHEF_STORE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.CHEF_TABLE) && (
          <Tab label={t('chefs-table')} value={ProductsKindSearch.CHEF_TABLE} />
        )}
        {availableTabs?.includes(ProductsKindSearch.MASTER_CLASSES) && (
          <Tab label={t('masterclasses')} value={ProductsKindSearch.MASTER_CLASSES} />
        )}
      </Tabs>

      <Search classes={{ root: styles.searchRoot }} onSubmit={handleOnSubmit} loading={isLoading} isMainSearch>
        <div className={styles.filters} style={{ display: activeTab !== 'chefs' ? 'flex' : 'none' }}>
          <>
            {chefs && Number(chefs?.length) > 0 && (
              <AsyncSearchChef
                title={t('select-your-chef')}
                label={t('view-list')}
                placeholder={t('type-name')}
                popoverTitle={t('chef')}
                onFilterApply={(ids): void => handleSearchParams(ids, 'chef_ids')}
                onFilterReset={(): void => handleDeleteFilter(['chef_ids'])}
              />
            )}
            {directories.cuisines &&
              activeTab !== ProductsKindSearch.MASTER_CLASSES &&
              activeTab !== ProductsKindSearch.CHEF_TABLE &&
              activeTab !== ProductsKindSearch.CHEF_STORE && (
                <FilterItem
                  title={t('pick-category')}
                  placeholder={t('type-category')}
                  popoverTitle={t('pick-category')}
                  items={directories.cuisines.filter((obj) => obj.status === StatusEnum.ACTIVE).map(prepareItems)}
                  label={cuisineLabel}
                  onFilterApply={(ids): void => handleSearchParams(ids, 'cuisine_ids')}
                  onFilterReset={(): void => handleDeleteFilter(['cuisine_ids'])}
                />
              )}
            {(availableTabs?.includes(ProductsKindSearch.MASTER_CLASSES) ||
              availableTabs?.includes(ProductsKindSearch.CHEF_TABLE)) &&
              (activeTab === ProductsKindSearch.MASTER_CLASSES || activeTab === ProductsKindSearch.CHEF_TABLE) && (
                <DaysFilterItem
                  title={t('date')}
                  label={dayLabel}
                  onFilterApply={handleDaysApply}
                  onFilterReset={(): void => handleDeleteFilter(['dateFrom', 'dateTo'])}
                />
              )}
            {activeTab === ProductsKindSearch.MASTER_CLASSES && (
              <FilterItem
                title={t('guests')}
                items={countOfPeoplesTemp.masterClass.online.map(prepareItems)}
                label={getGuestsLabel(countOfPeoplesTemp.masterClass.online)}
                onFilterApply={(ids): void => handleSearchParams(ids, 'people')}
                onFilterReset={(): void => handleDeleteFilter(['people'])}
              />
            )}
            {activeTab === ProductsKindSearch.MASTER_CLASSES && (
              <FilterItem
                title={t('type')}
                items={typesArray.map(prepareItems)}
                label={typesLabel}
                onFilterApply={(ids): void => handleSearchParams(ids, 'type')}
                onFilterReset={(): void => handleDeleteFilter(['type'])}
              />
            )}
            {directories.suppliers && activeTab === ProductsKindSearch.CHEF_STORE && (
              <FilterItem
                title={t('pick-supplier')}
                placeholder={t('type-supplier')}
                popoverTitle={t('pick-supplier')}
                items={directories.suppliers.map(prepareItems)}
                label={supplierLabel}
                onFilterApply={(ids): void => handleSearchParams(ids, 'supplier_ids')}
                onFilterReset={(): void => handleDeleteFilter(['supplier_ids'])}
              />
            )}
            {activeTab === ProductsKindSearch.CHEF_TABLE && (
              <FilterItem
                title={t('type')}
                items={chefTableTypesArray.map(prepareItems)}
                label={chefTableTypesLabel}
                onFilterApply={(ids): void => handleSearchParams(ids, 'type')}
                onFilterReset={(): void => handleDeleteFilter(['type'])}
              />
            )}
            {(activeTab === ProductsKindSearch.CHEF_TABLE || activeTab === ProductsKindSearch.MASTER_CLASSES) && (
              <FilterItem
                title={t('durations')}
                items={durationsArray.map(prepareItems)}
                label={durationsLabel}
                onFilterApply={(ids): void => handleSearchParams(ids, 'duration')}
                onFilterReset={(): void => handleDeleteFilter(['duration'])}
              />
            )}
            {activeTab === ProductsKindSearch.CHEF_TABLE && (
              <FilterItem
                title={t('seats')}
                items={countOfPeoplesTemp.chefTable.map(prepareItems)}
                label={getGuestsLabel(countOfPeoplesTemp.chefTable)}
                onFilterApply={(ids): void => handleSearchParams(ids, 'people')}
                onFilterReset={(): void => handleDeleteFilter(['people'])}
              />
            )}
            <div className={styles.filterItem}>
              <Typography className={styles.blockTitle} variant="body2">
                {t('your-price-range')}
              </Typography>
              <PriceFilter
                classes={{
                  root: styles.chip,
                  label: styles.chipLabel,
                }}
                label={priceLabel}
                onApply={handlePriceApply}
                onReset={(): void => handleDeleteFilter(['maxPrice', 'minPrice'])}
                range={[0, 15000]}
              />
            </div>
          </>
        </div>
        <div className={styles.filterItem} style={{ display: activeTab === 'chefs' ? 'flex' : 'none' }}>
          <Typography className={styles.blockTitle} variant="body2">
            {t('category')}
          </Typography>
          <FilterList
            classes={{
              chipRoot: styles.chip,
              chipLabel: styles.chipLabel,
            }}
            items={chefsIncludeItemsTran}
            onApply={(ids): void => handleSearchParams(ids.join(','), 'types')}
            onReset={(): void => handleDeleteFilter(['types'])}
            label={t('select')}
          />
        </div>
      </Search>
    </Paper>
  );
};

export { MainSearch };
