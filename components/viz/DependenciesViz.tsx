'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DependenciesExample } from '@/lib/types';
import {
  dependenciesSteps,
  type DependenciesStep,
} from '@/lib/viz/dependenciesSteps';

const DEFAULT_EXAMPLE: DependenciesExample = {
  modules: ['app', 'ui', 'utils'],
  deps: [
    ['app', 'ui'],
    ['ui', 'utils'],
  ],
};

interface DependenciesVizProps {
  example?: DependenciesExample;
}

function NodeBadge({
  name,
  inDegree,
  isInQueue,
  isCurrent,
  isInOrder,
}: {
  name: string;
  inDegree: number;
  isInQueue: boolean;
  isCurrent: boolean;
  isInOrder: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 py-1.5 px-2.5 rounded-[var(--radius-sm)] border font-mono text-[0.9rem] transition-[background,border-color,color] ${
        isCurrent
          ? 'bg-accent/25 border-accent text-accent'
          : isInOrder
            ? 'bg-good/15 border-good/50 text-good'
            : isInQueue
              ? 'bg-amber-500/15 border-amber-500/50 text-amber-400'
              : 'bg-bg border-border text-muted'
      }`}
    >
      {name}
      <span className="text-[0.75rem] opacity-80">in={inDegree}</span>
    </span>
  );
}

export function DependenciesViz({ example = DEFAULT_EXAMPLE }: DependenciesVizProps) {
  const { modules, deps } = example;
  const [step, setStep] = useState<DependenciesStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(700);
  const genRef = useRef<Generator<DependenciesStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = dependenciesSteps(modules, deps);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [modules, deps]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = dependenciesSteps(modules, deps);
    const first = genRef.current.next();
    setStep(first.done ? null : first.value);
  }, [modules, deps]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = dependenciesSteps(modules, deps);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [modules, deps]);

  const playPause = useCallback(() => {
    if (playing) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
  }, [playing]);

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
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [modules, deps, reset]);

  const all = step && (step.type === 'init' || step.type === 'process') ? step.all : [];
  const inDegree = step && (step.type === 'init' || step.type === 'process') ? step.inDegree : new Map<string, number>();
  const queue = step && (step.type === 'init' || step.type === 'process') ? step.queue : [];
  const order = step && (step.type === 'init' || step.type === 'process') ? step.order : step?.type === 'done' ? step.order : [];
  const currentNode = step?.type === 'process' ? step.node : null;

  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-3">
        <span className="inline-block text-muted text-[0.8rem] mb-1.5">Dependencies (a → b means a depends on b)</span>
        <div className="flex flex-wrap gap-2">
          {deps.map(([a, b], i) => (
            <span
              key={i}
              className="py-1 px-2 rounded bg-bg border border-border text-[0.85rem] text-muted"
            >
              {a} → {b}
            </span>
          ))}
        </div>
      </div>

      {all.length > 0 && (
        <div className="mb-3">
          <span className="inline-block text-muted text-[0.8rem] mb-1.5">Nodes (in-degree)</span>
          <div className="flex flex-wrap gap-2">
            {all.map((name) => (
              <NodeBadge
                key={name}
                name={name}
                inDegree={inDegree.get(name) ?? 0}
                isInQueue={queue.includes(name)}
                isCurrent={name === currentNode}
                isInOrder={order.includes(name)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-3 py-2 px-3 bg-bg rounded-[var(--radius-sm)] border border-border">
        <span className="text-muted text-[0.8rem]">Queue (indegree 0): </span>
        <span className="font-medium">
          {queue.length ? queue.join(' → ') : '—'}
        </span>
      </div>

      <div className="mb-4 py-2 px-3 bg-good/10 border border-good/30 rounded-[var(--radius-sm)]">
        <span className="text-muted text-[0.8rem]">Order: </span>
        <span className="font-medium text-good">
          {order.length ? order.join(' → ') : '—'}
        </span>
      </div>

      {step?.type === 'done' && (
        <div
          className={`py-2 px-3 rounded-[var(--radius-sm)] text-[0.9rem] border mb-4 ${
            step.success
              ? 'bg-good/15 text-good border-good/40'
              : 'bg-bad/15 text-bad border-bad/40'
          }`}
        >
          {step.success
            ? `Done. Valid order: ${step.order.join(' → ')}`
            : 'Cycle detected — no valid order.'}
        </div>
      )}

      <div className="flex items-center gap-3 flex-wrap">
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
      <p className="mt-4 text-[0.85rem] text-muted">
        See also:{' '}
        <a
          href="https://www.cs.usfca.edu/~galles/visualization/TopoSortIndegree.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          Topological Sort (Indegree) visualization
        </a>{' '}
        — USFCA
      </p>
    </div>
  );
}
