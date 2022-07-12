import { SET_USER, SET_USER_LOADING } from '../constants';

const initialState = {
  user: undefined,
  isLoading: false,
};

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload.user,
      };
    case SET_USER_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    default:
      return state;
  }
};

export default user;
