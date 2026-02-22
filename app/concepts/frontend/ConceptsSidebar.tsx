'use client';

import Link from 'next/link';

export type TocEntry = { id: string; title: string };

type ConceptsSidebarProps = {
  entries: TocEntry[];
  basePath: string;
};

export function ConceptsSidebar({ entries, basePath }: ConceptsSidebarProps) {
  return (
    <aside
      className="w-56 shrink-0 hidden lg:block"
      aria-label="Table of contents"
    >
      <nav className="sticky top-8 max-h-[calc(100vh-6rem)] overflow-y-auto py-2 pr-4 border-r border-border">
        <p className="text-[0.75rem] font-semibold uppercase tracking-wider text-muted mb-3">
          On this page
        </p>
        <ul className="list-none p-0 m-0 space-y-1">
          {entries.map(({ id, title }) => (
            <li key={id}>
              <Link
                href={`${basePath}#${id}`}
                className="block text-[0.875rem] text-muted hover:text-accent py-0.5 hover:no-underline border-l-2 border-transparent hover:border-accent pl-3 -ml-px"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
