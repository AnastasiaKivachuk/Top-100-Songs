import loaderReducer from '@redux/reducers/loaderReducer';

describe('test loader reducers', () => {
  it('SET_TOP_SONGS_ERROR', () => {
    const test = true;
    let state = { isDataLoading: false };
    state = loaderReducer(state, { type: 'SET_LOADING_DATA', payload: test });
    expect(state).toEqual({ isDataLoading: test });
  });

  it('default case', () => {
    let state = { isDataLoading: false };
    state = loaderReducer(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({ isDataLoading: false });
  });
});
