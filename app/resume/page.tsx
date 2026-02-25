const tocItems = [
  { id: 'what-it-is', label: 'What Your Resume Is' },
  { id: 'length', label: 'One Page vs Two' },
  { id: 'structure', label: 'Structure That Works' },
  { id: 'summary', label: 'The Summary' },
  { id: 'skills', label: 'Skills Section' },
  { id: 'experience', label: 'Experience & Bullets' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'long-tenures', label: 'Long Tenures' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'open-source', label: 'Open Source & Writing' },
  { id: 'common-smells', label: 'Common Resume Smells' },
  { id: 'alignment', label: 'Resume vs Interview' },
  { id: 'after-layoffs', label: 'After Layoffs' },
  { id: 'ai-filters', label: 'AI & Recruiter Filters' },
  { id: 'standing-out', label: 'Standing Out (Without Gaming)' },
  { id: 'ai-interviews', label: 'AI Era: Interviews & Layoffs' },
  { id: 'ai-review', label: 'Using AI to Review Your Resume' },
  { id: 'final-advice', label: 'Final Advice' },
];

const RESUME_REVIEW_PROMPT = `You are a senior engineering hiring manager reviewing a resume for a mid–senior software engineering role.

Context:
- The market is flooded with AI-generated and exaggerated resumes.
- You are skeptical by default and looking for signals of real-world experience.
- You care more about credibility, clarity, and impact than buzzwords or polish.

Task:
Review the resume below and provide a structured critique. Do NOT rewrite the resume unless explicitly asked.

Evaluate the resume across the following dimensions:

1. Credibility & Authenticity
- Which bullets feel grounded in real work?
- Which bullets feel generic, inflated, or AI-generated?
- Where does the resume lack concrete detail (systems, scale, constraints)?

2. Seniority Signal
- Does the scope of work match the claimed level?
- Are there clear signals of ownership, judgment, or tradeoff thinking?
- Is leadership shown through action rather than titles?

3. Impact & Outcomes
- Are outcomes and results clear?
- Are metrics used effectively and plausibly?
- Where could impact be made clearer without exaggeration?

4. Technical Depth & Focus
- Is the skill set coherent or overly broad?
- Are there areas where depth should be emphasized instead of breadth?
- Do the listed skills align with the experience bullets?

5. Resume Smells & Risk Flags
- Identify any red flags that might trigger skepticism from recruiters or hiring managers.
- Call out overused phrases, symmetry, buzzwords, or implausible claims.

6. Interview Readiness
- What interview questions would you ask to validate the claims on this resume?
- Where is the candidate likely to struggle if probed deeper?

7. Concrete Improvement Suggestions
- Provide specific, actionable suggestions to improve credibility and clarity.
- Focus on tightening language, adding specificity, or removing weak content.
- Do NOT add new accomplishments that are not present.

Tone:
- Direct, honest, and professional.
- Assume the candidate is experienced and capable.
- Avoid generic advice or platitudes.

Resume:
[PASTE RESUME HERE]`;

export default function ResumePage() {
  return (
    <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 max-w-6xl">
      <main className="min-w-0 flex-1 order-2 lg:order-1">
        <article className="max-w-none">
          <h1 className="text-[1.75rem] font-semibold mt-0 mb-1 tracking-tight text-text">
            Resume Guidance for Mid–Senior Engineers Returning to the Job Market
          </h1>
          <p className="text-muted text-base italic mb-8">
            Your resume is a skim-friendly artifact that convinces someone to give you 30–45 minutes of conversation.
          </p>

          <section id="what-it-is" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>0</span>
              <h2 className="guide-section-title">What Your Resume Is (and Isn&apos;t)</h2>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Your resume is not</div>
                <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                  <li>A job history</li>
                  <li>A task list</li>
                  <li>A complete record of everything you&apos;ve done</li>
                </ul>
              </div>
              <div className="guide-callout guide-callout-key">
                <div className="guide-callout-label">Your resume is</div>
                <p className="text-[0.9rem] m-0">
                  A skim-friendly artifact that convinces someone to give you 30–45 minutes of conversation.
                </p>
              </div>
            </div>
            <div className="guide-callout guide-callout-quote">
              <div className="guide-callout-label">Rule of thumb</div>
              If it doesn&apos;t pass a 20-second scan, it fails.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="length" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>1</span>
              <h2 className="guide-section-title">One Page vs Two Pages</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              <strong>Mid-level:</strong> 1 page. <strong>Senior+ (10–15 years):</strong> 1–2 pages max.
            </p>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Two pages are only justified if</div>
              <ul>
                <li>You&apos;ve worked on materially different systems</li>
                <li>You show increasing scope and impact</li>
                <li>Page 2 is not filler</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-warning">
              <div className="guide-callout-label">Be brutal</div>
              If page 2 is just older jobs with vague bullets, cut it.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="structure" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>2</span>
              <h2 className="guide-section-title">Structure That Actually Works</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              A proven structure:
            </p>
            <div className="guide-card mb-4 font-mono text-[0.9rem]">
              <ul className="space-y-1">
                <li><strong className="text-text font-sans">Name</strong></li>
                <li><strong className="text-text font-sans">Title / Level</strong> (Senior Software Engineer, Backend)</li>
                <li><strong className="text-text font-sans">Location</strong> | Remote | Email | LinkedIn | GitHub</li>
                <li className="pt-2 border-t border-border mt-2"><strong className="text-text font-sans">Summary</strong> (3–4 lines)</li>
                <li><strong className="text-text font-sans">Skills</strong> (tight, relevant)</li>
                <li><strong className="text-text font-sans">Experience</strong> (most important): Company → Role | Dates → Impact-driven bullets</li>
                <li><strong className="text-text font-sans">Education</strong> (short)</li>
                <li><strong className="text-text font-sans">Optional:</strong> Talks, Open Source, Writing</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="summary" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>3</span>
              <h2 className="guide-section-title">The Summary (This Matters More Than You Think)</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              This is where senior engineers usually fail.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Bad summary</div>
                <p className="text-[0.9rem] m-0 italic">&ldquo;Experienced software engineer with a passion for building scalable systems.&rdquo; This says nothing.</p>
              </div>
              <div className="guide-callout guide-callout-tip">
                <div className="guide-callout-label">Good summary</div>
                <p className="text-[0.9rem] m-0">3–4 lines answering: What kind of engineer are you? What scale/scope have you worked at? What are you particularly good at?</p>
              </div>
            </div>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Example</div>
              <div className="guide-card-desc">If someone only reads this, they should already know whether to keep going.</div>
              <p className="text-[0.9rem] text-text leading-[1.6] m-0">
                Senior software engineer with 10+ years of experience building high-traffic web platforms and backend services. Strong background in TypeScript, distributed systems, and developer experience. Known for debugging complex production issues, improving performance, and collaborating across product and platform teams.
              </p>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="skills" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>4</span>
              <h2 className="guide-section-title">Skills Section (Don&apos;t List Everything)</h2>
            </header>
            <div className="guide-callout guide-callout-key mb-6">
              <div className="guide-callout-label">The rule</div>
              If you wouldn&apos;t confidently talk about it in an interview right now, don&apos;t list it.
            </div>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-3">Grouped, concise, honest. Example:</p>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Good skills section</div>
              <ul>
                <li><strong>Languages:</strong> TypeScript, JavaScript, Python, SQL</li>
                <li><strong>Backend:</strong> Node.js, REST APIs, GraphQL, PostgreSQL, Redis</li>
                <li><strong>Frontend:</strong> React, Next.js, SSR, Performance Optimization</li>
                <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda), Docker, CI/CD</li>
                <li><strong>Practices:</strong> System Design, Debugging, Observability, Testing</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-warning">
              <div className="guide-callout-label">Avoid</div>
              <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                <li>&ldquo;Familiar with…&rdquo;</li>
                <li>Laundry lists of frameworks</li>
                <li>Obsolete tools unless directly relevant</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="experience" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>5</span>
              <h2 className="guide-section-title">Experience: This Is Where Most Resumes Struggle</h2>
            </header>
            <div className="guide-callout guide-callout-key mb-6">
              <div className="guide-callout-label">The golden rule</div>
              Bullets should describe impact, not responsibilities.
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="guide-card">
                <div className="guide-card-title text-bad">Bad</div>
                <p className="text-[0.9rem] m-0">Worked on backend services using Node.js.</p>
              </div>
              <div className="guide-card">
                <div className="guide-card-title text-muted">Better</div>
                <p className="text-[0.9rem] m-0">Built and maintained Node.js APIs supporting thousands of daily users.</p>
              </div>
              <div className="guide-card">
                <div className="guide-card-title text-good">Best</div>
                <p className="text-[0.9rem] m-0">Designed and maintained Node.js APIs handling 50k+ daily requests, improving response times by ~40% through caching and query optimization.</p>
              </div>
            </div>
            <div className="guide-card mb-4">
              <div className="guide-card-title">A simple bullet formula: Action + System + Outcome</div>
              <div className="guide-card-desc">Action: Designed, led, implemented, refactored, migrated. System: APIs, frontend app, pipeline, platform. Outcome: Scale, performance, reliability, cost, DX.</div>
            </div>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Senior-level signals interviewers look for</div>
              <div className="guide-card-desc">Make sure some bullets show these; you don&apos;t need all, but you need some.</div>
              <ul>
                <li>Ownership</li>
                <li>Ambiguity</li>
                <li>Tradeoffs</li>
                <li>Mentorship</li>
                <li>Incident response</li>
                <li>Cross-team work</li>
              </ul>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Example bullets</div>
              <ul>
                <li>Led a migration from X to Y, reducing operational overhead</li>
                <li>Debugged and resolved production incidents affecting revenue</li>
                <li>Collaborated with product and design to scope tradeoffs</li>
                <li>Mentored junior engineers through code reviews and pairing</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="metrics" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>6</span>
              <h2 className="guide-section-title">Metrics (Without Stretching)</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              You don&apos;t need perfect numbers. Approximations are fine:
            </p>
            <ul className="list-disc pl-6 text-text text-[0.95rem] leading-[1.6] mb-4 space-y-1">
              <li>&ldquo;~30%&rdquo;</li>
              <li>&ldquo;tens of thousands&rdquo;</li>
              <li>&ldquo;millions of requests per month&rdquo;</li>
              <li>&ldquo;primary revenue path&rdquo;</li>
            </ul>
            <div className="guide-callout guide-callout-tip">
              <div className="guide-callout-label">Key point</div>
              Metrics give credibility and scale.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="long-tenures" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>7</span>
              <h2 className="guide-section-title">Dealing with Long Tenures at One Company</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              This is common and not a problem if framed well.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">What not to do</div>
                <p className="text-[0.9rem] m-0">One role, 12 years, 4 bullets.</p>
              </div>
              <div className="guide-callout guide-callout-tip">
                <div className="guide-callout-label">What to do</div>
                <p className="text-[0.9rem] m-0">Break it into chapters by role and dates. Each role should show scope expansion, not just time passing.</p>
              </div>
            </div>
            <div className="guide-card">
              <div className="guide-card-title">Example</div>
              <ul>
                <li><strong>Company</strong>: Senior Software Engineer (2020–2024)</li>
                <li>Software Engineer (2016–2020)</li>
                <li>Junior Engineer (2012–2016)</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="leadership" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>8</span>
              <h2 className="guide-section-title">Leadership Without the Manager Title</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              You don&apos;t need &ldquo;Manager&rdquo; to show leadership.
            </p>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Leadership bullets include</div>
              <ul>
                <li>Technical decision-making</li>
                <li>Mentorship</li>
                <li>Driving initiatives</li>
                <li>Incident ownership</li>
                <li>Architecture ownership</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-warning">
              <div className="guide-callout-label">Avoid</div>
              &ldquo;Acted as a technical leader&rdquo;: show it instead.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="open-source" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>9</span>
              <h2 className="guide-section-title">Open Source, Writing, Side Projects (Optional but Powerful)</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              If you have GitHub projects, blog posts, talks, or internal tooling you can describe publicly, add a small section. This is especially helpful for engineers affected by layoffs; it reframes momentum.
            </p>
            <div className="guide-card">
              <div className="guide-card-title">Example section</div>
              <div className="guide-card-desc">Open Source &amp; Writing</div>
              <ul>
                <li>Author of X (link)</li>
                <li>Maintainer of Y (stars/downloads)</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="common-smells" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>10</span>
              <h2 className="guide-section-title">Common Resume Smells (Be Brutal)</h2>
            </header>
            <div className="guide-callout guide-callout-warning">
              <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                <li>Responsibilities instead of outcomes</li>
                <li>Every bullet starts with &ldquo;Worked on&rdquo;</li>
                <li>No mention of scale or impact</li>
                <li>Skills list longer than experience section</li>
                <li>Buzzwords with no evidence</li>
                <li>Overly dense text (walls of bullets)</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="alignment" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>11</span>
              <h2 className="guide-section-title">Resume vs Interview Alignment (Critical)</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              Your resume should seed interview questions, give you stories to tell, and avoid claims you can&apos;t back up.
            </p>
            <div className="guide-card mb-4">
              <div className="guide-card-title">If you list it, expect questions</div>
              <ul>
                <li>&ldquo;Distributed systems&rdquo; → design questions</li>
                <li>&ldquo;Performance optimization&rdquo; → profiling/debugging</li>
                <li>&ldquo;System design&rdquo; → tradeoffs</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-key">
              <div className="guide-callout-label">Rule</div>
              Never bluff. Depth beats breadth.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="after-layoffs" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>12</span>
              <h2 className="guide-section-title">Especially After Layoffs</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              You do not need to explain the layoff in your resume.
            </p>
            <div className="guide-callout guide-callout-tip">
              <div className="guide-callout-label">In interviews</div>
              <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                <li>Be factual and calm</li>
                <li>Focus on what you shipped and learned</li>
                <li>Avoid venting or blame</li>
              </ul>
              <p className="text-[0.9rem] mt-2 m-0">Most hiring managers understand the market.</p>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="ai-filters" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>14</span>
              <h2 className="guide-section-title">Getting Past AI & Recruiter Filters</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-6">
              This is very real, and it&apos;s quietly reshaping how resumes are read and rejected. The advice here is counter-intuitive and especially important for engineers coming out of layoffs.
            </p>

            <h3 className="text-lg font-semibold text-text mt-6 mb-3">The Resume Flood & the Rise of Fake / AI-Generated Resumes</h3>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              Hiring teams are dealing with massive applicant volume, AI-generated resumes optimized for keyword matching, exaggerated or fabricated experience, identical bullet structures, and overly polished but hollow content. As a result, trust is low.
            </p>
            <div className="guide-callout guide-callout-quote mb-6">
              <div className="guide-callout-label">The question has shifted</div>
              Recruiters are no longer asking &ldquo;Does this candidate meet the requirements?&rdquo; They&apos;re asking: &ldquo;Is this resume real?&rdquo;
            </div>

            <h3 className="text-lg font-semibold text-text mt-6 mb-3">How Resumes Are Being Filtered Today</h3>
            <div className="space-y-4 mb-6">
              <div className="guide-card">
                <div className="guide-card-title">1. Automated Filters (ATS)</div>
                <div className="guide-card-desc">Still exist, but they are not the final gate. They check keywords, match job titles, filter out obvious mismatches. They do not decide who gets hired.</div>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">2. Recruiter &ldquo;Scent Test&rdquo; (10–30 seconds)</div>
                <div className="guide-card-desc">This is where most resumes die.</div>
                <ul>
                  <li>Recruiters scan for: plausibility, consistency, specificity, human tone</li>
                  <li>Anything that smells synthetic gets dropped</li>
                </ul>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">3. Hiring Manager Skepticism (Higher Than Ever)</div>
                <ul>
                  <li>Looking for grounded detail</li>
                  <li>Cross-checking claims against system complexity</li>
                  <li>Probing &ldquo;too perfect&rdquo; resumes in interviews</li>
                </ul>
                <p className="text-muted text-[0.9rem] mt-2 m-0">Over-optimized resumes perform worse now.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text mt-6 mb-3">Red Flags That Trigger &ldquo;Fake Resume&rdquo; Suspicion</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Over-generic bullets</div>
                <p className="text-[0.9rem] m-0 italic">&ldquo;Designed scalable microservices to improve system performance.&rdquo; Could describe anything.</p>
              </div>
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Impossibly broad skill sets</div>
                <p className="text-[0.9rem] m-0">&ldquo;Expert in React, Angular, Vue, Node, Java, Python, Go, Rust, AWS, GCP, Azure, Kubernetes, ML, AI…&rdquo; No one believes this.</p>
              </div>
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Perfect symmetry</div>
                <p className="text-[0.9rem] m-0">Every bullet the same length, identical sentence structures, repetitive verbs. AI smell.</p>
              </div>
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Buzzword density with no anchors</div>
                <p className="text-[0.9rem] m-0">&ldquo;Leveraged cloud-native paradigms to drive enterprise-grade digital transformation.&rdquo; Instant rejection.</p>
              </div>
            </div>
            <div className="guide-card mb-4">
              <div className="guide-card-title">Claims that don&apos;t match role level</div>
              <ul>
                <li>Junior engineers claiming system-wide architecture</li>
                <li>ICs claiming product ownership without context</li>
                <li>&ldquo;Led company-wide strategy&rdquo; without reporting lines</li>
              </ul>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="standing-out" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>15</span>
              <h2 className="guide-section-title">How Real Engineers Can Stand Out (Ethically)</h2>
            </header>
            <div className="guide-callout guide-callout-key mb-6">
              <div className="guide-callout-label">The twist</div>
              Being slightly imperfect helps you. Specificity and honesty signal reality.
            </div>

            <div className="space-y-6">
              <div className="guide-card">
                <div className="guide-card-title">1. Be specific in uncomfortable ways</div>
                <div className="guide-card-desc">Specificity signals reality.</div>
                <p className="text-[0.9rem] mb-2">Instead of: &ldquo;Improved performance significantly.&rdquo;</p>
                <p className="text-[0.9rem] text-good m-0">Say: &ldquo;Tracked down a slow query causing timeouts under peak load and reduced p95 latency from ~900ms to ~250ms.&rdquo; Even approximate numbers feel real.</p>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">2. Reference constraints and tradeoffs</div>
                <div className="guide-card-desc">Fake resumes avoid constraints. Real engineers live in them: legacy systems, partial migrations, incomplete data, time pressure.</div>
                <p className="text-[0.9rem] text-good m-0">Example: &ldquo;Balanced performance improvements with backward compatibility for existing clients.&rdquo; This screams &ldquo;real job.&rdquo;</p>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">3. Use human language, not corporate copy</div>
                <p className="text-[0.9rem] mb-2">Good: &ldquo;Debugged intermittent production issues caused by shared mutable state in async code.&rdquo;</p>
                <p className="text-[0.9rem] text-bad m-0">Bad: &ldquo;Optimized asynchronous workflows to enhance system reliability.&rdquo;</p>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">4. Let your resume seed questions, not answers</div>
                <div className="guide-card-desc">Great resumes make interviewers curious.</div>
                <ul>
                  <li>&ldquo;Handled on-call rotations for checkout flows during peak traffic&rdquo;</li>
                  <li>&ldquo;Migrated part of a monolith to services while keeping deploys safe&rdquo;</li>
                </ul>
              </div>
              <div className="guide-card">
                <div className="guide-card-title">5. Imperfect coverage is better than fake breadth</div>
                <p className="text-[0.9rem] m-0">It&apos;s okay to say you focused on backend, didn&apos;t own frontend, or partnered with another team. Credibility beats completeness.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-text mt-8 mb-3">Practical tactics to avoid the AI resume trap</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="guide-callout guide-callout-warning">
                <div className="guide-callout-label">Avoid these patterns</div>
                <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                  <li>Bullet templates copied across roles</li>
                  <li>GPT-style phrasing (&ldquo;leveraged&rdquo;, &ldquo;spearheaded&rdquo;, &ldquo;robust&rdquo;)</li>
                  <li>Excessive adjective stacking</li>
                  <li>Generic summaries</li>
                </ul>
              </div>
              <div className="guide-callout guide-callout-tip">
                <div className="guide-callout-label">Do these instead</div>
                <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                  <li>Vary sentence structure</li>
                  <li>Include concrete nouns</li>
                  <li>Reference actual system parts</li>
                  <li>Mention incidents, migrations, failures</li>
                </ul>
                <p className="text-[0.9rem] mt-2 m-0">Failure stories (framed well) are powerful.</p>
              </div>
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="ai-interviews" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>16</span>
              <h2 className="guide-section-title">Interview Alignment & Advice for This Era</h2>
            </header>
            <div className="guide-card mb-6">
              <div className="guide-card-title">Interview alignment is now critical</div>
              <div className="guide-card-desc">Because of fake resumes, interviews now drill deeper, ask &ldquo;why&rdquo; more often, probe edge cases, and test debugging skill explicitly. If your resume claims depth, expect depth to be tested.</div>
            </div>

            <div className="guide-callout guide-callout-tip mb-6">
              <div className="guide-callout-label">For engineers impacted by layoffs</div>
              <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                <li>You are competing against noise; being real is now an advantage</li>
                <li>You don&apos;t need to embellish</li>
                <li>Calm confidence stands out</li>
              </ul>
              <p className="text-[0.9rem] mt-2 m-0">Hiring managers want to find real engineers again.</p>
            </div>

            <div className="guide-callout guide-callout-key mb-6">
              <div className="guide-callout-label">Counter-intuitive tip (very effective)</div>
              Add one bullet per role that only a real teammate would write. Example: &ldquo;Regularly partnered with product to push back on scope when reliability or performance was at risk.&rdquo; AI rarely writes that.
            </div>

            <div className="guide-callout guide-callout-quote">
              <div className="guide-callout-label">Final opinion</div>
              The era of &ldquo;perfect resumes&rdquo; is ending. The next phase rewards credible detail, honest scope, clear thinking, and human language. In a sea of synthetic resumes, sounding like an actual engineer is now a competitive advantage.
            </div>
          </section>

          <hr className="border-border my-10" />

          <section id="ai-review" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>17</span>
              <h2 className="guide-section-title">Using AI to Review Your Resume</h2>
            </header>
            <p className="text-text text-[0.95rem] leading-[1.6] mb-4">
              You can use an LLM to get a hiring-manager-style critique of your resume. The goal is feedback that stresses credibility and clarity, not polish. Use a prompt that assumes a skeptical reader and asks for structured, actionable feedback without rewriting your content.
            </p>
            <div className="guide-card mb-4">
              <div className="guide-card-title">How to use it</div>
              <ol className="list-decimal pl-5 space-y-1 text-[0.9rem] m-0">
                <li>Copy the prompt below.</li>
                <li>Paste it into your preferred AI tool (e.g. Claude, ChatGPT).</li>
                <li>Replace <code className="px-1 py-0.5 rounded bg-border text-[0.85em] font-mono">[PASTE RESUME HERE]</code> with your resume text.</li>
                <li>Run the prompt and use the critique to tighten language, add specificity, and fix red flags. Do not ask the model to invent new accomplishments.</li>
              </ol>
            </div>
            <div className="guide-callout guide-callout-tip mb-4">
              <div className="guide-callout-label">Why this prompt works</div>
              It frames the AI as a skeptical hiring manager in the current market, evaluates credibility and seniority signals, and asks for concrete improvements without rewriting. It explicitly tells the model not to add accomplishments that aren&apos;t there.
            </div>
            <p className="text-muted text-[0.875rem] mb-2">Prompt (copy the entire block):</p>
            <pre className="bg-surface border border-border rounded-[var(--radius-card)] p-4 text-[0.8rem] font-mono text-text leading-[1.5] overflow-x-auto whitespace-pre-wrap break-words">
              {RESUME_REVIEW_PROMPT}
            </pre>
          </section>

          <hr className="border-border my-10" />

          <section id="final-advice" className="mb-10 scroll-mt-8">
            <header className="guide-section-header">
              <span className="guide-section-num" aria-hidden>13</span>
              <h2 className="guide-section-title">Final Opinionated Advice</h2>
            </header>
            <div className="guide-callout guide-callout-key mb-6">
              <ul className="list-none pl-0 space-y-1 text-[0.9rem] m-0">
                <li>Your resume should feel confident, not defensive</li>
                <li>Senior engineers are evaluated on judgment and impact</li>
                <li>Clear writing signals clear thinking</li>
                <li>Fewer, stronger bullets beat many weak ones</li>
                <li>If your resume reads like Jira tickets, rewrite it</li>
              </ul>
            </div>
            <div className="guide-callout guide-callout-quote">
              <div className="guide-callout-label">Closing thought</div>
              Your resume is not a job history; it&apos;s the thing that gets you the conversation.
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
