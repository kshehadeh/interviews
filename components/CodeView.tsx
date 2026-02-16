'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeViewProps {
  code: string;
}

export function CodeView({ code }: CodeViewProps) {
  return (
    <div className="code-view">
      <SyntaxHighlighter
        language="typescript"
        style={oneDark}
        showLineNumbers
        customStyle={{
          margin: 0,
          padding: '1rem 1rem 1rem 0',
          background: 'transparent',
          fontSize: '0.85rem',
          lineHeight: 1.5,
        }}
        codeTagProps={{
          style: { fontFamily: 'var(--font-mono)' },
        }}
        lineNumberStyle={{
          minWidth: '2.5rem',
          paddingRight: '1rem',
          color: 'var(--muted)',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
