import type { ComponentNode } from '../types';

export type TreeSearchStep =
  | { type: 'visit'; node: ComponentNode; resultSoFar: ComponentNode[] }
  | { type: 'done'; result: ComponentNode[]; targetType: string; matches: ComponentNode[] };

/** Yields one step per node visited (same order for both solutions). */
export function* treeSearchSteps(
  root: ComponentNode,
  targetType: string
): Generator<TreeSearchStep> {
  const result: ComponentNode[] = [];
  function* visit(node: ComponentNode): Generator<TreeSearchStep> {
    result.push(node);
    yield { type: 'visit', node, resultSoFar: [...result] };
    if (node.children) {
      for (const child of node.children) {
        yield* visit(child);
      }
    }
  }
  yield* visit(root);
  const matches = result.filter((n) => n.type === targetType);
  yield { type: 'done', result, targetType, matches };
}

/** Single-pass collector: yields visit steps with only matching nodes in resultSoFar. */
export function* treeSearchStepsCollector(
  root: ComponentNode,
  targetType: string
): Generator<TreeSearchStep> {
  const matches: ComponentNode[] = [];
  function* visit(node: ComponentNode): Generator<TreeSearchStep> {
    if (node.type === targetType) {
      matches.push(node);
    }
    yield { type: 'visit', node, resultSoFar: [...matches] };
    if (node.children) {
      for (const child of node.children) {
        yield* visit(child);
      }
    }
  }
  yield* visit(root);
  yield { type: 'done', result: matches, targetType, matches };
}
