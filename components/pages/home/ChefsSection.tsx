import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import { Slider } from 'components/Slider';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';

import { CardItem } from '../../CardItem';
import styles from './Main.module.scss';

interface ChefsSectionProps {
  items: Chef[];
}

export const ChefsSection: React.FC<ChefsSectionProps> = ({ items }): React.ReactElement => {
  const { hasFavorite, toggleFavorite } = useFavorite('chef');
  const { t, getTranslatedText } = useTranslate('main');

  return (
    <section className={styles.section} data-test-id="home-chefs-section">
      <Container>
        <div className={styles.sectionTitle}>
          <Typography variant="h3" component="h2">
            {t('chefsTitle')}
          </Typography>
          <GoToLink href="/chefs" text={t('seeAll')} />
        </div>
        <Slider fullLink="/chefs" autoPlaySpeed={3500}>
          {items.map((item) => (
            <Link key={item.slug} href={`/chefs/${item.slug}`}>
              <a className={styles.cardItemLink}>
                <CardItem
                  id={Number(item.id)}
                  onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                  favorite={hasFavorite(Number(item.id))}
                  classes={{
                    cardItemImage: styles.cardItemChefImage,
                    cardItemDescription: styles.cardItemChefDescription,
                  }}
                  name={item.name}
                  description={getTranslatedText(item, 'description')}
                  imageUrl={item.image}
                  type="chef"
                />
              </a>
            </Link>
          ))}
        </Slider>
      </Container>
    </section>
  );
};
