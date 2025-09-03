import type { PasteDTO } from '@/lib/dto/pastes/get';

export const getPasteByShortIdTag = (shortId: string) => ['paste', 'shortId'];

export const getPasteByShortId = async (shortId: string) => {
  const response = await fetch(`http://localhost:8080/pastes/${shortId}`, {
    next: {
      tags: getPasteByShortIdTag(shortId),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get paste by specified short id.');
  }

  const data: PasteDTO = await response.json();

  return data;
};
