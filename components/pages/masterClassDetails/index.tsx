import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { Breadcrumbs } from 'components/Breadcrumbs';
import { Chat } from 'components/Chat';
import { Container } from 'components/Container';
import { CoverPhoto } from 'components/CoverPhoto';
import { Icon } from 'components/Icon';
import styles from 'components/pages/сhefsTableDetails/ChefsTable.module.scss';
import { RequiredGrid } from 'components/ProductGrid';
import { ProductInfoSidebar } from 'components/ProductInfoSidebar';
import { Rating } from 'components/Rating';
import { BookingType } from 'hooks/useCheckout';
import { useTranslate } from 'hooks/useTranslate';
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { RightSidebarLayout } from 'layouts/RightSidebarLayout';
import Head from 'next/head';
import React from 'react';
import { useSelector } from 'react-redux';
import { Product } from 'redux/ducks/products/types/contracts';
import { selectUserData } from 'redux/ducks/user/selectors';
import { getMasterClassType } from 'utils/getMasterClassType';

import detailsStyles from './MasterClassDetails.module.scss';

interface MasterClassViewProps {
  data: Product;
}

const VimeoPlayer: React.FC<{ id: number }> = ({ id }) => {
  return (
    <div className={detailsStyles.vimeoPlayer}>
      <Head>
        <script src="https://player.vimeo.com/api/player.js" />
      </Head>
      <iframe
        src={`https://player.vimeo.com/video/${id}`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
        title="Vimeo"
        allowFullScreen
      />
    </div>
  );
};

export const MasterClassDetails: React.FC<MasterClassViewProps> = ({ data }) => {
  const userData = useSelector(selectUserData);
  const isRecorded = data.additionalInfo?.type === 'recorded';

  const vimeoId = data.vimeoUrl?.match(/\d{8,}/)?.[0];
  const type = getMasterClassType(data.additionalInfo?.type);
  const isRecordedPaid = isRecorded && !!data.vimeoUrl && !data.isFree;

  const { t, getTranslatedText } = useTranslate('masterclass-details');

  const [showFreeVideo, setShowFreeVideo] = React.useState(false);

  React.useEffect(() => {
    if (userData && data.isFree && isRecorded && vimeoId) {
      setShowFreeVideo(true);
    }
  }, [userData]);

  const setButtonHref = (): string => {
    const recordedFreeHref = isRecorded && data.isFree ? `/master-classes/${data.slug}` : undefined;
    const recordedNotFreeHref =
      isRecorded && !data.isFree
        ? `/checkout?product_id=${data.slug}&type=masterClass&is_private=false&is_recorded=true`
        : undefined;
    const defaultHref = `/master-classes/${data.slug}/choose-date`;
    return recordedFreeHref || recordedNotFreeHref || defaultHref;
  };
  const buttonHref = setButtonHref();

  return (
    <div className={styles.page} style={{ marginBottom: 100 }}>
      <div className="mb-20">
        {isRecordedPaid || showFreeVideo ? (
          <VimeoPlayer id={Number(vimeoId)} />
        ) : (
          <CoverPhoto imageSrc={data.media} loading={false} />
        )}
      </div>
      <Container>
        <div className="mb-25">
          <Breadcrumbs
            items={[
              { title: t('home'), url: '/' },
              { title: t('masterclasses'), url: '/master-classes' },
              { title: getTranslatedText(data, 'name') ?? '' },
            ]}
          />
        </div>
        <RightSidebarLayout>
          <section>
            <div className={clsx('d-flex mb-5', styles.tagsRow)}>
              {data.rating > 0 && <Rating value={data.rating} />}

              {type && (
                <div className="d-flex align-items-center ml-5">
                  <Icon type={type.icon} />
                  &nbsp;
                  <Typography className={styles.overline} variant="overline">
                    {type.label}
                  </Typography>
                </div>
              )}
            </div>
            <div className="mb-20">
              <Typography variant="h4" className={styles.fontBold}>
                {getTranslatedText(data, 'name')}
              </Typography>
            </div>
            <div className="mb-30">
              <Typography paragraph>{getTranslatedText(data, 'description')}</Typography>
            </div>
            <div className={styles.chefRow}>
              <ProductDetailsChefInfo
                slug={data.chef.slug ?? ''}
                avatar={data.chef.image}
                name={data.chef.name ?? ''}
                description={getTranslatedText(data.chef, 'description') ?? ''}
                loading={false}
              />
            </div>
            {data.additionalInfo?.program && (
              <section className="mb-50 redactorSection">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    {t('program')}
                  </Typography>
                </div>
                <div dangerouslySetInnerHTML={{ __html: getTranslatedText(data.additionalInfo, 'program') }} />
              </section>
            )}
            {data.required.length > 0 && (data.additionalInfo?.type === 'at-home' || isRecorded) && (
              <section className="mb-50">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    {t('equipment-required')}
                  </Typography>
                </div>
                <RequiredGrid items={data.required} />
              </section>
            )}
            {data.additionalInfo?.type === 'at-home' && (
              <section className="mb-20">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    {t('how-to-participate')}
                  </Typography>
                </div>
                <div className={styles.participateRow}>
                  <div className={styles.participateBox}>
                    <Paper className={styles.participatePaper} elevation={3}>
                      <div className="d-flex flex-column">
                        <div className="mb-15">
                          <Icon type="laptop-simple" />
                        </div>
                        <div className="mb-15">
                          <Typography className={styles.participateTitle}>{t('join-video-call')}</Typography>
                        </div>
                        <Typography>
                          <a download href="https://zoom.us/client/latest/ZoomInstaller.exe" className={styles.link}>
                            {t('download-zoom')}
                          </a>{' '}
                          {t('download-zoom-desc')}
                        </Typography>
                      </div>
                    </Paper>
                  </div>
                </div>
              </section>
            )}
          </section>
          <div>
            {!isRecordedPaid && (
              <ProductInfoSidebar
                countOfPeople={data.additionalInfo?.countOfPeople}
                duration={data.additionalInfo?.duration}
                days={data.additionalInfo?.days}
                productId={data.id}
                language={data.additionalInfo?.language}
                loading={false}
                productType={data.additionalInfo?.type}
                hrefButton={buttonHref}
                type={data.additionalInfo?.type}
                slug={data.slug}
                price={data.price}
                disableButton={false}
                bookingType={BookingType.MASTERCLASS}
                isRecorded={isRecorded}
                isRecordedPaid={isRecordedPaid}
                favoriteType="masterClass"
                instruction={data.instruction}
                isFree={data.isFree}
                productDateMasterClassIds={data.productDateMasterClassIds}
                showFreeVideo={showFreeVideo}
              />
            )}
            {isRecordedPaid && (
              <div className="mt-30">
                {data.instruction && (
                  <a
                    className={detailsStyles.receiptLink}
                    download
                    target="_blank"
                    rel="noreferrer"
                    href={data.instruction}
                  >
                    <Icon type="pdfGreen" />
                    <span>{t('download-booklet')}</span>
                  </a>
                )}
                <Chat productId={data?.id} />
              </div>
            )}
          </div>
        </RightSidebarLayout>
      </Container>
    </div>
  );
};
