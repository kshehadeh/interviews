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
    <main className="cheatsheet">
      <Link className="back" href="/problems">
        ← Back to table of contents
      </Link>
      <h1>Cheat sheets</h1>
      <p className="cheatsheet-intro">
        Pick a topic for a quick reference.
      </p>
      <ul className="cheatsheet-list">
        {CHEATSHEETS.map(({ href, title, description }) => (
          <li key={href}>
            <Link href={href} className="cheatsheet-card">
              <span className="cheatsheet-card-title">{title}</span>
              <span className="cheatsheet-card-desc">{description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
