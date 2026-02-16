import { notFound } from 'next/navigation';
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { PROBLEMS_DATA } from '@/lib/data';
import { SolutionView } from '@/components/SolutionView';
import type { Problem } from '@/lib/types';

const SAFE_ID = /^[a-z0-9-]+$/;

function findProblem(problemId: string): Problem | undefined {
  return PROBLEMS_DATA.find((p) => p.id === problemId);
}

function findSolution(problem: Problem, solutionId: string) {
  return problem.solutions.find((s) => s.id === solutionId);
}

function getSolutionCode(problemId: string, solutionId: string): string | null {
  if (!SAFE_ID.test(problemId) || !SAFE_ID.test(solutionId)) return null;
  const filePath = path.join(process.cwd(), 'problems', problemId, solutionId, 'main.ts');
  if (!existsSync(filePath)) return null;
  try {
    return readFileSync(filePath, 'utf-8');
  } catch {
    return null;
  }
}

type Props = {
  params: Promise<{ problemId: string; solutionId: string }>;
};

export default async function SolutionPage({ params }: Props) {
  const { problemId, solutionId } = await params;
  const problem = findProblem(problemId);
  const solution = problem && findSolution(problem, solutionId);
  if (!problem || !solution) notFound();
  const code = getSolutionCode(problemId, solutionId);
  return <SolutionView problem={problem} solution={solution} code={code} />;
}
