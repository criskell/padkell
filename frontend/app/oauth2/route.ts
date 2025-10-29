import { notFound, redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

import { authenticateUser } from '@/lib/domain/auth/authenticate-user';

export const GET = async (request: NextRequest) => {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    notFound();
  }

  await authenticateUser({
    token,
  });

  redirect('/');
};
