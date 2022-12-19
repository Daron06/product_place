import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Icon } from '../Icon';
import styles from './Rating.module.scss';

interface RatingProps {
  value: number;
}

export const Rating: React.FC<RatingProps> = ({ value }): React.ReactElement => {
  return (
    <div data-test-id="rating" className={styles.rating}>
      <Icon className={styles.ratingThumbUp} type="thumb-up" />
      <Typography className={styles.ratingText} variant="caption">
        &nbsp;{value}
      </Typography>
    </div>
  );
};
