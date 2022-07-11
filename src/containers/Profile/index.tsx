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
import { PATH_INDEX } from '@constants/routes.constants';

import { itemsNextBatch } from '@services/user.service';
import { UpdateUserDTO } from '@dtos/user.dtos';
import UploadFile from '@containers/Profile/uploadFile';
import { useSelector } from 'react-redux';
import { StoreDTO } from '@dtos/store.dtos';
import { Button } from '@mui/material';
import { FIELD_NAMES, schema } from './validation';
import styles from './styles.module.scss';

function Profile(): JSX.Element {
  const authUser = useSelector((state: StoreDTO) => state.userReducer?.user);
  const [requestError, setRequestError] = useState('');
  const router = useRouter();

  const {
    setValue, handleSubmit, setError, control, formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      [FIELD_NAMES.DISPLAY_NAME]: authUser?.displayName || '',
      [FIELD_NAMES.PHOTO_URL]: authUser?.photoURL || '',
    },
  });

  const onSubmit = async (data: UpdateUserDTO) => {
    try {
      await itemsNextBatch(data);
      showToast('Profile is updated', 'success');
      await router.push(PATH_INDEX);
    } catch (error) {
      setRequestError((error as Error)?.message);
    }
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
    setError(event.target.name, { message: '' });
    setValue(event.target.name, event.target.value);
  };

  const onFileUpload = (url: string) => {
    setError(FIELD_NAMES.PHOTO_URL, { message: '' });
    setValue(FIELD_NAMES.PHOTO_URL, url);
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
          <Typography component="h1" variant="h5">
            Update Profile
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
            className={styles.form}
            data-testid="form"
          >
            <Controller
              name={FIELD_NAMES.PHOTO_URL}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className={styles.wrapInput}>
                  <UploadFile onFileUpload={onFileUpload} value={value} name={FIELD_NAMES.PHOTO_URL} setError={setError} />
                  {error?.message && <div className={styles.error}>{error?.message}</div>}
                </div>
              )}
            />
            <Controller
              name={FIELD_NAMES.DISPLAY_NAME}
              control={control}
              render={({ field: { value }, fieldState: { error } }) => (
                <div className={styles.wrapInput}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="Display Name"
                    name={FIELD_NAMES.DISPLAY_NAME}
                    autoFocus
                    value={value}
                    onChange={onValueChange}
                    placeholder="Display Name"
                  />
                  {error?.message && <div className={styles.error}>{error?.message}</div>}
                </div>
              )}
            />
            {requestError && <div className={styles.requestError} data-testid="requestError">{requestError}</div>}
            <div className={styles.wrapBtn}>
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
                Save
              </LoadingButton>
              <Button className={styles.btn} onClick={() => router.back()} variant="outlined">Cancel</Button>
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Profile;
