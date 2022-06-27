import { useState, useEffect } from 'react';
import firebase from '../../Firebase';

export default function useGettingSong() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const formattedUser = formatAuthUser(authState);

    setAuthUser(formattedUser);

    setLoading(false);

  };

  const clear = () => {
    setAuthUser(null);
    setLoading(true);
  };

  const signInWithEmailAndPassword = (email: string, password: string) => firebase.auth().signInWithEmailAndPassword(email, password);

  const createUserWithEmailAndPassword = (email: string, password: string) => (
    firebase.auth().createUserWithEmailAndPassword(email, password));

  const sendPasswordResetEmail = (email: string) => firebase.auth().sendPasswordResetEmail(email);

  const signOut = () => firebase.auth().signOut().then(clear);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  };
}
