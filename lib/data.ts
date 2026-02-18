import type { Problem } from './types';

export const PROBLEMS_DATA: Problem[] = [
  {
    id: 'sliding-text-window',
    title: 'Minimum Window Substring (Characters)',
    description:
      'Given a string and a set of required characters (including duplicates), find the smallest substring that contains all required characters. If no such substring exists, return an empty string.',
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
    title: 'Component Tree Search',
    description:
      'Given a nested component tree structure, return all components whose type matches a target value. The traversal must preserve top-to-bottom, left-to-right order.',
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
  {
    id: 'dedupe',
    title: 'Deduplicate While Preserving Order',
    description:
      'Given a list of items with IDs, remove duplicates by ID while preserving the order of first occurrence.',
    dedupeExample: {
      items: [
        { id: 'a', title: 'Post A', timestamp: 1 },
        { id: 'b', title: 'Post B', timestamp: 2 },
        { id: 'a', title: 'Post A (duplicate)', timestamp: 3 },
        { id: 'c', title: 'Post C', timestamp: 4 },
        { id: 'b', title: 'Post B (duplicate)', timestamp: 5 },
      ],
    },
    solutions: [
      {
        id: 'solution1',
        name: 'Map by ID (first wins)',
        description:
          'One pass: use a Map keyed by id. If the id is already in the map, skip; otherwise set. Return Array.from(m.values()).',
        time: 'O(n)',
        space: 'O(k), k = unique ids',
        verdict: 'good',
        verdictReason:
          'Single pass over the input. Each id is looked up and at most once inserted; Map operations are O(1) average. Output size is O(k). Optimal for this problem.',
        vizKey: 'dedupe',
      },
    ],
  },
  {
    id: 'dependencies',
    title: 'Dependency Resolution (Topological Sort)',
    description:
      'Given a list of modules and dependency pairs where one module depends on another, return an order of modules that satisfies all dependencies. If a cycle exists, return an empty list.',
    dependenciesExample: {
      modules: ['app', 'ui', 'utils'],
      deps: [
        ['app', 'ui'],
        ['ui', 'utils'],
      ],
    },
    solutions: [
      {
        id: 'solution1',
        name: "Kahn's algorithm (BFS + indegree)",
        description:
          'Build a directed graph and indegree count. Repeatedly dequeue a node with indegree 0, append to order, and decrement indegree of its dependents; enqueue any that become 0.',
        time: 'O(V + E)',
        space: 'O(V + E)',
        verdict: 'good',
        verdictReason:
          'Single pass to build graph and indegree, then each node and edge is processed once. Standard optimal topological sort.',
        vizKey: 'dependencies',
      },
    ],
  },
  {
    id: 'ratelimit',
    title: 'Event Rate Limiting (Rolling Window)',
    description:
      'Given a time-ordered list of events, enforce a per-event-type rate limit such that no more than a fixed number of events occur within a rolling time window. Events exceeding the limit are dropped while preserving order.',
    ratelimitExample: {
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
    },
    solutions: [
      {
        id: 'solution1',
        name: 'Per-type queue + sliding window',
        description:
          'For each event type, keep a queue of timestamps in the current window. Evict timestamps before (timestamp − windowMs), then accept only if queue length < limit.',
        time: 'O(n)',
        space: 'O(k · L), k = types, L = max events per type in window',
        verdict: 'good',
        verdictReason:
          'One pass over events. Each timestamp is added once and removed at most once from its queue. Optimal for this problem.',
        vizKey: 'ratelimit',
      },
    ],
  },
];
