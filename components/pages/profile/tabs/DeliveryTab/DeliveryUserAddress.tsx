import IconButton from '@material-ui/core/IconButton';
import { Icon } from 'components/Icon';
import React from 'react';
import { ResponseAddress } from 'services/types';

import styles from './DeliveryTab.module.scss';

interface DeliveryUserAddressProps {
  address: ResponseAddress;
  setAddresses: React.Dispatch<React.SetStateAction<ResponseAddress[]>>;
  onClickEdit: () => void;
  onClickRemove: () => void;
}

const DeliveryUserAddress: React.FC<DeliveryUserAddressProps> = ({
  address,
  onClickEdit,
  onClickRemove,
}): React.ReactElement => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.info}>
          <h3>{address.city.name}</h3>
          <span>{`${address.city.name} - ${address.area.name} - ${address.street}`}</span>
        </div>
        <div>
          <IconButton onClick={onClickEdit}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.5 1H3C1.89543 1 1 1.89543 1 3V14C1 15.1046 1.89543 16 3 16H14C15.1046 16 16 15.1046 16 14V7M16 1L6.5 10.5"
                stroke="#47D7AC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </IconButton>
          <IconButton onClick={onClickRemove}>
            <Icon type="close" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default DeliveryUserAddress;
