import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="home">
      <h1 className="home-title">Interview Prep</h1>
      <p className="home-subtitle">
        Visualizations and reference for algorithm problems.
      </p>
      <div className="home-cards">
        <Link href="/problems" className="home-card">
          <span className="home-card-title">Problems</span>
          <span className="home-card-desc">
            Browse problems and solutions with animated visualizations, complexity, and explanations.
          </span>
        </Link>
        <Link href="/cheatsheet" className="home-card">
          <span className="home-card-title">Cheatsheets</span>
          <span className="home-card-desc">
            Big O notation, interview patterns, and quick reference guides.
          </span>
        </Link>
      </div>
    </main>
  );
}
