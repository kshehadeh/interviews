export type Verdict = 'good' | 'bad';

export interface MinWindowExample {
  text: string;
  required: string;
  answer: string;
}

export interface Solution {
  id: string;
  name: string;
  description: string;
  time: string;
  space: string;
  verdict: Verdict;
  verdictReason: string;
  vizKey?: string;
  vizMode?: string;
}

export interface ComponentNode {
  id: string;
  type: string;
  children?: ComponentNode[];
}

export interface TreeExample {
  tree: ComponentNode;
  targetType: string;
}

export interface DedupeItem {
  id: string;
  title: string;
  timestamp: number;
}

export interface DedupeExample {
  items: DedupeItem[];
}

export interface DependenciesExample {
  modules: string[];
  deps: string[][]; // [a, b] means a depends on b (b must come first in order)
}

export interface RatelimitEvent {
  type: string;
  timestamp: number;
}

export interface RatelimitExample {
  events: RatelimitEvent[];
  limit: number;
  windowMs: number;
}

export interface ReverseNumberCase {
  input: number;
  expected: number;
}

export interface ReverseNumberExample {
  cases: ReverseNumberCase[];
}

export interface SortedSquaresExample {
  input: number[];
}

export interface SearchArrayExample {
  arr: number[];
  target: number;
}

export interface Problem {
  id: string;
  title: string;
  description: string;
  example?: MinWindowExample;
  treeExample?: TreeExample;
  dedupeExample?: DedupeExample;
  dependenciesExample?: DependenciesExample;
  ratelimitExample?: RatelimitExample;
  reverseNumberExample?: ReverseNumberExample;
  sortedSquaresExample?: SortedSquaresExample;
  searchArrayExample?: SearchArrayExample;
  solutions: Solution[];
}
