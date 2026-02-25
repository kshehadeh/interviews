const tocItems = [
  { id: 'dsa', label: 'Data Structures & Algorithms' },
  { id: 'debugging', label: 'Debugging & Code Reasoning' },
  { id: 'system-design', label: 'System Design' },
  { id: 'behavioral', label: 'Behavioral & Communication' },
  { id: 'practice', label: 'How to Practice' },
  { id: 'final-advice', label: 'Final Advice' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 max-w-6xl">
      <main className="min-w-0 flex-1 order-2 lg:order-1">
      <article className="max-w-none">
        <h1 className="text-[1.75rem] font-semibold mt-0 mb-1 tracking-tight text-text">
          An Opinionated Guide to Preparing for Tech Interviews
        </h1>
        <p className="text-muted text-base italic mb-8">
          For Backend, Frontend, and Full-Stack Engineers
        </p>
        <p className="text-text text-[0.95rem] leading-[1.6] mb-6">
          This guide is based on my experience preparing for interviews, my experience interviewing candidates and based on knowledge from others who have shared their experiences.
        </p>
        <ul className="list-disc pl-6 text-text text-[0.95rem] leading-[1.6] mb-6 space-y-1">
          <li>Clear problem framing</li>
          <li>Debugging ability</li>
          <li>Comfort with tradeoffs</li>
          <li>Communication under ambiguity</li>
          <li>Real-world system intuition</li>
        </ul>
        <div className="guide-callout guide-callout-key mb-10">
          <div className="guide-callout-label mb-4">Three pillars</div>
          <ol className="list-none pl-0 m-0 space-y-4">
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">1</span>
              <span className="text-[1.1rem] font-medium text-text">Algorithms & Data Structures <span className="text-muted font-normal">(baseline competence)</span></span>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">2</span>
              <span className="text-[1.1rem] font-medium text-text">Debugging & Code Reasoning <span className="text-muted font-normal">(senior signal)</span></span>
            </li>
            <li className="flex items-center gap-4">
              <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">3</span>
              <span className="text-[1.1rem] font-medium text-text">System Design <span className="text-muted font-normal">(scope, scale, and judgment)</span></span>
            </li>
          </ol>
        </div>

        <hr className="border-border my-10" />

        <section id="dsa" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>1</span>
            <h2 className="guide-section-title">Data Structures & Algorithms</h2>
          </header>

          <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
            You are <strong>not</strong> trying to be clever. You are trying to be: correct, clear, efficient enough, explainable.
          </p>
          <div className="guide-callout guide-callout-quote mb-6">
            <div className="guide-callout-label">What interviewers are really asking</div>
            &ldquo;Can this person reason about code under pressure?&rdquo;
          </div>

          <p className="text-text text-[0.95rem] leading-[1.6] mb-3">Core data structures you should know cold:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="guide-card">
              <div className="guide-card-title">Arrays & Strings</div>
              <div className="guide-card-desc">Common problems: Duplicates, Subarrays, Prefix sums, String normalization</div>
              <ul>
                <li>Iteration patterns</li>
                <li>Sliding window</li>
                <li>Two pointers</li>
                <li>Frequency maps</li>
                <li>In-place vs extra space</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Hash Maps / Sets</div>
              <div className="guide-card-desc">Deduplication, frequency counting, fast lookup, cache-like usage</div>
              <ul>
                <li>Reach for a map when it&apos;s obvious</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Stacks & Queues</div>
              <div className="guide-card-desc">Order and traversal</div>
              <ul>
                <li>Valid parentheses</li>
                <li>Undo/redo</li>
                <li>Depth-first traversal</li>
                <li>Monotonic stacks (advanced)</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Trees (Binary Trees)</div>
              <div className="guide-card-desc">No need to memorize rotations or red-black trees</div>
              <ul>
                <li>DFS vs BFS</li>
                <li>Recursion vs iteration</li>
                <li>Height / depth, LCA</li>
                <li>Serialization intuition</li>
              </ul>
            </div>
            <div className="guide-card sm:col-span-2">
              <div className="guide-card-title">Graphs (Lightweight)</div>
              <div className="guide-card-desc">Often appear in system modeling even when not explicit</div>
              <ul>
                <li>Adjacency lists</li>
                <li>BFS vs DFS, cycle detection</li>
                <li>Topological sorting</li>
              </ul>
            </div>
          </div>

          <div className="guide-card mb-4">
            <div className="guide-card-title">Algorithms worth practicing</div>
            <ul>
              <li>Binary search (variants matter)</li>
              <li>DFS / BFS, recursion + memoization</li>
              <li>Iterative vs recursive tradeoffs</li>
              <li>Basic DP (1D or grid-based)</li>
            </ul>
          </div>

          <div className="guide-card mb-4">
            <div className="guide-card-title">What good looks like</div>
            <div className="guide-card-desc">Narrate thought process, ask clarifying questions, start brute-force then improve step by step</div>
            <ul>
              <li>Avoid silent coding</li>
              <li>Avoid jumping to optimal with no explanation</li>
            </ul>
          </div>
          <div className="guide-callout guide-callout-tip">
            <div className="guide-callout-label">Key takeaway</div>
            Interviewers care more about <strong>how you think</strong> than whether you remember a trick.
          </div>
        </section>

        <hr className="border-border my-10" />

        <section id="debugging" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>2</span>
            <h2 className="guide-section-title">Debugging & Code Reasoning</h2>
          </header>
          <p className="text-text text-[0.95rem] leading-[1.6] mb-6">
            This is where senior engineers stand out—and where most candidates underprepare. TypeScript/JS focus.
          </p>

          <div className="guide-card mb-6">
            <div className="guide-card-title">What these questions test</div>
            <ul>
              <li>Execution order</li>
              <li>Closures, async behavior</li>
              <li>State mutation</li>
              <li>Real bugs, not puzzles</li>
            </ul>
          </div>

          <p className="text-text text-[0.95rem] leading-[1.6] mb-3">Core concepts to master:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="guide-card">
              <div className="guide-card-title">Event Loop</div>
              <div className="guide-card-desc">Explain why something logs in a specific order</div>
              <ul>
                <li>Macrotasks vs microtasks</li>
                <li><code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">Promise.then</code>, <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">setTimeout</code>, <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">async/await</code></li>
                <li>Why <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">try/catch</code> doesn&apos;t catch async errors</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Promises & Async</div>
              <ul>
                <li><code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">Promise.all</code> vs <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">forEach</code></li>
                <li>Unhandled rejections, error propagation</li>
                <li>Race conditions, AbortController</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Closures & State</div>
              <ul>
                <li>Stale closures</li>
                <li>Shared mutable state</li>
                <li>Capturing variables in loops</li>
                <li><code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">this</code> binding</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Timers & Cleanup</div>
              <ul>
                <li><code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">setTimeout</code> vs <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">setInterval</code></li>
                <li>Memory leaks, clearing timers</li>
                <li>Idempotency</li>
              </ul>
            </div>
          </div>

          <div className="guide-card mb-4">
            <div className="guide-card-title">Debugging patterns to practice</div>
            <ul>
              <li>Why does this <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">catch</code> never fire?</li>
              <li>Why does this function return stale data?</li>
              <li>Why is this called multiple times?</li>
              <li>Why does this async loop finish early?</li>
            </ul>
          </div>
          <div className="guide-callout guide-callout-key mb-6">
            <div className="guide-callout-label">Key expectation</div>
            Explain <em>what the code is doing now</em>, not what it <em>should</em> do.
          </div>

          <div className="guide-card mb-4">
            <div className="guide-card-title">How to answer debugging questions well</div>
            <div className="guide-card-desc">Mirrors real production debugging</div>
            <ol className="list-decimal pl-5 space-y-1 m-0 text-[0.9rem]">
              <li>Restate the problem</li>
              <li>Walk through execution step by step</li>
              <li>Identify the root cause</li>
              <li>Propose a fix</li>
              <li>Explain why the fix works</li>
            </ol>
          </div>
        </section>

        <hr className="border-border my-10" />

        <section id="system-design" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>3</span>
            <h2 className="guide-section-title">System Design</h2>
          </header>
          <p className="text-text text-[0.95rem] leading-[1.6] mb-6">
            System design separates mid-level from senior and staff engineers.
          </p>

          <div className="guide-card mb-4">
            <div className="guide-card-title">What interviewers are evaluating</div>
            <ul>
              <li>Problem decomposition</li>
              <li>Understanding of scale</li>
              <li>Tradeoff reasoning</li>
              <li>Knowing where complexity actually lives</li>
            </ul>
          </div>
          <div className="guide-callout guide-callout-tip mb-6">
            <div className="guide-callout-label">Reality check</div>
            They are not expecting perfect architectures.
          </div>

          <p className="text-text text-[0.95rem] leading-[1.6] mb-3">Structure every system design answer:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="guide-card">
              <div className="guide-card-title">1. Clarify requirements</div>
              <div className="guide-card-desc">Asking questions is a positive signal</div>
              <ul>
                <li>Who are the users?</li>
                <li>Read-heavy or write-heavy?</li>
                <li>Latency vs consistency?</li>
                <li>Global or regional? Data size?</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">2. Core components</div>
              <div className="guide-card-desc">Start simple</div>
              <ul>
                <li>Client(s), API layer</li>
                <li>Data store, workers</li>
                <li>Caching, auth</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">3. Data model first</div>
              <div className="guide-card-desc">Entities, relationships, keys, indexes</div>
              <ul>
                <li>Before services</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">4. Scale & bottlenecks</div>
              <ul>
                <li>Caching, horizontal scaling</li>
                <li>Queues, async, rate limiting</li>
              </ul>
            </div>
            <div className="guide-card sm:col-span-2">
              <div className="guide-card-title">5. Failure modes</div>
              <div className="guide-card-desc">Strong candidates discuss</div>
              <ul>
                <li>Partial failures, retries, idempotency</li>
                <li>Backpressure, observability</li>
              </ul>
            </div>
          </div>

          <div className="guide-callout guide-callout-warning mb-6">
            <div className="guide-callout-label">Critical</div>
            If the data model is wrong, everything else is noise.
          </div>

          <div className="guide-card mb-4">
            <div className="guide-card-title">Common topics to practice</div>
            <div className="guide-card-desc">Map directly to real-world systems</div>
            <ul>
              <li>URL shortener, feed/timeline</li>
              <li>Notification system, search autocomplete</li>
              <li>File upload & processing</li>
              <li>Feature flags, analytics pipeline</li>
            </ul>
          </div>
          <div className="guide-card">
            <div className="guide-card-title">Frontend / full-stack system design</div>
            <div className="guide-card-desc">Be ready to discuss</div>
            <ul>
              <li>Client-side caching, SSR vs CSR</li>
              <li>API contracts, pagination</li>
              <li>Error handling, performance budgets</li>
              <li>Analytics and tracking</li>
            </ul>
          </div>
        </section>

        <hr className="border-border my-10" />

        <section id="behavioral" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>4</span>
            <h2 className="guide-section-title">Behavioral & Communication</h2>
          </header>
          <p className="text-text text-[0.95rem] leading-[1.6] mb-6">
            Even technical interviews are heavily influenced by communication.
          </p>
          <div className="guide-card mb-4">
            <div className="guide-card-title">STAR still matters</div>
            <div className="guide-card-desc">Situation → Task → Action → Result. Use real examples.</div>
            <ul>
              <li>Debugging production incidents</li>
              <li>Navigating ambiguity</li>
              <li>Disagreeing respectfully</li>
              <li>Improving performance or reliability</li>
            </ul>
          </div>
          <div className="guide-callout guide-callout-tip">
            <div className="guide-callout-label">Especially after layoffs</div>
            Candidates who explain impact without bitterness, show ownership without blame, and reflect and grow leave a stronger impression.
          </div>
        </section>

        <hr className="border-border my-10" />

        <section id="practice" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>5</span>
            <h2 className="guide-section-title">How to Practice (Efficiently)</h2>
          </header>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="guide-callout guide-callout-warning">
              <div className="guide-callout-label">Avoid</div>
              <ul className="list-none pl-0 space-y-1 text-[0.9rem]">
                <li>Grinding hundreds of LeetCode</li>
                <li>Memorizing solutions</li>
                <li>Ignoring explanation practice</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-tip">
              <div className="guide-callout-label">Do instead</div>
              <ul className="list-none pl-0 space-y-1 text-[0.9rem]">
                <li>Solve 1–2 problems per day</li>
                <li>Explain solutions out loud</li>
                <li>Practice without autocomplete</li>
                <li>Debug broken code</li>
                <li>Mock interviews with peers</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="border-border my-10" />

        <section id="final-advice" className="mb-10 scroll-mt-8">
          <header className="guide-section-header">
            <span className="guide-section-num" aria-hidden>6</span>
            <h2 className="guide-section-title">Final Advice</h2>
          </header>
          <div className="guide-callout guide-callout-key mb-6">
            <div className="guide-callout-label">Principles</div>
            <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
              <li>Clarity beats cleverness</li>
              <li>Debugging skill is underweighted but critical</li>
              <li>System design is about judgment, not diagrams</li>
              <li>Asking good questions signals seniority</li>
              <li>Calm reasoning beats fast typing</li>
            </ul>
          </div>
          <div className="guide-card mb-6">
            <div className="guide-card-title text-base mb-4">Prep value ranking</div>
            <ol className="list-none pl-0 m-0 space-y-4">
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">1</span>
                <span className="text-[1.1rem] font-medium text-text">Debugging and reasoning</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">2</span>
                <span className="text-[1.1rem] font-medium text-text">System design structure</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">3</span>
                <span className="text-[1.1rem] font-medium text-text">Core DSA patterns</span>
              </li>
              <li className="flex items-center gap-4">
                <span className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl font-mono">4</span>
                <span className="text-[1.1rem] font-medium text-text">Language trivia</span>
              </li>
            </ol>
          </div>
          <div className="guide-callout guide-callout-quote">
            <div className="guide-callout-label">Closing thought</div>
            Treat interviews as collaborative problem-solving, not exams.
          </div>
        </section>
      </article>
      </main>

      <aside className="lg:w-56 flex-shrink-0 order-1 lg:order-2">
        <nav className="lg:sticky lg:top-8" aria-label="Table of contents">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">On this page</h3>
          <ul className="space-y-2 text-[0.9rem]">
            {tocItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-muted hover:text-accent no-underline transition-colors block py-0.5"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
