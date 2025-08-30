import type { GetPaste } from '@/lib/dto/pastes/get';

export const LIST_PASTES_TAG = 'pastes';

export const listPastes = async () => {
  const response = await fetch('http://localhost:8080/pastes', {
    next: {
      tags: [LIST_PASTES_TAG],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to list pastes.');
  }

  const data: GetPaste[] = await response.json();

  return data;
};
