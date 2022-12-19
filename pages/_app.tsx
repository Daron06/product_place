/* @typescript-eslint/no-var-requires,global-require */
import '../styles/app.scss';

import { MuiThemeProvider, Snackbar } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Slide from '@material-ui/core/Slide';
import MuiAlert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab/Alert/Alert';
import LogoutModal from 'components/LogoutModal';
import cookie from 'cookie';
import { AlertContext, AlertContextProps } from 'hooks/useAlert';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import path from 'path';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'redux/ducks/user/actionsCreators';
import { selectUserData } from 'redux/ducks/user/selectors';
import { setCookie } from 'utils/cookieUtils';

import { FormType } from '../components/AuthModal/types';
import { LanguageVariant, TranslateContext } from '../hooks/useTranslate';
import { wrapper } from '../redux/store';
import { theme } from '../theme';
import { checkAuth } from '../utils/checkAuth';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type AppContextProps = {
  setAuthOpenForm: React.Dispatch<React.SetStateAction<FormType | undefined>>;
  authOpenForm: FormType | undefined;
  openRegisterModal: (redirectUrl: string) => void;
  fastRegisterUrl: string;
  setOpenLogoutModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppContext = React.createContext({} as AppContextProps);

function App({ Component, pageProps }): React.ReactElement {
  const [authOpenForm, setAuthOpenForm] = React.useState<FormType>();
  const [openLogoutModal, setOpenLogoutModal] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState<LanguageVariant>(pageProps.currentLanguage);
  const translatesRef = React.useRef(pageProps.translates);
  const fastRegisterUrlRef = React.useRef<string>('');
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (pageProps.translates) {
      translatesRef.current = pageProps.translates;
    }
  }, []);

  const [alertInfo, setAlertInfo] = React.useState<AlertContextProps['alertInfo']>({
    text: '',
    status: 'info',
    opened: false,
  });

  const openAlert = (text: React.ReactNode, status: Color = 'info'): void => {
    setAlertInfo({
      text,
      status,
      opened: true,
    });
  };

  const closeAlert = (): void => {
    setAlertInfo((prev) => ({
      ...prev,
      opened: false,
    }));
  };

  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.notify = {
      open: openAlert,
      close: closeAlert,
    };

    import('@sentry/nextjs').then(({ init }) => {
      init({
        dsn: process.env.SENTRY_DNS,
        tracesSampleRate: 1.0,
      });
    });
  }, []);

  const changeLanguage = (lang: LanguageVariant): void => {
    if (lang !== currentLanguage) {
      setCookie('unknownLanguage', lang, true);
      setCurrentLanguage(lang);
    }
  };

  const openRegisterModal = (redirectUrl: string): void => {
    setAuthOpenForm('register');
    fastRegisterUrlRef.current = redirectUrl;
  };

  const onLogoutUser = (): void => {
    dispatch(signOut());
    setOpenLogoutModal(false);
  };

  React.useEffect(() => {
    const htmlElem = document.querySelector('html');
    if (htmlElem && typeof window !== 'undefined') {
      htmlElem.setAttribute('lang', currentLanguage);
      if (currentLanguage === 'ar') {
        const rtl = userData && window.location.pathname.includes('admin') ? '' : 'rtl';
        htmlElem.setAttribute('dir', rtl);
      } else {
        htmlElem.removeAttribute('dir');
      }
    }
  }, [currentLanguage]);

  return (
    <TranslateContext.Provider value={{ data: translatesRef.current, currentLanguage, changeLanguage }}>
      {currentLanguage === 'ar' && (
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Almarai:wght@400;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
      )}
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <AlertContext.Provider value={{ alertInfo, openAlert, closeAlert }}>
          <AppContext.Provider
            value={{
              authOpenForm,
              setAuthOpenForm,
              openRegisterModal,
              fastRegisterUrl: fastRegisterUrlRef.current,
              setOpenLogoutModal,
            }}
          >
            <Component {...pageProps} />
          </AppContext.Provider>
        </AlertContext.Provider>
        <LogoutModal open={openLogoutModal} onClose={(): void => setOpenLogoutModal(false)} logoutUser={onLogoutUser} />
        <Snackbar
          TransitionComponent={Slide}
          key={Slide.name}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={alertInfo.opened}
          autoHideDuration={4500}
          onClose={closeAlert}
        >
          <MuiAlert severity={alertInfo.status}>{alertInfo.text}</MuiAlert>
        </Snackbar>
      </MuiThemeProvider>
    </TranslateContext.Provider>
  );
}

App.getInitialProps = async ({ ctx, Component }): Promise<Record<string, undefined>> => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const { unknownLanguage = 'en' } = ctx.req?.headers.cookie ? cookie.parse(ctx.req.headers.cookie) : {};
  let translates: Record<string, any> = {};

  await checkAuth(ctx);

  try {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
      const fs = require('fs');
      translates = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), `public/static/localazy.json`)).toString());
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Error loading localazy', err);
  }

  return {
    pageProps: {
      ...pageProps,
      translates,
      currentLanguage: unknownLanguage,
    },
  };
};

export default wrapper.withRedux(App);
