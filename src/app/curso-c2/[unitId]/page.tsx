import { redirect } from 'next/navigation';
import C2UnitContent from './C2UnitContent';

interface Props {
  params: Promise<{ unitId: string }>;
}

export default async function C2UnitPage({ params }: Props) {
  const { unitId } = await params;

  if (unitId === 'outline') {
    redirect('/curso-c2/outline');
  }

  if (unitId === 'test-final') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <p className="text-4xl mb-4">📋</p>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Test Final C2</h1>
          <p className="text-slate-600 mb-6">El test final estará disponible próximamente.</p>
          <a href="/curso-c2" className="inline-block bg-violet-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-violet-700 transition-all">
            Volver al curso C2
          </a>
        </div>
      </div>
    );
  }

  return <C2UnitContent />;
}
