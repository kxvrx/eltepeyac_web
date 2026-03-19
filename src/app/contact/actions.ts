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
  const name    = String(formData.get("name")    ?? "").trim();
  const email   = String(formData.get("email")   ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  // ── Validaciones ──────────────────────────────────────────────────
  if (!name || !email || !message) {
    return { ok: false, message: "Por favor completa todos los campos." };
  }
  if (!isEmail(email)) {
    return { ok: false, message: "Ingresa un correo electrónico válido." };
  }
  if (message.length < 10) {
    return { ok: false, message: "El mensaje es muy corto — agrega más detalle." };
  }

  // ── Envío de correo con Resend ────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !toEmail) {
    console.error("[contact] Faltan variables de entorno: RESEND_API_KEY o CONTACT_EMAIL_TO");
    return { ok: false, message: "Error de configuración del servidor. Inténtalo de nuevo más tarde." };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from:    "El Tepeyac Contact <onboarding@resend.dev>", // cambia por tu dominio verificado en Resend
      to:      [toEmail],
      replyTo: email,
      subject: `Nuevo mensaje de contacto — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;color:#1a1a1a;">
          <div style="border-left:4px solid #2d5a27;padding-left:20px;margin-bottom:28px;">
            <h2 style="margin:0 0 4px;font-size:22px;">Nuevo mensaje de contacto</h2>
            <p style="margin:0;color:#666;font-size:14px;">El Tepeyac Taqueria · Sitio web</p>
          </div>

          <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;width:100px;">Nombre</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;color:#666;font-size:13px;">Correo</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;">
                <a href="mailto:${email}" style="color:#2d5a27;">${email}</a>
              </td>
            </tr>
          </table>

          <div style="background:#f9f9f9;border-radius:6px;padding:20px;line-height:1.7;">
            <p style="margin:0 0 8px;color:#666;font-size:12px;text-transform:uppercase;letter-spacing:.08em;">Mensaje</p>
            <p style="margin:0;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>

          <p style="margin-top:28px;font-size:12px;color:#999;">
            Responde directamente a este correo para contestarle a ${name}.
          </p>
        </div>
      `,
    });

    return { ok: true, message: "¡Mensaje enviado! Te respondemos pronto." };
  } catch (err) {
    console.error("[contact] Error al enviar correo:", err);
    return { ok: false, message: "No se pudo enviar el mensaje. Inténtalo de nuevo." };
  }
}
