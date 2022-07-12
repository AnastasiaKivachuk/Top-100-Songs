import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';

import { Provider } from 'react-redux';
import ProfilePage from '../pages/profile';

const middlewares = [];
const mockStore = configureStore(middlewares);
const store = mockStore({});
const renderComponent = (): RenderResult => render(<Provider store={store}><ProfilePage /></Provider>);

describe('Profile Page', () => {
  renderComponent();

  it('should render Profile Page', () => {
    expect(screen.getByText('Update Profile')).toBeInTheDocument();
  });
});
