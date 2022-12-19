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

import mainStyles from './Main.module.scss';

interface TrendingRecipesSectionProps {
  items: Product[];
}

export const TrendingRecipesSection: React.FC<TrendingRecipesSectionProps> = ({ items }): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('recipe');
  const { t, getTranslatedText } = useTranslate('main');

  if (!items.length) {
    return null;
  }

  const renderItems = (): React.ReactNode =>
    items.map((item) => (
      <Link key={item.id} href={`recipes/${item.slug}`}>
        <a className={styles.cardItemLink} href={`recipes/${item.slug}`}>
          <ProductCard
            type={item.type}
            onClickFavorite={(): void => toggleFavorite(Number(item.id))}
            favorite={hasFavorite(Number(item.id))}
            id={Number(item.id)}
            name={getTranslatedText(item, 'name')}
            description={getTranslatedText(item, 'description')}
            imageUrl={item.media[0]?.url}
            price={item.price}
            rating={item.rating}
            tags={item.cuisine && [item.cuisine.name]}
            slug={item.slug}
          />
        </a>
      </Link>
    ));

  return (
    <section className={styles.section} data-test-id="home-recipes-section">
      <Container>
        <div className={styles.sectionTitle}>
          <Typography variant="h3">{t('recipeTitle')}</Typography>
          {items.length > 4 && <GoToLink href="/recipes" text={t('seeAll')} />}
        </div>
        {items.length <= 4 ? (
          <div className={mainStyles.productsGrid}>{renderItems()}</div>
        ) : (
          <Slider fullLink="/recipes" autoPlaySpeed={4500}>
            {renderItems()}
          </Slider>
        )}
      </Container>
    </section>
  );
};
