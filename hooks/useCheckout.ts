import useDebounceEffect from 'ahooks/lib/useDebounceEffect';
import pickBy from 'lodash/pickBy';
import { useRouter } from 'next/router';
import { OrderSupplier } from 'pages/checkout';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectCartCouponCode, selectCartItems } from 'redux/ducks/cart/selectors';
import { Product } from 'redux/ducks/products/types/contracts';
import { Endpoints } from 'services/api/endpoints';
import { OrderApi, OrderSummaryResponse, SummaryParams } from 'services/api/OrderApi';
import { ProductsApi } from 'services/api/ProductsApi';
import { groupSuppliers } from 'utils/groupSuppliers';

import { useAlert } from './useAlert';

export enum BookingType {
  CHEF_TABLE = 'chefTable',
  MASTERCLASS = 'masterClass',
}

type CheckoutData = {
  product?: Product | null;
  orderList?: OrderSupplier[] | null;
};

type Guests = { adults: number };

interface UseCheckout {
  data: CheckoutData;
  summaryLoading: boolean;
  dataLoading: boolean;
  isBooking: boolean;
  orderSummary: OrderSummaryResponse | undefined;
  fetchSummary: (params: SummaryParams) => Promise<void>;
  setAreaCode: React.Dispatch<React.SetStateAction<string>>;
  setGuests: React.Dispatch<React.SetStateAction<Guests>>;
  guests: Guests;
  setMenuOptions: React.Dispatch<
    React.SetStateAction<
      | []
      | {
          id: number;
          quantity: number;
        }[]
    >
  >;
}

const initialCheckoutData = {
  product: null,
  orderList: null,
};

export function useCheckout(): UseCheckout {
  const { openAlert } = useAlert();
  const { query } = useRouter();
  const [summaryLoading, toggleSummaryLoading] = React.useState<boolean>(true);
  const [dataLoading, toggleDataLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<CheckoutData>(initialCheckoutData);
  const [areaCode, setAreaCode] = React.useState<string>('');
  const [guests, setGuests] = React.useState<Guests>({ adults: 1 });
  const [menuOptions, setMenuOptions] = React.useState<Array<{ id: number; quantity: number }>>([]);
  const [orderSummary, setOrderSummery] = React.useState<OrderSummaryResponse>();
  const [isBooking, setIsBooking] = React.useState(Boolean(query.product_id));

  const cartItems = useSelector(selectCartItems);
  const couponCode = useSelector(selectCartCouponCode);
  const hasProductId = 'product_id' in query;

  const fetchBookedProduct = (): void => {
    const url = query.type === BookingType.CHEF_TABLE ? Endpoints.PRODUCT_CHEF_TABLE : Endpoints.PRODUCT_MASTER_CLASSES;

    ProductsApi.details(url, String(query.product_id)).then((product) => {
      setData({ product });
      setIsBooking(true);
      toggleDataLoading(false);
    });
  };

  React.useEffect(() => {
    if (Object.keys(query).length && hasProductId) {
      fetchBookedProduct();
    } else {
      setData({ orderList: groupSuppliers(cartItems) });
      setIsBooking(false);
      toggleDataLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  const fetchSummary = async (params: SummaryParams): Promise<void> => {
    try {
      const response = await OrderApi.summary(pickBy(params) as SummaryParams);
      setOrderSummery(response);
    } catch (err) {
      console.warn('Your cart is empty');
      if (err?.response?.data.message) {
        openAlert(err.response.data.message, 'error');
      }
      setOrderSummery({
        summary: 0,
        delivery: 0,
        total: 0,
        vat: 0,
      });
    } finally {
      toggleSummaryLoading(false);
    }
  };

  useDebounceEffect(
    () => {
      toggleSummaryLoading(true);
      const token = typeof window !== 'undefined' && window.localStorage.getItem('cartToken');

      if (isBooking && data.product) {
        fetchSummary({
          productId: data.product?.id,
          guests: query.is_private === 'true' ? data.product?.additionalInfo?.countOfPeople : guests.adults,
          productDateId: (query.date_id as unknown) as number,
          coupon: encodeURI(couponCode),
          options: menuOptions?.length ? menuOptions.map((i) => JSON.stringify(i)) : undefined,
        });
      } else if (token) {
        fetchSummary({ token, coupon: couponCode });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [data, areaCode, guests, couponCode, menuOptions],
    { wait: 1000 },
  );

  return {
    data,
    isBooking,
    summaryLoading,
    dataLoading,
    orderSummary,
    fetchSummary,
    setAreaCode,
    setGuests,
    setMenuOptions,
    guests,
  };
}
