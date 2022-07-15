import { put, call, takeLatest, select, take } from 'redux-saga/effects';

import { itemsFirstBatch, itemsNextBatch } from '@services/songs.service';
import { PATH_INDEX } from '@constants/routes.constants';
import { LOCATION_CHANGE } from 'connected-next-router';
import { CHANGE_SORT_FIELD, LOAD_MORE_SONGS, SET_USER } from '../constants';
import {
  setLoadingData,
  setLoadingInitData,
  setLoadMoreSongs,
  setTopSongs,
  setTopSongsError,
} from '../actions/actionCreator';

export function* handleTopSongs() {
  try {
    yield put(setLoadingInitData({ isInitLoading: true }));
    const sortBy = yield select((state) => state.songs.sortBy);
    const arraySortPart = sortBy.split('-');
    const data = yield call(itemsFirstBatch, arraySortPart[0], arraySortPart[1]);
    yield put(setTopSongs(data));
    yield put(setLoadingInitData({ isInitLoading: false }));
  } catch {
    yield put(setTopSongsError({ error: 'Error fetching songs' }));
  }
}

export function* handleMoreSongs() {
  try {
    yield put(setLoadingData({ isLoading: true }));
    const key = yield select((state) => state.songs.lastKey);
    const sortBy = yield select((state) => state.songs.sortBy);
    const arraySortPart = sortBy.split('-');
    const data = yield call(itemsNextBatch, key, arraySortPart[0], arraySortPart[1]);
    yield put(setLoadMoreSongs(data));
  } catch {
    yield put(setTopSongsError({ error: 'Error fetching songs' }));
  } finally {
    yield put(setLoadingData({ isLoading: false }));
  }
}

export function* watchSaga() {
  const path = yield select(({ router }) => router.location.pathname);
  const { user } = yield select((state) => state.user);
  if (path === PATH_INDEX && user) {
    yield call(handleTopSongs);
  }
}

export default function* rootSaga() {
  yield take(SET_USER); yield watchSaga();
  yield takeLatest(LOCATION_CHANGE, watchSaga);
  yield takeLatest(LOAD_MORE_SONGS, handleMoreSongs);
  yield takeLatest(CHANGE_SORT_FIELD, handleTopSongs);
}
