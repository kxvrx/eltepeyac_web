"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "../actions";

const initialState: ContactState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  const fieldClass =
    "h-12 w-full border-b border-black/20 bg-transparent px-0 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-charcoal/60 transition";

  return (
    <form action={formAction} className="grid gap-8">
      <div className="grid gap-2">
        <label
          className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
          htmlFor="name"
        >
          Nombre
        </label>
        <input
          id="name"
          name="name"
          placeholder="Tu nombre"
          className={fieldClass}
          required
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
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
          required
        />
      </div>

      <div className="grid gap-2">
        <label
          className="text-[10px] font-mono tracking-[0.32em] uppercase text-charcoal/45"
          htmlFor="message"
        >
          Mensaje
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="¿Cómo te podemos ayudar?"
          rows={5}
          className="w-full resize-none border-b border-black/20 bg-transparent px-0 py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/35 focus:border-charcoal/60 transition"
          required
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center bg-maiz px-8 py-4 text-sm font-semibold uppercase tracking-wider text-charcoal transition hover:brightness-95 disabled:opacity-50"
        >
          {pending ? "Enviando…" : "Enviar mensaje"}
        </button>

        {state.message ? (
          <div
            className={`text-sm ${state.ok ? "text-cilantro" : "text-charcoal/60"}`}
            role="status"
            aria-live="polite"
          >
            {state.message}
          </div>
        ) : (
          <div className="text-xs text-charcoal/45 font-mono tracking-[0.18em]">
            Todos los campos son obligatorios.
          </div>
        )}
      </div>
    </form>
  );
}
