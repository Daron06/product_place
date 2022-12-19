import { Alert } from '@material-ui/lab';
import React from 'react';

import { Modal } from '../Modal';

export interface VerifiedModalProps {
  open: boolean;
  onClose: () => void;
  isVerified: boolean;
}

export const VerifiedModal: React.FC<VerifiedModalProps> = ({ open = false, onClose, isVerified = false }) => {
  return (
    <Modal size="xs" title="Account Verification" open={open} onClose={onClose}>
      {isVerified ? (
        <div>
          <br />
          <Alert severity="success">Your account has been successfully verified. Congratulations.</Alert>
        </div>
      ) : (
        <div>
          <br />
          <Alert severity="error">Your account has not been successfully verified. The link is no longer valid.</Alert>
        </div>
      )}
    </Modal>
  );
};
