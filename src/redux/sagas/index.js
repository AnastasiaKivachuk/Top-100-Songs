import {
  put, call, takeLatest, select,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  SET_LOADING_DATA, SET_TOP_SONGS_ERROR,
} from '../constants';
import { setLatestNews, setPopularNews, setTopSongs } from '../actions/actionCreator';
import { getLatestNews, getPopularNews } from '../../api/index';

export function* handleTopSongs() {
  try {
    const { hits } = yield call(getLatestNews, 'react');
    yield put(setTopSongs(hits));
  } catch {
    yield put({ type: SET_TOP_SONGS_ERROR, payload: 'Error fetching latest news' });
  }
}

// export function* handlePopularNews() {
//   try {
//     const { hits } = yield call(getPopularNews);
//     yield put(setPopularNews(hits));
//   } catch {
//     yield put({ type: SET_POPULAR_NEWS_ERROR, payload: 'Error fetching popular news' });
//   }
// }

export function* watchNewsSaga() {
  yield put({ type: SET_LOADING_DATA, payload: true });
  const path = yield select(({ router }) => router.location.pathname);
  // if (path === '/') {
  //   yield call(handlePopularNews);
  // }
  if (path === '/') {
    yield call(handleTopSongs);
  }
  yield put({ type: SET_LOADING_DATA, payload: false });
}

export default function* rootSaga() {
  yield takeLatest(LOCATION_CHANGE, watchNewsSaga);
}
