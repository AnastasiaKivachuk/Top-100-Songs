import userReducer from './userReducer';

describe('test userReducer reducers', () => {
  it('SET_USER', () => {
    const text = 'test';
    let state = { user: null };
    state = userReducer(state, { type: 'SET_USER', payload: text });
    expect(state).toEqual({ user: text });
  });

  it('default case', () => {
    let state = { user: null };
    state = userReducer(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({ user: null });
  });
});
