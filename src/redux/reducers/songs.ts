import { SET_MORE_SONGS, SET_TOP_SONGS } from '../constants';

const initialState = {
  topSongs: [],
  lastKey: 0,
};

// eslint-disable-next-line default-param-last
const songs = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_TOP_SONGS:
      return {
        ...state,
        topSongs: payload.songs,
        lastKey: payload.lastKey,
      };
    case SET_MORE_SONGS:
      return {
        ...state,
        topSongs: [...state.topSongs, ...payload.songs],
        lastKey: payload.lastKey,
      };
    default: return state;
  }
};

export default songs;
