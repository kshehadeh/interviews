import Link from 'next/link';

const EXERCISES = [
  {
    href: '/debugging/state-closure',
    title: 'State & closure',
    description: 'The "stale closure" interview example: why count freezes at 0, and how to fix it with dependencies, functional updates, or refs.',
  },
  {
    href: '/debugging/type-safe-data-fetcher',
    title: 'Type-safe data fetcher',
    description: 'Generic function to fetch a property from an object: fix the key–object type relationship with keyof and generic constraints.',
  },
  {
    href: '/debugging/discriminated-unions',
    title: 'Discriminated unions',
    description: 'Narrow API response types with a discriminant (e.g. status) so you only access properties that exist on each variant.',
  },
] as const;

export default function DebuggingHubPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/">
        ← Back to home
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">Debugging</h1>
      <p className="text-muted text-[0.95rem] mb-8">
        Exercises on React and JavaScript gotchas that often come up in interviews.
      </p>
      <ul className="list-none p-0 m-0 flex flex-col gap-3">
        {EXERCISES.map(({ href, title, description }) => (
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
