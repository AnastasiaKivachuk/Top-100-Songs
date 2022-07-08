import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useEffect, useState } from 'react';
import Link from 'next/link';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { FIELD_NAMES, schema } from '@containers/SignInSignUp/validation';
import { getLocalStorageItem, removeLocalStorageItem, setLocalStorageItem } from '@helpers/localStorage.helpers';
import { showToast } from '@components/Toast';
import { PATH_INDEX, PATH_RESTORE_PASSWORD, PATH_SIGN_UP } from '@constants/routes.constants';
import styles from './styles.module.scss';

type Props = {
  title?: string
  addedLink?: { text: string, link: string },
  isSignIn?: boolean
  request: (email: string, password: string) => any
}

function SignInSignUp({
  title, addedLink, isSignIn, request,
}: Props): JSX.Element {
  const [requestError, setRequestError] = useState('');
  const router = useRouter();

  const {
    setValue, handleSubmit, setError, control, formState: { isSubmitting }, reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [FIELD_NAMES.EMAIL]: '',
      [FIELD_NAMES.PASSWORD]: '',
      [FIELD_NAMES.REMEMBER]: false,
    },
  });

  useEffect(() => {
    if (isSignIn) {
      const localData = JSON.parse(getLocalStorageItem('userData'));
      if (localData) {
        reset(localData as { [x: string]: string | boolean });
      }
    }
  }, []);

  const onSubmit = async (data: {email: string, password: string, isRemember: boolean}) => {
    try {
      const { email, password, isRemember } = data;
      if (isRemember) {
        setLocalStorageItem('userData', JSON.stringify(data));
      } else {
        removeLocalStorageItem('userData');
      }

      await request(email, password);

      if (!isSignIn) { showToast('Success. Profile is created', 'success'); }
      await router.push(PATH_INDEX);
    } catch (error) {
      setRequestError((error as Error).message);
    }
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setError(event.target.name, { message: '' });
    setValue(event.target.name, event.target.value);
  };

  const onChecked: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.name, event.target.checked);
  };

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 64px)' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        className={styles.img}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {title}
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }} className={styles.form}>
            <Controller
              name={FIELD_NAMES.EMAIL}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className={styles.wrapInput}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name={FIELD_NAMES.EMAIL}
                    autoComplete="email"
                    autoFocus
                    value={value}
                    onChange={onValueChange}
                    placeholder="example.email@gmail.com"
                  />
                  {error?.message && <div className={styles.error}>{error?.message}</div>}
                </div>
              )}
            />
            <Controller
              name={FIELD_NAMES.PASSWORD}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className={styles.wrapInput}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name={FIELD_NAMES.PASSWORD}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={value}
                    onChange={onValueChange}
                    placeholder="******"
                  />
                  {error?.message && <div className={styles.error}>{error?.message}</div>}
                </div>
              )}
            />
            <Controller
              name={FIELD_NAMES.REMEMBER}
              control={control}
              render={({ field: { value } }) => (
                <FormControlLabel
                  control={<Checkbox value={value} color="primary" />}
                  label="Remember me"
                  name={FIELD_NAMES.REMEMBER}
                  value={value}
                  checked={value as boolean}
                  onChange={onChecked}
                />
              )}
            />
            {requestError && <div className={styles.requestError} data-testid="requestError">{requestError}</div>}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              data-testid="btn"
              className={styles.btn}
            >
              {title}
            </LoadingButton>
            <Grid container>
              <Grid item xs>
                {isSignIn && (
                  <Link href={PATH_RESTORE_PASSWORD}>
                    Forgot password?
                  </Link>
                )}
              </Grid>
              <Grid item>
                <Link href={addedLink.link}>
                  {addedLink.text}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

SignInSignUp.defaultProps = {
  addedLink: { text: 'Don\'t have an account? Sign Up', link: PATH_SIGN_UP },
  title: 'Sign In',
  isSignIn: true,
};

export default SignInSignUp;
