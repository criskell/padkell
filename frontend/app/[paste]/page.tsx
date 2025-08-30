'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  CalendarIcon,
  CircleUserRoundIcon,
  EyeIcon,
  MailIcon,
} from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function PastePage() {
  return (
    <main className="grow flex flex-col gap-2 max-w-full">
      <div className="flex gap-2 flex-wrap text-zinc-950">
        <div className="bg-zinc-800 rounded-lg" />

        <div className="flex flex-col gap-1">
          <p>Instant Profit Method</p>

          <div className="flex gap-3 items-center text-zinc-600 text-xs">
            <span className="inline-flex gap-1">
              <CircleUserRoundIcon size={14} />
              <span>ASHURA</span>
              <MailIcon size={18} />
            </span>

            <span className="inline-flex gap-1">
              <CalendarIcon size={14} />
              <span>AUG 30TH, 2025</span>
            </span>

            <span className="inline-flex gap-1">
              <EyeIcon size={14} />
              <span>10</span>
            </span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center text-zinc-700 bg-zinc-100 px-6 py-4 gap-2 rounded-t-lg">
          <Badge variant="outline">JavaScript</Badge>
          <span className="text-xs">0.32KB</span>
        </div>
        <div className="border border-zinc-100 rounded-lg rounded-t-none p-1">
          <Editor
            height="50vh"
            defaultLanguage="text"
            defaultValue="oiqweoowiqenjiowqnen"
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
    </main>
  );
}
