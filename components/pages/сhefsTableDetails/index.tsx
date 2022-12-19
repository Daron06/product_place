import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Container } from 'components/Container';
import { CoverPhoto } from 'components/CoverPhoto';
import { Icon } from 'components/Icon';
import { MapBoxProps } from 'components/MapBox';
import styles from 'components/pages/сhefsTableDetails/ChefsTable.module.scss';
import { RequiredGrid } from 'components/ProductGrid';
import { ProductInfoBlock } from 'components/ProductInfoBlock';
import { ProductInfoSidebar } from 'components/ProductInfoSidebar';
import { Rating } from 'components/Rating';
import { useTranslate } from 'hooks/useTranslate';
import { castDraft } from 'immer';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { RightSidebarLayout } from 'layouts/RightSidebarLayout';
import dynamic from 'next/dynamic';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

import { BookingType } from '../../../hooks/useCheckout';
import { getAddress } from '../profile/tabs/OrderTab';

const MapBox = dynamic<MapBoxProps>(() => import('components/MapBox').then((m) => m.MapBox), {
  ssr: false,
});
interface ChefsTableDetailsViewProps {
  chefTableDetails: Product;
  loading?: boolean;
}

export const ChefsTableDetails: React.FC<ChefsTableDetailsViewProps> = ({
  chefTableDetails,
  loading = false,
}): React.ReactElement => {
  const { t, getTranslatedText } = useTranslate('chefs-table');
  const pageText = t('page');

  const lowestMenuCost = chefTableDetails?.menuOptions?.sort((a, b) => a.price - b.price)[0]?.price || 0;

  return (
    <div className={clsx(styles.page, { [styles.pageLoading]: loading })}>
      <div className="mb-30">
        <CoverPhoto imageSrc={chefTableDetails?.media} loading={loading} />
      </div>
      <Container>
        <div className="mb-25">
          {loading ? (
            <Skeleton width={200} />
          ) : (
            <Breadcrumbs
              items={[
                { title: t('home'), url: '/' },
                { title: t('title'), url: '/chefs-table' },
                { title: getTranslatedText(chefTableDetails, 'name') ?? '' },
              ]}
            />
          )}
        </div>
        <RightSidebarLayout>
          <section>
            {loading ? (
              <Skeleton width={100} />
            ) : (
              <div className={clsx('d-flex mb-5', styles.tagsRow)}>
                {chefTableDetails.rating > 0 && <Rating value={chefTableDetails.rating} />}
                <div className="d-flex align-items-center ml-5">
                  <Icon type={chefTableDetails.additionalInfo?.type === 'at-home' ? 'table-green' : 'table-yellow'} />
                  &nbsp;
                  <Typography className={styles.overline} variant="overline">
                    {pageText.type}
                  </Typography>
                </div>
              </div>
            )}
            <div className="mb-20">
              {loading ? (
                <Skeleton width="30%" />
              ) : (
                <Typography variant="h4" className={styles.fontBold}>
                  {getTranslatedText(chefTableDetails, 'name')}
                </Typography>
              )}
            </div>
            {loading ? (
              <Skeleton width="50%" />
            ) : (
              <div className="mb-30">
                <Typography paragraph>{getTranslatedText(chefTableDetails, 'description')}</Typography>
              </div>
            )}
            <div className={styles.chefRow}>
              <ProductDetailsChefInfo
                slug={chefTableDetails?.chef.slug ?? ''}
                avatar={chefTableDetails?.chef.image}
                name={chefTableDetails?.chef.name ?? ''}
                description={getTranslatedText(chefTableDetails.chef, 'description') ?? ''}
                loading={loading}
              />
            </div>
            {loading ? (
              <>
                <Skeleton animation="wave" className="mb-10" variant="text" width={50} />
                <Skeleton animation="wave" className="mb-5" variant="text" width={200} />
                <Skeleton animation="wave" className="mb-5" variant="text" width={250} />
                <Skeleton animation="wave" className="mb-5" variant="text" width={200} />
              </>
            ) : (
              <>
                {chefTableDetails?.menuOptions && (
                  <div className={styles.menuListOptions}>
                    <h2>{pageText.menu}</h2>
                    {chefTableDetails?.shortDescription && (
                      <p className="mb-5">{getTranslatedText(chefTableDetails, 'shortDescription')}</p>
                    )}

                    <ul className={styles.menuListBlock}>
                      {chefTableDetails?.menuOptions?.map((el) => {
                        return (
                          <li key={el.id}>
                            <div className={styles.menuName}>{getTranslatedText(el, 'name')}</div>
                            <div>
                              <strong>
                                {pageText.aed} {el.price}
                              </strong>
                              {pageText.person}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {chefTableDetails?.additionalInfo?.requestAllergies && (
                  <section className="mb-30">
                    <div className="mb-20">
                      <Typography variant="h4" className={styles.subTitle}>
                        {pageText.allergen}
                      </Typography>
                    </div>
                    <Typography> {getTranslatedText(chefTableDetails.additionalInfo, 'requestAllergies')}</Typography>
                  </section>
                )}
                {chefTableDetails?.additionalInfo?.timeTable && (
                  <section className="mb-40">
                    <>
                      <div className="mb-20">
                        <Typography variant="h4" className={styles.subTitle}>
                          {pageText.time}
                        </Typography>
                      </div>
                      <Typography>{getTranslatedText(chefTableDetails?.additionalInfo, 'timeTable')}</Typography>
                    </>
                  </section>
                )}
                {!!chefTableDetails?.required.length && chefTableDetails?.additionalInfo?.type === 'at-home' && (
                  <section className="mb-20">
                    <div className="mb-30">
                      <Typography variant="h4" className={styles.subTitle}>
                        {pageText.required}
                      </Typography>
                    </div>
                    <RequiredGrid items={castDraft(chefTableDetails?.required)} />
                  </section>
                )}
                {!!chefTableDetails?.additionalInfo?.importantInformation.length && (
                  <section>
                    <div className="mb-20">
                      <ProductInfoBlock
                        text={pageText.important}
                        items={getTranslatedText(chefTableDetails.additionalInfo, 'importantInformation')}
                      />
                    </div>
                  </section>
                )}
                {chefTableDetails?.additionalInfo?.type === 'at-restaurant' && (
                  <section className="mb-40">
                    <>
                      <div className="mb-20">
                        <Typography variant="h4" className={styles.subTitle}>
                          {t('page').location || 'Location'}
                        </Typography>
                        <div className="mb-20 mt-20">{getAddress(chefTableDetails?.address)}</div>
                      </div>
                      <MapBox
                        defaultValue={{
                          lng: String(chefTableDetails?.address.long),
                          lat: String(chefTableDetails?.address.lat),
                        }}
                      />
                    </>
                  </section>
                )}
              </>
            )}
          </section>
          <ProductInfoSidebar
            productId={chefTableDetails?.id}
            favoriteType="chefTable"
            countOfPeople={chefTableDetails?.additionalInfo?.countOfPeople}
            duration={chefTableDetails?.additionalInfo?.duration}
            type={chefTableDetails?.additionalInfo?.type}
            language={chefTableDetails?.additionalInfo?.language}
            loading={loading}
            hrefButton={`/chefs-table/${chefTableDetails?.slug}/choose-date`}
            disableButton={Boolean(!chefTableDetails.datesCount)}
            slug={chefTableDetails?.slug}
            price={chefTableDetails?.price}
            bookingType={BookingType.CHEF_TABLE}
            productType={chefTableDetails?.additionalInfo?.type}
            lowestMenuCost={lowestMenuCost}
          />
        </RightSidebarLayout>
      </Container>
    </div>
  );
};
