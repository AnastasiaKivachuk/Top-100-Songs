import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';

import { RestorePassword } from '@modules/RestorePassword/index';
import { PATH_SONG } from '@constants/routes.constants';
import { ToastContainer } from 'react-toastify';

const renderComponent = (): RenderResult => render(
  <>
    <RestorePassword />
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
  </>,
);

describe('Restore Password Component', () => {
  beforeEach(() => {
    renderComponent();
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      route: PATH_SONG,
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });

  it('should render RestorePassword', () => {
    expect(screen.getAllByText('Restore password')).toHaveLength(2);
  });

  it('onValueChange should change value in email field', () => {
    const value = 'a@gmail.com';
    const inputEl = screen.getByPlaceholderText('example.email@gmail.com');
    expect((inputEl as HTMLInputElement).value).toBe('');
    fireEvent.change(inputEl, { target: { value }, name: 'email' });
    expect((inputEl as HTMLInputElement).value).toBe(value);
  });

  it('check onSubmit ', () => {
    const email = 'a@gmail.com';
    const inputEl = screen.getByPlaceholderText('example.email@gmail.com');
    fireEvent.change(inputEl, { target: { value: email }, name: 'email' });
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
  });
});
