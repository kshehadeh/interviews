'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { RatelimitExample, RatelimitEvent } from '@/lib/types';
import { ratelimitSteps, type RatelimitStep } from '@/lib/viz/ratelimitSteps';

const DEFAULT_EXAMPLE: RatelimitExample = {
  events: [
    { type: 'click', timestamp: 1000 },
    { type: 'click', timestamp: 1001 },
    { type: 'click', timestamp: 1002 },
    { type: 'click', timestamp: 1003 },
    { type: 'click', timestamp: 1004 },
    { type: 'click', timestamp: 1005 },
    { type: 'click', timestamp: 1006 },
    { type: 'click', timestamp: 1007 },
  ],
  limit: 3,
  windowMs: 5,
};

interface RatelimitVizProps {
  example?: RatelimitExample;
}

function EventRow({
  event,
  isCurrent,
  accepted,
}: {
  event: RatelimitEvent;
  isCurrent: boolean;
  accepted?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 py-2 px-3 rounded-[var(--radius-sm)] border transition-[background,border-color,color] ${
        isCurrent ? 'bg-accent/20 border-accent text-accent' : 'bg-bg border-border'
      }`}
    >
      <span className="font-mono font-medium min-w-[4rem]">{event.type}</span>
      <span className="text-muted text-[0.8rem]">t={event.timestamp}</span>
      {isCurrent && accepted !== undefined && (
        <span className={`text-[0.8rem] font-medium ${accepted ? 'text-good' : 'text-bad'}`}>
          {accepted ? 'accept' : 'drop'}
        </span>
      )}
    </div>
  );
}

export function RatelimitViz({ example = DEFAULT_EXAMPLE }: RatelimitVizProps) {
  const { events, limit, windowMs } = example;
  const [step, setStep] = useState<RatelimitStep | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(600);
  const genRef = useRef<Generator<RatelimitStep> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runStep = useCallback((): boolean => {
    if (!genRef.current) genRef.current = ratelimitSteps(events, limit, windowMs);
    const result = genRef.current.next();
    if (result.done) {
      setPlaying(false);
      genRef.current = null;
      return false;
    }
    setStep(result.value);
    return true;
  }, [events, limit, windowMs]);

  const reset = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setPlaying(false);
    genRef.current = ratelimitSteps(events, limit, windowMs);
    const first = genRef.current.next();
    setStep(first.done ? null : first.value);
  }, [events, limit, windowMs]);

  const stepOnce = useCallback(() => {
    if (!genRef.current) genRef.current = ratelimitSteps(events, limit, windowMs);
    const result = genRef.current.next();
    if (result.done) {
      genRef.current = null;
      return;
    }
    setStep(result.value);
  }, [events, limit, windowMs]);

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
  }, [events, limit, windowMs, reset]);

  const currentIndex = step?.type === 'step' ? step.index : -1;
  const currentAccepted = step?.type === 'step' ? step.accepted : undefined;
  const queues = step?.type === 'step' ? step.queues : new Map<string, number[]>();
  const threshold = step?.type === 'step' ? step.threshold : null;
  const resultEvents =
    step?.type === 'step' ? step.result : step?.type === 'done' ? step.result : [];

  return (
    <div className="font-mono text-[1rem]">
      <div className="mb-2 text-[0.8rem] text-muted">
        Limit: {limit} per type in window {windowMs}ms
      </div>

      <div className="mb-3">
        <span className="inline-block w-24 text-muted text-[0.8rem] mb-1.5">Input</span>
        <div className="flex flex-col gap-1">
          {events.map((event, i) => (
            <EventRow
              key={`${event.type}-${event.timestamp}-${i}`}
              event={event}
              isCurrent={i === currentIndex}
              accepted={i === currentIndex ? currentAccepted : undefined}
            />
          ))}
        </div>
      </div>

      {step?.type === 'step' && (
        <div className="mb-3 py-2 px-3 bg-bg rounded-[var(--radius-sm)] border border-border">
          <span className="text-muted text-[0.8rem]">Threshold (t − window): </span>
          <span className="font-medium">{threshold}</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {Array.from(queues.entries()).map(([type, timestamps]) => (
              <span
                key={type}
                className="py-1 px-2 rounded bg-surface border border-border text-[0.85rem]"
              >
                <span className="text-accent">{type}</span>:[{timestamps.join(', ')}]
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <span className="inline-block w-24 text-muted text-[0.8rem] mb-1.5">Output</span>
        <div className="min-h-[2.5rem] py-2 px-3 bg-good/10 border border-good/30 rounded-[var(--radius-sm)]">
          {resultEvents.length === 0 && step?.type !== 'done' && (
            <span className="text-muted text-[0.85rem]">(accepted events)</span>
          )}
          {resultEvents.map((event, i) => (
            <div
              key={`out-${event.type}-${event.timestamp}-${i}`}
              className="flex items-center gap-3 py-1.5 px-2 rounded text-[0.9rem] text-good"
            >
              <span className="font-medium min-w-[4rem]">{event.type}</span>
              <span className="text-good/80 text-[0.8rem]">t={event.timestamp}</span>
            </div>
          ))}
        </div>
      </div>

      {step?.type === 'done' && (
        <div className="py-2 px-3 rounded-[var(--radius-sm)] bg-good/15 text-good text-[0.9rem] border border-good/40 mb-4">
          Done. {resultEvents.length} event(s) passed.
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
