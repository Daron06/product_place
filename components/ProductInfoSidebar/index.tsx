import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { GoToLink } from 'components/GoToLink';
import { Icon } from 'components/Icon';
import { ProductSidebarButtons } from 'components/ProductSidebarButtons';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductType } from 'redux/ducks/favorites/types/contracts';
import { ProductLocationType } from 'redux/ducks/products/types/contracts';
import { selectUserData, selectUserStatusLoading } from 'redux/ducks/user/selectors';

import { BookingType } from '../../hooks/useCheckout';
import { useIsLoading } from '../../hooks/useIsLoading';
import { AppContext } from '../../pages/_app';
import styles from './ProductInfoSidebar.module.scss';
interface ProductInfoSidebarProps {
  countOfPeople?: number;
  duration?: number;
  withGift?: boolean;
  language?: string;
  loading: boolean;
  type?: ProductLocationType;
  hrefButton: string;
  favoriteType: ProductType;
  disableButton?: boolean;
  days?: string;
  slug: string;
  productId: string;
  price: number;
  bookingType: BookingType;
  isRecordedPaid?: boolean;
  isRecorded?: boolean;
  productType: ProductLocationType | undefined;
  instruction?: string | null;
  isFree?: boolean;
  productDateMasterClassIds?: string[];
  showFreeVideo?: boolean;
  lowestMenuCost?: number;
}

interface SidebarRowProps {
  icon: 'star-simple' | 'time-simple' | 'users-simple' | 'world-simple' | 'calendar-simple';
  text?: string;
  name?: string;
  loading: boolean;
}

const SidebarRow: React.FC<SidebarRowProps> = ({ icon, name, text, loading }): React.ReactElement => (
  <ListItem className={styles.listItem} divider>
    <ListItemIcon className={styles.listItemIcon}>
      {loading ? <Skeleton variant="circle" width={20} height={20} /> : <Icon type={icon} />}
    </ListItemIcon>
    <div className="d-flex justify-content-between flex-auto">
      {loading ? (
        <Skeleton variant="text" width={50} />
      ) : (
        <ListItemText className={styles.textAlignLeft}>{name}</ListItemText>
      )}
      {loading ? (
        <Skeleton variant="text" width={100} />
      ) : (
        <ListItemText className={styles.textAlignRight}>{text}</ListItemText>
      )}
    </div>
  </ListItem>
);

export const ProductInfoSidebar: React.FC<ProductInfoSidebarProps> = ({
  countOfPeople,
  days,
  duration,
  language,
  loading,
  type,
  hrefButton,
  withGift = false,
  favoriteType,
  disableButton,
  slug,
  productId,
  price,
  bookingType,
  isRecorded,
  productType,
  instruction,
  isFree = false,
  productDateMasterClassIds,
  showFreeVideo,
  lowestMenuCost = 0,
}) => {
  const router = useRouter();
  const [isRedirecting, setLoadingRedirect] = useIsLoading();
  const { openRegisterModal } = React.useContext(AppContext);
  const userData = useSelector(selectUserData);
  const userLoading = useSelector(selectUserStatusLoading);
  const [hasDates, setHasDates] = React.useState(0);

  const openRegisterDialog = (event: React.MouseEvent<HTMLButtonElement>, urlDate?: string): void => {
    if (userData || bookingType === 'chefTable' || (productType !== 'recorded' && productType !== 'at-home')) {
      setLoadingRedirect();
      if (urlDate) {
        router.push(urlDate);
      }
    } else {
      event.preventDefault();
      openRegisterModal(urlDate ? urlDate : '');
    }
  };

  const { t } = useTranslate('product-info-sidebar');

  const chefTableType = {
    'at-restaurant': t('chef-location'),
    'at-home': t('customer-home'),
  };

  return (
    <aside>
      <Paper className={styles.asidePaper} elevation={3}>
        <div className={styles.asidePrice}>
          {loading ? (
            <Skeleton variant="text" />
          ) : (
            <>
              {isFree ? (
                <div className="d-flex align-items-center justify-content-between">
                  <span className={styles.price}>{t('details')}</span>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-between">
                  <span className={styles.price}>
                    {t('from-AED')} {bookingType === 'chefTable' ? lowestMenuCost : price}
                  </span>{' '}
                  <span className={styles.textAlignRight}>{t('per-person')}</span>
                </div>
              )}
            </>
          )}
        </div>
        <List className={styles.asideList}>
          {favoriteType !== 'masterClass' && (
            <SidebarRow icon="star-simple" loading={loading} name={t('type')} text={type && chefTableType[type]} />
          )}
          {isRecorded && <SidebarRow icon="star-simple" loading={loading} name={t('type')} text={t('recording')} />}
          {!!duration && isRecorded && (
            <SidebarRow
              icon="time-simple"
              loading={loading}
              name={t('duration')}
              text={
                duration / 60 === 1
                  ? `${duration / 60} ${t('hour')}`
                  : `${(duration / 60).toFixed(String(duration / 60).includes('.') ? 1 : 0)} ${t('hours')}`
              }
            />
          )}
          {!isRecorded && !!days && (
            <SidebarRow icon="calendar-simple" loading={loading} name={t('format')} text={`${days} ${t('session')}`} />
          )}
          {!isRecorded && (
            <SidebarRow
              icon="users-simple"
              loading={loading}
              name={t('group-size')}
              text={`${t('up-to')} ${countOfPeople} ${t('people')}`}
            />
          )}
          <SidebarRow
            icon="world-simple"
            loading={loading}
            name={t('language')}
            text={language && language[0].toUpperCase() + language?.slice(1)}
          />

          {withGift && (
            <ListItem className={styles.listItem}>
              <div className="d-flex flex-column">
                <div className="d-flex pt-10 pb-10">
                  <ListItemIcon className={clsx(styles.listItemIcon, 'align-self-start pt-5')}>
                    {loading ? <Skeleton variant="circle" width={20} height={20} /> : <Icon type="gift-simple" />}
                  </ListItemIcon>
                  <div className="d-flex justify-content-between flex-auto">
                    {loading ? (
                      <Skeleton variant="text" width={50} />
                    ) : (
                      <>
                        <ListItemText>Included Gift</ListItemText>
                        <GoToLink href="/" text="See Gift Box" />
                      </>
                    )}
                  </div>
                </div>
                {loading ? (
                  <Skeleton variant="text" />
                ) : (
                  <Typography className={styles.caption} variant="caption" display="block" gutterBottom>
                    {t('gift-caption-text')}
                  </Typography>
                )}
              </div>
            </ListItem>
          )}
        </List>
        <ProductSidebarButtons
          loading={isRedirecting || userLoading}
          footerButtonHref={hrefButton}
          buttonClick={openRegisterDialog}
          isFree={isFree}
          isRecorded={isRecorded}
          disabled={isRecorded ? false : hasDates <= 3 || disableButton || loading || isRedirecting || userLoading}
          slug={slug}
          productId={productId}
          bookingType={bookingType}
          hasDates={hasDates}
          setHasDates={setHasDates}
          userData={userData}
          favoriteType={favoriteType}
          instruction={instruction}
          productDateMasterClassIds={productDateMasterClassIds}
          showFreeVideo={showFreeVideo}
        />
      </Paper>
    </aside>
  );
};
