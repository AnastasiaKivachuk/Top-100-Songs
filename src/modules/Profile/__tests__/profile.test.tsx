import React from 'react';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { PATH_SONG } from '@constants/routes.constants';
import { Profile } from '@modules/Profile/index';

const middlewares = [];
const mockStore = configureStore(middlewares);

const renderComponent = (store): RenderResult => render(
  <Provider store={store}><Profile /></Provider>,
);

describe('Profile Component', () => {
  beforeEach(() => {
    const store = mockStore({});
    renderComponent(store);
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

  it('should render Profile', () => {
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });

  it('onValueChange should change value in field', () => {
    const value = 'test';
    const inputEl = screen.getByPlaceholderText('Display Name');
    expect((inputEl as HTMLInputElement).value).toBe('');
    fireEvent.change(inputEl, { target: { value }, name: 'displayName' });
    expect((inputEl as HTMLInputElement).value).toBe(value);
  });
  //
  // it('uploadFile', () => {
  //   const value = 'test';
  //   const inputEl = screen.getByPlaceholderText('Display Name');
  //   expect((inputEl as HTMLInputElement).value).toBe('');
  //   fireEvent.change(inputEl, { target: { value }, name: 'displayName' });
  //   expect((inputEl as HTMLInputElement).value).toBe(value);
  // });

  // it('check onSubmit ', () => {
  //   const email = 'test';
  //   const inputEl = screen.getByPlaceholderText('example.email@gmail.com');
  //   fireEvent.change(inputEl, { target: { value: email }, name: 'email' });
  //   const btn = screen.getByTestId('btn');
  //   fireEvent.click(btn);
  // });
});
