import { CardSkeleton } from 'components/CardItem/CardSkeleton';
import { Result } from 'components/Result';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './MasterClassesList.module.scss';

interface MasterClassesListProps {
  isLoading?: boolean;
  isLoaded?: boolean;
  itemsLength?: number;
}

const MasterClassesListLayout: React.FC = ({ children }): React.ReactElement => {
  return <div className={styles.list}>{children}</div>;
};

export const MasterClassesList: React.FC<MasterClassesListProps> = ({
  children,
  isLoading,
  isLoaded,
  itemsLength,
}): React.ReactElement => {
  const { t } = useTranslate('choose-date');
  if (isLoading) {
    return (
      <MasterClassesListLayout>
        {Array.from({ length: 6 }, (_, item) => (
          <CardSkeleton key={item} />
        ))}
      </MasterClassesListLayout>
    );
  }

  if (isLoaded && !itemsLength) {
    return (
      <div className={styles.result}>
        <Result title={t('empty')} status="empty" />
      </div>
    );
  }
  return <MasterClassesListLayout>{children}</MasterClassesListLayout>;
};
