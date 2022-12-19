import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import styles from 'components/pages/home/Main.module.scss';
import { ProductCard } from 'components/ProductCard';
import { Slider } from 'components/Slider';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

interface TrendingStoreItemsSectionProps {
  items: Product[];
}

export const TrendingStoreItemsSection: React.FC<TrendingStoreItemsSectionProps> = ({
  items,
}): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('chefStore');
  const { t, getTranslatedText } = useTranslate('main');

  if (!items) {
    return null;
  }
  return (
    <section className={styles.section} data-test-id="home-recipes-section">
      <Container>
        <div className={styles.sectionTitle}>
          <Typography variant="h3">{t('chefsStoreTitle')}</Typography>
          <GoToLink href="/chefs-store" text={t('seeAll')} />
        </div>
        <Slider fullLink="/chefs-store" autoPlaySpeed={3500}>
          {items.map((item) => (
            <Link key={item.id} href={`chefs-store/${item.slug}`}>
              <a className={styles.cardItemLink} href={`chefs-store/${item.slug}`}>
                <ProductCard
                  description={getTranslatedText(item, 'shortDescription') || ''}
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
                />
              </a>
            </Link>
          ))}
        </Slider>
      </Container>
    </section>
  );
};
