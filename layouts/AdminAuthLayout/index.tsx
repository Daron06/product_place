import { Typography } from '@material-ui/core';
import clsx from 'clsx';
import { Container } from 'components/Container';
import { Header } from 'components/pages/admin/Header';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import styles from './AdminAuthLayout.module.scss';

export const AdminAuthLayout: React.FC = ({ children }): React.ReactElement => {
  return (
    <>
      <Head>
        <title>unknown Chef Admin</title>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Head>
      <div className={styles.wrapper}>
        <>
          <Header />
          <style jsx global>{`
            body {
              background-color: var(--color--gray-0) !important;
            }
          `}</style>
          {children}
        </>
        <div className={styles.footerBottom}>
          <Container>
            <span className={clsx('d-flex align-items-center justify-content-between ph-40 pv-30', styles.footerSpan)}>
              <Typography className={styles.footerLightText} variant="subtitle1">
                2020 unknown. All rights reserved
              </Typography>
              <Typography className={styles.footerText} variant="subtitle1">
                <Link href="/docs/terms_and_conditions.html">
                  <a target="_blank" rel="noreferrer" href="/docs/terms_and_conditions.html">
                    Terms of Service
                  </a>
                </Link>
                {' | '}
                <Link href="/docs/privacy_policy.html">
                  <a target="_blank" rel="noreferrer" href="/docs/privacy_policy.html">
                    Privacy Policy
                  </a>
                </Link>
              </Typography>
            </span>
          </Container>
        </div>
      </div>
    </>
  );
};
