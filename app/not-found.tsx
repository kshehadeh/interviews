import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="solution-view">
      <h1>Not found</h1>
      <p>The problem or solution you’re looking for doesn’t exist.</p>
      <Link href="/">← Back to table of contents</Link>
    </div>
  );
}
