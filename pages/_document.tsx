import { ServerStyleSheets } from '@material-ui/core/styles';
import { StylesProviderProps } from '@material-ui/styles/StylesProvider/StylesProvider';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { theme } from 'theme';

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx): Promise<any> => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = (): any =>
    originalRenderPage({
      enhanceApp: (App) => (props): React.ReactElement<StylesProviderProps> => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};
