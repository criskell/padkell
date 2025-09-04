'use client';

import { Badge } from '@/components/ui/badge';
import {
  CalendarIcon,
  CircleUserRoundIcon,
  EyeIcon,
  InfoIcon,
  MailIcon,
  MessageSquareTextIcon,
  StarIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  TimerIcon,
} from 'lucide-react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';

import { dayjs } from '@/lib/dayjs';
import type { PasteDTO } from '@/lib/dto/pastes/get';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatBytes } from '@/lib/utils/format-bytes';

export type PasteProps = {
  paste: PasteDTO;
};

export function Paste({ paste }: PasteProps) {
  const formattedCreatedAtDate = dayjs(paste.createdAt).format(
    'DD [de] MMMM [de] YYYY, HH:mm'
  );
  const formattedSize = formatBytes(paste.size);

  return (
    <main className="grow flex flex-col gap-2 max-w-full">
      <div className="flex gap-2 flex-wrap text-zinc-950">
        <div className="bg-zinc-100 rounded-lg size-10" />

        <div className="flex flex-col gap-1">
          <p>{paste.title}</p>

          <div className="flex gap-3 items-center text-zinc-600 text-xs">
            <span className="inline-flex gap-1 items-center">
              <CircleUserRoundIcon size={14} />
              <span>{paste.author?.name || 'Anônimo'}</span>
              <MailIcon size={18} />
            </span>

            <span className="inline-flex gap-1 items-center">
              <CalendarIcon size={14} />
              <span>{formattedCreatedAtDate}</span>
            </span>

            <span className="inline-flex gap-1 items-center">
              <EyeIcon size={14} />
              <span>{paste.views}</span>
            </span>

            <span className="inline-flex gap-1 items-center">
              <StarIcon size={14} />
              <span>0</span>
            </span>

            <span className="inline-flex gap-1 items-center">
              <TimerIcon size={14} />
              <span>60 MIN</span>
            </span>

            <span className="inline-flex gap-1 items-center">
              <MessageSquareTextIcon size={14} />
              <span>add comment</span>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center text-zinc-700 bg-zinc-100 px-6 py-4 gap-2 rounded-t-lg text-xs">
          <Badge variant="outline">{paste.language || 'plaintext'}</Badge>
          <span>{formattedSize}</span>
          <span>|</span>
          <span>{paste.category?.name || 'Sem categoria'}</span>
          <span>|</span>

          <Badge variant="outline">
            <ThumbsUpIcon size={20} />
          </Badge>

          <Badge variant="outline">
            <ThumbsDownIcon size={20} />
          </Badge>

          <Link href={`/raw/${paste.shortId}`}>
            <Badge variant="outline" className="ml-auto">
              raw
            </Badge>
          </Link>
          <Link href={`/download/${paste.shortId}`}>
            <Badge variant="outline">download</Badge>
          </Link>
          <Badge variant="outline">clone</Badge>
          <Badge variant="outline">embed</Badge>
          <Badge variant="outline">print</Badge>
          <Badge variant="outline">report</Badge>
        </div>

        <div className="border border-zinc-100 rounded-lg rounded-t-none p-1">
          <Editor
            height="50vh"
            defaultLanguage={paste.language}
            defaultValue={paste.body}
            options={{
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
              readOnly: true,
            }}
          />
        </div>
      </div>

      <div className="space-y-2 mt-2">
        <h2 className="text-md">Add comment</h2>

        <Alert>
          <InfoIcon />
          <AlertDescription className="inline-flex">
            Please,{' '}
            <Link href="/auth/sign-in" className="text-blue-900">
              Sign In
            </Link>
            to add comment
          </AlertDescription>
        </Alert>
      </div>
    </main>
  );
}
