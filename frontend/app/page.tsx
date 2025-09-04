import { PageTitle } from '@/components/layout/paste-title';

import { CreatePasteForm } from './components/create-paste-form';
import { listCategories } from '@/lib/queries/category/list-categories';

export default function Home() {
  const categoriesPromise = listCategories();

  return (
    <main className="w-full max-w-5xl">
      <PageTitle className="mb-8">Adicionar novo paste</PageTitle>

      <div>
        <CreatePasteForm categoriesPromise={categoriesPromise} />
      </div>
    </main>
  );
}
