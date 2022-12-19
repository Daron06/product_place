import { Typography } from '@material-ui/core';
import { CardItem } from 'components/CardItem';
import { MasterClassCardItem } from 'components/MasterClassCardItem';
import { ProductCard } from 'components/ProductCard';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import { CardsList } from 'layouts/CardsList';
import Link from 'next/link';
import React from 'react';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { FavoritesApi } from 'services/api/FavoritesApi';
import { getMasterClassType } from 'utils/getMasterClassType';

interface FavoritesProductTabProps {
  pathToItemDetails: 'chefs-table' | 'menu' | 'recipes' | 'chefs' | 'chefs-store' | 'master-classes';
  favoriteType: ProductType;
}

export const FavoritesProductTab: React.FC<FavoritesProductTabProps> = ({
  pathToItemDetails,
  favoriteType,
}): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite(favoriteType);
  const [favorite, setFavorite] = React.useState<Array<Product | Chef>>();
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const { getTranslatedText } = useTranslate();

  React.useEffect(() => {
    const getFavoriteByType = async (): Promise<void> => {
      try {
        const { items } = await FavoritesApi.getByType(favoriteType);
        setFavorite(items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoaded(true);
      }
    };

    getFavoriteByType();
  }, [favoriteType]);

  return (
    <CardsList isLoading={!isLoaded} isLoaded={isLoaded} itemsLength={favorite?.length}>
      {favorite?.map((item) => {
        const itemProduct = item as Product;

        const typeInfo =
          pathToItemDetails === 'master-classes' ? getMasterClassType(itemProduct?.additionalInfo?.type) : undefined;

        return (
          <Link key={item.id} href={`/${pathToItemDetails}/${item.slug}`}>
            <a href={`/${pathToItemDetails}/${item.slug}`}>
              {pathToItemDetails === 'master-classes' && (
                <MasterClassCardItem
                  tooltipText={typeInfo?.label || ''}
                  icon={typeInfo?.icon || ''}
                  imageUrl={itemProduct?.media[0]?.url}
                  title={getTranslatedText(item, 'name')}
                  price={itemProduct?.price}
                  rating={itemProduct?.rating}
                  id={Number(item.id)}
                  isFree={itemProduct?.isFree}
                />
              )}
              {pathToItemDetails === 'chefs-table' && (
                <CardItem
                  id={Number(item.id)}
                  type={itemProduct.type}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  description={getTranslatedText(item, 'description')}
                  name={getTranslatedText(item, 'name')}
                  rating={itemProduct?.rating}
                  imageUrl={itemProduct.media[0].url}
                  tags={[
                    `${itemProduct?.additionalInfo?.countOfPeople} seats`,
                    `${itemProduct?.additionalInfo?.duration} min`,
                  ]}
                  icon={itemProduct?.additionalInfo?.type === 'at-home' ? 'table-green' : 'table-yellow'}
                  tooltipText={
                    <div className="d-flex align-items-center">
                      <Typography variant="subtitle2">
                        <b>Chef Table</b>
                      </Typography>
                      &nbsp;
                      <Typography variant="subtitle2">
                        {itemProduct?.additionalInfo?.type === 'at-home' ? 'at your home' : 'at restaurant'}
                      </Typography>
                    </div>
                  }
                />
              )}
              {pathToItemDetails !== 'master-classes' && pathToItemDetails !== 'chefs-table' && (
                <ProductCard
                  id={Number(item.id)}
                  description={
                    pathToItemDetails === 'chefs-store'
                      ? getTranslatedText(item, 'shortDescription') || ''
                      : getTranslatedText(item, 'description')
                  }
                  name={getTranslatedText(item, 'name')}
                  imageUrl={pathToItemDetails !== 'chefs' ? itemProduct.media[0]?.url : item.image || ''}
                  price={itemProduct.price}
                  rating={itemProduct?.rating}
                  tags={itemProduct?.cuisine ? [itemProduct.cuisine.name] : []}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  type={itemProduct?.type}
                  slug={itemProduct?.slug}
                />
              )}
            </a>
          </Link>
        );
      })}
    </CardsList>
  );
};
