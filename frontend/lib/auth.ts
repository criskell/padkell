import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { getAuthenticatedUser } from './queries/auth/get-authenticated-user';
import { AUTH_COOKIE } from './constants';

export const getUserToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get(AUTH_COOKIE)?.value;
};

export const signOut = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(AUTH_COOKIE);
};

export const isUserAuthenticated = async () => {
  return !!(await getUserToken());
};

export const auth = async () => {
  const token = await getUserToken();

  if (!token) {
    redirect('/sign-in');
  }

  try {
    const user = await getAuthenticatedUser();

    return user;
  } catch (e) {
    console.error(e);
  }

  redirect('/api/auth/sign-out');
};
