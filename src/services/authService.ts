import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';

import { auth } from './firebase';

export async function registerWithEmail(
  email: string,
  password: string
): Promise<User> {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );

  return credential.user;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<User> {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email.trim().toLowerCase(),
      password
    );

  return credential.user;
}

export async function logout(): Promise<void> {
  await signOut(auth);
}
