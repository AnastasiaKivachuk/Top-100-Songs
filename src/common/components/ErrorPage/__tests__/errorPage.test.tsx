import React from 'react';
import { render, screen } from '@testing-library/react';

import { ErrorPage } from '../index';

const MockErrorData = {
  imageSrc: '/images/500.svg',
  text: 'The server encountered an internal error or misconfiguration. Please, refresh this page or try again later.',
};

const setUp = (props: { error: string, text: string } | Record<string, unknown>) => (
  render(<ErrorPage {...props} />));

describe('ErrorPage component', () => {

  it('should render ErrorPage component with default Props', () => {
    setUp({});
    expect(screen.getByTestId('subtitle')).toBeInTheDocument();
  });

  it('should render ErrorPage component with props', () => {
    setUp(MockErrorData);
    expect(screen.getByText(MockErrorData.text)).toBeInTheDocument();
  });
});
