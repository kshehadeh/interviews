import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="max-w-[640px]">
      <h1 className="text-[1.75rem] font-semibold mt-0 mb-1 tracking-tight">Interview Prep</h1>
      <p className="text-muted text-base mb-10">
        Visualizations and reference for algorithm problems.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Link href="/problems" className="flex flex-col p-6 bg-surface border border-border rounded-[var(--radius-card)] text-text no-underline transition-[border-color,background,transform] hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5">
          <span className="text-xl font-semibold mb-2">Problems</span>
          <span className="text-[0.9rem] text-muted leading-[1.45]">
            Browse problems and solutions with animated visualizations, complexity, and explanations.
          </span>
        </Link>
        <Link href="/cheatsheet" className="flex flex-col p-6 bg-surface border border-border rounded-[var(--radius-card)] text-text no-underline transition-[border-color,background,transform] hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5">
          <span className="text-xl font-semibold mb-2">Cheatsheets</span>
          <span className="text-[0.9rem] text-muted leading-[1.45]">
            Big O notation, interview patterns, and quick reference guides.
          </span>
        </Link>
        <Link href="/debugging" className="flex flex-col p-6 bg-surface border border-border rounded-[var(--radius-card)] text-text no-underline transition-[border-color,background,transform] hover:border-accent hover:bg-accent/10 hover:-translate-y-0.5">
          <span className="text-xl font-semibold mb-2">Debugging</span>
          <span className="text-[0.9rem] text-muted leading-[1.45]">
            Stale closures, React gotchas, and how to fix them in interviews.
          </span>
        </Link>
      </div>
    </main>
  );
}
