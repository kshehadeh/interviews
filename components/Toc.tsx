import Link from 'next/link';
import type { Problem } from '@/lib/types';

interface TocProps {
  problems: Problem[];
}

export function Toc({ problems }: TocProps) {
  return (
    <nav className="mb-12">
      <h1 className="text-[1.75rem] font-semibold mt-0 mb-2 tracking-tight">Problems & Solutions</h1>
      <p className="text-muted mb-4">
        Click a solution to see an animated visualization, complexity, and explanation.
      </p>
      <div className="flex flex-row flex-wrap gap-4">
        {problems.map((problem) => (
          <div key={problem.id} className="flex-[1_1_min(100%,320px)] bg-surface border border-border rounded-[var(--radius-card)] py-5 px-6">
            <h2 className="text-[1.15rem] font-semibold mt-0 mb-2">{problem.title}</h2>
            <p className="text-muted text-[0.9rem] mb-4">{problem.description}</p>
            <div className="flex flex-wrap gap-2">
              {problem.solutions.map((sol) => (
                <Link
                  key={sol.id}
                  className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-bg border border-border rounded-[var(--radius-sm)] text-[0.85rem] transition-[border-color,background] hover:border-accent hover:bg-accent/10 hover:no-underline"
                  href={`/problems/${problem.id}/${sol.id}`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${sol.verdict === 'good' ? 'bg-good' : 'bg-bad'}`} />
                  {sol.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
