import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { PATH_SONG } from '@constants/routes.constants';
import { mockDetailsStore } from '../utils/mockStore';
import { Details } from '../index';

const middlewares = [];
const mockStore = configureStore(middlewares);

describe('Details Component with error', () => {
  const initialState = {
    songs: {
      topSongs: null,
    },
  };
  const store = mockStore(initialState);
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

  it('should render with empty Details Component', async () => {
    act(() => {
      render(<Provider store={store}><Details /></Provider>);
    });
    const progressbar = await screen.findByRole('progressbar');
    expect(progressbar).toBeInTheDocument();
    const text = await screen.findByTestId('error');
    expect(text).toBeInTheDocument();
  });

});

describe('Details Component with query', () => {
  const initialState = {
    songs: {
      topSongs: mockDetailsStore,
    },
  };
  const store = mockStore(initialState);
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');
    useRouter.mockImplementation(() => ({
      route: PATH_SONG,
      pathname: '/songs/[id]',
      query: { id: 'UExESW9VT2hRUVBsWHI2M0lfdndGOUdEOHNBS2g3N2RXVS44NUVBOTY4RTkzNjhCODFE' },
      asPath: '/songs/UExESW9VT2hRUVBsWHI2M0lfdndGOUdEOHNBS2g3N2RXVS44NUVBOTY4RTkzNjhCODFE',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    }));
  });
  it('should render Details Component with query', async () => {
    act(() => {
      render(<Provider store={store}><Details /></Provider>);
    });
    const text = await screen.findByTestId('title');
    expect(text).toBeInTheDocument();
  });

  it('click on show more Details', async () => {
    act(() => {
      render(<Provider store={store}><Details /></Provider>);
    });
    const btn = await screen.findByTestId('btn');
    expect(btn).toHaveTextContent('Read more');
    fireEvent.click(btn);
    expect(btn).toHaveTextContent('Show less');
  });

});
