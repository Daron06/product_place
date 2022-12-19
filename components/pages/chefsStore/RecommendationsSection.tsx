import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { GoToLink } from 'components/GoToLink';
import styles from 'components/pages/home/Main.module.scss';
import { ProductCard } from 'components/ProductCard';
import { Slider } from 'components/Slider';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { ImmutableProductsState } from 'redux/ducks/products/types/state';

import storeStyles from './ChefStore.module.scss';

interface RecommendationsSectionProps {
  items: ImmutableProductsState['items'];
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({ items }): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('chefStore');
  const { t, getTranslatedText } = useTranslate('chefs-store');

  if (!items) {
    return null;
  }

  const sliderSettings = {
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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

  return (
    <div className={storeStyles.sliderWrapper}>
      <section className={styles.section}>
        <div className={clsx(styles.sectionTitle, storeStyles.sectionTitle)}>
          <Typography variant="h3">{t('chefs-recommendations')}</Typography>
          <GoToLink href="/chefs-store" text={t('see-all')} />
        </div>
        <Slider sliderSettings={sliderSettings} fullLink="/chefs-store" autoPlaySpeed={3500}>
          {items.map((item) => (
            <Link key={item.id} href={`chefs-store/${item.slug}`}>
              <a className={storeStyles.cardItemLink} href={`chefs-store/${item.slug}`}>
                <ProductCard
                  description={getTranslatedText(item, 'shortDescription').substr(0, 50) || ''}
                  type={item.type}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  id={Number(item.id)}
                  name={getTranslatedText(item, 'name')}
                  imageUrl={item.media[0]?.url}
                  price={item.price}
                  rating={item.rating}
                  // TODO: Fix options type
                  options={item.options as any}
                  slug={item.slug}
                  isHome
                  isChefsStorePage
                />
              </a>
            </Link>
          ))}
        </Slider>
      </section>
    </div>
  );
};
