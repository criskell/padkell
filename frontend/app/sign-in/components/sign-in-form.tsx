'use client';

import type { FormEvent } from 'react';
import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInAction } from '@/lib/actions/auth/sign-in';
import Link from 'next/link';
import { env } from '@/lib/env';

export const SignInForm = () => {
  const { execute, result } = useAction(signInAction);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    execute(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-8 max-w-4xl">
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

      <div className="flex gap-2">
        <Button
          type="submit"
          className="ml-auto cursor-pointer"
          variant="ghost"
          asChild
        >
          <Link href={`${env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`}>
            Fazer login com Google
          </Link>
        </Button>

        <Button type="submit" className="cursor-pointer">
          Autenticar
        </Button>
      </div>
    </form>
  );
};
