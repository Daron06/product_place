import Typography from '@material-ui/core/Typography';
import BigArrowSvg from 'assets/icons/big-arrow.svg';
import React from 'react';

import adminStyles from '../Admin.module.scss';
import styles from './WhoYouAre.module.scss';

interface WhoYouAreViewProps {
  onClickCard: (type: 'chef' | 'cloud-kitchen' | 'supplier') => void;
}

export const WhoYouAreView: React.FC<WhoYouAreViewProps> = ({ onClickCard }): React.ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={adminStyles.topInfo}>
        <Typography variant="h3">Sign up as a Partner</Typography>
        <Typography>
          At unknown, we create the infrastructure for Chefs to connect & sell directly to Customers to the benefit of
          all in the value chain. Become a Partner today!
        </Typography>
      </div>
      <div className={styles.whoYouAreCards}>
        <div role="presentation" className={styles.whoYouAreCardsItem} onClick={(): void => onClickCard('chef')}>
          <div>
            <img src="/static/register/chef-illustration.png" alt="Chef" />
            <Typography variant="h5">Chef</Typography>
            <Typography>
              Join the unknown family of Chefs and help revolutionize the food scene in the Middle east.
            </Typography>
          </div>
          <div className={styles.arrow}>
            <BigArrowSvg />
          </div>
        </div>
        <div
          role="presentation"
          className={styles.whoYouAreCardsItem}
          onClick={(): void => onClickCard('cloud-kitchen')}
        >
          <div>
            <img src="/static/register/cloud-kitchen-illustration.png" alt="Cloud kitchen" />
            <Typography variant="h5">Kitchen</Typography>
            <Typography>
              Join the unknown family of Cloud Kitchen Operators and execute dishes and recipes of highly influential
              Chefs.
            </Typography>
          </div>
          <div className={styles.arrow}>
            <BigArrowSvg />
          </div>
        </div>
        <div role="presentation" className={styles.whoYouAreCardsItem} onClick={(): void => onClickCard('supplier')}>
          <div>
            <img src="/static/register/supplier-illustration.png" alt="Supplier" />
            <Typography variant="h5">Supplier</Typography>
            <Typography>
              Join the unknown family of suppliers of top quality Food, Beverage, and Kitchenware and get your products
              endorsed by Influential Chefs.
            </Typography>
          </div>
          <div className={styles.arrow}>
            <BigArrowSvg />
          </div>
        </div>
      </div>
    </div>
  );
};
