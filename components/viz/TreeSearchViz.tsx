'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentNode, TreeExample } from '@/lib/types';
import { treeSearchSteps, treeSearchStepsCollector, type TreeSearchStep } from '@/lib/viz/treeSearchSteps';

const DEFAULT_TREE: TreeExample = {
  tree: {
    id: 'root',
    type: 'Page',
    children: [
      {
        id: 'header',
        type: 'Header',
        children: [
          { id: 'logo', type: 'Image' },
          { id: 'nav', type: 'Nav' },
        ],
      },
      {
        id: 'content',
        type: 'Section',
        children: [
          { id: 'hero', type: 'Image' },
          { id: 'cta', type: 'Button' },
        ],
      },
    ],
  },
  targetType: 'Image',
};

interface TreeSearchVizProps {
  mode: 'reduce' | 'accumulator' | 'collector';
  example?: TreeExample;
}

function TreeNode({
  node,
  currentId,
  depth,
}: {
  node: ComponentNode;
  currentId: string | null;
  depth: number;
}) {
  const isCurrent = currentId === node.id;
  return (
    <div className="mb-1" style={{ marginLeft: depth * 16 }}>
      <div className={`inline-flex items-center gap-2 py-1 px-2 rounded-[var(--radius-sm)] bg-bg border border-border transition-[background,border-color] ${isCurrent ? 'bg-accent/20 border-accent text-accent' : ''}`}>
        <span className="font-medium">{node.type}</span>
        <span className="text-muted text-[0.8em]">{node.id}</span>
      </div>
      {node.children?.map((child) => (
        <TreeNode
          key={child.id}
          node={child}
          currentId={currentId}
          depth={depth + 1}
        />
      ))}
    </div>
  );
}

export function TreeSearchViz({ mode, example = DEFAULT_TREE }: TreeSearchVizProps) {
  const { tree, targetType } = example;
  const [step, setStep] = useState<TreeSearchStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const genRef = useRef<Generator<TreeSearchStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getGenerator = useCallback(
    () => (mode === 'collector' ? treeSearchStepsCollector(tree, targetType) : treeSearchSteps(tree, targetType)),
    [mode, tree, targetType]
  );

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = getGenerator();
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [getGenerator]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = getGenerator();
    const first = genRef.current.next();
    if (!first.done) setStep(first.value);
  }, [getGenerator]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = getGenerator();
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [getGenerator]);

  const playPause = useCallback(() => {
    setPlaying((p) => !p);
  }, []);

  const delayMs = 200 + 1200 - speed; // higher slider = faster (lower delay)

  useEffect(() => {
    if (!playing) return;
    function tick() {
      const continuePlaying = runStep();
      if (continuePlaying) timeoutRef.current = setTimeout(tick, delayMs);
    }
    timeoutRef.current = setTimeout(tick, delayMs);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playing, speed, delayMs, runStep]);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when example changes
  }, [tree, targetType]);

  const currentId = step?.type === 'visit' ? step.node.id : null;
  const resultSoFar = step?.type === 'visit' ? step.resultSoFar : step?.type === 'done' ? step.result : [];
  const matches = step?.type === 'done' ? step.matches : null;
  const statusMessage =
    step?.type === 'visit'
      ? mode === 'reduce'
        ? `Spreading into accumulator… (copying ${resultSoFar.length} nodes)`
        : mode === 'collector'
          ? (step.node.type === targetType ? 'Match: add to collector' : 'Skip')
          : 'Push to result'
      : step?.type === 'done'
        ? `Done. Found ${matches?.length ?? 0} match(es) for "${targetType}"`
        : '—';

  return (
    <div className="font-mono text-[0.9rem]">
      <div className="flex gap-8 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <div className="text-muted text-[0.8rem] mb-2">Component tree</div>
          <TreeNode node={tree} currentId={currentId} depth={0} />
        </div>
        <div className="flex-1 min-w-[200px]">
          <div className="text-muted text-[0.8rem] mb-2">
            {step?.type === 'done'
              ? `Matches for "${targetType}"`
              : mode === 'collector'
                ? 'Matches (collector)'
                : 'Result (traversal order)'}
          </div>
          <div className="flex flex-col gap-1 min-h-[80px]">
            {(step?.type === 'done' ? matches : resultSoFar)?.map((n) => (
              <div
                key={n.id}
                className={`inline-flex items-center gap-2 py-1 px-2 rounded-[var(--radius-sm)] bg-bg border border-border w-fit ${
                  n.id === currentId ? 'border-accent bg-accent/15' : ''
                } ${n.type === targetType ? 'border-good bg-good/10' : ''}`}
              >
                <span className="font-medium">{n.type}</span>
                <span className="text-muted text-[0.8em]">{n.id}</span>
              </div>
            ))}
            {!step && <span className="text-muted">—</span>}
          </div>
        </div>
      </div>
      <div className={`mt-4 py-2 px-3 bg-bg rounded-[var(--radius-sm)] text-[0.85rem] text-muted ${step?.type === 'done' ? 'text-good bg-good/10' : ''}`}>
        {statusMessage}
      </div>
      <div className="flex items-center gap-3 mt-4 flex-wrap">
        <button
          type="button"
          className="py-2 px-4 rounded-[var(--radius-sm)] bg-accent border border-accent text-bg font-sans text-[0.9rem] cursor-pointer hover:bg-accent-dim hover:border-accent-dim"
          onClick={playPause}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          className="py-2 px-4 rounded-[var(--radius-sm)] border border-border bg-bg text-text font-sans text-[0.9rem] cursor-pointer transition-[border-color,background] hover:border-accent hover:bg-accent/10"
          onClick={stepOnce}
        >
          Step
        </button>
        <button
          type="button"
          className="py-2 px-4 rounded-[var(--radius-sm)] border border-border bg-bg text-text font-sans text-[0.9rem] cursor-pointer transition-[border-color,background] hover:border-accent hover:bg-accent/10"
          onClick={reset}
        >
          Reset
        </button>
        <span className="text-[0.85rem] text-muted">Speed:</span>
        <input
          type="range"
          min={200}
          max={1200}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-[100px] accent-accent"
        />
      </div>
    </div>
  );
}
