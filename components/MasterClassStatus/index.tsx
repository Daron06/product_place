import Typography from '@material-ui/core/Typography';
import { Icon } from 'components/Icon';
import React from 'react';
import { ProductLocationType } from 'redux/ducks/products/types/contracts';
import { getMasterClassType } from 'utils/getMasterClassType';

import styles from './MasterClassStatus.module.scss';

interface MasterClassStatusProps {
  status: ProductLocationType | undefined;
}
export const MasterClassStatus: React.FC<MasterClassStatusProps> = ({ status }): React.ReactElement => {
  const MCType = getMasterClassType(status);

  return (
    <div className="d-flex align-items-center">
      <div className="d-flex align-items-center">
        {MCType && (
          <>
            <div className={styles.icon}>
              <Icon
                type={MCType.icon}
                height={19}
                width={19}
                viewBox={{
                  width: 19,
                  height: 19,
                }}
              />
            </div>
            <Typography className={styles.text} variant="subtitle2">
              {MCType.label}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
};
