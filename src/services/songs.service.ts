import { showToast } from '@components/Toast';
import { COLLECTION_NAME, PAGINATION_DEFAULT_TAKE, SORT_DIRECTIONS } from '@constants/global.constants';
import { TOAST_ERROR } from '@components/Toast/constants/toast.constants';
import firebase from '@root/firebase.config';

export const itemsFirstBatch = async () => {
  try {
    const data = await firebase.firestore()
      .collection(COLLECTION_NAME)
      .orderBy('snippet.position', SORT_DIRECTIONS.ASC)
      .limit(PAGINATION_DEFAULT_TAKE)
      .get();
    const songs = [];
    let lastKey = '';
    data.forEach((doc) => {
      songs.push(doc.data());
      lastKey = doc.data().snippet.position;
    });
    return { songs, lastKey };
  } catch (e) {
    showToast(e.message, TOAST_ERROR);
  }
};

export const itemsNextBatch = async (key) => {

  try {
    const data = await firebase.firestore()
      .collection(COLLECTION_NAME)
      .orderBy('snippet.position', SORT_DIRECTIONS.ASC)
      .startAfter(key)
      .limit(PAGINATION_DEFAULT_TAKE)
      .get();

    const songs = [];
    let lastKey = '';
    data.forEach((doc) => {
      songs.push(doc.data());
      lastKey = doc.data().snippet.position;
    });
    return { songs, lastKey };
  } catch (e) {
    showToast(e.message, TOAST_ERROR);
  }
};

export const getDetails = async (id) => {
  try {
    const data = await firebase.firestore()
      .collection('items')
      .where('id', '==', id)
      .get();

    let song = null;

    data.forEach((doc) => {
      song = doc.data();
    });

    return song;
  } catch (e) {
    showToast(e.message, TOAST_ERROR);
  }
};

export const itemsFilter = async (field: string, sortDirection = SORT_DIRECTIONS.ASC) => {
  try {
    const data = await firebase.firestore()
      .collection(COLLECTION_NAME)
      .orderBy(field, sortDirection)
      .limit(PAGINATION_DEFAULT_TAKE)
      .get();
    const songs = [];
    let lastKey = '';
    data.forEach((doc) => {
      songs.push(doc.data());
      lastKey = doc.data().snippet.position;
    });
    return { songs, lastKey };
  } catch (e) {
    showToast(e.message, TOAST_ERROR);
  }
};
