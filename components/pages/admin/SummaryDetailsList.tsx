import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { WhiteBlock } from 'components/WhiteBlock/WhiteBlock';
import React from 'react';

interface SummaryDetailsListProps {
  title?: string;
  items: { name: string; value: string | number | undefined | null | React.ReactElement }[];
}

export const SummaryDetailsList: React.FC<SummaryDetailsListProps> = ({ title = 'Customer info', items }) => {
  return (
    <WhiteBlock title={title} className="pb-25">
      <ul>
        {items.map((obj, index) => (
          <div key={obj.name}>
            <li className="d-flex align-items-center justify-content-between">
              <Typography className="text-color-600 fz-large-14">{obj.name}</Typography>
              <Typography className="fz-large-14">{obj.value}</Typography>
            </li>
            {index < items.length - 1 && <Divider className="mt-15 mb-15" />}
          </div>
        ))}
      </ul>
    </WhiteBlock>
  );
};
