'use client';

import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpAction } from '@/lib/actions/auth/sign-up';
import type { FormEvent } from 'react';

export const SignUpForm = () => {
  const { execute, result } = useAction(signUpAction);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    execute(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 max-w-4xl">
      <div>
        <Label>
          Nome <Input name="name" />
        </Label>

        <p className="text-destructive text-sm w-full">
          {result.validationErrors?.fieldErrors.name?.[0]}
        </p>
      </div>

      <div>
        <Label className="whitespace-nowrap">
          E-mail <Input name="email" />
        </Label>

        <p className="text-destructive text-sm w-full">
          {result.validationErrors?.fieldErrors.email?.[0]}
        </p>
      </div>

      <div>
        <Label>
          Senha <Input name="password" type="password" />
        </Label>

        <p className="text-destructive text-sm w-full">
          {result.validationErrors?.fieldErrors.password?.[0]}
        </p>
      </div>

      <Button type="submit" className="ml-auto cursor-pointer">
        Criar minha conta
      </Button>

      <p className="text-xs text-gray-500 ml-auto max-w-xl text-right">
        Ao clicar em "Criar minha conta", você concorda com nossos termos de
        serviço, configurações de notificação padrão e declaração de
        privacidade.
      </p>
    </form>
  );
};
