export type SearchArrayStep =
  | {
      type: 'step';
      arr: number[];
      left: number;
      right: number;
      mid: number;
      comparison: 'equal' | 'less' | 'greater';
    }
  | { type: 'found'; arr: number[]; index: number }
  | { type: 'notFound'; arr: number[] };

/**
 * Yields one step per iteration of binary search. Matches problems/search-array/solution1/main.ts.
 */
export function* searchArraySteps(
  arr: number[],
  target: number
): Generator<SearchArrayStep> {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = arr[mid];

    if (value === target) {
      yield { type: 'step', arr: [...arr], left, right, mid, comparison: 'equal' };
      yield { type: 'found', arr: [...arr], index: mid };
      return;
    }
    if (value < target) {
      yield { type: 'step', arr: [...arr], left, right, mid, comparison: 'less' };
      left = mid + 1;
    } else {
      yield { type: 'step', arr: [...arr], left, right, mid, comparison: 'greater' };
      right = mid - 1;
    }
  }

  yield { type: 'notFound', arr: [...arr] };
}
