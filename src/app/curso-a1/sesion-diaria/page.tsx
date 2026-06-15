import { Suspense } from 'react';
import { GlobalContentProvider } from '@/lib/course-engine/global-content-provider';
import { a1SesionDelDiaEnOracion } from '@/lib/copy/a1-sesion-del-dia';
import DailySessionClient from './DailySessionClient';

export const dynamic = 'force-dynamic';

export default async function SesionDiariaPage() {
  await GlobalContentProvider.getInstance().loadAllContent();

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0c4a3e] px-4">
          <p className="text-sm font-bold text-emerald-100/80">
            Cargando {a1SesionDelDiaEnOracion()}…
          </p>
        </div>
      }
    >
      <DailySessionClient />
    </Suspense>
  );
}
