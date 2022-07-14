import React, { useRef, useState } from 'react';
import { UseFormSetError } from 'react-hook-form';

import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

import firebase from '@root/firebase.config';
import styles from './sortingSelect.module.scss';

type Props={
  onFileUpload: (val: string) => void,
  value: string, name: string, setError: UseFormSetError<Record<string, any>>,

}

function SortingSelect({ onFileUpload, value, name, setError }: Props) {
  const [loading, setLoading] = useState(false);
  const inputElement = useRef();

  const handleFireBaseUpload = (event) => {
    const file = event.target.files[0];
    event.preventDefault();
    setLoading(true);
    const storage = firebase.storage();
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);

    uploadTask.on(
      'state_changed',
      () => null,
      (err) => {
        setError(name, { message: err.message });
        setLoading(false);
      },
      () => {
        storage?.ref('images')?.child(file.name).getDownloadURL()
          .then((fireBaseUrl) => {
            onFileUpload(fireBaseUrl);
          });
        setLoading(false);
      },
    );
  };

  const handleClickOnAvatar = () => inputElement.current !== undefined && (inputElement.current as any)?.click();

  return (
    <>
      <div
        className={styles.info}
        onClick={handleClickOnAvatar}
        role="presentation"
        data-testid="label"
      >Click to change avatar <ArrowDownwardIcon />
      </div>
      <div className={styles.wrapper}>
        <Avatar
          src={value || '/static/images/avatar/2.jpg'}
          onClick={handleClickOnAvatar}
          className={styles.avatar}
        />
        {loading && <div className={styles.loader}><CircularProgress /></div>}
        <input
          type="file"
          onChange={handleFireBaseUpload}
          accept="image/png, image/jpeg, image/jpg"
          name={name}
          data-testid="uploadInput"
          ref={inputElement}
          className={styles.input}
        />
      </div>
    </>
  );
}

export default SortingSelect;
