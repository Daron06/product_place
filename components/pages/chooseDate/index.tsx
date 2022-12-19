import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import { DateIntervals } from 'components/Calendar';
import { Container } from 'components/Container';
import { DateFilter } from 'components/DateFilter';
import { EventsList } from 'components/EventsList';
import { Result } from 'components/Result';
import { TabPanel } from 'components/TabPanel';
import format from 'date-fns/format';
import { useProductDetails } from 'hooks/useProductDetails';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';
import { Product, ProductDates } from 'redux/ducks/products/types/contracts';
import { ProductsApi } from 'services/api/ProductsApi';

import { useIsLoading } from '../../../hooks/useIsLoading';
import { ProductType } from '../../../redux/ducks/favorites/types/contracts';
import { Endpoints } from '../../../services/api/endpoints';
import styles from './ChooseDate.module.scss';

interface ChoseDateProps {
  initialData: Product;
  type: ProductType;
}

export const ChooseDate: React.FC<ChoseDateProps> = ({ type, initialData }): React.ReactElement => {
  const [activeTab, setActiveTab] = React.useState('all');
  const { t } = useTranslate('choose-date');
  const [date, setDate] = React.useState<DateIntervals | undefined>();
  const [eventDates, setEventDates] = React.useState<ProductDates[] | null>(null);
  const [isLoading, loading, loaded] = useIsLoading();
  const endpoint = type === 'masterClass' ? Endpoints.PRODUCT_MASTER_CLASSES : Endpoints.PRODUCT_CHEF_TABLE;

  const productDetails = useProductDetails(initialData, endpoint);

  const getProductDates = async (): Promise<void> => {
    if (!productDetails.data) {
      return;
    }

    setEventDates([]);
    loading();

    const dateFrom = date ? format(date.start, 'MM/dd/yyyy') : undefined;
    const dateTo = date ? format(date.end, 'MM/dd/yyyy') : undefined;

    try {
      const data = await ProductsApi.dates(
        { type: endpoint, slug: productDetails.data.slug },
        {
          dateFrom,
          dateTo,
          booked: activeTab === 'privateGroup' ? '0' : undefined,
        },
      );

      setEventDates(data);
      loaded();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getProductDates();
  }, [endpoint, date, activeTab]);

  const handleTabsChange = (_, newValue: string): void => {
    setActiveTab(newValue);
  };

  function handleOnSelectDate(value: DateIntervals): void {
    setDate(value);
  }

  const handleDateReset = (): void => {
    setDate(undefined);
  };

  const isFree = productDetails.data?.isFree;

  return (
    <Container>
      <div className={styles.chooseDate}>
        <div className="mb-40 d-flex justify-content-center mt-40">
          <Typography className={styles.pageTitle} variant="h3">
            {t('title')}
          </Typography>
        </div>
        <div className={styles.content}>
          <div className={styles.filters}>
            <DateFilter<DateIntervals>
              disabled={isLoading}
              label={
                date
                  ? `${format(new Date(date.start), 'MMM dd')} - ${format(new Date(date.end), 'MMM dd')}`
                  : t('select-dates')
              }
              mode="range"
              minDate={new Date()}
              highlighted={date}
              onApply={handleOnSelectDate}
              onReset={handleDateReset}
            />
          </div>
          {initialData.additionalInfo?.type === 'at-restaurant' && (
            <Tabs
              TabIndicatorProps={{ children: <div className={styles.indicator} /> }}
              indicatorColor="primary"
              onChange={handleTabsChange}
              value={activeTab}
            >
              <Tab disabled={isLoading} label={t('all')} value="all" />
              {eventDates?.find((event) => event.booked === 0) && (
                <Tab disabled={isLoading} label={t('private-group')} value="privateGroup" />
              )}
            </Tabs>
          )}
          <TabPanel tab="all" active={activeTab}>
            {!isLoading && !eventDates?.length && <Result title={t('empty')} status="empty" />}
            <EventsList
              isLoading={isLoading}
              items={eventDates}
              type={type}
              isFree={isFree}
              productId={productDetails.data?.id}
            />
          </TabPanel>
          <TabPanel tab="privateGroup" active={activeTab}>
            {!isLoading && !eventDates?.length && <Result title={t('empty')} status="empty" />}
            <EventsList
              isLoading={isLoading}
              items={eventDates}
              type={type}
              isPrivate
              productId={productDetails.data?.id}
            />
          </TabPanel>
        </div>
      </div>
    </Container>
  );
};
