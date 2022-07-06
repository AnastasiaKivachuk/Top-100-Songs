import React from 'react';
import Link from 'next/link';

import Grid from '@mui/material/Grid';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { PATH_INDEX } from '@constants/routes.constants';
import { useSelector } from 'react-redux';
import { StoreDTO } from '@dtos/store.dtos';
import { useAuth } from '@contexts/auth.context';
import styles from './styles.module.scss';

function Menu(): JSX.Element {
  const authUser = useSelector((state: StoreDTO) => state.userReducer?.user);
  const { signOut } = useAuth();

  return (
    <MuiAppBar>
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Link href={PATH_INDEX} color="inherit">
            <a className={styles.link}>
              <Typography variant="h4" className={styles.title}>Top <img
                src="images/logo.png"
                alt="logo"
              /> songs
              </Typography>
            </a>
          </Link>
          {authUser && (
            <div>
              <Typography variant="h6" className={styles.signOut}>
                Hi, {authUser.email}!
              </Typography>
              <Typography variant="h6" className={styles.signOut} onClick={signOut} align="center">
                Sign out
              </Typography>
            </div>
          )}
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}

export default Menu;
