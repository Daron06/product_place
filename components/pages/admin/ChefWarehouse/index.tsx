import clsx from 'clsx';
import { ProductCategoriesList } from 'components/AddCartButtons/ProductCategoriesList';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import { ProductCard } from 'components/ProductCard';
import { ProductFilters } from 'components/ProductFilters';
import { useDirectories } from 'hooks/useDirectories';
import useProducts from 'hooks/useProducts';
import { castDraft } from 'immer';
import { CardsList } from 'layouts/CardsList';
import { ProductsPagination } from 'layouts/ProductsPagination';
import { ProductsSearch } from 'layouts/ProductsSearch';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChefFromProduct, setChefToProduct } from 'redux/ducks/products/actionCreators';
import { AdminProductsApi } from 'services/api/admin/ProductsApi';
import { DashboardRole, OrderByProduct, ProductsKindSearch } from 'services/types';

import { selectSuppliersDirectory } from '../../../../redux/ducks/directories/selectors';
import styles from './ChefWarehouse.module.scss';

interface ChefWarehouseProps {
  role: DashboardRole.STAFF | DashboardRole.CHEF;
}

export const ChefWarehouse: React.FC<ChefWarehouseProps> = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    onClickSearch,
    onPaginate,
    onSearchQueryChange,
    onPriceRangeApply,
    onSortMenu,
    onSuppliersApply,
    onFilterReset,
    onCategoryToggle,
    items,
    isLoading,
    isLoaded,
    totalCount,
    currentPage,
    takeCount,
    queryParams,
  } = useProducts(ProductsKindSearch.ADMIN_CHEF_STORE);
  const suppliers = useSelector(selectSuppliersDirectory);

  const { categories } = useDirectories({ admin: true, directories: ['categories', 'suppliers'] });

  const handleImportProduct = async (
    event: React.MouseEvent,
    id: string,
    isImported: boolean,
  ): Promise<void | boolean> => {
    event.preventDefault();

    if (role === DashboardRole.STAFF) {
      await router.push(`/admin/staff/store/${id}`);
      return;
    }

    try {
      if (isImported) {
        await AdminProductsApi.deleteStore([Number(id)]);
        dispatch(deleteChefFromProduct(Number(id)));
      } else {
        const data = await AdminProductsApi.importProduct(id);
        dispatch(setChefToProduct({ productId: Number(id), chef: data.chef }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const pathToCardDetails = role === DashboardRole.CHEF ? '/admin/chef/store/warehouse' : '/admin/staff/store';

  return (
    <div className={styles.root}>
      <div className="mb-30">
        <CreateHeader title="Warehouse" />
      </div>
      <ProductsSearch
        placeholder="Search Warehouse"
        onSubmitSearch={onClickSearch}
        onSearchQueryChange={onSearchQueryChange}
        value={queryParams.query}
      />
      {categories && <ProductCategoriesList items={categories} onCategorySelect={onCategoryToggle} />}
      <ProductFilters
        onFilterReset={onFilterReset}
        onPriceRangeApply={onPriceRangeApply}
        onSortMenu={onSortMenu}
        minPrice={queryParams.minPrice}
        maxPrice={queryParams.maxPrice}
        sortValue={queryParams.orderBy || OrderByProduct.NAME_DESC || OrderByProduct.NAME_ASC}
        suppliers={castDraft(suppliers)}
        onSuppliersApply={onSuppliersApply}
      />
      <CardsList
        classes={{ list: styles.list }}
        isLoading={isLoading}
        isLoaded={isLoaded}
        itemsLength={items.length}
        skeletonWidth={310}
        skeletonCount={10}
      >
        {items?.map((item) => (
          <Link key={item.id} href={`${pathToCardDetails}/${item.id}`}>
            <a href={`${pathToCardDetails}/${item.id}`}>
              <ProductCard
                classes={{
                  cardItem: styles.adminChefStore,
                  cardItemDetails: styles.adminStoreCardItemDetails,
                  buy: styles.cardBuy,
                  commission: styles.commission,
                }}
                disabledFavorite
                description={item.description}
                topRightAdornment={item.chef ? <Icon type="success-bold" /> : null}
                id={Number(item.id)}
                imageUrl={item.media[0]?.url}
                importButton={
                  <div className={styles.storeImportButton}>
                    <Button
                      classes={{ root: clsx({ [styles.removeButton]: item.chef }) }}
                      color="secondary"
                      fullWidth
                      size="large"
                      onClick={(event): Promise<void | boolean> =>
                        handleImportProduct(event, item.id, Boolean(item.chef))
                      }
                      variant="contained"
                    >
                      {item.chef ? '- Remove Item' : '+ Import Item'}
                    </Button>
                  </div>
                }
                name={item.name}
                price={item.price}
                rating={item.rating}
                size="large"
                type={item.type}
                slug={item.slug}
              />
            </a>
          </Link>
        ))}
      </CardsList>
      {!!items?.length && (
        <ProductsPagination
          currentCount={items.length}
          currentPage={currentPage || 1}
          loading={isLoading}
          takeCount={takeCount}
          totalCount={totalCount}
          onPaginate={onPaginate}
        />
      )}
    </div>
  );
};
