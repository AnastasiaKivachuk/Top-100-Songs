import { SORT_BY } from '@constants/global.constants';
import {
  CHANGE_SORT_FIELD,
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
  sortBy: SORT_BY,
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
    case CHANGE_SORT_FIELD:
      return {
        ...state,
        sortBy: payload.sortBy,
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
