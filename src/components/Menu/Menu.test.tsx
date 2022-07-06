import React from 'react';
import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Menu from './index';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Menu with fulfilled store', () => {
  const initialState = {
    userReducer: {
      user: {
        uid: 'hO2373wBziZ58lEJolZMYTq1GRA2',
        email: 'anastasiya.kivachuk@itrexgroup.com',
      },
    },
  };
  const store = mockStore(initialState);
  it('should display Menu header with user', async () => {
    act(() => {
      render(<Provider store={store}><Menu /></Provider>);
    });
    const topText = await screen.findByRole('link');
    expect(topText).toBeInTheDocument();
    expect(screen.getByText('Hi, anastasiya.kivachuk@itrexgroup.com!')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeTruthy();
  });
});

describe('Menu with empty store', () => {
  const initialState = {
    userReducer: {
      user: null,
    },
  };
  const store = mockStore(initialState);
  it('should display Menu header without user', async () => {
    act(() => {
      render(<Provider store={store}><Menu /></Provider>);
    });
    const topText = await screen.findByRole('link');
    expect(topText).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).toBeFalsy();
  });
});
