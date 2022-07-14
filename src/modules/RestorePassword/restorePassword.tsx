import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEventHandler, useState } from 'react';

import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { showToast } from '@components/Toast';
import { PATH_SIGN_IN } from '@constants/routes.constants';
import { FIELD_NAMES, schema } from '@modules/RestorePassword/utils/restorePassword.validation';
import Link from 'next/link';
import { TOAST_SUCCESS } from '@components/Toast/constants/toast.constants';
import { sendPasswordResetEmail } from '@services/user.service';
import styles from './restorePassword.module.scss';

function RestorePassword(): JSX.Element {
  const [requestError, setRequestError] = useState('');
  const router = useRouter();

  const {
    setValue, handleSubmit, setError, control, formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [FIELD_NAMES.EMAIL]: '',
    },
  });

  const onSubmit = async (data: {email: string}) => {
    try {
      const { email } = data;
      await sendPasswordResetEmail(email);
      showToast('Email is send', TOAST_SUCCESS);
      await router.push(PATH_SIGN_IN);
    } catch (error) {
      setRequestError((error as Error)?.message);
    }
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setError(event.target.name, { message: '' });
    setValue(event.target.name, event.target.value);
  };

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 64px)' }} className={styles.container}>
      <Grid item xs={15} sm={9} md={7} component={Paper} elevation={8} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Restore password
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
            className={styles.form}
            data-testid="form"
          >
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
            {requestError && <div className={styles.requestError} data-testid="requestError">{requestError}</div>}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
              data-testid="btn"
              onClick={handleSubmit(onSubmit)}
              className={styles.btn}
            >
              Restore password
            </LoadingButton>
          </Box>
          <Grid container>
            <Grid item xs>
              <Link href={PATH_SIGN_IN}>
                Go to the &lsquo;Sign In&lsquo; page
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RestorePassword;
