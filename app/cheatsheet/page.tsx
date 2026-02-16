import Link from 'next/link';

export default function CheatsheetPage() {
  return (
    <main className="cheatsheet">
      <Link className="back" href="/">
        ← Back to table of contents
      </Link>
      <h1>Interview Cheat Sheet</h1>
      <p className="cheatsheet-intro">
        Quick reference for product-focused frontend interviews (e.g. 45-minute live coding).
        Focus on clarity, correctness, and calm reasoning over cleverness.
      </p>

      {/* 1) Big O / Complexity symbols */}
      <section className="cheatsheet-section">
        <h2>1) Complexity symbols (Big O)</h2>
        <p className="section-desc">
          Common variables used in time/space analysis:
        </p>
        <ul className="symbol-list">
          <li><strong>n</strong> — total elements (nodes, characters)</li>
          <li><strong>h</strong> — depth / height (trees)</li>
          <li><strong>k</strong> — distinct required items (e.g. window size)</li>
          <li><strong>u</strong> — unique keys (users, IDs in a map)</li>
          <li><strong>T</strong> — total characters (in tokenization)</li>
          <li><strong>W</strong> — number of tokens</li>
        </ul>
      </section>

      {/* 2) Core patterns */}
      <section className="cheatsheet-section">
        <h2>2) Core patterns (most questions)</h2>

        <div className="pattern-block">
          <h3>Tree / nested data</h3>
          <p className="pattern-desc">Components, folders, JSON. Classic DFS.</p>
          <pre className="cheatsheet-code"><code>{`function dfs(node) {
  visit(node)
  for (const child of node.children ?? []) {
    dfs(child)
  }
}`}</code></pre>
          <p className="complexity"><strong>Time:</strong> O(n) — visit each node once. <strong>Space:</strong> O(h) stack + O(k) output.</p>
        </div>

        <div className="pattern-block">
          <h3>Sliding window</h3>
          <p className="pattern-desc">Strings, tokens, event streams.</p>
          <pre className="cheatsheet-code"><code>{`while (right < n) {
  add(right)
  while (valid()) {
    updateAnswer()
    remove(left)
    left++
  }
  right++
}`}</code></pre>
          <p className="complexity"><strong>Time:</strong> O(n). <strong>Space:</strong> O(k) (distinct required items).</p>
        </div>

        <div className="pattern-block">
          <h3>Hash maps / frequency counts</h3>
          <pre className="cheatsheet-code"><code>{`map[key] = (map[key] ?? 0) + 1`}</code></pre>
          <p className="complexity"><strong>Time:</strong> O(n). <strong>Space:</strong> O(u) (unique keys).</p>
        </div>

        <div className="pattern-block">
          <h3>Intervals / ranges</h3>
          <p className="pattern-desc">Sort by start, then sweep and merge.</p>
          <p className="complexity"><strong>Time:</strong> O(n log n). <strong>Space:</strong> O(n).</p>
        </div>
      </section>

      {/* 3) String problems */}
      <section className="cheatsheet-section">
        <h2>3) String problems — key distinctions</h2>
        <ul>
          <li><strong>Literal substring</strong> → indexOf / simple scan</li>
          <li><strong>Any permutation</strong> → sliding window + counts</li>
          <li><strong>Min window containing</strong> → expand right, shrink left</li>
          <li><strong>Words instead of chars</strong> → tokenize, same window logic</li>
        </ul>
      </section>

      {/* 4) Tokenization */}
      <section className="cheatsheet-section">
        <h2>4) Tokenization + normalization (product FE)</h2>
        <ul>
          <li>Tokenize original text first</li>
          <li>Store raw, normalized, start, end per token</li>
          <li>Match on normalized, slice original using indices</li>
        </ul>
        <p className="complexity"><strong>Normalization cost:</strong> O(T) total characters.</p>
      </section>

      {/* 5) TypeScript tips */}
      <section className="cheatsheet-section">
        <h2>5) TypeScript live-coding tips</h2>
        <ul>
          <li>Prefer <code>for…of</code> over <code>reduce</code> under pressure</li>
          <li>Use <code>{'Record<string, number>'}</code> for counts</li>
          <li>Guard optional fields: <code>children ?? []</code></li>
          <li>Early returns for edge cases</li>
          <li>Readable {'>'} clever</li>
        </ul>
      </section>

      {/* 6) Pacing */}
      <section className="cheatsheet-section">
        <h2>6) Interview pacing (45 minutes)</h2>
        <ul className="pacing-list">
          <li><strong>0–5 min:</strong> clarify + examples</li>
          <li><strong>5–10 min:</strong> approach + complexity</li>
          <li><strong>10–30 min:</strong> code correct solution</li>
          <li><strong>30–40 min:</strong> edge cases + cleanup</li>
          <li><strong>40–45 min:</strong> tradeoffs / alternatives</li>
        </ul>
        <p className="tip">Say early: “I’ll start with a straightforward solution and optimize if needed.”</p>
      </section>

      {/* 7) End questions */}
      <section className="cheatsheet-section">
        <h2>7) End-of-interview questions</h2>
        <ul>
          <li>What kinds of problems does this role solve most often?</li>
          <li>How do frontend and platform teams collaborate?</li>
          <li>What does success look like in the first 90 days?</li>
        </ul>
      </section>
    </main>
  );
}
