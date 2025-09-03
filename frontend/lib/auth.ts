import { redirect } from 'next/navigation';
import { getCookie, type CookiesFn } from 'cookies-next';

import { getAuthenticatedUser } from './queries/auth/get-authenticated-user';

export const getUserToken = async () => {
  let cookieStore: CookiesFn | undefined;

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers');

    cookieStore = serverCookies;
  }

  return await getCookie('@padkell:token', {
    cookies: cookieStore,
  });
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
    console.log(e);
  }

  console.log('oiiiiiiii');

  // redirect('/api/auth/sign-out');
};
