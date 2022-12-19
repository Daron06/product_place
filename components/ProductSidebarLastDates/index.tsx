import { List, ListItem } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import usePrevious from 'ahooks/lib/usePrevious';
import { Button } from 'components/Button';
import { format } from 'date-fns';
import { useAlert } from 'hooks/useAlert';
import { useIsLoading } from 'hooks/useIsLoading';
import { useTranslate } from 'hooks/useTranslate';
import { useRouter } from 'next/router';
import React from 'react';
import { ProductDates } from 'redux/ducks/products/types/contracts';
import { ImmutableUserState } from 'redux/ducks/user/types/state';
import { OrderApi } from 'services/api/OrderApi';
import { ProductsApi } from 'services/api/ProductsApi';

import { Endpoints } from '../../services/api/endpoints';
import { convert24To12Format } from '../../utils/date/bookingDateFormat';
import styles from './ProductSidebarLastDates.module.scss';

interface ProductSidebarLastDatesProps {
  slug: string;
  productId: string;
  type?: string;
  setHasDates: React.Dispatch<React.SetStateAction<number>>;
  userData: ImmutableUserState['data'];
  onClickBookNow: (event: React.MouseEvent<HTMLButtonElement>, urlDate: string) => void;
  isFree: boolean;
  productDateMasterClassIds?: string[];
}

export const ProductSidebarLastDates: React.FC<ProductSidebarLastDatesProps> = ({
  slug,
  productId,
  type,
  setHasDates,
  onClickBookNow,
  isFree = false,
  userData,
  productDateMasterClassIds,
}) => {
  const [selectedId, setSelectedId] = React.useState<string>();
  const [isLoading, loading, loaded] = useIsLoading();
  const [dates, setDates] = React.useState<ProductDates[]>([]);
  const prevUserData = usePrevious(userData) ?? null;
  const endpoint = type === 'masterClass' ? Endpoints.PRODUCT_MASTER_CLASSES : Endpoints.PRODUCT_CHEF_TABLE;
  const router = useRouter();

  React.useEffect(() => {
    (async (): Promise<void> => {
      try {
        loading();
        const data = await ProductsApi.dates({ type: endpoint, slug }, {});
        setHasDates(data.length !== 0 ? data.filter((el) => Number(el.booked) < Number(el.countOfPeople)).length : 0);
        setDates(data);
        loaded();
      } catch (err) {
        console.warn('LastDates error: ', err);
        loaded();
      }
    })();
  }, []);

  const { t } = useTranslate('product-info-sidebar');

  const { openAlert } = useAlert();

  const bookingText = isFree ? t('book-free') : t('book-now');
  const buttonWidth = isFree ? 127 : 101;
  const isFreeMasterClass = isFree && type === 'masterClass';

  const freeMasterclassOrderCreate = async (productDateId?: string): Promise<void> => {
    try {
      if (userData && productDateId) {
        setSelectedId(productDateId);
        const orderData = {
          productId: productId,
          token: null,
          productDateId: productDateId || null,
          options: [],
          address: { type: 'online' },
          contact: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            phone: String(userData.phone),
          },
          guests: { adults: 1 },
          date: new Date().toISOString(),
          paymentMethod: 'Cash',
          instructions: '',
          coupon: '',
        };
        const orderResponse = await OrderApi.createOrder(orderData);
        if (orderResponse) {
          await router.push(`/checkout/status/${orderResponse.id}?isFreeBooking=true`);
        }
      }
    } catch (error) {
      openAlert('An error occurred while created a new order', 'error');
      console.error('ERROR:', error);
    } finally {
      setSelectedId('0');
    }
  };

  const setButtonClick = (event: React.MouseEvent<HTMLButtonElement>, dateId?: string): void => {
    setSelectedId(dateId);

    if (userData && isFreeMasterClass) {
      event.preventDefault();
      freeMasterclassOrderCreate(dateId);
    }

    if (!userData && isFreeMasterClass) {
      onClickBookNow(event, '');
    }

    if (!userData && !isFree && type === 'masterClass') {
      event.preventDefault();
      onClickBookNow(event, `/checkout?product_id=${slug}&date_id=${dateId}&type=${type}&is_private=false`);
    }
  };

  React.useEffect(() => {
    if (userData?.firstName !== prevUserData?.firstName) {
      if (userData && isFreeMasterClass) {
        freeMasterclassOrderCreate(selectedId);
      }
    }
  }, [userData, prevUserData, freeMasterclassOrderCreate, selectedId, isFreeMasterClass]);

  return (
    <List className={styles.sideBarDates}>
      {isLoading ? (
        <div className="mb-20">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <Skeleton variant="text" width={50} />
              <Skeleton variant="text" width={170} />
              <Skeleton variant="text" width={90} />
            </div>
            <div>
              <Skeleton variant="text" width={98} height={56} />
            </div>
          </div>
        </div>
      ) : (
        dates
          .sort((a, b) => Number(b.countOfPeople) - Number(b.booked) - (Number(a.countOfPeople) - Number(a.booked)))
          .filter((_, i) => i < 3)
          .map((obj) => {
            const freeBooked = productDateMasterClassIds && obj.id && productDateMasterClassIds?.includes(obj.id);
            const disabled = selectedId === obj.id || Number(obj.countOfPeople) <= Number(obj.booked) || !!freeBooked;
            return (
              <ListItem key={obj.id} className={styles.sideBarDatesItem}>
                <div>
                  <b className={styles.sideBarDatesItemText}>{obj.date && format(new Date(obj.date), 'EE, dd MMM')}</b>
                  <p className={styles.sideBarDatesItemText}>
                    {convert24To12Format(obj.from)} − {convert24To12Format(obj.to)} (GST)
                  </p>
                  {!isFree && type !== 'chefTable' && (
                    <p>
                      <b>
                        {t('AED')} {obj.price}
                      </b>
                      /{t('person')}
                    </p>
                  )}
                </div>
                <Button
                  style={{ width: buttonWidth, height: 36 }}
                  onClick={(e): void => setButtonClick(e, obj.id)}
                  loading={selectedId === obj.id}
                  color="secondary"
                  variant="contained"
                  disabled={disabled}
                  href={`/checkout?product_id=${slug}&date_id=${obj.id}&type=${type}&is_private=false`}
                >
                  {Number(obj.countOfPeople) <= Number(obj.booked) ? t('sold-out') : bookingText}
                </Button>
              </ListItem>
            );
          })
      )}
    </List>
  );
};
