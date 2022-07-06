import { showToast } from '@components/Toast';
import { COLLECTION_NAME, PAGINATION_DEFAULT_TAKE, SORT_DIRECTIONS } from '@constants/global.constants';
import firebase from '../../Firebase';

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
    showToast(e.message, 'error');
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
    showToast(e.message, 'error');
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
    showToast(e.message, 'error');
  }
};
