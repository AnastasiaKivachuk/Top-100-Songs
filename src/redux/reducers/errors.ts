import { SET_TOP_SONGS_ERROR } from '../constants';

const initialState = { error: null };

const errors = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOP_SONGS_ERROR:
      return {
        ...state,
        topSongsError: payload,
      };
    default: return state;
  }
};

export default errors;
