'use client';

import { useEffect, useMemo, useState } from 'react';

type Ticket = {
  id: string;
  source?: 'guest' | 'student';
  subject?: string;
  content?: string;
  message?: string;
  createdate?: string | null;
  createdAt?: string | null;
  contactEmail?: string;
  email?: string;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  category?: string;
  status?: string;
  adminReply?: string | null;
  repliedAt?: string | null;
  userId?: string | null;
};

type Section = 'guest' | 'student';

export default function AdminTicketsPage() {
  const [guestTickets, setGuestTickets] = useState<Ticket[]>([]);
  const [studentTickets, setStudentTickets] = useState<Ticket[]>([]);
  const [section, setSection] = useState<Section>('guest');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  const tickets = section === 'guest' ? guestTickets : studentTickets;

  async function loadTickets() {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch('/api/admin/tickets?limit=100');
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'No se pudieron cargar los tickets');
      const guest = data?.sections?.guest ?? [];
      const student = data?.sections?.student ?? [];
      setGuestTickets(guest);
      setStudentTickets(student);
      const currentList = section === 'guest' ? guest : student;
      if (currentList.length > 0) {
        setSelectedTicketId((prev) => {
          if (prev && currentList.some((t: Ticket) => t.id === prev)) return prev;
          return currentList[0].id;
        });
      } else {
        setSelectedTicketId(null);
        setSelectedTicket(null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const list = section === 'guest' ? guestTickets : studentTickets;
    if (list.length === 0) {
      setSelectedTicketId(null);
      setSelectedTicket(null);
      return;
    }
    if (!selectedTicketId || !list.some((t) => t.id === selectedTicketId)) {
      setSelectedTicketId(list[0].id);
    }
  }, [section, guestTickets, studentTickets, selectedTicketId]);

  useEffect(() => {
    async function loadTicketDetail(ticketId: string) {
      try {
        setDetailLoading(true);
        setError(null);
        const res = await fetch(`/api/admin/tickets/${encodeURIComponent(ticketId)}`);
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data?.error ?? 'No se pudo cargar el ticket');
        setSelectedTicket(data?.ticket ?? null);
      } catch (e) {
        setSelectedTicket(null);
        setError(e instanceof Error ? e.message : 'Error cargando detalle');
      } finally {
        setDetailLoading(false);
      }
    }

    if (selectedTicketId) loadTicketDetail(selectedTicketId);
    else setSelectedTicket(null);
  }, [selectedTicketId]);

  async function sendReply() {
    if (!selectedTicketId) return;
    const message = reply.trim();
    if (!message) return;

    try {
      setSending(true);
      setError(null);
      setSuccess(null);
      const res = await fetch(`/api/admin/tickets/${encodeURIComponent(selectedTicketId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error ?? 'No se pudo enviar la respuesta');
      setReply('');
      setSuccess(`Respuesta enviada por email a ${data?.ticket?.contactEmail || 'el destinatario'}.`);
      await loadTickets();
      // refresh detail
      const detailRes = await fetch(`/api/admin/tickets/${encodeURIComponent(selectedTicketId)}`);
      const detailData = await detailRes.json().catch(() => ({}));
      if (detailRes.ok) setSelectedTicket(detailData?.ticket ?? null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error enviando respuesta');
    } finally {
      setSending(false);
    }
  }

  const selectedDate = useMemo(() => {
    const raw = selectedTicket?.createdAt || selectedTicket?.createdate;
    if (!raw) return '—';
    const d = new Date(raw);
    if (Number.isNaN(d.getTime())) return String(raw);
    return d.toLocaleString('es-ES');
  }, [selectedTicket?.createdAt, selectedTicket?.createdate]);

  const displayName = selectedTicket
    ? [selectedTicket.firstName, selectedTicket.lastName].filter(Boolean).join(' ') ||
      selectedTicket.contactEmail ||
      selectedTicket.email ||
      'Sin nombre'
    : '';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Tickets</h1>
        <p className="text-slate-600 mt-1">
          Consultas de visitantes (con email) y de alumnos con perfil.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm font-medium">
          {success}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setSection('guest')}
          className={[
            'px-4 py-2 rounded-xl text-sm font-bold border transition',
            section === 'guest'
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
          ].join(' ')}
        >
          Visitantes / sin cuenta ({guestTickets.length})
        </button>
        <button
          type="button"
          onClick={() => setSection('student')}
          className={[
            'px-4 py-2 rounded-xl text-sm font-bold border transition',
            section === 'student'
              ? 'bg-sky-50 border-sky-300 text-sky-900'
              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50',
          ].join(' ')}
        >
          Alumnos con perfil ({studentTickets.length})
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-3">
          <h2 className="font-black text-slate-900 px-2 py-1">
            {section === 'guest' ? 'Tickets de visitantes' : 'Tickets de alumnos'}
          </h2>
          {loading ? (
            <div className="text-slate-600 text-sm px-2 py-3">Cargando...</div>
          ) : tickets.length === 0 ? (
            <div className="text-slate-600 text-sm px-2 py-3">No hay tickets en esta sección.</div>
          ) : (
            <div className="space-y-2 max-h-[65vh] overflow-y-auto pr-1 mt-2">
              {tickets.map((t) => {
                const isActive = t.id === selectedTicketId;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => {
                      setSelectedTicketId(t.id);
                      setSuccess(null);
                    }}
                    className={[
                      'w-full text-left px-3 py-3 rounded-xl border transition',
                      isActive
                        ? 'bg-coral-50 border-coral-300'
                        : 'bg-white border-slate-200 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-slate-800 truncate">
                        {t.subject || `Ticket ${t.id}`}
                      </div>
                      <span
                        className={[
                          'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0',
                          t.status === 'open'
                            ? 'bg-amber-100 text-amber-800'
                            : t.status === 'answered'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600',
                        ].join(' ')}
                      >
                        {t.status || 'open'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 truncate mt-1">
                      {t.contactEmail || t.email || 'Sin email'}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5">
          {!selectedTicketId ? (
            <div className="text-slate-600">Selecciona un ticket.</div>
          ) : detailLoading ? (
            <div className="text-slate-600">Cargando detalle...</div>
          ) : !selectedTicket ? (
            <div className="text-slate-600">No se pudo cargar el detalle del ticket.</div>
          ) : (
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500 font-bold">Asunto</div>
                <div className="text-xl font-black text-slate-900">
                  {selectedTicket.subject || 'Sin asunto'}
                </div>
                <div className="mt-1 text-xs font-semibold text-slate-500">
                  {selectedTicket.source === 'student'
                    ? 'Alumno con perfil'
                    : 'Visitante (sin cuenta / email facilitado)'}
                  {selectedTicket.category ? ` · ${selectedTicket.category}` : ''}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-slate-500">Contacto</div>
                  <div className="font-semibold text-slate-800">{displayName}</div>
                  <div className="text-slate-600">{selectedTicket.contactEmail || selectedTicket.email}</div>
                  {selectedTicket.phone ? (
                    <div className="text-slate-500 text-xs mt-1">Tel: {selectedTicket.phone}</div>
                  ) : null}
                </div>
                <div>
                  <div className="text-slate-500">Fecha</div>
                  <div className="font-semibold text-slate-800">{selectedDate}</div>
                  <div className="text-slate-500 mt-2">Estado</div>
                  <div className="font-semibold text-slate-800 capitalize">
                    {selectedTicket.status || 'open'}
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-1">
                  Mensaje
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 whitespace-pre-wrap text-slate-800">
                  {selectedTicket.content || selectedTicket.message || 'Sin contenido'}
                </div>
              </div>

              {selectedTicket.adminReply ? (
                <div>
                  <div className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-1">
                    Respuestas enviadas
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 whitespace-pre-wrap text-emerald-950">
                    {selectedTicket.adminReply}
                  </div>
                </div>
              ) : null}

              <div>
                <div className="text-xs uppercase tracking-wide text-slate-500 font-bold mb-1">
                  Responder por email
                </div>
                <p className="text-xs text-slate-500 mb-2">
                  La respuesta se guarda en el ticket y se envía a{' '}
                  <strong>{selectedTicket.contactEmail || selectedTicket.email}</strong>.
                </p>
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  rows={6}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-coral-200 focus:border-coral-400"
                  placeholder="Escribe aquí la respuesta..."
                />
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={sendReply}
                    disabled={sending || reply.trim().length === 0}
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? 'Enviando...' : 'Enviar respuesta por email'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
