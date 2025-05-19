import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import '../styles/globals.css';

const geistSans = Noto_Sans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Open Audio Stack',
  description: 'Website for Open Audio Stack with tools to create Plugin, Preset and Project packages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>{children}</body>
    </html>
  );
}
