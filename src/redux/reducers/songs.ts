import { SET_TOP_SONGS } from '../constants';

const initialState = {
  topSongs: [],
};

const songs = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOP_SONGS:
      return {
        ...state,
        latestNews: payload,
      };
    default: return state;
  }
};

export default songs;
