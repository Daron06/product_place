import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import styles from './InstagramBlock.module.scss';

interface InstagramBlockProps {
  link?: string;
}

export const InstagramBlock: React.FC<InstagramBlockProps> = ({
  link = 'https://www.instagram.com/',
}): React.ReactElement => {
  const { t } = useTranslate('chefs-store');

  return (
    <div className={styles.wrapper}>
      <div className={styles.leftBlock}>
        <a href={link} target="_blank" title="@getunknown" className={styles.follow} rel="noreferrer">
          {t('follow-us')}
        </a>
        <a href={link} target="_blank" title="@getunknown" className={styles.instaUserName} rel="noreferrer">
          @getunknown
        </a>
        <a href={link} target="_blank" title="@getunknown" className={styles.instaButton} rel="noreferrer">
          {t('connect')}
        </a>
      </div>
    </div>
  );
};
