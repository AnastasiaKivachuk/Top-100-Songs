// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { initialRouterState, createRouterMiddleware } from 'connected-next-router';
import { Router } from 'next/router';

import reducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const routerMiddleware = createRouterMiddleware();

const composeEnhancers = typeof window === 'object' && window?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const configureStore = (preloadedState) => {
  const { asPath } = preloadedState.ctx || (typeof window === 'object' && Router.router) || {};
  let initialState;
  if (asPath) {
    initialState = {
      router: initialRouterState(asPath as string),
    };
  }
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware), applyMiddleware(routerMiddleware)),
  );
};

const store = configureStore({ });

sagaMiddleware.run(rootSaga);

export default store;
