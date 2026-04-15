'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  exerciseId: string;
  title: string;
  description: string;
};

export default function ExerciseRunnerClient({ exerciseId, title, description }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const submitAttempt = async (score: number) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await fetch('/api/worlds/complete-exercise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exerciseId, score }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'No se pudo registrar el intento');

      if (payload.completed) {
        setMessage('Ejercicio superado. Se desbloqueo el siguiente.');
      } else {
        setMessage('No alcanzaste 100%. Puedes volver a intentarlo.');
      }
      router.refresh();
    } catch (error: any) {
      setMessage(error.message || 'Error al registrar el intento');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6">
      <h1 className="text-2xl font-black text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600 mt-2">{description}</p>

      <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-sm text-slate-700">
          Este es el runner inicial del mapa por mundos. La regla de desbloqueo ya es estricta:
          solo 100% abre el siguiente ejercicio.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={() => submitAttempt(80)}
          disabled={loading}
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-bold hover:bg-slate-100 transition disabled:opacity-50"
        >
          Enviar intento (80%)
        </button>
        <button
          onClick={() => submitAttempt(100)}
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-coral-600 text-white text-sm font-bold hover:bg-coral-700 transition disabled:opacity-50"
        >
          Enviar intento (100%)
        </button>
      </div>

      {message && <p className="mt-4 text-sm font-semibold text-slate-700">{message}</p>}
    </div>
  );
}
