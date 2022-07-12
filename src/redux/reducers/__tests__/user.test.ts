import user from '../user';

describe('test user reducers', () => {
  it('SET_USER', () => {
    const text = 'test';
    let state = { user: null, isLoading: false };
    state = user(state, { type: 'SET_USER', payload: { user: text } });
    expect(state).toEqual({ user: text, isLoading: false });
  });

  it('SET_USER', () => {
    let state = { user: null, isLoading: false };
    state = user(state, { type: 'SET_USER_LOADING', payload: { isLoading: true } });
    expect(state).toEqual({ isLoading: true, user: null });
  });

  it('default case', () => {
    let state = { user: null, isLoading: false };
    state = user(state, { type: 'TEST', payload: '' });
    expect(state).toEqual({ user: null, isLoading: false });
  });
});
