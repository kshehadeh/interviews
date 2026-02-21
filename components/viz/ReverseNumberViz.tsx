'use client';

import type { ReverseNumberExample } from '@/lib/types';

const DEFAULT_EXAMPLE: ReverseNumberExample = {
  cases: [
    { input: 123, expected: 321 },
    { input: -123, expected: -321 },
    { input: 0, expected: 0 },
    { input: 120, expected: 21 },
  ],
};

interface ReverseNumberVizProps {
  example?: ReverseNumberExample;
}

export function ReverseNumberViz({ example = DEFAULT_EXAMPLE }: ReverseNumberVizProps) {
  const { cases } = example;
  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-2 text-muted text-[0.8rem]">Examples</div>
      <div className="flex flex-col gap-2">
        {cases.map(({ input, expected }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 py-2 px-3 rounded-[var(--radius-sm)] border border-border bg-bg"
          >
            <span className="text-muted">reverse(</span>
            <span className="font-medium">{input}</span>
            <span className="text-muted">) =</span>
            <span className="font-medium text-good">{expected}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
