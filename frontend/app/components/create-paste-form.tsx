'use client';

import { useAction } from 'next-safe-action/hooks';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { createPasteAction } from '@/lib/actions/paste/create-paste';
import { Label } from '@/components/ui/label';

export const CreatePasteForm = () => {
  const { execute, result } = useAction(createPasteAction);

  return (
    <form action={execute} className="space-y-8">
      <div>
        <Textarea className="min-h-[200px]" name="body" />
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
