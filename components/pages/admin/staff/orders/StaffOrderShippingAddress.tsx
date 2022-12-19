import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { OrderItem } from 'services/api/admin/OrdersApi';

import { Button } from '../../../../Button';
import { MapBox } from '../../../../MapBox';
import { Modal } from '../../../../Modal';
import styles from './StaffOrderDetails.module.scss';

export const StaffOrderShippingAddress: React.FC<{
  data?: OrderItem['address'];
  loading: boolean;
  urlMeeting?: string;
}> = ({ data, loading, urlMeeting }) => {
  const [visibleModal, setVisibleModal] = React.useState(false);

  const handleClose = (): void => {
    setVisibleModal(false);
  };

  const handleClickOpenMap = (): void => {
    setVisibleModal(true);
  };

  if (!data) {
    return null;
  }

  return (
    <>
      {data?.type === 'online' ? (
        <>
          {urlMeeting && (
            <Paper elevation={0} className="p-20">
              {loading ? (
                <Skeleton width={100} />
              ) : (
                <>
                  <Typography className="fw-bold fz-large-18 mb-10">Online meeting</Typography>
                  <a className={styles.onlineLink} href={urlMeeting} target="_blank" rel="noreferrer">
                    Online meeting link
                  </a>
                </>
              )}
            </Paper>
          )}
        </>
      ) : (
        <Paper elevation={0} className="p-20">
          <Typography className="fw-bold fz-large-18 mb-10">Shipping Address</Typography>
          <Typography className="fw-bold mb-10">
            {loading ? (
              <Skeleton width={100} />
            ) : (
              `${data?.city?.name}, ${data?.area?.name || data?.area?.code}, ${data?.street}, ${data?.building}${
                data?.apartment ? `, ${data?.apartment}` : ''
              }`
            )}
          </Typography>
          <Button color="secondary" onClick={handleClickOpenMap}>
            View on map&nbsp;&nbsp;
            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.66667 1L14 5.5M14 5.5L9.66667 10M14 5.5H1"
                stroke="#1CBD8D"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
          {data?.notes && (
            <>
              <Divider className="mt-10 mb-10" />
              <div className="d-flex flex-column">
                <Typography className="fw-bold">Notes</Typography>
                <Typography>{loading ? <Skeleton width={100} /> : data?.notes}</Typography>
              </div>
            </>
          )}
        </Paper>
      )}
      <Modal
        size="md"
        title="Shipping Address on map"
        open={visibleModal}
        onClose={handleClose}
        className={styles.mapModal}
      >
        <MapBox
          defaultValue={{
            lat: data.lat,
            lng: data.lng || data.long,
          }}
        />
      </Modal>
    </>
  );
};
