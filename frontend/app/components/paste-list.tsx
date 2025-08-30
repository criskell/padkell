import { listPastes } from '@/lib/queries/paste/list-paste-summaries';
import { PasteListItem } from './paste-list-item';

export const PasteList = async () => {
  const pastes = await listPastes();

  return (
    <aside className="space-y-2 divide-y divide-zinc-100">
      <h2 className="text-sm pb-2">Pastes públicos</h2>

      <ul>
        {pastes.map((paste) => (
          <PasteListItem
            key={paste.id}
            paste={{
              ...paste,
              syntaxHighlight: 'Java',
              createdAt: paste.createdAt,
              size: paste.size,
            }}
          />
        ))}
      </ul>
    </aside>
  );
};
