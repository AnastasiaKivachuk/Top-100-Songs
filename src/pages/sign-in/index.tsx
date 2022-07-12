import React from 'react';

import { SignInSignUp } from '@modules/SignInSignUp';
import { useAuth } from '@contexts/auth.context';

function SignInPage(): JSX.Element {
  const { signInWithEmailAndPassword } = useAuth();

  return <SignInSignUp request={signInWithEmailAndPassword} />;
}

export default SignInPage;
