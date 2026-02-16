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

export interface Problem {
  id: string;
  title: string;
  description: string;
  example?: MinWindowExample;
  treeExample?: TreeExample;
  solutions: Solution[];
}
