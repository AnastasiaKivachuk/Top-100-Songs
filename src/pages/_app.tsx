import React from 'react';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { AuthenticationWrapper } from '@root/src/modules/AuthenticationWrapper/index';
import { Layout } from '@modules/Layout';
import { Provider } from 'react-redux';
import store from '@redux/store';
import { ErrorPage } from '@components/ErrorPage';
import { theme } from '@helpers/setupTheme.helpers';
import '@assets/scss/global.scss';
import { ConnectedRouter } from 'connected-next-router';

function MyApp({
  Component,
  pageProps, err,
}: AppProps & { err: Error | null }) {
  if (err) {
    return (
      <ErrorPage
        imageSrc="images/500.svg"
        text="The server encountered an internal error or misconfiguration. Please, refresh this page or try again later."
      />
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AuthenticationWrapper>
          <ConnectedRouter>
            <Layout>
              <Component {...pageProps} />
            </Layout>

          </ConnectedRouter>
        </AuthenticationWrapper>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

MyApp.getInitialProps = async ({
  Component,
  ctx,
}) => {
  let err = null;
  let pageProps = {};
  if (Component.getInitialProps) {
    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (error) {
      err = error;
    }
  }

  return {
    pageProps,
    err,
  };
};

export default MyApp;
