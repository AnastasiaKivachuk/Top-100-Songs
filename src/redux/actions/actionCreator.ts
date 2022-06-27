import {
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
