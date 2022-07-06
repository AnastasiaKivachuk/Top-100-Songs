import songsReducer from '@redux/reducers/songsReducer';

describe('test songsReducer reducers', () => {
  it('SET_TOP_SONGS', () => {
    const test = {
      songs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
    };
    const result = {
      topSongs: [{ id: 1 }, { id: 2 }],
      lastKey: 2,
    };
    let state = {
      topSongs: [],
      lastKey: 0,
    };
    state = songsReducer(state, { type: 'SET_TOP_SONGS', payload: test });
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
    };
    let state = {
      topSongs: [{ id: 1 }],
      lastKey: 1,
    };
    state = songsReducer(state, { type: 'SET_MORE_SONGS', payload: test });
    expect(state).toEqual(result);
  });

  it('default case', () => {
    let state = {
      topSongs: [],
      lastKey: 0,
    };
    state = songsReducer(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({
      topSongs: [],
      lastKey: 0,
    });
  });
});
