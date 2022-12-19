import Typography from '@material-ui/core/Typography';
import { Icon } from 'components/Icon';
import styles from 'components/pages/сhefsTableDetails/ChefsTable.module.scss';
import React from 'react';

interface ProductInfoBlockProps {
  items: string[];
  text: string;
}

export const ProductInfoBlock: React.FC<ProductInfoBlockProps> = ({ items, text }): React.ReactElement => {
  return (
    <div className={styles.infoBlock}>
      <div className="d-flex flex-column p-20">
        <div className="d-flex align-items-center mt-15">
          <Icon type="info" />
          <div className="ml-15">
            <Typography className="fw-600">{text}</Typography>
          </div>
        </div>
        <ul className={styles.menuList}>
          {items.map((item) => (
            <li key={item}>
              <Typography>{item}</Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
