import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

export const EMAIL_FROM = process.env.EMAIL_FROM || "Granted Path <noreply@grantedpath.com>";

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  const resend = getResend();
  if (!resend) {
    console.log(`[EMAIL MOCK] To: ${to} | Subject: ${subject}`);
    return { success: true, mock: true };
  }

  const { error } = await resend.emails.send({ from: EMAIL_FROM, to, subject, html });
  if (error) { console.error("Email send error:", error); return { success: false, error }; }
  return { success: true };
}
