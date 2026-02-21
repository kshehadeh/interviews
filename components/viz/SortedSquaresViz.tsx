'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { SortedSquaresExample } from '@/lib/types';
import { sortedSquaresSteps, type SortedSquaresStep } from '@/lib/viz/sortedSquaresSteps';

const DEFAULT_EXAMPLE: SortedSquaresExample = {
  input: [-4, -1, 0, 3, 10],
};

interface SortedSquaresVizProps {
  example?: SortedSquaresExample;
}

function ArrayRow({
  values,
  labels,
  highlightIndex,
  highlightIndex2,
  writeIndex,
  emptyPlaceholder = '—',
}: {
  values: (number | undefined)[];
  labels?: string[];
  highlightIndex?: number;
  highlightIndex2?: number;
  writeIndex?: number;
  emptyPlaceholder?: string;
}) {
  return (
    <div className="flex flex-wrap items-baseline gap-1">
      {values.map((v, idx) => {
        const isI = idx === highlightIndex;
        const isJ = idx === highlightIndex2;
        const isP = idx === writeIndex;
        let cellClass =
          'min-w-[2.25rem] py-1.5 px-2 rounded-[var(--radius-sm)] border text-center font-mono text-[0.9rem] transition-colors ';
        if (isP && writeIndex !== undefined) {
          cellClass += 'bg-accent/25 border-accent text-accent';
        } else if (isI) {
          cellClass += 'bg-good/20 border-good/50 text-good';
        } else if (isJ) {
          cellClass += 'bg-bad/20 border-bad/50 text-bad';
        } else {
          cellClass += 'bg-bg border-border';
        }
        return (
          <div key={idx} className="flex flex-col items-center gap-0.5">
            {labels && labels[idx] !== undefined && labels[idx] !== '' && (
              <span className="text-[0.65rem] text-muted font-mono">{labels[idx]}</span>
            )}
            <div className={cellClass}>{v !== undefined ? v : emptyPlaceholder}</div>
          </div>
        );
      })}
    </div>
  );
}

export function SortedSquaresViz({ example = DEFAULT_EXAMPLE }: SortedSquaresVizProps) {
  const nums = example.input;
  const [step, setStep] = useState<SortedSquaresStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const genRef = useRef<Generator<SortedSquaresStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = sortedSquaresSteps(nums);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [nums]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = sortedSquaresSteps(nums);
    const first = genRef.current.next();
    setStep(first.done ? null : first.value);
  }, [nums]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = sortedSquaresSteps(nums);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [nums]);

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
  }, [nums, reset]);

  const isStep = step?.type === 'step';
  const inputLabels = nums.map((_, i) => {
    if (!isStep) return String(i);
    if (i === step.i) return 'i';
    if (i === step.j) return 'j';
    return String(i);
  });

  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-2 text-[0.8rem] text-muted">
        Two pointers: compare |nums[i]| vs |nums[j]|, place larger square at p (fill from end).
      </div>

      <div className="mb-4">
        <span className="inline-block w-20 text-muted text-[0.8rem] mb-1.5">Input nums</span>
        <ArrayRow
          values={nums}
          labels={inputLabels}
          highlightIndex={isStep ? step.i : undefined}
          highlightIndex2={isStep ? step.j : undefined}
        />
        {isStep && (
          <div className="mt-1.5 text-[0.8rem] text-muted">
            |nums[i]|={Math.abs(nums[step.i])}, |nums[j]|={Math.abs(nums[step.j])} → choose{' '}
            <span className={step.chosen === 'i' ? 'text-good font-medium' : 'text-bad font-medium'}>
              {step.chosen}
            </span>
            , square = {step.square} → arr[{step.p}]
          </div>
        )}
      </div>

      <div className="mb-4">
        <span className="inline-block w-20 text-muted text-[0.8rem] mb-1.5">Output arr</span>
        <ArrayRow
          values={
            step?.type === 'step'
              ? step.arr
              : step?.type === 'done'
                ? step.arr
                : Array(nums.length).fill(undefined)
          }
          labels={nums.map((_, i) => String(i))}
          writeIndex={step?.type === 'step' ? step.p : undefined}
          emptyPlaceholder="—"
        />
      </div>

      {step?.type === 'done' && (
        <div className="py-2 px-3 rounded-[var(--radius-sm)] bg-good/15 text-good text-[0.9rem] border border-good/40 mb-4">
          Done. Sorted squares: [{step.arr.join(', ')}]
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
          <span className="w-3 h-3 rounded border border-good/50 bg-good/20" /> i (left)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-bad/50 bg-bad/20" /> j (right)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded border border-accent bg-accent/25" /> p (write)
        </span>
      </div>
    </div>
  );
}
