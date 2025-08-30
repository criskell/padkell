import { PageTitle } from '@/components/layout/paste-title';

import { CreatePasteForm } from './components/create-paste-form';

export default function Home() {
  return (
    <main className="w-full max-w-5xl">
      <PageTitle className="mb-8">Adicionar novo paste</PageTitle>

      <div>
        <CreatePasteForm />
      </div>
    </main>
  );
}
