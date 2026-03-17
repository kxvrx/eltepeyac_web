"use client";

import { useActionState } from "react";
import { sendContact, type ContactState } from "../actions";

const initialState: ContactState = { ok: false, message: "" };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-2">
        <label className="text-sm font-semibold text-charcoal" htmlFor="name">
          NAME
        </label>
        <input
          id="name"
          name="name"
          placeholder="Your name"
          className="h-12 w-full border border-black/15 bg-neutral-100 px-4 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-black/35 focus:bg-white"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-charcoal" htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@email.com"
          className="h-12 w-full border border-black/15 bg-neutral-100 px-4 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-black/35 focus:bg-white"
          required
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-charcoal" htmlFor="message">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help?"
          rows={6}
          className="w-full border border-black/15 bg-neutral-100 px-4 py-3 text-sm text-charcoal outline-none placeholder:text-charcoal/40 focus:border-black/35 focus:bg-white"
          required
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          type="submit"
          disabled={pending}
          className="h-12 rounded-sm bg-[#f2cc2f] px-8 text-sm font-semibold text-charcoal shadow-[0_14px_35px_rgba(0,0,0,0.12)] hover:brightness-[0.98] disabled:opacity-60"
        >
          {pending ? "Sending…" : "Submit"}
        </button>

        {state.message ? (
          <div
            className={`text-sm ${
              state.ok ? "text-cilantro" : "text-charcoal/70"
            }`}
            role="status"
            aria-live="polite"
          >
            {state.message}
          </div>
        ) : (
          <div className="text-xs text-charcoal/60">Fields marked required.</div>
        )}
      </div>
    </form>
  );
}

