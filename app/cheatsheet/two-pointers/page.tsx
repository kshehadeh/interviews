import Link from 'next/link';

export default function TwoPointersCheatsheetPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/cheatsheet">
        ← Back to cheat sheets
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-8 tracking-tight">Two Pointers</h1>

      {/* 1. Opposite Ends */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          1. Two Pointers: Opposite Ends
        </h2>
        <p className="text-muted text-[0.9rem] mb-3">
          <strong>Scenario:</strong> Used on a single sorted array or string.
        </p>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-2">Setup</h3>
          <ul className="list-none pl-0 my-0 text-[0.9rem] font-mono">
            <li><code>left = 0</code></li>
            <li><code>right = input.length - 1</code></li>
          </ul>
        </div>

        <ul className="my-0 mb-3 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5"><strong>Logic:</strong> Move pointers toward each other until they meet.</li>
          <li className="mb-1.5"><strong>Time Complexity:</strong> O(n)</li>
          <li className="mb-1.5"><strong>Space Complexity:</strong> O(1)</li>
        </ul>

        <h3 className="text-base font-semibold mt-4 mb-2">Common Use Cases</h3>
        <ul className="my-0 mb-2 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            <strong>Validating Palindromes:</strong> Compare <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">s[left]</code> and{' '}
            <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">s[right]</code>, then move both inward.
          </li>
          <li className="mb-1.5">
            <strong>Two Sum (Sorted):</strong> If <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">sum &gt; target</code>, move{' '}
            <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">right--</code> to decrease sum; if{' '}
            <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">sum &lt; target</code>, move{' '}
            <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">left++</code> to increase sum.
          </li>
        </ul>
      </section>

      <hr className="border-border my-8" />

      {/* 2. Two Iterables */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          2. Two Pointers: Two Iterables
        </h2>
        <p className="text-muted text-[0.9rem] mb-3">
          <strong>Scenario:</strong> Used when comparing two different arrays or strings.
        </p>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-2">Setup</h3>
          <ul className="list-none pl-0 my-0 text-[0.9rem] font-mono">
            <li><code>i = 0</code> (for first array)</li>
            <li><code>j = 0</code> (for second array)</li>
          </ul>
        </div>

        <ul className="my-0 mb-3 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            <strong>Logic:</strong> Move along both simultaneously. The loop usually ends when <em>one</em> pointer reaches the end.
          </li>
          <li className="mb-1.5">
            <strong>Time Complexity:</strong> O(n + m) (where n and m are the lengths of the inputs).
          </li>
          <li className="mb-1.5">
            <strong>Space Complexity:</strong> O(1) (excluding output storage).
          </li>
        </ul>

        <h3 className="text-base font-semibold mt-4 mb-2">Common Use Cases</h3>
        <ul className="my-0 mb-2 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            <strong>Merging Sorted Arrays:</strong> Compare <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr1[i]</code> and{' '}
            <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr2[j]</code>, add the smaller to the result, and increment that specific pointer.
          </li>
          <li className="mb-1.5">
            <strong>Subsequence Check:</strong> Move the &ldquo;main&rdquo; string pointer every time, but only move the &ldquo;subsequence&rdquo; pointer when a match is found.
          </li>
        </ul>
      </section>

      <hr className="border-border my-8" />

      {/* Key Takeaways */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Key Takeaways</h2>
        <ul className="my-0 mb-2 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            <strong>Efficiency:</strong> This technique often reduces brute-force solutions (nested loops) to O(n) linear time.
          </li>
          <li className="mb-1.5">
            <strong>Exhaustion:</strong> For the &ldquo;Two Iterables&rdquo; method, remember to check if one array still has remaining elements after the main loop finishes.
          </li>
          <li className="mb-1.5">
            <strong>Flexibility:</strong> While these are the &ldquo;standard&rdquo; patterns, pointers can start at the same index, different indices, or even move at different speeds (Slow/Fast pointers).
          </li>
        </ul>
      </section>
    </main>
  );
}
