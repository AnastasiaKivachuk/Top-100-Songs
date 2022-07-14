import React, { useEffect, useMemo } from 'react';

import { Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useDispatch, useSelector } from 'react-redux';
import { StoreDTO } from '@redux/interfaces/store.interface';
import { AppBar } from '@components/Menu';
import { useRouter } from 'next/router';
import { PATH_PROFILE } from '@constants/routes.constants';
import { signOut } from '@services/user.service';
import { setUser, setUserLoading } from '@redux/actions/actionCreator';
import styles from './layout.module.scss';

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const authUser = useSelector((state: StoreDTO) => state.user?.user);

  const onSignOut = () => signOut().then(() => {
    dispatch(setUser({ user: null }));
    setUserLoading(true);
  });

  const menuItems = useMemo(
    () => (
      [
        {
          name: 'Profile',
          onClick: () => router.push(PATH_PROFILE),
          icon: <PersonIcon />,
        },
        {
          name: 'Sign out',
          onClick: onSignOut,
          icon: <LogoutIcon />,
        },
      ]),
    [onSignOut],
  );
  return (
    <>
      <AppBar email={authUser?.email} displayName={authUser?.displayName} avatar={authUser?.photoURL} menuItems={menuItems} />
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default Layout;
