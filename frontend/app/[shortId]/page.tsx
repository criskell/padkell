import { getPasteByShortId } from '@/lib/queries/paste/get-paste-by-id';
import { Paste } from './paste';

type PastePage = {
  params: {
    shortId: string;
  };
};

export default async function PastePage({ params }: PastePage) {
  const { shortId } = await params;

  const paste = await getPasteByShortId(shortId);

  return <Paste paste={paste} />;
}
