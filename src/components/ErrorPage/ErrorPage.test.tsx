import React from 'react';
import { render, screen } from '@testing-library/react';

import { ThemeProvider } from '@mui/material';

import { theme } from '@helpers/setupTheme';
import ErrorPage from './index';

const MockErrorData = {
  imageSrc: '/images/500.svg',
  text: 'The server encountered an internal error or misconfiguration. Please, refresh this page or try again later.',
};

const setUp = (props: { error: string, text: string } | Record<string, unknown>) => (
  render(<ThemeProvider theme={theme}><ErrorPage {...props} /></ThemeProvider>));

describe('ErrorPage component', () => {

  it('should render ErrorPage component with default Props', () => {
    setUp({});
    expect(screen.getByText(
      'The page you are looking for doesn\'t exist or an other error occurred. Go back, or head over to the main page.',
    ))
      .toBeInTheDocument();
  });

  it('should render ErrorPage component with props', () => {
    setUp(MockErrorData);
    expect(screen.getByText(MockErrorData.text)).toBeInTheDocument();
  });
});
