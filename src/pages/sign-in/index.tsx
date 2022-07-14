import React from 'react';

import { SignInSignUp } from '@modules/SignInSignUp';
import { signInWithEmailAndPassword } from '@services/user.service';

function SignInPage(): JSX.Element {

  return <SignInSignUp request={signInWithEmailAndPassword} />;
}

export default SignInPage;
