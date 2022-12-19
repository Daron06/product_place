import Typography from '@material-ui/core/Typography';
import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import { AddCartButtonsProps } from 'components/AddCartButtons';
import { Rating } from 'components/Rating';
import truncate from 'lodash/truncate';
import dynamic from 'next/dynamic';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from 'react-redux';
import { selectUserData } from 'redux/ducks/user/selectors';

import { isMobile } from '../../utils/device';
import { Chip } from '../Chip';
import { FavoriteButtonProps } from '../FavoriteButton';
import { Icon, IconProps } from '../Icon';
import styles from './CardItem.module.scss';

const FavoriteButton = dynamic<FavoriteButtonProps>(
  () => import(/* webpackChunkName: "FavoriteButton" */ '../FavoriteButton').then((m) => m.FavoriteButton),
  {
    ssr: false,
  },
);

const AddCartButtons = dynamic<AddCartButtonsProps>(
  () => import(/* webpackChunkName: "AddCartButtons" */ '../AddCartButtons').then((m) => m.AddCartButtons),
  {
    ssr: false,
  },
);

export interface CardItemProps {
  id: number;
  active?: boolean;
  classes?: {
    buy?: string;
    cardItem?: string;
    cardItemImage?: string;
    cardItemTitle?: string;
    cardItemDescription?: string;
    cardItemDetails?: string;
    commission?: string;
  };
  count?: number;
  disabledFavorite?: boolean;
  description: string;
  favorite?: boolean;
  icon?: IconProps['type'];
  imageUrl: string;
  importButton?: React.ReactNode;
  isBlog?: boolean;
  name: string;
  price?: number;
  rating?: number | undefined;
  size?: 'small' | 'large';
  cuisine?: string;
  type?: string;
  tooltipText?: React.ReactElement;
  tags?: string[];
  topRightAdornment?: React.ReactElement | null;
  onPlus?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onMinus?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClickFavorite?: (id: number) => void;
  isHome?: boolean;
  hidePrice?: boolean;
  isChefsStorePage?: boolean;
}

const imageSize = isMobile ? 230 : 300;
const DEFAULT_TAGS = [];

export const CardItem: React.FC<CardItemProps> = React.memo(function CardItem({
  id,
  disabledFavorite = false,
  type,
  classes,
  description,
  favorite = false,
  imageUrl,
  name,
  price,
  size,
  tags = DEFAULT_TAGS,
  isBlog = false,
  icon,
  count,
  tooltipText,
  topRightAdornment = null,
  importButton,
  onPlus,
  onMinus,
  onClickFavorite,
  hidePrice,
  isChefsStorePage = false,
  rating,
  cuisine,
}: CardItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true });
  const noImage = type && type === 'chef' ? '/static/no_avatar.svg' : '/static/no_image.svg';
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleToggleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (onClickFavorite) {
      onClickFavorite(id);
    }
  };

  const userData = useSelector(selectUserData);

  const getTypeCls = (s?: string): string => {
    if (typeof s !== 'string') {
      return '';
    }
    return `cardItem${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  };

  const rootCls = clsx(styles.cardItem, classes?.cardItem, {
    [styles[getTypeCls(type)]]: type,
    [styles.large]: size === 'large',
    [styles.storePageCardItem]: isChefsStorePage,
    [styles.categoryCardItem]: classes?.cardItem === 'categoryCardItem',
  });

  return (
    <div className={rootCls}>
      {type !== 'blog' && (
        <div className={styles.cardItemTop}>
          {type !== 'chef' && rating ? <Rating value={rating ?? 0} /> : <div />}
          <div className={styles.cardItemTopFavoriteButton}>
            {!disabledFavorite && userData && <FavoriteButton active={favorite} onClick={handleToggleFavorite} />}
            {topRightAdornment}
          </div>
        </div>
      )}

      <div ref={ref} className={clsx(styles.cardItemImage, classes?.cardItemImage)}>
        {inView ? (
          <img
            className={imageLoaded ? styles.cardItemImageOpacity : undefined}
            src={imageUrl ? `${imageUrl}?width=${imageSize}&height=${imageSize}` : noImage}
            alt={name}
            onLoad={(): void => setImageLoaded(true)}
          />
        ) : null}
      </div>
      <div className={clsx(styles.cardItemDetails, classes?.cardItemDetails)}>
        <Typography className={clsx(styles.cardItemTitle, classes?.cardItemTitle)} variant="h5" component="h3">
          {truncate(name, { length: 50 })}
        </Typography>

        {!isBlog && ((icon && tooltipText) || Boolean(tags.length)) && (
          <div className={styles.cardItemTagsWrapper}>
            {icon && tooltipText && (
              <Tippy
                className={styles.cardItemTippy}
                content={<div className={styles.cardItemToolTip}>{tooltipText}</div>}
              >
                <div className={styles.cardItemIcon}>
                  <Icon type={icon} />
                </div>
              </Tippy>
            )}
            {Boolean(tags.length) && (
              <div className={styles.cardItemTags}>
                {tags.map((tag: string) => (
                  <Chip
                    key={tag}
                    clickable={false}
                    classes={{ root: styles.cardItemTagsItem }}
                    label={tag}
                    variant="default"
                  />
                ))}
              </div>
            )}
            {cuisine && (
              <Chip clickable={false} classes={{ root: styles.cardItemTagsItem }} label={cuisine} variant="default" />
            )}
          </div>
        )}
        <Typography
          component="p"
          className={clsx('description', classes?.cardItemDescription)}
          dangerouslySetInnerHTML={{
            __html:
              truncate(description.replace(/(<([^>]+)>)/gi, ''), {
                length: 95,
              }) || '',
          }}
        />
        {!hidePrice && Number(price) > 0 && onPlus && onMinus && (
          <div className={clsx(styles.buy, classes?.buy)}>
            <span className={styles.buyPrice}>AED {price}</span>
            <AddCartButtons size="large" onPlus={onPlus} onMinus={onMinus} count={count} />
            {/* {type === 'chefStore' && !isHome && (
              <Typography className={classes?.commission}>
                Your commission: &nbsp;
                <span className="fw-bold">AED 20</span>
              </Typography>
            )} */}
          </div>
        )}

        {importButton && importButton}
      </div>
    </div>
  );
});
