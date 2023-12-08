import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';

export const metadata: Metadata = {
  title: 'Dev Shop - Ecommerce',
  description: 'An ecommerce site build with NextJS and Typescript.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
