import clsx from 'clsx';
import { CardSkeleton } from 'components/CardItem/CardSkeleton';
import { Result } from 'components/Result';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './CardsList.module.scss';

interface CardsListProps {
  classes?: {
    list?: string;
  };
  isLoading: boolean;
  isLoaded?: boolean;
  itemsLength: number | undefined;
  skeletonWidth?: number;
  skeletonCount?: number;
}

const CardsListLayout: React.FC<Pick<CardsListProps, 'classes'>> = ({ children, classes }): React.ReactElement => (
  <div className={styles.cards}>
    <div className={clsx({ [styles.categoryList]: classes?.list === 'categoryList' }, styles.cardsList, classes?.list)}>
      {children}
    </div>
  </div>
);

export const CardsList: React.FC<CardsListProps> = ({
  children,
  classes,
  isLoading,
  isLoaded,
  itemsLength,
  skeletonWidth,
  skeletonCount = 6,
}): React.ReactElement => {
  const { t } = useTranslate('choose-date');
  if (isLoading) {
    return (
      <CardsListLayout classes={classes}>
        {Array.from({ length: skeletonCount }, (_, item) => (
          <CardSkeleton key={item} skeletonWidth={skeletonWidth} />
        ))}
      </CardsListLayout>
    );
  }

  if (isLoaded && !itemsLength) {
    return (
      <div className={styles.result}>
        <Result title={t('empty')} status="empty" />
      </div>
    );
  }

  return <CardsListLayout classes={classes}>{children}</CardsListLayout>;
};
