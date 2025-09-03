import { dayjs } from '@/lib/dayjs';
import { formatBytes } from '@/lib/utils/format-bytes';
import { GlobeIcon } from 'lucide-react';
import Link from 'next/link';

export type PasteListItemProps = {
  paste: {
    shortId: string;
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
        <Link className="text-blue-900" href={`/${paste.shortId}`}>
          {paste.title}
        </Link>
        <p className="text-zinc-500">
          {paste.language || 'plaintext'} | {formattedRelativeCreatedDate} |{' '}
          {formattedSize}
        </p>
      </div>
    </li>
  );
};
