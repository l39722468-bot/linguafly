"use client";

import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site-brand";

export function ContactMailForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function openMail(event: React.FormEvent) {
    event.preventDefault();
    const body = [`Nombre: ${name}`, `Correo: ${email}`, "", message].join("\n");
    const href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  return (
    <form onSubmit={openMail} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold text-slate-700">
          Nombre
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium outline-none focus:border-coral-500"
          />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Tu correo
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium outline-none focus:border-coral-500"
          />
        </label>
      </div>
      <label className="block text-sm font-bold text-slate-700">
        Asunto
        <input
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium outline-none focus:border-coral-500"
        />
      </label>
      <label className="block text-sm font-bold text-slate-700">
        Mensaje
        <textarea
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 font-medium outline-none focus:border-coral-500"
        />
      </label>
      <button
        type="submit"
        className="w-full rounded-full bg-coral-500 px-5 py-4 font-heading text-lg font-black text-white"
      >
        Abrir el correo
      </button>
      <p className="text-sm text-slate-500">
        Se abre tu programa de correo, dirigido a {CONTACT_EMAIL}. Esta página no guarda el mensaje.
      </p>
    </form>
  );
}
