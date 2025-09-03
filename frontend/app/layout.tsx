import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import { Navbar } from '@/components/layout/navbar';

import { PasteList } from './components/paste-list';
import './globals.css';
import z from 'zod';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'padkell',
  description: 'Compartilhe anotações com seus amigos!',
};

z.config(z.locales.pt());

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans bg-zinc-50 flex flex-col min-h-screen`}
      >
        <Navbar />

        <div className="container mx-auto py-8 px-8 bg-white grow">
          <div className="flex gap-8 flex-wrap justify-between">
            {children}
            <PasteList />
          </div>
        </div>
      </body>
    </html>
  );
}
