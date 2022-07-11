import React, { useState } from 'react';

import { CircularProgress } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { UseFormSetError } from 'react-hook-form';
import firebase from '../../../firebase.config';

type Props={
  onFileUpload: (val: string) => void,
  value: string, name: string, setError: UseFormSetError<Record<string, any>>,

}

function UploadFile({ onFileUpload, value, name, setError }: Props) {
  const [loading, setLoading] = useState(false);

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
      },
      () => {
        storage?.ref('images')?.child(file.name).getDownloadURL()
          .then((fireBaseUrl) => {
            onFileUpload(fireBaseUrl);
          });
      },
    );
    setLoading(false);
  };

  return (
    <div>
      <Avatar src={value || '/static/images/avatar/2.jpg'} />
      <input
        type="file"
        onChange={handleFireBaseUpload}
        accept="image/png, image/jpeg, image/jpg"
        name={name}
        data-testid="uploadInput"
      />
      {loading && <CircularProgress />}
    </div>
  );
}

export default UploadFile;
