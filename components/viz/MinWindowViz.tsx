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
    <div className="min-window-viz">
      <div className="text-row">
        <span className="label">text</span>
        <span className="chars">
          {text.split('').map((ch, i) => (
            <span
              key={i}
              className={`char ${i >= left && i <= right ? 'in-window' : ''} ${
                result.bestStart != null && result.bestLen != null && i >= result.bestStart && i < result.bestStart + result.bestLen && step?.type === 'done'
                  ? 'required-match'
                  : ''
              }`}
            >
              {ch}
            </span>
          ))}
        </span>
      </div>
      <div className="text-row">
        <span className="label">required</span>
        <span className="chars">{required}</span>
      </div>
      <div className="pointers">
        <div className="pointer-row">
          <span className="pointer-dot left" /> left
        </div>
        <div className="pointer-row">
          <span className="pointer-dot right" /> right
        </div>
      </div>
      <div className={`status ${status.valid ? 'valid' : ''}`}>{status.text}</div>
      <div className={`result ${result.found ? 'found' : 'empty'}`}>{result.display}</div>

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
          max={1500}
          step={100}
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>
    </div>
  );
}
