import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import React from 'react';

import styles from './Modal.module.scss';

interface ModalProps {
  open?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  open = false,
  size = 'xs',
  title,
  onClose,
  className,
}): React.ReactElement => {
  return (
    <Dialog
      maxWidth={size}
      open={open}
      onClose={onClose}
      classes={{
        paper: className,
        paperFullWidth: styles.fullWidth,
        scrollPaper: styles.scrollPaper,
        paperScrollPaper: styles.paperScrollPaper,
      }}
      fullWidth
    >
      <div className={styles.modalTitle}>
        <DialogTitle>{title}</DialogTitle>
        <Button onClick={onClose}>
          <CloseIcon style={{ fontSize: 28 }} />
        </Button>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
