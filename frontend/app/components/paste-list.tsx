import { listPastes } from '@/lib/queries/paste/list-pastes';
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
              formattedRelativeCreatedAt: '5 sec ago',
              formattedSize: '0.06KB',
            }}
          />
        ))}
      </ul>
    </aside>
  );
};
