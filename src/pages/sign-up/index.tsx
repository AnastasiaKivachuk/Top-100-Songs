import React from 'react';

import { SignInSignUp } from '@modules/SignInSignUp';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import { useAuth } from '@contexts/auth.context';

const props = {
  addedLink: { text: 'Already have an account? Sign in', link: PATH_SIGN_IN },
  title: 'Sign Up',
  isSignIn: false,
};

function SignUpPage(): JSX.Element {
  const { createUserWithEmailAndPassword } = useAuth();
  return <SignInSignUp request={createUserWithEmailAndPassword} {...props} />;
}

export default SignUpPage;
