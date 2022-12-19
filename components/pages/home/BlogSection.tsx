import Typography from '@material-ui/core/Typography';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import styles from 'components/pages/home/Main.module.scss';
import { Slider } from 'components/Slider';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { Chef } from 'redux/ducks/products/types/contracts';

import { CardItem } from '../../CardItem';

interface BlogSectionProps {
  items: Chef[];
}

export const BlogSection: React.FC<BlogSectionProps> = ({ items }): React.ReactElement | null => {
  const { t, getTranslatedText } = useTranslate('main');
  if (!items) {
    return null;
  }

  return (
    <Container>
      <section className={styles.section}>
        <div className={styles.title}>
          <Typography variant="h3">{t('blog')}</Typography>
          <GoToLink href="/blogs" text={t('seeAll')} />
        </div>
        <Slider
          sliderSettings={{
            slidesToShow: 3,
          }}
          fullLink="/blogs"
        >
          {items.map((item) => (
            <Link key={item.id} href={`/blog/${item.slug}`}>
              <a className={styles.cardItemLink} href={`/chefs/${item.slug}`}>
                <CardItem
                  id={Number(item.id)}
                  classes={{
                    cardItemTitle: styles.cardItemTitle,
                  }}
                  name={item.name}
                  description={getTranslatedText(item, 'description')}
                  imageUrl={item.image}
                  isBlog
                />
              </a>
            </Link>
          ))}
        </Slider>
      </section>
    </Container>
  );
};
