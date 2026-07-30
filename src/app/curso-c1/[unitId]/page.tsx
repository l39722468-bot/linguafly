import { redirect } from 'next/navigation';
import C1UnitContent from './C1UnitContent';

interface Props {
  params: Promise<{ unitId: string }>;
}

export default async function C1UnitPage({ params }: Props) {
  const { unitId } = await params;

  if (unitId === 'outline') {
    redirect('/curso-c1/outline');
  }

  if (unitId === 'test-final') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md text-center">
          <p className="text-4xl mb-4">📋</p>
          <h1 className="text-2xl font-black text-slate-900 mb-2">Test Final C1</h1>
          <p className="text-slate-600 mb-6">El test final estará disponible próximamente.</p>
          <a href="/curso-c1" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all">
            Volver al curso C1
          </a>
        </div>
      </div>
    );
  }

  return <C1UnitContent />;
}
