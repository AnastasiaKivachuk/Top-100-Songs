import React from 'react';
import { act, render, RenderResult, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { NextRouter } from 'next/router';

import { PATH_INDEX, PATH_SIGN_IN } from '@constants/routes.constants';
import { Provider } from 'react-redux';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { AuthenticationWrapper } from '../index';

const middlewares = [];
const mockStore = configureStore(middlewares);
const routerMock = {
  route: PATH_INDEX,
  pathname: PATH_INDEX,
  query: '',
  asPath: PATH_INDEX,
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
};

const renderComponent = (store): RenderResult => render(
  <Provider store={store}>
    <RouterContext.Provider value={routerMock as unknown as NextRouter}>
      <AuthenticationWrapper><div /></AuthenticationWrapper>
    </RouterContext.Provider>
  </Provider>,
);

describe('authContext without user', () => {
  const store = mockStore({ user: { user: null } });

  it('useEffect', async () => {
    act(() => {
      renderComponent(store);
    });

    const firstLoading = await screen.findByRole('progressbar');
    expect(firstLoading).toBeInTheDocument();
    expect(routerMock.push).toBeCalled();
  });

  it('default push', async () => {
    const storeWithUndefined = mockStore({ user: { user: undefined, isLoading: true } });
    act(() => {
      renderComponent(storeWithUndefined);
    });

    const firstLoading = await screen.findByRole('progressbar');
    expect(firstLoading).toBeInTheDocument();
    expect(routerMock.push).toBeCalled();
  });
});

const routerMockSignIn = {
  route: PATH_SIGN_IN,
  pathname: PATH_SIGN_IN,
  query: '',
  asPath: PATH_SIGN_IN,
  push: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
  },
  beforePopState: jest.fn(() => null),
  prefetch: jest.fn(() => null),
};

const renderComponentWithUser = (store): RenderResult => render(
  <Provider store={store}>
    <RouterContext.Provider value={routerMockSignIn as unknown as NextRouter}>
      <AuthenticationWrapper>
        <div>Test</div>
      </AuthenticationWrapper>
    </RouterContext.Provider>
  </Provider>,
);

describe('authContext with user', () => {
  const store = mockStore({ user: { user: { email: 'a@gmail.com', uid: 'asdf' } } });

  it('useEffect', async () => {
    act(() => {
      renderComponentWithUser(store);
    });

    const firstLoading = await screen.findByRole('progressbar');
    expect(firstLoading).toBeInTheDocument();
    expect(routerMockSignIn.push).toBeCalled();
    const text = await screen.findByText('Test');
    expect(text).toBeInTheDocument();
  });

});
