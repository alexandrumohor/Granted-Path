export function passwordResetEmail(name: string, resetUrl: string): { subject: string; html: string } {
  return {
    subject: "Reset your Granted Path password",
    html: `
<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;background:#0d0f1a;color:#e8e6e3;">
  <div style="text-align:center;margin-bottom:32px;">
    <div style="display:inline-block;background:#d4a039;color:#0d0f1a;font-weight:bold;font-size:18px;padding:12px 16px;border-radius:10px;">GP</div>
    <h1 style="margin:16px 0 0;font-size:24px;">Reset Your Password</h1>
  </div>
  <p>Hey ${name},</p>
  <p>We received a request to reset your password. Click the button below to set a new one:</p>
  <div style="text-align:center;margin:32px 0;">
    <a href="${resetUrl}" style="display:inline-block;background:#d4a039;color:#0d0f1a;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:bold;font-size:16px;">Reset Password</a>
  </div>
  <p style="color:#888;font-size:13px;">This link expires in 1 hour. If you didn't request this, you can safely ignore this email.</p>
  <p style="color:#888;font-size:13px;">— The Granted Path Team</p>
</body></html>`,
  };
}
