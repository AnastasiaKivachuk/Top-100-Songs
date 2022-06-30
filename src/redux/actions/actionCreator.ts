import {
  SET_MORE_SONGS,
  SET_TOP_SONGS, SET_USER,
} from '../constants';

export const setTopSongs = (payload) => ({
  type: SET_TOP_SONGS,
  payload,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setLoadMoreSongs = (payload) => ({
  type: SET_MORE_SONGS,
  payload,
});
