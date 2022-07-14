import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { Home } from '../index';

const middlewares = [];
const mockStore = configureStore(middlewares);

const renderComponent = (store): RenderResult => render(<Provider store={store}><Home /></Provider>);

describe('Home Component', () => {
  const store = mockStore({});
  beforeEach(() => {
    renderComponent(store);
  });

  it('should render Home', () => {
    const text = screen.getByTestId('title');
    expect(text).toBeInTheDocument();
  });

  it('should render empty list', () => {
    const text = screen.getByText('No Data');
    expect(text).toBeInTheDocument();
  });

});
