import Link from 'next/link';

export default function SlidingWindowCheatsheetPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/cheatsheet">
        ← Back to cheat sheets
      </Link>

      <h1 className="text-2xl font-semibold mt-0 mb-8 tracking-tight">Sliding Window</h1>

      {/* 1. The Core Concept */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          1. The Core Concept
        </h2>
        <ul className="my-0 mb-3 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            <strong>Subarray:</strong> A contiguous section of an array defined by a <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">left</code> and <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">right</code> bound.
          </li>
          <li className="mb-1.5">
            <strong>The Goal:</strong> Find a &ldquo;valid&rdquo; window based on a <strong>constraint metric</strong> (e.g., sum, count of specific elements) and a <strong>numeric restriction</strong> (e.g., ≤ target).
          </li>
          <li className="mb-1.5">
            <strong>Dynamic vs. Fixed:</strong> Windows can grow and shrink dynamically, or stay at a fixed length <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">k</code>.
          </li>
        </ul>
      </section>

      <hr className="border-border my-8" />

      {/* 2. Dynamic Sliding Window */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          2. Dynamic Sliding Window
        </h2>
        <p className="text-muted text-[0.9rem] mb-3">
          <strong>Scenario:</strong> Find the &ldquo;best&rdquo; valid subarray (longest, shortest, etc.) where the size isn&apos;t predefined.
        </p>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-2">Setup</h3>
          <ul className="list-none pl-0 my-0 text-[0.9rem] font-mono">
            <li><code>left = 0</code></li>
            <li><code>right</code> iterates from <code>0</code> to <code>n - 1</code></li>
          </ul>
        </div>

        <h3 className="text-base font-semibold mt-4 mb-2">Logic</h3>
        <ol className="my-0 mb-3 pl-5 text-muted text-[0.9rem] list-decimal">
          <li className="mb-1.5">
            <strong>Expand:</strong> Add <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr[right]</code> to your tracking variable (e.g., <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">curr_sum</code>).
          </li>
          <li className="mb-1.5">
            <strong>Validate:</strong> While the window is <strong>invalid</strong>, shrink it from the left:
            <ul className="mt-1.5 pl-5 list-disc">
              <li>Subtract <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr[left]</code> from your tracking variable.</li>
              <li>Increment <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">left++</code>.</li>
            </ul>
          </li>
          <li className="mb-1.5">
            <strong>Update:</strong> Once valid, update your answer (e.g., <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">max_length = max(max_length, right - left + 1)</code>).
          </li>
        </ol>

        <ul className="my-0 mb-2 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5"><strong>Time Complexity:</strong> O(n) (each pointer moves at most n times)</li>
          <li className="mb-1.5"><strong>Space Complexity:</strong> O(1)</li>
        </ul>
      </section>

      <hr className="border-border my-8" />

      {/* 3. Fixed-Size Sliding Window */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          3. Fixed-Size Sliding Window
        </h2>
        <p className="text-muted text-[0.9rem] mb-3">
          <strong>Scenario:</strong> The problem specifies a subarray length of exactly <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">k</code>.
        </p>

        <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
          <h3 className="text-base font-semibold mt-0 mb-2">Setup</h3>
          <p className="text-[0.9rem] my-0">Build the initial window of size <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">k</code> first.</p>
        </div>

        <h3 className="text-base font-semibold mt-4 mb-2">Logic</h3>
        <ol className="my-0 mb-3 pl-5 text-muted text-[0.9rem] list-decimal">
          <li className="mb-1.5">Iterate from index <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">k</code> to <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">n - 1</code>.</li>
          <li className="mb-1.5">
            <strong>Slide:</strong> Add the new element <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr[i]</code> and remove the element that is now outside the window <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">arr[i - k]</code>.
          </li>
          <li className="mb-1.5"><strong>Update:</strong> Compare the result after each shift.</li>
        </ol>
      </section>

      <hr className="border-border my-8" />

      {/* 4. Counting Subarrays */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">
          4. Counting Subarrays (The Math Trick)
        </h2>
        <p className="text-muted text-[0.9rem] mb-3">
          If a problem asks for the <strong>number of valid subarrays</strong>:
        </p>
        <ul className="my-0 mb-3 pl-5 text-muted text-[0.9rem]">
          <li className="mb-1.5">
            For any valid window <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">[left, right]</code>, the number of valid subarrays <strong>ending at <code className="font-mono text-[0.85em]">right</code></strong> is equal to the window size: <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">right - left + 1</code>.
          </li>
          <li className="mb-1.5">
            <strong>Total Count:</strong> In each iteration, add <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">right - left + 1</code> to your total <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">ans</code>.
          </li>
        </ul>
      </section>

      <hr className="border-border my-8" />

      {/* Comparison Table */}
      <section className="mb-10">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Comparison Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-[0.9rem] border-collapse border border-border">
            <thead>
              <tr className="bg-surface">
                <th className="border border-border py-2 px-3 text-left font-semibold">Feature</th>
                <th className="border border-border py-2 px-3 text-left font-semibold">Two Pointers (Opposite Ends)</th>
                <th className="border border-border py-2 px-3 text-left font-semibold">Sliding Window (Dynamic)</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr>
                <td className="border border-border py-2 px-3 font-medium text-text">Pointers</td>
                <td className="border border-border py-2 px-3">Start at <code className="font-mono text-[0.85em]">0</code> and <code className="font-mono text-[0.85em]">n-1</code>.</td>
                <td className="border border-border py-2 px-3">Start both at <code className="font-mono text-[0.85em]">0</code>.</td>
              </tr>
              <tr>
                <td className="border border-border py-2 px-3 font-medium text-text">Movement</td>
                <td className="border border-border py-2 px-3">Move toward each other.</td>
                <td className="border border-border py-2 px-3">Both move right (expand/shrink).</td>
              </tr>
              <tr>
                <td className="border border-border py-2 px-3 font-medium text-text">Use Case</td>
                <td className="border border-border py-2 px-3">Sorted arrays, searching for pairs.</td>
                <td className="border border-border py-2 px-3">Subarrays, contiguous sequences.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
