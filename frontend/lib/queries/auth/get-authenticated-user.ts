import { api } from '@/lib/api-client';
import type { UserDTO } from '@/lib/dto/user';

export const getAuthenticatedUser = async () => {
  const response = await api.get('users/me');

  if (!response.ok) {
    throw new Error('Failed to get current authenticated user.');
  }

  const data: UserDTO = await response.json();

  console.log(data);

  return data;
};
