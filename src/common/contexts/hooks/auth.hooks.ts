import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setUser, setUserLoading } from '@redux/actions/actionCreator';
import firebase from '../../../../firebase.config';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user?.displayName,
  photoURL: user?.photoURL,
});

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const authStateChanged = useCallback((authState) => {
    if (!authState) {
      dispatch(setUser({ user: null }));
      setUserLoading(false);
      return;
    }

    setUserLoading(true);
    const formattedUser = formatAuthUser(authState);
    dispatch(setUser({ user: formattedUser }));
    setUserLoading(false);

  }, []);

  const clear = useCallback(() => {
    dispatch(setUser({ user: null }));
    setUserLoading(true);
  }, []);

  const signInWithEmailAndPassword = useCallback((email: string, password: string) => (
    firebase.auth().signInWithEmailAndPassword(email, password)), []);

  const createUserWithEmailAndPassword = useCallback((email: string, password: string) => (
    firebase.auth().createUserWithEmailAndPassword(email, password)), []);

  const sendPasswordResetEmail = useCallback((email: string) => firebase.auth().sendPasswordResetEmail(email), []);

  const signOut = useCallback(() => firebase.auth().signOut().then(clear), []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  };
}
