'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Student = {
  id: string;
  email: string;
  name: string;
  role?: string;
  subscription_status?: string;
  language_level?: string;
};

export default function AdminAlumnosPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busyUserId, setBusyUserId] = useState<string | null>(null);

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newLevel, setNewLevel] = useState('A1');
  const [newPlan, setNewPlan] = useState('free');
  const [newStatus, setNewStatus] = useState('inactive');

  const [moveCourseId, setMoveCourseId] = useState('ingles-a1');
  const [moveUnitId, setMoveUnitId] = useState('1');
  const [moveLessonKey, setMoveLessonKey] = useState('');
  const [lastCredentials, setLastCredentials] = useState<{ email?: string; password: string } | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
      try {
        setError(null);
        setLoading(true);
        const res = await fetch('/api/admin/students');
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data?.error ?? `No se pudieron cargar los alumnos (${res.status})`);
        }
        setStudents(data.students ?? []);
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
  }

  async function handleCreateStudent(e: React.FormEvent) {
    e.preventDefault();
    try {
      setError(null);
      const res = await fetch('/api/admin/students/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'create',
          email: newEmail,
          name: newName,
          languageLevel: newLevel,
          subscriptionPlan: newPlan,
          subscriptionStatus: newStatus,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'No se pudo crear el alumno');
      setNewEmail('');
      setNewName('');
      await loadStudents();
      if (data?.tempPassword) {
        setLastCredentials({ email: newEmail, password: data.tempPassword });
      }
      alert(data?.mailSent ? 'Alumno creado y email enviado.' : 'Alumno creado. Copia la contraseña mostrada.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    }
  }

  async function handleResetPassword(student: Student) {
    if (!student.id) {
      setError('Este alumno no tiene userId válido.');
      return;
    }
    const ok = window.confirm(
      `¿Resetear la contraseña de ${student.email || student.name}?\nSe generará una nueva contraseña temporal.`
    );
    if (!ok) return;

    try {
      setBusyUserId(student.id);
      setError(null);
      const res = await fetch('/api/admin/students/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'reset-password',
          userId: student.id,
          email: student.email,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'No se pudo resetear contraseña');
      if (data?.tempPassword) {
        setLastCredentials({
          email: data.email || student.email,
          password: data.tempPassword,
        });
      }
      alert(
        data?.mailSent
          ? 'Contraseña reseteada y enviada por email. Copia también la mostrada en pantalla.'
          : 'Contraseña reseteada. Copia la nueva contraseña mostrada.'
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setBusyUserId(null);
    }
  }

  async function handleMovePosition(userId: string) {
    try {
      setBusyUserId(userId);
      setError(null);
      const res = await fetch('/api/admin/students/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'move-position',
          userId,
          courseId: moveCourseId,
          unitId: Number(moveUnitId),
          lessonKey: moveLessonKey || undefined,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'No se pudo mover al alumno');
      alert('Posicion de curso actualizada correctamente.');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setBusyUserId(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Alumnos</h1>
        <p className="text-slate-600 mt-1">Listado de estudiantes y su nivel.</p>
      </div>

      <form onSubmit={handleCreateStudent} className="bg-white border border-slate-200 rounded-2xl p-4 md:p-5">
        <h2 className="text-lg font-black text-slate-900">Crear nuevo alumno</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-3">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="email"
            required
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <select value={newLevel} onChange={(e) => setNewLevel(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>
          <select value={newPlan} onChange={(e) => setNewPlan(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm">
            <option value="free">free</option>
            <option value="basic-monthly">basic-monthly</option>
          </select>
          <div className="flex gap-2">
            <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)} className="rounded-lg border border-slate-300 px-3 py-2 text-sm flex-1">
              <option value="inactive">inactive</option>
              <option value="active">active</option>
              <option value="trialing">trialing</option>
            </select>
            <button type="submit" className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition">
              Crear
            </button>
          </div>
        </div>
      </form>

      {loading && <div className="text-slate-600">Cargando...</div>}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
          {error}
        </div>
      )}

      {lastCredentials && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
            Credenciales temporales
          </p>
          <p className="text-sm text-emerald-900">
            {lastCredentials.email ? `Usuario: ${lastCredentials.email}` : 'Usuario actualizado'}
          </p>
          <p className="text-sm text-emerald-900 mt-1">
            Contraseña: <span className="font-mono font-bold">{lastCredentials.password}</span>
          </p>
          <p className="text-xs text-emerald-700 mt-2">
            Copia esta contraseña ahora. Por seguridad solo se muestra en este panel.
          </p>
        </div>
      )}

      {!loading && !error && (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 font-bold">
                <tr>
                  <th className="text-left px-4 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Email</th>
                  <th className="text-left px-4 py-3">Nivel</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s.id} className="border-t border-slate-100">
                    <td className="px-4 py-3 font-semibold text-slate-800">{s.name}</td>
                    <td className="px-4 py-3 text-slate-600">{s.email}</td>
                    <td className="px-4 py-3">{(s.language_level ?? '—').toString()}</td>
                    <td className="px-4 py-3 text-slate-600">{(s.subscription_status ?? '—').toString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Link
                          href={`/admin/a1-analytics?userId=${encodeURIComponent(s.id)}`}
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition"
                        >
                          Ver progreso
                        </Link>
                        <button
                          onClick={() => handleResetPassword(s)}
                          disabled={busyUserId === s.id}
                          className="inline-flex items-center px-3 py-2 rounded-lg bg-orange-100 text-orange-800 hover:bg-orange-200 transition disabled:opacity-60"
                        >
                          Reset pass
                        </button>
                      </div>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-2">
                        <select value={moveCourseId} onChange={(e) => setMoveCourseId(e.target.value)} className="rounded-lg border border-slate-300 px-2 py-1 text-xs">
                          <option value="ingles-a1">ingles-a1</option>
                          <option value="ingles-a2">ingles-a2</option>
                          <option value="ingles-b1">ingles-b1</option>
                          <option value="ingles-b2">ingles-b2</option>
                          <option value="ingles-c1">ingles-c1</option>
                          <option value="ingles-c2">ingles-c2</option>
                        </select>
                        <input
                          value={moveUnitId}
                          onChange={(e) => setMoveUnitId(e.target.value)}
                          placeholder="Unidad"
                          className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        />
                        <input
                          value={moveLessonKey}
                          onChange={(e) => setMoveLessonKey(e.target.value)}
                          placeholder="lessonKey (opcional)"
                          className="rounded-lg border border-slate-300 px-2 py-1 text-xs"
                        />
                        <button
                          onClick={() => handleMovePosition(s.id)}
                          disabled={busyUserId === s.id}
                          className="inline-flex items-center justify-center px-2 py-1 rounded-lg bg-blue-100 text-blue-800 hover:bg-blue-200 transition text-xs font-semibold disabled:opacity-60"
                        >
                          Mover posicion
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {students.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-slate-600">
                      No hay alumnos para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

