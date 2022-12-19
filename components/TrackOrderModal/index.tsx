import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import clsx from 'clsx';
import { Modal } from 'components/Modal';
import format from 'date-fns/format';
import React from 'react';

import { TrackingInfo } from '../../services/api/OrderApi';
import styles from './TrackOrderModal.module.scss';

interface ITrackOrder {
  open: boolean;
  onClose: () => void;
  tracking?: TrackingInfo[];
}

export const TrackOrderModal: React.FC<ITrackOrder> = ({ open, onClose, tracking }) => {
  if (!tracking?.length) {
    return null;
  }

  const estimatedDate = tracking[0]?.estimatedAt;

  return (
    <Modal title="Order tracking" open={open} onClose={onClose} className={styles.modal}>
      <Timeline className={styles.timeline}>
        {tracking?.map((obj) => (
          <TimelineItem key={obj.id}>
            <TimelineOppositeContent className={clsx(styles.content, styles.contentOpposite)}>
              <Typography color="textSecondary">{format(new Date(obj.updatedAt), 'dd MMM yyyy')} am</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot variant="outlined" className={styles.dot} />
              <TimelineConnector className={styles.connector} />
            </TimelineSeparator>
            <TimelineContent className={styles.content}>
              <Typography className={styles.trackName}>{obj.name}</Typography>
              <Typography className={styles.trackDescription}>{obj.description}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <p className={styles.estimatedText}>
        <span>Estimated delivery time</span>{' '}
        <b>
          {format(new Date(estimatedDate), 'MMM dd')} at {format(new Date(estimatedDate), 'hh:mm a')}
        </b>
      </p>
    </Modal>
  );
};
