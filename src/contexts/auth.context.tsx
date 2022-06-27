import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import {
  NON_AUTH_PATHS, PATH_INDEX, PATH_SIGN_IN,
} from '@constants/routes.constants';
import { CircularProgress } from '@mui/material';

export function AuthenticationWrapper({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (user === null && !NON_AUTH_PATHS.includes(router.pathname)) {
        await router.push(PATH_SIGN_IN);
      }
      if (user && NON_AUTH_PATHS.includes(router.pathname)) {
        await router.push(PATH_INDEX);
      }
      setLoading(false);
    })();
  }, [user, router.pathname]);

  if (user === undefined || loading) {
    return <CircularProgress />;
  }

  return children;
}
