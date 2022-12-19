import clsx from 'clsx';
import { Button } from 'components/Button';
import { Icon } from 'components/Icon';
import { ProductSidebarLastDates } from 'components/ProductSidebarLastDates';
import { useFavorite } from 'hooks/useFavorite';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { ImmutableUserState } from 'redux/ducks/user/types/state';

import { BookingType } from '../../hooks/useCheckout';
import styles from './ProductSidebarButtons.module.scss';

interface ProductSidebarButtonsProps {
  loading?: boolean;
  footerButtonHref?: string;
  buttonClick: (event: React.MouseEvent<HTMLButtonElement>, urlDate?: string) => void;
  isFree: boolean;
  isRecorded?: boolean;
  disabled?: boolean;
  slug: string;
  productId: string;
  bookingType: BookingType;
  hasDates: number;
  setHasDates: React.Dispatch<React.SetStateAction<number>>;
  userData: ImmutableUserState['data'];
  favoriteType: ProductType;
  instruction?: string | null;
  productDateMasterClassIds?: string[];
  showFreeVideo?: boolean;
}
export const ProductSidebarButtons: React.FC<ProductSidebarButtonsProps> = ({
  loading = false,
  footerButtonHref,
  buttonClick,
  isFree,
  isRecorded,
  disabled = false,
  slug,
  productId,
  bookingType,
  setHasDates,
  userData,
  favoriteType,
  instruction,
  productDateMasterClassIds,
  showFreeVideo,
}) => {
  const { hasFavorite, toggleFavorite } = useFavorite(favoriteType);

  const onClickFavorite = (): void => {
    toggleFavorite(Number(productId));
  };

  const { t } = useTranslate('product-info-sidebar');

  const setButtonText = (): string => {
    const freeButtonText = isFree && isRecorded ? t('free-watch') : undefined;
    const buttonText = !isFree && isRecorded ? t('buy-and-watch') : undefined;
    return freeButtonText || buttonText || t('more-options');
  };
  const buttonText = setButtonText();

  const isFreeRecorded = isFree && isRecorded;

  return (
    <div className={styles.buttonsWrapper}>
      {!isRecorded && (
        <ProductSidebarLastDates
          slug={slug}
          productId={productId}
          type={bookingType}
          isFree={isFree}
          setHasDates={setHasDates}
          userData={userData}
          onClickBookNow={buttonClick}
          productDateMasterClassIds={productDateMasterClassIds}
        />
      )}
      {userData ? (
        <>
          {!isFreeRecorded && (
            <div className="d-flex align-items-center justify-content-between mb-30">
              <Button
                loading={loading}
                color="secondary"
                className={styles.button}
                disabled={disabled || isFreeRecorded}
                variant={isRecorded ? 'contained' : 'outlined'}
                size="large"
                onClick={(e): void => buttonClick(e, footerButtonHref)}
                href={footerButtonHref}
              >
                {buttonText}
              </Button>
              <Button
                onClick={onClickFavorite}
                classes={{
                  root: styles.buttonRoot,
                  label: clsx({
                    [styles.favoriteButtonLabelActive]: hasFavorite(Number(productId)),
                  }),
                }}
                disabled={loading}
                color="default"
                size="large"
                variant="outlined"
              >
                <Icon type="heart" className={styles.buttonHeart} />
              </Button>
            </div>
          )}
          {(instruction && showFreeVideo) ||
          (instruction && isFreeRecorded) ||
          (instruction && productDateMasterClassIds?.length) ? (
            <a className={styles.receiptLink} download target="_blank" rel="noreferrer" href={instruction}>
              <Icon type="pdfGreen" />
              <span>{t('download-booklet')}</span>
            </a>
          ) : (
            <></>
          )}
        </>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          <Button
            loading={loading}
            color="secondary"
            className={styles.button}
            disabled={disabled}
            variant={isRecorded ? 'contained' : 'outlined'}
            size="large"
            onClick={(e): void => buttonClick(e, footerButtonHref)}
            href={footerButtonHref}
          >
            {buttonText}
          </Button>
        </div>
      )}
    </div>
  );
};
