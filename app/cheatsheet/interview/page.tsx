import Link from 'next/link';

export default function InterviewCheatsheetPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/cheatsheet">
        ← Back to cheat sheets
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">Interview Cheat Sheet</h1>
      <p className="text-muted text-[0.95rem] mb-8">
        Quick reference for product-focused frontend interviews (e.g. 45-minute live coding).
        Focus on clarity, correctness, and calm reasoning over cleverness.
      </p>

      {/* 1) Core patterns */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">1) Core patterns (most questions)</h2>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-1.5">Tree / nested data</h3>
          <p className="text-muted text-[0.9rem] mb-2">Components, folders, JSON. Classic DFS.</p>
          <pre className="my-2 py-3 px-4 bg-bg rounded-[var(--radius-sm)] overflow-x-auto font-mono text-[0.8rem] leading-[1.45]"><code className="whitespace-pre">{`function dfs(node) {
  visit(node)
  for (const child of node.children ?? []) {
    dfs(child)
  }
}`}</code></pre>
          <p className="text-[0.85rem] text-muted mt-2 mb-0"><strong>Time:</strong> O(n) — visit each node once. <strong>Space:</strong> O(h) stack + O(k) output.</p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-1.5">Sliding window</h3>
          <p className="text-muted text-[0.9rem] mb-2">Strings, tokens, event streams.</p>
          <pre className="my-2 py-3 px-4 bg-bg rounded-[var(--radius-sm)] overflow-x-auto font-mono text-[0.8rem] leading-[1.45]"><code className="whitespace-pre">{`while (right < n) {
  add(right)
  while (valid()) {
    updateAnswer()
    remove(left)
    left++
  }
  right++
}`}</code></pre>
          <p className="text-[0.85rem] text-muted mt-2 mb-0"><strong>Time:</strong> O(n). <strong>Space:</strong> O(k) (distinct required items).</p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-1.5">Hash maps / frequency counts</h3>
          <pre className="my-2 py-3 px-4 bg-bg rounded-[var(--radius-sm)] overflow-x-auto font-mono text-[0.8rem] leading-[1.45]"><code className="whitespace-pre">{`map[key] = (map[key] ?? 0) + 1`}</code></pre>
          <p className="text-[0.85rem] text-muted mt-2 mb-0"><strong>Time:</strong> O(n). <strong>Space:</strong> O(u) (unique keys).</p>
        </div>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-1.5">Intervals / ranges</h3>
          <p className="text-muted text-[0.9rem] mb-2">Sort by start, then sweep and merge.</p>
          <p className="text-[0.85rem] text-muted mt-2 mb-0"><strong>Time:</strong> O(n log n). <strong>Space:</strong> O(n).</p>
        </div>
      </section>

      {/* 2) String problems */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">2) String problems — key distinctions</h2>
        <ul className="my-0 mb-2 pl-5">
          <li className="mb-1.5"><strong>Literal substring</strong> → indexOf / simple scan</li>
          <li className="mb-1.5"><strong>Any permutation</strong> → sliding window + counts</li>
          <li className="mb-1.5"><strong>Min window containing</strong> → expand right, shrink left</li>
          <li className="mb-1.5"><strong>Words instead of chars</strong> → tokenize, same window logic</li>
        </ul>
      </section>

      {/* 3) Tokenization */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">3) Tokenization + normalization (product FE)</h2>
        <ul className="my-0 mb-2 pl-5">
          <li className="mb-1.5">Tokenize original text first</li>
          <li className="mb-1.5">Store raw, normalized, start, end per token</li>
          <li className="mb-1.5">Match on normalized, slice original using indices</li>
        </ul>
        <p className="text-[0.85rem] text-muted mt-2 mb-0"><strong>Normalization cost:</strong> O(T) total characters.</p>
      </section>

      {/* 4) TypeScript tips */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">4) TypeScript live-coding tips</h2>
        <ul className="my-0 mb-2 pl-5">
          <li className="mb-1.5">Prefer <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">for…of</code> over <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">reduce</code> under pressure</li>
          <li className="mb-1.5">Use <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">{'Record<string, number>'}</code> for counts</li>
          <li className="mb-1.5">Guard optional fields: <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">children ?? []</code></li>
          <li className="mb-1.5">Early returns for edge cases</li>
          <li className="mb-1.5">Readable {'>'} clever</li>
        </ul>
      </section>

      {/* 5) Pacing */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">5) Interview pacing (45 minutes)</h2>
        <ul className="list-none pl-0">
          <li className="mb-2"><strong>0–5 min:</strong> clarify + examples</li>
          <li className="mb-2"><strong>5–10 min:</strong> approach + complexity</li>
          <li className="mb-2"><strong>10–30 min:</strong> code correct solution</li>
          <li className="mb-2"><strong>30–40 min:</strong> edge cases + cleanup</li>
          <li className="mb-2"><strong>40–45 min:</strong> tradeoffs / alternatives</li>
        </ul>
        <p className="mt-3 py-2 px-3 bg-good/10 border border-good/25 rounded-[var(--radius-sm)] text-[0.9rem] text-good">Say early: “I’ll start with a straightforward solution and optimize if needed.”</p>
      </section>

      {/* 6) End questions */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">6) End-of-interview questions</h2>
        <ul className="my-0 mb-2 pl-5">
          <li className="mb-1.5">What kinds of problems does this role solve most often?</li>
          <li className="mb-1.5">How do frontend and platform teams collaborate?</li>
          <li className="mb-1.5">What does success look like in the first 90 days?</li>
        </ul>
      </section>
    </main>
  );
}
