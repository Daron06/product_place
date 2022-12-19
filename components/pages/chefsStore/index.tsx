import { GalleryBanners } from 'components/banners/GalleryBanners';
import { PromoBanner } from 'components/banners/PromoBanner';
import { CategoriesMenu } from 'components/CategoriesMenu';
import { CategoriesTop } from 'components/CategoriesTop';
import { InstagramBlock } from 'components/InstagramBlock';
import { PageTitle } from 'components/PageTitle';
import { useTranslate } from 'hooks/useTranslate';
import { ProductsLayoutFullWidth } from 'layouts/ProductsLayoutFullWidth';
import React from 'react';
import { Chef, Product } from 'redux/ducks/products/types/contracts';
import { Banner, CategoryItem, Supplier } from 'services/types';
import { getMappedBanners } from 'utils/getMappedBanners';

import { BestsellersSection } from './BestsellersSection';
import styles from './ChefStore.module.scss';
import { ExclusiveSection } from './ExclusiveSection';
import { RecommendationsSection } from './RecommendationsSection';

interface ChefsStoreProps {
  items: Product[];
  bestsellersItems: Product[];
  exlusiveItems: Product[];
  totalCount?: number;
  categories?: CategoryItem[];
  topCategories?: CategoryItem[];
  chefs?: Chef[] | null;
  suppliers?: Supplier[] | null;
  banners?: Banner[];
}

export const ChefsStoreSliderSettings = {
  slidesToShow: 5,
  slidesToScroll: 3,
  infinite: true,
  responsive: [
    {
      breakpoint: 1700,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2,
        dots: true,
        dotsClass: 'mobileSliderDots',
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true,
        dots: true,
        dotsClass: 'mobileSliderDots',
      },
    },
  ],
};

export const ChefsStore: React.FC<ChefsStoreProps> = ({
  categories,
  items,
  bestsellersItems,
  exlusiveItems,
  topCategories,
  banners,
}) => {
  const { t } = useTranslate('chefs-store');

  const { top: topBanners, center: centerBanners } = getMappedBanners(banners || []);
  const centerBanner = centerBanners?.[0];

  return (
    <>
      <div className={styles.mobilTitle}>
        <PageTitle>{t('chefs-store')}</PageTitle>
      </div>
      <div className={styles.fullContainer}>
        {categories && <CategoriesMenu categories={categories} />}

        <ProductsLayoutFullWidth pageTitle={t('chefs-store')}>
          <div className="mb-50">{topBanners && <GalleryBanners items={topBanners} />}</div>
          {topCategories && <CategoriesTop categories={topCategories} />}
          {bestsellersItems.length > 0 && <BestsellersSection items={bestsellersItems} />}
          {centerBanner && <PromoBanner imageUrl={centerBanner.image} link={centerBanner.link} />}
          {exlusiveItems.length > 0 && <ExclusiveSection items={exlusiveItems} />}
          {items.length > 0 && <RecommendationsSection items={items} />}
        </ProductsLayoutFullWidth>
      </div>
      <InstagramBlock />
    </>
  );
};
