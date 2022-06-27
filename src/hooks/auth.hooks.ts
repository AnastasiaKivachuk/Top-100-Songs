import { useState, useEffect } from 'react';
import { setUser } from '@redux/actions/actionCreator';
import { useDispatch, useSelector } from 'react-redux';
import firebase from '../../Firebase';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
});

export default function useFirebaseAuth() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const authStateChanged = (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const formattedUser = formatAuthUser(authState);
    dispatch(setUser(formattedUser));

    setLoading(false);

  };

  const clear = () => {
    dispatch(setUser(null));
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
    loading,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  };
}
