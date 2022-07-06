import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';

import RestorePasswordPage from '@pages/restore-password';

const renderComponent = (): RenderResult => render(<RestorePasswordPage />);

describe('Restore Password Page', () => {
  renderComponent();

  it('should render RestorePassword', () => {
    expect(screen.getAllByText('Restore password')).toHaveLength(2);
  });
});
