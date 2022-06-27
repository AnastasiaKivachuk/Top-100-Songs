import React, { FC } from 'react';

import SignInSignUp from '@containers/SignInSignUp';
import useFirebaseAuth from '@hooks/auth.hooks';

const SignInPage: FC = () => {
  const { signInWithEmailAndPassword } = useFirebaseAuth();

  return <SignInSignUp request={signInWithEmailAndPassword} />;
};

export default SignInPage;
