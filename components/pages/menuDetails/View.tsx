import Divider from '@material-ui/core/Divider';
import { ImmutableProductDetailsState } from 'hooks/useProductDetails/reducer';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { ProductDetailsLayout } from 'layouts/ProductDetailsLayout';
import { ProductDetailsActions } from 'layouts/ProductDetailsLayout/ProductDetailsActions';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { ProductDetailsDescription } from 'layouts/ProductDetailsLayout/ProductDetailsDescription';
import { ProductDetailsInfo } from 'layouts/ProductDetailsLayout/ProductDetailsInfo';
import { ProductDetailsLikeCount } from 'layouts/ProductDetailsLayout/ProductDetailsLikeCount';
import { ProductDetailsName } from 'layouts/ProductDetailsLayout/ProductDetailsName';
import { ProductDetailsPrice } from 'layouts/ProductDetailsLayout/ProductDetailsPrice';
import React from 'react';

interface MenuDetailsViewProps {
  menuItem: ImmutableProductDetailsState['data'];
  loading: boolean;
}

export const MenuDetailsView: React.FC<MenuDetailsViewProps> = ({ loading, menuItem }): React.ReactElement => {
  const { t, getTranslatedText } = useTranslate('menu');

  if (!menuItem) {
    return <div>Menu details is null</div>;
  }

  return (
    <ProductDetailsLayout
      breadcrumbs={[
        { title: t('home'), url: '/' },
        { title: t('title'), url: '/menu' },
        { title: getTranslatedText(menuItem, 'name') ?? '' },
      ]}
      loading={loading}
      sliderItems={castDraft(menuItem?.media)}
    >
      {menuItem.rating > 0 && <ProductDetailsLikeCount>{menuItem.rating}</ProductDetailsLikeCount>}

      <ProductDetailsName
        loading={loading}
        title={getTranslatedText(menuItem, 'name')}
        subTitle={`Calories ${menuItem?.productInfo?.calories}kcal, Fat ${menuItem?.productInfo?.fat}g, Proteins ${menuItem?.productInfo?.proteins}g, Carbs ${menuItem?.productInfo?.carbs}g`}
      />
      {menuItem.cuisine && (
        <ProductDetailsInfo cuisine={getTranslatedText(menuItem.cuisine, 'name')} allergens={menuItem.allergens} />
      )}
      <ProductDetailsPrice loading={loading} value={menuItem.price} />
      <ProductDetailsDescription loading={loading} text={getTranslatedText(menuItem, 'description')} />
      <ProductDetailsActions
        image={menuItem.media?.[0]?.url}
        name={menuItem.name}
        id={menuItem.id}
        price={menuItem.price}
        favoriteType="menu"
        type={menuItem.type}
        slug={menuItem.slug}
      />
      <Divider />
      <ProductDetailsChefInfo
        avatar={menuItem.chef.image}
        name={menuItem.chef.name}
        description={getTranslatedText(menuItem.chef, 'description')}
        slug={menuItem.chef.slug}
        loading={loading}
      />
    </ProductDetailsLayout>
  );
};
