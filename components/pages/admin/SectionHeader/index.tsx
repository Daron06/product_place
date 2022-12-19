import { Button } from '@material-ui/core';
import MuiMenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import { useCellsByEndpoint } from '../../../../hooks/useCellsByEndpoint';
import { getNewButtonText } from '../../../../utils/getNewButtonText';
import { Dropdown } from '../../../Dropdown';
import { Icon } from '../../../Icon';
import styles from '../Products/AdminProducts.module.scss';

interface SectionHeaderProps {
  actionsDisabled?: boolean;
  onActivate?: () => void;
  onDeactivate?: () => void;
  onDelete?: () => void;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionsDisabled = false,
  onActivate,
  onDeactivate,
  onDelete,
}) => {
  const { endpoint, router } = useCellsByEndpoint();
  const { buttonText, buttonPath, visibleButton } = getNewButtonText(endpoint);

  return (
    <div className={styles.rootHeader}>
      <Typography className={styles.rootTitle} variant="h6">
        {title}
      </Typography>
      <div className="d-flex align-items-center">
        {(onActivate || onDeactivate || onDelete) && (
          <div className="ml-10">
            <Dropdown
              overlay={
                <Button
                  classes={{ root: clsx(styles.button, styles.buttonAction) }}
                  startIcon={
                    <div className={styles.buttonIcon}>
                      <Icon type="action" />
                    </div>
                  }
                  variant="outlined"
                >
                  Action
                </Button>
              }
            >
              {onDeactivate && (
                <MuiMenuItem disabled={actionsDisabled} onClick={onDeactivate}>
                  Disable
                </MuiMenuItem>
              )}
              {onActivate && (
                <MuiMenuItem disabled={actionsDisabled} onClick={onActivate}>
                  Activate
                </MuiMenuItem>
              )}
              {onDelete && (
                <MuiMenuItem disabled={actionsDisabled} onClick={onDelete}>
                  Remove
                </MuiMenuItem>
              )}
            </Dropdown>
          </div>
        )}
        {visibleButton && (
          <div>
            <Link href={buttonPath || `${router.asPath.replace(/\?page=\d+/, '')}/create`}>
              <Button
                classes={{ root: styles.button, label: styles.buttonLabel }}
                color="secondary"
                variant="contained"
              >
                + {buttonText}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
