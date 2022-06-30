import React, { FC } from 'react';

import SignInSignUp from '@containers/SignInSignUp';
import { useAuth } from '@contexts/auth.context';

const SignInPage: FC = () => {
  const { signInWithEmailAndPassword } = useAuth();

  return <SignInSignUp request={signInWithEmailAndPassword} />;
};

export default SignInPage;
