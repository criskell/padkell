import { getPasteByShortId } from '@/lib/queries/paste/get-paste-by-id';
import type { NextRequest } from 'next/server';

type GetRawPasteProps = {
  params: {
    shortId: string;
  };
};

export const GET = async (
  _: NextRequest,
  { params }: RouteContext<'/raw/[shortId]'>
) => {
  const { shortId } = await params;

  const paste = await getPasteByShortId(shortId);

  return new Response(paste.body, {
    status: 200,
  });
};
