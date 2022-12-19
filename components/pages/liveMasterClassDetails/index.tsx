import { Button, IconButton } from '@material-ui/core';
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
import { ProductDetailsChefInfo } from 'layouts/ProductDetailsLayout/ProductDetailsChefInfo';
import { RightSidebarLayout } from 'layouts/RightSidebarLayout';
import React from 'react';
import { Product } from 'redux/ducks/products/types/contracts';

import liveMKStyles from './liveMasterClassDetails.module.scss';

interface LiveMasterClassDetailsProps {
  data: Product;
}

export const LiveMasterClassDetails: React.FC<LiveMasterClassDetailsProps> = ({ data }): React.ReactElement => {
  const [showChat, setShowChat] = React.useState<boolean>(true);

  const handleChatBlock = (): void => {
    setShowChat(!showChat);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setShowChat(false);
      }
    }
  }, []);

  return (
    <div className={styles.page} style={{ marginBottom: 100 }}>
      <Container>
        <RightSidebarLayout>
          <section>
            <div className="mb-20">
              <CoverPhoto imageSrc={data.media} loading={false} />
            </div>
            <div className="mb-25">
              <Breadcrumbs
                items={[
                  { title: 'Home', url: '/' },
                  { title: 'Masterclasses', url: '/master-classes' },
                  { title: data.name ?? '' },
                ]}
              />
            </div>

            <div className={clsx('d-flex mb-5 justify-content-between', styles.tagsRow)}>
              <div className="d-flex align-items-center ml-5">
                <Icon type="live-masterclass" />
                &nbsp;
                <Typography className={styles.overline} variant="overline">
                  Live MasterClass
                </Typography>
              </div>
              <div className={clsx('d-flex', liveMKStyles.btnsWrapper)}>
                {showChat ? (
                  <div className="d-flex align-items-center">
                    <div className={liveMKStyles.closeWr} onClick={handleChatBlock}>
                      <IconButton className={liveMKStyles.closeButton}>
                        <Icon type="close-icon" />
                      </IconButton>
                    </div>
                    <Typography className={clsx('fw-bold', liveMKStyles.chatTitle)} variant="h6">
                      Chat
                    </Typography>
                  </div>
                ) : (
                  <Button className={liveMKStyles.showButton} onClick={handleChatBlock}>
                    <Icon type="chat-show" />
                    Open chat
                  </Button>
                )}
              </div>
            </div>
            <div className="mb-20">
              <Typography variant="h4" className={styles.fontBold}>
                {data.name}
              </Typography>
            </div>

            <div className="mb-30">
              <Typography paragraph>{data.description}</Typography>
            </div>
            <div className={styles.chefRow}>
              <ProductDetailsChefInfo
                slug={data.chef.slug ?? ''}
                avatar={data.chef.image}
                name={data.chef.name ?? ''}
                description={data.chef.description ?? ''}
                loading={false}
              />
            </div>
            {data.additionalInfo?.program && (
              <section className="mb-50 redactorSection">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    Program
                  </Typography>
                </div>
                <div dangerouslySetInnerHTML={{ __html: data.additionalInfo?.program }} />
              </section>
            )}
            {data.required.length > 0 && data.additionalInfo?.type === 'at-home' && (
              <section className="mb-50">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    Equipment required
                  </Typography>
                </div>
                <RequiredGrid items={data.required} />
              </section>
            )}
            {data.additionalInfo?.type === 'at-home' && (
              <section className="mb-20">
                <div className="mb-30">
                  <Typography variant="h4" className={styles.subTitle}>
                    How to participate
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
                          <Typography className={styles.participateTitle}>Join a video call</Typography>
                        </div>
                        <Typography>
                          <a download href="https://zoom.us/client/latest/ZoomInstaller.exe" className={styles.link}>
                            Download Zoom
                          </a>{' '}
                          for free on a desktop or mobile device. After you book, you’ll receive an email with a link
                          and details on how to join.
                        </Typography>
                      </div>
                    </Paper>
                  </div>
                </div>
              </section>
            )}
          </section>
          {showChat && (
            <div className={liveMKStyles.sidebarWr}>
              <Chat productId={data?.id} />
            </div>
          )}
        </RightSidebarLayout>
      </Container>
    </div>
  );
};
