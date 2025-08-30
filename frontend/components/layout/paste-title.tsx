import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export const PageTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => <h2 className={cn('text-lg', className)}>{children}</h2>;
