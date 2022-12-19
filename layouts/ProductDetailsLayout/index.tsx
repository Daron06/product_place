import PlaceholderImage from 'assets/images/placeholder.svg';
import { Breadcrumbs, BreadcrumbsItems } from 'components/Breadcrumbs';
import { ThumbnailSlider } from 'components/ThumbnailSlider/ThumbnailSlider';
import React from 'react';
import { Media } from 'redux/ducks/products/types/contracts';

import styles from './ProductDetailsLayout.module.scss';
import { ProductDetailsSkeleton } from './ProductDetailsSkeleton';

interface ProductDetailsLayoutProps {
  breadcrumbs: BreadcrumbsItems[];
  loading: boolean;
  sliderItems: Readonly<Media[]> | undefined;
  breadcrumbsCssClass?: string;
}

const ProductDetailsSlider: React.FC<Pick<ProductDetailsLayoutProps, 'sliderItems'>> = ({
  sliderItems,
}): React.ReactElement | null => {
  if (!sliderItems) {
    return null;
  }

  return sliderItems.length ? (
    <ThumbnailSlider items={sliderItems} />
  ) : (
    <div className={styles.placeholder}>
      <PlaceholderImage />
    </div>
  );
};

export const ProductDetailsLayout: React.FC<ProductDetailsLayoutProps> = ({
  breadcrumbs,
  children,
  loading,
  sliderItems,
  breadcrumbsCssClass,
}): React.ReactElement => {
  if (loading) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className={styles.container}>
      <div className="mb-20">
        <Breadcrumbs items={breadcrumbs} cssClass={breadcrumbsCssClass} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          <ProductDetailsSlider sliderItems={sliderItems} />
        </div>
        <div className={styles.information}>{children}</div>
      </div>
    </div>
  );
};
