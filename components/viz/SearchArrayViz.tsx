'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SearchArrayExample } from '@/lib/types';
import { searchArraySteps, type SearchArrayStep } from '@/lib/viz/searchArraySteps';

const DEFAULT_EXAMPLE: SearchArrayExample = {
  arr: Array.from({ length: 100 }, (_, i) => i + 1),
  target: 81,
};

interface SearchArrayVizProps {
  example?: SearchArrayExample;
}

function ArrayRow({
  values,
  labels,
  left,
  right,
  mid,
}: {
  values: number[];
  labels?: string[];
  left?: number;
  right?: number;
  mid?: number;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-1">
      {values.map((v, idx) => {
        const isLeft = idx === left;
        const isRight = idx === right;
        const isMid = idx === mid;
        let cellClass =
          'min-w-[2.25rem] py-1.5 px-2 rounded-[var(--radius-sm)] border text-center font-mono text-[0.9rem] transition-colors ';
        if (isMid) {
          cellClass += 'bg-accent/25 border-accent text-accent';
        } else if (isLeft) {
          cellClass += 'bg-good/20 border-good/50 text-good';
        } else if (isRight) {
          cellClass += 'bg-bad/20 border-bad/50 text-bad';
        } else {
          cellClass += 'bg-bg border-border';
        }
        return (
          <div key={idx} className="flex flex-col items-center gap-0.5">
            {labels && labels[idx] !== undefined && labels[idx] !== '' && (
              <span className="text-[0.65rem] text-muted font-mono">{labels[idx]}</span>
            )}
            <div className={cellClass}>{v}</div>
          </div>
        );
      })}
    </div>
  );
}

export function SearchArrayViz({ example = DEFAULT_EXAMPLE }: SearchArrayVizProps) {
  const { arr } = example;
  const [target, setTarget] = useState(example.target);
  const [step, setStep] = useState<SearchArrayStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const genRef = useRef<Generator<SearchArrayStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setTarget(example.target);
  }, [example.target]);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = searchArraySteps(arr, target);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [arr, target]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = searchArraySteps(arr, target);
    const first = genRef.current.next();
    setStep(first.done ? null : first.value);
  }, [arr, target]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = searchArraySteps(arr, target);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [arr, target]);

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
  }, [arr, target, reset]);

  const isStep = step?.type === 'step';
  const labels = arr.map((_, i) => {
    if (!isStep) return String(i);
    if (i === step.left) return 'L';
    if (i === step.right) return 'R';
    if (i === step.mid) return 'mid';
    return String(i);
  });

  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-2 text-[0.8rem] text-muted">
        Binary search: mid = (L+R)/2; if arr[mid] === target → found; else narrow [L, R].
      </div>

      <div className="mb-2 flex items-center gap-2">
        <label htmlFor="search-array-target" className="text-muted text-[0.8rem]">
          Target:
        </label>
        <input
          id="search-array-target"
          type="number"
          min={arr[0]}
          max={arr[arr.length - 1]}
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          className="w-20 py-1 px-2 rounded-[var(--radius-sm)] border border-border bg-bg font-mono text-[0.9rem] accent-accent"
        />
      </div>

      <div className="mb-4">
        <span className="inline-block w-20 text-muted text-[0.8rem] mb-1.5">Array</span>
        <ArrayRow
          values={arr}
          labels={labels}
          left={isStep ? step.left : undefined}
          right={isStep ? step.right : undefined}
          mid={isStep ? step.mid : undefined}
        />
        {isStep && (
          <div className="mt-1.5 text-[0.8rem] text-muted">
            mid = {step.mid}, arr[mid] = {arr[step.mid]} vs target {target} →{' '}
            {step.comparison === 'equal' && <span className="text-good font-medium">equal (found)</span>}
            {step.comparison === 'less' && (
              <span className="text-muted font-medium">less → L = mid + 1</span>
            )}
            {step.comparison === 'greater' && (
              <span className="text-muted font-medium">greater → R = mid − 1</span>
            )}
          </div>
        )}
      </div>

      {step?.type === 'found' && (
        <div className="py-2 px-3 rounded-[var(--radius-sm)] bg-good/15 text-good text-[0.9rem] border border-good/40 mb-4">
          Found at index {step.index}.
        </div>
      )}
      {step?.type === 'notFound' && (
        <div className="py-2 px-3 rounded-[var(--radius-sm)] bg-bad/15 text-bad text-[0.9rem] border border-bad/40 mb-4">
          Not found (return -1).
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

      <div className="mt-3 flex gap-4 text-[0.75rem] text-muted">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-good/50 bg-good/20" /> L (left)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-bad/50 bg-bad/20" /> R (right)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-accent bg-accent/25" /> mid
        </span>
      </div>
    </div>
  );
}
