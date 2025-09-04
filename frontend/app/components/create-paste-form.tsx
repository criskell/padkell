'use client';

import { useAction } from 'next-safe-action/hooks';
import { setBackend } from '@tensorflow/tfjs-core';
import { GuessLangWorker } from '@ray-d-song/guesslang-js/worker';
import Editor, { type OnChange, type OnMount } from '@monaco-editor/react';
import '@tensorflow/tfjs-backend-webgl';
import { editor } from 'monaco-editor';

import { use, useEffect, useRef, useState } from 'react';
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
import { CategoryDTO } from '@/lib/dto/category';

export type CreatePasteFormProps = {
  categoriesPromise: Promise<CategoryDTO[]>;
};

export const CreatePasteForm = ({
  categoriesPromise
}: CreatePasteFormProps) => {
  const categories = use(categoriesPromise);

  const { execute, result } = useAction(createPasteAction);

  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  const [language, setLanguage] = useState<string | null>(null);
  const [languageIds, setLanguageIds] = useState<string[]>([]);
  const languageAliasToLanguageIdRef = useRef<Map<string, string>>(new Map());
  const guessLangRef = useRef<GuessLangWorker | null>(null);

  const handleContentChange: OnChange = async (value) => {
    if (language || !value || !guessLangRef.current) return;

    const possibileLanguages = await asyncGeneratorToArray(
      detectLanguages(guessLangRef.current, value)
    );

    const detectedId = possibileLanguages?.[0]?.languageId;
    if (!detectedId) return;

    const resolvedId = languageAliasToLanguageIdRef.current.get(
      detectedId.toLowerCase()
    );

    if (resolvedId) setLanguage(resolvedId);
  };

  const handleEditorMount: OnMount = async (editor, monaco) => {
    const collected: string[] = [];

    const map = new Map<string, string>();

    for (const language of monaco.languages.getLanguages()) {
      collected.push(language.id);
      map.set(language.id.toLowerCase(), language.id.toLowerCase());
      language.aliases?.forEach((alias) =>
        map.set(alias.toLowerCase(), language.id.toLowerCase())
      );
    }

    setLanguageIds(collected);
    languageAliasToLanguageIdRef.current = map;
    editorRef.current = editor;
  };

  const submitPaste = (formData: FormData) => {
    if (!editorRef.current) return;

    return execute({
      title: formData.get('title') as string,
      categoryId: formData.get('categoryId') as string,
      body: editorRef.current.getValue(),
      language,
    });
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
    <form action={submitPaste} className="space-y-8">
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

      <div>
        <Label>
          Categoria{' '}
          <Select name="categoryId">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem value={category.id.toString()} key={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Label>
        
        <p className="text-destructive text-sm w-full">
          {result.validationErrors?.fieldErrors.categoryId}
        </p>
      </div>

      <Button type="submit" className="ml-auto">
        Salvar
      </Button>
    </form>
  );
};
