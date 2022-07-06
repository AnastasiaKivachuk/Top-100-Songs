import errorsReducer from '@redux/reducers/errorsReducer';

describe('test errors reducers', () => {
  it('SET_TOP_SONGS_ERROR', () => {
    const text = 'test';
    let state = { error: '' };
    state = errorsReducer(state, { type: 'SET_TOP_SONGS_ERROR', payload: text });
    expect(state).toEqual({ error: text });
  });

  it('default case', () => {
    let state = { error: '' };
    state = errorsReducer(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({ error: '' });
  });
});
