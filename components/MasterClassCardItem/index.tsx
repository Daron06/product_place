/* eslint-disable max-len */
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { selectUserData } from 'redux/ducks/user/selectors';

import { FavoriteButton } from '../FavoriteButton';
import { Icon, IconName } from '../Icon';
import { Rating } from '../Rating';
import styles from './MasterClassCardItem.module.scss';

interface MasterClassCardItemProps {
  title: string;
  icon: string;
  tooltipText: string;
  rating: number;
  id: number;
  price: number;
  imageUrl: string;
  isOnline?: boolean;
  gift?: boolean;
  isSoon?: boolean;
  disabledFavorite?: boolean;
  isFree?: boolean;
}

export const MasterClassCardItem = ({
  title,
  icon,
  tooltipText,
  rating,
  price,
  gift = false,
  id,
  imageUrl,
  isSoon = false,
  disabledFavorite = false,
  isFree = false,
}: MasterClassCardItemProps): React.ReactElement => {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { hasFavorite, toggleFavorite } = useFavorite('masterClass');

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    toggleFavorite(id);
  };

  const userData = useSelector(selectUserData);

  const { t } = useTranslate('masterclasses');

  return (
    <div
      ref={ref}
      className={clsx(styles.masterClassCard, { [styles.masterClassCardIsSoon]: isSoon })}
      style={inView ? { backgroundImage: `url(${imageUrl}?width=380&height=500)` } : undefined}
    >
      <div className={clsx(styles.masterClassCardOverlay, { [styles.masterClassCardOverlayYellow]: isSoon })} />
      <div className={styles.masterClassCardDetails}>
        {!isSoon ? (
          <div className={styles.masterClassCardTop}>
            {rating > 0 ? <Rating value={rating} /> : <div />}
            <div className={styles.masterClassCardTopFavorite}>
              {!disabledFavorite && userData && (
                <FavoriteButton active={hasFavorite(Number(id))} onClick={handleToggleFavorite} />
              )}
            </div>
          </div>
        ) : (
          <div />
        )}
        {isSoon && (
          <div className={styles.soonBadge}>
            <span>{t('soon')}</span>
          </div>
        )}
        <div className={clsx({ [styles.masterClassCardDetailsIsSoon]: isSoon })}>
          <h3 className={styles.masterClassCardTitle}>{title}</h3>
          <div className={styles.masterClassCardBottom}>
            {!isSoon ? (
              <div className="d-flex align-items-center justify-content-between flex-auto">
                {isFree ? (
                  <span className={styles.masterClassCardPrice}>
                    <b className={styles.ttUpper}>{t('free')}</b>
                  </span>
                ) : (
                  <>
                    <span className={styles.masterClassCardPrice}>
                      {t('from')}{' '}
                      <b>
                        {t('AED')} {price}
                      </b>
                    </span>
                  </>
                )}
                {tooltipText && (
                  <Tippy content={<div>{tooltipText}</div>}>
                    <div className={styles.masterClassIconType}>
                      <Icon type={icon as IconName} />
                    </div>
                  </Tippy>
                )}
              </div>
            ) : (
              <div className={styles.onlineExperienceLabel}>
                <div>
                  <Icon type={icon as IconName} />
                </div>
                <span>{t('online-experience')}</span>
              </div>
            )}
            {!isSoon && gift && (
              <div className={styles.masterClassCardIcons}>
                <Icon type={icon as IconName} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
