import Button from '@material-ui/core/Button';
import { useTranslate } from 'hooks/useTranslate';
import React from 'react';

import { Modal } from '../Modal';
import styles from './LogoutModal.module.scss';

interface LogoutModalProps {
  onClose: () => void;
  open: boolean;
  logoutUser: () => void;
}

export default function LogoutModal({ onClose, open, logoutUser }: LogoutModalProps): React.ReactElement {
  const { t } = useTranslate('header');

  return (
    <Modal size="xs" title={t('logout-title')} onClose={onClose} open={open}>
      {t('logout-description')}
      <div className={styles.buttons}>
        <Button
          type="button"
          style={{ height: 50, width: 100 }}
          variant="outlined"
          data-test-id="modal-cancel-button"
          onClick={onClose}
        >
          {t('logout-cancel')}
        </Button>
        <Button
          type="button"
          style={{ height: 50, width: 100 }}
          variant="contained"
          color="secondary"
          data-test-id="modal-logout-button"
          onClick={logoutUser}
        >
          {t('logout-yes')}
        </Button>
      </div>
    </Modal>
  );
}
