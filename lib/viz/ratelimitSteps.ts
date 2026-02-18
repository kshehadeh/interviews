import type { RatelimitEvent } from '../types';

export type RatelimitStep =
  | {
      type: 'step';
      index: number;
      event: RatelimitEvent;
      threshold: number;
      queues: Map<string, number[]>;
      accepted: boolean;
      result: RatelimitEvent[];
    }
  | { type: 'done'; result: RatelimitEvent[] };

/**
 * Yields one step per event: evict expired from queue, then accept if under limit else drop.
 * Matches the logic in problems/ratelimit/solution1/main.ts.
 */
export function* ratelimitSteps(
  events: RatelimitEvent[],
  limit: number,
  windowMs: number
): Generator<RatelimitStep> {
  const queues = new Map<string, number[]>();
  const result: RatelimitEvent[] = [];

  for (let i = 0; i < events.length; i++) {
    const e = events[i];
    const q = queues.get(e.type) ?? [];
    queues.set(e.type, q);

    const threshold = e.timestamp - windowMs;

    while (q.length > 0 && q[0] < threshold) {
      q.shift();
    }

    const accepted = q.length < limit;
    if (accepted) {
      q.push(e.timestamp);
      result.push(e);
    }

    yield {
      type: 'step',
      index: i,
      event: e,
      threshold,
      queues: new Map([...queues.entries()].map(([k, v]) => [k, [...v]])),
      accepted,
      result: [...result],
    };
  }

  yield { type: 'done', result };
}
