import Link from 'next/link';

const DOMAINS = [
  {
    href: '/concepts/frontend',
    title: 'Frontend & Web Platform',
    description: 'One-paragraph explanations of hydration, rendering, performance, security, and related concepts.',
  },
] as const;

export default function ConceptsHubPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/">
        ← Back to home
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">Concepts</h1>
      <p className="text-muted text-[0.95rem] mb-8">
        General documentation for programming concepts organized by domain.
      </p>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {DOMAINS.map(({ href, title, description }) => (
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
