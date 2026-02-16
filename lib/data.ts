import type { Problem } from './types';

export const PROBLEMS_DATA: Problem[] = [
  {
    id: 'sliding-text-window',
    title: 'Minimum Window Substring',
    description:
      'Find the smallest substring of text that contains all characters from required (including duplicates).',
    example: { text: 'ADOBECODEBANC', required: 'ABC', answer: 'BANC' },
    solutions: [
      {
        id: 'solution1',
        name: 'Brute-force sliding window',
        description:
          'Expand and shrink the window, testing each segment by re-scanning and counting characters.',
        time: 'O(n² · m) to O(n³)',
        space: 'O(m)',
        verdict: 'bad',
        verdictReason:
          'Re-scans the current window for every move (testSegment + countCharacters). Many overlapping windows are re-checked from scratch, leading to cubic behavior in the worst case.',
        vizKey: 'min-window',
        vizMode: 'bruteforce',
      },
      {
        id: 'solution2',
        name: 'Single-pass sliding window',
        description:
          'One pass with two pointers; maintain a running frequency map and "missing" count so validity is O(1).',
        time: 'O(n)',
        space: 'O(m)',
        verdict: 'good',
        verdictReason:
          'Each character is processed at most twice (once by the right pointer, once by the left). No re-scanning; optimal for this problem.',
        vizKey: 'min-window',
        vizMode: 'optimal',
      },
    ],
  },
  {
    id: 'tree-search',
    title: 'Find Components by Type',
    description:
      'Given a component tree (UI layout), return all components whose type matches a target type, in top-to-bottom, left-to-right order.',
    treeExample: {
      tree: {
        id: 'root',
        type: 'Page',
        children: [
          {
            id: 'header',
            type: 'Header',
            children: [
              { id: 'logo', type: 'Image' },
              { id: 'nav', type: 'Nav' },
            ],
          },
          {
            id: 'content',
            type: 'Section',
            children: [
              { id: 'hero', type: 'Image' },
              { id: 'cta', type: 'Button' },
            ],
          },
        ],
      },
      targetType: 'Image',
    },
    solutions: [
      {
        id: 'solution1',
        name: 'Flatten with reduce + spread',
        description:
          'Recursively flatten the entire tree, then filter by type. Uses reduce with [...acc, ...flatten(child)] at each step.',
        time: 'O(n²)',
        space: 'O(n)',
        verdict: 'bad',
        verdictReason:
          'Flattens the whole tree (O(n²) from spread/copy at each step), then a separate O(n) filter—so more than two linear passes. Spreading the accumulator and each subtree copies O(n) elements repeatedly; degenerate (list-like) trees give quadratic time. The reduce order can reverse natural tree order unless carefully structured.',
        vizKey: 'tree-search',
        vizMode: 'reduce',
      },
      {
        id: 'solution2',
        name: 'Flatten with accumulator, then filter',
        description:
          'Recursively flatten the entire tree into one array (single accumulator with push), then filter by type.',
        time: 'O(2n)',
        space: 'O(n)',
        verdict: 'bad',
        verdictReason:
          'Two passes: O(n) to flatten, then O(n) to filter. A single-pass approach only collects matching nodes as it descends, avoiding the extra traversal and the full intermediate list.',
        vizKey: 'tree-search',
        vizMode: 'accumulator',
      },
      {
        id: 'solution3',
        name: 'Single-pass collector',
        description:
          'Traverse the tree once; at each node, if it matches the target type, add it to a result array. No separate flatten—only matching nodes are collected.',
        time: 'O(n)',
        space: 'O(h)',
        verdict: 'good',
        verdictReason:
          'Single pass over the tree. No intermediate full flatten: only matching nodes are added to the collector, so space is O(k) for the result (and O(h) stack depth). Optimal for this problem.',
        vizKey: 'tree-search',
        vizMode: 'collector',
      },
    ],
  },
];
