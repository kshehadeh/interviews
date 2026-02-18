import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="block">
      <h1 className="text-2xl font-semibold mt-0 mb-1">Not found</h1>
      <p>The problem or solution you’re looking for doesn’t exist.</p>
      <Link href="/">← Back to Table of Contents</Link>
    </div>
  );
}
