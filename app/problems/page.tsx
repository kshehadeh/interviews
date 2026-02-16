import { Toc } from '@/components/Toc';
import { PROBLEMS_DATA } from '@/lib/data';

export default function ProblemsPage() {
  return <Toc problems={PROBLEMS_DATA} />;
}
