import Link from 'next/link';

const CHEATSHEETS = [
  {
    href: '/cheatsheet/big-o',
    title: 'Big O notation',
    description: 'What Big O is, time vs space, how n and h are used, with examples from the problems.',
  },
  {
    href: '/cheatsheet/interview',
    title: 'Interview tips',
    description: 'Patterns, string problems, tokenization, TypeScript tips, pacing, and end questions.',
  },
] as const;

export default function CheatsheetHubPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/problems">
        ← Back to table of contents
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">Cheat sheets</h1>
      <p className="text-muted text-[0.95rem] mb-8">
        Pick a topic for a quick reference.
      </p>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {CHEATSHEETS.map(({ href, title, description }) => (
          <li key={href}>
            <Link
              href={href}
              className="block py-4 px-5 bg-surface border border-border rounded-[var(--radius-card)] text-text transition-[border-color,background] hover:border-accent hover:bg-accent/10 hover:no-underline"
            >
              <span className="block font-semibold text-base mb-1">{title}</span>
              <span className="block text-[0.9rem] text-muted">{description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
