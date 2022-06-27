import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import type { AppProps } from 'next/app';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { AuthenticationWrapper } from '@contexts/auth.context';
import '@assets/scss/global.scss';
import Layout from '@containers/Layout';
import { Provider } from 'react-redux';
import store from '@redux/store';

const theme = createTheme();

function MyApp({
  Component,
  pageProps,
}: AppProps) {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <AuthenticationWrapper>
          <Layout>
            <Component {...pageProps} />
          </Layout>
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

export default MyApp;
