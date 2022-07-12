import songs from '@redux/reducers/songs';

describe('test songs reducers', () => {
  it('SET_TOP_SONGS', () => {
    const test = {
      songs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    const result = {
      topSongs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'SET_TOP_SONGS', payload: test });
    expect(state).toEqual(result);
  });
  it('SET_MORE_SONGS', () => {
    const test = {
      songs: [{ id: 2 }, { id: 3 }],
      lastKey: 3,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    const result = {
      topSongs: [{ id: 1 }, { id: 2 }, { id: 3 }],
      lastKey: 3,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    let state = {
      topSongs: [{ id: 1 }],
      lastKey: 1,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'SET_MORE_SONGS', payload: test });
    expect(state).toEqual(result);
  });

  it('SET_LOADING_DATA', () => {
    const test = {
      isLoading: true,
    };
    const result = {
      topSongs: [],
      lastKey: 0,
      isLoading: true,
      error: '',
      isInitLoading: false,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'SET_LOADING_DATA', payload: test });
    expect(state).toEqual(result);
  });

  it('SET_INIT_LOADING_DATA', () => {
    const test = {
      isInitLoading: true,
    };
    const result = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: true,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'SET_INIT_LOADING_DATA', payload: test });
    expect(state).toEqual(result);
  });

  it('SET_TOP_SONGS_ERROR', () => {
    const test = {
      error: 'error',
    };
    const result = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: 'error',
      isInitLoading: false,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'SET_TOP_SONGS_ERROR', payload: test });
    expect(state).toEqual(result);
  });

  it('default case', () => {
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    };
    state = songs(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
    });
  });
});
