import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { showToast } from './index';

const renderComponent = (): RenderResult => render(<ToastContainer
  position="top-right"
  autoClose={3500}
  hideProgressBar
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss={false}
  draggable
  pauseOnHover
/>);

describe('Toast', () => {
  beforeEach(() => renderComponent());
  it('info', async () => {
    showToast('info', 'info');
    const textEl = await screen.findByText('info');
    expect(textEl).toBeInTheDocument();
  });

  it('success', async () => {
    showToast('success', 'success');
    const textEl = await screen.findByText('success');
    expect(textEl).toBeInTheDocument();
  });

  it('warning', async () => {
    showToast('warning', 'warning');
    const textEl = await screen.findByText('warning');
    expect(textEl).toBeInTheDocument();
  });

  it('error', async () => {
    showToast('error', 'error');
    const textEl = await screen.findByText('error');
    expect(textEl).toBeInTheDocument();
  });

  it('default', async () => {
    showToast('default', 'default');
    const textEl = await screen.findByText('default');
    expect(textEl).toBeInTheDocument();
  });
});
