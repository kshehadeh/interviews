import { Toc } from '@/components/Toc';
import { PROBLEMS_DATA } from '@/lib/data';

export default function HomePage() {
  return <Toc problems={PROBLEMS_DATA} />;
}
