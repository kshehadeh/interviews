/** Step types for min-window visualization */

export interface NeedMap {
  [ch: string]: number;
}

export type MinWindowStepOptimal =
  | { type: 'init'; left: number; right: number; need: NeedMap; missing: number; bestStart: number; bestLen: number }
  | { type: 'expand'; left: number; right: number; need: NeedMap; missing: number; bestStart: number; bestLen: number }
  | { type: 'newBest'; left: number; right: number; bestStart: number; bestLen: number; need: NeedMap; missing: number }
  | { type: 'shrink'; left: number; right: number; need: NeedMap; missing: number; bestStart: number; bestLen: number }
  | { type: 'done'; bestStart: number; bestLen: number; text: string };

export type MinWindowStepBruteforce =
  | { type: 'init'; left: number; right: number; minStart: number; minLength: number }
  | { type: 'checkStart'; left: number; right: number; segment: string; minStart: number; minLength: number }
  | { type: 'checkEnd'; left: number; right: number; valid: boolean; minStart: number; minLength: number }
  | { type: 'newBest'; left: number; right: number; minStart: number; minLength: number }
  | { type: 'done'; bestStart: number; bestLen: number; text: string };

export type MinWindowStep = MinWindowStepOptimal | MinWindowStepBruteforce;

function buildNeed(required: string): NeedMap {
  const need: NeedMap = {};
  for (let i = 0; i < required.length; i++) {
    const ch = required[i];
    need[ch] = (need[ch] || 0) + 1;
  }
  return need;
}

function copyNeed(need: NeedMap): NeedMap {
  const out: NeedMap = {};
  for (const k in need) out[k] = need[k];
  return out;
}

export function* optimalSteps(
  text: string,
  required: string
): Generator<MinWindowStepOptimal> {
  const need = buildNeed(required);
  let missing = required.length;
  let left = 0;
  let bestStart = 0;
  let bestLen = Infinity;

  yield { type: 'init', left, right: 0, need: copyNeed(need), missing, bestStart, bestLen };

  for (let right = 0; right < text.length; right++) {
    const ch = text[right];
    if (need[ch] !== undefined) {
      if (need[ch] > 0) missing--;
      need[ch]--;
    }
    yield { type: 'expand', left, right, need: copyNeed(need), missing, bestStart, bestLen };

    while (missing === 0) {
      const windowLen = right - left + 1;
      if (windowLen < bestLen) {
        bestLen = windowLen;
        bestStart = left;
        yield { type: 'newBest', left, right, bestStart, bestLen, need: copyNeed(need), missing };
      }

      const leftCh = text[left];
      if (need[leftCh] !== undefined) {
        need[leftCh]++;
        if (need[leftCh] > 0) missing++;
      }
      left++;
      yield { type: 'shrink', left, right, need: copyNeed(need), missing, bestStart, bestLen };
    }
  }

  yield { type: 'done', bestStart, bestLen, text };
}

export function* bruteforceSteps(
  text: string,
  required: string
): Generator<MinWindowStepBruteforce> {
  let left = 0;
  let right = 0;
  let minLength = Infinity;
  let minStart = 0;

  yield { type: 'init', left, right, minStart, minLength };

  while (right < text.length) {
    const segment = text.slice(left, right + 1);
    yield { type: 'checkStart', left, right, segment, minStart, minLength };

    const need = buildNeed(required);
    for (let i = 0; i < segment.length; i++) {
      const ch = segment[i];
      if (need[ch] !== undefined) need[ch]--;
    }
    const valid = Object.keys(need).every((ch) => need[ch] <= 0);
    yield { type: 'checkEnd', left, right, valid, minStart, minLength };

    if (valid) {
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minStart = left;
        yield { type: 'newBest', left, right, minStart, minLength };
      }
      left++;
    } else {
      right++;
    }
  }

  yield { type: 'done', bestStart: minStart, bestLen: minLength, text };
}
