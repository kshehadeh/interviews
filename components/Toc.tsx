import Link from 'next/link';
import type { Problem } from '@/lib/types';

interface TocProps {
  problems: Problem[];
}

export function Toc({ problems }: TocProps) {
  return (
    <nav className="toc">
      <h1>Problems & Solutions</h1>
      <p className="subtitle">
        Click a solution to see an animated visualization, complexity, and explanation.
      </p>
      <div>
        {problems.map((problem) => (
          <div key={problem.id} className="problem-card">
            <h2>{problem.title}</h2>
            <p className="problem-desc">{problem.description}</p>
            <div className="solutions-list">
              {problem.solutions.map((sol) => (
                <Link
                  key={sol.id}
                  className="solution-link"
                  href={`/problems/${problem.id}/${sol.id}`}
                >
                  <span className={`verdict-dot ${sol.verdict}`} />
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
