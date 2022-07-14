import React from 'react';
import {
  act, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import user from '@redux/reducers/user';
import songs from '@redux/reducers/songs';
import HomePage from '../pages';

const store = createStore(combineReducers([user, songs]));

describe('HomePage', () => {

  it('should render HomePage', async () => {
    act(() => {
      render(<Provider store={store}><HomePage /></Provider>);
    });
    const text = await screen.findByTestId('title');
    expect(text).toBeInTheDocument();
  });
});
