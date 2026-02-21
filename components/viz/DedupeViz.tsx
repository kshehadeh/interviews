'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DedupeExample, DedupeItem } from '@/lib/types';
import { dedupeSteps, type DedupeStep } from '@/lib/viz/dedupeSteps';

const DEFAULT_EXAMPLE: DedupeExample = {
  items: [
    { id: 'a', title: 'Post A', timestamp: 1 },
    { id: 'b', title: 'Post B', timestamp: 2 },
    { id: 'a', title: 'Post A (duplicate)', timestamp: 3 },
    { id: 'c', title: 'Post C', timestamp: 4 },
    { id: 'b', title: 'Post B (duplicate)', timestamp: 5 },
  ],
};

interface DedupeVizProps {
  example?: DedupeExample;
}

function ItemRow({
  item,
  isCurrent,
  action,
}: {
  item: DedupeItem;
  isCurrent: boolean;
  action?: 'skip' | 'add';
}) {
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-[var(--radius-sm)] border transition-[background,border-color,color] ${
        isCurrent ? 'bg-accent/20 border-accent text-accent' : 'bg-bg border-border'
      }`}
    >
      <span className="font-mono font-medium w-6">{item.id}</span>
      <span className="flex-1 truncate text-[0.9rem]">{item.title}</span>
      <span className="text-muted text-[0.8rem]">t={item.timestamp}</span>
      {action === 'skip' && (
        <span className="text-bad text-[0.8rem] font-medium">skip (duplicate)</span>
      )}
      {action === 'add' && (
        <span className="text-good text-[0.8rem] font-medium">add</span>
      )}
    </div>
  );
}

export function DedupeViz({ example = DEFAULT_EXAMPLE }: DedupeVizProps) {
  const items = example.items;
  const [step, setStep] = useState<DedupeStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const genRef = useRef<Generator<DedupeStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = dedupeSteps(items);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [items]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = dedupeSteps(items);
    const first = genRef.current.next();
    setStep(first.done ? null : first.value);
  }, [items]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = dedupeSteps(items);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [items]);

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
  }, [items, reset]);

  const currentIndex = step && step.type === 'step' ? step.index : -1;
  const currentAction = step && step.type === 'step' ? step.action : null;
  const mapKeys = step && step.type === 'step' ? step.mapKeys : [];
  const resultItems = step && step.type === 'step' ? step.result : step && step.type === 'done' ? step.result : [];

  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-3">
        <span className="inline-block w-24 text-muted text-[0.8rem] mb-1.5">Input</span>
        <div className="flex flex-col gap-1">
          {items.map((item, i) => (
            <ItemRow
              key={`${item.id}-${i}`}
              item={item}
              isCurrent={i === currentIndex}
              action={i === currentIndex ? currentAction ?? undefined : undefined}
            />
          ))}
        </div>
      </div>

      {mapKeys.length > 0 && (
        <div className="mb-3 py-2 px-3 bg-bg rounded-[var(--radius-sm)] border border-border">
          <span className="text-muted text-[0.8rem]">Map keys seen: </span>
          <span className="font-medium">{mapKeys.join(', ') || '—'}</span>
        </div>
      )}

      <div className="mb-4">
        <span className="inline-block w-24 text-muted text-[0.8rem] mb-1.5">Output</span>
        <div className="flex flex-col gap-1 min-h-[2.5rem] py-2 px-3 bg-good/10 border border-good/30 rounded-[var(--radius-sm)]">
          {resultItems.length === 0 && step?.type !== 'done' && (
            <span className="text-muted text-[0.85rem]">(first occurrence of each id)</span>
          )}
          {resultItems.map((item, i) => (
            <div
              key={`out-${item.id}-${i}`}
              className="flex items-center gap-3 py-1.5 px-2 rounded text-[0.9rem] text-good"
            >
              <span className="font-medium w-6">{item.id}</span>
              <span className="flex-1 truncate">{item.title}</span>
              <span className="text-good/80 text-[0.8rem]">t={item.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {step?.type === 'done' && (
        <div className="py-2 px-3 rounded-[var(--radius-sm)] bg-good/15 text-good text-[0.9rem] border border-good/40 mb-4">
          Done. {resultItems.length} unique item(s).
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
    </div>
  );
}
