import type { PasteDTO } from '@/lib/dto/pastes/get';

export const LIST_PASTES_TAG = 'pastes';

export const listPastes = async () => {
  const response = await fetch('http://localhost:8080/pastes', {
    next: {
      tags: [LIST_PASTES_TAG],
    },
  });

  if (!response.ok) {
    throw new Error('Failed to list paste summaries.');
  }

  const data: PasteDTO[] = await response.json();

  return data;
};
