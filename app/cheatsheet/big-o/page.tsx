import Link from 'next/link';
import { PROBLEMS_DATA } from '@/lib/data';

export default function BigOCheatsheetPage() {
  return (
    <main className="cheatsheet">
      <Link className="back" href="/cheatsheet">
        ← Back to cheat sheets
      </Link>
      <h1>Big O notation</h1>
      <p className="cheatsheet-intro">
        A short reference to what Big O is, how time and space are expressed, and how common variables like <em>n</em> and <em>h</em> are used—with examples from the problems in this app.
      </p>

      <section className="cheatsheet-section">
        <h2>What is Big O?</h2>
        <p className="section-desc">
          Big O describes how the <strong>time</strong> or <strong>space</strong> an algorithm needs grows as the input size grows. We ignore constant factors and lower-order terms and focus on the dominant term. For example, if something does 3n² + 100n + 2 steps, we say it is <strong>O(n²)</strong>.
        </p>
        <p className="section-desc">
          It answers: &ldquo;If I double the input, roughly how much more work or memory?&rdquo; O(n) means roughly linear (double input → double cost). O(n²) means doubling the input roughly quadruples the cost.
        </p>
      </section>

      <section className="cheatsheet-section">
        <h2>Time vs space</h2>
        <ul className="symbol-list">
          <li><strong>Time complexity</strong> — How many steps (operations) the algorithm does as a function of input size. We count comparisons, loops over data, recursive calls, etc.</li>
          <li><strong>Space complexity</strong> — How much extra memory the algorithm uses beyond the input: stack depth for recursion, allocated arrays/maps, and output size.</li>
        </ul>
        <p className="section-desc" style={{ marginTop: '0.75rem' }}>
          You can have fast-but-heavy algorithms (e.g. O(n) time, O(n) space) or slower-but-light ones (e.g. O(n²) time, O(1) space). Stating both helps compare solutions.
        </p>
      </section>

      <section className="cheatsheet-section">
        <h2>How <em>n</em> is used</h2>
        <p className="section-desc">
          <strong>n</strong> usually means the &ldquo;main&rdquo; size of the input: total number of elements you process.
        </p>
        <ul>
          <li><strong>Strings:</strong> n = length of the string (number of characters).</li>
          <li><strong>Arrays / lists:</strong> n = number of elements.</li>
          <li><strong>Trees:</strong> n = total number of nodes (every node visited once → O(n) time).</li>
        </ul>
        <p className="section-desc" style={{ marginTop: '0.5rem' }}>
          So &ldquo;O(n) time&rdquo; means we do a constant amount of work per element; &ldquo;O(n²)&rdquo; often means nested loops over the same n elements or repeated scans.
        </p>
      </section>

      <section className="cheatsheet-section">
        <h2>How <em>h</em> is used</h2>
        <p className="section-desc">
          <strong>h</strong> usually means the <strong>height</strong> of a tree (maximum depth from root to a leaf).
        </p>
        <ul>
          <li>In a <strong>balanced</strong> tree, h ≈ log(n), so O(h) is the same idea as O(log n) for space (recursion stack) or for operations that depend on depth.</li>
          <li>In a <strong>degenerate</strong> tree (e.g. a linked list), h = n, so O(h) space for recursion can be O(n).</li>
        </ul>
        <p className="section-desc" style={{ marginTop: '0.5rem' }}>
          We use h when the cost is tied to how deep we go (e.g. stack depth in a tree traversal), not to how many nodes exist in total.
        </p>
      </section>

      <section className="cheatsheet-section">
        <h2>Examples from the problems</h2>
        <p className="section-desc">
          Below, each solution is linked to its problem page so you can see the code and visualization. The time/space and short &ldquo;why&rdquo; match how we analyze them in this app.
        </p>

        {PROBLEMS_DATA.map((problem) => (
          <div key={problem.id}>
            <h3 style={{ marginTop: '1.25rem', marginBottom: '0.5rem' }}>
              {problem.title}
            </h3>
            <p className="section-desc" style={{ marginBottom: '0.75rem' }}>
              {problem.description}
            </p>
            {problem.solutions.map((solution) => (
              <div key={solution.id} className="bigo-example-block">
                <h3>
                  <Link href={`/problems/${problem.id}/${solution.id}`}>
                    {solution.name}
                  </Link>
                </h3>
                <p className="bigo-example-meta">
                  <strong>Time:</strong> {solution.time} &nbsp; <strong>Space:</strong> {solution.space}
                </p>
                <p className="bigo-example-reason">
                  {solution.verdictReason}
                </p>
              </div>
            ))}
          </div>
        ))}
      </section>
    </main>
  );
}
