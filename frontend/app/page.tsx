import { CreatePasteForm } from './components/create-paste-form';
import { PasteList } from './components/paste-list';

export default function Home() {
  return (
    <div className="container mx-auto py-8 px-8 bg-white grow flex gap-8 flex-wrap">
      <main className="w-full max-w-5xl">
        <h2 className="text-lg mb-8">Adicionar novo paste</h2>

        <div>
          <CreatePasteForm />
        </div>
      </main>

      <PasteList />
    </div>
  );
}
