import React, { FC } from 'react';

import { Container } from '@mui/material';
import Menu from '@components/Menu';
import styles from './styles.module.scss';

const Layout: FC = ({ children }: { children: JSX.Element }) => (
  <div>
    <Menu />
    <Container className={styles.container}>{children}</Container>
  </div>
);

export default Layout;
