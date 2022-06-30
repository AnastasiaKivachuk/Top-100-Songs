import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import {
  NON_AUTH_PATHS, PATH_INDEX, PATH_SIGN_IN, PATHS_WITH_AUTH,
} from '@constants/routes.constants';
import { CircularProgress } from '@mui/material';
import { StoreDTO } from '@dtos/store.dtos';
import useFirebaseAuth from '@hooks/auth.hooks';
import styles from './styles.module.scss';

const authUserContext = createContext({
  loading: true,
  signInWithEmailAndPassword: async () => {},
  createUserWithEmailAndPassword: async () => {},
  signOut: async () => {},
  sendPasswordResetEmail: async (email: string) => {},
});

export function AuthenticationWrapper({ children }) {
  const auth = useFirebaseAuth();
  const [isMount, setMount] = useState(false);
  const router = useRouter();
  const [loadingLocal, setLoading] = useState(false);
  const user = useSelector((state: StoreDTO) => state.user.user);
  console.log(user, 'aaaaaaaaa');
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user === null && PATHS_WITH_AUTH.includes(router.pathname)) {
        console.log('PATH_SIGN_IN');
        await router.push(PATH_SIGN_IN);
      }
      if (user && NON_AUTH_PATHS.includes(router.pathname)) {
        console.log('PATH_INDEX');
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>;
}

export const useAuth = () => useContext(authUserContext);
