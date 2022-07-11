import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import ProfilePage from '@pages/profile';

const renderComponent = (): RenderResult => render(<ProfilePage />);

describe('Profile Page', () => {
  renderComponent();

  it('should render Profile Page', () => {
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });
});
