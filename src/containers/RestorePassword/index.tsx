import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { ChangeEventHandler } from 'react';

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
import useFirebaseAuth from '@hooks/auth.hooks';
import { FIELD_NAMES, schema } from '@containers/RestorePassword/validation';
import styles from './styles.module.scss';

function RestorePassword(): JSX.Element {

  const router = useRouter();
  const { sendPasswordResetEmail } = useFirebaseAuth();

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
      const res = await sendPasswordResetEmail(email);
      showToast('Email is send', 'success');
      await router.push(PATH_SIGN_IN);
    } catch (error) {
      showToast((error as Error).message, 'error');
    }
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setError(event.target.name, { message: '' });
    setValue(event.target.name, event.target.value);
  };

  return (
    <Grid container component="main" sx={{ height: 'calc(100vh - 64px)' }} className={styles.container}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
                  />
                  {error?.message && <div className={styles.error}>{error?.message}</div>}
                </div>
              )}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={isSubmitting}
            >
              Restore password
            </LoadingButton>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RestorePassword;
