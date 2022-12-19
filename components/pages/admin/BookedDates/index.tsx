import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import React from 'react';

export const BookedDates: React.FC = (): React.ReactElement => {
  return (
    <>
      <Typography className="fz-large-18 fw-bold mb-20" variant="h6">
        Summary
      </Typography>
      <ul className="d-flex flex-column">
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <span>
            <Typography className="text-color-600" variant="body2">
              Mar 18, 2020
            </Typography>
            <Typography className="text-color-600" variant="body2">
              10:00 - 12:00
            </Typography>
          </span>
          <Typography className="fw-bold" color="secondary" variant="body2">
            2
          </Typography>
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <span>
            <Typography className="text-color-600" variant="body2">
              Mar 18, 2020
            </Typography>
            <Typography className="text-color-600" variant="body2">
              12:00 - 14:00
            </Typography>
          </span>
          <Typography className="fw-bold" color="secondary" variant="body2">
            12
          </Typography>
        </li>
        <Divider />
        <li className="pt-15 pb-15 d-flex align-items-center justify-content-between">
          <Typography className="text-color-600" variant="body2">
            Total bookings
          </Typography>
          <Typography className="fw-bold" variant="body2">
            42
          </Typography>
        </li>
      </ul>
    </>
  );
};
