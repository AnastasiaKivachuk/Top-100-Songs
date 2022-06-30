import React from 'react';

import { Container } from '@mui/material';
import Menu from '@components/Menu';
import styles from './styles.module.scss';

function Layout({ children }: { children: JSX.Element }): JSX.Element {
  return (
    <div>
      <Menu />
      <Container className={styles.container}>{children}</Container>
    </div>
  );
}

export default Layout;
