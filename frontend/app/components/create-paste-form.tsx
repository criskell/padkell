'use client';

import { useAction } from 'next-safe-action/hooks';
import { setBackend } from '@tensorflow/tfjs-core';
import { GuessLangWorker } from '@ray-d-song/guesslang-js/worker';
import Editor, { type OnChange, type OnMount } from '@monaco-editor/react';
import '@tensorflow/tfjs-backend-webgl';

import { startTransition, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPasteAction } from '@/lib/actions/paste/create-paste';
import { Label } from '@/components/ui/label';
import { detectLanguages } from '@/lib/detect-languages';
import { asyncGeneratorToArray } from '@/lib/utils/async-generator-to-array';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { flushSync } from 'react-dom';

const languageAliasToLanguageId = new Map<string, string>();

export const CreatePasteForm = () => {
  const { execute, result } = useAction(createPasteAction);

  const [body, setBody] = useState(null);
  const [language, setLanguage] = useState<string | null>(null);
  const languageRef = useRef<string | null>(null);
  const guessLangRef = useRef<GuessLangWorker | null>(null);
  const [languageIds, setLanguageIds] = useState<string[]>([]);

  const handleContentChange: OnChange = async (value) => {
    if (language || languageRef.current || !value || !guessLangRef.current)
      return;

    const possibileLanguages = await asyncGeneratorToArray(
      detectLanguages(guessLangRef.current, value)
    );

    const languageId = possibileLanguages?.[0]?.languageId;

    if (!languageId) return;

    const resolvedLanguageId = languageAliasToLanguageId.get(
      languageId.toLowerCase()
    );

    if (!resolvedLanguageId) return;

    setLanguage(resolvedLanguageId);
  };

  const handleEditorMount: OnMount = async (_, monaco) => {
    const languages = monaco.languages.getLanguages();
    const collectedLanguageIds: string[] = [];

    languages.forEach((language) => {
      collectedLanguageIds.push(language.id);

      language.aliases?.forEach((alias) =>
        languageAliasToLanguageId.set(
          alias.toLowerCase(),
          language.id.toLowerCase()
        )
      );
    });

    setLanguageIds(collectedLanguageIds);
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
            language={language || undefined}
            onChange={handleContentChange}
            onMount={handleEditorMount}
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

      <div>
        <Label>
          Linguagem{' '}
          <Select
            value={language || undefined}
            key={language}
            onValueChange={setLanguage}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Linguagem" />
            </SelectTrigger>
            <SelectContent>
              {languageIds.map((language) => (
                <SelectItem value={language} key={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
