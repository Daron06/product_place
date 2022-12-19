import { CircularProgress, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useIsLoading } from 'hooks/useIsLoading';
import React from 'react';
import { ProductChat, ProductsApi } from 'services/api/ProductsApi';

import styles from './Chat.module.scss';

export type ChatProps = {
  productId: string;
};

export const Chat: React.FC<ChatProps> = ({ productId }) => {
  const [messages, setMessages] = React.useState<ProductChat['items']>([]);
  const [isLoading, loading, loaded] = useIsLoading();

  React.useEffect(() => {
    (async () => {
      try {
        loading();
        const data = await ProductsApi.chat(productId);
        setMessages(data.items);
      } catch (error) {
        console.warn('Error fetch chat', error);
      } finally {
        loaded();
      }
    })();
  }, []);

  return (
    <>
      <div className={styles.chatWrapperBlock} data-product-id={productId}>
        <Typography className={clsx('fw-bold', styles.title)} variant="h6">
          Chat
        </Typography>
        <div className={styles.chatWrapper} data-product-id={productId}>
          <div className={styles.messagesList}>
            {isLoading && (
              <div className={styles.loading}>
                <CircularProgress color="secondary" size={35} thickness={5} />
              </div>
            )}
            {messages.map((message) => (
              <div key={message.id} className={styles.messageWr}>
                <div className={styles.messageItem}>
                  <div className={styles.infoBlock}>
                    <div className="d-flex justify-content-between">
                      <div>
                        <span className={styles.author}>{message.name}</span>
                        <span className={styles.date}>{message.time}</span>
                      </div>
                    </div>
                    <div className={styles.message} dangerouslySetInnerHTML={{ __html: message.text }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
