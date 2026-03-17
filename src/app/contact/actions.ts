"use server";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export type ContactState =
  | { ok: false; message: string }
  | { ok: true; message: string };

export async function sendContact(
  _prev: ContactState | undefined,
  formData: FormData
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { ok: false, message: "Please fill out name, email, and message." };
  }
  if (!isEmail(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (message.length < 10) {
    return { ok: false, message: "Message is too short — add a bit more detail." };
  }

  // Email delivery is intentionally left unconfigured (SMTP/API keys).
  // This keeps the app deployable now; wiring a provider is a drop-in later.
  return { ok: true, message: "Thanks! We’ll get back to you soon." };
}

