"use client";

import { useActionState, useEffect, useState } from "react";
import { sendContact, type ContactState } from "../actions";

const initialState: ContactState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  // Valores controlados — se conservan en errores y se limpian solo en éxito
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (state.ok) {
      setName("");
      setEmail("");
      setMessage("");
    }
  }, [state]);

  const fieldClass =
    "h-12 w-full border-b border-black/20 bg-transparent px-0 text-lg text-charcoal outline-none placeholder:text-charcoal/35 focus:border-charcoal/60 transition";

  return (
    <form action={formAction} className="grid gap-8">
      <div className="grid gap-2">
        <label
          className="text-[20px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          id="name"
          name="name"
          placeholder="Tu nombre"
          className={fieldClass}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-[20px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
          htmlFor="email"
        >
          Correo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="tu@correo.com"
          className={fieldClass}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-[20px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
          htmlFor="message"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="¿Cómo te podemos ayudar?"
          rows={5}
          className="w-full resize-none border-b border-black/20 bg-transparent px-0 py-2 text-lg text-charcoal outline-none placeholder:text-charcoal/35 focus:border-charcoal/60 transition"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center bg-cilantro px-8 py-4 text-lg font-semibold uppercase tracking-wider text-white transition hover:brightness-95 disabled:opacity-50"
        >
          {pending ? "Enviando…" : "Enviar mensaje"}
        </button>

        {state.message ? (
          <div
            className={`text-lg ${state.ok ? "text-cilantro" : "text-red-600/80"}`}
            role="status"
            aria-live="polite"
          >
            {state.message}
          </div>
        ) : (
          <div className="text-sm text-charcoal/75 font-mono tracking-[0.18em]">
            Todos los campos son obligatorios.
          </div>
        )}
      </div>
    </form>
  );
}
