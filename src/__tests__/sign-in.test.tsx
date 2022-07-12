import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import SignInPage from '../pages/sign-in';

const renderComponent = (): RenderResult => render(<SignInPage />);

describe('Sign In Page', () => {
  renderComponent();

  it('should render SignIn', () => {
    expect(screen.getAllByText('Sign In')).toHaveLength(2);
  });
});
