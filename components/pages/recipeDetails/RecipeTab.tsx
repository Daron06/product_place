import Typography from '@material-ui/core/Typography';
import { VideoPlayerProps } from 'components/VideoPlayer';
import { useTranslate } from 'hooks/useTranslate';
import dynamic from 'next/dynamic';
import React from 'react';

import { RecipeStep } from '../admin/RecipeSteps/types';
import styles from './RecipesDetails.module.scss';

interface RecipeTabProps {
  items?: RecipeStep[];
  url?: string | null;
}

const VideoPlayer = dynamic<VideoPlayerProps>(() => import('components/VideoPlayer').then((m) => m.VideoPlayer), {
  ssr: false,
});

export const RecipeTab: React.FC<RecipeTabProps> = ({ items, url }): React.ReactElement => {
  const { getTranslatedText, t } = useTranslate('recipes-details');
  return (
    <div className="d-flex flex-column">
      <div>
        {items?.length ? (
          <ul>
            {url && (
              <div className={styles.recipeVideoBlock}>
                <VideoPlayer url={url} />
              </div>
            )}
            {items.map((item, i) => (
              <li key={item.id} className={`${styles.stepItem} d-flex flex-column`}>
                <div className="d-flex align-items-center mb-20">
                  <span className={styles.stepCount}>{i + 1}</span>
                  <div className="d-flex flex-column">
                    <Typography className={styles.stepTitle} variant="subtitle1">
                      {getTranslatedText(item, 'name')}
                    </Typography>
                    <Typography className={styles.stepSubTitle} variant="body1">
                      {t('preparationTime', { params: { time: item.preparationTime } })}
                    </Typography>
                  </div>
                </div>
                <div className={`${styles.stepImage} mb-20`}>
                  <img src={item.image} alt={getTranslatedText(item, 'name')} />
                </div>
                <div>
                  <Typography paragraph>{getTranslatedText(item, 'description')}</Typography>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <span className={styles.textNotFree}>{t('recipe-after-purchase')}</span>
        )}
      </div>
    </div>
  );
};
