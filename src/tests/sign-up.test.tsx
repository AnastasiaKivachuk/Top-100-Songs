import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import SignUpPage from '@pages/sign-up';

const renderComponent = (): RenderResult => render(<SignUpPage />);

describe('Sign Up Page', () => {
  renderComponent();

  it('should render SignUp', () => {
    expect(screen.getAllByText('Sign Up')).toHaveLength(2);
  });
});
