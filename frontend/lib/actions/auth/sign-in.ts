'use server';

import z from 'zod';
import { zfd } from 'zod-form-data';

import { actionClient } from '@/lib/safe-action';
import { returnValidationErrors } from 'next-safe-action';

const signInInputSchema = zfd.formData(
  z.object({
    email: z.string().nonempty(),
    password: z.string().nonempty(),
  })
);

export const signInAction = actionClient
  .inputSchema(signInInputSchema)
  .action(async ({ parsedInput }) => {
    const response = await fetch('http://localhost:8080/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(parsedInput),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status === 401) {
      returnValidationErrors(signInInputSchema, {
        email: {
          _errors: ['Credenciais inválidas, verifique seu e-mail e senha.'],
        },
      });
    }

    const body = await response.json();

    console.log(body);
  });
