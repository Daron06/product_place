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

interface TrendingunknownSectionProps {
  items: Product[] | null;
}

export const TrendingunknownSection: React.FC<TrendingunknownSectionProps> = ({ items }): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('menu');
  const { t, getTranslatedText } = useTranslate('main');

  if (!items) {
    return null;
  }

  return (
    <section className={styles.section} data-test-id="home-menu-section">
      <Container>
        <div className={styles.sectionTitle}>
          <Typography variant="h3">{t('menuTitle')}</Typography>
          <GoToLink href="/menu" text={t('seeAll')} />
        </div>
        <Slider fullLink="/menu" autoPlaySpeed={4200}>
          {items.map((item) => (
            <Link key={item.id} href={`menu/${item.slug}`}>
              <a className={styles.cardItemLink} href={`menu/${item.slug}`}>
                <ProductCard
                  type={item.type}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  id={Number(item.id)}
                  name={getTranslatedText(item, 'name')}
                  description={getTranslatedText(item, 'description')}
                  icon="video-yellow"
                  imageUrl={item.media[0]?.url}
                  price={item.price}
                  tags={item.cuisine && [item.cuisine.name]}
                  slug={item.slug}
                  rating={item.rating}
                />
              </a>
            </Link>
          ))}
        </Slider>
      </Container>
    </section>
  );
};
