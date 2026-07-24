'use client';

import { useEffect, useState } from 'react';
import { Users, TrendingUp, CheckCircle, BookOpen, Download, BarChart3, RotateCcw, AlertTriangle } from 'lucide-react';

interface Student {
  id: string;
  email: string;
  name: string;
}

interface ProgressData {
  unit_id: number;
  status: string;
  exercises_completed: number;
  exercises_total: number;
  accuracy_percentage: number;
}

interface Summary {
  totalUnitsStarted: number;
  totalUnitsCompleted: number;
  averageAccuracy: number;
}

interface SRSTopicStat {
  topic: string;
  avgQuality: number;
  count: number;
  dueCount: number;
}

interface SRSStats {
  totalCards: number;
  dueCount: number;
  avgEaseFactor: number | null;
  topicStats: SRSTopicStat[];
  weakTopics: SRSTopicStat[];
}

function unitLabel(unitId: number): string {
  return unitId === 0 ? 'Test final A1' : `Unidad ${unitId}`;
}

function qualityColor(avg: number): string {
  if (avg >= 4) return 'text-emerald-600';
  if (avg >= 3) return 'text-yellow-600';
  return 'text-red-600';
}

function qualityBar(avg: number): string {
  if (avg >= 4) return 'bg-emerald-500';
  if (avg >= 3) return 'bg-yellow-400';
  return 'bg-red-500';
}

export default function AdminA1Analytics({
  initialStudentId,
}: {
  initialStudentId?: string;
}) {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(
    initialStudentId ?? null
  );
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [courseIdUsed, setCourseIdUsed] = useState<string>('ingles-a1');
  const [availableCourses, setAvailableCourses] = useState<string[]>(['ingles-a1']);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ingles-a1');
  const [progressSource, setProgressSource] = useState<string | null>(null);
  const [progressError, setProgressError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentsError, setStudentsError] = useState<string | null>(null);
  const [studentLoading, setStudentLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [globalSummary, setGlobalSummary] = useState<{ total: number; withProgress: number } | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'accuracy' | 'srs'>('progress');
  const [srsStats, setSrsStats] = useState<SRSStats | null>(null);
  const [srsLoading, setSrsLoading] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setStudentsError(null);
      const response = await fetch('/api/admin/students');
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data?.error ?? `Failed to fetch students (${response.status})`);
      }
      const list = data.students || [];
      setStudents(list);
      if (list.length > 0) {
        setSelectedStudent((prev) => prev || list[0].id);
      }
      setLoading(false);
      fetch('/api/admin/export-progress')
        .then((res) => res.ok ? res.json() : null)
        .then((exp) => {
          const arr = exp?.export || [];
          setGlobalSummary({
            total: list.length,
            withProgress: arr.filter((r: { progress: unknown[] }) => (r.progress?.length ?? 0) > 0).length,
          });
        })
        .catch(() => {});
    } catch (error) {
      console.error('Error loading students:', error);
      setStudentsError(
        error instanceof Error ? error.message : 'No se pudieron cargar los alumnos'
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedStudent) {
      loadStudentProgress();
      if (activeTab === 'srs') {
        loadSRSStats();
      }
    }
  }, [selectedStudent, selectedCourseId]);

  useEffect(() => {
    if (activeTab === 'srs' && selectedStudent && !srsStats) {
      loadSRSStats();
    }
  }, [activeTab]);

  async function loadStudentProgress() {
    if (!selectedStudent) return;
    setStudentLoading(true);
    setProgressError(null);
    try {
      const qs = selectedCourseId
        ? `?courseId=${encodeURIComponent(selectedCourseId)}`
        : '';
      const response = await fetch(`/api/admin/progress/${selectedStudent}${qs}`);
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error ?? 'Failed to fetch progress');
      setProgressData(data.progress || []);
      setSummary(data.summary);
      setCourseIdUsed(data.courseId || selectedCourseId || 'ingles-a1');
      setProgressSource(data.source || null);
      if (Array.isArray(data.availableCourses) && data.availableCourses.length > 0) {
        setAvailableCourses(data.availableCourses);
      }
    } catch (error) {
      console.error('Error loading progress:', error);
      setProgressError(error instanceof Error ? error.message : 'Error al cargar progreso');
      setProgressData([]);
      setSummary(null);
    } finally {
      setStudentLoading(false);
    }
  }

  async function loadSRSStats() {
    if (!selectedStudent) return;
    setSrsLoading(true);
    setSrsStats(null);
    try {
      const res = await fetch(`/api/admin/a1-srs/${selectedStudent}`);
      if (!res.ok) throw new Error('Failed to fetch SRS stats');
      const data = await res.json();
      setSrsStats(data);
    } catch (error) {
      console.error('Error loading SRS stats:', error);
    } finally {
      setSrsLoading(false);
    }
  }

  async function handleExportCsv() {
    setExporting(true);
    try {
      const response = await fetch('/api/admin/export-progress');
      if (!response.ok) throw new Error('Export failed');
      const { export: data } = await response.json();
      const rows: string[] = [];
      rows.push('Email,Nombre,Usuario,Unidad,Etiqueta,Ejercicios completados,Total ejercicios,Precisión %,Estado');
      for (const row of data || []) {
        for (const p of row.progress || []) {
          rows.push(
            [
              `"${(row.email ?? '').replace(/"/g, '""')}"`,
              `"${(row.name ?? '').replace(/"/g, '""')}"`,
              row.userId,
              p.unit_id,
              `"${(p.unit_label ?? '').replace(/"/g, '""')}"`,
              p.exercises_completed ?? '',
              p.exercises_total ?? '',
              p.accuracy_percentage ?? '',
              p.status ?? '',
            ].join(',')
          );
        }
        if ((row.progress?.length ?? 0) === 0) {
          rows.push(
            [
              `"${(row.email ?? '').replace(/"/g, '""')}"`,
              `"${(row.name ?? '').replace(/"/g, '""')}"`,
              row.userId,
              '',
              '"Sin progreso"',
              '',
              '',
              '',
              '',
            ].join(',')
          );
        }
      }
      const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `avances-a1-${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(a.href);
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setExporting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500 mx-auto mb-3"></div>
        <p className="text-slate-600">Loading students...</p>
      </div>
    );
  }

  const selectedStudentData = students.find(s => s.id === selectedStudent);

  return (
    <div className="space-y-8">
      {/* Resumen global */}
      {globalSummary && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-slate-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">Total alumnos</p>
              <p className="text-2xl font-black text-slate-800">{globalSummary.total}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase">Con progreso guardado</p>
              <p className="text-2xl font-black text-slate-800">{globalSummary.withProgress}</p>
            </div>
          </div>
        </div>
      )}

      {/* Student Selector + Export */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-coral-500" />
            <h3 className="font-black text-slate-800">Seleccionar alumno</h3>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={exporting || students.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-4 h-4" />
            {exporting ? 'Exportando…' : 'Exportar CSV'}
          </button>
        </div>

        <div className="mb-4">
          {selectedStudentData ? (
            <div className="text-sm text-slate-700">
              Mostrando:{" "}
              <span className="font-bold">{selectedStudentData.name}</span>{" "}
              <span className="text-slate-500">({selectedStudentData.email})</span>
            </div>
          ) : studentsError ? (
            <div className="text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              {studentsError}
            </div>
          ) : (
            <div className="text-sm text-slate-600">Selecciona un alumno para ver su progreso.</div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <select
            value={selectedStudent || ''}
            onChange={(e) => {
              setSelectedStudent(e.target.value);
              setSrsStats(null);
              setSelectedCourseId('ingles-a1');
            }}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-100 outline-none transition"
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:border-coral-500 focus:ring-2 focus:ring-coral-100 outline-none transition"
          >
            {Array.from(new Set(['ingles-a1', ...availableCourses])).map((cid) => (
              <option key={cid} value={cid}>
                Curso: {cid}
              </option>
            ))}
          </select>
        </div>
        {progressSource && (
          <p className="mt-2 text-xs text-slate-500">
            Fuente de datos: {progressSource === 'merged' ? 'progreso unificado + legado A1' : progressSource}
          </p>
        )}
        {progressError && (
          <div className="mt-3 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            {progressError}
          </div>
        )}

        {students.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-bold text-slate-500 uppercase mb-2">Lista de alumnos</p>
            <div className="max-h-56 overflow-y-auto pr-1 space-y-2">
              {students.map(student => {
                const isSelected = student.id === selectedStudent;
                return (
                  <button
                    key={student.id}
                    type="button"
                    onClick={() => {
                      setSelectedStudent(student.id);
                      setSrsStats(null);
                    }}
                    className={[
                      "w-full text-left px-3 py-2 rounded-lg border transition",
                      isSelected
                        ? "bg-coral-50 border-coral-300"
                        : "bg-white border-slate-200 hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-slate-800">{student.name}</span>
                      <span className="text-xs text-slate-500 truncate">{student.email}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors ${
            activeTab === 'progress'
              ? 'border-coral-500 text-coral-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Progreso por unidad
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('accuracy')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'accuracy'
              ? 'border-emerald-500 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          Tasa de acierto
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('srs')}
          className={`px-4 py-2.5 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${
            activeTab === 'srs'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Repetición Espaciada
        </button>
      </div>

      {/* TAB: Progreso */}
      {activeTab === 'progress' && (
        <>
          {summary && !studentLoading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <p className="text-xs font-bold text-slate-500 uppercase mb-3">Curso: {courseIdUsed}</p>
                <div className="flex items-center gap-3 mb-2">
                  <BookOpen className="w-5 h-5 text-coral-500" />
                  <span className="text-sm font-bold text-slate-600 uppercase">Units Started</span>
                </div>
                <p className="text-3xl font-black text-slate-800">{summary.totalUnitsStarted}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-bold text-slate-600 uppercase">Completed</span>
                </div>
                <p className="text-3xl font-black text-slate-800">{summary.totalUnitsCompleted}</p>
              </div>

              <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-bold text-slate-600 uppercase">Avg Accuracy</span>
                </div>
                <p className="text-3xl font-black text-slate-800">{summary.averageAccuracy}%</p>
              </div>
            </div>
          )}

          {studentLoading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-coral-500 mx-auto mb-3"></div>
              <p className="text-slate-600">Loading progress...</p>
            </div>
          )}

          {!studentLoading && (
            <div>
              <h3 className="font-black text-xl text-slate-800 mb-4">Progreso por unidad</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 61 }, (_, i) => {
                  const unitNum = i;
                  const unitProgress = progressData.find(u => u.unit_id === unitNum);
                  const label = unitLabel(unitNum);
                  
                  return (
                    <div
                      key={unitNum}
                      className={`rounded-xl p-4 border-2 transition-all ${
                        unitProgress?.status === 'completed'
                          ? 'bg-green-50 border-green-300'
                          : unitProgress?.status === 'in_progress'
                          ? 'bg-blue-50 border-blue-300'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-black text-slate-800">{label}</h4>
                          <p className="text-sm text-slate-600 capitalize">
                            {unitProgress?.status || 'No empezado'}
                          </p>
                        </div>
                        {unitProgress?.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>

                      {unitProgress && (
                        <>
                          <div className="mb-2">
                            <div className="flex justify-between text-xs text-slate-600 mb-1">
                              <span>Progreso</span>
                              <span>
                                {unitProgress.exercises_completed}/{unitProgress.exercises_total}
                              </span>
                            </div>
                            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-coral-500 transition-all"
                                style={{
                                  width: `${
                                    (unitProgress.exercises_total ?? 0) > 0
                                      ? ((unitProgress.exercises_completed ?? 0) / (unitProgress.exercises_total ?? 1)) * 100
                                      : 0
                                  }%`,
                                }}
                              />
                            </div>
                          </div>

                          <div className="text-xs text-slate-600">
                            Precisión: {(unitProgress.accuracy_percentage ?? 0).toFixed(1)}%
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* TAB: Accuracy Chart */}
      {activeTab === 'accuracy' && (
        <div className="space-y-4">
          {studentLoading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-3" />
              <p className="text-slate-600">Cargando datos…</p>
            </div>
          )}

          {!studentLoading && !progressData.length && (
            <div className="text-center py-10 text-slate-500">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Selecciona un alumno para ver la tasa de acierto por unidad.</p>
            </div>
          )}

          {!studentLoading && progressData.length > 0 && (
            <div>
              <h3 className="font-black text-xl text-slate-800 mb-4">Tasa de acierto por unidad</h3>
              <div className="space-y-2">
                {progressData
                  .filter(u => u.exercises_completed > 0)
                  .sort((a, b) => a.unit_id - b.unit_id)
                  .map(u => {
                    const acc = u.accuracy_percentage ?? 0;
                    const color = acc >= 80 ? 'bg-emerald-500' : acc >= 60 ? 'bg-yellow-400' : 'bg-red-400';
                    const textColor = acc >= 80 ? 'text-emerald-700' : acc >= 60 ? 'text-yellow-700' : 'text-red-700';
                    return (
                      <div key={u.unit_id} className="flex items-center gap-3">
                        <span className="w-20 text-xs font-bold text-slate-600 flex-shrink-0">
                          {unitLabel(u.unit_id)}
                        </span>
                        <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${color} rounded-full transition-all`}
                            style={{ width: `${Math.min(acc, 100)}%` }}
                          />
                        </div>
                        <span className={`w-12 text-xs font-black text-right flex-shrink-0 ${textColor}`}>
                          {acc.toFixed(0)}%
                        </span>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-6 flex gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> ≥80% Excelente</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" /> 60–79% Regular</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-400 inline-block" /> &lt;60% Necesita repaso</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: SRS */}
      {activeTab === 'srs' && (
        <div className="space-y-6">
          {srsLoading && (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
              <p className="text-slate-600">Cargando datos de repetición espaciada…</p>
            </div>
          )}

          {!srsLoading && !srsStats && (
            <div className="text-center py-10 text-slate-500">
              <RotateCcw className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p>Selecciona un alumno para ver sus estadísticas de SRS.</p>
            </div>
          )}

          {!srsLoading && srsStats && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Tarjetas totales</p>
                  <p className="text-3xl font-black text-slate-800">{srsStats.totalCards}</p>
                </div>
                <div className={`rounded-xl p-5 border shadow-sm ${srsStats.dueCount > 0 ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Pendientes hoy</p>
                  <p className={`text-3xl font-black ${srsStats.dueCount > 0 ? 'text-amber-700' : 'text-slate-800'}`}>
                    {srsStats.dueCount}
                  </p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Ease Factor medio</p>
                  <p className="text-3xl font-black text-slate-800">
                    {srsStats.avgEaseFactor !== null ? srsStats.avgEaseFactor.toFixed(2) : '—'}
                  </p>
                </div>
                <div className={`rounded-xl p-5 border shadow-sm ${srsStats.weakTopics.length > 0 ? 'bg-red-50 border-red-200' : 'bg-emerald-50 border-emerald-200'}`}>
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Temas débiles</p>
                  <p className={`text-3xl font-black ${srsStats.weakTopics.length > 0 ? 'text-red-700' : 'text-emerald-700'}`}>
                    {srsStats.weakTopics.length}
                  </p>
                </div>
              </div>

              {srsStats.weakTopics.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <h4 className="font-black text-red-800 text-sm uppercase">Temas a reforzar</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {srsStats.weakTopics.map(t => (
                      <div key={t.topic} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-red-200 rounded-lg text-sm">
                        <span className="font-semibold text-slate-700">{t.topic || 'General'}</span>
                        <span className={`font-black text-xs ${qualityColor(t.avgQuality)}`}>
                          {t.avgQuality.toFixed(1)}/5
                        </span>
                        {t.dueCount > 0 && (
                          <span className="text-xs text-amber-600 font-bold">{t.dueCount} pendientes</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {srsStats.topicStats.length > 0 && (
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-slate-100">
                    <h4 className="font-black text-slate-800">Estadísticas por tema</h4>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {srsStats.topicStats.map(t => (
                      <div key={t.topic} className="px-5 py-3 flex items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 truncate">{t.topic || 'General'}</p>
                          <div className="mt-1 flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${qualityBar(t.avgQuality)} transition-all`}
                                style={{ width: `${(t.avgQuality / 5) * 100}%` }}
                              />
                            </div>
                            <span className={`text-xs font-black ${qualityColor(t.avgQuality)}`}>
                              {t.avgQuality.toFixed(1)}/5
                            </span>
                          </div>
                        </div>
                        <div className="text-right text-xs text-slate-500 shrink-0">
                          <p>{t.count} tarjetas</p>
                          {t.dueCount > 0 && (
                            <p className="text-amber-600 font-bold">{t.dueCount} pendientes</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {srsStats.totalCards === 0 && (
                <div className="text-center py-8 text-slate-400">
                  <RotateCcw className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p>Este alumno aún no tiene tarjetas SRS registradas.</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
