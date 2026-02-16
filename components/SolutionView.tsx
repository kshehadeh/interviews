'use client';

import Link from 'next/link';
import type { Problem, Solution } from '@/lib/types';
import { CodeView } from './CodeView';
import { MinWindowViz } from './viz/MinWindowViz';
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
    return null;
  };

  return (
    <main className="solution-view">
      <Link className="back" href="/problems">
        ← Back to table of contents
      </Link>
      <h1>{problem.title}</h1>
      <p className="solution-name">{solution.name}</p>

      <div className="complexity">
        <span className="complexity-item">
          <span className="label">Time</span>
          {solution.time}
        </span>
        <span className="complexity-item">
          <span className="label">Space</span>
          {solution.space}
        </span>
        <span className={`verdict-badge ${solution.verdict}`}>
          {solution.verdict === 'good' ? 'Good solution' : 'Suboptimal'}
        </span>
      </div>

      <div className="explanation">{solution.verdictReason}</div>

      <div className="solution-code-and-viz">
        {code != null && code !== '' && (
          <div className="viz-container solution-code-panel">
            <h3>Code</h3>
            <CodeView code={code} />
          </div>
        )}
        <div className="viz-container solution-viz-panel">
          <h3>Animation</h3>
          {renderViz()}
        </div>
      </div>
    </main>
  );
}
