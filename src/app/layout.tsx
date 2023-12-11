import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/providers/ThemeProvider';
import LayoutProvider from '@/providers/LayoutProvider';

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
      <head>
        {/* REMIX ICON */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.7.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <LayoutProvider>{children}</LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
