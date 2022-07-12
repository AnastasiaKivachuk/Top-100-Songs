import {
  SET_INIT_LOADING_DATA,
  SET_LOADING_DATA,
  SET_MORE_SONGS,
  SET_TOP_SONGS,
  SET_TOP_SONGS_ERROR,
} from '../constants';

const initialState = {
  topSongs: [],
  lastKey: 0,
  isLoading: false,
  error: null,
  isInitLoading: false,
};

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
    case SET_LOADING_DATA:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    case SET_TOP_SONGS_ERROR:
      return {
        ...state,
        error: payload.error,
      };
    case SET_INIT_LOADING_DATA:
      return {
        ...state,
        isInitLoading: payload.isInitLoading,
      };
    default: return state;
  }
};

export default songs;
