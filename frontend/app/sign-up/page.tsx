import { PageTitle } from '@/components/layout/paste-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { SignUpForm } from './components/sign-up-form';

export default async function SignUpPage() {
  return (
    <main className="grow">
      <PageTitle>Página de cadastro</PageTitle>
      <Separator className="my-2" />

      <p className="text-sm mb-8">
        Junte-se à comunidade Padkell onde compartilhamos os melhores trechos de
        códigos grátis para você!
      </p>

      <SignUpForm />
    </main>
  );
}
