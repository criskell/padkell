import { dayjs } from '@/lib/dayjs';
import { formatBytes } from '@/lib/utils/format-bytes';
import { GlobeIcon } from 'lucide-react';

export type PasteListItemProps = {
  paste: {
    title: string;
    language: string;
    createdAt: string;
    size: number;
  };
};

export const PasteListItem = ({ paste }: PasteListItemProps) => {
  const formattedSize = formatBytes(paste.size);
  const formattedRelativeCreatedDate = dayjs().to(dayjs(paste.createdAt));

  return (
    <li className="flex gap-1 text-sm pb-2">
      <GlobeIcon size={16} />

      <div>
        <p className="text-blue-900">{paste.title}</p>
        <p className="text-zinc-500">
          Java | {formattedRelativeCreatedDate} | {formattedSize}
        </p>
      </div>
    </li>
  );
};
