import { GlobeIcon } from 'lucide-react';

export type PasteListItemProps = {
  paste: {
    title: string;
    syntaxHighlight: string;
    formattedRelativeCreatedAt: string;
    formattedSize: string;
  };
};

export const PasteListItem = ({ paste }: PasteListItemProps) => {
  return (
    <li className="flex gap-1 text-sm pb-2">
      <GlobeIcon size={16} />

      <div>
        <p className="text-blue-900">{paste.title}</p>
        <p className="text-zinc-500">Java | 5 sec ago | 0.06 KB</p>
      </div>
    </li>
  );
};
