import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Container } from 'components/Container';
import { GoToLink } from 'components/GoToLink';
import { MasterClassCardItem } from 'components/MasterClassCardItem';
import { Slider } from 'components/Slider';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';
import { getMasterClassType } from 'utils/getMasterClassType';

import styles from './Main.module.scss';

interface MasterClassSectionProps {
  items: Product[];
}

export const MasterClassSection: React.FC<MasterClassSectionProps> = ({ items }) => {
  const { t, getTranslatedText } = useTranslate('main');
  return (
    <section className={clsx(styles.masterClassSection, styles.section)}>
      <Container>
        <div className={styles.sectionTitle}>
          <Typography variant="h3">{t('masterclassTitle')}</Typography>
          <GoToLink href="/master-classes" text={t('seeAll')} />
        </div>
        <Slider fullLink="/master-classes" sliderSettings={{ slidesToShow: 3 }} autoPlaySpeed={5000}>
          {items.map((item) => {
            const typeInfo = getMasterClassType(item.additionalInfo?.type);
            return (
              <Link key={item.id} href={`master-classes/${item.slug}`}>
                <a className={styles.cardItemLink} href={`master-classes/${item.slug}`}>
                  <MasterClassCardItem
                    tooltipText={typeInfo?.label || ''}
                    icon={typeInfo?.icon || ''}
                    imageUrl={item.media[0]?.url}
                    title={getTranslatedText(item, 'name')}
                    price={item.price}
                    rating={item.rating}
                    id={Number(item.id)}
                    isFree={item.isFree}
                  />
                </a>
              </Link>
            );
          })}
        </Slider>
      </Container>
    </section>
  );
};
