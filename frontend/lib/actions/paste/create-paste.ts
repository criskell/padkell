'use server';

import z from 'zod';

import { actionClient } from '@/lib/safe-action';
import { revalidateTag } from 'next/cache';
import { LIST_PASTES_TAG } from '@/lib/queries/paste/list-paste-summaries';
import { api } from '@/lib/api-client';

const createPasteInputSchema = z.object({
  title: z.string(),
  language: z.string().default('plaintext').nullish(),
  body: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});

export const createPasteAction = actionClient
  .inputSchema(createPasteInputSchema)
  .action(async ({ parsedInput }) => {
    await api.post('pastes', {
      json: parsedInput,
    });

    revalidateTag(LIST_PASTES_TAG);
  });
