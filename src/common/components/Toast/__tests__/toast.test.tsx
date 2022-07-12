import { render, RenderResult, screen } from '@testing-library/react';
import React from 'react';
import { ToastContainer } from 'react-toastify';

import {
  TOAST_DEFAULT,
  TOAST_ERROR,
  TOAST_INFO,
  TOAST_SUCCESS,
  TOAST_WARNING,
} from '@components/Toast/constants/toast.constants';
import { showToast } from '../toast';

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
    showToast('info', TOAST_INFO);
    const textEl = await screen.findByText('info');
    expect(textEl).toBeInTheDocument();
  });

  it('success', async () => {
    showToast('success', TOAST_SUCCESS);
    const textEl = await screen.findByText('success');
    expect(textEl).toBeInTheDocument();
  });

  it('warning', async () => {
    showToast('warning', TOAST_WARNING);
    const textEl = await screen.findByText('warning');
    expect(textEl).toBeInTheDocument();
  });

  it('error', async () => {
    showToast('error', TOAST_ERROR);
    const textEl = await screen.findByText('error');
    expect(textEl).toBeInTheDocument();
  });

  it('default', async () => {
    showToast('default', TOAST_DEFAULT);
    const textEl = await screen.findByText('default');
    expect(textEl).toBeInTheDocument();
  });
});
