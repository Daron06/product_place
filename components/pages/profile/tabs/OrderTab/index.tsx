import { Avatar, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { Icon } from 'components/Icon';
import { OrderWillCanceledText } from 'components/OrderWillCanceledText';
import { PayNowButton } from 'components/PayNowButton';
import { TrackOrderModal } from 'components/TrackOrderModal';
import format from 'date-fns/format';
import { useAlert } from 'hooks/useAlert';
import { ProductDetailsLikeCount } from 'layouts/ProductDetailsLayout/ProductDetailsLikeCount';
import { useRouter } from 'next/router';
import React from 'react';
import { MeetType, ProductType } from 'redux/ducks/favorites/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { IOrder, IOrderItem, OrderApi, OrderStatus } from 'services/api/OrderApi';
import { ProductsApi } from 'services/api/ProductsApi';
import { getProductRouteByType } from 'utils/getProductRouteByType';

import { useTranslate } from '../../../../../hooks/useTranslate';
import { Area } from '../../../../../services/types';
import ProfileOrderStatus from '../../ProfileOrderStatus';
import styles from './OrderTab.module.scss';

interface AddressProps {
  area?: Area;
  city?: {
    name: string;
  };
  street?: string;
  building?: string;
  apartment?: string;
}

export const getAddress: React.FC<AddressProps> = ({ area, city, street, building, apartment }) => {
  let address = '';

  if (apartment) {
    address += `${apartment}`;
  }

  if (building) {
    address += `, ${building}`;
  }

  if (area && city && street) {
    address += `, ${street}, ${area.name || area.code}, ${city.name}`;
  }

  return <span>{address}</span>;
};

const getTypeProduct = (productType: ProductType, meetType?: MeetType, translate?: any): React.ReactNode => {
  if (meetType === 'online') {
    return translate('orders.online-meeting');
  }
  if (meetType === 'recorded') {
    return translate('orders.recorded-video');
  }
  if (productType === 'masterClass' || productType === 'chefTable') {
    return translate('orders.event-address');
  }

  return translate('orders.delivery-address');
};

const getProductTypeIcon = (type: MeetType | undefined): React.ReactElement => {
  if (type === 'online') {
    return <Icon height={22} width={22} viewBox={{ width: 26, height: 26 }} type="video-yellow" />;
  }
  if (type === 'recorded') {
    return <Icon height={18} width={18} viewBox={{ width: 18, height: 18 }} type="recorded-masterclass" />;
  }
  return (
    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 6.73529C13 9.90281 7 16 7 16C7 16 1 9.90281 1 6.73529C1 3.56778 3.68629 1 7 1C10.3137 1 13 3.56778 13 6.73529Z"
        stroke="#373737"
        strokeWidth="2"
      />
      <path
        d="M9.3077 6.73581C9.3077 7.95408 8.27451 8.94169 7 8.94169C5.7255 8.94169 4.69231 7.95408 4.69231 6.73581C4.69231 5.51753 5.7255 4.52993 7 4.52993C8.27451 4.52993 9.3077 5.51753 9.3077 6.73581Z"
        stroke="#373737"
        strokeWidth="2"
      />
    </svg>
  );
};

export const OrderTab: React.FC = (): React.ReactElement => {
  const [trackOpen, setTrackOpen] = React.useState<boolean>(false);
  const [canRateStatus, setCanRateStatus] = React.useState<boolean>(false);
  const [averageOrderRating, setAverageOrderRating] = React.useState<number>(0);
  const [order, setOrder] = React.useState<IOrderItem>();
  const [trackingInfo, setTrackingInfo] = React.useState<IOrder['tracking']>([]);
  const { openAlert } = useAlert();
  const { t, getTranslatedText } = useTranslate('profile');
  const router = useRouter();
  const orderAddress = order?.orders[0]?.address;

  const onOpenTrack = (item: IOrder): void => {
    setTrackingInfo(item.tracking);
    setTrackOpen((prev) => !prev);
  };

  React.useEffect(() => {
    const response = router.query.id;
    const getCurrentOrder = async (): Promise<void> => {
      const item = await OrderApi.getById(Number(response));
      setOrder(item);
    };
    getCurrentOrder();
  }, [router.query.id]);

  React.useEffect(() => {
    const rateButtonSet = (): void => {
      if (order) {
        const { orders } = order;
        const notCanceledOrder = orders.filter((o) => o.status !== 'canceled');

        const canRatingStatus =
          order.status !== 'canceled' &&
          order.status !== 'processing' &&
          order.status !== 'pending' &&
          order.status !== 'declined' &&
          notCanceledOrder.length > 0;

        const productsRatings = {};
        if (canRatingStatus) {
          setCanRateStatus(canRatingStatus);

          orders.forEach((orderItem) => {
            const { products } = orderItem;
            products.forEach((product) => {
              productsRatings[product.id] = product.rating;
            });
          });
          const rateObject = Object.values(productsRatings);
          const emptyRating = rateObject.some((v) => v === null);
          if (!emptyRating) {
            const sumRatings = rateObject.reduce((a, b) => Number(a) + Number(b), 0);
            setAverageOrderRating(Number(sumRatings) / rateObject.length);
          }
        }
      }
    };
    rateButtonSet();
  }, [order]);

  const showProduct = async (type: ProductType, id: string): Promise<void> => {
    try {
      const data = await ProductsApi.product(type, id);
      await router.push(getProductRouteByType(type, data.slug));
    } catch (error) {
      console.error(error);
      openAlert(t('no-longer-available'), 'error');
    }
  };

  const createdDate = order?.orders[0].createdAt ? new Date(order.orders[0].createdAt) : false;

  const shippingItems = order?.orders.filter((o) => o.trackId);

  return (
    <div className={styles.wrapper}>
      {order && (
        <>
          <h3>
            {t('orders.order-created')} {createdDate && format(new Date(createdDate), 'd MMM Y')}
          </h3>
          <span>
            {order.orders.length > 1 ? t('orders.item.orders-id') : t('orders.item.order-id')}
            {order?.orders?.map((el) => el.id).join(', #')}
          </span>

          <div className={styles.order}>
            <div className={styles.left}>
              {order.orders[0].status !== OrderStatus.PENDING && (
                <>
                  <div className={styles.buttonWrapper}>
                    <div className={styles.statusWrap}>
                      <span>{t('orders.status')}</span>
                      <ProfileOrderStatus status={order.status} />
                    </div>
                    {averageOrderRating > 0 ? (
                      <ProductDetailsLikeCount>{averageOrderRating}</ProductDetailsLikeCount>
                    ) : (
                      <>
                        {canRateStatus && (
                          <Button
                            href={`rate/${order.id}`}
                            type="button"
                            className={styles.rateButton}
                            variant="contained"
                            color="secondary"
                          >
                            <Icon type="like-outline-dark" />
                            {t('orders.rate-order-button')}
                          </Button>
                        )}
                        {order.status === 'pending' && <OrderWillCanceledText orderCreatedAt={createdDate} />}
                      </>
                    )}
                  </div>
                  {order?.status !== 'declined' && order?.orders[0]?.address && (
                    <div className={styles.topWrapper}>
                      {order?.status === 'completed' ||
                        (order?.status === 'approved' && (
                          <div className={styles.delivery}>
                            {getProductTypeIcon(orderAddress?.type)}
                            <div>
                              {getTypeProduct(order?.orders[0]?.products[0]?.type, orderAddress?.type, t)}
                              {orderAddress?.type === 'online' &&
                                (order?.orders[0]?.url ? (
                                  <a
                                    className={styles.onlineLink}
                                    href={order?.orders[0]?.url}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {t('orders.open-link')}
                                  </a>
                                ) : (
                                  <p>{t('orders.link-not-ready')}</p>
                                ))}
                              {orderAddress?.type === 'recorded' && (
                                <p
                                  className="text-secondary cursor-p"
                                  onClick={() =>
                                    showProduct(
                                      order?.orders[0]?.products[0]?.type,
                                      order?.orders[0]?.products[0]?.product?.id,
                                    )
                                  }
                                >
                                  {t('orders.view-button-text')}
                                </p>
                              )}
                              <p>
                                {orderAddress?.type !== 'online' &&
                                  orderAddress?.type !== 'recorded' &&
                                  getAddress(order?.orders[0]?.address)}
                              </p>
                            </div>
                          </div>
                        ))}
                      {order.status !== 'pending' && (
                        <div className={styles.receiptWrapper}>
                          <Icon type="Receipt" />
                          <Paper elevation={0} className="pl-15">
                            <Typography className="fw-bold fz-large-18 mb-10">{t('orders.payment-receipt')}</Typography>
                            {!!order && (
                              <div className={styles.receiptLink}>
                                <a download href={`/api${Endpoints.ORDER}/${order.guid}/receipt`}>
                                  {t('orders.download-text')}
                                </a>
                              </div>
                            )}
                          </Paper>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
              {order?.orders?.map((item) => (
                <div className={styles.wrapper} key={item.id}>
                  <div className={styles.header}>
                    <b>{`${t('orders.item.order-id')}${item.id}`}</b>
                    <div className={styles.restaurant}>
                      {item.supplier && <Avatar src={item.supplier?.image} />}
                      <div className="mr-8"></div>
                      {item.supplier?.name && item.supplier.name}
                    </div>
                  </div>

                  <div className={styles.content}>
                    {item.products.map((el) => (
                      <div
                        className={styles.item}
                        key={el.id}
                        onClick={(): Promise<void> => showProduct(el.type, el.product.id)}
                      >
                        <div className={styles.food}>
                          <img alt={el.name.length > 15 ? `${el.name.slice(0, 15)}...` : el.name} src={el.image} />
                          <div className={styles.text}>
                            <span>{getTranslatedText(el, 'name')}</span>
                            {Number(el.options?.length) > 0 && <p>{el.options?.[0].name}</p>}
                          </div>
                        </div>
                        <div className={styles.price}>
                          <span>
                            {t('orders.aed')} {el.total}
                          </span>
                          <p>
                            {el.quantity} {el.quantity > 1 ? t('items') : t('orders.item-text')}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className={styles.tracing}>
                      <ProfileOrderStatus status={item?.status} />
                      {item.trackId && (
                        <div>
                          <span>{t('orders.tracking-text')} №</span> <p>{item.trackId}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.right}>
              <div className={styles.wrapper}>
                <div className={styles.header}>
                  {order.status === 'pending' ? (
                    <>
                      <div className={styles.paid}>
                        <span>{t('orders.to-pay-aed', { params: { total: Number(order.total)?.toFixed(2) } })}</span>
                        <p>{order.payment.details}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <svg width="22" height="17" viewBox="0 0 22 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10 15.4066C10.5523 15.4066 11 14.9589 11 14.4066C11 13.8543 10.5523 13.4066 10 13.4066V15.4066ZM17.8754 8C17.8754 8.55228 18.3231 9 18.8754 9C19.4277 9 19.8754 8.55228 19.8754 8H17.8754ZM13.7071 12.2929C13.3166 11.9024 12.6834 11.9024 12.2929 12.2929C11.9024 12.6834 11.9024 13.3166 12.2929 13.7071L13.7071 12.2929ZM15.5 15.5L14.7929 16.2071C15.1834 16.5976 15.8166 16.5976 16.2071 16.2071L15.5 15.5ZM21.7071 10.7071C22.0976 10.3166 22.0976 9.68342 21.7071 9.29289C21.3166 8.90237 20.6834 8.90237 20.2929 9.29289L21.7071 10.7071ZM2.98616 2H16.8893V0H2.98616V2ZM2.98616 13.4066C2.40693 13.4066 2 12.9628 2 12.4913H0C0 14.1353 1.37154 15.4066 2.98616 15.4066V13.4066ZM16.8893 2C17.4685 2 17.8754 2.44373 17.8754 2.91522H19.8754C19.8754 1.27122 18.5039 0 16.8893 0V2ZM2.98616 0C1.37154 0 0 1.27122 0 2.91522H2C2 2.44373 2.40693 2 2.98616 2V0ZM2 12.4913V5.83045H0V12.4913H2ZM2 5.83045V2.91522H0V5.83045H2ZM1 6.83045H18.8754V4.83045H1V6.83045ZM19.8754 5.83045V2.91522H17.8754V5.83045H19.8754ZM10 13.4066H2.98616V15.4066H10V13.4066ZM19.8754 8V5.83045H17.8754V8H19.8754ZM12.2929 13.7071L14.7929 16.2071L16.2071 14.7929L13.7071 12.2929L12.2929 13.7071ZM16.2071 16.2071L21.7071 10.7071L20.2929 9.29289L14.7929 14.7929L16.2071 16.2071Z"
                          fill="#373737"
                        />
                      </svg>
                      <div className={styles.paid}>
                        <span>{t('orders.paid-aed', { params: { total: order.total } })}</span>
                        <p>{order.payment.details}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className={styles.content}>
                  <div className={styles.summaryItems}>
                    <div className={styles.summary}>
                      <p>{t('orders.order-summary')}</p>
                      <div className={styles.flexB}>
                        <span>{t('orders.aed')} </span>
                        <span> {order.summary}</span>
                      </div>
                    </div>

                    <div className={styles.summary}>
                      <p>{t('orders.delivery-text')}</p>
                      <div className={styles.flexB}>
                        <span>{t('orders.aed')} </span>
                        <span> {order.delivery}</span>
                      </div>
                    </div>

                    <div className={styles.summary}>
                      <p>{t('orders.vat-text')} 5%</p>
                      <div className={styles.flexB}>
                        <span>{t('orders.aed')} </span>
                        <span> {Number(order.vat)?.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  <div className={clsx(styles.total, order.status === 'pending' ? styles.noBorder : '')}>
                    <p>{t('orders.total-text')}</p>
                    <div className={styles.flexB}>
                      <span>{t('orders.aed')} </span>
                      <span> {Number(order.total)?.toFixed(2)}</span>
                    </div>
                  </div>
                  {order.status === 'pending' && (
                    <div className="mt-20">
                      <PayNowButton orderId={order.id} />
                    </div>
                  )}
                </div>
              </div>
              {shippingItems && shippingItems.length > 0 && (
                <div className={styles.wrapper}>
                  <div className={styles.information}>
                    <p>{t('orders.shipping-information')}</p>
                  </div>
                  <div className={styles.content}>
                    {shippingItems.map((item) => (
                      <>
                        <div key={item.id} className={styles.informationItems}>
                          <div className={styles.tracingRight}>
                            <span>
                              {t('orders.track-order')} #{item.id}:
                            </span>
                            <p>{item.trackId}</p>
                          </div>
                          <div className={styles.track} hidden={!item.tracking.length}>
                            <div onClick={(): void => onOpenTrack(item)}>
                              {t('orders.track-order')}{' '}
                              <svg
                                width="15"
                                height="11"
                                viewBox="0 0 15 11"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M9.66667 1L14 5.5M14 5.5L9.66667 10M14 5.5H1"
                                  stroke="#1CBD8D"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {trackingInfo.length > 0 && (
              <TrackOrderModal tracking={trackingInfo} open={trackOpen} onClose={(): void => setTrackOpen(false)} />
            )}
          </div>
        </>
      )}
    </div>
  );
};
