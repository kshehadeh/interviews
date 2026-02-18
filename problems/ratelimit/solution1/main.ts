type RateLimitEvent = { type: string; timestamp: number };

function rateLimit(events: RateLimitEvent[], limit: number, windowMs: number): RateLimitEvent[] {
    const queues = new Map<string, number[]>(); // type -> timestamps kept in window
    const result: RateLimitEvent[] = [];

    for (const e of events) {
        const q = queues.get(e.type) ?? [];
        queues.set(e.type, q);

        const threshold = e.timestamp - windowMs;

        // Remove expired timestamps from the front
        while (q.length > 0 && q[0] < threshold) {
            q.shift();
        }

        if (q.length < limit) {
            q.push(e.timestamp);
            result.push(e);
        }
        // else: drop it
    }

    return result;
}

const events: RateLimitEvent[] = [
    { type: 'click', timestamp: 1000 },
    { type: 'click', timestamp: 1001 },
    { type: 'click', timestamp: 1002 },
    { type: 'click', timestamp: 1003 },
    { type: 'click', timestamp: 1004 },
    { type: 'click', timestamp: 1005 },
    { type: 'click', timestamp: 1006 },
    { type: 'click', timestamp: 1007 },
];

const limitedEvents = rateLimit(events, 3, 5);
console.log(limitedEvents);

