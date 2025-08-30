'use server';

import z from 'zod';

import { zfd } from 'zod-form-data';

import { actionClient } from '@/lib/safe-action';
import { revalidateTag } from 'next/cache';
import { LIST_PASTES_TAG } from '@/lib/queries/paste/list-pastes';

const createPasteInputSchema = zfd.formData(
  z.object({
    title: z.string(),
    body: z.string().nonempty(),
  })
);

export const createPasteAction = actionClient
  .inputSchema(createPasteInputSchema)
  .action(async ({ parsedInput }) => {
    await fetch('http://localhost:8080/pastes', {
      method: 'POST',
      body: JSON.stringify(parsedInput),
      headers: {
        'Content-type': 'application/json',
      },
    });

    revalidateTag(LIST_PASTES_TAG);
  });
