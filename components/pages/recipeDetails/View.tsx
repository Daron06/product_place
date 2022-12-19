import Divider from '@material-ui/core/Divider';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { RecipeTab } from 'components/pages/recipeDetails/RecipeTab';
import { RequiredGrid } from 'components/ProductGrid';
import { TabPanel } from 'components/TabPanel';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { ProductDetailsLayout } from 'layouts/ProductDetailsLayout';
import { ProductDetailsActions } from 'layouts/ProductDetailsLayout/ProductDetailsActions';
import { ProductDetailsAttention } from 'layouts/ProductDetailsLayout/ProductDetailsAttention';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { ProductDetailsDescription } from 'layouts/ProductDetailsLayout/ProductDetailsDescription';
import { ProductDetailsInfo } from 'layouts/ProductDetailsLayout/ProductDetailsInfo';
import { ProductDetailsLikeCount } from 'layouts/ProductDetailsLayout/ProductDetailsLikeCount';
import { ProductDetailsName } from 'layouts/ProductDetailsLayout/ProductDetailsName';
import { ProductDetailsPrice } from 'layouts/ProductDetailsLayout/ProductDetailsPrice';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { StatusEnum } from 'services/types';

import styles from './RecipesDetails.module.scss';

interface RecipeDetailsViewProps {
  recipe: Product | null;
  loading: boolean;
}

const lockSvg = (
  <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      opacity="0.7"
      d="M3 6H2C1.44772 6 1 6.44772 1 7V15C1 15.5523 1.44771 16 2 16H11C11.5523 16 12 15.5523 12 15V7C12 6.44772 11.5523 6 11 6H10M3 6V4.5C3 2.567 4.567 1 6.5 1V1C8.433 1 10 2.567 10 4.5V6M3 6H10M7.5158 11.9684L7.22361 12.5528C7.08657 12.8269 6.80643 13 6.5 13V13C6.19357 13 5.91343 12.8269 5.77639 12.5528L5.4842 11.9684C5.16578 11.3316 5 10.6293 5 9.91729V9.91729C5 9.41068 5.41068 9 5.91729 9H7.08271C7.58932 9 8 9.41068 8 9.91729V9.91729C8 10.6293 7.83422 11.3316 7.5158 11.9684Z"
      stroke="#373737"
    />
  </svg>
);

export const RecipeDetailsView: React.FC<RecipeDetailsViewProps> = ({ recipe, loading }): React.ReactElement => {
  const [activeTab, setActiveTab] = React.useState<string>('send');
  const { t, getTranslatedText } = useTranslate('recipes-details');

  if (recipe === null) {
    return <div>{t('details-empty')}</div>;
  }

  const handleTabsChange = (_, newValue: string): void => {
    setActiveTab(newValue);
  };

  return (
    <ProductDetailsLayout
      breadcrumbs={[
        { title: t('home'), url: '/' },
        { title: t('recipes'), url: '/recipes' },
        { title: getTranslatedText(recipe, 'name') ?? '' },
      ]}
      loading={loading}
      sliderItems={castDraft(recipe?.media)}
    >
      {recipe.rating > 0 && <ProductDetailsLikeCount>{recipe.rating}</ProductDetailsLikeCount>}
      <ProductDetailsName
        loading={loading}
        title={getTranslatedText(recipe, 'name')}
        subTitle={t('recipe-energy-value', {
          params: {
            calories: recipe?.productInfo?.calories || 0,
            fat: recipe?.productInfo?.fat || 0,
            proteins: recipe?.productInfo?.proteins || 0,
            carbs: recipe?.productInfo?.carbs || 0,
          },
        })}
      />
      {recipe.cuisine && (
        <ProductDetailsInfo cuisine={getTranslatedText(recipe.cuisine, 'name')} allergens={recipe.allergens} />
      )}
      <ProductDetailsPrice loading={loading} value={recipe.price} />
      <ProductDetailsDescription loading={loading} text={getTranslatedText(recipe, 'description')} />
      {recipe.product?.slug && recipe.product?.status === StatusEnum.ACTIVE && (
        <ProductDetailsAttention chefName={recipe.chef.name} productLink={recipe.product?.slug} />
      )}
      <ProductDetailsActions
        favoriteType="recipe"
        image={recipe.media?.[0]?.url}
        name={recipe.name}
        id={recipe.id}
        price={recipe.price}
        type={recipe.type}
        slug={recipe.slug}
      />
      <Divider />
      <ProductDetailsChefInfo
        slug={recipe.chef.slug}
        avatar={recipe.chef.image}
        name={recipe.chef.name}
        description={getTranslatedText(recipe.chef, 'description')}
        loading={loading}
      />
      <div className="mt-30">
        <Tabs
          className={styles.tabs}
          TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
          indicatorColor="primary"
          onChange={handleTabsChange}
          value={activeTab}
        >
          <Tab label={t('what-we-send')} icon={recipe.ingredients.length ? undefined : lockSvg} value="send" />
          <Tab label={t('recipe')} icon={recipe.steps.length ? undefined : lockSvg} value="recipe" />
          <Tab label={t('require')} value="require" />
        </Tabs>
        <TabPanel active={activeTab} tab="send">
          <RequiredGrid items={recipe.ingredients} />
        </TabPanel>
        <TabPanel active={activeTab} tab="recipe">
          <RecipeTab items={recipe.steps} url={recipe?.video?.url} />
        </TabPanel>
        <TabPanel active={activeTab} tab="require">
          <RequiredGrid items={recipe.required} />
        </TabPanel>
      </div>
    </ProductDetailsLayout>
  );
};
