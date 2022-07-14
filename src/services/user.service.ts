import { UpdateUserDTO } from '@interfaces/user.interfaces';
import firebase from '@root/firebase.config';

export const itemsNextBatch = async (data: UpdateUserDTO) => {
  const user = firebase.auth().currentUser;
  await user.updateProfile(data);
};

export const signInWithEmailAndPassword = (email: string, password: string) => (
  firebase.auth().signInWithEmailAndPassword(email, password));

export const createUserWithEmailAndPassword = (email: string, password: string) => (
  firebase.auth().createUserWithEmailAndPassword(email, password));

export const sendPasswordResetEmail = (email: string) => firebase.auth().sendPasswordResetEmail(email);

export const signOut = () => firebase.auth().signOut();
