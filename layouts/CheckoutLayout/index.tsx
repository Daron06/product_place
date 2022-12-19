import clsx from 'clsx';
import { Container } from 'components/Container';
import Head from 'next/head';
import React from 'react';

import styles from './CheckoutLayout.module.scss';

interface CheckoutLayoutProps {
  title: string;
}

export const CheckoutLayout: React.FC<CheckoutLayoutProps> = ({ title, children }): React.ReactElement => {
  return (
    <div className={styles.root}>
      <Head>
        <title>unknown | {title}</title>
        <script src="https://cdn.checkout.com/js/framesv2.min.js" />
      </Head>
      <Container>
        <div className={clsx('d-ib mb-20 w100', styles.content)}>{children}</div>
      </Container>
    </div>
  );
};
