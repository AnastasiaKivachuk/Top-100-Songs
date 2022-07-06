import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { CircularProgress } from '@mui/material';

import { NON_AUTH_PATHS, PATH_INDEX, PATH_SIGN_IN, PATHS_WITH_AUTH } from '@constants/routes.constants';
import { StoreDTO } from '@dtos/store.dtos';
import useFirebaseAuth from '@hooks/auth.hooks';
import styles from './styles.module.scss';

const authUserContext = createContext({
  loading: true,
  signInWithEmailAndPassword: async (email: string, password: string) => {},
  createUserWithEmailAndPassword: async (email: string, password: string) => {},
  signOut: async () => {},
  sendPasswordResetEmail: async (email: string) => {},
});

export function AuthenticationWrapper({ children }) {
  const auth = useFirebaseAuth();
  const [isMount, setMount] = useState(false);
  const router = useRouter();
  const [loadingLocal, setLoading] = useState(false);
  const user = useSelector((state: StoreDTO) => state.userReducer?.user);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user === null && PATHS_WITH_AUTH.includes(router.pathname)) {
        await router.push(PATH_SIGN_IN);
      }
      if (user && NON_AUTH_PATHS.includes(router.pathname)) {
        await router.push(PATH_INDEX);
      }
      setLoading(false);
    })();
  }, [user]);

  useEffect(() => {
    setMount(true);
  }, []);

  if (user === null && PATHS_WITH_AUTH.includes(router.pathname) && isMount) {
    router.push(PATH_SIGN_IN);
  }
  if (user === undefined || loadingLocal || auth.loading) {
    return <CircularProgress className={styles.loader} />;
  }

  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);
