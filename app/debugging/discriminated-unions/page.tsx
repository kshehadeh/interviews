import Link from 'next/link';
import { CodeView } from '@/components/CodeView';

const BUGGY_CODE = `interface Success {
  status: 'success';
  data: string;
}

interface Failure {
  status: 'error';
  errorMessage: string;
}

type ApiResponse = Success | Failure;

function handleResponse(response: ApiResponse) {
  // BUG: The compiler complains here.
  // "Property 'data' does not exist on type 'ApiResponse'."
  console.log("Result: " + response.data); 

  if (response.status === 'error') {
    console.log("Error: " + response.errorMessage);
  }
}`;

const FIXED_CODE = `function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    // Because of the 'if', TS now knows response is strictly the 'Success' interface
    console.log("Result: " + response.data); 
  } else {
    // TS now knows response must be the 'Failure' interface
    console.log("Error: " + response.errorMessage);
  }
}`;

export default function DiscriminatedUnionsPage() {
  return (
    <main className="max-w-[720px]">
      <Link className="mb-6 text-[0.9rem] text-muted block" href="/debugging">
        ← Back to debugging
      </Link>
      <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">
        Discriminated unions
      </h1>
      <p className="text-muted text-[0.95rem] mb-6">
        This is the most common way to debug &ldquo;type safety&rdquo; in professional TypeScript codebases (especially with Redux or API responses).
      </p>

      <section className="mb-6">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">The scenario</h2>
        <p className="text-muted text-[0.95rem] mb-0">
          You have a function that processes different types of API responses. The logic is currently &ldquo;leaking&rdquo; because it&apos;s trying to access properties that don&apos;t exist on all possible response types.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">The buggy code</h2>
        <CodeView code={BUGGY_CODE} />
      </section>

      <section className="mb-6">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">Why this is a great debugging example</h2>
        <p className="text-muted text-[0.95rem] mb-0">
          The interviewer wants to see you use the <code className="font-mono text-[0.85em] py-0.5 px-1.5 bg-surface rounded border border-border">status</code> field (the &ldquo;discriminant&rdquo;) to narrow the type.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-[1.1rem] font-semibold mt-0 mb-3 text-text">The fix</h2>
        <CodeView code={FIXED_CODE} />
      </section>
    </main>
  );
}
