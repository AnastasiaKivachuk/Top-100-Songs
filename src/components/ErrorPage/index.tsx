import React, { FC } from 'react';
import Link from 'next/link';
import { PATH_INDEX } from '@constants/routes.constants';
import { Button } from '@mui/material';
import styles from './styles.module.scss';

interface Props {
  imageSrc?: string
  text?: string
}

const ErrorPage: FC<Props> = ({ imageSrc, text }) => (
  <div className={styles.pageWrap}>
    <img src={imageSrc} alt="" />
    <h2>Ooops, something went wrong</h2>
    <div className={styles.subtitle}>
      {text}
    </div>
    <Link href={PATH_INDEX}>
      <Button className={styles.btn}>Go to the main page</Button>
    </Link>
  </div>
);

ErrorPage.defaultProps = {
  imageSrc: '/images/404.svg',
  text: 'The page you are looking for doesn\'t exist or an other error occurred. Go back, or head over to the main page.',
};

export default ErrorPage;
