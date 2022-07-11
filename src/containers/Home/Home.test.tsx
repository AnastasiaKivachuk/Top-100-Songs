import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { mockTopSongsStore } from './mockStore';
import Home from './index';

const initialState = { songsReducer: { topSongs: mockTopSongsStore, lastKey: 1 } };

const middlewares = [];
const mockStore = configureStore(middlewares);

const renderComponent = (store): RenderResult => render(<Provider store={store}><Home /></Provider>);

describe('Home Component', () => {
  const store = mockStore({});
  beforeEach(() => {
    renderComponent(store);
  });

  it('should render Home', () => {
    const text = screen.getByText('TOP Songs of 2022 - Billboard Hot 100 - Music Playlist 2022');
    expect(text).toBeInTheDocument();
  });

  it('should render empty list', () => {
    const text = screen.getByText('No Data');
    expect(text).toBeInTheDocument();
  });

});
