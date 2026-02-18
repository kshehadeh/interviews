'use client';

import Link from 'next/link';
import type { Problem, Solution } from '@/lib/types';
import { CodeView } from './CodeView';
import { DependenciesViz } from './viz/DependenciesViz';
import { DedupeViz } from './viz/DedupeViz';
import { MinWindowViz } from './viz/MinWindowViz';
import { RatelimitViz } from './viz/RatelimitViz';
import { TreeSearchViz } from './viz/TreeSearchViz';

interface SolutionViewProps {
  problem: Problem;
  solution: Solution;
  code?: string | null;
}

export function SolutionView({ problem, solution, code }: SolutionViewProps) {
  const renderViz = () => {
    if (solution.vizKey === 'min-window' && (solution.vizMode === 'optimal' || solution.vizMode === 'bruteforce')) {
      return (
        <MinWindowViz
          mode={solution.vizMode}
          example={problem.example}
        />
      );
    }
    if (solution.vizKey === 'tree-search' && (solution.vizMode === 'reduce' || solution.vizMode === 'accumulator' || solution.vizMode === 'collector')) {
      return (
        <TreeSearchViz
          mode={solution.vizMode}
          example={problem.treeExample}
        />
      );
    }
    if (solution.vizKey === 'dedupe' && problem.dedupeExample) {
      return <DedupeViz example={problem.dedupeExample} />;
    }
    if (solution.vizKey === 'dependencies' && problem.dependenciesExample) {
      return <DependenciesViz example={problem.dependenciesExample} />;
    }
    if (solution.vizKey === 'ratelimit' && problem.ratelimitExample) {
      return <RatelimitViz example={problem.ratelimitExample} />;
    }
    return null;
  };

  return (
    <main className="block">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/problems">
        ← Back to table of contents
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-1">{problem.title}</h1>
      <p className="text-muted text-base mb-6">{solution.name}</p>

      <div className="flex flex-wrap gap-3 mb-6">
        <span className="inline-flex items-center gap-1.5 py-1.5 px-2.5 bg-surface border border-border rounded-[var(--radius-sm)] font-mono text-[0.85rem]">
          <span className="text-muted">Time</span>
          {solution.time}
        </span>
        <span className="inline-flex items-center gap-1.5 py-1.5 px-2.5 bg-surface border border-border rounded-[var(--radius-sm)] font-mono text-[0.85rem]">
          <span className="text-muted">Space</span>
          {solution.space}
        </span>
        <span className={`inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-[var(--radius-sm)] text-[0.85rem] font-medium ${solution.verdict === 'good' ? 'bg-good/15 text-good' : 'bg-bad/15 text-bad'}`}>
          {solution.verdict === 'good' ? 'Good solution' : 'Suboptimal'}
        </span>
      </div>

      <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-6 text-[0.9rem] text-muted">
        {solution.verdictReason}
      </div>

      <div className="flex flex-col gap-6 mb-6 min-[900px]:flex-row min-[900px]:items-start">
        {code != null && code !== '' && (
          <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 mb-6 min-[900px]:flex-1 min-[900px]:min-w-0 min-[900px]:mb-0">
            <h3 className="text-[0.95rem] font-semibold mt-0 mb-4 text-muted">Code</h3>
            <CodeView code={code} />
          </div>
        )}
        <div className="bg-surface border border-border rounded-[var(--radius-card)] p-6 mb-6 min-[900px]:flex-1 min-[900px]:min-w-0 min-[900px]:mb-0">
          <h3 className="text-[0.95rem] font-semibold mt-0 mb-4 text-muted">Animation</h3>
          {renderViz()}
        </div>
      </div>
    </main>
  );
}
