import React from 'react';
import {
  act, render, screen,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';

import HomePage from '@pages/index';
import userReducer from '../redux/reducers/userReducer';
import songsReducer from '../redux/reducers/songsReducer';

const store = createStore(combineReducers([userReducer, songsReducer]));

describe('HomePage', () => {

  it('should render HomePage', async () => {
    act(() => {
      render(<Provider store={store}><HomePage /></Provider>);
    });
    const text = await screen.findByText('TOP Songs of 2022 - Billboard Hot 100 - Music Playlist 2022');
    expect(text).toBeInTheDocument();
  });
});
