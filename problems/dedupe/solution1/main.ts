type Item = {
    id: string
    title: string
    timestamp: number
}

function dedupe(items: Item[]): Item[] {
    const m = new Map<string, Item>();
    for (const item of items) {
        if (m.has(item.id)) {
            continue;
        }
        m.set(item.id, item); 
    }
    return Array.from(m.values());
}

const items: Item[] = [
    { id: "a", title: "Post A", timestamp: 1 },
    { id: "b", title: "Post B", timestamp: 2 },
    { id: "a", title: "Post A (duplicate)", timestamp: 3 },
    { id: "c", title: "Post C", timestamp: 4 },
    { id: "b", title: "Post B (duplicate)", timestamp: 5 }
  ]

const deduplicatedItems = dedupe(items);
console.log(deduplicatedItems);