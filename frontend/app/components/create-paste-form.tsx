'use client';

import { useAction } from 'next-safe-action/hooks';
import { setBackend } from '@tensorflow/tfjs-core';
import { GuessLangWorker } from '@ray-d-song/guesslang-js/worker';
import Editor, { type OnChange } from '@monaco-editor/react';
import '@tensorflow/tfjs-backend-webgl';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPasteAction } from '@/lib/actions/paste/create-paste';
import { Label } from '@/components/ui/label';
import { detectLanguages } from '@/lib/detect-languages';
import { asyncGeneratorToArray } from '@/lib/utils/async-generator-to-array';

export const CreatePasteForm = () => {
  const { execute, result } = useAction(createPasteAction);

  const [body, setBody] = useState(null);
  const [language, setLanguage] = useState(null);
  const guessLangRef = useRef<GuessLangWorker | null>(null);

  const handleContentChange: OnChange = async (value) => {
    if (language || !value || !guessLangRef.current) return;

    const possibileLanguages = await asyncGeneratorToArray(
      detectLanguages(guessLangRef.current, value)
    );

    console.log(possibileLanguages);
  };

  useEffect(() => {
    const initializeLanguageDetector = async () => {
      guessLangRef.current = new GuessLangWorker();

      if (!(await setBackend('webgl'))) {
        console.warn('Tensorflow WebGL backend not enabled.');
      }
    };

    initializeLanguageDetector();
  }, []);

  return (
    <form action={execute} className="space-y-8">
      <div>
        <div className="border border-zinc-100 rounded-lg p-2">
          <Editor
            height="50vh"
            options={{
              minimap: {
                enabled: false,
              },
              wordWrap: 'on',
            }}
            onChange={handleContentChange}
          />
        </div>

        <p className="text-destructive text-sm">
          {result.validationErrors?.fieldErrors.body}
        </p>
      </div>

      <div>
        <Label>
          Título <Input name="title" />
        </Label>

        <p className="text-destructive text-sm w-full">
          {result.validationErrors?.fieldErrors.title}
        </p>
      </div>

      <Button type="submit" className="ml-auto">
        Salvar
      </Button>
    </form>
  );
};
