import songs from '@redux/reducers/songs';
import { SORT_BY } from '@constants/global.constants';

describe('test songs reducers', () => {
  it('SET_TOP_SONGS', () => {
    const test = {
      songs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    const result = {
      topSongs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    state = songs(state, { type: 'SET_TOP_SONGS', payload: test });
    expect(state).toEqual(result);
  });
  it('SET_MORE_SONGS', () => {
    const test = {
      songs: [{ id: 2 }, { id: 3 }],
      lastKey: 3,
    };
    const result = {
      topSongs: [{ id: 1 }, { id: 2 }, { id: 3 }],
      lastKey: 3,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    let state = {
      topSongs: [{ id: 1 }],
      lastKey: 1,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
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
      sortBy: SORT_BY,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    state = songs(state, { type: 'SET_LOADING_DATA', payload: test });
    expect(state).toEqual(result);
  });

  it('CHANGE_SORT_FIELD', () => {
    const test = {
      sortBy: 'test',
    };
    const result = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: 'test',
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    };
    state = songs(state, { type: 'CHANGE_SORT_FIELD', payload: test });
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
      sortBy: SORT_BY,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
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
      sortBy: SORT_BY,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
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
      sortBy: SORT_BY,
    };
    state = songs(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({
      topSongs: [],
      lastKey: 0,
      isLoading: false,
      error: '',
      isInitLoading: false,
      sortBy: SORT_BY,
    });
  });
});
