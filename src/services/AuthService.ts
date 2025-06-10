import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, verifyBeforeUpdateEmail } from 'firebase/auth';
import { firebaseAuth } from './firebase';

export const signUp = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const logout = () => {
    return signOut(firebaseAuth);
};

export const sendResetPasswordEmail = async (email: string) => {
  return sendPasswordResetEmail(firebaseAuth, email);
};

export const changeEmailWithVerification = async (newEmail: string) => {
  const user = firebaseAuth.currentUser;
  if (!user) {throw new Error('No user logged in');}
  verifyBeforeUpdateEmail(user, newEmail);
};
