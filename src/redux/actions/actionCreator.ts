import {
  CHANGE_SORT_FIELD,
  SET_INIT_LOADING_DATA, SET_LOADING_DATA,
  SET_MORE_SONGS,
  SET_TOP_SONGS, SET_TOP_SONGS_ERROR, SET_USER, SET_USER_LOADING,
} from '../constants';

export const setTopSongs = (payload) => ({
  type: SET_TOP_SONGS,
  payload,
});

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const setUserLoading = (payload) => ({
  type: SET_USER_LOADING,
  payload,
});

export const setLoadMoreSongs = (payload) => ({
  type: SET_MORE_SONGS,
  payload,
});

export const setLoadingInitData = (payload) => ({
  type: SET_INIT_LOADING_DATA,
  payload,
});

export const setLoadingData = (payload) => ({
  type: SET_LOADING_DATA,
  payload,
});

export const setTopSongsError = (payload) => ({
  type: SET_TOP_SONGS_ERROR,
  payload,
});
export const setSortField = (payload) => ({
  type: CHANGE_SORT_FIELD,
  payload,
});
