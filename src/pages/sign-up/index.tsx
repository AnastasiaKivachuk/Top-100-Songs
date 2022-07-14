import React from 'react';

import { SignInSignUp } from '@modules/SignInSignUp';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import { createUserWithEmailAndPassword } from '@services/user.service';

const props = {
  addedLink: { text: 'Already have an account? Sign in', link: PATH_SIGN_IN },
  title: 'Sign Up',
  isSignIn: false,
};

function SignUpPage(): JSX.Element {
  return <SignInSignUp request={createUserWithEmailAndPassword} {...props} />;
}

export default SignUpPage;
