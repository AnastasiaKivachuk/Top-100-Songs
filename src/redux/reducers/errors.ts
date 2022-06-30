import { SET_TOP_SONGS_ERROR } from '../constants';

const initialState = { error: '' };

// eslint-disable-next-line default-param-last
const errors = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOP_SONGS_ERROR:
      return {
        ...state,
        error: payload,
      };
    default: return state;
  }
};

export default errors;
