'use server';

import z from 'zod';
import { zfd } from 'zod-form-data';

import { actionClient } from '@/lib/safe-action';
import { returnValidationErrors } from 'next-safe-action';

const signUpInputSchema = zfd.formData(
  z.object({
    name: z.string().nonempty('Informe um nome'),
    email: z.email('Endereço de e-mail inválido').nonempty('Informe um e-mail'),
    password: z.string().min(8, 'Informe uma senha de 8 caracteres'),
  })
);

export const signUpAction = actionClient
  .inputSchema(signUpInputSchema)
  .action(async ({ parsedInput }) => {
    const response = await fetch('http://localhost:8080/auth/sign-up', {
      method: 'POST',
      body: JSON.stringify(parsedInput),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (response.status === 409) {
      returnValidationErrors(signUpInputSchema, {
        email: {
          _errors: ['E-mail já cadastrado'],
        },
      });
    }
  });
