import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'components/Icon';
import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

import styles from './ShareButton.module.scss';

interface ShareButtonProps {
  title?: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
  const [buttonsOpened, setButtonsOpened] = React.useState<boolean>(false);

  return (
    <>
      <div>
        <IconButton onClick={(): void => setButtonsOpened(!buttonsOpened)}>
          <Icon className={styles.socialIcon} type="share" />
        </IconButton>
        {buttonsOpened && url && (
          <>
            <EmailShareButton className={styles.iconRoot} url={url} subject={title}>
              <Icon className={styles.socialIcon} type="email" />
            </EmailShareButton>
            <TwitterShareButton className={styles.iconRoot} url={url} title={title}>
              <Icon className={styles.socialIcon} type="twitter" />
            </TwitterShareButton>
            <FacebookShareButton className={styles.iconRoot} url={url} quote={title}>
              <Icon className={styles.socialIcon} type="facebook" />
            </FacebookShareButton>
            <LinkedinShareButton className={styles.iconRoot} url={url} title={title}>
              <Icon className={styles.socialIcon} type="linkedin" />
            </LinkedinShareButton>
            <TelegramShareButton className={styles.iconRoot} url={url} title={title}>
              <Icon className={styles.socialIcon} type="telegram" />
            </TelegramShareButton>
            <WhatsappShareButton className={styles.iconRoot} url={url} title={title}>
              <Icon className={styles.socialIcon} type="whatsapp" />
            </WhatsappShareButton>
          </>
        )}
      </div>
    </>
  );
};
