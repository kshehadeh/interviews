import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'Problems & Solutions — Visualizations',
  description: 'Animated visualizations for algorithm problems and solutions.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="w-full mx-auto p-8">
          <nav className="flex items-center gap-6 mb-8 pb-4 border-b border-border">
            <Link href="/problems" className="font-medium text-[0.95rem] hover:no-underline hover:text-accent-dim">Problems</Link>
            <Link href="/cheatsheet" className="font-medium text-[0.95rem] hover:no-underline hover:text-accent-dim">Cheatsheets</Link>
          </nav>
          {children}
        </div>
      </body>
    </html>
  );
}
