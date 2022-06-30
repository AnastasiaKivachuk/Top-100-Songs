import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import { itemsFirstBatch, itemsNextBatch } from '@services/songs.service';
import { PATH_INDEX } from '@constants/routes.constants';
import { LOCATION_CHANGE } from 'connected-next-router';
import {
  LOAD_MORE_SONGS,
  SET_LOADING_DATA,
  SET_TOP_SONGS_ERROR, SET_USER,
} from '../constants';
import { setLoadMoreSongs, setTopSongs } from '../actions/actionCreator';

export function* handleTopSongs() {
  try {
    const data = yield call(itemsFirstBatch);
    yield put(setTopSongs(data));
  } catch {
    yield put({ type: SET_TOP_SONGS_ERROR, payload: 'Error fetching songs' });
  }
}

export function* handleMoreSongs() {
  try {
    yield put({ type: SET_LOADING_DATA, payload: true });
    const key = yield select((state) => state.songs.lastKey);
    const data = yield call(itemsNextBatch, key);
    yield put(setLoadMoreSongs(data));
  } catch {
    yield put({ type: SET_TOP_SONGS_ERROR, payload: 'Error fetching songs' });
  } finally {
    yield put({ type: SET_LOADING_DATA, payload: false });
  }
}

export function* watchSaga() {
  yield takeLatest(LOAD_MORE_SONGS, handleMoreSongs);
  yield put({ type: SET_LOADING_DATA, payload: true });
  const path = yield select(({ router }) => router.location.pathname);
  const { user } = yield select((state) => state.user);
  if (path === PATH_INDEX && user) {
    yield call(handleTopSongs);
  }
  yield put({ type: SET_LOADING_DATA, payload: false });
}

export function* watchSagaUser() {
  yield put({ type: SET_USER, payload: null });
}

export default function* rootSaga() {
  yield watchSagaUser();
  yield takeLatest(SET_USER, watchSaga);
}
