/**
 * Step generator for Kahn's algorithm (topological sort).
 * Matches the logic in problems/dependencies/solution1/main.ts.
 * For dep [a, b]: a depends on b, so b must appear before a in order.
 * We store graph.get(b).add(a) and inDegree(a)++, so "neighbors of node" = nodes that depend on node.
 */

export type DependenciesStep =
  | {
      type: 'init';
      all: string[];
      inDegree: Map<string, number>;
      queue: string[];
      order: string[];
      graph: Map<string, Set<string>>;
    }
  | {
      type: 'process';
      node: string;
      all: string[];
      inDegree: Map<string, number>;
      queue: string[];
      order: string[];
      graph: Map<string, Set<string>>;
    }
  | {
      type: 'done';
      order: string[];
      success: boolean;
    };

function buildGraph(modules: string[], deps: string[][]): {
  all: Set<string>;
  graph: Map<string, Set<string>>;
  inDegree: Map<string, number>;
} {
  const all = new Set<string>(modules);
  for (const [a, b] of deps) {
    all.add(a);
    all.add(b);
  }

  const graph = new Map<string, Set<string>>();
  const inDegree = new Map<string, number>();

  for (const node of all) {
    graph.set(node, new Set<string>());
    inDegree.set(node, 0);
  }

  for (const [a, b] of deps) {
    const neighbors = graph.get(b)!;
    if (!neighbors.has(a)) {
      neighbors.add(a);
      inDegree.set(a, (inDegree.get(a) ?? 0) + 1);
    }
  }

  return { all, graph, inDegree };
}

function copyMap<K, V>(m: Map<K, V>): Map<K, V> {
  return new Map(m);
}

function copySet(s: Set<string>): Set<string> {
  return new Set(s);
}

export function* dependenciesSteps(
  modules: string[],
  deps: string[][]
): Generator<DependenciesStep> {
  const { all, graph, inDegree } = buildGraph(modules, deps);
  const allArr = Array.from(all);

  const queue: string[] = [];
  for (const node of all) {
    if ((inDegree.get(node) ?? 0) === 0) queue.push(node);
  }

  yield {
    type: 'init',
    all: allArr,
    inDegree: copyMap(inDegree),
    queue: [...queue],
    order: [],
    graph,
  };

  const order: string[] = [];
  let i = 0;
  while (i < queue.length) {
    const node = queue[i];
    order.push(node);

    for (const next of graph.get(node)!) {
      inDegree.set(next, (inDegree.get(next) ?? 0) - 1);
      if ((inDegree.get(next) ?? 0) === 0) {
        queue.push(next);
      }
    }

    yield {
      type: 'process',
      node,
      all: allArr,
      inDegree: copyMap(inDegree),
      queue: queue.slice(i + 1),
      order: [...order],
      graph,
    };

    i++;
  }

  yield {
    type: 'done',
    order,
    success: order.length === all.size,
  };
}
