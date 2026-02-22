'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ConceptExtrasProps = {
  example?: string;
  exampleCode?: string;
  exampleCodeLang?: string;
  references?: readonly { label: string; url: string }[];
};

export function ConceptExtras({
  example,
  exampleCode,
  exampleCodeLang = 'text',
  references,
}: ConceptExtrasProps) {
  const hasExample = example ?? exampleCode;
  const hasRefs = references && references.length > 0;
  if (!hasExample && !hasRefs) return null;

  return (
    <div className="mt-3 space-y-3">
      {example && (
        <p className="text-[0.9rem] text-muted italic my-0">
          <span className="font-medium not-italic text-text/90">Example: </span>
          {example}
        </p>
      )}
      {exampleCode && (
        <div className="rounded-[var(--radius-card)] overflow-hidden border border-border bg-surface">
          <SyntaxHighlighter
            language={exampleCodeLang}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: '0.75rem 1rem',
              background: 'transparent',
              fontSize: '0.8rem',
              lineHeight: 1.5,
            }}
            codeTagProps={{
              style: { fontFamily: 'var(--font-mono)' },
            }}
            PreTag="div"
          >
            {exampleCode}
          </SyntaxHighlighter>
        </div>
      )}
      {hasRefs && (
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem]">
          <span className="text-muted font-medium">References:</span>
          {references!.map(({ label, url }) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
