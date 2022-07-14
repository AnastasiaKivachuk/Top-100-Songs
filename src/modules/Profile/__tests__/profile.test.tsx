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

const initStore = { user: { user: { uid: '123',
  email: 'anastasiya.kivachuk@itrexgroup.com',
  displayName: '',
  photoURL: 'https://firebasestorage.googleapis.com/v0/b/top-100-songs-fe870.appspot.com/o/images%2FScreenshot%202022-07-11%20234141.png',
} } };

describe('Profile Component', () => {

  beforeEach(() => {
    const store = mockStore({ initStore });
    renderComponent(store);
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      route: PATH_SONG,
      pathname: '',
      query: '',
      asPath: '',
      back: jest.fn(),
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

  it('check onSubmit ', () => {
    const value = 'test';
    const inputEl = screen.getByPlaceholderText('Display Name');
    fireEvent.change(inputEl, { target: { value }, name: 'displayName' });
    const btn = screen.getByTestId('btn');
    fireEvent.click(btn);
  });

  it('check cancel ', () => {
    const btn = screen.getByTestId('cancelBtn');
    fireEvent.click(btn);
  });
});
