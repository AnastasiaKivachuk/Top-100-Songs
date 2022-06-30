import jsonData from 'file.json';
import { setLoadMoreSongs } from '@redux/actions/actionCreator';
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
    // const songs = jsonData;
    // const lastKey = 49;
    return { songs, lastKey };
  } catch (e) {
    console.log(e);
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
    // console.log(key);
    // const songs = jsonData;
    // const lastKey = 0;
    return { songs, lastKey };
  } catch (e) {
    console.log(e);
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
  } catch (e: any) {
    showToast(e.message, 'error');
  }
};
