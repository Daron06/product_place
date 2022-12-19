import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import styles from 'components/pages/home/Main.module.scss';
import { ProductCard } from 'components/ProductCard';
import { Slider } from 'components/Slider';
import Link from 'next/link';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

interface TrendingItemsSectionProps {
  items: Product[] | null;
}

export const TrendingItemsSection: React.FC<TrendingItemsSectionProps> = ({ items }): React.ReactElement | null => {
  if (!items) {
    return null;
  }

  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.title}>
          <Typography variant="h3">Trending items</Typography>
          <GoToLink href="/trending-items" text="See all" />
        </div>
        <Slider fullLink="/trending-items" autoPlaySpeed={4000}>
          {items.map((item) => (
            <Link key={item.id} href={`menu/${item.name}`}>
              <a className={styles.cardItemLink} href={`menu/${item.name}`}>
                <ProductCard
                  type={item.type}
                  id={Number(item.id)}
                  classes={{
                    cardItemImage: styles.trendingCardItemImageHeight,
                  }}
                  name={item.name}
                  description={item.description}
                  imageUrl={item.media[0]?.url}
                  price={item.price}
                  rating={item.rating}
                  slug={item.slug}
                />
              </a>
            </Link>
          ))}
        </Slider>
      </section>
    </Container>
  );
};
