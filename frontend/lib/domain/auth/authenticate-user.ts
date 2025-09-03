import type { AuthResponseDto } from '@/lib/dto/auth';
import { cookies } from 'next/headers';

export const authenticateUser = async (body: AuthResponseDto) => {
  const cookieStore = await cookies();

  cookieStore.set('@padkell:token', body.token, {
    maxAge: 60 * 60 * 24 * 7, // 7d
    path: '/',
  });
};
