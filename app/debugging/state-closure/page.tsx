import Link from 'next/link';
import { CodeView } from '@/components/CodeView';

const COUNTER_CODE = `function CounterComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // THE TRAP:
      // This function was created during the FIRST render.
      // At that time, 'count' was 0.
      console.log("Count is:", count); 
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array means this effect only runs once

  return <button onClick={() => setCount(count + 1)}>Increment</button>;
}`;

const FIX_FUNCTIONAL_UPDATE = `setCount(prevCount => prevCount + 1);`;

export default function StateClosurePage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/debugging">
        ← Back to debugging
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">
        The &ldquo;Stale Closure&rdquo; Interview Example
      </h1>
      <p className="text-muted text-[0.95rem] mb-6">
        In a React-style functional component, the code looks like this. This is the one that trips up most candidates:
      </p>

      <CodeView code={COUNTER_CODE} />

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">Why it &ldquo;freezes&rdquo;</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted text-[0.95rem]">
          <li>React components are functions that re-run on every render.</li>
          <li>Each render has its own <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">count</code> variable (a constant for that specific &ldquo;snapshot&rdquo;).</li>
          <li>The <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">useEffect</code> ran only on the first render, so its <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">setInterval</code> is holding onto the <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">count</code> variable from Render #1 (which is 0).</li>
          <li>Even if the component re-renders and a new <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">count</code> (e.g., 1) exists in Render #2, the interval is still executing the function from Render #1.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">How to fix it (the &ldquo;senior&rdquo; answer)</h2>
        <p className="text-muted text-[0.95rem] mb-4">
          In an interview, you should offer these solutions:
        </p>
        <ul className="list-none pl-0 space-y-4">
          <li className="py-3 px-4 bg-surface border border-border rounded-[var(--radius-card)]">
            <strong className="text-text">Add the dependency:</strong> Put <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">[count]</code> in the dependency array. This kills the old timer and starts a new one with the fresh value. (Cons: the timer resets every click.)
          </li>
          <li className="py-3 px-4 bg-surface border border-border rounded-[var(--radius-card)]">
            <strong className="text-text">Functional updates (the pro fix):</strong> Use the functional version of state updates if you just need the previous value:
            <div className="mt-2">
              <CodeView code={FIX_FUNCTIONAL_UPDATE} />
            </div>
          </li>
          <li className="py-3 px-4 bg-surface border border-border rounded-[var(--radius-card)]">
            <strong className="text-text">Refs:</strong> Use <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">useRef</code> to store the count. Since refs are objects with a mutable <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">.current</code> property, the closure stays &ldquo;fresh&rdquo; because it&apos;s looking at the same object reference, not a snapshot of a primitive.
          </li>
        </ul>
      </section>
    </main>
  );
}
