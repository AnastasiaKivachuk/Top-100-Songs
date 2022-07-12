import React, { useMemo } from 'react';

import { Container } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

import { useSelector } from 'react-redux';
import { StoreDTO } from '@redux/interfaces/store.interface';
import { AppBar } from '@components/Menu';
import { useRouter } from 'next/router';
import { PATH_PROFILE } from '@constants/routes.constants';
import { useAuth } from '@contexts/auth.context';
import styles from './layout.module.scss';

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  const router = useRouter();
  const authUser = useSelector((state: StoreDTO) => state.user?.user);
  const { signOut } = useAuth();

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
          onClick: signOut,
          icon: <LogoutIcon />,
        },
      ]),
    [signOut],
  );
  return (
    <>
      <AppBar email={authUser?.email} displayName={authUser?.displayName} avatar={authUser?.photoURL} menuItems={menuItems} />
      <Container className={styles.container}>{children}</Container>
    </>
  );
}

export default Layout;
