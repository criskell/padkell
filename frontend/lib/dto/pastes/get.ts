import type { UserDTO } from '../user';

export type PasteDTO = {
  id: string;
  shortId: string;
  title: string;
  body: string;
  size: number;
  language: string;
  views: number;
  createdAt: string;
  author?: UserDTO | null;
};
