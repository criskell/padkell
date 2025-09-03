import { PageTitle } from '@/components/layout/paste-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SignInForm } from './components/sign-in-form';

export default async function SignInPage() {
  return (
    <main className="grow">
      <PageTitle>Página de autenticação</PageTitle>
      <Separator className="my-2" />

      <p className="text-sm mb-8">
        Insira seu e-mail e senha cadatrados para darmos prosseguimento.
      </p>

      <SignInForm />
    </main>
  );
}
