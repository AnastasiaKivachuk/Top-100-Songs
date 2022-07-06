import React from 'react';
import {
  act,
  render, screen,
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Layout from './index';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Layout Component', () => {
  const store = mockStore({
    userReducer: {
      user: null,
    },
  });

  it('should render Layout', async () => {
    act(() => {
      render(<Provider store={store}><Layout><p>Test Component</p></Layout></Provider>);
    });
    const topText = await screen.findByRole('link');
    expect(topText).toBeInTheDocument();
    const textEl = await screen.findByText('Test Component');
    expect(textEl).toBeInTheDocument();
  });
});
