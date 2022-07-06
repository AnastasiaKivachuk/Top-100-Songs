import React, { FC } from 'react';

import SignInSignUp from '@containers/SignInSignUp';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import { useAuth } from '@contexts/auth.context';

const props = {
  addedLink: { text: 'Already have an account? Sign in', link: PATH_SIGN_IN },
  title: 'Sign Up',
  isSignIn: false,
};

const SignUpPage: FC = () => {
  const { createUserWithEmailAndPassword } = useAuth();
  return <SignInSignUp request={createUserWithEmailAndPassword} {...props} />;
};

export default SignUpPage;
