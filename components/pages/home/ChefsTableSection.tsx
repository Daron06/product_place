import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import { Slider } from 'components/Slider';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

import { CardItem } from '../../CardItem';
import styles from './Main.module.scss';

interface ChefsTableSectionProps {
  items: Product[];
}

export const ChefsTableSection: React.FC<ChefsTableSectionProps> = ({ items }): React.ReactElement | null => {
  const { hasFavorite, toggleFavorite } = useFavorite('chefTable');
  const { t, getTranslatedText } = useTranslate('main');

  if (!items) {
    return null;
  }

  return (
    <section className={styles.section} data-test-id="home-chefs-table-section">
      <Container>
        <section className={styles.section}>
          <div className={styles.sectionTitle}>
            <Typography variant="h3">{t('chefsTableTitle')}</Typography>
            <GoToLink href="/chefs-table" text={t('seeAll')} />
          </div>
          <Slider
            fullLink="/chefs-table"
            sliderSettings={{
              slidesToShow: 3,
            }}
            autoPlaySpeed={4500}
          >
            {items.map((item) => (
              <Link key={item.id} href={`/chefs-table/${item.slug}`}>
                <a className={styles.cardItemLink} href={`/chefs-table/${item.slug}`}>
                  <CardItem
                    id={Number(item.id)}
                    type={item.type}
                    onClickFavorite={(): void => toggleFavorite(Number(item.id))}
                    favorite={hasFavorite(Number(item.id))}
                    name={getTranslatedText(item, 'name')}
                    description={getTranslatedText(item, 'description')}
                    rating={item.rating}
                    imageUrl={item.media[0].url}
                    tags={[`${item?.additionalInfo?.countOfPeople} seats`, `${item?.additionalInfo?.duration} min`]}
                    icon={item?.additionalInfo?.type === 'at-home' ? 'table-green' : 'table-yellow'}
                    tooltipText={
                      <Typography variant="subtitle2">
                        {item?.additionalInfo?.type === 'at-home' ? 'Customer home' : 'Chef location'}
                      </Typography>
                    }
                  />
                </a>
              </Link>
            ))}
          </Slider>
        </section>
      </Container>
    </section>
  );
};
