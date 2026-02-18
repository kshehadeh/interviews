const modules = ["app", "ui", "utils"]
const deps = [
  ["app", "ui"],
  ["ui", "utils"]
]

function resolveOrder(modules: string[], deps: string[][],): string[] {
    const all = new Set<string>(modules);
    for (const [a, b] of deps) {
        all.add(a);
        all.add(b);
    }

    // 2) Initialize adjacency + indeegree
    const graph = new Map<string, Set<string>>();
    const inDegree = new Map<string, number>();

    for (const node of all) {
        graph.set(node, new Set<string>());
        inDegree.set(node, 0);
    }

    // 3) Build graph and indegree
    for (const [a, b] of deps) {
        const neighbords = graph.get(b)!;
        if (!neighbords.has(a)) {
            neighbords.add(a);
            inDegree.set(a, (inDegree.get(a) || 0) + 1);
        }
    }

    // 4) Topological sort (Kahn's algorithm)
    const queue: string[] = [];
    for (const node of all) {
        if ((inDegree.get(node) ?? 0) === 0) queue.push(node);
    }

    // 5) Process queue
    const order: string[] = [];
    for (let i= 0; i < queue.length; i++) {
        const node = queue[i];
        order.push(node);

        for (const next of graph.get(node)!) {
            inDegree.set(next, (inDegree.get(next) ?? 0) - 1);
            if ((inDegree.get(next) ?? 0) === 0) queue.push(next);
        }
    }

    return order.length === all.size ? order : [];
}

console.log(resolveOrder(modules, deps));