import type { DedupeItem } from '../types';

export type DedupeStep =
  | {
      type: 'step';
      index: number;
      item: DedupeItem;
      action: 'skip' | 'add';
      mapKeys: string[];
      result: DedupeItem[];
    }
  | { type: 'done'; result: DedupeItem[] };

/**
 * Yields one step per item: skip if id already in map, else add to map and result.
 */
export function* dedupeSteps(items: DedupeItem[]): Generator<DedupeStep> {
  const m = new Map<string, DedupeItem>();
  const result: DedupeItem[] = [];

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const action = m.has(item.id) ? 'skip' : 'add';
    if (action === 'add') {
      m.set(item.id, item);
      result.push(item);
    }
    yield {
      type: 'step',
      index: i,
      item,
      action,
      mapKeys: Array.from(m.keys()),
      result: [...result],
    };
  }

  yield { type: 'done', result };
}
