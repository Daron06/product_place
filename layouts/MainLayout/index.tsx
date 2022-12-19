import clsx from 'clsx';
import { Header } from 'components/Header';
import type { NavigationProps } from 'components/NavigationDrawer';
import { truncate } from 'lodash';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';

import { BottomNavigationProps } from '../../components/BottomNavigation';
import headerStyles from '../../components/Header/Header.module.scss';
import { isMobile } from '../../utils/device';

const Footer = dynamic<unknown>(
  () => import(/* webpackChunkName: "Footer" */ 'components/Footer').then((m) => m.Footer),
  { ssr: false },
);
const BottomNavigation = dynamic<BottomNavigationProps>(
  () =>
    import(/* webpackChunkName: "BottomNavigation" */ 'components/BottomNavigation').then((m) => m.BottomNavigation),
  {
    ssr: false,
  },
);
const NavigationDrawer = dynamic<NavigationProps>(
  () =>
    import(/* webpackChunkName: "NavigationDrawer" */ 'components/NavigationDrawer').then((m) => m.NavigationDrawer),
  {
    ssr: false,
  },
);

interface MainLayoutProps {
  title?: string;
  image?: string;
  description?: string;
  classes?: {
    root?: string;
    header?: string;
    main?: string;
  };
}

export const MainLayout: FC<MainLayoutProps> = ({
  title,
  children,
  classes,
  image = '/favicon-270x270.png',
  description = 'We are the first marketplace in the world to connect Chefs directly to Customers.',
}): React.ReactElement => {
  const [menuOpened, toggleMenuOpened] = useState<boolean>(false);
  const router = useRouter();
  const isHome = router.pathname === '/';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : 'https://unknown.me';

  const onClickHamburger = React.useCallback(() => toggleMenuOpened(true), []);

  const metaDescription =
    truncate(description.replace(/(<([^>]+)>)/gi, ''), {
      length: 180,
    }) || '';

  return (
    <>
      <Head>
        <title>unknown{title ? ` | ${title}` : ''}</title>
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-192x192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/favicon-180x180.png" />
        <meta name="msapplication-TileImage" content="/favicon-270x270.png" />
        {isHome && <meta name="google-site-verification" content="bUc0akyciXmnU9ffbW_9ogKOBS0oMGgbcWvL27W3k-M" />}

        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow, all" />

        <link rel="canonical" href={pageUrl} />
        <link rel="shortlink" href={pageUrl} />

        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="unknown" />
        <meta name="theme-color" content="#FFDF36" />

        <meta property="og:site_name" content="unknown" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        {image && (
          <>
            {/* Linkedin */}
            <meta property="og:image" content={image?.includes('favicon') ? image : `${image}?width=180&height=110`} />
            <meta property="og:image:width" content="180" />
            <meta property="og:image:height" content="110" />
            {/* others */}
            <meta property="og:image" content={image?.includes('favicon') ? image : `${image}?width=300&height=300`} />
            <meta property="og:image:width" content="300" />
            <meta property="og:image:height" content="300" />
          </>
        )}
        <meta property="og:locale" content="en" />
        <meta property="og:type" content="website" />

        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta name="facebook-domain-verification" content="xx56zd0ckycl62ghq78fg0krq7wpr2" />

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CFNT6F145X" />
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || []; 
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date()); 
           
            gtag('config', 'G-CFNT6F145X'); 
          `,
          }}
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];
          f.onload=function(){
          t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}
          }(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          window.onload = function() {
            fbq('init', '949160169321520');
            fbq('track', 'PageView');
          }
        `,
          }}
        />

        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: `
(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:2798752,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `,
          }}
        />
      </Head>
      <div className="layout">
        <noscript>
          <img
            alt=""
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=949160169321520&ev=PageView&noscript=1"
          />
        </noscript>
        <Header
          className={clsx(classes?.header, { [headerStyles.headerWhite]: !isHome })}
          onMenuClick={(): void => toggleMenuOpened(true)}
        />
        <main className={clsx('content', classes?.main)}>{children}</main>
        <Footer />
        {isMobile && <BottomNavigation onMenuClick={onClickHamburger} />}
      </div>
      <NavigationDrawer menuOpened={menuOpened} onClose={(): void => toggleMenuOpened(false)} />
    </>
  );
};
