import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import { CreateHeader } from 'components/pages/admin/CreateHeader';
import React from 'react';
import { SupplierChef } from 'redux/ducks/admin/supplier/chefs/types/contracts';
import { DashboardRole, StatusEnum } from 'services/types';

import { SupplierSummary } from '../SupplierChefSummary';
import styles from './SupplierChefDetails.module.scss';

interface SupplierChefDetailsViewProps {
  role: DashboardRole.SUPPLIER | DashboardRole.CLOUD_KITCHEN;
  chef: SupplierChef | null;
  loading: boolean;
  status: StatusEnum | undefined;
  onChefActivate: () => void;
  onChefBlock: () => void;
}

export const SupplierChefDetailsView: React.FC<SupplierChefDetailsViewProps> = ({
  chef,
  loading,
  onChefActivate,
  onChefBlock,
  status,
}): React.ReactElement => {
  return (
    <div className="p-30">
      <div className="mb-20">
        <CreateHeader title={chef?.name ?? ''}>
          <MenuItem onClick={onChefActivate}>Activate</MenuItem>
          <MenuItem onClick={onChefBlock}>Block</MenuItem>
        </CreateHeader>
      </div>
      <div className="adminDataUpsertPageGrid">
        <section className="adminDataUpsertSectionGrid">
          <Paper elevation={0}>
            <div className="d-flex p-20">
              <div className={styles.chefInfo}>
                <ul className="d-flex flex-column">
                  <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
                    {loading ? (
                      <>
                        <Skeleton variant="text" width={80} />
                        <Skeleton variant="text" width={100} />
                      </>
                    ) : (
                      <>
                        <Typography className="text-color-600" variant="body2">
                          Chef Name
                        </Typography>
                        <Typography className="fw-bold" variant="body2">
                          {chef?.name}
                        </Typography>
                      </>
                    )}
                  </li>
                  <Divider />
                  <Divider />
                  <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
                    {loading ? (
                      <>
                        <Skeleton variant="text" width={80} />
                        <Skeleton variant="text" width={100} />
                      </>
                    ) : (
                      <>
                        <Typography className="text-color-600" variant="body2">
                          Current role
                        </Typography>
                        <Typography variant="body2">{chef?.jobRole}</Typography>
                      </>
                    )}
                  </li>
                </ul>
              </div>
              <div>
                {loading ? (
                  <Skeleton variant="circle" width={200} height={200} />
                ) : (
                  <Avatar className={styles.avatar} src={chef?.image} />
                )}
              </div>
            </div>
          </Paper>
        </section>
        <aside className="adminDataUpsertAsideGrid">
          <Paper elevation={0}>
            <div className="p-20">
              <SupplierSummary loading={loading} status={status} summary={chef?.summary} />
            </div>
          </Paper>
        </aside>
      </div>
    </div>
  );
};
