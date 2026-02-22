import Link from 'next/link';
import { CodeView } from '@/components/CodeView';

const BUGGY_CODE = `interface User {
  id: number;
  name: string;
  email: string;
}

// THE BUG: 'key' is just a string, so TS doesn't know 
// if it actually exists on 'obj'.
function getProperty<T>(obj: T, key: string) {
  return obj[key]; 
  // Error: Element implicitly has an 'any' type because 
  // expression of type 'string' can't be used to index type 'T'.
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com" };

const userName = getProperty(user, "name"); 
const userAge = getProperty(user, "age"); // This should be a TS error, but isn't!`;

const FIXED_CODE = `// K must be a valid key of T
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const userName = getProperty(user, "name"); // Type is 'string'
// @ts-expect-error: "age" is not a key of User
const userAge = getProperty(user, "age");`;

export default function TypeSafeDataFetcherPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/debugging">
        ← Back to debugging
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">
        The Challenge: &ldquo;The Type-Safe Data Fetcher&rdquo;
      </h1>

      <section className="mb-6">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">The scenario</h2>
        <p className="text-muted text-[0.95rem] mb-0">
          You have a generic function meant to fetch a specific property from an object. The code works at runtime, but the TypeScript compiler is giving an error because the relationship between the key and the object isn&apos;t strictly defined.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">The buggy code</h2>
        <CodeView code={BUGGY_CODE} />
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">How to fix the types</h2>
        <p className="text-muted text-[0.95rem] mb-4">
          To fix this, you must use a <strong>generic constraint</strong> with the <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">keyof</code> operator to link the key directly to the object&apos;s type.
        </p>
        <h3 className="text-base font-semibold mt-0 mb-2 text-text">The corrected version</h3>
        <CodeView code={FIXED_CODE} />
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">3-day prep roadmap</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[0.9rem]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 font-semibold text-text">Day</th>
                <th className="text-left py-2 px-3 font-semibold text-text">Focus area</th>
                <th className="text-left py-2 px-3 font-semibold text-text">Recommended practice</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              <tr className="border-b border-border">
                <td className="py-2 px-3">Day 1</td>
                <td className="py-2 px-3">Advanced syntax</td>
                <td className="py-2 px-3">Practice utility types like <code className="font-mono text-[0.85em]">Pick</code>, <code className="font-mono text-[0.85em]">Omit</code>, and <code className="font-mono text-[0.85em]">Record</code>. Understand when to use <code className="font-mono text-[0.85em]">unknown</code> vs <code className="font-mono text-[0.85em]">any</code>.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3">Day 2</td>
                <td className="py-2 px-3">Complex scenarios</td>
                <td className="py-2 px-3">Solve 3–5 TypeHero challenges or TypeScript-specific problems on CodeSignal.</td>
              </tr>
              <tr className="border-b border-border">
                <td className="py-2 px-3">Day 3</td>
                <td className="py-2 px-3">Tools & workflow</td>
                <td className="py-2 px-3">Practice using the VS Code debugger instead of <code className="font-mono text-[0.85em]">console.log</code>. Rehearse explaining your debugging steps out loud.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-3 px-4 bg-surface border border-border rounded-[var(--radius-card)]">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">Final pro-tip: the &ldquo;negative&rdquo; test</h2>
        <p className="text-muted text-[0.95rem] mb-0">
          In many interviews, you might be asked to write a test that <em>should</em> fail. Use <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-bg rounded border border-border">// @ts-expect-error</code> or <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-bg rounded border border-border">// @ts-ignore</code> to demonstrate that you know exactly where the compiler should be catching a mistake. This shows a very high level of comfort with the language.
        </p>
      </section>
    </main>
  );
}
