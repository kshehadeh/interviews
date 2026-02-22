import Link from 'next/link';
import { FRONTEND_CONCEPTS, slugify } from './data';
import { ConceptsSidebar } from './ConceptsSidebar';
import { ConceptExtras } from './ConceptExtras';

const tocEntries = FRONTEND_CONCEPTS.map(({ title }) => ({
  id: slugify(title),
  title,
}));

export default function FrontendConceptsPage() {
  return (
    <div className="flex gap-10 w-full max-w-[1200px]">
      <ConceptsSidebar entries={tocEntries} basePath="/concepts/frontend" />
      <main className="min-w-0 flex-1">
        <Link className="mb-6 text-[0.9rem] text-muted block" href="/concepts">
          ← Back to concepts
        </Link>
        <h1 className="text-2xl font-semibold mt-0 mb-2 tracking-tight">
          Frontend & Web Platform Concepts
        </h1>
        <p className="text-muted text-[0.95rem] mb-10">
          One-paragraph explanations of key concepts.
        </p>
        <div className="space-y-10">
          {FRONTEND_CONCEPTS.map(({ title, body, example, exampleCode, exampleCodeLang, references }) => (
            <section
              key={slugify(title)}
              id={slugify(title)}
              className="scroll-mt-24"
            >
              <h2 className="text-[1.1rem] font-semibold mt-0 mb-2 text-text">
                {title}
              </h2>
              <p className="text-muted text-[0.95rem] my-0 leading-relaxed">
                {body}
              </p>
              <ConceptExtras
                example={example}
                exampleCode={exampleCode}
                exampleCodeLang={exampleCodeLang}
                references={references}
              />
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}
