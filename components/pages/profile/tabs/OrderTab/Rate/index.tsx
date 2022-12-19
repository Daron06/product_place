import { Avatar, Link } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Rating from '@material-ui/lab/Rating';
import clsx from 'clsx';
import { Button } from 'components/Button';
import { FormField } from 'components/FormField';
import { Icon } from 'components/Icon';
import { useAlert } from 'hooks/useAlert';
import { omit } from 'lodash';
import { useRouter } from 'next/router';
import React from 'react';
import { IOrderItem, OrderApi, Review } from 'services/api/OrderApi';
import { ProductsApi } from 'services/api/ProductsApi';

import { useTranslate } from '../../../../../../hooks/useTranslate';
import { ProductType } from '../../../../../../redux/ducks/favorites/types/contracts';
import { getProductRouteByType } from '../../../../../../utils/getProductRouteByType';
import styles from './Rate.module.scss';

interface RateProps {
  data: IOrderItem;
}

export const Rate: React.FC<RateProps> = ({ data }) => {
  const router = useRouter();
  const { openAlert } = useAlert();
  const { t, getTranslatedText } = useTranslate('profile');
  const [reviews, setReviews] = React.useState<Record<number, Review>>({});
  const [reviewText, setReviewText] = React.useState('');

  const showProduct = async (type: ProductType, id: string): Promise<void> => {
    try {
      const productData = await ProductsApi.product(type, id);
      await router.push(getProductRouteByType(type, productData.slug));
    } catch (error) {
      console.error(error);
      openAlert(t('orders.no-longer-available'), 'error');
    }
  };

  const handleChangeRating = (id: number, ratingValue: number | null, existingReview: string | undefined): void => {
    if (ratingValue) {
      const review = {
        orderProductId: id,
        rating: ratingValue,
        review: reviewText || existingReview,
        isReviewSent: false,
      };
      setReviews((prev) => ({
        ...prev,
        [id]: review,
      }));
    } else {
      setReviews((prev) => omit(prev, id));
    }
  };

  const handleChangeReviewText = (text: string, id: number): void => {
    setReviewText(text);
    setReviews((prev) => ({
      ...prev,
      [id]: {
        ...reviews[id],
        review: text,
      },
    }));
  };

  const sendReview = async (id: number): Promise<void> => {
    const obj = reviews[id];
    await OrderApi.sendRating(obj);
    setReviews((prev) => ({
      ...prev,
      [id]: {
        ...reviews[id],
        isReviewSent: true,
      },
    }));
    setReviewText('');
  };

  return (
    <div className={styles.greyBg}>
      <div className={styles.rate}>
        <div className={clsx(styles.flexB, 'd-flex justify-content-center')}>
          <Link className={styles.backButtonWr} href={`/profile/orders/${data.id}`}>
            <Button variant="outlined" className={styles.backButton}>
              <Icon type="arrow-left" />
            </Button>
          </Link>
          <h2 className={styles.rateTitle}>{t('orders.rate-and-review')}</h2>
        </div>
        <div>
          {data && (
            <>
              {data?.orders?.map((order) => (
                <div className={styles.wrapper} key={order.id}>
                  <div className={styles.header}>
                    <h5>{`${t('orders.item.order-id')}${order.id}`}</h5>
                    <div className={styles.supplier}>
                      {order.supplier && <Avatar src={order.supplier?.image} />}
                      {order.supplier?.name && order.supplier.name}
                    </div>
                  </div>
                  <div className={styles.content}>
                    {order.products.map((item) => {
                      const isReviewSent = item.rating > 0 || reviews[Number(item.id)]?.isReviewSent;
                      return (
                        <div data-product-id={item.id} className={clsx(styles.item, 'item-wr')} key={item.id}>
                          <div className={clsx(styles.itemHead, 'd-flex justify-content-between align-items-center')}>
                            <div
                              className={styles.food}
                              onClick={(): Promise<void> => showProduct(item.type, item.product.id)}
                            >
                              <img alt={item.name} src={item.image} />
                              <div className={styles.text}>
                                <span>{getTranslatedText(item, 'name')}</span>
                                {Number(item.options?.length) > 0 && <p>{item.options?.[0].name}</p>}
                              </div>
                            </div>
                            <div className={styles.rating}>
                              <Rating
                                className={styles.iconsWrapper}
                                size="large"
                                name={item.id}
                                defaultValue={item.rating}
                                precision={0.5}
                                icon={<ThumbUpAltIcon fontSize="inherit" />}
                                disabled={isReviewSent}
                                onChange={(_: unknown, value: number | null): void =>
                                  handleChangeRating(Number(item.id), value, item.review)
                                }
                              />
                            </div>
                          </div>
                          {isReviewSent && (
                            <div className={clsx(styles.thanks, 'fw-bold d-flex justify-content-end mt-20')}>
                              {t('orders.thank-you-for-rating')}
                            </div>
                          )}
                          {reviews[Number(item.id)] && !isReviewSent && (
                            <div className="mt-15" data-id={item.id}>
                              <span>{t('orders.review-of-this-item')}</span>
                              <FormField
                                defaultValue={reviews[Number(item.id)].review || item.review}
                                className="mb-10 mt-10"
                                onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void =>
                                  handleChangeReviewText(e.target.value, Number(item.id))
                                }
                                name="review"
                                placeholder={t('orders.enter-review-placeholder')}
                                textarea
                              />
                              <div className="d-flex justify-content-end">
                                <Button
                                  onClick={(): Promise<void> => sendReview(Number(item.id))}
                                  type="submit"
                                  className={styles.submitButton}
                                  variant="contained"
                                  color="secondary"
                                >
                                  {t('orders.send-button')}
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
