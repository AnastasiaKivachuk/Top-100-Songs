import { UpdateUserDTO } from '@dtos/user.dtos';
import firebase from '../../firebase.config';

export const itemsNextBatch = async (data: UpdateUserDTO) => {
  const user = firebase.auth().currentUser;
  await user.updateProfile(data);
};
