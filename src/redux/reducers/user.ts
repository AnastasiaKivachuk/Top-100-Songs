import { SET_USER } from '../constants';

const initialState = {
  user: undefined,
};

// eslint-disable-next-line default-param-last
const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

export default user;
