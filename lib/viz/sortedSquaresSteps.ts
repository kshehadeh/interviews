export type SortedSquaresStep =
  | {
      type: 'step';
      nums: number[];
      arr: (number | undefined)[];
      i: number;
      j: number;
      p: number;
      chosen: 'i' | 'j';
      square: number;
    }
  | { type: 'done'; nums: number[]; arr: number[] };

/**
 * Yields one step per iteration of the two-pointer sorted squares algorithm.
 * Fills result from the end (largest square first). Matches problems/sorted-squares/main.ts.
 */
export function* sortedSquaresSteps(nums: number[]): Generator<SortedSquaresStep> {
  const n = nums.length;
  const arr: (number | undefined)[] = Array(n);
  let i = 0;
  let j = n - 1;

  for (let p = n - 1; p >= 0; p--) {
    const ni = Math.abs(nums[i]);
    const nj = Math.abs(nums[j]);

    if (ni > nj) {
      const square = ni * ni;
      arr[p] = square;
      yield { type: 'step', nums: [...nums], arr: [...arr], i, j, p, chosen: 'i', square };
      i++;
    } else {
      const square = nj * nj;
      arr[p] = square;
      yield { type: 'step', nums: [...nums], arr: [...arr], i, j, p, chosen: 'j', square };
      j--;
    }
  }

  yield { type: 'done', nums: [...nums], arr: arr as number[] };
}
