# Problems & Solutions — Visualizations

A React + TypeScript web app that visualizes each solution with animations, O-notation efficiency, and explanations. Use the **table of contents** on the home page to jump to any problem and then to each solution.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). Build for production with `npm run build`; run with `npm start`.

## Structure

- **Stack**: Next.js (App Router), React 18, TypeScript.
- **Table of contents** (`components/Toc.tsx`): Lists each problem; under each problem, links to every solution. Green dot = good solution, red dot = suboptimal.
- **Solution pages** (e.g. `/sliding-text-window/solution1`): Title, complexity (time/space), verdict, explanation, and an **animation** with Play/Pause, Step, Reset, and speed control.
- **Data** (`lib/data.ts`): Problem and solution metadata. Types live in `lib/types.ts`.
- **Visualizations**: `components/viz/MinWindowViz.tsx` and step generators in `lib/viz/minWindowSteps.ts`.

## Adding a new problem

1. Add a folder under `problems/` (e.g. `problems/my-problem/`) with solution folders and `main.ts` files.
2. In `lib/data.ts`, add an entry to `PROBLEMS_DATA` with `id`, `title`, `description`, optional `example`, and `solutions[]` (each with `id`, `name`, `description`, `time`, `space`, `verdict`, `verdictReason`, and optionally `vizKey` / `vizMode`).

## Adding a new solution to an existing problem

Add a new object to that problem’s `solutions` array in `lib/data.ts`. Set `vizKey` and `vizMode` if you’re reusing the min-window viz; otherwise the page will show complexity and explanation but no animation until you add a viz component.

## Adding a new visualization

1. Add a component under `components/viz/` (e.g. `MyViz.tsx`) that takes the needed props (e.g. `mode`, `example`).
2. In `components/SolutionView.tsx`, when `solution.vizKey === 'my-viz'` (and any `vizMode`), render your component instead of (or in addition to) `MinWindowViz`.
3. Add any shared step logic or types in `lib/viz/` if needed.
