import { CardSkeleton } from 'components/CardItem/CardSkeleton';
import { Result } from 'components/Result';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './ChefsList.module.scss';

interface ChefsListProps {
  isLoading: boolean;
  itemsLength: number | undefined;
}

const ChefsListLayout: React.FC = ({ children }): React.ReactElement => {
  return (
    <div className={styles.chefs}>
      <div className={styles.chefsList}>{children}</div>
    </div>
  );
};

export const ChefsList: React.FC<ChefsListProps> = ({ children, isLoading, itemsLength }): React.ReactElement => {
  const { t } = useTranslate('choose-date');
  if (isLoading) {
    return (
      <ChefsListLayout>
        {Array.from({ length: 6 }, (_, item) => (
          <div key={item} className={styles.chefsSkeleton}>
            <CardSkeleton key={item} isBlog />
          </div>
        ))}
      </ChefsListLayout>
    );
  }

  if (!isLoading && !itemsLength) {
    return (
      <div className={styles.result}>
        <Result title={t('empty')} status="empty" />
      </div>
    );
  }

  return <ChefsListLayout>{children}</ChefsListLayout>;
};
