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

import { ChefsStoreSliderSettings } from '.';
import storeStyles from './ChefStore.module.scss';

interface ExclusiveSectionProps {
  items: ImmutableProductsState['items'];
}

export const ExclusiveSection: React.FC<ExclusiveSectionProps> = ({ items }): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('chefStore');
  const { t, getTranslatedText } = useTranslate('chefs-store');

  if (!items) {
    return null;
  }

  return (
    <div className={storeStyles.sliderWrapper}>
      <section className={styles.section}>
        <div className={clsx(styles.sectionTitle, storeStyles.sectionTitle)}>
          <Typography variant="h3">{t('exclusive-limited')}</Typography>
          <GoToLink href="/chefs-store" text={t('see-all')} />
        </div>
        <Slider sliderSettings={ChefsStoreSliderSettings} fullLink="/chefs-store" autoPlaySpeed={3500}>
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
