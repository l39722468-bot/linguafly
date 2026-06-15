import { GlobalContentProvider } from '@/lib/course-engine/global-content-provider';
import A1SmartPracticeClient from './SmartPracticeClient';

export const dynamic = 'force-dynamic';

export default async function A1SmartPracticePage() {
  await GlobalContentProvider.getInstance().loadAllContent();
  return <A1SmartPracticeClient />;
}
