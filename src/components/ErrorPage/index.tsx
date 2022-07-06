import React from 'react';
import Link from 'next/link';

import { Button } from '@mui/material';

import { PATH_INDEX } from '@constants/routes.constants';
import styles from './styles.module.scss';

interface Props {
  imageSrc?: string
  text?: string
}

function ErrorPage({ imageSrc, text }: Props): JSX.Element {
  return (
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
}

ErrorPage.defaultProps = {
  imageSrc: '/images/404.svg',
  text: 'The page you are looking for doesn\'t exist or an other error occurred. Go back, or head over to the main page.',
};

export default ErrorPage;
