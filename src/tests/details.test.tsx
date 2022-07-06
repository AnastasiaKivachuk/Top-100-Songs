import React from 'react';
import {
  act, render, screen,
} from '@testing-library/react';

import { PATH_SONG } from '@constants/routes.constants';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import DetailsPage from '@pages/songs/[id]';
import userReducer from '../redux/reducers/userReducer';
import songsReducer from '../redux/reducers/songsReducer';

const store = createStore(combineReducers([userReducer, songsReducer]));

describe('DetailsPage', () => {

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      route: PATH_SONG,
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });

  it('should render DetailsPage', async () => {
    act(() => {
      render(<Provider store={store}><DetailsPage /></Provider>);
    });
    const progressbar = await screen.findByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    const text = await screen.findByText('Something went wrong');
    expect(text).toBeInTheDocument();
  });
});
