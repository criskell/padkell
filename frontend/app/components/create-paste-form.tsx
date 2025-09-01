'use client';

import {
  ModelOperations,
  type ModelOperationsOptions,
} from '@/lib/language-detection';
import { useAction } from 'next-safe-action/hooks';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createPasteAction } from '@/lib/actions/paste/create-paste';
import { Label } from '@/components/ui/label';
import Editor, { type OnChange } from '@monaco-editor/react';
import { detectLanguages } from '@/lib/detect-languages';

export const CreatePasteForm = () => {
  const { execute, result } = useAction(createPasteAction);
  const [body, setBody] = useState(null);
  const [language, setLanguage] = useState(null);
  const [modelOperations, setModelOperations] = useState<ModelOperations>(
    () =>
      new ModelOperations({
        modelJsonLoaderFunc: async () =>
          fetch('/model/model.json').then((response) => response.json()),
        weightsLoaderFunc: async () =>
          fetch('/model/group1-shard1of1.bin').then((response) =>
            response.arrayBuffer()
          ),
      })
  );

  const handleContentChange: OnChange = async (value) => {
    if (language || !modelOperations || value === '') return;
    const selectedLanguage = await detectLanguages(modelOperations, value);
    console.log(selectedLanguage);
  };

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
