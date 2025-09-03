import { getPasteByShortId } from '@/lib/queries/paste/get-paste-by-id';
import { NextResponse, type NextRequest } from 'next/server';

export const GET = async (
  _: NextRequest,
  { params }: RouteContext<'/download/[shortId]'>
) => {
  const { shortId } = await params;

  const paste = await getPasteByShortId(shortId);

  return new NextResponse(paste.shortId, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
      'Content-Disposition': `attachment; filename="${paste.shortId}.txt"`,
    },
  });
};
