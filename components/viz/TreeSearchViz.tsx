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
    <div className="tree-node-wrap" style={{ marginLeft: depth * 16 }}>
      <div className={`tree-node ${isCurrent ? 'current' : ''}`}>
        <span className="tree-node-type">{node.type}</span>
        <span className="tree-node-id">{node.id}</span>
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

  useEffect(() => {
    if (!playing) return;
    function tick() {
      const continuePlaying = runStep();
      if (continuePlaying) timeoutRef.current = setTimeout(tick, speed);
    }
    timeoutRef.current = setTimeout(tick, speed);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [playing, speed, runStep]);

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
    <div className="tree-search-viz">
      <div className="tree-search-row">
        <div className="tree-panel">
          <div className="tree-label">Component tree</div>
          <TreeNode node={tree} currentId={currentId} depth={0} />
        </div>
        <div className="tree-result-panel">
          <div className="tree-label">
            {step?.type === 'done'
              ? `Matches for "${targetType}"`
              : mode === 'collector'
                ? 'Matches (collector)'
                : 'Result (traversal order)'}
          </div>
          <div className="tree-result-list">
            {(step?.type === 'done' ? matches : resultSoFar)?.map((n) => (
              <div
                key={n.id}
                className={`tree-result-item ${n.type === targetType ? 'match' : ''} ${n.id === currentId ? 'current' : ''}`}
              >
                <span className="tree-node-type">{n.type}</span>
                <span className="tree-node-id">{n.id}</span>
              </div>
            ))}
            {!step && <span className="tree-result-empty">—</span>}
          </div>
        </div>
      </div>
      <div className={`tree-status ${step?.type === 'done' ? 'done' : ''}`}>
        {statusMessage}
      </div>
      <div className="viz-controls">
        <button type="button" className="primary" onClick={playPause}>
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" onClick={stepOnce}>
          Step
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
        <span className="speed-label">Speed:</span>
        <input
          type="range"
          min={200}
          max={1200}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
