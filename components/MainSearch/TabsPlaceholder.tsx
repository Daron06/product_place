import React from 'react';

import styles from './MainSearch.module.scss';

export const TabsPlaceholder: React.FC = () => {
  return (
    <div className={styles.tabsPlaceholder}>
      <ul>
        <li>
          <b>Chefs</b>
        </li>
        <li>Delivery menu</li>
        <li>Recipe boxes</li>
        <li>Chefs&apos;s store</li>
        <li>Chef&apos;s table</li>
        <li>Masterclasses</li>
      </ul>
    </div>
  );
};
