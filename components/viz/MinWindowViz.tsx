'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MinWindowExample } from '@/lib/types';
import {
  bruteforceSteps,
  optimalSteps,
  type MinWindowStep,
  type MinWindowStepBruteforce,
} from '@/lib/viz/minWindowSteps';

const DEFAULT_EXAMPLE: MinWindowExample = {
  text: 'ADOBECODEBANC',
  required: 'ABC',
  answer: 'BANC',
};

interface MinWindowVizProps {
  mode: 'optimal' | 'bruteforce';
  example?: MinWindowExample;
}

function getSteps(
  mode: 'optimal' | 'bruteforce',
  text: string,
  required: string
): Generator<MinWindowStep> {
  if (mode === 'optimal') return optimalSteps(text, required) as Generator<MinWindowStep>;
  return bruteforceSteps(text, required) as Generator<MinWindowStep>;
}

function getStatus(
  step: MinWindowStep,
  mode: 'optimal' | 'bruteforce'
): { text: string; valid: boolean } {
  if (step.type === 'done') return { text: 'Done.', valid: false };

  if (mode === 'optimal' && 'need' in step) {
    const missing = step.missing;
    const valid = missing === 0;
    return {
      text: valid ? 'Window is valid ✓' : `Missing: ${missing} required char(s)`,
      valid,
    };
  }

  if (mode === 'bruteforce') {
    const s = step as MinWindowStepBruteforce;
    if (s.type === 'checkStart')
      return { text: 'Re-scanning window… (expensive)', valid: false };
    if (s.type === 'checkEnd')
      return {
        text: s.valid ? 'Window is valid ✓' : 'Window invalid',
        valid: s.valid,
      };
    if (s.type === 'init')
      return { text: 'Start (expand right until window is valid)', valid: false };
  }

  return { text: '—', valid: false };
}

function getResult(
  step: MinWindowStep,
  text: string
): { display: string; found: boolean; bestStart?: number; bestLen?: number } {
  if (step.type === 'done') {
    if (step.bestLen !== Infinity && step.bestLen > 0) {
      const best = text.slice(step.bestStart, step.bestStart + step.bestLen);
      return { display: `Best window: "${best}"`, found: true, bestStart: step.bestStart, bestLen: step.bestLen };
    }
    return { display: 'Best window: ""', found: false };
  }

  let bestStart: number | undefined;
  let bestLen: number | undefined;
  if ('bestStart' in step && 'bestLen' in step) {
    bestStart = step.bestStart;
    bestLen = step.bestLen;
  } else if ('minStart' in step && 'minLength' in step) {
    bestStart = step.minStart;
    bestLen = step.minLength;
  }
  if (bestLen !== undefined && bestLen !== Infinity && bestLen > 0 && bestStart !== undefined) {
    const best = text.slice(bestStart, bestStart + bestLen);
    return { display: `Best so far: "${best}"`, found: true, bestStart, bestLen };
  }
  return { display: 'Best window: —', found: false };
}

export function MinWindowViz({ mode, example = DEFAULT_EXAMPLE }: MinWindowVizProps) {
  const text = example.text;
  const required = example.required;
  const [step, setStep] = useState<MinWindowStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(800);
  const genRef = useRef<Generator<MinWindowStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = getSteps(mode, text, required);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [mode, text, required]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = getSteps(mode, text, required);
    const first = genRef.current.next();
    if (!first.done) setStep(first.value);
  }, [mode, text, required]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = getSteps(mode, text, required);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [mode, text, required]);

  const playPause = useCallback(() => {
    if (playing) {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPlaying(false);
      return;
    }
    setPlaying(true);
  }, [playing]);

  const delayMs = 200 + 1500 - speed; // higher slider = faster (lower delay)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reset when problem/solution changes
  }, [mode, text, required]);

  const left = step && 'left' in step ? step.left : 0;
  const right = step && 'right' in step ? step.right : 0;
  const status = step ? getStatus(step, mode) : { text: '—', valid: false };
  const result = step ? getResult(step, text) : { display: 'Best window: —', found: false };

  return (
    <div className="font-mono text-[1.1rem]">
      <div className="mb-2">
        <span className="inline-block w-20 text-muted text-[0.8rem]">text</span>
        <span className="inline-flex flex-wrap gap-0.5 tracking-wide">
          {text.split('').map((ch, i) => (
            <span
              key={i}
              className={`inline-flex items-center justify-center min-w-7 h-8 py-0 px-0.5 rounded bg-bg border border-border transition-[background,border-color,color] ${
                i >= left && i <= right ? 'bg-accent/20 border-accent text-accent' : ''
              } ${
                result.bestStart != null && result.bestLen != null && i >= result.bestStart && i < result.bestStart + result.bestLen && step?.type === 'done'
                  ? 'shadow-[0_0_0_2px_var(--color-good)]'
                  : ''
              }`}
            >
              {ch}
            </span>
          ))}
        </span>
      </div>
      <div className="mb-2">
        <span className="inline-block w-20 text-muted text-[0.8rem]">required</span>
        <span className="inline-flex flex-wrap gap-0.5 tracking-wide">{required}</span>
      </div>
      <div className="mt-3 flex gap-4 text-[0.8rem] text-muted">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> left
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" /> right
        </div>
      </div>
      <div className={`mt-3 py-2 px-3 bg-bg rounded-[var(--radius-sm)] text-[0.85rem] text-muted ${status.valid ? 'text-good bg-good/10' : ''}`}>
        {status.text}
      </div>
      <div className={`mt-4 py-3 px-4 rounded-[var(--radius-sm)] font-mono text-base font-medium ${result.found ? 'bg-good/15 text-good border border-good/40' : 'text-muted'}`}>
        {result.display}
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
          max={1500}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-[100px] accent-accent"
        />
      </div>
    </div>
  );
}
