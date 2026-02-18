import Link from 'next/link';
import { PROBLEMS_DATA } from '@/lib/data';

export default function BigOCheatsheetPage() {
  return (
    <main>
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/cheatsheet">
        ← Back to cheat sheets
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">Big O notation</h1>
      <p className="text-muted text-[0.95rem] mb-8">
        A short reference to what Big O is, how time and space are expressed, and how common variables like <em>n</em> and <em>h</em> are used—with examples from the problems in this app.
      </p>

      <div className="flex flex-wrap gap-8">
        <section className="flex flex-row gap-4">
          <section className="min-w-[280px] flex-1 m-6 border border-border rounded-[var(--radius-card)] p-4">
            <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">What is Big O?</h2>
            <p className="text-muted text-[0.9rem] mb-2">
              Big O describes how the <strong>time</strong> or <strong>space</strong> an algorithm needs grows as the input size grows. We ignore constant factors and lower-order terms and focus on the dominant term. For example, if something does 3n² + 100n + 2 steps, we say it is <strong>O(n²)</strong>.
            </p>
            <p className="text-muted text-[0.9rem] mb-2">
              It answers: &ldquo;If I double the input, roughly how much more work or memory?&rdquo; O(n) means roughly linear (double input → double cost). O(n²) means doubling the input roughly quadruples the cost.
            </p>
          </section>

          <section className="min-w-[280px] flex-1 m-6 border border-border rounded-[var(--radius-card)] p-4">
            <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Time vs space</h2>
            <ul className="list-none pl-0">
              <li className="py-1 border-b border-border last:border-b-0"><strong>Time complexity</strong> — How many steps (operations) the algorithm does as a function of input size. We count comparisons, loops over data, recursive calls, etc.</li>
              <li className="py-1 border-b border-border last:border-b-0"><strong>Space complexity</strong> — How much extra memory the algorithm uses beyond the input: stack depth for recursion, allocated arrays/maps, and output size.</li>
            </ul>
            <p className="text-muted text-[0.9rem] mb-2 mt-3">
              You can have fast-but-heavy algorithms (e.g. O(n) time, O(n) space) or slower-but-light ones (e.g. O(n²) time, O(1) space). Stating both helps compare solutions.
            </p>
          </section>

          <section className="min-w-[280px] flex-1 m-6 border border-border rounded-[var(--radius-card)] p-4">
            <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">How <em>n</em> is used</h2>
            <p className="text-muted text-[0.9rem] mb-2">
              <strong>n</strong> usually means the &ldquo;main&rdquo; size of the input: total number of elements you process.
            </p>
            <ul className="my-0 mb-2 pl-5">
              <li className="mb-1.5"><strong>Strings:</strong> n = length of the string (number of characters).</li>
              <li className="mb-1.5"><strong>Arrays / lists:</strong> n = number of elements.</li>
              <li className="mb-1.5"><strong>Trees:</strong> n = total number of nodes (every node visited once → O(n) time).</li>
            </ul>
            <p className="text-muted text-[0.9rem] mb-2 mt-2">
              So &ldquo;O(n) time&rdquo; means we do a constant amount of work per element; &ldquo;O(n²)&rdquo; often means nested loops over the same n elements or repeated scans.
            </p>
          </section>

          <section className="min-w-[280px] flex-1 m-6 border border-border rounded-[var(--radius-card)] p-4">
            <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">How <em>h</em> is used</h2>
            <p className="text-muted text-[0.9rem] mb-2">
              <strong>h</strong> usually means the <strong>height</strong> of a tree (maximum depth from root to a leaf).
            </p>
            <ul className="my-0 mb-2 pl-5">
              <li className="mb-1.5">In a <strong>balanced</strong> tree, h ≈ log(n), so O(h) is the same idea as O(log n) for space (recursion stack) or for operations that depend on depth.</li>
              <li className="mb-1.5">In a <strong>degenerate</strong> tree (e.g. a linked list), h = n, so O(h) space for recursion can be O(n).</li>
            </ul>
            <p className="text-muted text-[0.9rem] mb-2 mt-2">
              We use h when the cost is tied to how deep we go (e.g. stack depth in a tree traversal), not to how many nodes exist in total.
            </p>
          </section>
        </section>

        <section className="min-w-[280px] flex-1">
          <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Complexity Prompts – With Answers</h2>
          <p className="text-muted text-[0.9rem] mb-4">
            Practice problems with time/space analysis. Each prompt has an answer and short reasoning.
          </p>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 1</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You&apos;re given an array of user events sorted by timestamp. You scan once and build a map of {'{ userId → lastSeenTimestamp }'}.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n), where n is the number of events · <strong>Space:</strong> O(u), where u is the number of unique userIds</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> You scan the array once and store one entry per unique user.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 2</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You&apos;re given a deeply nested JSON config. You recursively walk it and collect all keys that match a predicate.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n), where n is the total number of keys/nodes · <strong>Space:</strong> O(h) + O(k) — h = maximum nesting depth (recursion stack), k = number of matching keys returned</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Each key is visited once. Space includes both traversal depth and output size.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 3</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> Given two strings <em>s</em> and <em>p</em>, return true if <em>s</em> contains any permutation (anagram) of <em>p</em>.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer (optimized sliding window):</strong> <strong>Time:</strong> O(n), where n = length of <em>s</em> · <strong>Space:</strong> O(k), where k = number of distinct characters in <em>p</em></p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Each character enters and exits the window once. Frequency map size depends on <em>p</em>.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 4</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You normalize text by lowercasing and stripping punctuation before matching.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(T), where T = total number of characters processed · <strong>Space:</strong> O(T) if producing new strings, otherwise O(1) auxiliary</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Each character is processed a constant number of times.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 5</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You flatten a tree (e.g., component tree or folder structure) using DFS.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n), where n = number of nodes · <strong>Space:</strong> O(n) + O(h) — O(n) for the flattened output, O(h) for recursion stack or explicit stack, h = height of the tree</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Each node is visited once. Stack depth depends on tree height.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 6</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You scan an array once using two pointers that only move forward.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n) · <strong>Space:</strong> O(1) or O(k), depending on auxiliary data structures</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Each pointer advances at most n times; no backtracking.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 7</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You merge overlapping intervals after sorting them by start time.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n log n) · <strong>Space:</strong> O(n)</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Sorting dominates. Merge pass is linear.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 8</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You tokenize a string into words and run a sliding window over tokens.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(T) · <strong>Space:</strong> O(W + R) — T = total characters, W = number of tokens, R = number of required tokens</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Tokenization and window traversal are both linear in input size.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 9</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You recursively traverse a tree and stop early when a condition is met.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n) worst case · <strong>Space:</strong> O(h)</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> Worst case still visits all nodes; recursion depth depends on height.</p>
          </div>

          <div className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
            <h3 className="text-base font-semibold mt-0 mb-1.5">Prompt 10</h3>
            <p className="text-muted text-[0.9rem] mb-2"><strong>Problem:</strong> You build a frequency map from an array of items.</p>
            <p className="text-[0.85rem] text-muted mb-2"><strong>Answer:</strong> <strong>Time:</strong> O(n) · <strong>Space:</strong> O(u), where u = number of unique items</p>
            <p className="text-[0.9rem] mt-2"><strong>Reasoning:</strong> One pass through the array; map grows with unique keys.</p>
          </div>
        </section>

        <section className="min-w-[280px] flex-1">
          <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Examples from the problems</h2>
          <p className="text-muted text-[0.9rem] mb-2">
            Below, each solution is linked to its problem page so you can see the code and visualization. The time/space and short &ldquo;why&rdquo; match how we analyze them in this app.
          </p>

          {PROBLEMS_DATA.map((problem) => (
            <div key={problem.id}>
              <h3 className="mt-5 mb-2 text-base font-semibold">
                {problem.title}
              </h3>
              <p className="text-muted text-[0.9rem] mb-3">
                {problem.description}
              </p>
              {problem.solutions.map((solution) => (
                <div key={solution.id} className="bg-surface border border-border rounded-[var(--radius-card)] py-4 px-5 mb-4">
                  <h3 className="text-base font-semibold mt-0 mb-1.5">
                    <Link href={`/problems/${problem.id}/${solution.id}`}>
                      {solution.name}
                    </Link>
                  </h3>
                  <p className="text-[0.85rem] text-muted mb-2">
                    <strong>Time:</strong> {solution.time} &nbsp; <strong>Space:</strong> {solution.space}
                  </p>
                  <p className="text-[0.9rem] mt-2">
                    {solution.verdictReason}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
