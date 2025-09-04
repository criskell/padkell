import { api } from '@/lib/api-client';
import type { CategoryDTO } from '@/lib/dto/category';

export const listCategories = async () => {
  const response = await api.get('categories');

  if (!response.ok) {
    throw new Error('Failed to list categories.');
  }

  const data: CategoryDTO[] = await response.json();

  return data;
};
