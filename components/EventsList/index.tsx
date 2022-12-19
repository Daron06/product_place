import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { Button } from 'components/Button';
import { format } from 'date-fns';
import { useAlert } from 'hooks/useAlert';
import { useTranslate } from 'hooks/useTranslate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useSelector } from 'react-redux';
import { ProductDates } from 'redux/ducks/products/types/contracts';
import { selectUserData } from 'redux/ducks/user/selectors';
import { OrderApi } from 'services/api/OrderApi';
import { convert24To12Format } from 'utils/date/bookingDateFormat';

import { useIsLoading } from '../../hooks/useIsLoading';
import { ProductType } from '../../redux/ducks/favorites/types/contracts';
import styles from './EventsLis.module.scss';

interface EventsListProps {
  items: ProductDates[] | null;
  isLoading: boolean;
  isPrivate?: boolean;
  type: ProductType;
  isFree?: boolean;
  productId?: string;
}

interface EventTopInfoProps {
  slug: string;
  item: ProductDates;
  isLoading: boolean;
  isPrivate?: boolean;
  type: ProductType;
  isFree?: boolean;
  productId?: string;
}

const EventSkeleton: React.FC = (): React.ReactElement => {
  return (
    <Paper className={`${styles.paper} mb-30`} elevation={3}>
      <div className="d-flex flex-column">
        <div className={styles.row} style={{ height: 70 }}>
          <div className="d-flex align-items-center">
            <Skeleton variant="text" width="10px" />
            <Skeleton variant="text" width="150px" />
          </div>
        </div>
        <Divider />
        <div className={styles.row}>
          <div className="d-flex justify-content-between">
            <Skeleton variant="text" width="100px" />
            <Skeleton variant="text" width="150px" />
          </div>
        </div>
      </div>
    </Paper>
  );
};

const EventTopInfo: React.FC<EventTopInfoProps> = ({
  slug,
  item,
  isLoading,
  type,
  isPrivate = false,
  isFree = false,
  productId,
}) => {
  const [eventIsSelected, setLoading] = useIsLoading();
  const { t } = useTranslate('choose-date');

  const userData = useSelector(selectUserData);
  const router = useRouter();
  const { openAlert } = useAlert();

  const dateButtonClick = async (event: React.MouseEvent<HTMLButtonElement>, productDateId?: string): Promise<void> => {
    if (isFree && userData && productDateId) {
      event.preventDefault();
      setLoading();
      try {
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
      } catch (error) {
        openAlert('An error occurred while created a new order', 'error');
        console.error('ERROR:', error);
      }
    } else {
      setLoading();
    }
  };

  const buttonWidth = isFree ? 127 : 101;

  return (
    <div className={styles.row}>
      <div className="d-flex align-items-center justify-content-between">
        <Typography>
          {t('date')} {format(new Date(item?.date), 'd/MM/Y')}, {convert24To12Format(item.from)} −{' '}
          {convert24To12Format(item.to)}
        </Typography>
        <div>
          <Link
            href={isFree ? '' : `/checkout?product_id=${slug}&date_id=${item.id}&type=${type}&is_private=${isPrivate}`}
          >
            <Button
              style={{ width: buttonWidth }}
              onClick={(e): void => {
                dateButtonClick(e, item.id);
              }}
              loading={isLoading || eventIsSelected}
              disabled={isLoading || eventIsSelected || Number(item.booked) >= Number(item.countOfPeople)}
              color="secondary"
              variant="contained"
              className={styles.chooseButton}
            >
              {isFree ? t('book-free') : t('choose')}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const EventsList: React.FC<EventsListProps> = ({
  items,
  isLoading,
  type,
  isPrivate,
  isFree = false,
  productId,
}) => {
  const {
    query: { slug },
  } = useRouter();
  const { t } = useTranslate('choose-date');
  if (!slug) {
    return null;
  }

  return (
    <List>
      {isLoading && Array.from({ length: 6 }, (_, item) => <EventSkeleton key={item} />)}
      {!isLoading &&
        items?.map((item) => (
          <ListItem className={styles.item} key={item.id}>
            <Paper className={styles.paper} elevation={3}>
              <div className="d-flex flex-column">
                <EventTopInfo
                  item={item}
                  isLoading={isLoading}
                  slug={slug as string}
                  type={type}
                  isPrivate={isPrivate}
                  isFree={isFree}
                  productId={productId}
                />
                <Divider />
                <div className={styles.row}>
                  <div className="d-flex justify-content-between">
                    <Typography className={styles.smallText}>
                      {isFree ? (
                        <span className={styles.fontBold}>{t('free-access')}</span>
                      ) : (
                        <>
                          <span className={styles.fontBold}>
                            {t('aed')} {item.price}
                          </span>
                          {isPrivate ? ` ${t('group')} ${item.countOfPeople}` : ` ${t('person')}`}
                        </>
                      )}
                    </Typography>
                    {Number(item.booked) >= Number(item.countOfPeople) ? (
                      <Typography className={styles.fullyBookedText}>{t('sold-out')}</Typography>
                    ) : (
                      <Typography className={styles.smallText}>{`${
                        Number(item.countOfPeople) - Number(item.booked)
                      } ${t('spots')}`}</Typography>
                    )}
                  </div>
                </div>
              </div>
            </Paper>
          </ListItem>
        ))}
    </List>
  );
};
