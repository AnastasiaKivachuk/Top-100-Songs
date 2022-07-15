import { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { setUser, setUserLoading } from '@redux/actions/actionCreator';
import firebase from '@root/firebase.config';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user?.displayName,
  photoURL: user?.photoURL,
});

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const authStateChanged = useCallback((authState) => {
    setUserLoading(true);
    if (!authState) {
      dispatch(setUser({ user: null }));
      setUserLoading(false);
      return;
    }

    const formattedUser = formatAuthUser(authState);
    dispatch(setUser({ user: formattedUser }));
    setUserLoading(false);

  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);
}
