import Typography from '@material-ui/core/Typography';
import { IconName } from 'components/Icon';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './ProductGrid.module.scss';

interface RequireTabProps {
  items?: Array<{ id: number; image?: string | IconName; name: string }>;
}

export function RequiredGrid({ items }: RequireTabProps): React.ReactElement {
  const { getTranslatedText, t } = useTranslate('recipes-details');
  return items?.length ? (
    <ul className={styles.gridContent}>
      {items.map((require) => (
        <li key={require.id}>
          <div className={styles.gridImageCircle}>
            <img src={require.image} alt={getTranslatedText(require, 'name')} />
          </div>
          <div className="mt-15 text-center">
            <Typography>{getTranslatedText(require, 'name')}</Typography>
          </div>
        </li>
      ))}
    </ul>
  ) : (
    <span className={styles.text}>{t('ingredients-after-purchase')}</span>
  );
}
