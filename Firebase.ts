// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import firebase from 'firebase';

export const firebaseCredentials = {
  apiKey: 'AIzaSyC95atwRNDVpwV7okfWcW6bg4XZ01MhK90',
  authDomain: 'top-100-songs-fe870.firebaseapp.com',
  databaseURL: 'https://top-100-songs-fe870-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'top-100-songs-fe870',
  storageBucket: 'top-100-songs-fe870.appspot.com',
  messagingSenderId: '148511245957',
  appId: '1:148511245957:web:e85134ed3b0e290c5c0bec',
};

// If an firebase app hasn't already been created
if (!firebase?.apps?.length) {
  firebase.initializeApp(firebaseCredentials);
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default firebase;
